"use client"

import { useState, useEffect } from "react"
import { Calendar, ChevronDown } from "lucide-react"

const chartData = [
  { value: 15, label: "Jan" },
  { value: 25, label: "Feb" },
  { value: 35, label: "Mar" },
  { value: 20, label: "Apr" },
  { value: 45, label: "May" },
  { value: 30, label: "Jun" },
  { value: 55, label: "Jul" },
  { value: 40, label: "Aug" },
  { value: 85, label: "Sep" },
  { value: 65, label: "Oct" },
  { value: 75, label: "Nov" },
  { value: 50, label: "Dec" },
]

const maxChartValue = Math.max(...chartData.map(d => d.value));

export default function InvestorCredibilitySection() {
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 md:gap-16 items-center">
          
          {/* Left Content */}
          <div className="animate-on-scroll animate-fadeInLeft order-1 text-center lg:text-left">
            <div className="text-primary text-sm font-semibold mb-4 tracking-wider">
              INVESTOR CREDIBILITY
            </div>
            <h2 className="text-4xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Get access to view investor credibility
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              Personalize your approach by uploading enriched lead lists to ensure a targeted outreach strategy.
            </p>
          </div>          
          <div className="flex justify-center animate-on-scroll animate-scaleIn animate-delay-300 order-2">
            <div className="relative">              
              <div className="lg:w-[600px] md:w-auto h-[750px] bg-card border-8 border-neutral-800 rounded-[3rem] shadow-2xl overflow-hidden">                
                <div className="h-full bg-background p-6 flex flex-col">                                    
                  <div className="flex items-center justify-between mb-8 bg-card rounded-lg p-3 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">5 Feb - 5 Mar, 2024</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </div>

                  {/* Investment Info */}
                  <div className="mb-8">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Investment Fund</span>
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">$230,876,975</div>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-primary">1 Oct, 2023</span> • Last updated
                    </div>
                  </div>                  
                  <div className="flex-1 flex flex-col justify-end mb-4">
                  <div className="flex-grow w-full h-48 flex items-end justify-between gap-1 border-b border-l border-border/50 px-2 pb-1">
                    {chartData.map((item, index) => (
                      <div
                        key={index}
                        className="relative flex-1 h-full flex flex-col justify-end items-center group cursor-pointer"
                        onMouseEnter={() => setActiveBarIndex(index)}
                        onMouseLeave={() => setActiveBarIndex(null)}
                      >                        
                        <div
                          className={`
                            absolute -top-10 w-auto px-3 text-center bg-foreground text-background text-xs  py-1.5 rounded-md 
                            transition-all duration-200 pointer-events-none whitespace-nowrap
                            ${activeBarIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
                          `}
                        >
                          ${item.value.toLocaleString()},000 • {item.label}
                        </div>

                        {/* Animated Bar with Gradient */}
                        <div
                          className="w-full bg-gradient-to-t from-primary/70 to-primary rounded-t-sm transition-all duration-700 ease-out group-hover:opacity-100"
                          style={{
                            height: `${(item.value / maxChartValue) * 100}%`,
                            opacity: activeBarIndex === null || activeBarIndex === index ? 1 : 0.4,
                            transitionDelay: `${index * 50}ms`,
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  {/* X-Axis Labels */}
                  <div className="w-full flex justify-between gap-1 px-2 pt-2">
                    {chartData.map((item) => (
                      <span key={item.label} className="flex-1 text-center text-xs text-muted-foreground">
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400/20 rounded-full flex items-center justify-center animate-float">
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-green-400/20 rounded-full flex items-center justify-center animate-float" style={{ animationDelay: "1s" }}>
                <div className="w-5 h-5 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}