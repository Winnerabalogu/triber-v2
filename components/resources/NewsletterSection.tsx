"use client"

import type React from "react"

import { useState } from "react"
import { Mail, CheckCircle, ArrowRight } from "lucide-react"
import CountUp from "@/components/count-up"
import AnimatedSection from "@/components/animated-section"

const statsData = [
  { end: 10, suffix: "k+", text: "Newsletter Subscribers", delay: 0.1 },
  { end: 50, suffix: "+", text: "Articles Published", delay: 0.2 },
  { end: 95, suffix: "%", text: "Reader Satisfaction", delay: 0.3 },
  { label: "Weekly", text: "Fresh Content", delay: 0.4 },
];


export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubscribed(true)
    setIsLoading(false)
    
    setTimeout(() => {
      setIsSubscribed(false)
      setEmail("")
    }, 3000)
  }

  return (
    <section className="py-12 md:py-20 px-4  relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_76%,transparent_77%,transparent),linear-gradient(rgba(255,255,255,0.05)_24%,transparent_25%,transparent_26%,rgba(255,255,255,0.05)_27%,rgba(255,255,255,0.05)_74%,transparent_75%,transparent_76%,rgba(255,255,255,0.05)_77%,rgba(255,255,255,0.05))] bg-[length:50px_50px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Content - Professional Woman Image */}
          <div className="flex justify-center animate-on-scroll animate-fadeInLeft order-1 lg:order-1">
            <div className="relative w-full max-w-md">
              <div className="relative">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bcd7e511-d23a-40cb-bfd5-15674d547298.jpg-8suOGTzMNPj4NwEUEmgof0d54IUKq4.jpeg"
                  alt="Professional woman with coffee"
                  className="w-full h-auto object-cover rounded-2xl shadow-2xl"
                />

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-float">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div
                  className="absolute -bottom-4 -left-4 w-10 h-10 bg-yellow-400/20 rounded-full flex items-center justify-center animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="w-5 h-5 bg-yellow-400 rounded-full"></div>
                </div>
                <div
                  className="absolute top-1/4 -left-6 w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center animate-float"
                  style={{ animationDelay: "2s" }}
                >
                  <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Newsletter Signup */}
          <div className="flex justify-center animate-on-scroll animate-scaleIn animate-delay-300 order-2 lg:order-2">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl max-w-md w-full relative overflow-hidden">              
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/5 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative z-10">                
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-bold text-lg">The Triber Platform</span>
                  </div>
                </div>

                {!isSubscribed ? (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Subscribe to our Newsletter!</h2>
                    <p className="text-gray-600 mb-8">Get blog articles and offers via email</p>

                    {/* Benefits List */}
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-gray-600 text-sm">Weekly industry insights</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-gray-600 text-sm">Exclusive startup tips</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-gray-600 text-sm">Early access to resources</span>
                      </div>
                    </div>

                    {/* Email Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your Email"
                          className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                          required
                          disabled={isLoading}
                        />
                        <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Subscribing...</span>
                          </>
                        ) : (
                          <>
                            <span>Subscribe</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>

                    <p className="text-xs text-gray-500 mt-4 text-center">No spam, unsubscribe at any time</p>
                  </>
                ) : (
                  /* Success State */
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome aboard! 🎉</h3>
                    <p className="text-gray-600 mb-4">You've successfully subscribed to our newsletter.</p>
                    <p className="text-sm text-gray-500">Check your inbox for a confirmation email.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      {/* --- STATS SECTION --- */}
        <div className="mt-16 md:mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <AnimatedSection key={index} animation="fadeIn" delay={stat.delay} className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.end ? (
                    <CountUp end={stat.end} suffix={stat.suffix} className="font-bold" />
                  ) : (
                    <span>{stat.label}</span>
                  )}
                </h3>
                <p className="text-gray-400 text-sm">{stat.text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
