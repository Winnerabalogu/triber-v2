"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ValuationHistoryItem } from '@/lib/types';
import CoreService from '@/services/core.service';
import { TrendingUp, FileClock } from 'lucide-react';
import { useModal } from '@/contexts/ModalContext';
import StatusPill from '@/components/ui/status-pill'
import InfoCard from '../../InfoCard';

interface ValuationLandingProps {
    onStartTest: (type: 'startup' | 'sme') => void;
}

export default function ValuationLanding({ onStartTest }: ValuationLandingProps) {
    const [history, setHistory] = useState<ValuationHistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { openModal } = useModal();

    useEffect(() => {
        CoreService.getValuationHistory().then(data => {
            setHistory(data);
            setIsLoading(false);
        });
    }, []);

    const handleHistoryClick = (item: ValuationHistoryItem) => {
        openModal('valuation-history-details', item);
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoCard title="Calculate Valuation" description="Please fill out some basic information about your company. These will be presented in the valuation report at the end of the process." />
                <InfoCard title="What Does A Low Score Signify?" description="A low score does not signal an inability to secure funding. It focuses on improvements to enable the business secure quicker, cheaper and flexible funding." />
                <InfoCard title="Why You Should Go To The Deal Room" description="Go to the Deal Room to explore active funding opportunities and connect with investors." />
            </div>

            <div className="bg-background p-6 rounded-lg border border-foreground/60 liquid-glass-card shadow-md shadow-foreground/20">
                <h2 className="text-xl font-bold mb-1 text-foreground">Take Valuation Test As:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 ">
                    <div className="bg-background p-4 rounded-md border border-foreground/60 text-center liquid-glass-card shadow-md shadow-foreground/20">
                        <div className="relative aspect-video rounded-md overflow-hidden mb-4"><Image src="/placeholder.svg?text=Startup" layout="fill" alt="Startup Valuation"/></div>
                        <Button className="w-full" onClick={() => onStartTest('startup')}>Start Test for Startup</Button>
                    </div>
                     <div className="bg-background p-4 rounded-md border border-foreground/60 text-center liquid-glass-card shadow-md shadow-foreground/20">
                        <div className="relative aspect-video rounded-md overflow-hidden mb-4"><Image src="/placeholder.svg?text=SME" layout="fill" alt="SME Valuation"/></div>
                        <Button className="w-full" onClick={() => onStartTest('sme')}>Start Test for SME</Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-background p-6 rounded-lg border border-foreground/60 liquid-glass-card shadow-md shadow-foreground/20">
                     <h3 className="font-bold text-foreground flex items-center gap-2 mb-4"><TrendingUp className="w-5 h-5 text-primary"/> Valuation History</h3>
                     {isLoading ? <p className="text-sm text-muted-foreground">Loading history...</p> : (
                        <div className="space-y-3">
                            {history.filter(item => item.status === 'Completed').map(item => (
                                <button 
                                    key={item.id} 
                                    onClick={() => handleHistoryClick(item)}
                                    className="w-full flex justify-between items-center text-sm p-2 rounded-md hover:bg-primary/20 transition-colors text-left"
                                >
                                    <div>
                                        <p className="font-semibold text-foreground">{item.name} <span className="text-xs text-muted-foreground">({item.type})</span></p>
                                        <p className="text-xs text-muted-foreground">{item.method}</p>
                                    </div>
                                   <div className="flex items-center gap-4">
                                        <StatusPill score={item.score} />
                                        <span className="font-bold text-lg text-primary w-8 text-right">{item.score}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                     )}
                 </div>
                 <div className="bg-background p-6 rounded-lg border border-foreground/60 liquid-glass-card shadow-md shadow-foreground/20">
                    <h3 className="font-bold text-foreground flex items-center gap-2 mb-4"><FileClock className="w-5 h-5 text-yellow-500"/> Pending Results</h3>
                    <p className="text-sm text-muted-foreground">You have no pending valuation results.</p>
                 </div>
            </div>
        </div>
    );
}