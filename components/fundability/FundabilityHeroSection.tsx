import Link from "next/link";

export default function FundabilityHeroSection() {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Content */}
          <div className="animate-on-scroll animate-fadeInLeft order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              How Fundable is Your Business?
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
              Discover how investors see your startup. Get assessed and improve your chances.
            </p>
            <Link href="/auth/register">
            <button className="px-6 py-3 bg-primary text-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover-glow flex items-center space-x-2">            
              <span>Get Assessed Now</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>              
            </button>
            </Link>
          </div>

          {/* Right Image */}
          <div className="flex justify-center animate-on-scroll animate-scaleIn animate-delay-300 order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="relative w-full max-w-lg">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/fundability/hero.png?height=400&width=600"
                  alt="Business team working together"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
