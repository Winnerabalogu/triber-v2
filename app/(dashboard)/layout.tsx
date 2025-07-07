"use client";
import { Toaster } from "@/components/ui/sonner"
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleDesktopSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const sidebarVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  return (    
    <div className="flex h-dvh bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar isOpen={isSidebarOpen} />
      </div>
      
      {/* Mobile Sidebar with Framer Motion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={toggleMobileMenu}
              className="fixed inset-0 bg-background/50 z-40 lg:hidden"
            />
            <motion.div
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed top-0 left-0 h-full z-50 lg:hidden"
            >
              <Sidebar isOpen={true} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
            
      <div className="flex-1 flex flex-col overflow-hidden">        
        <Header 
          onDesktopMenuClick={toggleDesktopSidebar}
          onMobileMenuClick={toggleMobileMenu}
        />
        
        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide pb-20">
          {children}
          <Toaster richColors />
        </main>
      </div>
    </div>
  );
}