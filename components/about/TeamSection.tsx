import Image from "next/image"

const teamMembers = [
  {
    name: "SOPHIE MOORE",
    role: "CEO & CO-FOUNDER",
    image: "/about/team/team1.png?height=400&width=300",
  },
  {
    name: "JOHN CARTER",
    role: "COMMUNITY LEAD",
    image: "/about/team/team2.png?height=400&width=300",
  },
  {
    name: "ALEX TURNER",
    role: "OPERATIONS",
    image: "/about/team/team3.png?height=400&width=300",
  },
]

export default function TeamSection() {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 mb-12 md:mb-16">
          <div className="animate-on-scroll animate-fadeInLeft">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Our Team</h2>
          </div>
          <div className="animate-on-scroll animate-fadeInRight animate-delay-200">
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Parturient lorem purus justo, ultricies.
            </p>
          </div>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`group cursor-pointer animate-on-scroll animate-fadeInUp animate-delay-${(index + 3) * 100} touch-manipulation`}
            >
              {/* Photo Container */}
              <div className="bg-muted/30 rounded-2xl p-4 md:p-6 mb-6 overflow-hidden transition-all duration-300 group-hover:transform group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-primary/10 hover-glow">
                <div className="relative aspect-[3/4] bg-background rounded-xl overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                    className="object-cover transition-transform duration-300 group-hover:scale-110" 
                  />
                </div>
              </div>

              {/* Member Info */}
              <div className="text-left">
                <h3 className="text-foreground font-semibold text-sm md:text-base tracking-wider mb-2 transition-colors duration-300 group-hover:text-primary">
                  {member.name}
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm tracking-wider transition-colors duration-300 group-hover:text-muted-foreground/80">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
