import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NewEraCardSection() {
  return (    
    <section className="py-12 md:py-20 px-4">     
      <div 
        className="bg-gradient-to-br from-primary to-primary/80 max-w-6xl mx-auto text-center flex flex-col items-center 
                   rounded-3xl py-12 md:py-20 px-6 transition-all duration-300 hover-glow"
      >            
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight max-w-2xl">
          Enter the new era of scaling your business
        </h2>

        {/* Sub Text */}
        <p className="text-foreground/80 max-w-xl mb-8">
          Join a community of forward-thinkers and innovators. Let's build the future together, one connection at a time.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/auth/register">
          <button className="px-6 py-3 bg-white text-primary font-semibold rounded-full hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:scale-105">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
          </Link>
          <Link href="/auth/register">
          <button className="px-6 py-3 border border-white/50 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300">
            Learn More
          </button>
          </Link>
        </div>

      </div>
    </section>
  );
}