"use client"

import { useState, useCallback } from "react";
import { useModal } from "@/contexts/ModalContext";
import CoreService from "@/services/core.service";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadCloud, File, Loader2, CheckCircle } from "lucide-react";
import { useDropzone } from 'react-dropzone';
import { toast } from "sonner";

export default function ChatFileUploadModal() {
  const { modalType, modalData, closeModal } = useModal();
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const isOpen = modalType === 'chat-file-upload';
  const { onUploadComplete } = modalData || {};

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    // Add file type restrictions here later if needed
  });
  
  const resetState = () => {
    setFile(null);
    setUploadProgress(0);
    setIsUploading(false);
  }

  const handleClose = () => {
    resetState();
    closeModal();
  }

  const handleUpload = async () => {
    if (!file || !onUploadComplete) return;

    setIsUploading(true);
    try {
      const result = await CoreService.uploadDocument(file, (progress) => {
        setUploadProgress(progress);
      });
      
      if (result.success) {
        onUploadComplete(result.url, 'file'); // We'll hardcode 'file' for now
      }
      handleClose();

    } catch (error) {
       toast.error("Submission Failed", {
            description: "There was a problem uploading your document. Please try again later.",
        });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a File</DialogTitle>
          <DialogDescription>Attach a document or image to your message. Max size: 5MB.</DialogDescription>
        </DialogHeader>

        <div {...getRootProps()} className={`mt-4 border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}>
          <input {...getInputProps()} />
          <UploadCloud className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
          {file ? (
            <p className="text-foreground font-semibold">{file.name}</p>
          ) : (
            <p className="text-muted-foreground">Drag & drop a file here, or click to select</p>
          )}
        </div>
        
        {isUploading && (
          <div className="mt-4 w-full">
             <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">{uploadProgress}%</p>
          </div>
        )}

        <DialogFooter className="mt-4">
           <Button onClick={handleClose} variant="outline" className="mt-2 sm:mt-0">Cancel</Button>
            <Button onClick={handleUpload} disabled={!file || isUploading}>
              {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : null}
              {uploadProgress === 100 ? 'Complete' : 'Upload & Send'}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}