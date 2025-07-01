"use client"

import { useEffect, useRef, useState } from "react"

interface ConfettiProps {
  active: boolean
  duration?: number
  particleCount?: number
  colors?: string[]
  spread?: number
  gravity?: number
  onComplete?: () => void
  respectReducedMotion?: boolean
}

export default function Confetti({
  active,
  duration = 3000,
  particleCount = 100,
  colors = ["#0fb492", "#ffffff", "#2d2d2d", "#0d0f11", "#979797"],
  spread = 70,
  gravity = 1.2,
  onComplete,
  respectReducedMotion = true,
}: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const animationFrameRef = useRef<number | null>(null)
  const particlesRef = useRef<any[]>([])
  const startTimeRef = useRef<number | null>(null)

  // Check for reduced motion preference
  useEffect(() => {
    if (respectReducedMotion) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(mediaQuery.matches)

      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
    return undefined
  }, [respectReducedMotion])

  // Initialize and run the confetti animation
  useEffect(() => {
    if (!active || (respectReducedMotion && prefersReducedMotion)) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasDimensions()

    // Handle window resize
    window.addEventListener("resize", setCanvasDimensions)

    // Create confetti particles
    const createParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: canvas.width / 2,
          y: canvas.height / 2,
          size: Math.random() * 10 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          speed: Math.random() * 6 + 2,
          velocity: {
            x: Math.random() * spread - spread / 2,
            y: Math.random() * spread - spread / 2,
          },
          rotationSpeed: Math.random() * 0.2 - 0.1,
          shape: Math.random() > 0.5 ? "circle" : "square",
        })
      }
    }
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.velocity.x
        particle.y += particle.velocity.y + gravity

        // Apply gravity and friction
        particle.velocity.y += 0.1 * gravity
        particle.velocity.x *= 0.99
        particle.rotation += particle.rotationSpeed

        // Draw particle
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate((particle.rotation * Math.PI) / 180)
        ctx.fillStyle = particle.color

        if (particle.shape === "circle") {
          ctx.beginPath()
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
        }

        ctx.restore()
      })

      // Continue animation if duration hasn't elapsed
      if (elapsed < duration) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        // Animation complete
        if (onComplete) onComplete()
      }
    }

    // Start animation
    createParticles()
    animationFrameRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [active, colors, duration, gravity, onComplete, particleCount, prefersReducedMotion, respectReducedMotion, spread])

  if (respectReducedMotion && prefersReducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      aria-hidden="true"
      style={{ opacity: active ? 1 : 0, transition: "opacity 0.3s" }}
    />
  )
}
