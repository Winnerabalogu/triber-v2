"use client"

import Image from "next/image";
import Link from 'next/link';
import { Plus, MoreHorizontal, Heart } from "lucide-react";
import { Investor } from "@/lib/types";
import EmptyState from '@/components/ui/EmptyState';
import { Button } from "@/components/ui/button";

interface WishlistSectionProps {
  investors: Investor[];
}

export default function WishlistSection({ investors }: WishlistSectionProps) {
  return (
    <div className="bg-background border border-foreground/60 rounded-xl p-6 shadow-md shadow-foreground/20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground">Wishlist</h3>
          <p className="text-sm text-muted-foreground">Saved Potential Investors From Deal Room</p>
        </div>
        <button className="p-2 rounded-full text-muted-foreground hover:bg-muted">
            <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>            
      {investors.length > 0 ? (
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 ">          
          {investors.map(investor => (
            <div key={investor.id} className="w-72 flex-shrink-0 bg-background border border-foreground/60 rounded-lg p-4 flex flex-col liquid-glass-card shadow-md shadow-foreground/20">
              <div className="relative aspect-video rounded-md overflow-hidden mb-4">
                <Image src={investor.avatarUrl} alt={investor.name} layout="fill" objectFit="cover" />
              </div>
              <p className="text-xs text-muted-foreground">{investor.company}</p>
              <h4 className="font-semibold text-foreground mb-2">{investor.name}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed flex-grow">{investor.summary}</p>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-foreground/60">
                <div className="flex -space-x-2"> {/* Placeholder for logos */} </div>
                <Link href={`/dashboard/deal-room/${investor.id}`} className="text-xs font-medium text-primary hover:underline">
                  VIEW MORE
                </Link>
              </div>
            </div>
          ))}

          {/* "Find More" card that links back to the deal room */}
          <Link href="/dashboard/deal-room" className="w-72 flex-shrink-0 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center p-4 hover:border-primary hover:text-primary transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <p className="font-semibold text-foreground">Find More Investors</p>
          </Link>
        </div>
      ) : (        
        <EmptyState
          icon={Heart}
          title="Your Wishlist is Empty"
          description="Add investors from the Deal Room to keep track of their profiles here."
          action={
            <Link href="/dashboard/deal-room">
              <Button>Explore Deal Room</Button>
            </Link>
          }
        />
      )}
    </div>
  );
}