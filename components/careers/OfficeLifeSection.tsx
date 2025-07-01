import { ArrowRight } from "lucide-react";
import Image from  "next/image"

const officePhotos = [
  "/career/inside.png?height=200&width=200",
  "/career/inside1.png?height=200&width=200",
  "/career/inside2.png?height=200&width=200",
  "/career/inside3.png?height=200&width=200",
  "/career/inside4.png?height=200&width=200",
  "/career/why3.png?height=200&width=200",
  "/career/why1.png?height=200&width=200",  
];

export default function OfficeLifeSection() {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">        
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 md:mb-16 animate-on-scroll animate-fadeInUp">
          Take a peep at what goes on at Triber!
        </h2>        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">                  
          {officePhotos.slice(0, 7).map((photo, index) => (
            <div
              key={index}
              className={`relative  aspect-square rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer animate-on-scroll animate-fadeInUp animate-delay-${
                (index + 3) * 100
              } hover-glow`}
            >
             <Image
                src={photo || "/placeholder.svg"}
                alt={`Office life ${index + 1}`}
                fill                 
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"                
                className="object-cover"
              />
            </div>
          ))}          
          <div
            className={`
              group aspect-square rounded-xl transition-all duration-300 cursor-pointer 
              flex items-center justify-center
              bg-primary/10 border-2 border-dashed border-primary/30
              hover:bg-primary/20 hover:border-primary/50
              animate-on-scroll animate-fadeInUp animate-delay-1000
            `}
          >
            <button className="flex items-center gap-2 text-foreground font-medium">
              <span>Explore more</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}