import api from './api';

class AuthService {
  async register(data: { [key: string]: any }): Promise<any> {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      companyName: data.companyName || data.businessName,
      password: data.password,
    };
    console.log('[AuthService] Registering with API:', payload);
    const response = await api.post('/users/register', payload);
    return response.data;
  }

  async login(email: string, pass: string): Promise<string> {
    console.log(`[AuthService] Logging in for ${email}`);
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', pass);
    
    const response = await api.post('/auth/login', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data.access_token;
  }

  async confirmEmail(email: string, code: string): Promise<string> {
    const response = await api.post('/auth/email-confirmation', { email, code });
    return response.data;
  }

  async resendOtp(email: string): Promise<string> {
    const response = await api.post('/auth/resend-otp', { email });
    return response.data;
  }
  
  async forgotPassword(email: string): Promise<string> {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  }

  async resetPassword(email: string, newPassword: string, otp: string): Promise<string> {
    const response = await api.post('/auth/reset-password', { email, newPassword, otp });
    return response.data;
  }
}

export default new AuthService();