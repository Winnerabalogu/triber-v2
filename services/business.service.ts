import api from './api';
import { User } from '@/lib/types'; 

const USE_MOCK_API = true;

const MOCK_API_BUSINESS_RESPONSE = {
    id: 1,
    publicId: 'usr_mock_123',
    businessName: "Mock Industries Inc.",
    businessEmail: "mock@triber.com",
    businessPhone: "8001234567",
    businessLogoUrl: "https://placehold.co/128x128/3b82f6/FFFFFF/png?text=M",
    businessStatus: "REGISTERED",
    interestedIn: "EQUITY_INVESTMENT",
    industry: "SOFTWARE_TECHNOLOGY_B2B",
    numOfEmployees: "BETWEEN_10_AND_50",
    yearEstablished: 2020,
    location: "123 Mockingbird Lane, Tech City",
    description: "A leading mock company for testing and development purposes, specializing in innovative software solutions.",
    assets: "1500000",
    reportedSales: "5000000",
    businessStage: "Growth Stage",
    businessLegalEntity: "LIMITED_LIABILITY_COMPANY",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSuspended: false,
    businessVerificationStatus: true
};


class BusinessService {
  async createBusiness(businessData: { [key: string]: any }, logoFile?: File | null): Promise<any> {
     if (USE_MOCK_API) {
        console.log('[MOCK API] Simulating business creation with form data:', businessData);                
        const mockApiResponse = {
            id: Math.floor(Math.random() * 1000),
            publicId: `new_biz_${Date.now()}`,
            businessName: businessData.businessName,
            businessEmail: businessData.email, 
            businessPhone: businessData.phoneNumber,
            businessLogoUrl: "https://placehold.co/128x128/22c55e/FFFFFF/png?text=N",
            businessStatus: businessData.businessStatus,
            interestedIn: businessData.interest,
            industry: businessData.industry,
            numOfEmployees: businessData.employeeCount,
            yearEstablished: new Date().getFullYear(),
            location: businessData.businessAddress,
            description: businessData.businessDescription,
            assets: businessData.annualTurnover, 
            reportedSales: businessData.annualTurnover,
            businessStage: businessData.businessStatus, 
            businessLegalEntity: businessData.legalIdentity,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isSuspended: false,
            businessVerificationStatus: true
        };

        return new Promise(resolve => setTimeout(() => resolve(mockApiResponse), 1500));
    }

    console.log('[BusinessService] Creating new business');
    
    const params = new URLSearchParams();
    // Exclude file-related fields from query params
    const { logo, ...otherData } = businessData;
    for (const key in otherData) {
      if (otherData[key as keyof typeof otherData]) {
        params.append(key, otherData[key as keyof typeof otherData] as string);
      }
    }
    const url = `/businesses/save?${params.toString()}`;

    const formData = new FormData();
    if (logoFile) {
      formData.append('logo', logoFile);
    }
    
    const response = await api.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  async getMyBusinesses(): Promise<any[]> {
     if (USE_MOCK_API) {
        console.log('[MOCK API] Simulating getMyBusinesses...');
        // In the mock flow, the login action itself provides the user object,
        // but if this is ever called independently, we can return a default.
        return new Promise(resolve => setTimeout(() => resolve([MOCK_API_BUSINESS_RESPONSE]), 500));
    }

    console.log('[BusinessService] Fetching my businesses...');
    const response = await api.get('/businesses/my-businesses');
    return response.data.businesses;
  }

  async updateBusiness(businessId: string, updateData: { [key: string]: any }, logoFile?: File | null): 
  Promise<any> {

      if (USE_MOCK_API) {
        console.log(`[MOCK API] Simulating update for business ${businessId}`);
        return new Promise(resolve => setTimeout(() => resolve({
            ...MOCK_API_BUSINESS_RESPONSE,
            publicId: businessId,
            ...updateData
        }), 1000));
    }

    console.log(`[BusinessService] Updating business ${businessId}`);
    
    const params = new URLSearchParams();
    const { logo, ...otherData } = updateData;
    for (const key in otherData) {
        if (otherData[key as keyof typeof otherData]) {
            params.append(key, otherData[key as keyof typeof otherData] as string);
        }
    }
    const url = `/businesses/${businessId}?${params.toString()}`;
    
    const formData = new FormData();
    if (logoFile) {
        formData.append('logo', logoFile);
    }

    const response = await api.patch(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
}

export default new BusinessService();