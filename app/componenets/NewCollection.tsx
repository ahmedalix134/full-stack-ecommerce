import React from "react";
import WrapperItems from "./WrapperItems";
import Item from "./Item";

async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "force-cache", // كاش دائم، مناسب للبيانات الثابتة
      // أو cache: "no-store" لو عايز تحديث دايم
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

const NewCollection = async () => {
  const products = await getProducts();
  const newCollectionProducts = products.slice(0, 8);
  return (
    <WrapperItems title="New Collection">
      {newCollectionProducts.map((p: Object) => (
        <Item key={p.id} fakeproduct={p} />
      ))}
    </WrapperItems>
  );
};

export default NewCollection;
