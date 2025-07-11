"use server";
import { User, NotificationSettings } from '@/lib/types';
import axios from 'axios';



interface ForgotPasswordResult {
  success: boolean;
  message: string;
}
interface VerifyEmailResult {
  success: boolean;
  message: string;
}
interface LoginSuccessAction {
  success: true;
  token: string;
  user: User | null; 
}

interface LoginErrorAction {
  success: false;
  message: string;
}
interface SuccessAction {
  success: true;
  message: string;
  email: string;
}

interface ErrorAction {
  success: false;
  message: string;
}
interface ValidateOtpResult {
  success: boolean;
  message: string;
}

interface ResetPasswordResult {
  success: boolean;
  message: string;
}

const USE_MOCK_API = true;

// --- MOCK DATA ---
const MOCK_BUSINESS_USER: User = {
  id: 'usr_mock_123',
  businessName: "Mock Industries Inc.",
  email: "mock@triber.com",
  phoneNumber: "8001234567",
  businessAddress: "123 Mockingbird Lane, Tech City",
  businessStatus: "Operational",
  interest: "Seeking Funding",
  industry: "Fintech",
  employeeCount: "11-50",
  establishedDate: "1-3 years ago",
  businessDescription: "A mock company for testing and development purposes.",
  legalIdentity: "Limited Liability Company",
  profileType: 'business',
  isProfileComplete: true,
  notificationSettings: {
    'proposal-received': true, 'proposal-reviewed': true, 'message-received': true,
    'launches': true, 'updates': false, 'newsletter': false,
  },
  isFundabilityTestTaken: false, isDealRoomProfileComplete: false,
  isValuationComplete: false, isProposalProcessStarted: false,
};

const mapApiBusinessToAppUser = (apiBusiness: any): User => {
  const defaultSettings: NotificationSettings = {
    'proposal-received': true, 'proposal-reviewed': true, 'message-received': true,
    'launches': true, 'updates': false, 'newsletter': false,
  };

  return {
    id: apiBusiness.publicId,
    businessName: apiBusiness.businessName,
    email: apiBusiness.businessEmail,
    phoneNumber: apiBusiness.businessPhone,
    businessAddress: apiBusiness.location,
    businessStatus: apiBusiness.businessStatus,
    interest: apiBusiness.interestedIn,
    industry: apiBusiness.industry,
    employeeCount: apiBusiness.numOfEmployees,
    establishedDate: String(apiBusiness.yearEstablished),
    businessDescription: apiBusiness.description,
    legalIdentity: apiBusiness.businessLegalEntity,
    profileType: 'business',
    isProfileComplete: true,
    notificationSettings: apiBusiness.notificationSettings ?? defaultSettings,
    isFundabilityTestTaken: false, isDealRoomProfileComplete: false,
    isValuationComplete: false, isProposalProcessStarted: false,
  };
};
export type ActionResult = SuccessAction | ErrorAction;

