"use client"

import AnimatedSection from "@/components/animated-section"

interface BusinessStep {
  label: string
  subtitle: string
  title: string
  description: string
}

interface BusinessStepsSectionProps {
  steps: BusinessStep[]
}

export default function BusinessStepsSection({ steps }: BusinessStepsSectionProps) {
  return (
    // Theme the main section border
    <section className="py-20 border-b border-border">
      <div className="container mx-auto px-6">
        <div className="space-y-24">
          {steps.map((step, index) => (
            <AnimatedSection key={index} animation="fadeIn" delay={index * 0.2}>
              <div className="grid md:grid-cols-2 gap-12 items-start"> {/* items-start for better alignment if content heights differ */}
                <div>
                  {/* Theme text colors */}
                  <span className="text-primary text-sm">{step.label}</span>
                  <p className="text-sm text-muted-foreground mb-4">{step.subtitle}</p>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground dark-text-background">{step.title}</h2>
                </div>
                <div>
                  {/* Theme text color */}
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
              {/* Theme the divider line */}
              {index < steps.length - 1 && <div className="border-b border-border mt-24"></div>}
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}