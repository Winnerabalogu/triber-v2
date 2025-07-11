"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFormState, useFormStatus } from "react-dom";
import { registerUser,ActionResult  } from "@/lib/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full py-3">
      {pending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {pending ? "Creating Account..." : "Sign Up"}
    </Button>
  );
}
interface RegisterFormProps {
  onTabChange: (tab: 'business' | 'investor') => void;
}

export default function RegisterForm({ onTabChange }: RegisterFormProps) {
  const router = useRouter();    
   const initialState: ActionResult = { success: false, message: "" };  
  const [state, formAction] = useFormState(registerUser, initialState);  

  useEffect(() => {
    if (state.success) {
      toast.success("Registration Successful!", {
        description: state.message,
      });      
      router.push(`/auth/verify-email?email=${state.email}`);
    }     
    else if (state.message) {
      toast.error("Registration Failed", {
        description: state.message,
      });
    }
  }, [state, router]);

  const [activeTab, setActiveTab] = useState<'business' | 'investor'>('business');  
  
  const handleTabClick = (tab: 'business' | 'investor') => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  const formVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Register a Triber account</h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button onClick={() => handleTabClick('business')} variant={activeTab === 'business' ? 'default' : 'outline'} className={cn("py-3 transition-all", activeTab === 'business' && "bg-primary text-primary-foreground")}>
          Business
        </Button>
        <Button onClick={() => handleTabClick('investor')} variant={activeTab === 'investor' ? 'default' : 'outline'} className={cn("py-3 transition-all", activeTab === 'investor' && "bg-primary text-primary-foreground")}>
          Investor
        </Button>
      </div>

      <form action={formAction} className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-4"
          >
            {activeTab === 'business' ? (
              <div>
               <label className="text-sm font-medium" htmlFor="businessName">Business Name</label>                
                <Input id="businessName" name="businessName" placeholder="e.g. Jumia" className="mt-1" required />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium" htmlFor="firstName">First Name</label>
                  <Input id="firstName" name="firstName" placeholder="Matthew" className="mt-1" required />
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="lastName">Last Name</label>
                  <Input id="lastName" name="lastName" placeholder="Akanbi" className="mt-1" required />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div>
           <label className="text-sm font-medium" htmlFor="email">Email</label>
          <Input id="email" name="email" type="email" placeholder="name@company.com" className="mt-1" required />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="password">Password</label>
          <Input id="password" name="password" type="password" placeholder="••••••••••" className="mt-1" required minLength={6} />
        </div>


        <div className="space-y-4 pt-2">
          <div className="flex items-start space-x-3">
              <Checkbox id="terms" required />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                  By signing up... <Link href="/terms" className="text-primary hover:underline">Terms of Use</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </label>
          </div>
          <div className="flex items-start space-x-3">
              <Checkbox id="newsletter" />
              <label htmlFor="newsletter" className="text-sm text-muted-foreground">
                  Email me about product updates and resources.
              </label>
          </div>
        </div>                        
       <SubmitButton />
      </form>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account? <Link href="/auth/login" className="text-primary hover:underline font-medium">Login here</Link>
      </div>
      
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Button variant="outline" className="w-full py-3">
            {/* Google Icon */}
            <svg className="w-4 h-4 mr-2" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.519-3.108-11.182-7.462l-6.571,4.819C9.656,39.663,16.318,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C41.38,36.783,44,30.836,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
            Sign up with Google
        </Button>
      </div>

    </div>
  );
}