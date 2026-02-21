"use server";
import { uploadImage } from "@/lib/cloudinary";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { addProductFormSchema } from "@/lib/rules";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export async function addNewProducts(
  state: any,
  formData: { get: (arg0: string) => any }
) {
  // check if user signed in
  const userAuth = await getAuthUser();
  if (!userAuth) redirect("/signup");
  // validate form data
  const validation = addProductFormSchema.safeParse({
    file: formData.get("file"),
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    category: formData.get("category"),
  });
  // handle validation errors
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      title: formData.get("title"),
      description: formData.get("description"),
    };
  }
  // save the product to the database
  try {
    const file = formData.get("file") as File;
    const image = await uploadImage(file);
    const imageUrl = (image as any).secure_url; // cloudinary image url

    const productCollection = await getCollection("products");
    const product = {
      title: validation.data.title,
      description: validation.data.description,
      price: validation.data.price,
      category: validation.data.category,
      image: imageUrl,
      userId: ObjectId.createFromHexString(userAuth.userId as string),
    };
    await productCollection.insertOne(product);
  } catch (error) {
    return {
      errors: { title: "Failed to add product" },
    };
  }
  // redirect to the home page after successful product addition
  redirect("/profile");
}
export async function deleteProduct(formData: { get: (arg0: string) => any }) {
  // check if user signed in
  const userAuth = await getAuthUser();
  if (!userAuth) redirect("/signup");
  // find the product by id

  const productId = formData.get("productId");
  if (!productId) return redirect("/profile");

  const productCollection = getCollection("products");
  const product: any = (await productCollection).findOne({
    _id: ObjectId.createFromHexString(productId),
  });
  //  check if user own the product
  // if (userAuth.id !== product.userId.toString()) return redirect("/");
  // delete product
  (await productCollection).findOneAndDelete({ _id: product._id });
}
