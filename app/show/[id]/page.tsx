import ProductPage from "@/app/componenets/ProductPage";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  console.log(id);
  return <ProductPage id={id} />;
};

export default page;
