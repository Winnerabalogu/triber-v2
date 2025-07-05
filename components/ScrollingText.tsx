"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface ScrollingTextProps {
  text: string;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  textSeparator?: string;
  pauseOnHover?: boolean;
}

export default function ScrollingText({
  text,
  speed = 50, 
  direction = "left",
  className = "font-danfo text-8xl font-bold text-white uppercase",
  textSeparator = " • ",
  pauseOnHover = true,
}: ScrollingTextProps) {
  const [repeatedText, setRepeatedText] = useState<string>("");
  const [contentWidth, setContentWidth] = useState(0); 
  const [isPaused, setIsPaused] = useState(false);  
  const motionDivRef = useRef<HTMLDivElement>(null);  
  useEffect(() => {   
    const repetitions = 10; 
    let fullText = "";
    for (let i = 0; i < repetitions; i++) {
      fullText += text + (i < repetitions - 1 ? textSeparator : "     ");
    }
    setRepeatedText(fullText);
  }, [text, textSeparator]);
  useEffect(() => {
    if (repeatedText && !contentWidth) {
      const tempSpan = document.createElement('span');      
      tempSpan.className = `${className} invisible absolute whitespace-nowrap`;
      tempSpan.textContent = repeatedText;
      document.body.appendChild(tempSpan);
      setContentWidth(tempSpan.offsetWidth);
      document.body.removeChild(tempSpan);
    }
  }, [repeatedText, className, contentWidth]);
  
  const duration = contentWidth > 0 ? contentWidth / speed : 0;

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  if (!repeatedText || duration === 0) { 
    return (
      <div className="overflow-hidden whitespace-nowrap">
        <span className={className}>{text}</span>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden w-full" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={motionDivRef}
        className="flex whitespace-nowrap" 
        initial={{ x: direction === "left" ? 0 : -contentWidth }}
        animate={{ x: direction === "left" ? -contentWidth : 0 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{
          ...(isPaused && pauseOnHover ? { animationPlayState: "paused" } : {}),
        }}
      >        
        <span
            className={`${className} inline-block`}            
        >
            {repeatedText}
        </span>
        <span
            className={`${className} inline-block`}
            aria-hidden="true"              
        >
            {repeatedText}
        </span>
      </motion.div>
    </div>
  );
}