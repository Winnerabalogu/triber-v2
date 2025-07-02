"use client"

import { useModal } from "@/contexts/ModalContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

export default function ValuationReportModal() {
  const { isOpen, modalType, modalData, closeModal } = useModal();

  if (modalType !== 'valuation-report-preview' || !modalData) return null;
  const { businessName, method, score, ...formData } = modalData;
  const reportName = businessName || 'Valuation_Report';

  const handleDownload = () => {
    let reportContent = `Valuation Report for: ${reportName}\n`;
    reportContent += `Method Used: ${method}\n`;
    reportContent += `Final Score: ${score}\n\n`;
    reportContent += `--- Submitted Information ---\n`;
    Object.entries(formData).forEach(([key, value]) => {
      reportContent += `${key}: ${JSON.stringify(value)}\n`;
    });

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    // --- KEY CHANGE: Use the safe `reportName` variable ---
    a.download = `${reportName.replace(/\s/g, '_')}_Valuation_Report.txt`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-lg bg-background/90 backdrop-blur-sm border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><FileText /> Report Preview</DialogTitle>
          <DialogDescription>Review a summary of your valuation report before downloading.</DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-80 overflow-y-auto space-y-2 text-sm">
          <p><span className="font-semibold text-foreground">Business:</span> {reportName}</p>
          <p><span className="font-semibold text-foreground">Method:</span> {method || 'N/A'}</p>
          <p><span className="font-semibold text-foreground">Final Score:</span> <span className="text-primary font-bold">{score}</span></p>
        </div>
        <DialogFooter>
            <Button onClick={closeModal} variant="outline">Cancel</Button>
            <Button onClick={handleDownload}><Download className="w-4 h-4 mr-2"/>Download Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};