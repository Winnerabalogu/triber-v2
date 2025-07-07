import CountUp from "@/components/count-up";
interface Stat {
    label: string;
    value: number;
    icon: React.ElementType;
}

interface StatsCardsSectionProps {
    stats: Stat[];
}

export default function StatsCardsSection({ stats }: StatsCardsSectionProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">            
            {stats.map((stat, index) => (
                <div key={index} className="bg-background border border-foreground/60 rounded-xl p-6 flex items-center justify-between transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 flex-shrink-0 liquid-glass-card shadow-md shadow-foreground/20">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-bold text-foreground">                            
                            <CountUp end={stat.value} duration={2} />
                            {stat.label.toLowerCase().includes('score') && '%'}
                        </h3>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                </div>
            ))}
        </div>
    );
}