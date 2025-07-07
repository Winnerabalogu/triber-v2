const dealRoomData = [
  {
    id: 1,
    name: "AK Investment Limited",
    date: "Jan 4, 2024",
    investedCompanies: 20,
    funds: "$122,374.43",
    rating: "4.5/5",
  },
  {
    id: 2,
    name: "Future Growth Ventures",
    date: "Dec 18, 2023",
    investedCompanies: 12,
    funds: "$85,500.00",
    rating: "4.8/5",
  },
  {
    id: 3,
    name: "Innovate Capital",
    date: "Nov 22, 2023",
    investedCompanies: 35,
    funds: "$250,120.90",
    rating: "4.2/5",
  },
  {
    id: 4,
    name: "NextGen Partners",
    date: "Oct 5, 2023",
    investedCompanies: 8,
    funds: "$55,000.00",
    rating: "4.9/5",
  },
];

export default function DealroomHeroSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-6xl mx-auto md:px-4">        
        <div className="bg-primary rounded-3xl overflow-hidden">                    
          <div className="hidden lg:grid lg:grid-cols-9">
                        
            <div className="lg:col-span-5 animate-on-scroll animate-fadeInLeft">
              <div className="p-12 xl:p-16 relative overflow-hidden h-full flex flex-col justify-center">
                <div className="relative z-10">
                  <div className="text-black text-sm font-semibold mb-4 tracking-wider">ONBOARDING</div>
                  <h1 className="text-3xl lg:text-5xl font-bold text-background mb-6 leading-tight">
                    Let's businesses and investors connect
                  </h1>
                  <p className="text-foreground text-base md:text-lg leading-relaxed">
                    Effortlessly onboard your assistant with an intuitive training process tailored to your unique
                    requirements and objectives.
                  </p>
                </div>
                {/* Decorative gradients */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-black/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-black/5 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
              </div>
            </div>
            
            <div className="lg:col-span-4 animate-on-scroll animate-scaleIn animate-delay-300">
                <div className="relative w-full h-full">
                  {/* Browser Window */}
                  <div className="bg-gray-900 h-full">
                    {/* Browser Header */}
                    <div className="bg-gray-800 p-4 flex items-center">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    </div>                    
                    <div className="bg-gray-900 p-6 flex h-full">
                      {/* Sidebar */}
                      <div className="flex flex-col space-y-4 mr-6 pt-2">
                        {/* Icons can be placed here later */}
                        <div className="w-5 h-5 bg-gray-700 rounded-md"></div>
                        <div className="w-5 h-5 bg-primary/30 rounded-md"></div>
                        <div className="w-5 h-5 bg-gray-700 rounded-md"></div>
                      </div>
                      {/* Main Content */}
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-xl mb-6">Active Deal Rooms</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {dealRoomData.map((deal) => (
                            <div key={deal.id} className="group bg-gray-800/50 rounded-lg p-4 border border-transparent hover:border-primary/30 transition-all duration-300 cursor-pointer flex flex-col justify-between">
                              <div>
                                <h4 className="text-white font-semibold text-sm mb-1 line-clamp-1">{deal.name}</h4>
                                <p className="text-xs text-gray-400 mb-4">{deal.date}</p>
                                <div className="text-green-400 font-bold text-2xl mb-2">{deal.funds}</div>
                                <p className="text-xs text-gray-500">Investment Funds</p>
                              </div>
                              <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
                                <span className="flex items-center gap-1">
                                  {/* Star Icon */}
                                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                  {deal.rating}
                                </span>
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          
          <div className="lg:hidden">            
            <div className="p-8 text-center animate-on-scroll animate-fadeInUp">
                <div className="text-black text-sm font-semibold mb-4 tracking-wider">ONBOARDING</div>
                <h1 className="text-3xl font-bold text-background mb-6 leading-tight">
                  Let's businesses and investors connect
                </h1>
                <p className="text-foreground text-base leading-relaxed">
                  Effortlessly onboard your assistant with an intuitive training process tailored to your unique
                  requirements and objectives.
                </p>
            </div>
            
            {/* Bottom Dashboard Section */}
            <div className="p-4 md:p-6 animate-on-scroll animate-scaleIn">
                 <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Browser Header */}
                    <div className="bg-gray-800 p-3 flex items-center">
                      <div className="flex space-x-2">
                         <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                         <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                         <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                      </div>
                    </div>                    
                    <div className="bg-gray-900 p-4">
                      <h3 className="text-white font-semibold text-lg mb-4">Active Deal Rooms</h3>
                      <div className="space-y-4">
                         {dealRoomData.map((deal) => (
                          <div key={deal.id} className="group bg-gray-800/50 rounded-lg p-4 border border-transparent hover:border-primary/30">
                              <h4 className="text-white font-semibold text-sm mb-1">{deal.name}</h4>
                              <p className="text-xs text-gray-400 mb-3">{deal.date}</p>
                              <div className="text-green-400 font-bold text-xl">{deal.funds}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                 </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}