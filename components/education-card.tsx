"use client"

import type React from "react"
import { useRouter } from "next/navigation";
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import InfoModal from "@/components/info-modal"

export interface VideoSource {
  type: "youtube" | "vimeo" | "mp4" | "other"
  url: string
  title?: string
  poster?: string
}

export interface EducationCardProps {
  image: string
  title: string
  description: string
  modalContent?: React.ReactNode
  video?: VideoSource
}

export default function EducationCard({ image, title, description, modalContent, video }: EducationCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter();
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
    
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
        className="group relative rounded-xl overflow-hidden border border-[#2d2d2d] bg-background h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >        
        <div className="relative h-64 overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </motion.div>
          
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#000000] to-transparent opacity-70"
            animate={{ opacity: isHovered ? 0.9 : 0.7 }}
            transition={{ duration: 0.3 }}
          />          
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-[#0fb492]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ transformOrigin: "left" }}
          />
        </div>
        
        <div className="p-6">
          <motion.h3
            className="text-xl font-semibold mb-3"
            animate={{ color: isHovered ? "#0fb492" : "--background" }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>

          <p className="text-sm text-[#979797] mb-4">{description}</p>
          
          <motion.button
            onClick={openModal}
            className="flex items-center text-[#0fb492] text-sm font-medium relative overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            whileHover={{
              scale: 1.05,
              x: 5,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            Learn more
            <motion.div
              initial={{ x: 0 }}
              animate={isHovered ? { x: [0, 5, 0] } : { x: 0 }}
              transition={{
                repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                repeatType: "loop",
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="ml-2"
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>

      <InfoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={title}
        content={modalContent || defaultModalContent}
        image={video ? undefined : image}
        video={video}
        ctaText="Get Started"
        ctaAction={() => router.push('/auth/register')} 
      />
    </>
  )
}
