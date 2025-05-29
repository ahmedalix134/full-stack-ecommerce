"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";

const CategoriesPage = ({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon?: ReactNode;
}) => {
  return (
    <div className=" py-30 px-5 flex flex-col gap-10 justify-center items-center ">
      <div className="flex items-center text-4xl gap-5 text-white">
        <motion.h1
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ x: 1000 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          {icon}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default CategoriesPage;