export async function registerUser(previousState: ActionResult, formData: FormData): 
Promise<ActionResult> {  
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const businessName = formData.get('businessName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const profileType = formData.get('profileType') as 'business' | 'investor';
  
  if (!email || !password || (profileType === 'business' && !businessName) || (profileType === 'investor' && (!firstName || !lastName))) {
    return { success: false, message: "Please fill out all required fields." };
  }
  
  const payload = {
    firstName: profileType === 'investor' ? firstName : undefined,
    lastName: profileType === 'investor' ? lastName : undefined,
    companyName: profileType === 'business' ? businessName : undefined,
    email,
    password,
  };

  if (USE_MOCK_API) {
    console.log('[MOCK API] Simulating registration for:', email);
    return new Promise(resolve => setTimeout(() => resolve({
        success: true,
        message: "Mock registration successful! An OTP has been sent.",
        email: email
    }), 1000));
  }
    
 try {
    const realApiUrl = process.env.BACKEND_API_URL || 'http://localhost:8000/api/v2';
    await axios.post(`${realApiUrl}/users/register`, payload);
    
    return { 
      success: true, 
      message: "Registration successful! An OTP has been sent to your email.",
      email: email 
    };

  } catch (error: any) {
    console.error('[SERVER ACTION ERROR] registerUser:', error.response?.data || error.message);
        
    let errorMessage = "An unknown error occurred. Please try again.";
    if (error.response?.data?.detail) {        
        errorMessage = error.response.data.detail.map((e: any) => e.msg).join(' ');
    } else if (error.message) {        
        errorMessage = error.message;
    }

    return { success: false, message: errorMessage };
  }
}

export type LoginActionResult = LoginSuccessAction | LoginErrorAction;


export async function loginUser(previousState: LoginActionResult, formData: FormData): Promise<LoginActionResult> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, message: "Email and password are required." };
  }
   if (USE_MOCK_API) {
    console.log('[MOCK API] Simulating login for:', email);
    if (email.includes("new@")) {
      return new Promise(resolve => setTimeout(() => resolve({
          success: true, token: 'mock_jwt_for_new_user', user: null
      }), 1000));
    }
    return new Promise(resolve => setTimeout(() => resolve({
        success: true, token: 'mock_jwt_for_existing_user', user: MOCK_BUSINESS_USER
    }), 1000));
  }

  
  try {
    const realApiUrl = process.env.BACKEND_API_URL || 'http://localhost:8000/api/v2';
    
    const loginParams = new URLSearchParams();
    loginParams.append('username', email);
    loginParams.append('password', password);
    
    const tokenResponse = await axios.post(`${realApiUrl}/auth/login`, loginParams, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    const token = tokenResponse.data.access_token;
    
    const businessesResponse = await axios.get(`${realApiUrl}/businesses/my-businesses`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    const businesses = businessesResponse.data.businesses;
    
    if (businesses && businesses.length > 0) {        
        const appUser = mapApiBusinessToAppUser(businesses[0]);
        return {
            success: true,
            token: token,
            user: appUser
        };
    } else {        
        return {
            success: true,
            token: token,
            user: null
        };
    }

  } catch (error: any) {
    console.error('[SERVER ACTION ERROR] loginUser:', error.response?.data || error.message);
    const errorMessage = error.response?.data?.detail || "Invalid email or password.";
    return { success: false, message: errorMessage };
  }
}


export async function verifyEmailAction(previousState: VerifyEmailResult, formData: FormData): Promise<VerifyEmailResult> {
  const email = formData.get('email') as string;
  const otp = formData.get('otp') as string;
  
  if (!email || !otp || otp.length < 6) {
    return { success: false, message: "Please enter a valid 6-digit OTP." };
  }

  if (USE_MOCK_API) {
        console.log(`[MOCK API] Verifying OTP: ${otp}`);
        if (otp === '123456') { // Make '123456' the "magic" mock OTP
            return { success: true, message: "Email verified successfully!" };
        }
        return { success: false, message: "Invalid mock OTP. Use 123456." };
    }
    
  try {
    const realApiUrl = process.env.BACKEND_API_URL || 'http://localhost:8000/api/v2';
    await axios.post(`${realApiUrl}/auth/email-confirmation`, { email, code: otp });
    return { success: true, message: "Email verified successfully! Please log in." };
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Invalid or expired OTP.";
    return { success: false, message: errorMessage };
  }
}



export async function forgotPasswordAction(previousState: ForgotPasswordResult, formData: FormData): Promise<ForgotPasswordResult> {
  const email = formData.get('email') as string;
  if (!email) {
    return { success: false, message: "Please enter your email address." };
  }

  try {
    const realApiUrl = process.env.BACKEND_API_URL || 'http://localhost:8000/api/v2';
    await axios.post(`${realApiUrl}/auth/forgot-password`, { email });
    return { success: true, message: "Password reset code sent! Please check your email." };
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Could not process request. Please try again.";
    return { success: false, message: errorMessage };
  }
}

export async function validateResetOtpAction(previousState: ValidateOtpResult, formData: FormData): Promise<ValidateOtpResult> {
    const email = formData.get('email') as string;
    const otp = formData.get('otp') as string;
    
    // In a real API, you would have an endpoint like `/auth/validate-otp`
    // For this mock, we will just check if the OTP is '123456'.
    console.log(`[Server Action] Validating OTP ${otp} for ${email}`);
    
    if (otp === '123456') {
        return { success: true, message: "Code verified." };
    } else {
        return { success: false, message: "Invalid or expired code." };
    }
}

export async function resetPasswordAction(previousState: ResetPasswordResult, formData: FormData): Promise<ResetPasswordResult> {
  const email = formData.get('email') as string;
  const otp = formData.get('otp') as string;
  const newPassword = formData.get('newPassword') as string;

  if (!email || !otp || otp.length < 6 || !newPassword) {
    return { success: false, message: "Please fill out all fields correctly." };
  }

  try {
    const realApiUrl = process.env.BACKEND_API_URL || 'http://localhost:8000/api/v2';
    await axios.post(`${realApiUrl}/auth/reset-password`, { email, newPassword, otp });
    return { success: true, message: "Password reset successfully! You can now log in." };
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || "Invalid OTP or an error occurred.";
    return { success: false, message: errorMessage };
  }
}