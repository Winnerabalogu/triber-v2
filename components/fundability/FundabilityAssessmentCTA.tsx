import Link from "next/link";

export default function FundabilityAssessmentCTA() {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-on-scroll animate-fadeInUp">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Want to know how fundable your business is?
          </h2>
          <Link href="/auth/register">
          <button className="px-8 py-4 bg-primary text-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover-glow flex items-center space-x-2 mx-auto">
            <span>Take the Fundability Assessment</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
