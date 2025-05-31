"use client";
import { useCartStore } from "@/app/store/CartStore";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
// types for fakestore products
type Object = {
  category: string;
  description?: string;
  id: number;
  image: string;
  price: string;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
};
export const ChoisedProdcut: Array<{
  quantity: number;
  size: string;
  price: string;
  img: string;
  title: string;
  category: string;
}> = [];

// types for user products
type newObject = {
  category: string;
  description?: string;
  price: string;
  title: string;
  userId: string;
  image?: string;
  id: string;
};

const ProductDetails = ({
  fakeproduct,
}: {
  fakeproduct: Object | newObject;
}) => {
  const items = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);
  const [count, setCount] = useState(0);
  const [productDetails, setProductDetails] = useState({
    size: "",
    price: fakeproduct.price,
    img: fakeproduct.image,
    title: fakeproduct.title,
    category: fakeproduct.category,
  });

  const handleCountChange = (action: string) => {
    if (action === "increment") {
      setCount((prevCount) => prevCount + 1);
    } else if (action === "decrement" && count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const handleSizeChange = (size: string) => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      size: size,
    }));
  };
  const handleAddToCart = () => {
    // Check if size is selected and count is greater than 0
    if (productDetails.size === null || count === 0) {
      alert("Please select a size and Quantity.");
    } else {
      alert("Product added to cart successfully!");
    }
    // Check if the product is already in the cart
    const existingItem = items.find(
      (item) =>
        item.id === fakeproduct.id &&
        item.size === productDetails.size &&
        item.category === fakeproduct.category
    );

    if (existingItem) {
      alert("This product with the same size is already in the cart.");
      return;
    }

    // Add the product to the cart

    addToCart({
      id: fakeproduct.id,
      title: fakeproduct.title,
      price: fakeproduct.price,
      img: fakeproduct.image,
      category: fakeproduct.category,
      size: productDetails.size,
      quantity: count,
    });
  };
  return (
    <div className="flex flex-col gap-5">
      {fakeproduct?.category === "men's clothing" ||
      fakeproduct?.category === "women's clothing" ? (
        <div className="sizes flex items-center gap-2">
          <p>SIZES : </p>
          <div className="flex gap-2">
            {["m", "lg", "xl", "xxl"].map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`px-2 bg-black/15 cursor-pointer border border-solid ${
                  productDetails.size === size
                    ? "bg-blue-700 text-white border-blue-700"
                    : ""
                }`}
              >
                {size.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="price flex gap-5">
        <p className="text-3xl text-red-800 font-semibold">
          ${fakeproduct.price}
        </p>
        {/* add discount any time */}
        {/* <p className="text-3xl text-blue-700 font-semibold">
          ${Math.floor(+fakeproduct.price - +fakeproduct.price * 0.2)}
        </p> */}
      </div>

      <div
        className="w-full  flex justify-center gap-3
          "
      >
        <div className="count flex items-center rounded-4xl bg-black text-white gap-4 px-3 py-1">
          <button
            onClick={() => handleCountChange("decrement")}
            className="bg-white rounded-4xl text-black px-2 "
          >
            -
          </button>
          <p>{count}</p>
          <button
            onClick={() => handleCountChange("increment")}
            className="bg-white rounded-4xl text-black px-2"
          >
            +
          </button>
        </div>
        <button
          onClick={() => {
            // For clothing, require size and quantity
            if (
              count === 0 ||
              ((fakeproduct.category === "men's clothing" ||
                fakeproduct.category === "women's clothing") &&
                productDetails.size === "")
            ) {
              alert("Please select a size and quantity.");
              return; // Prevent further action
            }
            handleAddToCart();
          }}
          className="flex items-center justify-center rounded-4xl px-5 py-3 cursor-pointer group max-sm:w-full gap-3 bg-black text-white w-[50%]"
        >
          Add To Cart
          <FaShoppingCart className="group-hover:translate-x-4 duration-150" />
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
