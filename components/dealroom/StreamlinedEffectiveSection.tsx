"use client"

import { useConfetti } from "@/components/confetti-controller"

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-card/50 rounded-lg p-4 text-center border border-border/50">
    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{label}</p>
    <p className="font-semibold text-foreground text-sm md:text-base">{value}</p>
  </div>
);

export default function StreamlinedEffectiveSection() {
  const { triggerConfetti } = useConfetti()
  return (
    <section className="py-12 md:py-20 px-4">      
      <div className="max-w-4xl mx-auto relative">
                
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/70 rounded-full  blur-2xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-24 -translate-y-1/2 w-48 h-48 bg-yellow-400/55 rounded-full  blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-4 -left-24 w-40 h-40 bg-green-400/55 rounded-full blur-3xl pointer-events-none"></div>        
        <div className="relative z-10 flex flex-col items-center gap-12 md:gap-16">          
          <div className="animate-on-scroll animate-fadeInUp text-center">
            <div className="text-muted-foreground text-sm font-semibold mb-4 tracking-wider">SUBMIT A PROPOSAL</div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">Streamlined and Effective</h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Send your proposals effortlessly, connecting to investors or businesses depending on your specific
              profile. Watch as your business gets funded or you as an investor gets to fund a business.
            </p>
          </div>

          {/* --- MAIN CONTENT CARD --- */}
          <div className="w-full bg-card border-8 border-foreground border-b-0 rounded-2xl shadow-xl p-8 md:p-12 animate-on-scroll animate-scaleIn animate-delay-300">
            <div className="max-w-2xl mx-auto text-center">              
              <div className="mb-6">
                  <img 
                      src="/placeholder.svg?height=96&width=96" 
                      alt="Jumia Logo"
                      className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full border-4 border-background shadow-md"
                  />
              </div>              
              <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                    Jumia Nigeria Inc.
                  </h2>
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-x-4 text-muted-foreground text-sm">
                      <span>ID: DG786DHS8098</span>
                      <span className="hidden sm:inline">•</span>
                      <span>Lekki Phase 1, Lagos, Nigeria</span>
                  </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                  <button className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                     onClick={() =>
              triggerConfetti({
                particleCount: 200,
                spread: 100,
               colors :["#0fb492", "#ffffff", "#2d2d2d", "#0d0f11", "#979797"],
              })}
                  >

                      Send a Proposal
                  </button>
                  <button className="w-full sm:w-auto px-6 py-3 bg-foreground border border-border text-background font-semibold rounded-full hover:bg-muted transition-all duration-300"
                     onClick={() =>
              triggerConfetti({
                particleCount: 200,
                spread: 100,
               colors :["#0fb492", "#ffffff", "#2d2d2d", "#0d0f11", "#979797"],
              })}
                  >
                      Contact Detail
                  </button>
              </div>              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <InfoCard label="Last Updated" value="Oct 1, 2023" />
                  <InfoCard label="Investments" value="34" />
                  <InfoCard label="Funds Deployed" value="$1.2M" />
                  <InfoCard label="Avg. Rating" value="4.7/5" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}