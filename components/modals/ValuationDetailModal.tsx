// components/modals/ValuationDetailModal.tsx
"use client"

import { useModal } from "@/contexts/ModalContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Mock data for detailed breakdown, similar to report page
const scoreDetails = [
    { label: "Supply Chain Management", status: "Optimized", value: 78 },
    { label: "The Environmental Sustainability", status: "Optimized", value: 75 },
    { label: "Social Sustainability", status: "Emergent", value: 18 },
    { label: "Economic Sustainability", status: "Managed", value: 34 },
    { label: "Partnerships and Collaboration", status: "Optimized", value: 56 },
];

export default function ValuationDetailModal() {
  const { isOpen, modalType, modalData, closeModal } = useModal();

  if (modalType !== 'valuation-history-details' || !modalData) return null;

  // Destructure the data passed when the modal was opened
  const { name, method, date, score } = modalData;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-2xl bg-background/90 backdrop-blur-sm border-border">
        <DialogHeader>
          <DialogTitle className="text-xl text-foreground">{name}</DialogTitle>
          <DialogDescription>
            Valuation Report for {method} - Completed on {date}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Left Side: Score Breakdown */}
            <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-semibold mb-3 text-foreground">Score by Information</h3>
                <div className="space-y-3">
                    {scoreDetails.map(item => (
                        <div key={item.label} className="flex justify-between items-center text-sm border-b border-border/50 pb-2 last:border-b-0 last:pb-0">
                            <span className="text-muted-foreground">{item.label}</span>
                            <span className="font-bold text-foreground text-right">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side: Overall Score */}
            <div className="bg-card p-4 rounded-lg border border-border flex flex-col items-center justify-center text-center">
                 <h3 className="font-semibold mb-3 text-foreground">Final Valuation Score</h3>
                 <div className="w-32 h-32 border-8 border-primary rounded-full flex items-center justify-center">
                     <span className="text-4xl font-bold text-primary">{score}</span>
                 </div>
                 <p className="text-xs text-muted-foreground mt-3">This score reflects the company's sustainability maturity at the time of assessment.</p>
            </div>
        </div>
        
        <div className="pt-6 flex justify-end">
            <Button onClick={closeModal} variant="outline">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};