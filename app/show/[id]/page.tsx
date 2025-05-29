import ProductPage from "@/app/componenets/ProductPage";
import React from "react";

const page = async ({ params }: { params: any }) => {
  const id = await params.id;
  return <ProductPage id={id} />;
};

export default page;
