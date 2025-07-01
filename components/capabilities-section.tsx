"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import AnimatedCapabilityCard from "@/components/animated-capability-card"

interface VideoSource {
  type: "youtube" | "vimeo" | "mp4" | "other"
  url: string
  title?: string
  poster?: string
}

export interface Capability {
  number: string
  title: string
  description: string
  modalContent?: React.ReactNode
  video?: VideoSource   
}

interface CapabilitiesSectionProps {
  capabilities: Capability[]
}

export default function CapabilitiesSection({ capabilities }: CapabilitiesSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const lineVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div ref={ref} className="mt-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mb-16"
      >
        <motion.h2 variants={titleVariants} className="text-3xl font-bold mb-4">
          Capabilities
        </motion.h2>
        <motion.div variants={lineVariants} className="h-0.5 w-full max-w-[100px] bg-[#0fb492]" />
      </motion.div>

      <div className="grid md:grid-cols-4 gap-8">
        {capabilities.map((capability, index) => (
          <AnimatedCapabilityCard
            key={index}
            number={capability.number}
            title={capability.title}
            description={capability.description}
            modalContent={capability.modalContent}
            video={capability.video}
            index={index}
          />
        ))}
      </div>      
      <div className="hidden md:block">
        <motion.div
          className="absolute top-1/2 left-[25%] right-[75%] h-0.5 bg-[#0fb492]/30"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ transformOrigin: "left" }}
        />
        <motion.div
          className="absolute top-1/2 left-[50%] right-[50%] h-0.5 bg-[#0fb492]/30"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ transformOrigin: "left" }}
        />
        <motion.div
          className="absolute top-1/2 left-[75%] right-[25%] h-0.5 bg-[#0fb492]/30"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </div>
  )
}
