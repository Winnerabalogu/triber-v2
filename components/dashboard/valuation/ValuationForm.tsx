"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CurrencyInput from "@/components/ui/currency-input";
import { FormStep } from "@/lib/types";
import MultiSelectCheckbox from "@/components/ui/multi-select-checkbox"; 

const industryOptions = ["Agriculture", "Automotive", "Construction", "eCommerce", "Entertainment", "Healthcare", "Manufacturing", "Restaurants", "Retail", "Services", "Software & Technology", "Mining", "Utilities", "Wholesale/Distribution"];
const earningsTrendOptions = ["Declining Revenues - 20% year over year, no turnaround yet", "Declining Revenues -20% year over year, turnaround started", "Steady Revenue, sustainable", "Increasing Revenues +20% year over year, sustainable", "Increasing Revenues +20% year over year, non-sustainable"];
const riskFactorOptions = ["No employees, non-internet", "Industry in Decline", "Poor books and records", "< 3 years in business", "< 1 year in business"];
const upsideFactorOptions = ["SBA Financable (TRs show profit)", "Established Franchise", "High Growth Industry", "10+ Years in Business", "Sustainable Competitive Advantage"];
const valuationPurposeOptions = ["Business Purchase", "Business Sale", "Exit Planning", "Insurance", "Buy-Sell Agreements", "Divorce", "Shareholder Disputes", "Litigation", "ESOPs", "Charitable Contributions", "Patent Infringement", "Capital Infusion", "Eminent Domain", "Gift Tax", "Estate Planning", "Other"];

const smeCashFlowConfig: { formSteps: FormStep[] } = {
  formSteps: [
    {
      id: 'confidential',
      title: 'Confidential Information',
      fields: [
        { name: 'isRegistered', label: 'Are you a registered company?*', type: 'select', options: ['Yes', 'No'] },
        { name: 'runway', label: 'Current runway (in months)', type: 'number', placeholder: 'e.g., 12' },
        { name: 'investmentAmount', label: 'Investment Amount', type: 'currency', placeholder: 'e.g., 50,000' },
        { name: 'monthlyGrowth', label: 'Average monthly growth past 3 months', type: 'text', placeholder: 'e.g., 15%' },
        { name: 'stage', label: 'Stage', type: 'select', options: ['Idea', 'Pre-Seed', 'Seed', 'Series A', 'Growth'] },
        { name: 'website', label: 'Website', type: 'text', placeholder: 'https://example.com' },
        { name: 'foundingDate', label: 'Founding Date', type: 'date'},
        { name: 'hqAddress', label: 'Headquarter Office Address', type: 'text', placeholder: '123 Business Rd, Suite 100' },
        { name: 'sector', label: 'Sector', type: 'text', placeholder: 'e.g., B2B SaaS' },
        { name: 'teamSizeConfidential', label: 'Team size', type: 'number', placeholder: 'e.g., 25' },
        { name: 'businessDescription', label: 'Briefly provide us a business description', type: 'textarea', placeholder: 'Start typing...' },
      ]
    },
    {
      id: 'financials',
      title: 'Step 1: Determine the Cash Flow',
      description: 'Discretionary Earnings are the Net Earnings of the business, before Interest, Taxes, Depreciation and Amortization...',
      fields: [
        { name: 'financialsByYear', type: 'yearlyFinancials', years: [2025, 2024, 2023], 
          subFields: ['Sales', 'Costs of Goods Sold', 'Operating Expenses', 'Officer Salaries', 'Depreciation', 'Interest', 'Other Expenses'] }
      ]
    },
    {
      id: 'metrics',
      title: 'Step 2: Determine the Multiple of Earnings',
      fields: [
        { name: 'industry', label: 'Industry', type: 'select', options: industryOptions },
        { name: 'earningsTrend', label: 'Earnings Trend', type: 'select', options: earningsTrendOptions },       
      { name: 'riskFactors', label: 'Risk Factors (select all that apply)', type: 'multiselect', options: riskFactorOptions },
        { name: 'upsideFactors', label: 'Upside/Low Risk Factors (select all that apply)', type: 'multiselect', options: upsideFactorOptions },
        { name: 'valuationPurpose', label: 'Purpose Of Valuation', type: 'select', options: valuationPurposeOptions },
      ]
    }
  ]
};

interface ValuationFormProps {
  method: string;
  onFormSubmit: (formData: any, calculatedValuation: number) => void;
  onBack: () => void;
}

