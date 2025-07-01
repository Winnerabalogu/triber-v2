"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export interface Logo {
  name: string
  logo: string
}

interface ScrollingLogosProps {
  logos: Logo[]
  speed?: number
  direction?: "left" | "right"
  gap?: number
}

export default function ScrollingLogos({ logos, speed = 25, direction = "left", gap = 40 }: ScrollingLogosProps) {
  const [duplicatedLogos, setDuplicatedLogos] = useState<Logo[]>([])
  const [containerWidth, setContainerWidth] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {    
    setDuplicatedLogos([...logos, ...logos, ...logos])
  }, [logos])
  
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.scrollWidth / 3)
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.scrollWidth / 3)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [duplicatedLogos])

  // Animation duration based on container width and speed
  const duration = containerWidth / speed

  return (
    <div
      className="overflow-hidden relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        ref={containerRef}
        className="flex items-center"
        animate={{
          x: direction === "left" ? -containerWidth : containerWidth,
        }}
        initial={{
          x: direction === "left" ? 0 : -containerWidth,
        }}
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{
          paddingLeft: gap,
          paddingRight: gap,
          ...(isPaused ? { animationPlayState: "paused" } : {}),
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300"
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            <Image
              src={logo.logo || "/placeholder.svg"}
              alt={logo.name}
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
            />
          </div>
        ))}
      </motion.div>

      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-[#0d0f11] to-transparent z-10"></div>
      <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#0d0f11] to-transparent z-10"></div>
    </div>
  )
}
