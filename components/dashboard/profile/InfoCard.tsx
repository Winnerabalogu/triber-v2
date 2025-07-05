"use client"

import { User } from "@/lib/types"; 
import { Input } from "@/components/ui/input";
import { Twitter, Instagram, Linkedin } from "lucide-react";

interface InfoCardProps {
profileData: Partial<User>; 
  isEditing: boolean;
  onDataChange: (field: keyof User, value: string) => void;
}

const socialLinks = [
    { name: "Twitter", icon: Twitter, url: "#" },
    { name: "Instagram", icon: Instagram, url: "#" },
    { name: "LinkedIn", icon: Linkedin, url: "#" },
];

export default function InfoCard({ profileData, isEditing, onDataChange }: InfoCardProps) {
    if (!profileData) return null;
   const renderRow = (label: string, content: React.ReactNode) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-2 border-b border-foreground/50">
        <span className="text-muted-foreground text-sm flex-shrink-0">{label}:</span>
        {content}
    </div>
  );

    return (
      <div className="bg-background border border-foreground/60 rounded-xl p-6 h-full shadow-md shadow-foreground/20">
      <h3 className="text-lg font-bold text-foreground mb-4">Profile Information</h3>
      <div className="space-y-4 text-sm">                    
        {renderRow("Business Name", isEditing ? (
            <Input 
              value={String(profileData.businessName || '')} 
              onChange={(e) => onDataChange('businessName', e.target.value)}
              placeholder="Your Company LLC"
              className="bg-background border-foreground/50 text-right h-8"
            />
        ) : (
            <span className="font-semibold text-foreground text-right">{profileData.businessName || 'Not Set'}</span>
        ))}

        {renderRow("Mobile", isEditing ? (
             <Input 
              value={String(profileData.phoneNumber || '')} 
              onChange={(e) => onDataChange('phoneNumber', e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="bg-background border-foreground/50 text-right h-8"
            />
        ) : (
            <span className="font-semibold text-foreground text-right">{profileData.phoneNumber || 'Not Set'}</span>
        ))}
        
        {/* Email is not editable */}
        {renderRow("Email", <span className="font-semibold text-foreground text-right">{profileData.email}</span>)}

        {renderRow("Location", isEditing ? (
             <Input 
              value={String(profileData.businessAddress || '')} 
              onChange={(e) => onDataChange('businessAddress', e.target.value)}
              placeholder="City, Country"
              className="bg-background border-foreground/50 text-right h-8"
            />
        ) : (
            <span className="font-semibold text-foreground text-right">{profileData.businessAddress || 'Not Set'}</span>
        ))}
        
        <div className="flex items-center justify-between pt-2">
            <span className="text-muted-foreground">Social Media:</span>
            <div className="flex items-center gap-3">
              {socialLinks.map(link => (
                <a key={link.name} href={link.url} className="text-muted-foreground hover:text-primary transition-colors">
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}
