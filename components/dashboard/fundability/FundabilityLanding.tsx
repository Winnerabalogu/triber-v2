"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FundabilityHistoryItem } from '@/lib/types';
import CoreService from '@/services/core.service';
import { TrendingUp, FileClock } from 'lucide-react';
import { useModal } from '@/contexts/ModalContext';
import StatusPill from '@/components/ui/status-pill';
import InfoCard from './InfoCard';
import { TestType } from '@/app/(dashboard)/dashboard/fundability/page';

interface FundabilityLandingProps {
    onStartTest: (type: TestType) => void;
}

export default function FundabilityLanding({ onStartTest }: FundabilityLandingProps) {
    const [history, setHistory] = useState<FundabilityHistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { openModal } = useModal();

    useEffect(() => {
        CoreService.getFundabilityHistory().then(data => {
            setHistory(data);
            setIsLoading(false);
        });
    }, []);

    const handleHistoryClick = (item: FundabilityHistoryItem) => {        
        openModal('fundability-history-details', item); 
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoCard title="Calculate Fundability" description="Our fundability test offers a solid and easy way to calculate your enterprise value, to ascertain the level of fundability of your business." />
                <InfoCard title="What Does A Low Score Signify?" description="A low score does not signal an inability to secure funding. It focuses on improvements to enable the business secure quicker, cheaper and flexible funding." />
                <InfoCard title="Why You Should Go To The Deal Room" description="Go to the Deal Room to explore active funding opportunities and connect with investors." />
            </div>

            <div className="bg-background p-6 rounded-lg border border-foreground/60">
                <h2 className="text-xl font-bold mb-4 text-foreground">Take Fundability Test As:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-background p-4 rounded-md border border-foreground/60 text-center">
                        <div className="relative aspect-[16/10] rounded-md overflow-hidden mb-4"><Image src="/placeholder.svg?text=Startup" layout="fill" alt="Startup Fundability"/></div>
                        <Button className="w-full" onClick={() => onStartTest('startup')}>Start Test for Startup</Button>
                    </div>
                     <div className="bg-background p-4 rounded-md border border-foreground/60 text-center">
                        <div className="relative aspect-[16/10] rounded-md overflow-hidden mb-4"><Image src="/placeholder.svg?text=SME" layout="fill" alt="SME Fundability"/></div>
                        <Button className="w-full" onClick={() => onStartTest('sme')}>Start Test for SME</Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-background p-6 rounded-lg border border-foreground/60">
                     <h3 className="font-bold text-foreground flex items-center gap-2 mb-4"><TrendingUp className="w-5 h-5 text-primary"/> Fundability History</h3>
                     {isLoading ? <p className="text-sm text-muted-foreground">Loading history...</p> : (
                        <div className="space-y-3">
                            {history.filter(item => item.status === 'Completed').map(item => (
                                <button 
                                    key={item.id} 
                                    onClick={() => handleHistoryClick(item)}
                                    className="w-full flex justify-between items-center text-sm p-3 rounded-md hover:bg-muted transition-colors text-left"
                                >
                                    <div>
                                        <p className="font-semibold text-foreground">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.date}</p>
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
                 <div className="bg-background p-6 rounded-lg border border-foreground/60">
                    <h3 className="font-bold text-foreground flex items-center gap-2 mb-4"><FileClock className="w-5 h-5 text-yellow-500"/> Pending Tests</h3>
                    <p className="text-sm text-muted-foreground">You have no pending fundability tests.</p>
                 </div>
            </div>
        </div>
    );
}