"use client"
import Link from "next/link"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { ArrowRight } from "lucide-react"

export default function WhyUseValuationSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 })

  const progressPercentage = 88.7;
  const circumferenceFullCircle = 2 * Math.PI * 40;
  const targetStrokeDashoffset = circumferenceFullCircle * (1 - (progressPercentage / 100));
  const initialStrokeDashoffset = circumferenceFullCircle;

  return (
    <section className="py-16 md:py-24 px-4" ref={ref}>
      <div className="max-w-5xl mx-auto text-center">
        <h2
          className={`text-3xl md:text-4xl font-bold text-foreground mb-4 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Why use our valuation system
        </h2>
        <p
          className={`text-muted-foreground text-lg mb-12 md:mb-20 transition-all duration-700 ease-out delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          at every stage your business scales.
        </p>

        <div className="space-y-8">
          {/* Top Row - Two Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className={`bg-card border border-border rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[280px] md:min-h-[320px] hover:shadow-primary/20 hover:shadow-xl transition-all duration-500 hover:scale-[1.03] hover-glow ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
              style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
            >
              <div>
                <div className="text-6xl md:text-7xl font-bold text-primary mb-3 text-left">3k+</div>
                <p className="text-foreground font-semibold text-lg text-left mb-1">Businesses Trust Us</p>
              </div>
              <p className="text-muted-foreground text-base leading-relaxed text-left">
                Already leveraging our advanced
                <br />
                Valuation feature for growth.
              </p>
            </div>
            <div
              className={`bg-card border border-border rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[280px] md:min-h-[320px] hover:shadow-primary/20 hover:shadow-xl transition-all duration-500 hover:scale-[1.03] hover-glow ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
              style={{ transitionDelay: isVisible ? "450ms" : "0ms" }}
            >
              <div>
                <h3 className="text-foreground font-semibold text-xl mb-2 text-left">Instant Valuation Report</h3>
                <p className="text-muted-foreground text-base mb-8 text-left">Get insights anytime, anywhere.</p>
              </div>
              <div className="flex items-center justify-start space-x-3 mt-auto">
                <div className="flex items-center justify-center w-14 h-14 bg-background border-2 border-border rounded-lg text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                </div>
                <div className="flex-1 h-1 bg-border relative mx-2">
                  <ArrowRight className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 text-border w-5 h-5" />
                </div>
                <div className="flex items-center justify-center w-14 h-14 bg-primary rounded-full text-primary-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - Large Dashboard Card */}
          <div
            className={`bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-primary/20 hover:shadow-2xl transition-all duration-700 hover:scale-[1.015] hover-glow ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-2 text-left">
                <h3 className="text-foreground font-semibold text-2xl mb-4">All Asset Volatility</h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  Generate comprehensive valuation reports
                  based on documents submitted,
                  empowering you before any proposal.
                </p>
                <Link href="/auth/register">
                <button className="bg-primary text-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                  Explore Features
                </button>
                </Link>
              </div>

              <div className="lg:col-span-3 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-lg  animate-subtle-bounce ">
                  <div className="bg-muted/50 dark:bg-zinc-800 rounded-t-xl p-3 shadow-md">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>

                  <div 
                    className={`
                      bg-background rounded-b-xl p-6 border-x border-b border-border shadow-lg                      
                    `}
                  >
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 bg-green-500 rounded-full transition-all duration-500 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ transitionDelay: isVisible ? '700ms' : '0ms' }}></div>
                        <div className="flex-1 space-y-1">
                          <div className={`h-2.5 bg-green-500 rounded-full w-3/4 transform-origin-left transition-transform duration-700 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} style={{ transitionDelay: isVisible ? '750ms' : '0ms' }}></div>
                          <div className={`h-1.5 bg-green-500/30 rounded-full w-1/2 transform-origin-left transition-transform duration-700 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} style={{ transitionDelay: isVisible ? '800ms' : '0ms' }}></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 bg-primary rounded-full transition-all duration-500 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ transitionDelay: isVisible ? '850ms' : '0ms' }}></div>
                        <div className="flex-1 space-y-1">
                          <div className={`h-2.5 bg-primary rounded-full w-2/5 transform-origin-left transition-transform duration-700 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} style={{ transitionDelay: isVisible ? '900ms' : '0ms' }}></div>
                          <div className={`h-1.5 bg-primary/30 rounded-full w-1/3 transform-origin-left transition-transform duration-700 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} style={{ transitionDelay: isVisible ? '950ms' : '0ms' }}></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 bg-pink-500 rounded-full transition-all duration-500 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ transitionDelay: isVisible ? '1000ms' : '0ms' }}></div>
                        <div className="flex-1 space-y-1">
                          <div className={`h-2.5 bg-pink-500 rounded-full w-5/6 transform-origin-left transition-transform duration-700 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} style={{ transitionDelay: isVisible ? '1050ms' : '0ms' }}></div>
                          <div className={`h-1.5 bg-pink-500/30 rounded-full w-2/3 transform-origin-left transition-transform duration-700 ease-out ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} style={{ transitionDelay: isVisible ? '1100ms' : '0ms' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-4">
                      <div className="text-sm font-semibold text-foreground mb-4">Investment growth</div>
                      <div className="flex justify-center mb-4">
                        <div className="relative w-24 h-24">
                          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="none"
                              className="text-muted"
                            />
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="none"
                              strokeLinecap="round"
                              strokeDasharray={circumferenceFullCircle.toFixed(2)}
                              strokeDashoffset={isVisible ? targetStrokeDashoffset.toFixed(2) : initialStrokeDashoffset.toFixed(2)}
                              className="text-primary transition-all duration-1000 ease-out"
                              style={{ transitionDelay: isVisible ? '1200ms' : '0ms' }}
                            />
                          </svg>
                          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: isVisible ? '1500ms' : '0ms'}}>
                            <span className="text-lg font-bold text-foreground">{progressPercentage}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1%</span>
                        <span>Based on interest rate</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}