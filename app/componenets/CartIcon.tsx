"use client";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../store/CartStore";

import Link from "next/link";

const CartIcon = () => {
  const items = useCartStore((state) => state.items);

  return (
    <Link className="relative" href={"/cart"}>
      <div className="absolute -top-3 right-0 bg-red-700 text-white rounded-full px-1 text-xs">
        {items.length}
      </div>
      <FaShoppingCart className="text-xl text-white max-sm:text-2xl hover:text-blue-900" />
    </Link>
  );
};

export default CartIcon;
