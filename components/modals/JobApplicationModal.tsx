"use client"

import React, { useState } from 'react';
import { useModal } from '@/contexts/ModalContext';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText } from 'lucide-react';

export default function JobApplicationModal() {
  const { isOpen, modalType, modalData, closeModal } = useModal();
  const { toast } = useToast();    
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    motivation: '',
    resume: null as File | null,
    coverLetter: null as File | null
  });

  if (modalType !== 'job-application' || !modalData) return null;

  const { title } = modalData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'coverLetter') => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [type]: file
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();    
    toast({
      title: "Application Submitted!",
      description: `Your application for '${title}' has been received successfully.`,
    });
    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background/90 backdrop-blur-sm border-border">
        <DialogHeader>
          <DialogTitle className="text-xl text-foreground">Apply for {title}</DialogTitle>
          <DialogDescription>
            Fill out the form below. Required fields are marked with *.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Full Name *</label>
              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Email *</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Phone Number</label>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Years of Experience</label>
              <Input
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="e.g., 3 years"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Why do you want to join us? *</label>
            <Textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Tell us about your motivation and what you can bring to the team..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Resume *</label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload(e, 'resume')}
                  className="hidden"
                  id="resume-upload"
                  required
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {formData.resume ? formData.resume.name : 'Click to upload your resume'}
                  </p>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-muted-foreground">Cover Letter (Optional)</label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload(e, 'coverLetter')}
                  className="hidden"
                  id="cover-letter-upload"
                />
                <label htmlFor="cover-letter-upload" className="cursor-pointer">
                  <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {formData.coverLetter ? formData.coverLetter.name : 'Click to upload cover letter'}
                  </p>
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              Submit Application
            </Button>
            <Button type="button" onClick={closeModal} variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};