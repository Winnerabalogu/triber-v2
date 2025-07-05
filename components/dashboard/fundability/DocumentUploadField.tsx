// components/dashboard/fundability/DocumentUploadField.tsx
"use client"

import { useState, useRef } from "react";
import { UploadCloud, File, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoreService from "@/services/core.service";
import { cn } from "@/lib/utils";

interface DocumentUploadFieldProps {
  label: string;
  onUploadComplete: (fileName: string) => void;
}

type UploadState = 'idle' | 'uploading' | 'complete';

export default function DocumentUploadField({ label, onUploadComplete }: DocumentUploadFieldProps) {
    const [uploadState, setUploadState] = useState<UploadState>('idle');
    const [progress, setProgress] = useState(0);
    const [fileName, setFileName] = useState("");
    const [fileSize, setFileSize] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadState('uploading');
        setFileName(file.name);
        setFileSize((file.size / (1024 * 1024)).toFixed(2) + " MB");
        
        await CoreService.uploadDocument(file, (p) => {
            setProgress(p);
        });

        setUploadState('complete');
        onUploadComplete(file.name);
    };

    return (
        <div>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{label}</label>
            <div className={cn(
                "bg-background border-2 border-dashed border-border rounded-lg p-4 transition-colors duration-300",
                uploadState === 'uploading' && 'border-primary/50',
                uploadState === 'complete' && 'border-green-500/50 bg-green-500/5'
            )}>
                {uploadState === 'idle' && (
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full flex flex-col items-center justify-center text-muted-foreground hover:text-primary">
                        <UploadCloud className="w-8 h-8 mb-2" />
                        <span className="text-sm font-semibold">Click to upload</span>
                    </button>
                )}

                {uploadState === 'uploading' && (
                    <div className="flex items-center gap-4">
                        <File className="w-6 h-6 text-primary flex-shrink-0" />
                        <div className="flex-grow">
                            <p className="text-sm font-semibold text-foreground truncate">{fileName}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{progress}% uploading</span>
                                <span>•</span>
                                <span>{fileSize}</span>
                            </div>
                            <div className="w-full bg-border rounded-full h-1 mt-1">
                                <div className="bg-primary h-1 rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                        <button type="button" className="p-1 rounded-full hover:bg-destructive/10 text-destructive"><X className="w-4 h-4"/></button>
                    </div>
                )}

                {uploadState === 'complete' && (
                    <div className="flex items-center gap-4 text-green-500">
                         <CheckCircle className="w-6 h-6 flex-shrink-0" />
                         <div className="flex-grow">
                            <p className="text-sm font-semibold truncate">{fileName}</p>
                            <p className="text-xs">Upload complete</p>
                         </div>
                    </div>
                )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
        </div>
    );
}