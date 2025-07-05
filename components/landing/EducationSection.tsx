"use client"

import AnimatedSection from "@/components/animated-section"
import EducationCard, { type EducationCardProps } from "@/components/education-card"
import AnimatedButton from "@/components/animated-button"
import Link from "next/link"

interface EducationSectionProps {
  cards: EducationCardProps[]
}

export default function EducationSection({ cards }: EducationSectionProps) {
  return (
    // Theme section border and background
    <section className="py-20 border-b border-border bg-background"> {/* Use bg-background */}
      <div className="container mx-auto px-6">
        <AnimatedSection animation="fadeIn" className="text-center mb-16">        
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent 
                         bg-gradient-to-r from-foreground to-primary dark:from-slate-300 dark:to-primary"> 
            At Triber, we are advancing the future of small businesses and startups
          </h2>
          {/* Theme paragraph text */}
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            At Triber, we're more than just a platform—we're a community of entrepreneurs, investors, and dreamers.
            Together, we're building a platform that empowers small businesses to thrive.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <AnimatedSection key={index} animation="fadeIn" delay={index * 0.2}>              
              <EducationCard
                image={card.image}
                title={card.title}
                description={card.description}
                modalContent={card.modalContent}             
                video={card.video} 
              />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fadeIn" delay={0.6} className="mt-16 text-center">          
          <AnimatedButton 
            className="bg-primary text-foreground px-8" 
            animation="pulse"
          >
            <Link href="/auth/register">
            Explore our resources
            </Link>
          </AnimatedButton>
        </AnimatedSection>
      </div>
    </section>
  )
}