"use client"

import { useRouter } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ConfirmQuitModal() {
  const { isOpen, modalType, modalData, closeModal } = useModal();
  const router = useRouter();

  if (modalType !== 'confirm-quit' || !modalData) return null;

  const { completionPercentage } = modalData;

  const handleQuit = () => {
    closeModal();
    router.push('/'); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-md bg-background/90 backdrop-blur-sm border-border">
        <DialogHeader>
          <DialogTitle>Are you sure you want to quit?</DialogTitle>
          <DialogDescription className="pt-2">
            You are <span className="font-bold text-primary">{completionPercentage}%</span> ready to complete your profile. Quitting now will save your progress, but you'll need to return later to finish.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-4 sm:justify-start gap-2">
            <Button onClick={handleQuit} variant="destructive" className="w-full sm:w-auto">Yes, Quit for now</Button>
            <Button onClick={closeModal} variant="outline" className="w-full sm:w-auto">No, Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};