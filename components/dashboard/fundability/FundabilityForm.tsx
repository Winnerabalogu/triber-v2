"use client"

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CurrencyInput from "@/components/ui/currency-input";
import { AnyFormStep, FormField, DynamicTextListField, DisplayWithEditField, User } from "@/lib/types";
import InfoCard from '../../InfoCard';
import DocumentUploadField from "./DocumentUploadField";
import { cn } from "@/lib/utils";
import { Plus, X,Pencil } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";


const generalInfoStep: AnyFormStep = {
    id: 'generalInfo', title: 'General Information',
    fields: [
        { name: 'businessName', label: 'Legal Name', type: 'display-with-edit' },
        { name: 'legalIdentity', label: 'Company Registration Type', type: 'display-with-edit' },
        { name: 'businessAddress', label: 'Registered Address', type: 'display-with-edit', colSpan: 2 },
        { name: 'industry', label: 'Industry', type: 'display-with-edit' },
        { name: 'email', label: 'Company Email Address', type: 'display-with-edit' },
        { name: 'phoneNumber', label: 'Contact Number', type: 'display-with-edit' },
        { name: 'establishedDate', label: 'Years of Operation', type: 'display-with-edit' },
        { name: 'employeeCount', label: 'Company Size', type: 'display-with-edit' },
        { name: 'businessStatus', label: 'Startup Stage', type: 'display-with-edit' },
        { name: 'businessDescription', label: 'Business Description', type: 'display-with-edit', colSpan: 2 },
    ]
};

const businessInfoStep: AnyFormStep = {
    id: 'businessInfo', title: 'Business Ownership',
    fields: [
        { name: 'ownership', label: 'Ownership (who owns the business)', placeholder: 'e.g., John Doe' },
        { name: 'management', label: 'Executive Management', type: 'dynamic-text-list', placeholder: 'e.g., Jane Smith, CEO' },
        { name: 'advisers', label: 'Legal Advisers', type: 'dynamic-text-list', placeholder: 'e.g., Smith & Co. Law Firm' },
        { name: 'directors', label: 'Board of Directors', type: 'dynamic-text-list', placeholder: 'e.g., John Doe (Chairman)' },
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
    formSteps: [generalInfoStep, businessInfoStep, financialInfoStep, documentUploadStep]
};

const getInitialFormData = (steps: AnyFormStep[], user: User | null) => {
    const initialData: { [key: string]: any } = {};

    const processFields = (fields: FormField[]) => {
        fields.forEach(field => {
            if (user && 'type' in field && field.type === 'display-with-edit') {                
                initialData[field.name] = user[field.name as keyof User] || 'Not provided';
            } else if ('type' in field && field.type === 'dynamic-text-list') {
                initialData[field.name] = [''];
            } else {
                initialData[field.name] = '';
            }
        });
    }
    steps.forEach(step => {        
        if ('fields' in step && Array.isArray(step.fields)) {
            processFields(step.fields);
        }         
        else if ('subSections' in step && Array.isArray(step.subSections)) {
            step.subSections.forEach(subSection => {
                processFields(subSection.fields);
            });
        }
    });
    return initialData;
};

interface FundabilityFormProps {
    onFormSubmit: (formData: any) => void;
    onBack: () => void;
}

export default function FundabilityForm({ onFormSubmit, onBack }: FundabilityFormProps) {
    const { user } = useAuth(); 
    const { openModal } = useModal();     
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [formData, setFormData] = useState<any>({});     

    useEffect(() => {
        if (user) {
            setFormData(getInitialFormData(fundabilityTestConfig.formSteps, user));
        }
    }, [user]);

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

    const handleDynamicListChange = (fieldName: string, index: number, value: string) => {
        const updatedList = [...formData[fieldName]];
        updatedList[index] = value;
        handleInputChange(fieldName, updatedList);
    };

    const addDynamicListItem = (fieldName: string) => {
        const updatedList = [...formData[fieldName], ''];
        handleInputChange(fieldName, updatedList);
    };

    const removeDynamicListItem = (fieldName: string, index: number) => {
        if (formData[fieldName].length <= 1) return;
        const updatedList = formData[fieldName].filter((_: any, i: number) => i !== index);
        handleInputChange(fieldName, updatedList);
    };
     const renderDisplayField = (field: DisplayWithEditField) => (
        <div key={field.name} className={cn(field.colSpan === 2 && "md:col-span-2", "py-2")}>
            <label className="text-sm font-medium text-muted-foreground mb-1 block">{field.label}</label>
            <div className="flex justify-between items-center w-full p-3 rounded-md border border-input bg-background min-h-[40px]">
                <p className="text-sm text-foreground break-words pr-4">
                    {formData[field.name] || 'N/A'}
                </p>
                <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 flex-shrink-0"
                onClick={() => {
                    openModal('edit-field', {
                        label: field.label,
                        currentValue: formData[field.name],                    
                        fieldType: field.name === 'businessDescription' ? 'textarea' : 'input',                 
                        onSave: (newValue: string) => handleInputChange(field.name, newValue)
                    });
                }}
            >
                    <Pencil className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );

    const renderStandardField = (field: FormField) => (
        <div key={field.name} className={cn(field.colSpan === 2 && "md:col-span-2")}>
            <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{field.label}</label>
            {field.type === 'select' ? (<Select onValueChange={value => handleInputChange(field.name, value)}><SelectTrigger><SelectValue placeholder="Select..."/></SelectTrigger><SelectContent>{field.options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>)
            : field.type === 'currency' ? (<CurrencyInput placeholder={field.placeholder || ''} value={formData[field.name] || ''} onChange={value => handleInputChange(field.name, value)} />)
            : field.type === 'textarea' ? (<Textarea placeholder={field.placeholder || ''} onChange={e => handleInputChange(field.name, e.target.value)} />)
            : (<Input type={field.type as any} placeholder={field.placeholder || ''} onChange={e => handleInputChange(field.name, e.target.value)} />)}
        </div>
    );

     const renderDynamicListField = (field: DynamicTextListField) => (
         <div key={field.name} className={cn(field.colSpan === 2 && "md:col-span-2")}>
        <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{field.label}</label>            
        <div className="space-y-3">
            {formData[field.name]?.map((value: string, index: number) => {
                const isLastItem = index === formData[field.name].length - 1;
                
                return (
                    <div key={index} className="flex items-center gap-2">
                        <Input
                            type="text"
                            placeholder={field.placeholder || ''}
                            value={value}
                            onChange={e => handleDynamicListChange(field.name, index, e.target.value)}
                        />                        
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeDynamicListItem(field.name, index)}
                            disabled={formData[field.name].length <= 1}
                            className="text-muted-foreground hover:text-destructive flex-shrink-0"
                            aria-label="Remove item"
                        >
                            <X className="h-4 w-4" />
                        </Button>                        
                        {isLastItem && (
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => addDynamicListItem(field.name)}
                                className="flex-shrink-0"
                                aria-label="Add another item"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                );
            })}
        </div>
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
                       {'fields' in currentStep && currentStep.fields.map(field => {                           
                           switch (field.type) {
                                case 'display-with-edit':
                                    return renderDisplayField(field);
                                case 'dynamic-text-list':
                                    return renderDynamicListField(field);
                                case 'documentUpload':
                                    return <DocumentUploadField key={field.name} label={field.label} onUploadComplete={(fileName) => handleInputChange(field.name, fileName)} />;                             
                                default:                                    
                                    return renderStandardField(field); 
                            }
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