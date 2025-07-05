import { Bell, Search, Star, Users, Clock, DollarSign, ArrowRight } from "lucide-react";

const dashboardDeals = [
  { id: 1, name: "K Investment Limited", funds: "$122k", rating: 4.5 },
  { id: 2, name: "K Investment Limited", funds: "$122k", rating: 4.5 },
  { id: 3, name: "Quantum Ventures", funds: "$122k", rating: 4.5 },
  { id: 4, name: "Future Growth", funds: "$85k", rating: 4.8 },
  { id: 5, name: "Future Growth", funds: "$85k", rating: 4.8 },
  { id: 6, name: "Apex Holdings", funds: "$85k", rating: 4.8 },
  { id: 7, name: "Innovate Capital", funds: "$250k", rating: 4.2 },
  { id: 8, name: "NextGen Partners", funds: "$55k", rating: 4.9 },  
  { id: 9, name: "Quantum Ventures", funds: "$150k", rating: 4.6 },
];

export default function SubmitProposalSection() {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">        
        <div className="grid grid-cols-1 gap-8 md:gap-16 items-center">
                    
          <div className="animate-on-scroll animate-fadeInLeft order-1 text-center">
            <div className="text-primary text-sm font-semibold mb-4 tracking-wider">SEND A PROPOSAL</div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Submit Proposal Directly...
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Review and fine-tune proposals seamlessly. Send professional proposals via Triber for both businesses and
              investors.
            </p>
          </div>

          {/* Right Dashboard Container */}
          <div className="relative animate-on-scroll animate-scaleIn animate-delay-300 order-2 h-[550px] md:h-[500px]">                        
            <div className="absolute inset-x-0 bottom-0 bg-card rounded-2xl shadow-2xl p-6 pt-40 md:pt-32 z-10">              
              <div className="relative mb-6">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search collections..."
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground"
                />
              </div>                            
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {dashboardDeals.map((deal) => (
                  <div key={deal.id} className="group bg-background/50 rounded-lg p-3 border border-transparent hover:border-primary/30 transition-colors duration-300 cursor-pointer">
                    <h4 className="text-foreground font-semibold text-xs mb-1 truncate">{deal.name}</h4>
                    <div className="flex justify-between items-end">
                        <span className="text-primary font-bold text-lg">{deal.funds}</span>
                        <span className="text-yellow-400 flex items-center gap-1 text-xs">
                            <Star className="w-3 h-3"/> {deal.rating}
                        </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overlapping Investment Card (Sits on top) */}            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] sm:w-96 bg-background border border-border rounded-2xl shadow-2xl p-6 z-20">
              <h3 className="text-foreground font-semibold text-lg mb-4">AK Investment Limited</h3>
              <div className="space-y-3 text-sm mb-4">
                <div className="flex items-center gap-2 text-muted-foreground"><Clock className="w-4 h-4 text-primary"/><span>Updated Jan 4</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><Users className="w-4 h-4 text-primary"/><span>20 Companies Invested In</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><DollarSign className="w-4 h-4 text-primary"/><span>$122,374.43 Investment Fund</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><Star className="w-4 h-4 text-primary"/><span>4.5/5 (230) Investor Rating</span></div>
              </div>
              <button className="text-primary font-medium flex items-center gap-1 text-sm group">
                <span>See More</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Notification Bell */}
            <div className="absolute -top-4 right-0 sm:right-4 z-30">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Bell className="w-8 h-8 md:w-12 md:h-12 text-primary-foreground" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}