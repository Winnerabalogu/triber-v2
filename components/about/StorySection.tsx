import { Globe } from "lucide-react";

export default function StorySection() {

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">                    
          <div className="flex justify-center lg:justify-start items-center order-1 lg:order-1 mb-8 lg:mb-0 animate-on-scroll animate-scaleIn">
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full flex items-center justify-center animate-float">
              <div className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-primary/30 to-transparent rounded-full flex items-center justify-center">
                <div className="w-48 h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 bg-primary/20 rounded-full flex items-center justify-center">
                  <Globe className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 text-primary opacity-50 transition-transform duration-700 hover:rotate-12" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-2 lg:order-2 animate-on-scroll animate-fadeInRight animate-delay-200">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8 text-center lg:text-left">
              Our story
            </h2>
            <div className="space-y-4 md:space-y-6 text-muted-foreground">
              <p className="text-sm md:text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque Lorem ipsum dolor, ultrices.
                Suspendisse odio elementum urna placerat lacus bibendum. Sed molestie sit odiore orci elementum.
                Pellentesque tempor luctus at nunc lorem. Porttitor aliquam et fingilla. Pharnea arcu tempus ullamcorper
                bibendum in. Mauris temporibus lacus, fermentum orci.
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                Vulputate pellentesque purus facilisis dignissim gravida sed facilibus nunc. Nunc risus phasrus te vulpu
                purus lacus. Eu et risus at quis rislla tellus suscipit et. Semper ante odio ornu pretium molnique
                habitant. Elit eu molestibus congue netus fegest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}