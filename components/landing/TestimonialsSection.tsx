"use client"
import AnimatedSection from "@/components/animated-section"
import TestimonialCarousel, { type Testimonial } from "@/components/testimonial-carousel" 

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    // Theme section border
    <section className="py-20 border-b border-border">
      <div className="container mx-auto px-6">
        <AnimatedSection animation="fadeIn">        
          <h2 className="text-3xl font-bold mb-4 text-center text-foreground">What our clients say</h2>
          <p className="text-muted-foreground text-center mb-12">
            Hear from entrepreneurs who have successfully raised funding through Triber
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fadeIn" delay={0.2}>        
          <TestimonialCarousel testimonials={testimonials} />
        </AnimatedSection>
      </div>
    </section>
  )
}