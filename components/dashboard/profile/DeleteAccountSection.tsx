// components/dashboard/profile/DeleteAccountSection.tsx
"use client"
import { useModal } from "@/contexts/ModalContext";
import { Button } from "@/components/ui/button";

export default function DeleteAccountSection() {
    const { openModal } = useModal();

    return (
        <div className="bg-background border border-destructive/50 rounded-xl p-6 shadow-md shadow-foreground/20">
            <h3 className="text-lg font-semibold text-foreground">Delete Account</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <Button variant="destructive" onClick={() => openModal('confirm-delete-account')}>
                Delete Account
            </Button>
        </div>
    );
}