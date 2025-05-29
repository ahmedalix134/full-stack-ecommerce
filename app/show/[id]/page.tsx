"use server";
import ProductPage from "@/app/componenets/ProductPage";
import React from "react";
// interface PageProps {
//   params: { id: string };
// }

const page = async ({ params }) => {
  const id = await params.id;
  console.log(id);
  return <ProductPage id={id} />;
};

export default page;