export default function ValuationForm({ method, onFormSubmit, onBack }: ValuationFormProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [formData, setFormData] = useState<any>({});

    const steps = smeCashFlowConfig.formSteps;
    const currentStep = steps[currentStepIndex];

    const handleNext = () => {
        // add validation before proceeding
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            const valuation = calculateValuation();
            onFormSubmit({ ...formData }, valuation);
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
        let discretionaryEarnings = 0;
        const financials = formData.financialsByYear || {};
        const weights = [0.5, 0.3, 0.2];
        const years = smeCashFlowConfig.formSteps[1].fields[0].type === 'yearlyFinancials' ? smeCashFlowConfig.formSteps[1].fields[0].years : [];
        
        for (let i = 0; i < years.length; i++) {
            const year = years[i];
            const yearData = financials[year] || {};
            const sales = Number(yearData.Sales || 0);
            const cogs = Number(yearData['Costs of Goods Sold'] || 0);
            const opEx = Number(yearData['Operating Expenses'] || 0);
            const addBacks = 
                Number(yearData['Officer Salaries'] || 0) +
                Number(yearData['Depreciation'] || 0) +
                Number(yearData['Interest'] || 0) +
                Number(yearData['Other Expenses'] || 0);
            
            const yearEarnings = (sales - cogs - opEx) + addBacks;
            discretionaryEarnings += yearEarnings * weights[i];
        }

        let multiple = 2.0;
        if (formData.industry === "Software & Technology" || formData.industry === "Healthcare") multiple += 1.2;
        if (formData.earningsTrend?.includes("Increasing")) multiple += 0.5;
        if (formData.earningsTrend?.includes("Declining")) multiple -= 0.5;                
        if (formData.riskFactors) multiple -= 0.2;
        if (formData.upsideFactors) multiple += 0.25;

        multiple = Math.max(1.0, multiple);

        return parseFloat((discretionaryEarnings * multiple).toFixed(2));
    };

    return (
        <div className="bg-background p-6 md:p-8 rounded-lg border border-foreground/60">
            <h2 className="text-xl font-bold text-foreground mb-1">{currentStep.title}</h2>
            <p className="text-sm text-muted-foreground mb-6">Valuation Method: {method}</p>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStepIndex}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                >
                    <div className="space-y-6">
                        {currentStep.fields.map(field => (
                            <div key={field.name}>
                                {field.type === 'yearlyFinancials' ? (
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">{steps[1].description}</p>
                                        {field.years.map((year: number) => (
                                            <div key={year}>
                                                <h4 className="font-semibold text-lg mb-2">{year}</h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {field.subFields.map((subField: string) => (
                                                    <div key={subField}>
                                                        <label className="text-sm text-muted-foreground">{subField}</label>
                                                        <CurrencyInput 
                                                            placeholder="$0" 
                                                            value={formData.financialsByYear?.[year]?.[subField] || ''}
                                                            onChange={value => handleInputChange(`financialsByYear.${year}.${subField}`, value)}
                                                        />
                                                    </div>
                                                ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground mb-1.5">{field.label}</label>
                                        {field.type === 'multiselect' ? (
                                            <MultiSelectCheckbox 
                                                options={field.options}
                                                selectedValues={formData[field.name] || []}
                                                onChange={(values) => handleInputChange(field.name, values)}
                                            />
                                        ) : field.type === 'currency' ? (
                                            <CurrencyInput
                                                placeholder={field.placeholder}
                                                value={formData[field.name] || ''}
                                                onChange={value => handleInputChange(field.name, value)}
                                            />
                                        ) : field.type === 'textarea' ? (
                                             <Textarea placeholder={field.placeholder} onChange={e => handleInputChange(field.name, e.target.value)}/>
                                       ) : field.type === 'select' ? ( 
                                            <Select onValueChange={value => handleInputChange(field.name, value)}>
                                                <SelectTrigger><SelectValue placeholder="Select..."/></SelectTrigger>
                                                <SelectContent>
                                                    {field.options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        ) : ( 
                                            <Input 
                                                type={field.type} 
                                                placeholder={field.placeholder || ''} 
                                                onChange={e => handleInputChange(field.name, e.target.value)}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-foreground/60">
                <Button variant="outline" onClick={handlePrevious}>
                    {currentStepIndex === 0 ? 'Back' : 'Previous'}
                </Button>
                <Button onClick={handleNext}>
                    {currentStepIndex === steps.length - 1 ? 'Calculate & Submit' : 'Next'}
                </Button>
            </div>
        </div>
    );
}