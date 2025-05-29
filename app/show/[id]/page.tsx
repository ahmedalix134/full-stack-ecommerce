import ProductPage from "@/app/componenets/ProductPage";
import React from "react";

interface PageProps {
  params: { id: string };
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  console.log(id);
  return <ProductPage id={id} />;
};

export default page;
