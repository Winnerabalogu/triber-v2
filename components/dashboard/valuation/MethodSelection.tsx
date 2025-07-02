"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import InfoCard from './InfoCard';

const startupMethods = [
    { id: 'berkus', name: 'Berkus Method', description: 'A fairly simple valuation technique that can be used as a quick rule of thumb.' },
    { id: 'payne', name: 'Payne Method', description: 'Primarily meant to be used for early stage, pre-revenue startups.' },
    { id: 'vc-rating', name: 'VC Rating | Venionaire', description: 'A detailed method often used by Venture Capitalists.' },
    { id: 'free-cash-flow', name: 'Free Cash Flow', description: 'Focuses on the cash a company generates after accounting for cash outflows.' },
    { id: 'vc-method', name: 'VC Method', description: 'Another popular method used by venture funds to value pre-revenue companies.' },
    { id: 'first-chicago', name: 'First Chicago Method', description: 'Combines income and market approaches to create a valuation range.' },
];

const smeMethods = [
    { id: 'cash-flow', name: 'Cash Flow Method', description: 'The primary method for valuing established Small and Medium Enterprises.' },
];

interface MethodSelectionProps {
    testType: 'startup' | 'sme';
    onMethodSelect: (methodId: string) => void;
    onBack: () => void;
}

export default function MethodSelection({ testType, onMethodSelect, onBack }: MethodSelectionProps) {
    const [selected, setSelected] = useState<string | null>(null);
    const methods = testType === 'startup' ? startupMethods : smeMethods;

    return (
         <div className="space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoCard title="Calculate Valuation" description="Please fill out some basic information about your company. These will be presented in the valuation report at the end of the process." />
                <InfoCard title="What Does A Low Score Signify?" description="A low score does not signal an inability to secure funding. It focuses on improvements to enable the business secure quicker, cheaper and flexible funding." />
                <InfoCard title="Why You Should Go To The Deal Room" description="Go to the Deal Room to explore active funding opportunities and connect with investors." />
            </div>

        <div className="bg-background p-6 md:p-8 rounded-lg border border-foreground/69">
            <h2 className="text-xl font-bold text-foreground mb-2">Take Valuation Test As:</h2>
            <p className="text-sm text-muted-foreground mb-6">Select a valuation method. Different methods might be more suitable than others.</p>

            <div className="space-y-4">
                {methods.map(method => (
                    <div 
                        key={method.id}
                        onClick={() => setSelected(method.id)}
                        className={cn(
                            "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
                            selected === method.id ? "border-primary bg-primary/5" : "border-foreground/69 hover:border-foreground/69/70"
                        )}
                    >
                        <div className="flex items-center gap-4">
                             <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                                style={{ borderColor: selected === method.id ? 'var(--primary)' : 'hsl(var(--muted-foreground))' }}
                             >
                                {selected === method.id && <CheckCircle className="w-5 h-5 text-primary" />}
                             </div>
                             <div>
                                <h3 className="font-semibold text-foreground">{method.name}</h3>
                                <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
                             </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-foreground/69">
                <Button variant="outline" onClick={onBack}>Back</Button>
                <Button onClick={() => selected && onMethodSelect(selected)} disabled={!selected}>
                    Next
                </Button>
            </div>
        </div>
    </div>
    );
}