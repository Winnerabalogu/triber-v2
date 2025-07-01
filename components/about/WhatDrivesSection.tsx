import { Globe, Eye, Heart } from "lucide-react"

const driveItems = [
  {
    icon: Globe,
    title: "OPEN SOURCE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh urna ut pretium nisi porttis bibendum quis. Morbi cursus nunc.",
  },
  {
    icon: Globe,
    title: "WORLDWIDE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh urna ut pretium nisi porttis bibendum quis. Morbi cursus nunc.",
  },
  {
    icon: Eye,
    title: "TRANSPARENT",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh urna ut pretium nisi porttis bibendum quis. Morbi cursus nunc.",
  },
  {
    icon: Heart,
    title: "COMMUNITY DRIVEN",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et nibh urna ut pretium nisi porttis bibendum quis. Morbi cursus nunc.",
  },
]

export default function WhatDrivesSection() {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
          <div className="md:flex md:justify-between md:items-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground animate-fadeInUp text-center md:text-left mb-4 md:mb-0">
            What drives Triber ?
          </h2>
          <h2 className="text-sm md:text-sm text-muted-foreground animate-fadeInUp text-center md:text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat nulla suspendisse tortor aene.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {driveItems.map((item, index) => (
            <div
              key={index}
              className={`bg-card/50 border border-border rounded-lg p-6 md:p-8 hover:bg-card/70 hover:border-primary/30 transition-all duration-300 hover:transform hover:scale-105 animate-on-scroll animate-fadeInUp animate-delay-${(index + 1) * 100} touch-manipulation hover-glow`}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-full flex items-center justify-center mr-3 md:mr-4 transition-all duration-300 group-hover:bg-primary/30 flex-shrink-0">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary transition-transform duration-300 hover:scale-110" />
                </div>
                <h3 className="text-foreground font-semibold text-xs md:text-sm tracking-wider">{item.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm md:text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
