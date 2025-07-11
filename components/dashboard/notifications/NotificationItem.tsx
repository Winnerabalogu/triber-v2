"use client"

import { useState } from "react";
import { UINotification, useNotifications } from "@/contexts/NotificationContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Trash2, ChevronDown, MessageSquare, FileText, Target, Bell as BellIcon, UserPlus, Rocket, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function NotificationItem({ notification }: { notification: UINotification }) {
    const { markAsRead, deleteNotification } = useNotifications();
    const [isExpanded, setIsExpanded] = useState(false);
    const IconComponent = getIconForType(notification.type);

    return (
        <div className={cn("p-4", !notification.read && "bg-primary/10")}>
            <div className="flex items-center gap-4">
                {!notification.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 self-center"></div>}
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted flex-shrink-0">
                    <IconComponent className="w-4 h-4 text-muted-foreground"/>
                </div>
                <div className="flex-grow cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                    <p className="text-sm font-medium text-foreground">{notification.text}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
                <div className="flex items-center gap-1">
                    {!notification.read && (
                        <Button variant="ghost" size="icon" title="Mark as read" onClick={() => markAsRead(notification.id)}>
                            <Check className="w-4 h-4"/>
                        </Button>
                    )}
                    <Button variant="ghost" size="icon" title="Expand" onClick={() => setIsExpanded(!isExpanded)}>
                        <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")}/>
                    </Button>
                </div>
            </div>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden pl-[56px] mt-2"
                    >
                        <div className="border-l-2 border-border pl-4 py-2 space-y-3">
                           <p className="text-sm text-muted-foreground">More details about this notification would appear here, potentially with links to the relevant page.</p>
                           <Button variant="destructive" size="sm" onClick={() => deleteNotification(notification.id)}>
                               <Trash2 className="w-4 h-4 mr-2"/> Delete Notification
                           </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}