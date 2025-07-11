"use client"

import Image from "next/image";
import Link from 'next/link';
import { ConversationPreview } from "@/lib/types";
import EmptyState from "@/components/ui/EmptyState";
import { MessageCircle } from "lucide-react";

interface ConversationsCardProps {
  conversations: ConversationPreview[];
}

export default function ConversationsCard({ conversations }: ConversationsCardProps) {
  return (
    <div className="bg-background border border-foreground/60 rounded-xl p-6 h-full shadow-md shadow-foreground/20">
      <h3 className="text-lg font-bold text-foreground mb-6">Favourite Deal Room Conversations</h3>            
      {conversations.length > 0 ? (
        <div className="space-y-4">
          {conversations.map(convo => (
            <div key={convo.investorId} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <Image src={convo.investorAvatar} alt={convo.investorName} width={40} height={40} />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-sm text-foreground truncate">{convo.investorName}</p>
                  <p className="text-xs text-muted-foreground truncate">{convo.lastMessage}</p>
                </div>
              </div>
              <Link href={`/dashboard/deal-room/chat/${convo.investorId}`} className="text-xs font-bold text-primary hover:underline flex-shrink-0">
                VIEW
              </Link>
            </div>
          ))}
        </div>
      ) : (        
        <EmptyState
          icon={MessageCircle}
          title="No Conversations Yet"
          description="When you start a chat with an investor in the Deal Room, it will appear here."
          className="py-10 border-none shadow-none bg-transparent" 
        />
      )}
    </div>
  );
}