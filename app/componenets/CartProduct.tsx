import Image from "next/image";
import { useCartStore } from "../store/CartStore";
import { MdDelete } from "react-icons/md";

const CartProduct = ({
  img,
  title,
  category,
  size,
  quantity,
  price,
  id,
}: {
  img?: string;
  title: string;
  category: string;
  size?: string;
  quantity: number;
  price: string;
  id: number | string;
}) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className="products gap-2 bg-white p-2 rounded-2xl  grid grid-cols-7">
      <div className="product-info flex gap-3 col-span-3">
        <div className="product-image w-20 h-20 bg-gray-200 rounded-lg">
          <Image
            className="h-full rounded-xl"
            width={300}
            height={300}
            src={img || ""}
            alt="product"
          />
        </div>
        <div className="product-details flex flex-col justify-center">
          <p className="product-title">{title}</p>
          <p className="product-category text-gray-500">{category}</p>
          <p className="product-category text-gray-500">{size}</p>
        </div>
      </div>
      <p className="product-price col-span-1">${price}</p>
      <p className="product-quantity col-span-1">{quantity}</p>
      <p className="product-total-price col-span-1">${+price * quantity}</p>
      <button
        className="col-span-1 h-fit w-fit"
        onClick={() => removeFromCart(+id, size ?? "")}
      >
        <MdDelete className="text-3xl text-red-800" />
      </button>
    </div>
  );
};

export default CartProduct;
