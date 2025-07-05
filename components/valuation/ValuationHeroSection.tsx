"use client"

import type React from "react"
import { useState } from "react"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function ValuationHeroSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email submission
    console.log("Email submitted:", email)
  }

  return (
    <section className="py-12 md:py-20 px-4"> 
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Navigating the <span className="text-primary">Global</span> financial landscape
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
              Empowering your journey to global financial success through customized and personalized financial
              Consulting for every client
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
              <Link href="/auth/register">
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover-glow"
              >
                Get Started
              </button>
              </Link>
            </form>
          </div>
          <div className="flex justify-center order-2 mb-8 lg:mb-0"> {/* Visuals second on mobile */}          
            <div className="relative w-full max-w-lg p-4 sm:p-6 md:p-8">
              {/* Main Chart Card */}
              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-4 sm:p-6 shadow-xl min-h-[260px] sm:min-h-[280px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground">INVESTMENTS</h3>
                    <div className="flex space-x-1.5 sm:space-x-2">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-400 rounded-full"></div>
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-primary rounded-full"></div>
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>

                  <div className="flex items-end justify-between h-28 sm:h-32 md:h-40 mb-4">
                    <div className="w-6 sm:w-8 md:w-10 bg-yellow-400 rounded-t" style={{ height: "40%" }}></div>
                    <div className="w-6 sm:w-8 md:w-10 bg-red-400 rounded-t" style={{ height: "60%" }}></div>
                    <div className="w-6 sm:w-8 md:w-10 bg-green-400 rounded-t" style={{ height: "80%" }}></div>
                    <div className="w-6 sm:w-8 md:w-10 bg-primary rounded-t" style={{ height: "100%" }}></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-auto">
                  <span>100</span>
                  <span>200</span>
                  <span>300</span>
                  <span>400</span>
                </div>
              </div>

              {/* Line Chart Card - Made Larger & More Responsive */}
              <div 
                className={`
                  absolute bg-card/90 backdrop-blur-md border border-border rounded-xl shadow-2xl 
                  p-3 sm:p-4 md:p-5 
                  w-40 sm:w-48 md:w-56 h-auto 
                  -bottom-4 -right-4 
                  sm:-bottom-6 sm:-right-6 
                  md:-bottom-12 md:-right-12
                `}
              >
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm text-muted-foreground">Growth</span>
                  <span className="text-sm sm:text-base font-bold text-primary">+24%</span>
                </div>
                <div className="w-full h-16 sm:h-20 md:h-24 relative">
                  <svg className="w-full h-full" viewBox="0 0 128 64" preserveAspectRatio="xMidYMid meet">
                    <path
                      d="M0,50 Q20,40 40,35 T80,25 T128,15"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      fill="none"
                      className="text-primary"
                    />
                  </svg>
                </div>
              </div>

              {/* Floating Elements - Adjusted positions for responsiveness */}
              <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 md:-top-6 md:-left-6 w-10 h-10 sm:w-12 sm:h-12 bg-red-400/20 rounded-full flex items-center justify-center animate-float">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-400 rounded-full"></div>
              </div>
              <div
                className="absolute top-1/2 -right-4 sm:-right-6 md:-right-10 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-full flex items-center justify-center animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-primary rounded-full"></div>
              </div>
              <div
                className="absolute -bottom-6 left-1/4 sm:-bottom-8 md:-bottom-12 w-6 h-6 sm:w-8 sm:h-8 bg-green-400/20 rounded-full flex items-center justify-center animate-float"
                style={{ animationDelay: "2s" }}
              >
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}