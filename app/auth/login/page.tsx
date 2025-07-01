"use client"

import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {  
  const loginImageSrc = "/auth/business.png?q=80&w=1932&auto=format&fit=crop";

  return (   
    <AuthLayout imageSrc={loginImageSrc}>
      <LoginForm />
    </AuthLayout>
  );
}