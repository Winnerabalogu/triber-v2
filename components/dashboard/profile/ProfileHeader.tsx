"use client"
import Image from "next/image";
import { cn } from "@/lib/utils";
import { User, Shield, Users, Edit, X, Check, Camera  } from "lucide-react";
import { Button } from "@/components/ui/button";

type ActiveTab = 'overview' | 'security' | 'teams';

interface ProfileHeaderProps {
  user: { name: string, email: string, avatar: string };
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isEditing: boolean;
  onEditToggle: () => void;
  onSave: () => void;
  onCancel: () => void;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'teams', label: 'Teams', icon: Users },
];

export default function ProfileHeader({ user, activeTab, setActiveTab, isEditing, onEditToggle, onSave, onCancel, onAvatarChange }: ProfileHeaderProps) {
    return (
        <div className="bg-background border border-foreground/60 rounded-xl overflow-hidden shadow-md shadow-foreground/20">            
            <div className="h-32 md:h-48 bg-background relative">
                <Image src="/dashboard/profile/background.png" alt="Profile banner" layout="fill" objectFit="cover" className="opacity-40" />
            </div>
            {/* Main Content */}
            <div className="p-6 relative">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end -mt-20 sm:-mt-16">                    
                    <div className="flex items-end gap-4">
                        <div className="relative group">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-background bg-muted overflow-hidden flex-shrink-0">
                                 <Image src={user.avatar} alt={user.name} width={128} height={128} className="w-full h-full object-cover" />
                            </div>                            
                            <input 
                                type="file" 
                                id="avatar-upload"
                                className="hidden"
                                accept="image/png, image/jpeg"
                                onChange={onAvatarChange}
                                disabled={!isEditing}
                            />                            
                            {isEditing && (
                                <label 
                                    htmlFor="avatar-upload"
                                    className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-background/50 flex items-center justify-center cursor-pointer"
                                >
                                    <Camera className="w-8 h-8 text-foreground" />
                                </label>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-2 mt-4 sm:mt-0">
                        {isEditing ? (
                            <>
                                <Button variant="outline" size="sm" onClick={onCancel}><X className="w-4 h-4 mr-2" />Cancel</Button>
                                <Button size="sm" onClick={onSave}><Check className="w-4 h-4 mr-2" />Save Changes</Button>
                            </>
                        ) : (
                             <Button variant="outline" size="sm" onClick={onEditToggle}>
                                <Edit className="w-4 h-4 mr-2" /> Edit Profile
                            </Button>
                        )}
                    </div>
                    {/* Tabs */}
                    <div className="flex items-center justify-between gap-2 mt-4 sm:mt-0 border border-foreground/60 bg-background p-1 rounded-lg w-auto">
                        {tabs.map(tab => (
                            <button 
                                key={tab.id} 
                                onClick={() => setActiveTab(tab.id as ActiveTab)}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                                    activeTab === tab.id 
                                        ? "bg-primary text-primary-foreground" 
                                        : "text-muted-foreground hover:bg-muted"
                                )}
                            >
                                <tab.icon className="w-4 h-4" />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}