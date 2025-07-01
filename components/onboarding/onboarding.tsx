"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/contexts/ModalContext";
import CurrencyInput from "@/components/ui/currency-input";
import OnboardingLayout from "@/components/auth/OnboardingLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthService from "@/services/auth.service";


const onboardingSteps = [
    { step: 1, name: "businessName", title: "Your business name", component: "text", placeholder: "e.g. Triber Inc.", validation: { required: true, minLength: 3 } },
    { step: 2, name: "profileType", title: "Profile type", component: "select", options: ["Business", "Investor"], validation: { required: true } },
    { step: 3, name: "businessType", title: "Select your business type", component: "select", options: ["Startup", "SME", "Corporation"], validation: { required: true } },
    { step: 4, name: "businessStatus", title: "Select your business status", component: "select", options: ["Operational", "Pre-Launch", "Idea Stage"], validation: { required: true } },
    { step: 5, name: "phoneNumber", title: "Provide a phone number", component: "tel", placeholder: "812 345 6789", validation: { required: true, minLength: 7 } },
    { step: 6, name: "businessAddress", title: "Provide your business address", component: "text", placeholder: "123 Innovation Drive, Tech City", validation: { required: true } },
    { step: 7, name: "companyType", title: "What type of company do you operate?", component: "select", options: ["Tech", "Finance", "Healthcare", "E-commerce", "Other"], allowOther: true, validation: { required: true } },
    { step: 8, name: "interest", title: "What are you interested in?", component: "select", options: ["Seeking Funding", "Networking", "Partnerships"], validation: { required: true } },
    { step: 9, name: "industry", title: "What industry does your business belong to?", component: "select", options: ["Fintech", "SaaS", "Deep Tech", "Consumer Goods", "Other"], allowOther: true, validation: { required: true } },
    { step: 10, name: "establishedDate", title: "When was the business established?", component: "select", options: ["< 1 year ago", "1-3 years ago", "3-5 years ago", "> 5 years ago"], validation: { required: true } },
    { step: 11, name: "employeeCount", title: "How many employees does the business have?", component: "select", options: ["1-10", "11-50", "51-200", "200+"], validation: { required: true } },
    { step: 12, name: "legalIdentity", title: "Select company legal identity type", component: "select", options: ["Limited Liability company", "Business Enterprise-Name", "Sole Proprietor","Unregistered"], validation: { required: true } },
     { step: 13, name: "annualTurnover", title: "What is your annual turnover?", component: "currency", placeholder: "e.g. 500,000", validation: { required: true } },
    { step: 14, name: "fundingRequirement", title: "Funding requirements?", component: "currency", placeholder: "e.g. 100,000", validation: { required: true } },
    { step: 15, name: "businessDescription", title: "Briefly provide us a business description", component: "textarea", placeholder: "Start typing...", validation: { required: true, minLength: 20 } },
    { step: 16, name: "finalStep", title: "Review Your Information", component: "summary", description: "Please review your details below before submitting."},
     { step: 17, name: "success", title: "Profile Complete!", component: "success", description: "Thank you for completing your profile. You're ready to explore the dashboard." },
];

const totalSteps = onboardingSteps.length;

