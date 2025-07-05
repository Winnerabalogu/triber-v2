const fundabilityFeatures = [
  {
    title: "Business Model Clarity",
    description:
      "Can you explain how your business makes money? How scalable? A clear, scalable model gives investors confidence in your revenue potential.",
  },
  {
    title: "Market Validation",
    description:
      "Have you proven there's real demand for your product or service? Showing traction or customer interest makes you more credible.",
  },
  {
    title: "Financial Readiness",
    description:
      "Do you have clean books, projections, and a clear ask? Fundable businesses can answer financial questions without hesitation.",
  },
  {
    title: "Founding Team Strength",
    description: "Investors bet on people. A capable, committed team with complementary skills is a major asset.",
  },
  {
    title: "Legal & Structural Setup",
    description:
      "From incorporation to IP protection and equity structure, the legal side must be in order to avoid red flags during due diligence.",
  },
  {
    title: "Scalability & Growth Potential",
    description:
      "Is your business model built to grow? Fundability increases when investors see the potential for 10x returns.",
  },
]

export default function WhatIsFundabilitySection() {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">        
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 animate-on-scroll animate-fadeInUp">
            What is Fundability?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-4xl mx-auto leading-relaxed animate-on-scroll animate-fadeInUp animate-delay-200">
            Fundability is the measure of how ready and appealing your business is to potential investors. It reflects
            how well you've structured your company, clarified your vision, validated your market, and prepared to
            scale. Being fundable doesn't just mean having a great idea—it means being investor-ready.
          </p>
        </div>        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {fundabilityFeatures.map((feature, index) => (
            <div
              key={index}
              className={`bg-card/30 border border-border rounded-xl p-6 hover:bg-card/50 transition-all duration-300 hover:scale-105 animate-on-scroll animate-fadeInUp animate-delay-${
                (index + 3) * 100
              } hover-glow touch-manipulation`}
            >
              <h3 className="text-foreground font-semibold text-lg mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
