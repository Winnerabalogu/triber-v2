const tiers = [
  {
    title: "Tier 1: Emerging (0-40)",
    subtitle: "You're just getting started.",
    description:
      "Your idea has potential, but key elements like product, team, and traction are still forming.",
  },
  {
    title: "Tier 2: Promising (41-70)",
    subtitle: "You're on the right track.",
    description:
      "You have early traction, a working product, and a basic structure. Still some gaps to fill before meeting investor expectations.",
  },
  {
    title: "Tier 3: Investor-Ready (71-100)",
    subtitle: "You're ready to raise.",
    description: "You've got traction, a strong team, clear financials, and a clear growth plan.",
  },
]

export default function FundabilityTiersSection() {
  const topTiers = tiers.slice(1); 
  const bottomTier = tiers[0];   

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 md:mb-16 animate-on-scroll animate-fadeInUp">
          Fundability Tiers
        </h2>                
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">                    
          <div className="lg:col-span-2 flex justify-center animate-on-scroll animate-scaleIn order-2 lg:order-1 sticky top-24">
            <div className="relative w-full max-w-md">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/fundability/tier.png"
                  alt="Business professionals discussing funding"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>          
          <div className="lg:col-span-3 space-y-8 order-1 lg:order-2">                        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {topTiers.map((tier, index) => (
                <div 
                  key={index} 
                  className={`
                    bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 shadow-lg 
                    flex flex-col text-center h-full
                    transition-all duration-300 hover:border-primary/50 hover:-translate-y-1
                    animate-on-scroll animate-fadeInRight animate-delay-${(index + 3) * 200}
                  hover-glow touch-manipulation`}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{tier.title}</h3>
                  <h4 className="text-primary font-semibold mb-4">{tier.subtitle}</h4>
                  <p className="text-muted-foreground leading-relaxed flex-grow">{tier.description}</p>
                </div>
              ))}
            </div>            
            <div 
              className={`
                bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 shadow-lg 
                text-center
                transition-all duration-300 hover:border-primary/50 hover:-translate-y-1
                animate-on-scroll animate-fadeInRight animate-delay-400
              hover-glow touch-manipulation`}
            >
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{bottomTier.title}</h3>
              <h4 className="text-primary font-semibold mb-4">{bottomTier.subtitle}</h4>
              <p className="text-muted-foreground leading-relaxed">{bottomTier.description}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}