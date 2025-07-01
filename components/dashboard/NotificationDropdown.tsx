"use client"

import { useState, useEffect, useRef } from 'react';
import { Bell, FileText, MessageSquare, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import GlassCard from '../ui/GlassCard';

const mockNotifications = [
  { id: 1, icon: MessageSquare, text: "New message from Chakra Soft.", time: "5 min ago", read: false },
  { id: 2, icon: FileText, text: "Your proposal was accepted.", time: "1 hour ago", read: false },
  { id: 3, icon: UserPlus, text: "New connection request.", time: "3 hours ago", read: true },
  { id: 4, icon: MessageSquare, text: "Follow-up from Innovate Capital.", time: "1 day ago", read: false },
];

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15, ease: 'easeIn' } },
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-muted relative"
      >
        <Bell className="w-5 h-5 text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full right-0 mt-2 w-80 bg-background border border-foreground/60 rounded-lg shadow-xl z-50 origin-top-right"
          >
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <p className="text-xs text-muted-foreground">You have {unreadCount} unread messages.</p>
            </div>

            <div className="max-h-80 overflow-y-auto scrollbar-hide">
              {mockNotifications.map(notif => (
                 <GlassCard 
                          className={cn(
                            "hover:bg-primary/20 m-2", 
                            "border-primary/50 max-h-60 " 
                          )}
                        >
                <div key={notif.id} className="flex items-start gap-3 p-4 hover:bg-muted/50 border-b border-border rounded-lg last:border-b-0">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center",
                    notif.read ? "bg-muted" : "bg-primary/10"
                  )}>
                    <notif.icon className={cn("w-4 h-4", notif.read ? "text-muted-foreground" : "text-primary")} />
                  </div>
                  <div className="flex-1">
                    <p className={cn("text-sm text-foreground", !notif.read && "font-semibold")}>{notif.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                  </div>
                  {!notif.read && (
                    <div className="w-2 h-2 bg-primary rounded-full self-center flex-shrink-0"></div>
                  )}
                </div>
                  </GlassCard>

              ))}
            </div>

            <div className="p-2 border-t border-border text-center">
              <button className="text-sm font-medium text-primary hover:underline">
                View all notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}