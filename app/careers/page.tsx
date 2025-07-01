import Header from "@/components/Header"
import ScrollingTextSection from "@/components/landing/ScrollingTextSection"
import Footer from "@/components/landing/Footer"
import CareersHeroSection from "@/components/careers/CareersHeroSection"
import WhyTriberSection from "@/components/careers/WhyTriberSection"
import BenefitsSection from "@/components/careers/BenefitsSection"
import OfficeLifeSection from "@/components/careers/OfficeLifeSection"
import TestimonialsSection from "@/components/careers/TestimonialsSection"
import HowToBecomeTriberSection from "@/components/careers/HowToBecomeTriberSection"
import OpenPositionsSection from "@/components/careers/OpenPositionsSection"
import TriberStoriesSection from "@/components/careers/TriberStoriesSection"
import SocialMediaSection from "@/components/careers/SocialMediaSection"
export const metadata = {
  title: "Connect.Grow.Succeed | Career",
  description:
    "Your ultimate platform to connect with like-minded professionals, grow your network, and succeed in your business endeavors.",
  generator: 'Triber'
};
export default function CareersPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <div className="absolute inset-0 bg-background opacity-80 transition-colors duration-300 z-10"></div>
      <div className="absolute inset-0 bg-[url('/images/section.png')] bg-cover bg-center opacity-30"></div>

      <div className="relative z-20 ">
        <Header />
        <div className="space-y-0">
          <CareersHeroSection />
          <WhyTriberSection />
          <BenefitsSection />
          <OfficeLifeSection />
          <TestimonialsSection />
          <HowToBecomeTriberSection />
          <OpenPositionsSection />
          <TriberStoriesSection />
          <SocialMediaSection />
        </div>
        <ScrollingTextSection />
        <Footer />
      </div>
    </div>
  )
}
