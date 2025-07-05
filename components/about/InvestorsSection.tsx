"use client"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

const investors = [
  { name: "Company 1", logo: "/images/partners/access.png?height=60&width=180" },
  { name: "Company 2", logo: "/images/partners/fcmb.png?height=60&width=180" },
  { name: "Company 3", logo: "/images/partners/gtbank.png?height=60&width=180" },
  { name: "Company 4", logo: "/images/partners/pecan.png?height=60&width=180" },
  { name: "Company 5", logo: "/images/partners/providus.png?height=60&width=180" },
  { name: "Company 6", logo: "/images/partners/wema.png?height=60&width=180" },
  { name: "Company 7", logo: "/images/partners/access.png?height=60&width=180" },
  { name: "Company 8", logo: "/images/partners/gtbank.png?height=60&width=180" },
]

export default function InvestorsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  
  const getSlidesPerView = () => {
    if (isMobile) return 2 
    if (isTablet) return 3 
    return 4 
  }

  const slidesPerView = getSlidesPerView()
  const totalSlides = Math.ceil(investors.length / slidesPerView)
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 640) 
      setIsTablet(width >= 640 && width < 1024) 
    }
    
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides)
      }, 5000) 
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, totalSlides])
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => !prev)
  }

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8 animate-on-scroll animate-fadeInUp">
          Investors
        </h2>
        <p className="text-muted-foreground text-sm md:text-sm mb-12 md:mb-16 max-w-xl md:max-w-2xl mx-auto animate-on-scroll animate-fadeInUp animate-delay-200 leading-relaxed px-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum quis ultrices.
        </p>

        {/* Slideshow Container */}
        <div className="relative">
          {/* Slideshow */}
          <div className="overflow-hidden relative mx-auto max-w-5xl">
            <div
              className="flex transition-transform duration-700 ease-in-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >              
              {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                const startIdx = slideIndex * slidesPerView
                const slideInvestors = investors.slice(startIdx, startIdx + slidesPerView)

                return (
                  <div
                    key={slideIndex}
                    className={`min-w-full flex justify-center items-center ${
                      isMobile ? "gap-4" : isTablet ? "gap-6" : "gap-8"
                    } px-4`}
                  >
                    {slideInvestors.map((investor, index) => (
                      <div
                        key={`${slideIndex}-${index}`}
                        className={`flex-1 flex justify-center items-center ${
                          isMobile ? "p-3" : "p-4 md:p-6"
                        } bg-card/20 rounded-xl hover:bg-card/40 transition-all duration-500 group hover:scale-105 hover-glow`}
                      >
                        <Image
                          src={investor.logo || "/placeholder.svg"}
                          alt={investor.name}
                          width={120} 
                          height={40}  
                          className={`${                            
                            isMobile ? "h-8" : isTablet ? "h-10" : "h-12 md:h-16"
                          } w-auto object-contain filter brightness-75 dark:brightness-50 group-hover:brightness-100 dark:group-hover:brightness-75 transition-all duration-500`}
                        />
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:translate-x-0 bg-background/90 dark:bg-card/90 p-3 rounded-full shadow-lg hover:bg-primary/10 hover:scale-110 transition-all duration-300 z-10 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-foreground" />
          </button>

          <button
            onClick={goToNextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-0 bg-background/90 dark:bg-card/90 p-3 rounded-full shadow-lg hover:bg-primary/10 hover:scale-110 transition-all duration-300 z-10 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-foreground" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 space-x-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-500 hover:scale-125 ${
                currentSlide === index
                  ? "bg-primary w-8 h-3 shadow-lg shadow-primary/30"
                  : "bg-muted hover:bg-primary/50 w-3 h-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Play/Pause Control */}
        <div className="flex justify-center mt-6">
          <button
            onClick={toggleAutoPlay}
            className="group flex items-center space-x-3 px-4 py-2 bg-card/30 hover:bg-card/50 rounded-full transition-all duration-300 hover:scale-105 hover-glow"
            aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              {/* Play Icon */}
              <Play
                className={`absolute w-4 h-4 text-foreground transition-all duration-300 ${
                  isAutoPlaying ? "opacity-0 scale-75 rotate-90" : "opacity-100 scale-100 rotate-0"
                }`}
              />
              {/* Pause Icon */}
              <Pause
                className={`absolute w-4 h-4 text-foreground transition-all duration-300 ${
                  isAutoPlaying ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-90"
                }`}
              />
            </div>
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              {isAutoPlaying ? "Pause" : "Play"}
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
