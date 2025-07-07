"use client";

import { Investor } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Tag from '@/components/ui/tag';
import InfoCard from './overview/InfoCard';
import { Briefcase, CheckCircle, Clock, DollarSign, FileText, Globe, Heart, Key, Mail, MapPin, MessageCircle, Phone, ShieldAlert, Star, Target } from 'lucide-react';
import { useModal } from '@/contexts/ModalContext';
import { useRouter } from 'next/navigation';

interface InvestorOverviewContentProps {
  investor: Investor;
}

// A helper for displaying key-value pairs
const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <div className="text-sm font-semibold text-foreground mt-1">{value}</div>
  </div>
);

export default function InvestorOverviewContent({ investor }: InvestorOverviewContentProps) {
  const { openModal } = useModal();
  const router = useRouter();

  const handleSendProposal = () => {
    // We'll build the 'send-proposal' modal in the next step
    openModal('send-proposal', { investorId: investor.id, investorName: investor.name });
  };
  
  const handleChat = () => {
    // This will navigate to the chat page we'll build later
    router.push(`/deal-room/chat/${investor.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Investor Overview</h1>
        <Button variant="ghost" size="icon"><Heart className="w-5 h-5"/></Button>
      </div>

      {/* Main Info Block */}
      <div className="bg-background/50 border border-border p-6 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src={investor.avatarUrl} alt={investor.name} width={64} height={64} className="rounded-lg"/>
          <div>
            <h2 className="text-xl font-bold text-foreground">{investor.name}</h2>
            <p className="text-sm text-muted-foreground">{investor.company}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleSendProposal}><FileText className="w-4 h-4 mr-2"/>Send Proposal</Button>
          <Button onClick={handleChat} variant="outline"><MessageCircle className="w-4 h-4 mr-2"/>Chat</Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column */}
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
          
          <InfoCard title="Disclaimer" icon={ShieldAlert}>
            <p className="text-xs text-muted-foreground">Triber is NOT a regulated marketplace... The final responsibility of conducting a thorough due diligence and taking the transaction forward lies with the user.</p>
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
          
          <InfoCard title="Location Preferences" icon={MapPin}>
            <div className="flex flex-wrap gap-2">
                {investor.locations.map(loc => <Tag key={loc} className="bg-primary/20">{loc}</Tag>)}
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
    </div>
  );
}