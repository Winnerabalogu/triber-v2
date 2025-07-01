"use client"
import { ArrowRight } from 'lucide-react';
import { User } from '@/lib/types';

const todoChecks = [
    { key: 'isProfileComplete', title: "Profile Not Yet Completed", description: "List, connect and close deals with top investors today!" },
    { key: 'isFundabilityTestTaken', title: "Fundability Test Incomplete", description: "Find opportunities, connect with founders, and grow your portfolio." },
    { key: 'isDealRoomProfileComplete', title: "Deal Room Profile Incomplete", description: "Connect, Negotiate, and Finalize investments all in one place" },
    { key: 'isValuationComplete', title: "Complete Valuation Process", description: "Connect, Negotiate, and Finalize investments all in one place" },
    { key: 'isProposalProcessStarted', title: "Proposal Process Incomplete", description: "Connect, Negotiate, and Finalize investments all in one place" },
];

interface TodosSectionProps {
    user: User | null;
}

export default function TodosSection({ user }: TodosSectionProps) {
    if (!user) return null;

    const incompleteTasks = todoChecks.filter(task => !user[task.key as keyof User]);

    if (incompleteTasks.length === 0) return null;

    return (
        <div>
            <h2 className="text-xl font-bold text-foreground mb-4">To Do's</h2>
            
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 xl:grid-cols-5">
                {incompleteTasks.map((task, index) => (
                    <div 
                        key={index} 
                        className="w-72 lg:w-auto bg-background border border-foreground/60 rounded-xl p-6 flex flex-col transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 flex-shrink-0 liquid-glass-card shadow-md shadow-foreground/20"
                    >
                        <h3 className="font-bold text-lg text-primary mb-2">{task.title}</h3>
                        <p className="text-sm text-muted-foreground flex-grow mb-4">{task.description}</p>
                        <button className="flex items-center gap-2 text-sm text-foreground font-medium mt-auto hover:text-primary transition-colors">
                            Click to Complete <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}