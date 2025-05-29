import { z } from "zod";

/**
 * This file contains the validation schema for the registration form.
 * It uses Zod to define the structure and validation rules for the form fields.
 * The schema includes:
 * - username: required, trimmed, must be a non-empty string
 * - email: required, trimmed, must be a valid email format
 * - password: required, trimmed, must be at least 6 characters long, contain at least one letter and one number
 * - confirmPassword: required, trimmed, must match the password field
 */

export const signupFormSchema = z
  .object({
    username: z.string().min(1, "userName is required").trim(),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email is required" })
      .trim(),
    password: z
      .string()
      .min(1, { message: "password  is required" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/[A-Za-z]/, {
        message: "Password must contain at least one letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .trim(),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "confirmPassword is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const addProductFormSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "File is required",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "File must be an image",
    }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z
    .string()
    .min(0.01, { message: "Price must be at least $0.01" })
    .max(10000, { message: "Price must not exceed $10,000" }),
  category: z.string().min(1, { message: "Category is required" }),
});
