"use client";

import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { User, NotificationSettings } from "@/lib/types";
import BusinessService from "@/services/business.service";
import Preloader from "@/components/ui/Preloader";

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
    businessStatus: apiBusiness.businessStatus,
    interest: apiBusiness.interestedIn,
    industry: apiBusiness.industry,
    employeeCount: apiBusiness.numOfEmployees,
    establishedDate: String(apiBusiness.yearEstablished),
    businessAddress: apiBusiness.location,
    businessDescription: apiBusiness.description,
    legalIdentity: apiBusiness.businessLegalEntity,
    profileType: 'business',
    isProfileComplete: true,
    notificationSettings: apiBusiness.notificationSettings ?? defaultSettings, 
    isFundabilityTestTaken: false, isDealRoomProfileComplete: false,
    isValuationComplete: false, isProposalProcessStarted: false,
  };
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (token: string, userProfile?: User | null) => void;
  logout: () => void;
  loadUserProfile: () => Promise<'profile_loaded' | 'needs_onboarding'>;
  refreshUserProfile: () => Promise<void>; 
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("user");
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) { console.error("Failed to parse auth data", error); }
    finally { setIsLoading(false); }
  }, []);

  const login = (newToken: string, userProfile: User | null = null) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
    if (userProfile) {
        setUser(userProfile);
        localStorage.setItem("user", JSON.stringify(userProfile));
    } else {
        setUser(null);
        localStorage.removeItem("user");
    }
  };

  const loadUserProfile = async (): Promise<'profile_loaded' | 'needs_onboarding'> => {
    try {
        const businesses = await BusinessService.getMyBusinesses();
        if (businesses && businesses.length > 0) {
            const primaryBusiness = businesses[0];
            const appUser = mapApiBusinessToAppUser(primaryBusiness);
            setUser(appUser);
            localStorage.setItem("user", JSON.stringify(appUser));
            return 'profile_loaded';
        } else {
            return 'needs_onboarding';
        }
    } catch (error) {
        console.error("Failed to load user profile:", error);
        throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  };
    const refreshUserProfile = async () => {
    if (!token) return;

    try {
      const response = await fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Failed to refresh user profile:", error);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    logout,
    loadUserProfile,
    refreshUserProfile,
    isLoggedIn: !!user && !!token && !!user.isProfileComplete,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <Preloader/> : children}
    </AuthContext.Provider>
  );
};