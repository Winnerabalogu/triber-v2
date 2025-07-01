// components/modals/LinkedInShareModal.tsx
"use client"

import React, { useState } from 'react';
import { useModal } from '@/contexts/ModalContext';
import { useToast } from "@/components/ui/use-toast"; // Assuming shadcn/ui toast
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Assuming shadcn/ui textarea
import { Share2, Copy, ExternalLink } from 'lucide-react';

export default function LinkedInShareModal() {
  const { isOpen, modalType, closeModal } = useModal();
  const { toast } = useToast();
  const [customMessage, setCustomMessage] = useState('');

  // This modal doesn't need specific modalData, so we just check the type.
  if (modalType !== 'linkedin-share') return null;

  // A new default message relevant to job seeking at Triber.
  const defaultMessage = `I'm exploring career opportunities at Triber, a company with an amazing employee-centred culture. If you're looking for a great team, check out their open positions! #Triber #Careers #Hiring`;

  const finalMessage = customMessage || defaultMessage;

  const handleShare = () => {
    // We construct the URL with the final message. The URL can point to your careers page.
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://your-website.com/careers')}&summary=${encodeURIComponent(finalMessage)}`;
    window.open(linkedInUrl, '_blank');
    toast({
      title: "Opened LinkedIn",
      description: "A new tab has been opened for sharing.",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(finalMessage);
    toast({
      title: "Copied to clipboard!",
      description: "The share message has been copied.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-2xl bg-background/90 backdrop-blur-sm border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Share2 className="w-5 h-5 text-primary" />
            Share Your Interest on LinkedIn
          </DialogTitle>
          <DialogDescription>
            Let your network know you're interested in opportunities at Triber.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">Customize your message (optional):</label>
            <Textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder={defaultMessage}
              rows={5}
              className="w-full text-sm resize-none bg-muted border-border"
            />
          </div>

          <div className="bg-muted border border-border rounded-lg p-4">
            <h4 className="font-medium mb-2 text-foreground text-sm">Preview:</h4>
            <p className="text-xs text-muted-foreground whitespace-pre-wrap break-words">{finalMessage}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={handleShare} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              <ExternalLink className="w-4 h-4 mr-2" />
              Share on LinkedIn
            </Button>
            <Button onClick={handleCopy} variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy Text
            </Button>
            <Button onClick={closeModal} variant="ghost">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};