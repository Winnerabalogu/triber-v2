"use client"

import AnimatedSection from "@/components/animated-section"
import ScrollingLogos, { type Logo } from "@/components/scrolling-logos"
import VideoButton from "@/components/video-button"
import { useConfetti } from "@/components/confetti-controller"
import { Play } from "lucide-react"
import AnimatedButton from "../animated-button"
import Link from "next/link"

interface PartnersJourneySectionProps {
  partnerLogos: Logo[]
  promoVideoUrl: string
}

export default function PartnersJourneySection({ partnerLogos, promoVideoUrl }: PartnersJourneySectionProps) {
  const { triggerConfetti } = useConfetti()

  return (    
    <section className="relative py-20 border-b border-border overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20" 
      >
        <source src="/bg_video/star.mp4" type="video/mp4" />      
      </video>                  
       <div className="absolute inset-0 -z-10"></div>
      <div className="relative z-0 container mx-auto px-6">
        <AnimatedSection animation="fadeIn">          
          <h2 className="text-2xl font-bold mb-12 text-white text-center">Trusted by industry leading partners</h2>
        </AnimatedSection>        
        <AnimatedSection animation="fadeIn" delay={0.2} className="mb-24 backdrop-blur-sm pt-3 pb-3 rounded-lg">          
          <ScrollingLogos logos={partnerLogos} speed={20} />
        </AnimatedSection>

        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="fadeIn">            
            <h2 className="text-4xl font-bold mb-12 text-white">Our journey began in 2021</h2>
          </AnimatedSection>          
          <AnimatedSection animation="fadeIn" delay={0.2}>
            <p className="text-gray-200 mb-8"> 
              In 2021, we set out on a mission fueled by a simple yet powerful belief: that great businesses are the
              backbone of the global economy, but too many entrepreneurs are held back by the complexities of
              fundraising.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fadeIn" delay={0.3}>
            <p className="text-gray-200 mb-8"> 
              As of 2023, we have helped raise over KSh 1.61bn in growth funds for several SMEs.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fadeIn" delay={0.4}>
            <p className="text-gray-200 mb-12"> 
              We see talented entrepreneurs with brilliant ideas struggling to bring their visions to life, not due to
              a lack of quality or creativity, but owing to funding and accelerator barriers that seemed
              insurmountable, and that's where we come in.
            </p>
          </AnimatedSection>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <AnimatedButton
              className="bg-white hover:bg-gray-200 text-black
                         px-6 py-3 text-base rounded-md w-full sm:w-auto"
              onClick={() => triggerConfetti()}
            >
              <Link href="/auth/register">
              Start for free
              </Link>
            </AnimatedButton>
            <VideoButton
              variant="outline"              
              className="border-white hover:border-primary text-foreground dark:text:foreground hover:text-primary
                         px-6 py-3 text-base rounded-md flex items-center gap-2 w-full sm:w-auto"
              videoUrl={promoVideoUrl}
              videoTitle="Our Journey at Triber"
            >
               <div
                  className="bg-white/80 hover:bg-white
                             rounded-full p-1 flex items-center justify-center
                             h-6 w-6 sm:h-7 sm:w-7 transition-colors"
                >
                  <Play
                      className="h-3 w-3 sm:h-4 sm:w-4
                                 text-black
                                 fill-black transition-colors"
                  />
                </div>
              <span>Watch our video</span>
            </VideoButton>
          </div>
        </div>
      </div>
    </section>
  )
}