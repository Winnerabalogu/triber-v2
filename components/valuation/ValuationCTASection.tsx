import Image from "next/image";
import Link from "next/link";

export default function ValuationCTASection() {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-primary/10 border border-primary/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('/images/section.png')] bg-cover bg-center"></div>
          </div>

          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Left Content */}
              <div className="animate-on-scroll animate-fadeInLeft">
                 <div className="text-primary text-sm font-semibold mb-4 tracking-wider flex items-center">
                  START NOW <div className="w-16 h-px bg-primary ml-4"></div>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                  Take a Valuation Test for your Business Today!
                </h2>
                <Link href="/auth/register">
                <button className="px-8 py-4 bg-primary text-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover-glow mb-6">
                  Get Started
                </button>
                </Link>

                <p className="text-muted-foreground text-sm">
                  Want to contact our team and book a call?{" "}
                  <Link href="/auth/register">
                  <span className="text-primary cursor-pointer hover:underline">Click here</span>
                  </Link>
                </p>
              </div>

              {/* Right Visual */}
              <div className="flex justify-center animate-on-scroll animate-scaleIn animate-delay-300">
                <div className="relative">
                  {/* Main Image Placeholder */}
                  <div className="w-96 h-96 bg-card/50 rounded-2xl overflow-hidden border border-border">
                    <img
                      src="/valuation/Teamwork.png?height=260&width=320"
                      alt="Team working on valuation"
                      className="w-full h-full object-cover"
                    />
                  </div>                  
              
               <div className="absolute -bottom-4 -left-4 flex justify-center lg:justify-start items-center order-1 lg:order-1 min-h-[180px] sm:min-h-[240px] lg:min-h-[280px]"> 
                <div
                  className={`
                    bg-card/30 backdrop-blur-sm border-border border-[1px] 
                    overflow-hidden shadow-xl animate-subtle-bounce
                    w-[116.25px] h-[118.24px]
                    md:w-[210.53px] md:h-[220.95px]
                    rounded-tl-[17.39px] rounded-tr-[1.99px] 
                    rounded-br-[17.39px] rounded-bl-[1.99px]
                    p-2 md:p-3
                  `}
                >
                 
                  <div className="relative w-full h-full">
                    <Image
                      src="/valuation/Frame.svg" 
                      alt="Valuation Score Visual"
                      layout="fill"
                      objectFit="contain"
                      className="transform transition-transform duration-500 hover:scale-105"
                    />
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
