    // components/modals/JobDetailsModal.tsx
"use client"

import React from 'react';
import { useModal } from '@/contexts/ModalContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, Users, ArrowRight } from 'lucide-react';

export default function JobDetailsModal() {
  const { isOpen, modalType, modalData, closeModal, openModal } = useModal();

  if (modalType !== 'job-details' || !modalData) return null;

  const { title, tags, description, requirements, benefits, salary } = modalData;

  const handleApply = () => {
    openModal('job-application', modalData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background/90 backdrop-blur-sm border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">{title}</DialogTitle>
          <DialogDescription className="text-muted-foreground pt-2">
            Join our team and help us build the future.
          </DialogDescription>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground pt-2">
            {tags.map((tag: string, index: number) => (
              <div key={index} className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> {tag}
              </div>
            ))}
          </div>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Job Description</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
          </div>

          {requirements && (
            <div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">Requirements</h3>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground text-sm">
                {requirements.map((req: string, index: number) => <li key={index}>{req}</li>)}
              </ul>
            </div>
          )}

          {benefits && (
             <div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">Benefits</h3>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground text-sm">
                {benefits.map((benefit: string, index: number) => <li key={index}>{benefit}</li>)}
              </ul>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={handleApply} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              Apply for this Position <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button onClick={closeModal} variant="outline">Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};