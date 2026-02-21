"use client";
import {addNewProducts} from "@/action/product";
import { useActionState } from "react";

const AddProduct = () => {
  const [state, action, isPending] = useActionState(addNewProducts, undefined);
  return (
    <div className="bg-gray-700 min-h-screen flex flex-col items-center pb-5 ">
      <h1 className="text-4xl text-center text-white pt-25">Add Product</h1>
      <div className="flex justify-center items-center pt-10">
        <form
          action={action}
          className="flex flex-col gap-5 w-96 shadow p-3 bg-white rounded"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="file">Upload your Product Image</label>
            <input
              type="file"
              name="file"
              placeholder="your image"
              accept="image/*"
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Title</label>
            <input
              defaultValue={state?.title}
              type="text"
              name="title"
              placeholder="title"
              className="border border-gray-300 p-2 rounded"
            />
            {state?.errors?.title && (
              <p className="text-red-500 text-xs">{state.errors.title}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description">description</label>
            <input
              defaultValue={state?.description}
              type="text"
              name="description"
              placeholder="description"
              className="border border-gray-300 p-2 rounded"
            />
            {state?.errors &&
              "description" in state.errors &&
              state.errors.description && (
                <p className="text-red-500 text-xs">
                  {state.errors.description}
                </p>
              )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price">price</label>
            <input
              type="number"
              name="price"
              placeholder="price"
              className="border border-gray-300 p-2 rounded"
            />
            {state?.errors && "price" in state.errors && state.errors.price && (
              <p className="text-red-500 text-xs">{state.errors.price}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <select name="category" id="category">
              <option value="men's clothing">Men</option>
              <option value="women's clothing">Women</option>
              <option value="electronics's category">Electronics</option>
              <option value="jewelery's category">Jewelery</option>
            </select>
          </div>

          <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
            {isPending ? "adding..." : "add"}{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
