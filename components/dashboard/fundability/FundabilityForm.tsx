"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CurrencyInput from "@/components/ui/currency-input";
import { AnyFormStep, FormField } from "@/lib/types";
import InfoCard from '../../InfoCard';
import DocumentUploadField from "./DocumentUploadField";
import { cn } from "@/lib/utils";

const businessInfoStep: AnyFormStep = {
    id: 'businessInfo', title: 'Business Information',
    fields: [
        { name: 'ownership', label: 'Ownership (who owns the business)', type: 'text', placeholder: 'e.g., John Doe, Jane Smith' },
        { name: 'management', label: 'Executive Management', type: 'text', placeholder: 'e.g., CEO, CTO' },
        { name: 'advisers', label: 'Legal Advisers', type: 'text', placeholder: 'e.g., Smith & Co. Law Firm' },
        { name: 'directors', label: 'Board of Directors', type: 'text', placeholder: 'e.g., John Doe (Chairman)' },
        { name: 'isicIndustry', label: 'ISIC Industry (Do you belong to any industry Ass.?)', type: 'text', placeholder: 'e.g., Fintech Association', colSpan: 2 },
    ]
};

const financialInfoStep: AnyFormStep = {
    id: 'financialInfo', title: 'Financial Information',
    fields: [
        { name: 'arr_ttm_1', label: 'Company ARR/TTM (Average Annual Revenue)', type: 'currency', placeholder: '' },
        { name: 'arr_ttm_2', label: 'Revenue Growth Rate(%)', type: 'number', placeholder: '' }, // As per design
        { name: 'investmentAmount', label: 'Investment Amount', type: 'currency', placeholder: '' },
        { name: 'hasAuditedFinancials', label: 'Do you have an audited financial statement?', type: 'select', options: ['Yes', 'No'] },
        { name: 'hasPitchDeck', label: 'Do you have a company pitch deck?', type: 'select', options: ['Yes', 'No'] },
        { name: 'hasBusinessPlan', label: 'Does your company have a business Plan?', type: 'select', options: ['Yes', 'No'] },
        { name: 'hasFinancialCashflow', label: 'Company has a 5-year Financial Cashflow (3 model Financial Analysis)', type: 'select', options: ['Yes', 'No'] },
        { name: 'hasSolidAssets', label: 'Does your company possess significant SOLID asset holding? (Asset Base)', type: 'select', options: ['Yes', 'No'] },
        { name: 'isProfitable', label: 'Has the company been 3 years profitable', type: 'select', options: ['Yes', 'No'] },
        { name: 'hasHighGrowth', label: 'Does the company have a high growth potential', type: 'select', options: ['Yes', 'No'] },
        { name: 'hasLargeInventory', label: 'Does the company possessa large inventory value? (Inventory Base)', type: 'select', options: ['Yes', 'No'] },
        { name: 'hasLiabilitiesDebt', label: 'Does the company possess any current Liabilities/Debt', type: 'select', options: ['Yes', 'No'] },
        { name: 'hasOwnerDebt', label: 'Does the Owner/Proprietor possess any current Liabilities/Debt', type: 'select', options: ['Yes', 'No'], colSpan: 2 },
    ]
};

const documentUploadStep: AnyFormStep = {
    id: 'documentUpload', title: 'Document Upload',
    fields: [
        { name: 'certOfIncorporation', label: 'Certificate of Incorporation', type: 'documentUpload' },
        { name: 'memoOfAssoc', label: 'Memorandum Of Association', type: 'documentUpload' },
        { name: 'statusReport', label: 'Status Report', type: 'documentUpload' },
        { name: 'letterOfGoodStanding', label: 'Letter of Good Standing', type: 'documentUpload' },
        { name: 'companyLiability', label: 'Company Liability Schedule', type: 'documentUpload' },
        { name: 'businessPlan', label: 'Business Plan', type: 'documentUpload' },
        { name: 'financialStatements', label: 'Financial Statements', type: 'documentUpload' },
        { name: 'relevantLicenses', label: 'Relevant Licenses', type: 'documentUpload' },
    ]
};

const fundabilityTestConfig = {
    formSteps: [businessInfoStep, financialInfoStep, documentUploadStep]
};

interface FundabilityFormProps {
    onFormSubmit: (formData: any) => void;
    onBack: () => void;
}

export default function FundabilityForm({ onFormSubmit, onBack }: FundabilityFormProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [formData, setFormData] = useState<any>({});

    const steps = fundabilityTestConfig.formSteps;
    const currentStep = steps[currentStepIndex];

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            onFormSubmit(formData);
        }
    };
    const handlePrevious = () => { currentStepIndex > 0 ? setCurrentStepIndex(p => p - 1) : onBack(); };
    const handleInputChange = (name: string, value: any) => setFormData((p: any) => ({ ...p, [name]: value }));

    const renderStandardField = (field: FormField) => (
        <div key={field.name} className={cn(field.colSpan === 2 && "md:col-span-2")}>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{field.label}</label>
            {field.type === 'select' ? (<Select onValueChange={value => handleInputChange(field.name, value)}><SelectTrigger><SelectValue placeholder="Select..."/></SelectTrigger><SelectContent>{field.options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>)
            : field.type === 'currency' ? (<CurrencyInput placeholder={field.placeholder || ''} value={formData[field.name] || ''} onChange={value => handleInputChange(field.name, value)} />)
            : field.type === 'textarea' ? (<Textarea placeholder={field.placeholder || ''} onChange={e => handleInputChange(field.name, e.target.value)} />)
            : (<Input type={field.type as any} placeholder={field.placeholder || ''} onChange={e => handleInputChange(field.name, e.target.value)} />)}
        </div>
    );

    return (
        <div className="space-y-8">            
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <InfoCard title="Calculate Valuation" description="Please fill out some basic information about your company. These will be presented in the valuation report at the end of the process." />
                                       <InfoCard title="What Does A Low Score Signify?" description="A low score does not signal an inability to secure funding. It focuses on improvements to enable the business secure quicker, cheaper and flexible funding." />
                                       <InfoCard title="Why You Should Go To The Deal Room" description="Go to the Deal Room to explore active funding opportunities and connect with investors." />
                    </div>
            <h2 className="text-xl font-bold text-foreground mb-6">{currentStep.title}</h2>
            <AnimatePresence mode="wait">
                <motion.div key={currentStep.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                        {currentStep.fields.map(field => {
                            if (field.type === 'documentUpload') {
                                return <DocumentUploadField key={field.name} label={field.label} onUploadComplete={(fileName) => handleInputChange(field.name, fileName)} />;
                            }
                            return renderStandardField(field);
                        })}
                    </div>
                </motion.div>
            </AnimatePresence>
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-foreground/60">
                <Button variant="outline" onClick={handlePrevious}>{currentStepIndex === 0 ? 'Back' : 'Previous'}</Button>
                <Button onClick={handleNext}>{currentStepIndex === steps.length - 1 ? 'Submit Test' : 'Next'}</Button>
            </div>
        </div>
    );
}