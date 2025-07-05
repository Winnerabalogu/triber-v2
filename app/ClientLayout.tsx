// app/ClientLayout.tsx
"use client"; // This is our new client boundary

import type React from "react";
import { usePathname } from 'next/navigation';
import { ConfettiProvider } from "@/components/confetti-controller";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { ModalProvider } from '@/contexts/ModalContext';
import ModalManager from '@/components/modals/ModalManager';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Preloader from "@/components/ui/Preloader";
import { AnimatePresence } from "framer-motion";

 
function AppContent({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth();
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith('/dashboard');

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>      
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
        {children}
      </div>
      {!isDashboardRoute && <ThemeToggleButton variant="floating" />}
      <ModalManager /> 
      <Toaster />
      <ScrollToTopButton /> 
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ModalProvider>
        <ConfettiProvider>                                
          <AppContent>
            {children}
          </AppContent>   
        </ConfettiProvider>
      </ModalProvider>
    </AuthProvider>
  );
}