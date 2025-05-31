"use client";
import { useCartStore } from "@/app/store/CartStore";
import CartProduct from "../componenets/CartProduct";
import Link from "next/link";

const Cart = () => {
  const items = useCartStore((state) => state.items);

  return (
    <div className="pt-40 flex max-sm:flex-col  gap-5 px-3 justify-evenly items-center pb-15 bg-gray-400">
      <div className="cart cart-shadow rounded-2xl max-sm:w-full flex flex-col gap-5 bg-gray-300 min-h-100 p-3 w-[70%] ">
        {items.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <>
            <div className="title grid grid-cols-7">
              <p className="col-span-3">product</p>
              <p className="col-span-1">price</p>
              <p className="col-span-1">quantity</p>
              <p className="col-span-1">total</p>
            </div>
            {items.map((i) => (
              <CartProduct
                key={i.title + i.size}
                img={i.img}
                title={i.title}
                category={i.category}
                quantity={i.quantity}
                price={i.price}
                id={i.id}
              />
            ))}
          </>
        )}
      </div>
      <div className="total-cart cart-shadow w-60 h-30 flex bg-gray-300 rounded-2xl p-3 flex-col justify-between">
        <div className="total flex justify-between">
          <p>Cart Total : </p>
          <p className=" font-semibold">
            $
            {items
              .reduce((acc, item) => acc + +item.price * item.quantity, 0)
              .toFixed(2)}
          </p>
        </div>
        <div className="checkout w-full ">
          <Link href={"/order"}>
            <button className="w-full px-3 py-2 bg-black text-white rounded-2xl">
              check out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
