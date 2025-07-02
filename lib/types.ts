
export interface User {
  id: string;
  firstName?: string; 
  lastName?: string;  
  email: string;
  profileType: 'business' | 'investor';
  
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


interface BaseField {
  name: string;
}

export interface TextField extends BaseField {
  type: 'text' | 'number' | 'date' | 'tel';
  label: string;
  placeholder?: string;
}

export interface SelectField extends BaseField {
  type: 'select';
  label: string;
  options: readonly string[];
}

export interface CurrencyField extends BaseField {
  type: 'currency';
  label: string;
  placeholder?: string;
}

export interface TextareaField extends BaseField {
  type: 'textarea';
  label: string;
  placeholder?: string;
}

export interface YearlyFinancialsField extends BaseField {
  type: 'yearlyFinancials';
  title: string;
  description: string;
  years: number[];
  subFields: string[];
}

export interface MultiSelectField extends BaseField {
  type: 'multiselect';
  label: string;
  options: readonly string[];
}

export type FormField = 
  | TextField 
  | SelectField 
  | CurrencyField 
  | TextareaField 
  | MultiSelectField
  | YearlyFinancialsField;
export interface StandardFormStep {
  id: 'confidential' | 'metrics'; 
  title: string;
  description?: string;
  fields: FormField[];
}

export interface FinancialsFormStep {
  id: 'financials'; 
  title: string;
  description?: string;
  subSections: {
      id: string;
      title: string;
      fields: FormField[];
  }[];
}

export type AnyFormStep = StandardFormStep | FinancialsFormStep;