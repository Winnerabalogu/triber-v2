import Image from "next/image";
import Link from "next/link";

export default function TransformingFinancesSection() {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Content (Text Section) */}          
          <div className="order-1"> 
            <div className="text-primary text-sm font-semibold mb-4 tracking-wider flex items-center">
                  Our Expertise <div className="w-16 h-px bg-primary ml-4"></div> {/* Corrected "Experties" to "Expertise" */}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Transforming Finances With Strategic Wealth Management
            </h2>
            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                Guiding you on your global financial success journey through customized & personalized financial
                consulting services. Achieve your goals with smart financial reporting and secure your financial future
                successfully by navigating the ever-changing finance landscape.
              </p>
              <p>
                We're committed to providing you with expert financial guidance, strategies & personalized approach to
                ensure financial prosperity and long-term success.
              </p>
            </div>
            <Link href="/auth/register">
            <button className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-105">
              Get Started
            </button>
            </Link>
          </div>           
          <div className="flex justify-center items-center order-2 mb-8 lg:mb-0 min-h-[320px] sm:min-h-[400px] lg:min-h-[550px]">            
            <div
              className={`
                relative 
                bg-card/30 backdrop-blur-sm border-white border-[1px] 
                overflow-hidden shadow-xl animate-subtle-bounce
                w-[290.68px] h-[297.61px] 
                sm:w-[350px] sm:h-[359px]  /* Optional: intermediate size */
                lg:w-[465.12px] lg:h-[477.03px]
                rounded-tl-[29.76px] rounded-tr-[3.4px] 
                rounded-br-[29.76px] rounded-bl-[3.4px]
              `}
            >
              <Image                
                src="/valuation/Image.png"
                alt="Enterprise Financial Strategy"
                layout="fill"
                objectFit="cover" 
                className="transform transition-transform duration-500 hover:scale-105" 
              />           
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}