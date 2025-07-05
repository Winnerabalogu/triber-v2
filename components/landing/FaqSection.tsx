"use client"

import AnimatedSection from "@/components/animated-section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion" // These should theme well

interface FaqItem {
  question: string
  answer: string
}

interface FaqSectionProps {
  faqItems: FaqItem[]
}

export default function FaqSection({ faqItems }: FaqSectionProps) {
  return (
    // Theme section border
    <section id="faq" className="py-20 border-b border-border">
      <div className="container mx-auto px-6">
        <AnimatedSection animation="fadeIn">
          {/* Theme heading and paragraph text */}
          <h2 className="text-3xl font-bold mb-4 text-center text-foreground">Frequently asked questions</h2>
          <p className="text-muted-foreground text-center mb-16">Everything you need to know about Triber.</p>
        </AnimatedSection>

        <AnimatedSection animation="fadeIn" delay={0.2}>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  // AccordionItem already uses `border-border` from Shadcn/UI styles if set up
                  // The className below will override if `border-border` isn't specific enough or you want a different border
                  className="border border-border rounded-lg overflow-hidden bg-card" // Added bg-card for item background
                >
                  <AccordionTrigger 
                    // AccordionTrigger text color is usually `text-foreground`
                    // Hover background from Shadcn/UI is typically `hover:bg-muted`
                    // The className here overrides default hover and text alignment.
                    className="px-6 py-4 hover:no-underline hover:bg-muted/50 text-left text-foreground"
                  >
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent 
                    // AccordionContent text from Shadcn/UI is often `text-muted-foreground`
                    className="px-6 py-4 text-muted-foreground"
                  >
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}