export default function OnboardingPage() {
    const [isOnboardingActive, setIsOnboardingActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<{ [key: string]: any }>({});
    const [direction, setDirection] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const { openModal } = useModal();
    const router = useRouter();
    const { user, login } = useAuth()

    const handleStartOnboarding = () => setIsOnboardingActive(true);

    const handleCancel = () => {
        const completionPercentage = Math.round(((currentStep - 1) / totalSteps) * 100);
        openModal('confirm-quit', { completionPercentage });
    };

    const handleFormChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(null);
    };

    const validateStep = () => {
        const stepConfig = onboardingSteps.find(s => s.step === currentStep);
        if (!stepConfig || !stepConfig.validation) {
            return true;
        }

        const value = formData[stepConfig.name];

        if (stepConfig.validation.required && (!value || String(value).trim() === '')) {
            setError(`${stepConfig.title} is required.`);
            return false;
        }

        if (stepConfig.validation.minLength && String(value).length < stepConfig.validation.minLength) {
            setError(`${stepConfig.title} must be at least ${stepConfig.validation.minLength} characters long.`);
            return false;
        }

        setError(null);
        return true;
    };

 const handleNext = async () => { // Make the function async
        if (validateStep() || currentStep === 16) {
            if (currentStep < totalSteps) {
                // If we are on the summary step, this is the moment to submit the data
                if (currentStep === totalSteps - 1) { // This is the "Submit" button
                    if (!user) {
                        console.error("No user found to update");
                        return;
                    }
                    console.log("SUBMITTING ONBOARDING DATA:", formData);
                    try {
                        // Call the new service to update the user profile
                        const updatedUser = await AuthService.updateUserProfile(user, formData);
                        // Update the global user state with the complete profile
                        login(localStorage.getItem('authToken')!, updatedUser);
                    } catch (error) {
                        console.error("Failed to update user profile", error);
                        // Handle error state
                    }
                }
                setDirection(1);
                setCurrentStep(prev => prev + 1);
            } else {
                // This is the final button click on the success screen
                console.log("Navigating to dashboard...");
                router.push('/dashboard');
            }
        }
    };


    const handlePrevious = () => {
        if (currentStep > 1) {
            setDirection(-1);
            setCurrentStep(prev => prev - 1);
        }
    };

    const currentStepData = onboardingSteps.find(s => s.step === currentStep);
    const variants = {
        enter: (direction: number) => ({ x: direction > 0 ? 30 : -30, opacity: 0 }),
        center: { zIndex: 1, x: 0, opacity: 1 },
        exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 30 : -30, opacity: 0 }),
    };

    if (!isOnboardingActive) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <h1 className="text-3xl md:text-4xl font-medium text-foreground mb-3">
                        Fill in your business information
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        Our team will surely get back to you
                    </p>
                    <div className="relative inline-block group">
                        <Button 
                            onClick={handleStartOnboarding}
                            className="relative z-10 px-8 py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-neutral-800 transition-colors duration-300"
                        >
                            Start for free
                        </Button>
                        <div className="absolute inset-x-0 -bottom-1 h-2 bg-primary blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                </motion.div>
            </div>
        );
    }
    
    return (
        <OnboardingLayout 
            currentStep={currentStep} 
            totalSteps={totalSteps} 
            onCancel={handleCancel}
        >
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                    className="w-full"
                >
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">{currentStepData?.title}</h2>
                        {currentStepData?.component !== 'success' && currentStepData?.description && (
                             <p className="text-muted-foreground text-sm mb-8">{currentStepData.description}</p>
                        )}
                        
                        <div className="space-y-4">
                            {currentStepData?.component === 'text' && (
                                <Input placeholder={currentStepData.placeholder} onChange={(e) => handleFormChange(currentStepData.name, e.target.value)} />
                            )}
                            {currentStepData?.component === 'tel' && (
                                <Input type="tel" placeholder={currentStepData.placeholder} onChange={(e) => handleFormChange(currentStepData.name, e.target.value)} />
                            )}
                             {currentStepData?.component === 'number' && ( 
                                <Input type="number" placeholder={currentStepData.placeholder} onChange={(e) => handleFormChange(currentStepData.name, e.target.value)} />
                            )}
                             {currentStepData?.component === 'currency' && (
                                <CurrencyInput
                                    placeholder={currentStepData.placeholder}
                                    value={formData[currentStepData.name] || ''}
                                    onChange={(value) => handleFormChange(currentStepData.name, value)}
                                />
                            )}
                            {currentStepData?.component === 'textarea' && (
                                 <Textarea placeholder={currentStepData.placeholder} rows={5} onChange={(e) => handleFormChange(currentStepData.name, e.target.value)} />
                            )}
                            {currentStepData?.component === 'select' && (
                                <>
                                    <Select onValueChange={(value) => handleFormChange(currentStepData.name, value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select one..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {currentStepData.options?.map(option => (
                                                <SelectItem key={option} value={option}>{option}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <AnimatePresence>
                                    {currentStepData.allowOther && formData[currentStepData.name] === 'Other' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <Input
                                                placeholder={`Please specify...`}
                                                className="mt-4"
                                                onChange={(e) => handleFormChange(`${currentStepData.name}Other`, e.target.value)}
                                            />
                                        </motion.div>
                                    )}
                                    </AnimatePresence>
                                </>
                            )}
                           {currentStepData?.component === 'summary' && (
                                <div className="bg-card border border-border rounded-lg p-6 text-left space-y-4 max-h-[400px] overflow-y-auto">
                                    <p className="text-sm text-muted-foreground mb-4">{currentStepData.description}</p>                                                                        
                                    {Object.entries(formData).map(([key, value]) => {
                                        const stepConfig = onboardingSteps.find(s => s.name === key || `${s.name}Other` === key);                                                                                
                                        if (!stepConfig || !value) return null;                                                                                
                                        const title = key.includes('Other') 
                                            ? `Other (${stepConfig.title})` 
                                            : stepConfig.title;
                                        
                                        let displayValue = String(value);                                                                                 
                                        if (stepConfig.component === 'currency' && !isNaN(Number(value))) {
                                            displayValue = `$${Number(value).toLocaleString('en-US')}`;
                                        }

                                        return (
                                            <div key={key} className="border-b border-border/50 pb-2">
                                                <p className="text-xs text-muted-foreground">{title}</p>
                                                <p className="font-semibold text-foreground break-words">{displayValue}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}

                            {currentStepData?.component === 'success' && (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                                    <p className="text-muted-foreground">{currentStepData.description}</p>
                                </div>
                            )}                        
                        </div>

                        <AnimatePresence>
                        {error && (
                            <motion.p 
                                className="text-red-500 text-sm mt-4"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                {error}
                            </motion.p>
                        )}
                        </AnimatePresence>
                    </div>

                   <div className="mt-8 flex items-center justify-center gap-4">
                       {currentStep > 1 && currentStep < totalSteps && ( 
                            <Button variant="outline" onClick={handlePrevious}>Previous</Button>
                       )}
                       {currentStep < (totalSteps -1) && ( 
                            <Button onClick={handleNext}>Next</Button>
                       )}
                       {currentStep === (totalSteps - 1) && ( 
                            <Button onClick={handleNext}>Submit</Button>
                       )}
                       {currentStep === totalSteps && ( 
                            <Button onClick={handleNext} className="bg-primary text-primary-foreground">Go to Dashboard</Button>
                       )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </OnboardingLayout>
    );
}