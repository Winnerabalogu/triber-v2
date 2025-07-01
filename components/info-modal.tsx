"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button" // Assuming this path is correct
import { useConfetti } from "@/components/confetti-controller" // Assuming this path is correct

interface VideoSource {
  type: "youtube" | "vimeo" | "mp4" | "other"
  url: string
  title?: string
  poster?: string
}

interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: React.ReactNode
  image?: string
  video?: VideoSource
  ctaText?: string
  ctaAction?: () => void
}

export default function InfoModal({
  isOpen,
  onClose,
  title,
  content,
  image,
  video,
  ctaText,
  ctaAction,
}: InfoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const { triggerConfetti } = useConfetti()

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

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
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      const closeButton = document.getElementById("info-modal-close")
      if (closeButton) closeButton.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
     // Reset video loaded state when modal closes or video changes
    if (!isOpen) {
        setVideoLoaded(false);
    }
  }, [isOpen])

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause()
      else videoRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoContainerRef.current) {
      if (!isFullscreen) {
        if (videoContainerRef.current.requestFullscreen) videoContainerRef.current.requestFullscreen()
      } else {
        if (document.exitFullscreen) document.exitFullscreen()
      }
      // setIsFullscreen(!isFullscreen); // This is handled by the 'fullscreenchange' event listener
    }
  }

  const handleCtaClick = () => {
    triggerConfetti({
      particleCount: 150,
      spread: 90,
      colors: ["#0fb492", "#ffffff", "#f5f5f5", "#0d0f11", "#979797"],
    })
    if (ctaAction) ctaAction()
  }

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const getVimeoId = (url: string) => {
    const regExp = /vimeo\.com\/(?:video\/)?([0-9]+)/
    const match = url.match(regExp)
    return match ? match[1] : null
  }

  useEffect(() => {
    if (isOpen) { 
      setVideoLoaded(false);
    }
  }, [video, isOpen]); 

  useEffect(() => {
    if (!isOpen) {       
    }
  }, [isOpen])


  const renderVideo = () => {
    if (!video) return null;   
    switch (video.type) {
      case "youtube": {
        const youtubeId = getYouTubeId(video.url);
        if (!youtubeId) return <p className="text-red-500">Invalid YouTube URL</p>;
        return (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0&modestbranding=1&playsinline=1`}
              title={video.title || "YouTube video"}
              className="absolute top-0 left-0 h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => setTimeout(() => setVideoLoaded(true), 300)} // Add slight delay for iframe to actually render
            ></iframe>
            {!videoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0fb492] border-t-transparent"></div>
              </div>
            )}
          </div>
        )
      }
      case "vimeo": {
        const vimeoId = getVimeoId(video.url)
        if (!vimeoId) return <p className="text-red-500">Invalid Vimeo URL</p>
        return (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}?autoplay=0&title=0&byline=0&portrait=0`}
              title={video.title || "Vimeo video"}
              className="absolute top-0 left-0 h-full w-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              onLoad={() => setTimeout(() => setVideoLoaded(true), 300)}
            ></iframe>
            {!videoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0fb492] border-t-transparent"></div>
              </div>
            )}
          </div>
        )
      }
      case "mp4":
        return (
          <div ref={videoContainerRef} className="relative aspect-video w-full overflow-hidden rounded-lg bg-black group">
            <video
              ref={videoRef}
              src={video.url}
              poster={video.poster}
              className="h-full w-full object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onLoadedData={() => setVideoLoaded(true)}
              playsInline
              controls={false} // Disable native controls to use custom ones
            />
            {!videoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0fb492] border-t-transparent"></div>
              </div>
            )}
             {videoLoaded && (
              <>
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/60 p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100">
                  <button
                    onClick={togglePlay}
                    className="rounded-full p-1 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#0fb492]"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="rounded-full p-1 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#0fb492]"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={toggleFullscreen}
                      className="rounded-full p-1 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#0fb492]"
                      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                    >
                      {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center focus:outline-none"
                    aria-label="Play video"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0fb492]/80 text-white transition-transform duration-300 hover:scale-110">
                      <Play className="h-8 w-8 fill-white" />
                    </div>
                  </button>
                )}
              </>
            )}
          </div>
        )
      default:
        return <p className="text-red-500">Unsupported video type</p>
    }
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
  }

  const modalContentVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 300, duration: 0.4 } },
        exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
      }

  const contentContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1, when: "beforeChildren" } },
  }

  const contentItemVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

  const decorVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: { opacity: 0, pathLength: 0 },
        visible: { opacity: 1, pathLength: 1, transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 } },
      }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 perspective-1000">
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            aria-hidden="true"
          />

          <motion.div
            ref={modalRef}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalContentVariants}
            className="relative flex flex-col bg-[#101214] rounded-xl shadow-2xl border border-[#2d2d2d] 
                       w-full max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="info-modal-title"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 opacity-10 pointer-events-none">
              <motion.svg viewBox="0 0 100 100" className="w-full h-full text-[#0fb492]" initial="hidden" animate="visible">
                <motion.circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" variants={decorVariants} />
              </motion.svg>
            </div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 opacity-10 pointer-events-none">
              <motion.svg viewBox="0 0 100 100" className="w-full h-full text-[#0fb492]" initial="hidden" animate="visible">
                <motion.circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" variants={decorVariants} />
              </motion.svg>
            </div>

            <div className="relative shrink-0">
              <div className="flex justify-between items-center p-4 sm:p-5 border-b border-[#2a2d30]">
                <motion.h2
                  id="info-modal-title"
                  className="text-lg sm:text-xl font-semibold text-gray-100"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {title}
                </motion.h2>
                <motion.button
                  id="info-modal-close"
                  onClick={onClose}
                  className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-[#2a2d30] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0fb492] relative overflow-hidden group"
                  aria-label="Close modal"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.90 }}
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.button>
              </div>
              <motion.div
                className="h-[1.5px] bg-[#0fb492]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "circOut" }}
                style={{ transformOrigin: "left" }}
              />
            </div>

            <motion.div
              className="flex-grow p-4 sm:p-6 overflow-y-auto"
              variants={contentContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {video ? (
                <motion.div variants={contentItemVariants} className="mb-4 sm:mb-6">
                  {renderVideo()}
                </motion.div>
              ) : image ? (
                <motion.div
                  variants={contentItemVariants}
                  className="mb-4 sm:mb-6 rounded-lg overflow-hidden border border-[#2a2d30]"
                >
                  <motion.img
                    src={image || "/placeholder.svg"} // Provide a fallback placeholder
                    alt={title || "Modal image"}
                    className="w-full h-auto max-h-[35vh] sm:max-h-[40vh] object-contain rounded-md bg-black/10"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ) : null}

              <motion.div
                variants={contentItemVariants}
                className="prose prose-sm sm:prose-base prose-invert max-w-none text-gray-300 
                           [&_p]:leading-relaxed [&_ul]:pl-5 [&_li]:mb-1
                           [&_h1]:text-2xl [&_h1]:text-gray-100 [&_h1]:font-semibold
                           [&_h2]:text-xl [&_h2]:text-gray-100 [&_h2]:font-semibold
                           [&_h3]:text-lg [&_h3]:text-gray-100 [&_h3]:font-semibold
                           [&_a]:text-[#0fb492] [&_a:hover]:underline"
              >
                {content}
              </motion.div>

              {ctaText && (
                <motion.div variants={contentItemVariants} className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#2a2d30]">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex justify-center sm:justify-start">
                    <Button
                      onClick={handleCtaClick}
                      className="bg-[#0fb492] hover:bg-[#0da382] text-white font-semibold relative overflow-hidden group px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative">{ctaText}</span>
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}