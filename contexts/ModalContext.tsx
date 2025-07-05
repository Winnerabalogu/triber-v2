"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ModalType = 
  | 'job-details'
  | 'job-application'
  | 'linkedin-share'
  |  'story-details'
  | 'article-details'
  | 'confirm-quit'
  | 'confirm-delete-account'
  | 'profile-update-pending'
  | 'confirm-password-update'
  | 'valuation-history-details'
  | 'valuation-report-preview'
  | 'fundability-history-details';
interface ModalData {
  [key: string]: any;
}

interface ModalContextType {
  isOpen: boolean;
  modalType: ModalType | null;
  modalData: ModalData | null;
  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const openModal = (type: ModalType, data?: ModalData) => {
    setModalType(type);
    setModalData(data || {});
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);    
    setTimeout(() => {
        setModalType(null);
        setModalData(null);
    }, 300);
  };

  return (
    <ModalContext.Provider value={{ isOpen, modalType, modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};