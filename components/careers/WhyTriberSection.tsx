const whyTriberItems = [
  {
    image: "/career/why1.png?height=200&width=300",
    title: "Collaborative Environment",
    description: "Work with talented individuals who share your passion for innovation and growth.",
  },
  {
    image: "/career/why2.png?height=200&width=300",
    title: "Growth Opportunities",
    description: "Continuous learning and development opportunities to advance your career Here.",
  },
  {
    image: "/career/why3.png?height=200&width=300",
    title: "Work-Life Balance",
    description: "Flexible working arrangements that support your personal and professional life.",
  },
  {
    image: "/career/why4.png?height=200&width=300",
    title: "Innovation Culture",
    description: "Be part of cutting-edge projects that make a real impact in the industry here now!.",
  },
]

export default function WhyTriberSection() {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12 md:mb-16 animate-on-scroll animate-fadeInUp">
          What makes Triber a great place to work?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {whyTriberItems.map((item, index) => (
            <div
              key={index}
              className={`group cursor-pointer animate-on-scroll animate-fadeInUp animate-delay-${
                (index + 2) * 100
              } touch-manipulation`}
            >
              <div className="bg-card/30 border border-border rounded-xl overflow-hidden hover:bg-card/50 transition-all duration-300 hover:scale-105 hover-glow">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-foreground font-semibold text-sm mb-2 transition-colors duration-300 group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
