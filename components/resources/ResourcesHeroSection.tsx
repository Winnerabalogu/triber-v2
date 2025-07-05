"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"

export default function ResourcesHeroSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter subscription:", email)
    // Handle newsletter subscription
  }

  return (
    <section className="py-12 md:py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Content - Professional Woman Image */}
          <div className="flex justify-center animate-on-scroll animate-fadeInLeft order-2 lg:order-1">
            <div className="relative w-full max-w-md">
              <img
                src="/images/resources-hero.png"
                alt="Professional woman with coffee"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Right Content - Newsletter Signup */}
          <div className="flex justify-center animate-on-scroll animate-scaleIn animate-delay-300 order-1 lg:order-2">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl max-w-md w-full">
              {/* Logo and Title */}
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

              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Subscribe to our Newsletter!</h2>
              <p className="text-gray-600 mb-8">Get blog articles and offers via email</p>

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
                  />
                  <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
