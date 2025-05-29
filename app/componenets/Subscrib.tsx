import React from "react";

const Subscrib = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 h-50 py-10">
      <h1 className="text-2xl font-semibold max-sm:text-xl">
        Subscribe Now and get 20% off
      </h1>
      <div className=" flex items-center max-sm:w-80   w-100 h-20 relative ">
        <input
          className="w-full h-full rounded-2xl px-3 border border-solid "
          type="email"
        />
        <button className="bg-blue-950 text-white text-lg cursor-pointer hover:bg-blue-900 py-2 px-5 h-full rounded-2xl absolute right-0">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Subscrib;
