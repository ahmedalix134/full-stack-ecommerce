"use server";

import { getCollection } from "@/lib/db";
import { loginFormSchema, signupFormSchema } from "@/lib/rules";
import { createSession } from "@/lib/session";
import bcrypt from "bcrypt";
import { m } from "motion/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// This is a server action for handling user signup.
export const signup = async (
  state: any,
  formData: { get: (arg0: string) => any }
) => {
  // Check if the formData is an instance of FormData
  const validation = signupFormSchema.safeParse({
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  // if validation fails, return the errors and the current values of email and username
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      email: formData.get("email"),
      username: formData.get("username"),
    };
  }

  console.log(validation);
  // If validation is successful, extract the validated data
  const { email, username, password } = validation.data;

  // Check if the user already exists
  const userCollection = await getCollection("users");
  if (!userCollection) {
    throw new Error("Failed to connect to the users collection");
  }
  const existingUser = await userCollection.findOne({ email, username });
  if (existingUser) {
    return {
      errors: {
        email: "Email already exists",
        username: "Username already exists",
      },
    };
  }
  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the new user into the database
  const newUser = await userCollection.insertOne({
    email,
    username,
    password: hashedPassword,
  });

  if (!newUser.acknowledged) {
    return {
      errors: {
        general: "Failed to create user",
      },
    };
  }
  //  create a session for the user
  await createSession(newUser.insertedId.toString());

  // redirect

  redirect("/");

  console.log("userCollection", userCollection);
};

export const login = async (
  state: any,
  formData: { get: (arg0: string) => any }
) => {
  // Check if the formData is an instance of FormData
  const validation = loginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  // if validation fails, return the errors and the current values of email and username
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }
  // Extract the validated data
  const { email, password } = validation.data;
  // Check if the user exists
  const userCollection = await getCollection("users");
  if (!userCollection)
    throw new Error("Failed to connect to the users collection");
  const existingUser = await userCollection.findOne({ email });
  if (!existingUser) return { errors: { email: "User not found" } };
  // check if the password is correct
  const matchedPassword = await bcrypt.compare(password, existingUser.password);
  if (!matchedPassword)
    return { errors: { password: "password is incorrect" } };
  // create a session for the user
  await createSession(existingUser._id.toString());
  console.log(existingUser);
  // redirect
  redirect("/");
};

export const logout = async () => {
  const cookiesStore = await cookies();

  // Clear the session cookie
  cookiesStore.delete("session");
  // Redirect to the home page
  redirect("/");
};
