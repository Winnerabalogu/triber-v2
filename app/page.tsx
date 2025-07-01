import Header from "@/components/Header"
import HeroSection from "@/components/landing/HeroSection"
import ChallengesSection from "@/components/landing/ChallengesSection"
import PartnersJourneySection from "@/components/landing/PartnersJourneySection"
import BusinessStepsSection from "@/components/landing/BusinessStepsSection"
import EducationSection from "@/components/landing/EducationSection"
import TestimonialsSection from "@/components/landing/TestimonialsSection"
import ScrollingTextSection from "@/components/landing/ScrollingTextSection"
import FaqSection from "@/components/landing/FaqSection"
import Footer from "@/components/landing/Footer"
import {
  imagePanels,
  faqItems,
  partnerLogos,
  capabilities,
  testimonials,
  businessSteps,
  educationCards,
  challengesData,
  promoVideoUrl
} from '@/data/landingPageData';

export const metadata = {
  title: "Connect.Grow.Succeed | Triber",
  description:
    "Your ultimate platform to connect with like-minded professionals, grow your network, and succeed in your business endeavors.",
  generator: 'Triber'
};

export default function Home() {  

  return (
    <div className="relative min-h-screen text-foreground">
      <div className="absolute inset-0 bg-background opacity-80  transition-colors duration-300 z-10"></div>
  <div className="absolute inset-0 bg-[url('/images/section.png')] bg-cover bg-center opacity-30"></div>
  

  <div className="relative z-20">
      <Header />
      <HeroSection imagePanels={imagePanels} promoVideoUrl={promoVideoUrl} />
      <ChallengesSection challenges={challengesData} capabilities={capabilities} />
      <PartnersJourneySection partnerLogos={partnerLogos} promoVideoUrl={promoVideoUrl} />
      <BusinessStepsSection steps={businessSteps} />
      <EducationSection cards={educationCards} />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection faqItems={faqItems} />
      <ScrollingTextSection />
      <Footer />
    </div>
</div>
  )
}