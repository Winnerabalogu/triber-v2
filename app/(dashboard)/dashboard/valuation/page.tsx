"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoreService from '@/services/core.service';
import ValuationLanding from '@/components/dashboard/valuation/ValuationLanding';
import MethodSelection from '@/components/dashboard/valuation/MethodSelection';
import ValuationForm from '@/components/dashboard/valuation/ValuationForm';
import ValuationReport from '@/components/dashboard//valuation/ValuationReport';

export type ValuationStep = 'landing' | 'methods' | 'form' | 'report';
export type TestType = 'startup' | 'sme';

export default function ValuationPage() {
    const [step, setStep] = useState<ValuationStep>('landing');
    const [testType, setTestType] = useState<TestType | null>(null);
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [reportData, setReportData] = useState<any>(null);

    const handleStartTest = (type: TestType) => {
        setTestType(type);
        setStep('methods');
    };

    const handleMethodSelect = (method: string) => {
        setSelectedMethod(method);
        setStep('form');
    };

    const handleFormSubmit = async (formData: any, calculatedValuation: number) => {        
        console.log("Form submitted to page. Calculated valuation:", calculatedValuation);
        setReportData({ score: calculatedValuation, ...formData });
        setStep('report');
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
                    {step === 'landing' && <ValuationLanding onStartTest={handleStartTest} />}
                    {step === 'methods' && testType && <MethodSelection testType={testType} onMethodSelect={handleMethodSelect} onBack={() => setStep('landing')} />}
                    {step === 'form' && selectedMethod && <ValuationForm method={selectedMethod} onFormSubmit={handleFormSubmit} onBack={() => setStep('methods')} />}
                    {step === 'report' && reportData && <ValuationReport data={reportData} onRestart={() => setStep('landing')} />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}