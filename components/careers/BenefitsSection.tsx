import { Heart, Clock, Plane, Coffee, Laptop, Shield, GraduationCap, Users, Gift, Home } from "lucide-react"

const benefits = [
  { icon: Heart, title: "Health Insurance", color: "text-red-400" },
  { icon: Clock, title: "Flexible Hours", color: "text-blue-400" },
  { icon: Plane, title: "Travel Allowance", color: "text-green-400" },
  { icon: Coffee, title: "Free Meals", color: "text-yellow-400" },
  { icon: Laptop, title: "Latest Equipment", color: "text-purple-400" },
  { icon: Shield, title: "Life Insurance", color: "text-indigo-400" },
  { icon: GraduationCap, title: "Learning Budget", color: "text-pink-400" },
  { icon: Users, title: "Team Events", color: "text-primary" },
  { icon: Gift, title: "Performance Bonus", color: "text-orange-400" },
  { icon: Home, title: "Remote Work", color: "text-teal-400" },
]

export default function BenefitsSection() {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12 md:mb-16 animate-on-scroll animate-fadeInUp">
          What benefits are waiting for you?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`bg-card/30 border border-border rounded-xl p-4 md:p-6 hover:bg-card/50 transition-all duration-300 hover:scale-105 animate-on-scroll animate-fadeInUp animate-delay-${
                (index + 2) * 100
              } hover-glow touch-manipulation text-center`}
            >
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-background rounded-full flex items-center justify-center">
                  <benefit.icon className={`w-5 h-5 md:w-6 md:h-6 ${benefit.color}`} />
                </div>
              </div>
              <h3 className="text-foreground font-medium text-xs md:text-sm">{benefit.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
