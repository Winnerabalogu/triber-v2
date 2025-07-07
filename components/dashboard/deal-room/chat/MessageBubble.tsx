"use client"

import { ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

interface MessageBubbleProps {
  message: ChatMessage;
  isCurrentUser: boolean;
}

export default function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
  const bubbleClasses = cn(
    "p-3 rounded-xl max-w-sm md:max-w-md",
    {
      "bg-primary text-primary-foreground": isCurrentUser,
      "bg-muted": !isCurrentUser,
    }
  );

  const containerClasses = cn(
    "flex items-end gap-2",
    { "justify-end": isCurrentUser }
  );

  const renderContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <Image 
            src={message.content} 
            alt="Uploaded image" 
            width={300} 
            height={200} 
            className="rounded-lg object-cover cursor-pointer"
          />
        );
      case 'file':
        return <p>File: {message.content}</p>; 
      default: 
        return <p className="text-sm break-words">{message.content}</p>;
    }
  }

  return (
    <motion.div
      className={containerClasses}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      layout
    >
      <div className={bubbleClasses}>
        {renderContent()}
      </div>
      <p className="text-xs text-muted-foreground">{message.timestamp}</p>
    </motion.div>
  );
}