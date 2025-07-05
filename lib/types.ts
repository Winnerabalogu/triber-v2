// lib/types.ts

// --- CORE TYPES (User, AuthResponse, etc.) ---

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  profileType: 'business' | 'investor';

  // Onboarding fields
  businessName?: string;
  businessType?: string;
  businessStatus?: string;
  phoneNumber?: string;
  businessAddress?: string;
  companyType?: string;
  interest?: string;
  industry?: string;
  establishedDate?: string;
  employeeCount?: string;
  legalIdentity?: string;
  annualTurnover?: string;
  fundingRequirement?: string;
  businessDescription?: string;
  isProfileComplete: boolean;
  isFundabilityTestTaken: boolean;
  isDealRoomProfileComplete: boolean;
  isValuationComplete: boolean;
  isProposalProcessStarted: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ValuationHistoryItem {
  id: string;
  name: string;
  type: 'Startup' | 'SME';
  method: string;
  date: string;
  score: number;
  status: 'Completed' | 'Pending';
}
export interface FundabilityHistoryItem {
  id: string;
  name: string;
  type: 'Startup' | 'SME';  
  date: string;
  score: number;
  status: 'Completed' | 'Pending';
}

interface BaseField { name: string; colSpan?: 1 | 2; }
export interface TextField extends BaseField { type: 'text' | 'number' | 'date' | 'tel'; label: string; placeholder?: string; }
export interface SelectField extends BaseField { type: 'select'; label: string; options: readonly string[]; }
export interface CurrencyField extends BaseField { type: 'currency'; label: string; placeholder?: string; }
export interface TextareaField extends BaseField { type: 'textarea'; label: string; placeholder?: string; }
export interface MultiSelectField extends BaseField { type: 'multiselect'; label: string; options: readonly string[]; placeholder?: string; }
export interface DocumentUploadField extends BaseField { type: 'documentUpload'; label: string; placeholder?: string; } 

export type FormField =
  | TextField | SelectField | CurrencyField | TextareaField | MultiSelectField | DocumentUploadField;

interface BaseFormStep { title: string; description?: string; }

// For Valuation
export interface StandardFormStep extends BaseFormStep { id: 'confidential' | 'startup-metrics' | 'sme-metrics'; fields: FormField[]; }
export interface SubSectionedFormStep extends BaseFormStep { id: 'financials' | 'sme-cashflow'; subSections: { id: string; title: string; fields: FormField[]; }[]; }

//For Fundability Test
export interface FundabilityFormStep extends BaseFormStep {
  id: 'businessInfo' | 'financialInfo' | 'documentUpload';
  fields: FormField[];
}

// The final union now includes all possible step types across all forms
export type AnyFormStep = StandardFormStep | SubSectionedFormStep | FundabilityFormStep;