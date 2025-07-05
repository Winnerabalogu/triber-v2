"use client"

import { motion } from "framer-motion";

interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps: number;
  onCancel: () => void;
  children: React.ReactNode;
}

export default function OnboardingLayout({ currentStep, totalSteps, onCancel, children }: OnboardingLayoutProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (    
    <div className="flex flex-col min-h-screen bg-background">
            
     <header className="w-full px-4 sm:px-6 lg:px-8 py-4">    
        <div className="flex justify-between items-center w-full">
          <span className="text-sm font-medium text-muted-foreground">Step {currentStep}/{totalSteps}</span>            
          <button onClick={onCancel} className="hover:text-primary transition-colors">
            Cancel
          </button>
        </div>

          <div className="w-full bg-border h-px mt-4">
            <motion.div 
              className="bg-foreground h-px" 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </header>

      
      {/* --- STEP CONTENT --- */}      
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {children}                    
          <div className="text-center mt-12 text-sm text-muted-foreground">
            Step {currentStep}/{totalSteps}
          </div>
        </div>
      </main>

    </div>
  );
}