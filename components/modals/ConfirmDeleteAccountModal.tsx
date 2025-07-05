// components/modals/ConfirmDeleteAccountModal.tsx
"use client"

import { useState } from "react";
import { useModal } from "@/contexts/ModalContext";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDeleteAccountModal() {
  const { isOpen, modalType, closeModal } = useModal();
  const { user, logout } = useAuth();
  const [step, setStep] = useState(1);
  const [inputValue, setInputValue] = useState("");

  if (modalType !== 'confirm-delete-account' || !user) return null;

  const confirmationText = `delete my account`;
  const isButtonDisabled = inputValue !== confirmationText;

  const handleConfirm = () => {    
    console.log("DELETING ACCOUNT FOR:", user.email);
    logout(); // This will clear localStorage and redirect
  };

  const handleClose = () => {
    setStep(1); // Reset step when closing
    setInputValue('');
    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg bg-background/90 backdrop-blur-sm border-border">
        {step === 1 && (
            <>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive"/> Are you absolutely sure?</DialogTitle>
                    <DialogDescription className="pt-2">
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <div className="pt-4 flex flex-col sm:flex-row gap-2">
                    <Button onClick={handleClose} variant="outline" className="w-full">Cancel</Button>
                    <Button onClick={() => setStep(2)} variant="destructive" className="w-full">Yes, delete account</Button>
                </div>
            </>
        )}
        {step === 2 && (
            <>
                 <DialogHeader>
                    <DialogTitle>Type to Confirm</DialogTitle>
                    <DialogDescription className="pt-2">
                        To confirm, please type "<span className="font-mono text-primary">{confirmationText}</span>" in the box below.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <Input 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        autoFocus
                    />
                     <Button onClick={handleConfirm} variant="destructive" disabled={isButtonDisabled} className="w-full">
                        I understand the consequences, delete my account
                    </Button>
                </div>
            </>
        )}
      </DialogContent>
    </Dialog>
  );
};