"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CurrencyInput from "@/components/ui/currency-input";
import MultiSelectCheckbox from "@/components/ui/multi-select-checkbox"; 
import { AnyFormStep, FormField} from "@/lib/types";
import InfoCard from './InfoCard';

interface ValuationFormProps {
  method: string;
  testType: 'startup' | 'sme';
  onFormSubmit: (formData: any, calculatedValuation: number) => void;
  onBack: () => void;
}

const confidentialStep: AnyFormStep = {
  id: 'confidential',
  title: 'Confidential Information',
  fields: [
    { name: 'isRegistered', label: 'Are you a registered company?*', type: 'select', options: ['Yes', 'No'] },
    { name: 'runway', label: 'Current runway (in months)', type: 'number', placeholder: 'e.g., 12' },
    { name: 'investmentAmount', label: 'Investment Amount', type: 'currency', placeholder: 'e.g., 50,000' },
    { name: 'monthlyGrowth', label: 'Average monthly growth past 3 months', type: 'text', placeholder: 'e.g., 15%' },
    { name: 'stage', label: 'Stage', type: 'select', options: ['Idea', 'Pre-Seed', 'Seed', 'Series A', 'Growth'] },
    { name: 'website', label: 'Website', type: 'text', placeholder: 'https://example.com' },
    { name: 'foundingDate', label: 'Founding Date', type: 'date' },
    { name: 'hqAddress', label: 'Headquarter Office Address', type: 'text', placeholder: '123 Business Rd, Suite 100' },
    { name: 'sector', label: 'Sector', type: 'text', placeholder: 'e.g., B2B SaaS' },
    { name: 'teamSizeConfidential', label: 'Team size', type: 'number', placeholder: 'e.g., 25' },
    { name: 'businessDescription', label: 'Briefly provide us a business description', type: 'textarea', placeholder: 'Start typing...' },
  ]
};

const financialStep: AnyFormStep = {
  id: 'financials',
  title: 'Financial Information',
  subSections: [
    { id: 'capTable', title: 'Cap Table', fields: [
        { name: 'cap_type', label: 'Type', type: 'text', placeholder: 'e.g., Founder Shares' }, { name: 'cap_name', label: 'Name', type: 'text', placeholder: 'e.g., John Doe' },
        { name: 'cap_shares', label: 'Number of Shares', type: 'number', placeholder: '' }, { name: 'cap_comm', label: 'Comm', type: 'text', placeholder: '' },
    ]},
    { id: 'latestFinancials', title: 'Latest Financials', fields: [
        { name: 'fin_roundDate', label: 'Round Date', type: 'date' }, { name: 'fin_type', label: 'Type', type: 'text', placeholder: 'e.g., Seed' },
        { name: 'fin_shares', label: 'Number of Shares', type: 'number', placeholder: '' }, { name: 'fin_comm', label: 'Comm', type: 'text', placeholder: '' },
    ]},
    { id: 'useOfFunds', title: 'Use of Funds', fields: [
        { name: 'funds_r&d', label: 'Product and R&D', type: 'currency', placeholder: '20,000' }, { name: 'funds_sales', label: 'Sales and Marketing', type: 'currency', placeholder: '15,000' },
        { name: 'funds_ops', label: 'Operations', type: 'currency', placeholder: '10,000' }, { name: 'funds_capex', label: 'Capital Expenditures', type: 'currency', placeholder: '5,000' },
    ]},
    { id: 'expectedRunway', title: 'Expected Runway', fields: [
        { name: 'runway_expected', label: 'Expected Runway', type: 'text', placeholder: 'e.g., 18 months' }, { name: 'runway_burnRate', label: 'Average Burn Rate after Investment', type: 'currency', placeholder: '25,000' },
        { name: 'runway_investment', label: 'Investment Amount', type: 'currency', placeholder: '500,000' }, { name: 'runway_months', label: 'Expected Runway (Months)', type: 'number', placeholder: '20' },
        { name: 'runway_desc', label: 'Briefly provide us a description', type: 'textarea', placeholder: '' },
    ]},
  ]
};

const startupMetricsStep: AnyFormStep = {
  id: 'metrics',
  title: 'Valuation Metrics',
  fields: [
    { name: 'metric_teamSize', label: 'Select Management/Team Size', type: 'select', options: ['1-2 Founders', 'Small Team (3-10)', 'Experienced Team (11-50)'] },
    { name: 'metric_marketSize', label: 'Select Market Size', type: 'select', options: ['Niche (<$100M)', 'Large ($100M - $1B)', 'Huge (>$1B)'] },
    { name: 'metric_businessModel', label: 'Business Model', type: 'select', options: ['B2C SaaS', 'B2B SaaS', 'Marketplace', 'E-commerce'] },
    { name: 'metric_technology', label: 'Use of Technology', type: 'select', options: ['Basic', 'Proprietary', 'Disruptive'] },
    { name: 'metric_scalability', label: 'Level of Scalability', type: 'select', options: ['Low', 'Medium', 'High'] },
    { name: 'metric_comparable', label: 'Comparable Startup Valuation', type: 'currency', placeholder: 'e.g., 5,000,000' },
  ]
};

