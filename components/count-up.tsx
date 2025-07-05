"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface CountUpProps {
  end: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}

export default function CountUp({
  end,
  duration = 2000,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: CountUpProps) {
  const [count, setCount] = useState(decimals > 0 ? (0).toFixed(decimals) : "0")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" })
  const [hasAnimated, setHasAnimated] = useState(false)
  useEffect(() => {    
      
    if (isInView && !hasAnimated) {     
      setHasAnimated(true);

      let startTime: number | null = null
      let animationFrameId: number

      const animate = (timestamp: number) => {
        if (startTime === null) {
          startTime = timestamp
        }
        const elapsedTime = timestamp - startTime
        const progress = Math.min(elapsedTime / duration, 1)
        const currentVal = progress * end

        if (decimals > 0) {
          setCount(currentVal.toFixed(decimals))
        } else {
          setCount(Math.floor(currentVal).toString())
        }

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate)
        } else {         
          if (decimals > 0) {
            setCount(end.toFixed(decimals))
          } else {
            setCount(end.toString())
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)

      return () => {   
        cancelAnimationFrame(animationFrameId)
      }
    }   
  }, [isInView, end, duration, decimals, prefix, suffix])
  

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count} 
      {suffix}
    </span>
  )
}