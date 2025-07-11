"use client";

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { User, NotificationSettings } from "@/lib/types";
import Preloader from "@/components/ui/Preloader";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;  
  login: (token: string, user: User) => void; 
  logout: () => void;
  isLoggedIn: boolean;
  refreshUserProfile: () => Promise<void>;  
  updateNotificationSettings: (newSettings: NotificationSettings) => void;
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
    } catch (error) {
      console.error("Failed to parse auth data from storage", error);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };
  
  // --- Function to handle settings updates ---
  const updateNotificationSettings = (newSettings: NotificationSettings) => {
    if (!user || !token) return;

    const updatedUser = { ...user, notificationSettings: newSettings };    
    login(token, updatedUser);
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
    isLoggedIn: !!user && !!token,
    refreshUserProfile,
    updateNotificationSettings, 
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <Preloader/> : children}
    </AuthContext.Provider>
  );
};