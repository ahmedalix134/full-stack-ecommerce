"use client";
import Image from "next/image";
import img from "@/public/black-friday-shopping.jpg";
import Link from "next/link";
import React from "react";
import { deleteProduct } from "@/action/product";
// // //  types for fakestore products
// type Object = {
//   category: string;
//   discription?: string;
//   id: number;
//   image: string;
//   price: string;
//   rating: {
//     rate: number;
//     count: number;
//   };
//   title: string;
// };
// // types for user products
// type newObject = {
//   category: string;
//   description?: string;
//   price: string;
//   title: string;
//   userId: string;
//   image: string;
//   _id: string;
// };
// type Product = {
//   _id: Object;
//   [key: string]: any;
// };

const Item = ({
  fakeproduct,
  icon,
}: {
  fakeproduct: any;
  icon?: React.ReactElement;
}) => {
  return (
    <div className="relative group/item">
      {icon ? (
        <form
          action={deleteProduct}
          className="absolute top-2  right-2 z-10 text-red-600 text-xl"
        >
          <input
            type="hidden"
            name="productId"
            hidden
            defaultValue={
              fakeproduct._id.toString() || fakeproduct.id.toString()
            }
          />
          <button className="z-20 bg-white">{icon}</button>
        </form>
      ) : null}
      <Link
        href={`/show/${"id" in fakeproduct ? fakeproduct.id : fakeproduct._id}`}
        className="group"
      >
        <div className=" relative flex flex-col max-sm:w-30 max-sm:h-40  w-50 h-60  overflow-hidden rounded-3xl border border-solid text-white font-bold  ">
          <div className="img overflow-hidden peer h-full">
            <Image
              priority
              width={300}
              height={300}
              src={fakeproduct?.image || img}
              alt="image"
              className="w-full h-full hover:scale-120 duration-100 cursor-pointer "
            />
          </div>
          <div className="absolute max-lg:bottom-0 -bottom-50  text-xs  peer-hover:bottom-0 duration-100 w-full p-2 bg-blue-950">
            <p>${fakeproduct?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Item;
