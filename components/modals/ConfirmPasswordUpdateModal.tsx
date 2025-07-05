"use client"

import { useState } from "react";
import { useModal } from "@/contexts/ModalContext";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ConfirmPasswordUpdateModal() {
  const { isOpen, modalType, modalData, closeModal } = useModal();
  const { toast } = useToast();

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [triesLeft, setTriesLeft] = useState(5);
  const [isVerifying, setIsVerifying] = useState(false);

  if (modalType !== 'confirm-password-update' || !modalData) return null;

  const { correctPhoneDigits, onConfirm } = modalData;

  const handleVerify = async () => {
    if (inputValue === correctPhoneDigits) {
      setIsVerifying(true);
      try {
        await onConfirm();
        toast({
          title: "Success!",
          description: "Your password has been updated successfully.",
        });
        handleClose();
      } catch (e) {
        setError("An unexpected error occurred.");
      } finally {
        setIsVerifying(false);
      }
    } else {
      setTriesLeft(prev => prev - 1);
      setError(`Incorrect number, please try again. You have ${triesLeft - 1} tries left.`);
      if (triesLeft <= 1) {
        toast({
          title: "Too Many Attempts",
          description: "For security, this action has been locked. Please try again later.",
          variant: "destructive"
        });
        handleClose();
      }
    }
  };

  const handleClose = () => {
    setInputValue('');
    setError(null);
    setTriesLeft(5);
    closeModal();
  };
  
  const shakeVariants = {
    shake: { x: [0, -8, 8, -8, 8, 0], transition: { duration: 0.4 } },
    initial: { x: 0 },
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <motion.div        
        variants={shakeVariants}
        animate={error ? 'shake' : 'initial'}
      >
        <DialogContent className="max-w-md bg-background/90 backdrop-blur-sm border-foreground/60">
          <DialogHeader>
            <DialogTitle>Confirm Your Action</DialogTitle>
            <DialogDescription className="pt-2">
              For your security, please enter the last 5 digits of your registered phone number to confirm this change.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <Input 
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value.replace(/\D/g, '').slice(0, 5));
                setError(null);
              }}
              placeholder="Last 5 digits"
              maxLength={5}
              className={cn(error && "border-destructive focus-visible:ring-destructive")}
            />
            {error && <p className="text-xs text-destructive px-1">{error}</p>}
          </div>
          <DialogFooter>
            <Button onClick={handleVerify} disabled={isVerifying || inputValue.length < 5}>
                {isVerifying ? "Verifying..." : "Confirm & Update Password"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
};