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
    <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
      <div className="flex items-center gap-4">
        <Image src={investor.avatarUrl} alt={investor.name} width={40} height={40} className="rounded-full" />
        <div>
          <h2 className="font-bold text-foreground">{investor.name}</h2>
          <p className="text-sm text-green-400 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Online
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Info className="w-5 h-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
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