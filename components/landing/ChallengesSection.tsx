"use client"

import Image from "next/image"
import AnimatedSection from "@/components/animated-section"
import AnimatedButton from "@/components/animated-button" // Ensure this is themeable
import CapabilitiesSection, { type Capability } from "@/components/capabilities-section" // Ensure this is themeable
import ChallengeCard from "@/components/challenge-card" // Ensure this is themeable
import Link from "next/link"


interface ChallengeItem {
  title: string
  description: string
}

interface ChallengesSectionProps {
  challenges: ChallengeItem[]
  capabilities: Capability[] 
}

export default function ChallengesSection({ challenges, capabilities }: ChallengesSectionProps) {
  return (    
    <section className="py-20 border-b border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection animation="fadeInLeft">
            <div className="max-w-lg">              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Solve your biggest challenges faced by
                <br />
                <span className="text-muted-foreground">Businesses and founders today.</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
                tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero
                vitae erat.
              </p>              
              <AnimatedButton 
                className="bg-primary text-foreground" 
                animation="pulse"
              >
                <Link href="/auth/register">                
                Choose a solution
                </Link>
              </AnimatedButton>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fadeInRight" delay={0.2}>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/images/business-woman.png" 
                height={500}
                width={500}
                alt="Business woman solving challenges"
                className="w-full object-cover rounded-lg"
              />
            </div>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mt-16"> {/* Adjusted grid for better responsiveness */}
          {challenges.map((challenge, index) => (
            <div className="col-span-1" key={index}>
              <AnimatedSection animation="fadeIn" delay={index * 0.1}>                
                <ChallengeCard title={challenge.title} description={challenge.description} />
              </AnimatedSection>
            </div>
          ))}
        </div>
        
        <div className="relative mt-16 sm:mt-24">
          <CapabilitiesSection capabilities={capabilities} />
        </div>
      </div>
    </section>
  )
}