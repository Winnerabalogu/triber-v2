"use client"

import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext"; 
import AuthService from "@/services/auth.service"; 
import { toast } from "sonner";
import { NotificationSettings } from "@/lib/types";


const accountSettings = [
    { id: 'proposal-received', label: "Notify me when I receive a proposal" },
    { id: 'proposal-reviewed', label: "Notify me when my proposal has been reviewed" },
    { id: 'message-received', label: "Notify me when I receive a message" },
];

const appSettings = [
    { id: 'launches', label: "New launches and features" },
    { id: 'updates', label: "Monthly product updates" },
    { id: 'newsletter', label: "Subscribe to newsletter" },
];

export default function SettingsCard() {    
     const { user, login } = useAuth();
    const settings = user?.notificationSettings;

    const handleToggle = async (id: keyof NotificationSettings) => {
        if (!settings || !user) return;

        const newSettings = { ...settings, [id]: !settings[id] };
                
        const updatedUser = { ...user, notificationSettings: newSettings };
        login(localStorage.getItem('authToken')!, updatedUser); 
        
        try {
            // this would be a single API call to update settings.
            // Here, we simulate it by updating the full user profile.
            await AuthService.updateUserProfile(user, { notificationSettings: newSettings });
            toast.success("Settings updated!");
        } catch(error) {
            // Revert on failure
            login(localStorage.getItem('authToken')!, user);
            toast.error("Failed to update settings.");
        }
    };

    if (!settings) return <div>Loading settings...</div>;


    return (
        <div className="bg-background border border-foreground/60 rounded-xl p-6 h-full shadow-md shadow-foreground/20">
            <h3 className="text-lg font-bold text-foreground mb-6">Platform Settings</h3>
            <div className="space-y-6">
                <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Account</h4>
                    <div className="space-y-3">
                        {accountSettings.map(setting => (
                             <div key={setting.id} className="flex items-center justify-between">
                                <label htmlFor={setting.id} className="text-xs text-foreground pr-4 cursor-pointer">{setting.label}</label>
                               <Switch 
                                    id={setting.id}
                                    checked={settings[setting.id as keyof typeof settings]}
                                    onCheckedChange={() => handleToggle(setting.id as keyof NotificationSettings)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                 <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Application</h4>
                    <div className="space-y-3">
                         {appSettings.map(setting => (
                             <div key={setting.id} className="flex items-center justify-between">
                                <label htmlFor={setting.id} className="text-xs text-foreground pr-4 cursor-pointer">{setting.label}</label>
                                <Switch 
                                    id={setting.id}
                                    checked={settings[setting.id as keyof typeof settings]}
                                    onCheckedChange={() => handleToggle(setting.id as keyof NotificationSettings)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}