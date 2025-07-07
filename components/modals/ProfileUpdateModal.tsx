"use client"

import { useModal } from "@/contexts/ModalContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Hourglass } from "lucide-react";

export default function ProfileUpdateModal() {
  const { isOpen, modalType, closeModal } = useModal();

  if (modalType !== 'profile-update-pending') return null;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-md bg-background/90 backdrop-blur-sm border-border">
        <DialogHeader className="text-center items-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
            <Hourglass className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle>Update Submitted for Review</DialogTitle>
          <DialogDescription className="pt-2">
            Your profile changes have been saved and sent for verification. This process helps ensure the quality and safety of our platform.
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4">
            <Button onClick={closeModal} className="w-full">Okay, Got it</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};