import { NotificationSettings } from "@/lib/types";
import { FileText, MessageSquare, UserPlus, Zap, Rocket } from "lucide-react";

const allMockNotifications = [
  { id: 1, type: 'message', icon: MessageSquare, text: "New message from Chakra Soft.", time: "5 min ago", read: false },
  { id: 2, type: 'proposal', icon: FileText, text: "Your proposal was accepted.", time: "1 hour ago", read: false },
  { id: 3, type: 'system', icon: UserPlus, text: "New connection request.", time: "3 hours ago", read: true },
  { id: 4, type: 'message', icon: MessageSquare, text: "Follow-up from Innovate Capital.", time: "1 day ago", read: false },
  { id: 5, type: 'system', icon: Rocket, text: "New Feature: AI-powered report summaries!", time: "2 days ago", read: true },
  { id: 6, type: 'system', icon: Zap, text: "Your monthly product update is here.", time: "3 days ago", read: true },
   { id: 100, type: 'system', text: "Welcome to Triber! Complete your profile to get started.", time: "Just now", read: true },
];

class NotificationService {
    addSystemNotification(details: { type: string; text: string }) {
        const newNotification = {
            id: Date.now(),
            type: details.type,
            text: details.text,
            time: "Just now",
            read: false,
        };        
        allMockNotifications.unshift(newNotification);
        console.log("[NotificationService] New system notification added:", newNotification);
    }

    async getNotifications(settings: NotificationSettings): Promise<any[]> {
        console.log("[NotificationService] Fetching notifications with settings:", settings);

        const filtered = allMockNotifications.filter(notif => {            
            if (notif.type === 'fundability_report' || notif.type === 'valuation_report') {
                return true;
            }
                        
            if (notif.type === 'message' && !settings['message-received']) return false;
            if (notif.type === 'proposal' && !settings['proposal-reviewed']) return false;
            
            return true;
        });
        
        return new Promise(resolve => setTimeout(() => resolve(filtered), 300));
    }
}

export default new NotificationService();