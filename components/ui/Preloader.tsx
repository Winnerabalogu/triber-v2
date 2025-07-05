"use client"

import { motion } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { duration: 1, ease: "easeInOut" } },
  };

  const logoVariants = {
    animate: {
      scale: [1, 1.2, 1], 
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity, 
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background backdrop-blur-sm"
    >
      <motion.div
        variants={logoVariants}
        animate="animate"
      >
        <Image 
          src="/logo/logo.png"
          width={60}
          height={30}
          alt="Triber Preloader"
          priority 
        />
      </motion.div>
      
    </motion.div>
  );
}