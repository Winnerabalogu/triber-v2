"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Preloader from '@/components/ui/Preloader';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {    
    if (!isLoading) {      
      if (!isLoggedIn) {
        router.replace('/auth/login');
      }
    }
  }, [isLoading, isLoggedIn, router]);
  
  if (isLoading || !isLoggedIn) {
    return <Preloader />;
  }
  
  return <>{children}</>;
}