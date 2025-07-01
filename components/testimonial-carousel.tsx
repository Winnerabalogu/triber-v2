"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  quote: string
  image: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  autoPlay?: boolean
  interval?: number
}

export default function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Handle next slide
  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  // Handle previous slide
  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  // Jump to a specific slide
  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && !isPaused) {
      timerRef.current = setTimeout(() => {
        nextSlide()
      }, interval)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [currentIndex, autoPlay, interval, isPaused])

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
    }),
  }

  // Accessibility keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prevSlide()
    } else if (e.key === "ArrowRight") {
      nextSlide()
    }
  }

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Testimonials carousel"
    >
      {/* Main carousel area */}
      <div className="overflow-hidden relative rounded-xl bg-background dark-bg-foreground border border-[#2d2d2d]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Testimonial content */}
              <div className="flex flex-col justify-center">
                <div className="mb-6">
                  <Quote className="w-12 h-12 text-[#0fb492] opacity-50" />
                </div>
                <blockquote className="mb-8">
                  <p className="text-lg md:text-xl italic mb-6">{testimonials[currentIndex].quote}</p>
                  <footer className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#0fb492]">
                      <Image
                        src={testimonials[currentIndex].image || "/placeholder.svg"}
                        alt={testimonials[currentIndex].name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{testimonials[currentIndex].name}</p>
                      <p className="text-sm text-foreground dark-background">
                        {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </div>

              {/* Visual element - animated gradient */}
              <div className="hidden md:flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0fb492]/20 to-transparent rounded-lg" />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-64 h-64 rounded-full bg-gradient-to-br from-[#0fb492]/30 to-transparent flex items-center justify-center"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    className="w-48 h-48 rounded-full bg-gradient-to-br from-[#0fb492]/40 to-transparent flex items-center justify-center"
                  >
                    <div className="w-32 h-32 rounded-full bg-foreground/20 dark-bg-background/20 flex items-center justify-center">
                      <Quote className="w-16 h-16 text-[#0fb492]" />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-black/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0fb492]"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-black/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0fb492]"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0fb492] ${
              index === currentIndex ? "bg-[#0fb492] w-6" : "bg-foreground dark-bg-background hover:bg-[#0fb492]/50"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      {autoPlay && (
        <div className="mt-4 flex justify-center">
          <div className="relative w-full max-w-xs h-1 bg-foreground dark-bg-background rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-[#0fb492]"
              initial={{ width: "0%" }}
              animate={{ width: isPaused ? "0%" : "100%" }}
              transition={{
                duration: interval / 1000,
                ease: "linear",
                repeat: isPaused ? 0 : Number.POSITIVE_INFINITY,
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
