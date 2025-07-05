"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"
import { useConfetti } from "@/components/confetti-controller"

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode
  delay?: number
  animation?: "pulse" | "bounce" | "scale"
  showConfetti?: boolean
}

export default function AnimatedButton({
  children,
  delay = 0,
  animation = "scale",
  showConfetti = false,
  ...props
}: AnimatedButtonProps) {
  const { triggerConfetti } = useConfetti()

  const animations = {
    pulse: {
      whileHover: {        
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (showConfetti) {
      triggerConfetti({
        particleCount: 100,
        spread: 70,
      })
    }

    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
      <motion.div {...animations[animation]}>
        <Button {...props} onClick={handleClick}>
          {children}
        </Button>
      </motion.div>
    </motion.div>
  )
}
