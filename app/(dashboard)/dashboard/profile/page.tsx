"use client"

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import AuthService from "@/services/auth.service";
import CoreService from "@/services/core.service";
import ChatService from "@/services/chat.service";
import { User, Investor, ConversationPreview } from "@/lib/types";
import ProfileHeader from "@/components/dashboard/profile/ProfileHeader";
import SettingsCard from "@/components/dashboard/profile/SettingsCard";
import InfoCard from "@/components/dashboard/profile/InfoCard";
import ConversationsCard from "@/components/dashboard/profile/ConversationsCard";
import WishlistSection from "@/components/dashboard/profile/WishlistSection";
import DeleteAccountSection from "@/components/dashboard/profile/DeleteAccountSection";
import SecuritySettings from "@/components/dashboard/profile/SecuritySettings";

type ActiveTab = 'overview' | 'security' | 'teams';

export default function ProfilePage() {
    const { user, login } = useAuth();
    const { openModal } = useModal();
    const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
    const [isEditing, setIsEditing] = useState(false);

    const [profileData, setProfileData] = useState<Partial<User>>({});
     const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
    const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
    const [wishlistedInvestors, setWishlistedInvestors] = useState<Investor[]>([]);
    const [recentConversations, setRecentConversations] = useState<ConversationPreview[]>([]);
    const [isCardsLoading, setIsCardsLoading] = useState(true);


    useEffect(() => {
        if (user) {
            setProfileData(user);
      const fetchCardData = async () => {
                setIsCardsLoading(true);
                try {
                    const [investors, conversations] = await Promise.all([
                        CoreService.getWishlistedInvestors(),
                        ChatService.getRecentConversations()
                    ]);
                    setWishlistedInvestors(investors);
                    setRecentConversations(conversations);
                } catch (error) {
                    console.error("Failed to fetch profile card data", error);
                } finally {
                    setIsCardsLoading(false);
                }
            };
            fetchCardData();
        }
    }, [user]);

     const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setNewAvatarFile(file);            
            setAvatarPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleDataChange = (field: keyof User, value: string) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };

   const handleCancelEdit = () => {
        setIsEditing(false);
        setNewAvatarFile(null); 
        setAvatarPreviewUrl(null); 
        if (user) {
            setProfileData(user);
        }
    };
    
      const handleSaveChanges = async () => {
        if (!user) return;
        
        let finalProfileData = { ...profileData };        
        if (newAvatarFile) {
            try {
                const newAvatarUrl = await AuthService.uploadProfilePicture(user.id, newAvatarFile);
                // In a real app, the backend would return the final URL
                // We'd add this URL to the data we save.
                // For now, we'll just log it.
                console.log("New avatar would be saved with URL:", newAvatarUrl);
            } catch (error) {
                 console.error("Avatar upload failed", error);                 
                 return;
            }
        }
        
        console.log("Saving profile changes:", finalProfileData);
        try {
            const updatedUser = await AuthService.updateUserProfile(user, finalProfileData);
            login(localStorage.getItem('authToken')!, updatedUser);                    
            setIsEditing(false);
            setNewAvatarFile(null);
            setAvatarPreviewUrl(null);
            openModal('profile-update-pending');
        } catch (error) {
            console.error("Failed to save profile", error);
        }
    };

    if (!user) {
        return <div>Loading profile...</div>;
    }
     const displayAvatar = avatarPreviewUrl || "/placeholder.svg?height=128&width=128";

   const headerData = {
        name: profileData.businessName || `${profileData.firstName} ${profileData.lastName}` || 'User',
        email: profileData.email || '',
        avatar: displayAvatar,
    };

    return (
        <div className="space-y-8">
            <ProfileHeader 
                 user={headerData} 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isEditing={isEditing}
                onEditToggle={() => setIsEditing(true)}
                onSave={handleSaveChanges}
                onCancel={handleCancelEdit}
                onAvatarChange={handleAvatarChange} 
            />

            {activeTab === 'overview' && (
                <>
                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-1"><SettingsCard /></div>               
                        <div className="lg:col-span-1">
                            <InfoCard 
                                profileData={profileData} 
                                isEditing={isEditing} 
                                onDataChange={handleDataChange} 
                            />
                        </div>
                        <div className="lg:col-span-1">
                          {isCardsLoading ? <p>Loading conversations...</p> : <ConversationsCard conversations={recentConversations} />}
                        </div>
                    </div>
                    {isCardsLoading ? <p>Loading wishlist...</p> : <WishlistSection investors={wishlistedInvestors} />}
                </>
            )}
             {activeTab === 'security' && (
                <SecuritySettings />
            )}
            
            {activeTab === 'teams' && (
                 <div className="bg-background p-6 rounded-xl">Teams Management Content...</div>
            )}                       
            <DeleteAccountSection />
        </div>
    );
}