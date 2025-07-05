"use client"

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthLayoutProps {
  imageSrc: string;
  children: React.ReactNode;
}

export default function AuthLayout({ imageSrc, children }: AuthLayoutProps) {
  const imageVariants = {
    initial: { opacity: 0, scale: 1.05 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (    
    <div className="min-h-screen w-full bg-background lg:p-16 flex items-center justify-center">
            
      <Link href="/" className="absolute top-6 left-6 z-20 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Go Back</span>
      </Link>      
      <div className="w-full h-screen lg:h-auto lg:max-h-[100vh] lg:max-w-6xl lg:grid lg:grid-cols-2 lg:rounded-3xl lg:shadow-2xl">
        
        {/* Left Side: Image */}
        <div className="hidden lg:block relative bg-muted">
          <AnimatePresence mode="wait">
            <motion.div
              key={imageSrc} 
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={imageSrc}
                alt="Authentication background"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Right Side: Form */}
        <div className="flex items-center justify-center p-6 sm:p-12 min-h-screen lg:min-h-0 bg-background">
          <div className="w-full max-w-md">
              {children}
          </div>
        </div>
      </div>
    </div>
  );
}