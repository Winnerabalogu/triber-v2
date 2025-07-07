"use client"

import { useState } from 'react';
import { Investor, ChatConversation, ChatMessage } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import ChatService from '@/services/chat.service';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

interface ChatInterfaceProps {
  initialInvestor: Investor;
  initialConversation: ChatConversation;
}

export default function ChatInterface({ initialInvestor, initialConversation }: ChatInterfaceProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(initialConversation.messages);
  const [isSending, setIsSending] = useState(false);
  const handleSendMessage = async (content: string, type: 'text' | 'image' | 'file') => {
    if (!user) return;
   
    if (type === 'text') {
        setIsSending(true);
    }

    const tempMessage: ChatMessage = {
        id: `temp_${Date.now()}`,
        senderId: user.id,
        content, 
        type,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    };
    
    setMessages(prev => [...prev, tempMessage]);

    try {
        const sentMessage = await ChatService.sendMessage(initialConversation.id, {
            senderId: user.id,
            content, 
            type, 
            timestamp: tempMessage.timestamp,
        });
                        
        setMessages(prev => prev.map(msg => msg.id === tempMessage.id ? sentMessage : msg));
    } catch (error) {
        console.error("Failed to send message", error);        
        setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id)); 
    } finally {
        if (type === 'text') {
            setIsSending(false);
        }
    }
  };
    
  return (
  <div className="h-full flex flex-col bg-background border border-foreground/60 rounded-xl shadow-lg overflow-hidden">
    <ChatHeader investor={initialInvestor} />        
    <div className="flex-1 overflow-y-auto scrollbar-hide">
      <ChatMessages messages={messages} />
    </div>    
    <ChatInput onSendMessage={handleSendMessage} isLoading={isSending} />
  </div>
);

}