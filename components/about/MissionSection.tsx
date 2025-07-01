export default function MissionSection() {

  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">          
          <div className="animate-on-scroll animate-fadeInLeft order-2 lg:order-1">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8 text-center lg:text-left">
              Our mission
            </h2>
            <div className="space-y-4 md:space-y-6 text-muted-foreground">
              <p className="animate-on-scroll animate-fadeInLeft animate-delay-200 text-sm md:text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque Lorem ipsum dolor, ultrices.
                Suspendisse odio elementum urna placerat lacus bibendum. Sed molestie sit odiore orci elementum.
                Pellentesque tempor luctus at nunc lorem. Porttitor aliquam et fingilla. Pharnea arcu tempus ullamcorper
                bibendum in. Mauris temporibus lacus, fermentum orci.
              </p>
              <p className="animate-on-scroll animate-fadeInLeft animate-delay-400 text-sm md:text-base leading-relaxed">
                Vulputate pellentesque purus facilisis dignissim gravida sed facilibus nunc. Nunc risus phasrus te vulpu
                purus lacus. Eu et risus at quis rislla tellus suscipit et. Semper ante odio ornu pretium molnique
                habitant. Elit eu molestibus congue netus fegest.
              </p>
            </div>
          </div>                    
          <div className="flex justify-center lg:justify-end items-center order-1 lg:order-2 mb-8 lg:mb-0 animate-on-scroll animate-scaleIn">
            <div 
              className="
                relative 
                w-96 h-96 
                md:w-80 md:h-80 
                lg:w-[350px] lg:h-[350px]
                animate-float
                rounded-2xl 
                overflow-hidden 
                shadow-xl 
              "
            >
              <img              
                src="/about/planet.svg"
                alt="Our Mission Illustration"                                  
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}