"use server";
import { useCartStore } from "@/app/store/CartStore";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { addOrderFormSchema } from "@/lib/rules";
import { errors } from "jose";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export default async function addOrder(
  state: any,
  formData: { get: (arg0: string) => any }
) {
  // check if user signed in

  const userAuth = await getAuthUser();

  if (!userAuth) redirect("/signup");
  // validate form data
  const validation = addOrderFormSchema.safeParse({
    number: formData.get("number"),
    address: formData.get("address"),
  });
  // handle validation errors
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      number: formData.get("number"),
      address: formData.get("address"),
    };
  }
  const itemsRaw = formData.get("items");
  let items = [];
  try {
    items = JSON.parse(itemsRaw as string);
  } catch (error) {
    return {
      errors: { items: "Invalid items format" },
    };
  }

  // save the order to the database
  try {
    // const items = useCartStore((state) => state.items);
    const orderCollection = await getCollection("orders");
    const order = {
      userId: ObjectId.createFromHexString(userAuth.userId as string),
      items,
      number: validation.data.number,
      address: validation.data.address,
    };
    await orderCollection.insertOne(order);
  } catch (error) {
    return {
      errors: { number: "Failed to add order" },
    };
  }

  // redirect to the home page after successful product addition
  redirect("/profile");
}
