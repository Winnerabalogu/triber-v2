"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Play, ArrowDown } from "lucide-react"

export default function CareersHeroSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
   const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("open-positions");
    
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start", 
      });
    }
  };
  return (
    <>
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Content */}
            <div className="animate-on-scroll animate-fadeInLeft order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Join the team
              </h1>
              <p className="text-muted-foreground text-lg md:text-[17px] mb-8 leading-relaxed">
                Triber is an employee-centred company that looks after every employee, gives autonomy to make choices, supports self-development and career growth. Our development team is always in search of talented individuals to join our employee-centred culture.                
              </p>
              <p className="text-muted-foreground text-lg md:text-[17px] mb-8 leading-relaxed">Navigate below to see our current open positions!</p>

              {/* 2. Updated Button */}
             <button 
              onClick={handleScroll}
              className="group flex items-center gap-2 px-6 py-5 bg-primary text-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover-glow"
            >
              <span>Open Positions</span>        
              <ArrowDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" />
            </button>
            </div>

            {/* Right Visual */}
            <div className="flex justify-center animate-on-scroll animate-scaleIn animate-delay-300 order-1 lg:order-2 mb-8 lg:mb-0">
              <div className="relative cursor-pointer" onClick={() => setIsVideoModalOpen(true)}>
                {/* Main Profile Circle */}
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl relative group">
                  <img
                    src="/career/careerhome.png?height=320&width=320"
                    alt="Team member"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-1 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-float">
                  <div className="w-6 h-6 bg-primary rounded-full"></div>
                </div>
                <div
                  className="absolute top-1/2 -left-8 w-8 h-8 bg-yellow-400/20 rounded-full flex items-center justify-center animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                </div>
                <div
                  className="absolute -bottom-6 left-1/4 w-10 h-10 bg-green-400/20 rounded-full flex items-center justify-center animate-float"
                  style={{ animationDelay: "2s" }}
                >
                  <div className="w-5 h-5 bg-green-400 rounded-full"></div>
                </div>
                <div
                  className="absolute top-1/4 -right-12 w-6 h-6 bg-red-400/20 rounded-full flex items-center justify-center animate-float"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <Modal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)}>
        <div className="aspect-video w-full bg-black rounded-xl overflow-hidden">
          <video className="w-full h-full" controls autoPlay poster="/placeholder.svg?height=400&width=600">
            <source src="/placeholder-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-2">Join Our Amazing Team</h3>
          <p className="text-muted-foreground">
            Watch this video to learn more about our company culture, values, and what makes Triber a great place to
            work. Discover the opportunities that await you and see why our team members love being part of the Triber
            family.
          </p>
        </div>
      </Modal>
    </>
  )
}