const smeMetricsStep: AnyFormStep = {
  id: 'metrics',
  title: 'Valuation Metrics',
  fields: [
    { name: 'sme_financialsByYear', type: 'yearlyFinancials', years: [2025, 2024, 2023], 
      subFields: ['Sales', 'Costs of Goods Sold', 'Operating Expenses', 'Officer Salaries', 'Depreciation', 'Interest', 'Other Expenses'],
      title: 'Step 1: Determine the Cash Flow', description: 'Discretionary Earnings are the Net Earnings of the business...' },
    { name: 'industry', label: 'Industry', type: 'select', options: ["Agriculture", "Automotive", "Construction", "eCommerce", "Entertainment", "Healthcare", "Manufacturing", "Restaurants", "Retail", "Services", "Software & Technology", "Mining", "Utilities", "Wholesale/Distribution"] },
    { name: 'earningsTrend', label: 'Earnings Trend', type: 'select', options: ["Declining Revenues - 20% year over year, no turnaround yet", "Declining Revenues -20% year over year, turnaround started", "Steady Revenue, sustainable", "Increasing Revenues +20% year over year, sustainable", "Increasing Revenues +20% year over year, non-sustainable"] },
    { name: 'riskFactors', label: 'Risk Factors', type: 'multiselect', options: ["No employees, non-internet", "Industry in Decline", "Poor books and records", "< 3 years in business", "< 1 year in business"] },
    { name: 'upsideFactors', label: 'Upside/Low Risk Factors', type: 'multiselect', options: ["SBA Financable (TRs show profit)", "Established Franchise", "High Growth Industry", "10+ Years in Business", "Sustainable Competitive Advantage"] },
  ]
};


// --- COMPONENT ---


