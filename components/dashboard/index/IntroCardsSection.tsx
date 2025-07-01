import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntroCard {
  title: string;
  description: string | string[]; 
  featured: boolean;
}

const introCardsData: IntroCard[] = [
    { title: "Ready to take your business to the next level", description: ["Complete the fundability test", "Get your valuation score in just a few clicks", "Go to the Deal Room to explore"], featured: true },
    { title: "Sell your business, Find Investors", description: "List, connect and close deals with top investors today!", featured: false },
    { title: "Buy a business, Invest in a business", description: "Find opportunities, connect with founders, and grow your portfolio.", featured: false },
    { title: "Deal Room: Send proposals to businesses and investors", description: "Connect, Negotiate, and Finalize investments all in one place", featured: false },
];

export default function IntroCardsSection() {
    return (
        <div className="flex flex-wrap md:flex-nowrap gap-2 md:overflow-x-auto scrollbar-hide pb-4 ">
            {introCardsData.map((card, index) => (
                <div 
                  key={index} 
                  className={cn(
                    'group bg-background border border-foreground/60 rounded-xl p-6 flex flex-col transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 flex-shrink-0 liquid-glass-card shadow-md shadow-foreground/20',
                    card.featured ? 'w-full md:w-1/3' : 'w-full md:w-1/4'
                  )}
                >
                    <h3 className="font-bold text-lg text-primary mb-2">{card.title}</h3>                                        
                    {Array.isArray(card.description) ? (
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside flex-grow">                            
                            {card.description.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    ) : (                        
                        <p className="text-sm text-muted-foreground flex-grow">{card.description}</p>
                    )}

                    <button className="flex items-center gap-2 text-sm text-foreground font-medium mt-4 group-hover:text-primary transition-colors">
                        Click to Get Started <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}