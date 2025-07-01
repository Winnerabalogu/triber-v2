"use client"

import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Find a role that suits you",
    description: "Discover open positions and find your desired one in the Visioncraft website, job listings or social media.",
  },
  {
    number: "02",
    title: "Send your application",
    description: "Some simple questions should be answered and your contact information is required",
  },
  {
    number: "03",
    title: "Receive your interview invite",
    description: "We review all applications within 3 working days and send invitation to candidates.",
  },
  {
    number: "04",
    title: "Choose an interview slot",
    description: "You will have a friendly discution with the CEO and your supervisor to talk about the work, life and etc.",
  },
  {
    number: "05",
    title: "Preliminary Interview",
    description: "Sometimes, we ask candidates to participate in some technical challenge that is designated to demonstrate candidates' proficiency.",
  },
  {
    number: "06",
    title: "Meet the your teammates",
    description: "To us is crucial to make sure all team members feel comfortable. It is why we do try to have diverse but culturally fitted team members.",
  },
  {
    number: "07",
    title: "Interview with our CEO",
    description: "Your colleagues are waiting for you to say a warm welcome.",
  },
];

export default function HowToBecomeTriberSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="py-12 md:py-20 px-4 relative overflow-hidden" ref={ref}>      
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-purple-500/10 to-green-500/10 opacity-20 blur-3xl"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How to become a Triber?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            It is so easy, practically hassle-free! With the following process, we make sure the candidates have the
            skills, attitude, and spirit of a Triber.
          </p>
        </div>        
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-5 w-px h-[calc(100%-2.5rem)] bg-border" />
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-5 w-px bg-primary"
            style={{ height: isVisible ? 'calc(100% - 2.5rem)' : '0%' }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          />

          <div className="space-y-16">
            {steps.map((step, index) => {
              const isLeft = index % 2 !== 0;

              return (                
                <div key={index} className={cn(
                    "w-full flex items-start justify-center",
                    isLeft ? "flex-row-reverse" : "flex-row"
                )}>
                    <div className="w-1/2"></div>                    
                    <motion.div
                        className="w-10 h-10 bg-primary rounded-full border-4 border-background shadow-lg flex items-center justify-center flex-shrink-0 z-10 mx-6"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isVisible ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                    >
                        <span className="font-bold text-sm text-primary-foreground">{step.number}</span>
                    </motion.div>                                        
                    <motion.div
                        className="w-1/2"
                        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 1 + index * 0.2 }}
                    >
                        <div className="relative">
                            <div className={cn("bg-card/50 border border-border rounded-lg p-6 shadow-md backdrop-blur-sm", isLeft ? "text-right" : "text-left")}>
                                <h3 className="font-semibold text-lg text-foreground mb-2">{step.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                            </div>                            
                            <div className={cn(
                                "absolute top-3 w-4 h-4 bg-card/50 border-t border-r border-border -z-10",
                                isLeft ? "right-[-9px] rotate-45 border-l-0 border-b-0" : "left-[-9px] -rotate-[135deg] border-r-0 border-b-0"
                            )} />
                        </div>
                    </motion.div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="md:hidden">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground font-bold text-sm">{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-foreground font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && <div className="ml-6 w-px h-12 bg-border"></div>}
              </div>
            ))}
          </div>
        </div>        
        <div className="relative mt-16 text-center">          
          <div className="inline-block">
            <motion.div
              className="w-12 h-12 bg-yellow-400 rounded-full border-4 border-background shadow-lg flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={isVisible ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 + steps.length * 0.2 }}
            >
              <Star className="w-6 h-6 text-white" />
            </motion.div>
          </div>
          <motion.h3
            className="text-foreground font-semibold text-xl mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.2 + steps.length * 0.2 }}
          >
            Start a new journey!
          </motion.h3>
        </div>
      </div>
    </section>
  )
}