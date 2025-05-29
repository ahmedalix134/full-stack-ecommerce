import React from "react";
import WrapperItems from "./WrapperItems";
import Item from "./Item";

async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "force-cache", // Permanent cache, suitable for static data
    });
    return res.json();
  } catch (error) {
    return error;
  }
}

type Object = {
  category: string;
  discription: string;
  id: number;
  image: string;
  price: string;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
};

const BestSeller = async () => {
  const products = await getProducts();
  const newCollectionProducts = products.slice(14, 18);
  return (
    <WrapperItems title="Best Seller">
      {newCollectionProducts.map((p: Object) => (
        <Item key={p.id} fakeproduct={p} />
      ))}
    </WrapperItems>
  );
};

export default BestSeller;