export default function ValuationForm({ method, testType, onFormSubmit, onBack }: ValuationFormProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [formData, setFormData] = useState<any>({});

    const steps: AnyFormStep[] = [
        confidentialStep,
        financialStep,
        testType === 'startup' ? startupMetricsStep : smeMetricsStep
    ];
    
    const currentStep = steps[currentStepIndex];

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            const valuation = calculateValuation();
            onFormSubmit({ ...formData, testType, method }, valuation);
        }
    };

    const handlePrevious = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        } else {
            onBack();
        }
    };
    
    const handleInputChange = (name: string, value: any) => {
        const keys = name.split('.');
        if (keys.length > 1) {
            setFormData((prev: any) => {
                const newState = { ...prev };
                let current = newState;
                for(let i=0; i < keys.length - 1; i++) {
                    current[keys[i]] = current[keys[i]] || {};
                    current = current[keys[i]];
                }
                current[keys[keys.length - 1]] = value;
                return newState;
            });
        } else {
            setFormData((prev: any) => ({ ...prev, [name]: value }));
        }
    };

    const calculateValuation = (): number => {
        if (testType === 'sme') {
            let discretionaryEarnings = 0;
            const financials = formData.sme_financialsByYear || {};
            const weights = [0.5, 0.3, 0.2];
            const years = [2025, 2024, 2023];
            
            for (let i = 0; i < years.length; i++) {
                const year = years[i];
                const yearData = financials[year] || {};
                const sales = Number(String(yearData.Sales || '0').replace(/,/g, ''));
                const cogs = Number(String(yearData['Costs of Goods Sold'] || '0').replace(/,/g, ''));
                const opEx = Number(String(yearData['Operating Expenses'] || '0').replace(/,/g, ''));
                const addBacks = 
                    Number(String(yearData['Officer Salaries'] || '0').replace(/,/g, '')) +
                    Number(String(yearData['Depreciation'] || '0').replace(/,/g, '')) +
                    Number(String(yearData['Interest'] || '0').replace(/,/g, '')) +
                    Number(String(yearData['Other Expenses'] || '0').replace(/,/g, ''));
                
                const yearEarnings = (sales - cogs - opEx) + addBacks;
                discretionaryEarnings += yearEarnings * weights[i];
            }

            let multiple = 2.0;
            if (formData.industry === "Software & Technology") multiple += 1.2;
            if (formData.earningsTrend?.includes("Increasing")) multiple += 0.5;
            if (formData.earningsTrend?.includes("Declining")) multiple -= 0.5;
            multiple = Math.max(1.0, multiple);

            return parseFloat((discretionaryEarnings * multiple).toFixed(2));
        } else {
            let valuation = 0;
            if (formData.metric_teamSize === 'Experienced Team (11-50)') valuation += 500000;
            else if (formData.metric_teamSize === 'Small Team (3-10)') valuation += 250000;
            if (formData.metric_marketSize === 'Huge (>$1B)') valuation += 1000000;
            else if (formData.metric_marketSize === 'Large ($100M - $1B)') valuation += 500000;
            if (formData.metric_technology === 'Disruptive') valuation += 1500000;
            else if (formData.metric_technology === 'Proprietary') valuation += 750000;
            if (formData.metric_scalability === 'High') valuation += 800000;
            else if (formData.metric_scalability === 'Medium') valuation += 400000;
            valuation += Number(String(formData.metric_comparable || '0').replace(/,/g, ''));
            return valuation;
        }
    };
    
    const renderStandardField = (field: FormField) => {
        if (field.type === 'yearlyFinancials') return null;

        return (
            <div key={field.name}>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">{field.label}</label>
                {field.type === 'select' && (<Select onValueChange={value => handleInputChange(field.name, value)}><SelectTrigger><SelectValue placeholder="Select..."/></SelectTrigger><SelectContent>{field.options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>)}
                {field.type === 'multiselect' && (<MultiSelectCheckbox options={field.options} selectedValues={formData[field.name] || []} onChange={(values) => handleInputChange(field.name, values)} />)}
                {field.type === 'currency' && (<CurrencyInput placeholder={field.placeholder || ''} value={formData[field.name] || ''} onChange={value => handleInputChange(field.name, value)} />)}
                {field.type === 'textarea' && (<Textarea placeholder={field.placeholder || ''} onChange={e => handleInputChange(field.name, e.target.value)} />)}
                {(field.type === 'text' || field.type === 'number' || field.type === 'date' || field.type === 'tel') && (
                    <Input type={field.type} placeholder={field.placeholder || ''} onChange={e => handleInputChange(field.name, e.target.value)} />
                )}
            </div>
        );
    }

    return (
           <div className="space-y-8">            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoCard title="Calculate Valuation" description="Please fill out some basic information about your company. These will be presented in the valuation report at the end of the process." />
                <InfoCard title="What Does A Low Score Signify?" description="A low score does not signal an inability to secure funding. It focuses on improvements to enable the business secure quicker, cheaper and flexible funding." />
                <InfoCard title="Why You Should Go To The Deal Room" description="Go to the Deal Room to explore active funding opportunities and connect with investors." />
            </div>
       <div className="bg-background p-6 md:p-8 rounded-lg border border-foreground/60">
            <h2 className="text-xl font-bold text-foreground mb-1">{currentStep.title}</h2>
            <p className="text-sm text-muted-foreground mb-6">Valuation Method: {method}</p>

            <AnimatePresence mode="wait">
                <motion.div key={currentStepIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <div className="space-y-6">
                        {currentStep.id === 'financials' ? (
                            <div className="space-y-8">
                                    {currentStep.subSections.map((section) => (
                                    <div key={section.id}>
                                        <h3 className="font-semibold text-lg mb-4 border-b border-foreground/60 pb-2">{section.title}</h3>
                                        <div className="space-y-4">                                            
                                            {section.fields.map((field) => renderStandardField(field))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (                            
                            currentStep.fields.map(field => {
                                if (field.type === 'yearlyFinancials') {                                    
                                    return (
                                        <div key={field.name} className="space-y-4">
                                            <h3 className="font-semibold text-lg">{field.title}</h3>
                                            <p className="text-sm text-muted-foreground">{field.description}</p>
                                            {field.years.map((year) => (
                                                <div key={year}>
                                                    <h4 className="font-semibold text-lg mb-2">{year}</h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        {field.subFields.map((subField) => (
                                                            <div key={subField}>
                                                                <label className="text-sm text-muted-foreground">{subField}</label>
                                                                <CurrencyInput placeholder="$0" value={formData.sme_financialsByYear?.[year]?.[subField] || ''} onChange={value => handleInputChange(`sme_financialsByYear.${year}.${subField}`, value)} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }                                
                                return renderStandardField(field);
                            })
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-foreground/60">
                <Button variant="outline" onClick={handlePrevious}>{currentStepIndex === 0 ? 'Back' : 'Previous'}</Button>
                <Button onClick={handleNext}>{currentStepIndex === steps.length - 1 ? 'Calculate & View Report' : 'Next'}</Button>
            </div>
        </div>
        </div>
    );
}