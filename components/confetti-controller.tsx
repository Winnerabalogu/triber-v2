"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import Confetti from "@/components/confetti"

interface ConfettiContextType {
  triggerConfetti: (options?: {
    duration?: number
    particleCount?: number
    colors?: string[]
    spread?: number
    gravity?: number
  }) => void
}

const ConfettiContext = createContext<ConfettiContextType | undefined>(undefined)

export function useConfetti() {
  const context = useContext(ConfettiContext)
  if (!context) {
    throw new Error("useConfetti must be used within a ConfettiProvider")
  }
  return context
}

interface ConfettiProviderProps {
  children: ReactNode
}

export function ConfettiProvider({ children }: ConfettiProviderProps) {
  const [isActive, setIsActive] = useState(false)
  const [confettiOptions, setConfettiOptions] = useState({
    duration: 3000,
    particleCount: 100,
    colors: ["#0fb492", "#ffffff", "#2d2d2d", "#0d0f11", "#979797"],
    spread: 70,
    gravity: 1.2,
  })

  const triggerConfetti = useCallback((options = {}) => {
    setConfettiOptions((prev) => ({ ...prev, ...options }))
    setIsActive(true)
  }, [])

  const handleComplete = useCallback(() => {
    setIsActive(false)
  }, [])

  return (
    <ConfettiContext.Provider value={{ triggerConfetti }}>
      {children}
      <Confetti
        active={isActive}
        duration={confettiOptions.duration}
        particleCount={confettiOptions.particleCount}
        colors={confettiOptions.colors}
        spread={confettiOptions.spread}
        gravity={confettiOptions.gravity}
        onComplete={handleComplete}
      />
    </ConfettiContext.Provider>
  )
}
