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
export interface Investor {
  id: string;
  name: string;
  company: string;
  updatedAt: string;
  summary: string;
  locations: string[];
  fundsUnderManagement: number;
  rating: number;
  reviewCount: number;
  investorType: 'VC' | 'Angel' | 'Corporate' | 'PE Firm';
  industryPreferences: string[];
  investmentSize: { min: number; max: number; };
  avatarUrl: string;
  isVerified: boolean;
  professionalSummary: string;
}
export interface AuthResponse {
  token: string;
  user: User;
}
export interface ChatMessage {
  id: string;
  senderId: string
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
}

export interface ChatConversation {
  id: string; 
  participants: {
    userId: string;
    investorId: string;
  };
  messages: ChatMessage[];
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
export interface DisplayWithEditField extends BaseField {
  type: 'display-with-edit';
  label: string;
  placeholder?: string;
}
export interface DynamicTextListField extends BaseField {
  type?: 'dynamic-text-list';
  label: string;
  placeholder?: string;
}

export type FormField =
  | TextField | SelectField | CurrencyField | TextareaField | MultiSelectField | DocumentUploadField | DynamicTextListField | DisplayWithEditField;

interface BaseFormStep { title: string; description?: string; }

export interface StandardFormStep extends BaseFormStep { id: 'confidential' | 'startup-metrics' | 'sme-metrics'; fields: FormField[]; }
export interface SubSectionedFormStep extends BaseFormStep { id: 'financials' | 'sme-cashflow'; subSections: { id: string; title: string; fields: FormField[]; }[]; }

export interface FundabilityFormStep extends BaseFormStep {
  id: 'businessInfo' | 'financialInfo' | 'documentUpload' |'generalInfo';
  fields: FormField[];
}

export type AnyFormStep = StandardFormStep | SubSectionedFormStep | FundabilityFormStep;