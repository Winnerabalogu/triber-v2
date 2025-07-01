"use client"

import type React from "react"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import InfoModal from "@/components/info-modal"

interface VideoSource {
  type: "youtube" | "vimeo" | "mp4" | "other"
  url: string
  title?: string
  poster?: string
}

interface AnimatedCapabilityCardProps {
  number: string
  title: string
  description: string
  index: number
  modalContent?: React.ReactNode
  video?: VideoSource
}

export default function AnimatedCapabilityCard({
  number,
  title,
  description,
  index,
  modalContent,
  video,
}: AnimatedCapabilityCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
 const router = useRouter();
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  // Default modal content if none provided
  const defaultModalContent = (
    <div>
      <p className="mb-4">{description}</p>
      <p className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
        Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
      </p>
      <p>
        Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere. Duis
        cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
      </p>
    </div>
  )

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="p-6 border-t border-[#2d2d2d] pt-12 relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={openModal}
        whileTap={{
          scale: 0.98,
          backgroundColor: "rgba(15, 180, 146, 0.05)",
          transition: { duration: 0.2 },
        }}
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 bg-[#0fb492]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />        
        <div className="relative mb-8">
          <motion.div
            className="text-8xl font-bold font-danfo pb-1  text-foreground dark-text-background hover:text-primary relative z-10 inline-block"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {number}
          </motion.div>
          <motion.div
            className="h-1 bg-[#0fb492] absolute bottom-0 left-0 text-foreground dark-text-background hover:text-primary"
            initial={{ width: "0%" }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Title with animated color */}
        <motion.h4
          className="text-xl font-semibold mb-4 hover:text-primary"
          animate={{ color: isHovered ? "#0fb492" : "text-foreground text-foreground" }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h4>        
        <motion.p
          className="text-[#979797]"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>

        {/* Learn more text and arrow that appears on hover */}
        <motion.div
          className="absolute bottom-6 right-6 flex items-center text-[#0fb492] text-sm font-medium"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          Learn more
          <ArrowRight className="ml-2 h-5 w-5" />
        </motion.div>
      </motion.div>

      <InfoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={title}
        content={modalContent || defaultModalContent}
        video={video}
        ctaText="Explore this capability"
         ctaAction={() => router.push('/auth/register')} 
      />
    </>
  )
}
