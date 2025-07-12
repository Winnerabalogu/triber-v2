"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { useAuth } from "@/contexts/AuthContext";
import { loginUser, LoginActionResult } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Preloader from "@/components/ui/Preloader";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full py-3" disabled={pending}>
      {pending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {pending ? "Signing In..." : "Login"}
    </Button>
  );
}

export default function LoginForm() {
  const { login, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const initialState: LoginActionResult = { success: false, message: "" };
  const [state, formAction] = useFormState(loginUser, initialState);

  useEffect(() => {
    if (state.success) {      
      login(state.token, state.user); 
      
      if (state.user) {        
        toast.success("Welcome back!");
        router.push('/dashboard');
      } else {        
        toast.info("Welcome! Let's get your profile set up.");
        router.push('/auth/onboarding');
      }
    } else if (state.message) {
      toast.error("Login Failed", { description: state.message });
    }
  }, [state, login, router]);

  if (authLoading) {
    return <Preloader/>;
  }
      
  return (
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground mt-2">Enter your credentials to access your account.</p>
      </div>

      <form action={formAction} className="space-y-4">
        <div>
          <label className="text-sm font-medium" htmlFor="email">Email</label>          
          <Input id="email" name="email" type="email" placeholder="name@company.com" className="mt-1" required />
        </div>
        <div>
          {/* --- FIX APPLIED HERE: Added a flex container for label and link --- */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium" htmlFor="password">Password</label>
            
          </div>
          <Input id="password" name="password" type="password" placeholder="••••••••••" className="mt-1" required />
        </div>      
        <Link href="/auth/forgot-password" className="text-sm font-medium text-primary hover:underline">
              Forgot password?
            </Link>          
        <SubmitButton />
      </form>
      
      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/auth/register"
          className="text-primary hover:underline font-medium"
        >
          Register here
        </Link>
      </div>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>

      {/* Google Sign In */}
      <Button variant="outline" className="w-full py-3">
        <svg className="w-4 h-4 mr-2" viewBox="0 0 48 48">
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          ></path>
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.519-3.108-11.182-7.462l-6.571,4.819C9.656,39.663,16.318,44,24,44z"
          ></path>
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C41.38,36.783,44,30.836,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
        </svg>
        Sign in with Google
      </Button>
    </div>
  );
}
