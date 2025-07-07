import Link from 'next/link';
import Image from 'next/image';
import { Investor } from '@/lib/types';
import { Clock, MapPin, DollarSign, Star, ArrowRight } from 'lucide-react';

interface InvestorCardProps {
  investor: Investor;
}

export default function InvestorCard({ investor }: InvestorCardProps) {
  return (
    <div className="bg-background border border-foreground/60 rounded-xl p-4 flex flex-col transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 liquid-glass-card shadow-md shadow-foreground/20">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Image src={investor.avatarUrl} alt={investor.name} width={40} height={40} className="rounded-full" />
          <div>
            <h3 className="font-bold text-foreground">{investor.name}</h3>
            <p className="text-xs text-muted-foreground">{investor.company}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3"/> Updated {investor.updatedAt}</p>
      </div>

      <p className="text-sm text-muted-foreground flex-grow mb-4">{investor.summary}</p>
      
      <div className="space-y-2 text-sm text-muted-foreground border-t border-border pt-3">
        <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary"/> Locations: {investor.locations.join(', ')}</p>
        <p className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-primary"/> Funds Under Management: N{investor.fundsUnderManagement.toLocaleString()}</p>
        <p className="flex items-center gap-2"><Star className="w-4 h-4 text-primary"/> {investor.rating}/5 ({investor.reviewCount}) Avg. Platform Rating</p>
      </div>

      <Link href={`/deal-room/${investor.id}`} className="mt-4 pt-3 border-t border-border text-sm font-semibold text-primary flex items-center justify-between hover:underline">
        View Profile
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}