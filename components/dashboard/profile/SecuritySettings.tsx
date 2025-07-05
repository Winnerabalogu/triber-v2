// components/dashboard/profile/SecuritySettings.tsx
"use client"

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import AuthService from "@/services/auth.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SecuritySettings() {
    const { user } = useAuth();
    const { openModal } = useModal();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }
        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters long.");
            return;
        }
        
        setIsLoading(true);
        try {
            await AuthService.verifyCurrentPassword(currentPassword);                
            const last5Digits = user?.phoneNumber?.slice(-5) || '';
            openModal('confirm-password-update', { 
                correctPhoneDigits: last5Digits,
                onConfirm: () => AuthService.updatePassword(newPassword)
            });

        } catch (err: any) {
            setError(err.message || "An error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background border border-foreground/60 rounded-xl shadow-md shadow-foreground/20 p-6 md:p-8">
            <div className="max-w-full">
                <h2 className="text-lg font-bold text-foreground">Security</h2>
                <p className="text-sm text-muted-foreground mt-1 mb-6">Update Security Details Here</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-1.5" htmlFor="current-password">Current Password</label>
                        <Input id="current-password" type="password" className="border border-foreground/60 w-full" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1.5" htmlFor="new-password">New Password</label>
                            <Input id="new-password" type="password" className="border border-foreground/60" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1.5" htmlFor="confirm-password">Confirm New Password</label>
                            <Input id="confirm-password" type="password" className="border border-foreground/60" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                        </div>
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <div className="flex justify-start pt-2">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Verifying..." : "Update Password"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}