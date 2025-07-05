"use client"
import AnimatedSection from "@/components/animated-section"
import AnimatedButton from "@/components/animated-button"
import CountUp from "@/components/count-up"
import ExpandablePanel, { type Panel } from "@/components/expandable-panel"
import VideoButton from "@/components/video-button"
import { Play } from "lucide-react"
import Link from "next/link"

interface HeroSectionProps {
  imagePanels: Panel[]
  promoVideoUrl: string
}

export default function HeroSection({ imagePanels, promoVideoUrl }: HeroSectionProps) {
  return (    
    <section className="relative py-16 border-b border-border overflow-hidden">      
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20"         
      >      
        <source src="/bg_video/globe.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>      
      <div className="absolute inset-0 bg-foreground/50 dark:bg-background/50 -z-10"></div>      
      <div className="relative z-0 container mx-auto px-6">
        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            <div className="max-w-4xl mx-auto mb-20 text-center">
              <AnimatedSection animation="fadeIn">
                <h1 className="font-noto-serif text-center text-5xl sm:text-5xl md:text-7xl lg:text-7xl font-bold mb-6 leading-tight sm:leading-snug break-words text-white">                 
                  <span>Connect.</span>
                  <span className="text-primary">Grow.</span>
                  <span>Succeed</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection animation="fadeIn" delay={0.2}>
                <p className="font-noto-serif text-white text-lg sm:text-xl max-w-2xl mx-auto mb-10">
                  The pioneering platform.
                  <br />
                 <span className="font-noto-serif text-gray-400 text-2xl"> Connecting SMEs and startups with investors</span>
                </p>
              </AnimatedSection>

              <AnimatedSection
                animation="fadeIn"
                delay={0.4}
                className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
              >
                <AnimatedButton
                  className="bg-white hover:bg-gray-200 text-black
                             px-6 py-3 text-base rounded-full
                             sm:px-8 sm:py-5 sm:text-lg transition-colors"
                >
                  <Link href={"/auth/register"}>
                  Get Started
                  </Link>
                </AnimatedButton>

                <VideoButton
                  variant="outline"
                  className="border-transparent bg-transparent text-background dark:text-foreground hover:text-primary
                             px-6 py-3 text-base rounded-full 
                             sm:px-8 sm:py-5 sm:text-lg
                             flex items-center gap-2 sm:gap-3"
                  videoUrl={promoVideoUrl}
                  videoTitle="Triber: Connecting SMEs and Startups with Investors"
                >
                  <div
                    className="border border-white hover:border-primary dark:border-white
                               rounded-full p-1 flex items-center justify-center
                               h-6 w-6 sm:h-7 sm:w-7 transition-colors"
                  >
                    <Play
                        className="h-2 w-2 sm:h-3 sm:w-3
                                   fill-white transition-colors"
                    />
                  </div>
                  <span>Watch our video</span>
                </VideoButton>
              </AnimatedSection>

              {/* Statistics Row */}
              <div className="flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8 mt-16 sm:mt-20">
                <AnimatedSection animation="fadeIn" delay={0.1} className="text-center">
                  <h3 className="font-noto-serif text-3xl font-bold mb-1 text-white">
                    <CountUp end={3} suffix="+" className="font-bold" />
                  </h3>
                  <p className="font-noto-serif text-xs text-gray-400">years of funding</p>
                </AnimatedSection>

                <AnimatedSection animation="fadeIn" delay={0.2} className="text-center">
                  <h3 className="text-3xl font-bold mb-1 text-white">
                    <CountUp end={200} suffix="+" className="font-bold" />
                  </h3>
                  <p className="text-xs text-gray-400">business accelerators</p>
                </AnimatedSection>

                <AnimatedSection animation="fadeIn" delay={0.3} className="text-center">
                  <h3 className="text-3xl font-bold mb-1 text-white">
                    <CountUp end={12} className="font-bold" />
                  </h3>
                  <p className="text-xs text-gray-400">banking partners</p>
                </AnimatedSection>

                <AnimatedSection animation="fadeIn" delay={0.4} className="text-center">
                  <h3 className="text-3xl font-bold mb-1 text-white">
                    <CountUp end={1.61} decimals={2} suffix="b" className="font-bold" />
                  </h3>
                  <p className="text-xs text-gray-400">funds raised</p>
                </AnimatedSection>

                <AnimatedSection animation="fadeIn" delay={0.5} className="text-center">
                  <h3 className="text-3xl font-bold mb-1 text-white">
                    <CountUp end={300} suffix="+" className="font-bold" />
                  </h3>
                  <p className="text-xs text-gray-400">financial experts</p>
                </AnimatedSection>
              </div>
            </div>

            <div className="text-center mb-16 max-w-3xl mx-auto">
              <AnimatedSection animation="fadeIn">
                <h2 className="font-noto-serif text-3xl md:text-4xl font-bold mb-6 text-white">
                  Grow a stronger, smarter business
                  <br />
                  at every stage.
                </h2>
              </AnimatedSection>
              <AnimatedSection animation="fadeIn" delay={0.2}>
                <p className="font-noto-serif text-gray-300 max-w-2xl mx-auto mb-12">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
                  tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero
                  vitae erat.
                </p>
              </AnimatedSection>
            </div>

            <AnimatedSection animation="scaleUp" className="mb-16">
              <ExpandablePanel panels={imagePanels} />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}