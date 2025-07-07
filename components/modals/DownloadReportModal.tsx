"use client"

import { useModal } from "@/contexts/ModalContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

const formatLabel = (key: string): string => {
  const result = key.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export default function DownloadReportModal() {
  const { isOpen, modalType, modalData, closeModal } = useModal();
  
  const isThisModalOpen = isOpen && modalType === 'download-report-preview';

  if (!isThisModalOpen || !modalData) return null;
  
  const { score, businessName, type, method, ...formData } = modalData;  
  const isValuation = !!method; 
  
  const reportTitle = isValuation 
    ? `Valuation Report for ${businessName || 'Your Business'}`
    : `Fundability Report for ${businessName || 'Your Business'}`;

  const reportFileName = `${(businessName || 'report').replace(/\s/g, '_')}_${isValuation ? 'Valuation' : 'Fundability'}_Report.txt`;

  const handleDownload = () => {
    let reportContent = `${reportTitle}\n`;
    reportContent += "========================================\n\n";
    
    // Add specific details based on report type
    if (isValuation) {
      reportContent += `Valuation Method: ${method}\n`;
    }
    reportContent += `Business Type: ${type || 'N/A'}\n`;
    reportContent += `Final Score: ${score}\n\n`;

    reportContent += "--- Submitted Information ---\n";
        
    Object.entries(formData).forEach(([key, value]) => {      
      if (key !== 'testType' && key !== 'score') {
        const formattedValue = Array.isArray(value) ? value.join(', ') : value;
        reportContent += `${formatLabel(key)}: ${formattedValue}\n`;
      }
    });

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = reportFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    closeModal();
  };

  return (
    <Dialog open={isThisModalOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="max-w-lg bg-background/90 backdrop-blur-sm border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><FileText /> Report Preview</DialogTitle>
          <DialogDescription>Review a summary of your report before downloading.</DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-80 overflow-y-auto space-y-2 text-sm">
          <p><span className="font-semibold text-foreground">Business:</span> {businessName || 'N/A'}</p>                    
          {isValuation && (
            <p><span className="font-semibold text-foreground">Method:</span> {method}</p>
          )}

          <p><span className="font-semibold text-foreground">Type:</span> {type || 'N/A'}</p>
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