"use client";
import { motion } from "motion/react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className=" hero bg-cover bg-no-repeat h-[100vh] w-full">
      <div className="absolute w-full h-full">
        <motion.div
          initial={{ y: -300 }}
          animate={{ y: 50 }}
          transition={{ duration: 1 }}
          className="absolute top-[35%] left-[50%] flex flex-col items-center -translate-[50%]"
        >
          <h1 className="text-5xl text-white w-max max-md:text-3xl ">
            Your Fashion Starts Here
          </h1>
          <p className="text-gray-400 text-xl w-max max-md:text-lg  max-md:w-fit text-center ">
            Browse our latest collections for men and women. Fast shipping. Easy
            returns
          </p>
        </motion.div>
        <Link href={"/allproducts"}>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="btn-explore "
          >
            Explore Collection
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
