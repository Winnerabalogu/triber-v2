"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import VideoModal from "@/components/video-modal"
import { motion } from "framer-motion"

interface VideoButtonProps {
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
   animation?: "pulse" | "bounce" | "scale"
  videoUrl?: string
  videoTitle?: string
  children: React.ReactNode
}

export default function VideoButton({
  variant = "outline",
  size = "default",
  className = "",
  animation = "scale",
  videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  videoTitle = "Triber: Connect. Grow. Succeed.",
  children,
}: VideoButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const animations = {
    pulse: {
      whileHover: {
        boxShadow: "0 0 8px rgba(15, 180, 146, 0.8)",
        transition: { duration: 0.2 },
      },
      whileTap: { scale: 0.98 },
    },
    bounce: {
      whileHover: { y: -3, transition: { duration: 0.2 } },
      whileTap: { y: 0, scale: 0.98 },
    },
    scale: {
      whileHover: { scale: 1.05, transition: { duration: 0.2 } },
      whileTap: { scale: 0.98 },
    },
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
    <motion.div {...animations[animation]}>
      <Button variant={variant} size={size} className={className} onClick={openModal}>
        {children}
      </Button>
    </motion.div>
      <VideoModal isOpen={isModalOpen} onClose={closeModal} videoUrl={videoUrl} videoTitle={videoTitle} />
    </>
  )
}
