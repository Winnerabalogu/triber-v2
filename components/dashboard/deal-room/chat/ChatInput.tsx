"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, FileText, ImageIcon } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface ChatInputProps {
  onSendMessage: (content: string, type: 'text' | 'image' | 'file') => void;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const { openModal } = useModal();

  const handleSendText = () => {
    if (message.trim()) {
      onSendMessage(message.trim(), 'text');
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendText();
    }
  };
  
  const handleOpenUploadModal = (fileType: 'image' | 'file') => {
      openModal('chat-file-upload', {
          fileType,          
          onUploadComplete: onSendMessage 
      });
  }

  return (
    <div className="p-4 border-t border-foreground/60 flex-shrink-0">
      <div className="flex items-center gap-3">        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Paperclip className="w-5 h-5"/>
                </Button>
            </DropdownMenuTrigger>            
            <DropdownMenuContent side="top" align="start">
                <DropdownMenuItem onSelect={() => handleOpenUploadModal('image')}>
                    <ImageIcon className="w-4 h-4 mr-2"/>
                    Image
                </DropdownMenuItem>
                 <DropdownMenuItem onSelect={() => handleOpenUploadModal('file')}>
                    <FileText className="w-4 h-4 mr-2"/>
                    Document
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <Input 
          placeholder="Type your message here..." 
          className="flex-grow"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
        />
        <Button onClick={handleSendText} disabled={isLoading || !message.trim()}>
          <Send className="w-4 h-4"/>
        </Button>
      </div>
    </div>
  );
}