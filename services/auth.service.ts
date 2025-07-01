import { AuthResponse, User } from '@/lib/types';
import api from './api';

// --- TYPES for this service ---
type RegisterPayload = {
  email: string;
  password?: string; 
  profileType: 'business' | 'investor';
  businessName?: string;
  firstName?: string;
  lastName?: string;
};

// --- MOCK DATABASE SIMULATION ---
// We will use localStorage to simulate a persistent user database.
// This allows a user to register, log out, and log back in with their created credentials.
const FAKE_DB_KEY = 'triber_users';
const DEMO_TOKEN = 'fake_jwt_token_for_development_12345';

//demo user until the API is ready
const demoUser: User = {
id: 'usr_12345',
firstName: 'Winner',
lastName: 'User',
email: 'winner@triber.com',
profileType: 'business',
businessName: 'Triber Inc.',
businessType: 'Startup',
businessStatus: 'Operational',
phoneNumber: '8123456789',
businessAddress: '123 Innovation Drive, Tech City',
companyType: 'Tech',
interest: 'Seeking Funding',
industry: 'Fintech',
establishedDate: '1-3 years ago',
employeeCount: '11-50',
legalIdentity: 'LLC',
annualTurnover: '500000',
fundingRequirement: '100000',
businessDescription: 'A pioneering platform connecting SMEs and startups with investors.',
isProfileComplete: false,
isFundabilityTestTaken: false,
isDealRoomProfileComplete: false,
isValuationComplete: false,
isProposalProcessStarted: false
};
class AuthService {
   constructor() {

    this.seedDemoUser(); 
  }
  // A helper to get all mock users from localStorage
  private getMockUsers(): Record<string, User> {
    try {
      const users = localStorage.getItem(FAKE_DB_KEY);
      return users ? JSON.parse(users) : {};
    } catch (e) {
      return {};
    }
  }


  // A helper to save the mock user database
  private saveMockUsers(users: Record<string, User>): void {
    localStorage.setItem(FAKE_DB_KEY, JSON.stringify(users));
  }
     
  private seedDemoUser(): void {
    // This should only run on the client-side
    if (typeof window !== 'undefined') {
        const users = this.getMockUsers();
        // If the demo user doesn't exist, add them.
        if (!users[demoUser.id]) {
            users[demoUser.id] = demoUser;
            this.saveMockUsers(users);
            console.log('[AuthService] Demo user seeded into mock database.');
        }
    }
  }
  // --- AUTHENTICATION METHODS ---
  async login(email: string, _pass: string): Promise<AuthResponse> {
    console.log(`[AuthService] Attempting login for ${email}`);
    
    // ** MOCK API LOGIC **
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = this.getMockUsers();
        const user = Object.values(users).find(u => u.email === email);
        
         // --- UPDATED ERROR HANDLING ---
        // password: `&& checkPassword(pass, user.passwordHash)`
        if (!user) {
          console.error("[AuthService] Login failed: User not found.");
          // Reject with a more helpful error message
          const errorMessage = `Invalid credentials. Try our demo account: demo@triber.com / password`;
          return reject(new Error(errorMessage));
        }
        
        console.log("[AuthService] Login successful.");
        resolve({
          token: DEMO_TOKEN,
          user: user,
        });
      }, 1000); 
    });

    // ** REAL API CALL **
    // const response = await api.post('/auth/login', { email, password });
    // return response.data;
  }

  async register(data: RegisterPayload): Promise<AuthResponse> {
    console.log('[AuthService] Attempting to register user:', data);

    // ** MOCK API LOGIC **
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = this.getMockUsers();

        // Simulate email already exists error
        if (Object.values(users).some(u => u.email === data.email)) {
          console.error("[AuthService] Registration failed: Email already exists.");
          return reject(new Error('An account with this email already exists.'));
        }

        const newUser: User = {
          id: `usr_${Date.now()}`,
          email: data.email,
          profileType: data.profileType,
          // Set initial values based on profile type
          businessName: data.profileType === 'business' ? data.businessName : undefined,
          firstName: data.profileType === 'investor' ? data.firstName : undefined,
          lastName: data.profileType === 'investor' ? data.lastName : undefined,
          // Default all completion flags to false for a new user
          isProfileComplete: false,
          isFundabilityTestTaken: false,
          isDealRoomProfileComplete: false,
          isValuationComplete: false,
          isProposalProcessStarted: false,
        };
        
        // "Save" the new user to our mock database
        users[newUser.id] = newUser;
        this.saveMockUsers(users);

        console.log("[AuthService] Registration successful. New user created:", newUser);
        resolve({
          token: DEMO_TOKEN,
          user: newUser,
        });
      }, 1000);
    });

    // ** REAL API CALL **
    // const response = await api.post('/auth/register', data);
    // return response.data;
  }
   async uploadProfilePicture(userId: string, file: File): Promise<string> {
    console.log(`[AuthService] Uploading new profile picture for user ${userId}:`, file.name);

    // ** REAL API CALL (when ready) **
    // const formData = new FormData();
    // formData.append('avatar', file);
    // const response = await api.post(`/users/${userId}/avatar`, formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' }
    // });
    // return response.data.avatarUrl;

    // ** MOCK API CALL (for now) **
    // We'll just return a placeholder URL to simulate a successful upload.
    return new Promise((resolve) => {
        setTimeout(() => {
            const newAvatarUrl = "/placeholder.svg?height=128&width=128&text=New";
            console.log("[AuthService] Mock upload successful. New URL:", newAvatarUrl);
            resolve(newAvatarUrl);
        }, 1500);
    });
  }
  async updateUserProfile(user: User, onboardingData: any): Promise<User> {
    console.log("[AuthService] Updating user profile with onboarding data:", onboardingData);
    
    // ** MOCK API LOGIC **
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser: User = {
          ...user,
          ...onboardingData,
          isProfileComplete: true, 
        };
        
        // "Update" the user in our mock database
        const users = this.getMockUsers();
        users[user.id] = updatedUser;
        this.saveMockUsers(users);
        
        console.log("[AuthService] Profile update successful. Updated user:", updatedUser);
        resolve(updatedUser);
      }, 500);
    });

    

    // ** REAL API CALL **
    // const response = await api.put(`/users/${user.id}`, onboardingData);
    // return response.data.user;
  }
    async verifyCurrentPassword(password: string): Promise<boolean> {
    console.log("[AuthService] Verifying current password...");
    // MOCK LOGIC: In a real app, you'd compare this against a hash.
    // For our demo, we'll pretend 'password123' is the correct current password.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password === 'password123') {
          console.log("[AuthService] Current password verified.");
          resolve(true);
        } else {
          console.error("[AuthService] Current password verification failed.");
          reject(new Error("The current password you entered is incorrect."));
        }
      }, 1000);
    });
  }
   async updatePassword(newPassword: string): Promise<{ success: boolean }> {
    console.log(`[AuthService] Updating password to: ${newPassword}`);
    // MOCK LOGIC: This would be a PATCH/PUT request to your API.
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("[AuthService] Password updated successfully on server.");
        resolve({ success: true });
      }, 1000);
    });
  }
}

export default new AuthService();