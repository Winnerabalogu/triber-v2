"use client"

import { useEffect, useRef } from "react";
import { ChatMessage } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import MessageBubble from "./MessageBubble";
import { AnimatePresence } from "framer-motion";

interface ChatMessagesProps {
  messages: ChatMessage[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const { user } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="flex-grow p-4 md:p-6 overflow-y-auto scrollbar-hide">
      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              isCurrentUser={message.senderId === user?.id}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}