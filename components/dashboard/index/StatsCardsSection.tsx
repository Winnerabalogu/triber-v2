import { Eye, FileText, Link2, Target } from 'lucide-react';
import CountUp from "@/components/count-up";

const statsData = [
    { label: "Profile Views", value: 0, icon: Eye },
    { label: "Fundability Test Score", value: 0, icon: FileText },
    { label: "Listed Connections", value: 0, icon: Link2 },
    { label: "Valuation Score", value: 0, icon: Target },
];

export default function StatsCardsSection() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
                <div key={index} className="bg-background border border-foreground/60 rounded-xl p-6 flex items-center justify-between transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 flex-shrink-0 liquid-glass-card shadow-md shadow-foreground/20">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-bold text-foreground">
                            <CountUp end={stat.value} duration={2} />
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