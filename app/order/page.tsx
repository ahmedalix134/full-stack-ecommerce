"use client";
import React from "react";
import { useCartStore } from "../store/CartStore";
import addOrder from "@/action/orders";

const order = () => {
  const items = useCartStore((state) => state.items);
  const [state, action, isPending] = React.useActionState(addOrder, undefined);
  return (
    <div className="pt-40 flex max-sm:flex-col gap-5 px-3 justify-evenly items-center pb-15 bg-gray-400">
      <form
        action={action}
        className="flex flex-col gap-5 w-96 shadow p-3 bg-white rounded"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="number"
            placeholder="Number"
            className="border border-gray-300 p-2 rounded"
          />
          {/* {state?.errors?.title && (
            <p className="text-red-500 text-xs">{state.errors.title}</p>
          )} */}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">description</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="border border-gray-300 p-2 rounded"
          />
          {/* {state?.errors &&
            "description" in state.errors &&
            state.errors.description && (
              <p className="text-red-500 text-xs">{state.errors.description}</p>
            )} */}
        </div>
        <input
          type="hidden"
          name="items"
          hidden
          defaultValue={JSON.stringify(items)}
        />

        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
          {isPending ? "ordering..." : "Order"}{" "}
        </button>
      </form>
    </div>
  );
};

export default order;
