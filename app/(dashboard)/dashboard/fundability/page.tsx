"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoreService from '@/services/core.service';
import FundabilityLanding from '@/components/dashboard/fundability/FundabilityLanding';
import FundabilityForm from '@/components/dashboard/fundability/FundabilityForm';
import FundabilityReport from '@/components/dashboard/fundability/FundabilityReport';

export type FundabilityStep = 'landing' | 'form' | 'report';
export type TestType = 'startup' | 'sme';

export default function FundabilityPage() {
    const [step, setStep] = useState<FundabilityStep>('landing');
    const [testType, setTestType] = useState<TestType | null>(null);
    const [reportData, setReportData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

     const handleStartTest = (type: TestType) => {
        setTestType(type);
        setStep('form');
    };

    const handleFormSubmit = async (formData: any) => {
        setIsLoading(true);
        try {           
            const result = await CoreService.submitFundabilityTest({ ...formData, testType });
            setReportData(result); 
            setStep('report');
        } catch (error) {
            console.error("Fundability test submission failed", error);            
        } finally {
            setIsLoading(false);
        }
    };
    
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <div className="space-y-8">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    {step === 'landing' && <FundabilityLanding onStartTest={handleStartTest} />}
                    {step === 'form' && <FundabilityForm onFormSubmit={handleFormSubmit} onBack={() => setStep('landing')} />}
                    {step === 'report' && reportData && <FundabilityReport data={reportData} onRestart={() => setStep('landing')} />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}