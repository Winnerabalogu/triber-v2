"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  once?: boolean
  animation?: "fadeIn" | "slideUp" | "scaleUp" | "fadeInLeft" | "fadeInRight"
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  once = true,
  animation = "fadeIn",
}: AnimatedSectionProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px 0px" }) // Default margin

  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.6, delay } },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay } },
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay } },
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay } },
    },
  }

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
    // Optional: If you want it to reset when out of view (if once = false)
    else if (!once) {
      controls.start("hidden");
    }
  }, [controls, isInView, once, delay]) // Added once and delay to ensure effect re-evaluates if these props change dynamically, though unlikely for this use case

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animations[animation]}
      className={className}
    >
      {children}
    </motion.div>
  )
}