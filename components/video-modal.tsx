"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  videoTitle?: string
}

export default function VideoModal({ isOpen, onClose, videoUrl, videoTitle = "Triber Video" }: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscKey)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
      // Stop video when modal closes
      if (iframeRef.current) {
        const currentSrc = iframeRef.current.src
        iframeRef.current.src = "" // Clear src to stop video
        // Optionally, restore src if you want it to be ready for next open, but usually not needed
        // iframeRef.current.src = currentSrc; 
      }
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      const closeButton = document.getElementById("video-modal-close")
      if (closeButton) closeButton.focus()
    }
  }, [isOpen])

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const youtubeId = getYouTubeVideoId(videoUrl)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"> {/* Reduced padding on smallest screens */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 220, duration: 0.3 }}
            className="relative flex flex-col bg-[#0A0C0E] rounded-xl shadow-2xl border border-[#2d2d2d]
                       w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl
                       max-h-[95vh] sm:max-h-[90vh] overflow-hidden" // Responsive max-width & max-height
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
          >
            <div className="flex justify-between items-center p-3 sm:p-4 border-b border-[#2a2d30] shrink-0">
              <h2 id="video-modal-title" className="text-sm sm:text-base md:text-lg font-semibold text-gray-200 truncate pr-2">
                {videoTitle}
              </h2>
              <button
                id="video-modal-close"
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-full text-gray-400 hover:text-white hover:bg-[#2a2d30] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0fb492]"
                aria-label="Close video"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            <div className="flex-grow flex items-center justify-center bg-black overflow-hidden">
              {youtubeId ? (
                <div className="w-full aspect-video"> {/* Maintain 16:9 aspect ratio */}
                  <iframe
                    ref={iframeRef}
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3`}
                    title={videoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                  ></iframe>
                </div>
              ) : (
                <div className="w-full aspect-video flex items-center justify-center text-gray-400">
                  <p>Invalid video URL or video not found.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}