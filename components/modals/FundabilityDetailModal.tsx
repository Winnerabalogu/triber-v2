"use client"

import { useModal } from "@/contexts/ModalContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileCheck, Zap, Handshake, Users } from "lucide-react";
import StatusPill from "../ui/status-pill";

const fundabilityScoreDetails = [
  { label: "Business Clarity", value: 92 },
  { label: "Financial Health", value: 65 },
  { label: "Market Position", value: 88 },
  { label: "Documentation", value: 30 },
];

export default function FundabilityDetailModal() {
  const { isOpen, modalType, modalData, closeModal } = useModal();

  if (modalType !== 'fundability-history-details' || !modalData) return null;

  const { name, type, date, score } = modalData;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-lg bg-background/90 backdrop-blur-sm border-border">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-primary"/>
            </div>
            <div>
                <DialogTitle className="text-xl text-foreground">{name}</DialogTitle>
                <DialogDescription>
                    Fundability Report ({type}) - Completed on {date}
                </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
            <div className="bg-card border border-border p-4 rounded-lg">
                 <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Final Fundability Score</p>
                    <StatusPill score={score} />
                 </div>
                 <p className="text-4xl font-bold text-primary mt-1">{score}</p>
            </div>
             <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Score Breakdown</h4>
                <div className="space-y-2">
                    {fundabilityScoreDetails.map(item => (
                        <div key={item.label} className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">{item.label}</span>
                            <span className="font-semibold text-foreground">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
        <div className="pt-4 flex justify-end">
            <Button onClick={closeModal} variant="outline">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};