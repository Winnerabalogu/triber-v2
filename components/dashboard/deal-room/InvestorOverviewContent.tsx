"use client";

import { Investor } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Tag from '@/components/ui/tag';
import InfoCard from './overview/InfoCard';
import { Briefcase, CheckCircle, Clock, DollarSign, FileText, Globe, Heart, Key, Mail, MapPin, MessageCircle, Phone, ShieldAlert, Star, Target } from 'lucide-react';
import { useModal } from '@/contexts/ModalContext';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import CoreService from '@/services/core.service';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface InvestorOverviewContentProps {
  investor: Investor;
}

const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <div className="text-sm font-semibold text-foreground mt-1">{value}</div>
  </div>
);

export default function InvestorOverviewContent({ investor }: InvestorOverviewContentProps) {
  const { openModal } = useModal();
  const router = useRouter();
   const [isWishlisted, setIsWishlisted] = useState(false);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);

  const handleToggleWishlist = async () => {
    setIsUpdatingWishlist(true);
    try {
      await CoreService.toggleInvestorWishlist(investor.id, isWishlisted);
      const newWishlistStatus = !isWishlisted;
      setIsWishlisted(newWishlistStatus);
      toast.success(newWishlistStatus ? "Added to Wishlist" : "Removed from Wishlist", {
        description: `${investor.name} has been ${newWishlistStatus ? 'added to' : 'removed from'} your wishlist.`,
      });
    } catch (error) {
      toast.error("Failed to update wishlist. Please try again.");
    } finally {
      setIsUpdatingWishlist(false);
    }
  };

  const handleSendProposal = () => {    
    openModal('send-proposal', { investorId: investor.id, investorName: investor.name });
  };
  
  const handleChat = () => {    
    router.push(`/dashboard/deal-room/chat/${investor.id}`);
  };

  return (
    <div className="space-y-6">      
     <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Investor Overview</h1>
        <Button 
          onClick={handleToggleWishlist} 
          disabled={isUpdatingWishlist}
          variant="ghost" 
          size="icon"
          aria-label="Add to wishlist"
          className={cn("text-muted-foreground hover:text-red-500", isWishlisted && "text-red-500")}
        >
          <Heart className={cn("w-6 h-6", isWishlisted && "fill-current")} />
        </Button>
      </div>            
      <div className="bg-background/50 border border-border p-4 md:p-6 rounded-lg flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-4 w-full">
          <Image src={investor.avatarUrl} alt={investor.name} width={64} height={64} className="rounded-lg flex-shrink-0"/>
          <div className="flex-grow">
            <h2 className="text-xl font-bold text-foreground">{investor.name}</h2>
            <p className="text-sm text-muted-foreground">{investor.company}</p>
          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto flex-shrink-0">
          <Button onClick={handleSendProposal} className="w-full sm:w-auto"><FileText className="w-4 h-4 mr-2"/>Send Proposal</Button>
          <Button onClick={handleChat} variant="outline" className="w-full sm:w-auto"><MessageCircle className="w-4 h-4 mr-2"/>Chat</Button>
        </div>
      </div>      

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">        
        <div className="lg:col-span-2 space-y-6">
          <InfoCard title="Investor Profile" icon={Briefcase}>
            <p className="text-sm text-muted-foreground">{investor.professionalSummary}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-border">
              <DetailItem label="Investor Type" value={<Tag>{investor.investorType}</Tag>} />
              <DetailItem label="Verification" value={<div className="flex items-center gap-1.5 text-green-400"><CheckCircle className="w-4 h-4"/> Verified</div>} />
              <DetailItem label="Rating" value={<div className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400"/> {investor.rating}/5 ({investor.reviewCount})</div>} />
            </div>
          </InfoCard>

          <InfoCard title="Contact Information" icon={Mail}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DetailItem label="Phone" value={<div className="flex items-center gap-1.5 text-muted-foreground/80"><Phone className="w-4 h-4"/> Available after connection</div>} />
              <DetailItem label="Email" value={<div className="flex items-center gap-1.5 text-muted-foreground/80"><Mail className="w-4 h-4"/> Available after connection</div>} />
              <DetailItem label="Location" value={investor.locations[0]} />
            </div>
          </InfoCard>
           <InfoCard title="Location Preferences" icon={MapPin}>
            <div className="flex flex-wrap gap-2">
                {investor.locations.map(loc => <Tag key={loc} className="bg-primary/20">{loc}</Tag>)}
            </div>
          </InfoCard>        
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          <InfoCard title="Investor Criteria" icon={Target}>
            <DetailItem label="Investment Requirement" value="Well established, proper books, scalable, solid MRR, no customer concentration and should be innovative." />
            <DetailItem label="Investment Size" value={`N${investor.investmentSize.min.toLocaleString()} - N${investor.investmentSize.max.toLocaleString()}`} />
          </InfoCard>
          <InfoCard title="Industry Preferences" icon={Globe}>
            <div className="flex flex-wrap gap-2">
              {investor.industryPreferences.map(tag => <Tag key={tag}>{tag}</Tag>)}
            </div>
          </InfoCard>    
          <InfoCard title="Key Tags" icon={Key}>
             <div className="flex flex-wrap gap-2">
                 <Tag>Debt Funding</Tag>
                 <Tag>Project Financing</Tag>
                 <Tag>Buy-Out</Tag>
             </div>
          </InfoCard>           
        </div>
        
      </div>
      <div className='w-full flex flex-col'>
         <InfoCard title="Disclaimer" icon={ShieldAlert}>          
            <p className="text-xs text-muted-foreground">Triber is NOT a regulated marketplace for connecting business sell sides with investors, buyers, lenders and advisors. Neither does Triber represents nor guarantees that the information mentioned above is complete or correct. Note that Triber is not liable for any loss, damage, costs, claims and expenses whatsoever arising from transacting with any other user from the website. The final responsibility of conducting a thorough due diligence and taking the transaction forward lies with the user.</p>
      </InfoCard>
      </div>
    </div>
  );
}