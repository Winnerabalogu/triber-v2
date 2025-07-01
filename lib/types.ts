export interface User {
  id: string;
  firstName?: string; 
  lastName?: string;  
  email: string;
  profileType: 'business' | 'investor';
  
  // All the onboarding fields
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