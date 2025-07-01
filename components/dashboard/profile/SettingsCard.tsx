// components/dashboard/profile/SettingsCard.tsx
"use client"

import { useState } from "react";
import { Switch } from "@/components/ui/switch"; // Assuming shadcn/ui Switch

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
    // In a real app, this state would come from props/context
    const [settings, setSettings] = useState({
        'proposal-received': true,
        'proposal-reviewed': true,
        'message-received': false,
        'launches': true,
        'updates': false,
        'newsletter': true,
    });

    const handleToggle = (id: string) => {
        setSettings(prev => ({ ...prev, [id]: !prev[id as keyof typeof prev] }));
    };

    return (
        <div className="bg-background border border-foreground/60 rounded-xl p-6 h-full shadow-md shadow-foreground/20">
            <h3 className="text-lg font-bold text-foreground mb-6">Platform Settings</h3>
            <div className="space-y-6">
                <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Account</h4>
                    <div className="space-y-3">
                        {accountSettings.map(setting => (
                             <div key={setting.id} className="flex items-center justify-between">
                                <label htmlFor={setting.id} className="text-sm text-foreground pr-4 cursor-pointer">{setting.label}</label>
                                <Switch 
                                    id={setting.id}
                                    checked={settings[setting.id as keyof typeof settings]}
                                    onCheckedChange={() => handleToggle(setting.id)}
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
                                <label htmlFor={setting.id} className="text-sm text-foreground pr-4 cursor-pointer">{setting.label}</label>
                                <Switch 
                                    id={setting.id}
                                    checked={settings[setting.id as keyof typeof settings]}
                                    onCheckedChange={() => handleToggle(setting.id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}