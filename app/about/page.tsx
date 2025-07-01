import Header from "@/components/Header"
import ScrollingTextSection from "@/components/landing/ScrollingTextSection"
import Footer from "@/components/landing/Footer"
import AboutHeroSection from "@/components/about/AboutHeroSection"
import WhatDrivesSection from "@/components/about/WhatDrivesSection"
import MissionSection from "@/components/about/MissionSection"
import StorySection from "@/components/about/StorySection"
import TimelineSection from "@/components/about/TimelineSection"
import TeamSection from "@/components/about/TeamSection"
import InvestorsSection from "@/components/about/InvestorsSection"

export default function AboutPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <div className="absolute inset-0 bg-background opacity-80 transition-colors duration-300 z-10"></div>
      <div className="absolute inset-0 bg-[url('/images/section.png')] bg-cover bg-center opacity-30"></div>

      <div className="relative z-20">
        <Header />
        <div className="space-y-0">
          <AboutHeroSection />
          <WhatDrivesSection />
          <MissionSection />
          <StorySection />
          <TimelineSection />
          <TeamSection />
          <InvestorsSection />
        </div>
        <ScrollingTextSection />
        <Footer />
      </div>
    </div>
  )
}
