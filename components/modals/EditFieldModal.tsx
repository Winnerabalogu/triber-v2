"use client"

import { useState, useEffect } from "react";
import { useModal } from "@/contexts/ModalContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function EditFieldModal() {
  const { modalType, modalData, closeModal } = useModal();
  const [inputValue, setInputValue] = useState("");

  const isOpen = modalType === 'edit-field';
  const { label, currentValue, onSave, fieldType } = modalData || {};
  
  useEffect(() => {
    if (isOpen && currentValue !== undefined) {
      setInputValue(currentValue);
    }
  }, [isOpen, currentValue]);

  const handleSave = () => {
    if (onSave) {
      onSave(inputValue);
    }
    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {label}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="field-value" className="text-right">
              {label}
            </Label>            
            {fieldType === 'textarea' ? (
              <Textarea
                id="field-value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="col-span-3 h-24"
                placeholder={`Enter new value for ${label}`}
              />
            ) : (
              <Input
                id="field-value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="col-span-3"
              />
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}