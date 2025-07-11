"use client"

import { Investor } from "@/lib/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Info, MessageSquareX, MoreVertical, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChatHeaderProps {
  investor: Investor;
}

export default function ChatHeader({ investor }: ChatHeaderProps) {
  const router = useRouter();

  const handleCloseProposal = () => {    
    console.log("Closing proposal...");    
    router.back()
  };

  return (
    <div className="h-12 bg-primary flex items-center justify-between p-4 border-b border-foreground/60 flex-shrink-0 rounded-t-xl">
      <div className="flex items-center gap-4">
        <Image src={investor.avatarUrl} alt='' width={20} height={20} className="rounded-full" />
        <div>
          <h2 className="text-xs font-bold text-white">{investor.name}</h2>
          <p className="text-xs text-green-400 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Online
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-white">
          <Info className="w-5 h-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => router.back()}>
              <MessageSquareX className="w-4 h-4 mr-2" />
              Close Chat
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleCloseProposal} className="text-destructive focus:text-destructive focus:bg-destructive/10">
              <XCircle className="w-4 h-4 mr-2" />
              Close Proposal
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}