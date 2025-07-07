"use client"

import { useState } from "react";
import { useModal } from "@/contexts/ModalContext";
import { useAuth } from "@/contexts/AuthContext";
import CoreService from "@/services/core.service";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import DocumentUploadField from "../dashboard/fundability/DocumentUploadField"; // Reusing our component!
import { Loader2 } from "lucide-react";

export default function SendProposalModal() {
  const { modalType, modalData, closeModal } = useModal();
  const { user } = useAuth(); // We need the business user's info

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [pitchDeckFile, setPitchDeckFile] = useState<string | null>(null); // To store the uploaded file name/URL
  const [isLoading, setIsLoading] = useState(false);

  const isOpen = modalType === 'send-proposal';
  const { investorName, investorId } = modalData || {};

  const resetForm = () => {
    setSubject("");
    setMessage("");
    setPitchDeckFile(null);
    setIsLoading(false);
  };
  
  const handleClose = () => {
    resetForm();
    closeModal();
  }

  const handleSubmit = async () => {
    if (!subject || !message || !pitchDeckFile || !user || !investorId) {
        toast.error("Validation Failed", {
            description: "Please fill out all fields and attach your pitch deck before submitting.",
        });
        return;
    }
    
    setIsLoading(true);
    try {
        const proposalData = {
            fromBusinessId: user.id,
            fromBusinessName: user.businessName,
            toInvestorId: investorId,
            subject,
            message,
            pitchDeckUrl: pitchDeckFile,
        };
        await CoreService.submitProposal(proposalData);
       toast.success("Proposal Sent Successfully!", {
            description: `Your proposal has been sent to ${investorName}.`,
        });
        handleClose();
    } catch (error) {        
        toast.error("Submission Failed", {
            description: "There was a problem sending your proposal. Please try again later.",
        });
        console.error("Failed to submit proposal", error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Send Proposal to {investorName}</DialogTitle>
          <DialogDescription>
            Craft a compelling proposal to capture the investor's interest. Make sure to attach your latest pitch deck.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="e.g., Investment Opportunity in [Your Company Name]" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="Briefly introduce your business and why it's a good fit for this investor." className="h-32" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <div className="space-y-2">
             <Label>Attach Pitch Deck</Label>
             <p className="text-xs text-muted-foreground">Please upload your pitch deck in PDF format, max size 5MB.</p>
             <DocumentUploadField 
                label="" // The label is handled above
                onUploadComplete={(fileName) => setPitchDeckFile(fileName)} 
              />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Proposal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}