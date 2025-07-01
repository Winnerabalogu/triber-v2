"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export interface Panel {
  id: number
  src: string
  alt: string
  title?: string
  description?: string
}

interface ExpandablePanelProps {
  panels: Panel[] 
}

export default function ExpandablePanel({ panels }: ExpandablePanelProps) {
  const [centerIndex, setCenterIndex] = useState<number>(Math.floor(panels.length / 2))

  const handlePanelClick = (clickedIndex: number) => {
    setCenterIndex(clickedIndex)
  }
  
  const getInfiniteIndex = (index: number) => {
    return ((index % panels.length) + panels.length) % panels.length
  }
  
  const getVisiblePanels = () => {
    const visiblePanels = []
    const totalVisible = 5
    const start = centerIndex - Math.floor(totalVisible / 2)
    
    for (let i = 0; i < totalVisible; i++) {
      const actualIndex = getInfiniteIndex(start + i)
      const relativePosition = i - Math.floor(totalVisible / 2)
      visiblePanels.push({
        ...panels[actualIndex],
        originalIndex: actualIndex,
        relativePosition,
        displayIndex: i
      })
    }
    return visiblePanels
  }

  const visiblePanels = getVisiblePanels()

  return (
    <div className="flex h-[600px] rounded-xl overflow-hidden border-l-4 border-r-4 border-[#0fb492] bg-black">
      {visiblePanels.map((panel, displayIndex) => {
        const isCenter = panel.relativePosition === 0
        const distance = Math.abs(panel.relativePosition)                
        let width = "w-1/5"
        if (isCenter) {
          width = "w-4/5"
        } else if (distance === 1) {
          width = "w-1/5"
        }
        
        const scale = 1 
        const zIndex = isCenter ? 20 : Math.max(1, 1 - distance)

        return (
          <motion.div
            key={`${panel.originalIndex}-${centerIndex}`}
            className={`relative ${width} cursor-pointer overflow-hidden h-full`}
            style={{ zIndex }}
            onClick={() => handlePanelClick(panel.originalIndex)}
            initial={{ 
              scale: 0.9,
              x: panel.relativePosition * 50
            }}
            animate={{ 
              scale,
              x: 0
            }}
            transition={{ 
              duration: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
              type: "tween"
            }}
            layout
          >
            <motion.div 
              className="relative w-full h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
             <div className="relative w-full h-full overflow-hidden">
                  <Image
                      src={panel.src || "https://images.unsplash.com/photo-1649972904349-6e44c47?w=800&h=600&fit=crop"}
                      alt={panel.alt}
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                      className="object-cover"         
                  />
              </div>                        
              {!isCenter 
              }
            </motion.div>

            <AnimatePresence>
              {isCenter && panel.title && panel.description && (
                <motion.div
                  initial={{ opacity: 1, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 text-center text-white"
                >
                  <motion.h3 
                    className="text-2xl font-bold mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, ease: "easeOut" }}
                  >
                    {panel.title}
                  </motion.h3>
                  <motion.p 
                    className="text-sm leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, ease: "easeOut" }}
                  >
                    {panel.description}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active indicator */}
            {isCenter && (
              <motion.div
                className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#0fb492] rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, ease: "easeOut" }}
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
