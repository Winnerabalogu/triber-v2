"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ChallengeCardProps {
  title: string
  description: string
}

export default function ChallengeCard({ title, description }: ChallengeCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCardClick = () => {
    setIsExpanded(!isExpanded)
  }  
  const showDescription = isHovered || isExpanded

  return (
    <motion.div
      className="p-4 border-r border-[#2d2d2d] h-full transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      whileHover={{ backgroundColor: "rgba(15, 180, 146, 0.05)" }}  
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      <AnimatePresence>
        {showDescription && ( 
          <motion.p
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-[#979797] overflow-hidden"
          >
            {description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}