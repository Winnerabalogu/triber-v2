"use client";

import { useState, useRef, useEffect } from "react";
import { useNotifications } from "@/contexts/NotificationContext";
import { Bell, MessageSquare, FileText, Target, UserPlus, Rocket, Zap, Bell as BellIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import GlassCard from "../ui/GlassCard";
import EmptyState from '../ui/EmptyState';
import { Inbox } from "lucide-react";

const getIconForType = (type: string) => {
    const icons = {
        message: MessageSquare,
        proposal: UserPlus,
        fundability_report: FileText,
        valuation_report: Target,
        launches: Rocket,
        updates: Zap,
        system: BellIcon,
    };
    return icons[type as keyof typeof icons] || BellIcon;
};

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount } = useNotifications();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15, ease: "easeIn" } },
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-muted relative">
        <Bell className="w-5 h-5 text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" className="absolute top-full right-0 mt-2 w-80 bg-background border border-foreground/60 rounded-lg shadow-xl z-50 origin-top-right">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <p className="text-xs text-muted-foreground">You have {unreadCount} unread messages.</p>
            </div>
            <div className="max-h-80 overflow-y-auto scrollbar-hide p-2">
              {notifications.length > 0 ? (
                notifications.slice(0, 5).map((notif) => {
                    const IconComponent = getIconForType(notif.type);
                    return (
                    <GlassCard key={notif.id} className="mb-2 border-primary/50">
                        <div className="flex items-start gap-3 p-3 hover:bg-muted/50 rounded-lg">
                            <div className={cn("w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center", !notif.read && "bg-primary/10")}>
                                <IconComponent className={cn("w-4 h-4", !notif.read ? "text-primary" : "text-muted-foreground")} />
                            </div>
                            <div className="flex-1">
                                <p className={cn("text-sm text-foreground", !notif.read && "font-semibold")}>{notif.text}</p>
                                <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                            </div>
                        </div>
                    </GlassCard>
                )})
              ) : (
                <EmptyState icon={Inbox} title="All Caught Up!" description="No new notifications right now." className="py-8 border-none shadow-none bg-transparent"/>
              )}
            </div>
            <div className="p-2 border-t border-border text-center">
              <a href="/dashboard/notifications" className="text-sm font-medium text-primary hover:underline">View all notifications</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}