import Header from "@/components/Header"
import ScrollingTextSection from "@/components/landing/ScrollingTextSection"
import Footer from "@/components/landing/Footer"
import DealroomHeroSection from "@/components/dealroom/DealroomHeroSection"
import SubmitProposalSection from "@/components/dealroom/SubmitProposalSection"
import InvestorCredibilitySection from "@/components/dealroom/InvestorCredibilitySection"
import StreamlinedEffectiveSection from "@/components/dealroom/StreamlinedEffectiveSection"
export const metadata = {
  title: "Connect.Grow.Succeed | Deal Room",
  description:
    "Your ultimate platform to connect with like-minded professionals, grow your network, and succeed in your business endeavors.",
  generator: 'Triber'
};
export default function DealroomPage() {
  return (
    <div className="relative min-h-screen text-foreground">       
      <div className="absolute inset-0 bg-background opacity-80 transition-colors duration-300 z-10"></div>
      <div className="absolute inset-0 bg-[url('/images/section.png')] bg-cover bg-center opacity-30"></div>

      <div className="relative z-20 ">
        <Header />
        <div className="space-y-0">
          <DealroomHeroSection />
          <SubmitProposalSection />
          <InvestorCredibilitySection />
          <StreamlinedEffectiveSection />
        </div>
        <ScrollingTextSection />
        <Footer />
      </div>
    </div>
  )
}
