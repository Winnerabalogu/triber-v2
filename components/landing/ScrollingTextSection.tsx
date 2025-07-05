"use client";
import React from 'react';
import ScrollingText from "@/components/ScrollingText"

const ScrollingTextSection = () => {
  const textToScroll = "CONNECT • GROW • SUCCEED";

  return (
    <section
      className="bg-primary py-4 sm:py-10 md:py-12"
      >       
      <ScrollingText
        text={textToScroll}
        speed={30}
        direction="left"        
        className="font-danfo text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[120px] 2xl:text-[150px] font-bold wordSpacing-wider text-white dark:text-gray-100 uppercase tracking-wide"
        textSeparator="    •    "
        pauseOnHover={true}
      />
    </section>
  );
};

export default ScrollingTextSection;