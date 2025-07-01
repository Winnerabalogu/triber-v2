"use client"

import React from 'react';
import { useModal } from '@/contexts/ModalContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function ArticleDetailsModal() {
  const { isOpen, modalType, modalData, closeModal } = useModal();

  if (modalType !== 'article-details' || !modalData) return null;

  const { image, title, categoryLabel, date, excerpt } = modalData;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background/90 backdrop-blur-sm border-border">
        <div className="w-full aspect-video rounded-t-lg overflow-hidden -mt-6">
            <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <DialogHeader className="px-6 pt-4 text-left">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-primary text-sm font-medium">📝 {categoryLabel}</span>
            <span className="text-muted-foreground text-sm">• {date}</span>
          </div>
          <DialogTitle className="text-2xl md:text-3xl text-foreground font-bold leading-tight">{title}</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 mt-4 space-y-4 text-muted-foreground leading-relaxed">
          <p>{excerpt}</p>
          <p>This is where the full, detailed content of the article would be displayed. A real implementation would likely fetch this markdown or rich text content from a CMS. For this demonstration, we are just showing the excerpt again.</p>
          <p>{excerpt}</p>
        </div>
        <div className="px-6 pb-6">
          <Button onClick={closeModal} variant="outline" className="w-full sm:w-auto">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};