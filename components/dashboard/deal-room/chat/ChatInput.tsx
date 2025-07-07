"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, Send } from "lucide-react";
// We can implement the file upload dropdown later
// import { DropdownMenu, DropdownMenuTrigger, ... } from "@/components/ui/dropdown-menu";

interface ChatInputProps {
  onSendMessage: (content: string, type: 'text') => void;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim(), 'text');
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-border flex-shrink-0">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Paperclip className="w-5 h-5"/>
        </Button>
        <Input 
          placeholder="Type your message here..." 
          className="flex-grow"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
        />
        <Button onClick={handleSend} disabled={isLoading || !message.trim()}>
          <Send className="w-4 h-4"/>
        </Button>
      </div>
    </div>
  );
}