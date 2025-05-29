"use client";
import { motion } from "framer-motion";

const AnimateProfile = ({ name }: { name: string }) => {
  return (
    <motion.h1
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 3, delay: 1.5 }}
      className="text-4xl text-white font-semibold overflow-hidden whitespace-nowrap text-center max-sm:text-2xl"
    >
      Welcome {name} to your profile
    </motion.h1>
  );
};

export default AnimateProfile;
