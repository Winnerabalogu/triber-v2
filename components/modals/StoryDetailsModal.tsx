"use client"

import React from 'react';
import { useModal } from '@/contexts/ModalContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function StoryDetailsModal() {
  const { isOpen, modalType, modalData, closeModal } = useModal();
  
  if (modalType !== 'story-details' || !modalData) return null;  
  const { image, title, author, date, authorImage, excerpt } = modalData;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background/90 backdrop-blur-sm border-border">
        {/* Header Image */}
        <div className="w-full aspect-video rounded-t-lg overflow-hidden -mt-6">
            <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        <DialogHeader className="px-6 pt-4 text-left">
          <DialogTitle className="text-2xl md:text-3xl text-foreground font-bold leading-tight">{title}</DialogTitle>
          <div className="flex items-center space-x-3 pt-4">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
              <img src={authorImage} alt={author} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm">{author}</p>
              <p className="text-muted-foreground text-xs">{date}</p>
            </div>
          </div>
        </DialogHeader>
        
        {/* Main Content */}
        <div className="px-6 pb-6 mt-4 space-y-4 text-muted-foreground leading-relaxed">
          <p>{excerpt}</p>          
          <p>
            This is where the full content of the story would go. For this demonstration, we are reusing the excerpt text. 
            A real implementation would fetch the full article body. "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
          </p>
          <p>{excerpt}</p>
        </div>

        <div className="px-6 pb-6">
            <Button onClick={closeModal} variant="outline" className="w-full sm:w-auto">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};