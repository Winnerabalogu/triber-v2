"use client"

import { useState } from "react"

const testimonials = [
  {
    id: 1,
    image: "/career/testimonial/testbig.png?height=500&width=400",
    quote:
      "I do admire the company culture and, I like that. Triber is truly the place where good attitudes have blended with proficiency. If you're going to craft something great and you have a strong eagerness to do that, Triber will remove all hassles in your journey.",
    name: "James Olson",
    position: "Product Designer",
    avatar: "/career/testimonial/testsmall.png?height=500&width=100",
  },
  {
    id: 2,
    image: "/career/testimonial/testbig4.png?height=500&width=400",
    quote:
      "Working at Triber has been an incredible journey. The team is supportive, the work is challenging, and the growth opportunities are endless. I've learned more here in two years than I did in my previous five years of experience.",
    name: "Sarah Johnson",
    position: "Senior Developer",
    avatar: "/career/testimonial/testsmall4.png?height=500&width=100",
  },
  {
    id: 3,
    image: "/career/testimonial/testbig3.png?height=500&width=400",
    quote:
      "The culture here is amazing. Everyone is passionate about what they do, and it shows in the quality of our work and the relationships we build. Triber truly cares about its employees and their growth.",
    name: "Michael Chen",
    position: "Product Manager",
    avatar: "/career/testimonial/testsmall3.png?height=500&width=100",
  },
]

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(testimonials[0])

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 animate-on-scroll animate-fadeInUp">
            Don't just take our word for it!
          </h2>
          <p className="text-muted-foreground animate-on-scroll animate-fadeInUp animate-delay-200">
            See the feedback from your teammates.
          </p>
        </div>                        
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 md:gap-12 items-stretch">
          
          <div className="flex justify-center items-center animate-on-scroll animate-scaleIn order-2 lg:order-1">
            <div className="w-full max-w-sm">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl transition-all duration-500">
                <img
                  src={activeTestimonial.image || "/career/testimonial/testbig2.png"}
                  alt={`${activeTestimonial.name} working`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-center animate-on-scroll animate-fadeInUp animate-delay-300 order-1 lg:order-2">
            <blockquote className="text-foreground text-lg md:text-xl leading-relaxed mb-8 transition-all duration-500">
              "{activeTestimonial.quote}"
            </blockquote>
            <div className="mb-6 transition-all duration-500">
              <h4 className="text-foreground font-semibold text-lg">{activeTestimonial.name}</h4>
              <p className="text-muted-foreground">{activeTestimonial.position}</p>
            </div>                        
            <button className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-300 w-fit">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>LinkedIn profile</span>
            </button>
          </div>                    
          <div className="flex justify-center gap-4 animate-on-scroll animate-fadeInRight animate-delay-500 order-3">
            {testimonials.map((testimonial) => (
              <button
                key={testimonial.id}
                onClick={() => setActiveTestimonial(testimonial)}                
                className={`
                  w-20 md:w-24 rounded-xl overflow-hidden shadow-lg hover:scale-105 
                  transition-all duration-300 flex-shrink-0
                  ${
                    activeTestimonial.id === testimonial.id
                      ? "ring-4 ring-primary ring-offset-2 ring-offset-background"
                      : "hover:ring-2 hover:ring-primary/50"
                  }
                `}
              >
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}                  
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>                        
        <div className="lg:hidden space-y-16">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="text-center animate-on-scroll animate-fadeInUp" style={{ animationDelay: `${index * 150}ms`}}>
              <div className="w-full max-w-sm mx-auto mb-6">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                  <img src={testimonial.image || "/placeholder.svg"} alt={`${testimonial.name} working`} className="w-full h-full object-cover" />
                </div>
              </div>
              <blockquote className="text-foreground text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-4 mb-6">
                <img src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="text-foreground font-semibold text-left">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-sm text-left">{testimonial.position}</p>
                </div>
              </div>                            
              <button className="inline-flex items-center gap-2 mx-auto px-6 py-2.5 bg-neutral-800/50 border border-neutral-700 rounded-full text-sm font-semibold text-foreground hover:bg-neutral-700/50 transition-colors">
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>View on LinkedIn</span>
              </button>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
}  