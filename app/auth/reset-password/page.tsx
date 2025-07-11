"use client"

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { resetPasswordAction, validateResetOtpAction } from '@/lib/actions';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader2, CheckCircle } from 'lucide-react';
import AuthFormWrapper from '@/components/auth/AuthFormWrapper';
import { motion, AnimatePresence } from 'framer-motion';

function SubmitButton({ label, pendingLabel }: { label: string, pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? pendingLabel : label}
    </Button>
  );
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');    
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpValue, setOtpValue] = useState("");  
  const [otpState, otpFormAction] = useFormState(validateResetOtpAction, { success: false, message: "" });  
  const [resetState, resetFormAction] = useFormState(resetPasswordAction, { success: false, message: "" });
  
  useEffect(() => {
    if (otpState.success) {
      toast.success("Code Verified!", { description: "You can now set your new password." });
      setIsOtpVerified(true);
    } else if (otpState.message) {
      toast.error("Verification Failed", { description: otpState.message });
    }
  }, [otpState]);  
  useEffect(() => {
    if (resetState.success) {
      toast.success("Success!", { description: resetState.message });
      router.push('/auth/login');
    } else if (resetState.message) {
      toast.error("Reset Failed", { description: resetState.message });
    }
  }, [resetState, router]);
  
  if (!email) {
    return <div className="text-center p-10">Invalid page access. Email parameter is missing.</div>;
  }

  return (
     <AuthFormWrapper
      title="Reset Your Password"
      description={isOtpVerified ? "Enter your new password." : "First, enter the code sent to your email."}
      footerHref="/auth/login"
      footerLabel="Back to Login"
    >     
     {!isOtpVerified ? (
        <form action={otpFormAction} className="space-y-6">
            <input type="hidden" name="email" value={email} />
            <div className="space-y-2">
                <Label>Reset Code</Label>
                <InputOTP name="otp" maxLength={6} value={otpValue} onChange={setOtpValue}>
                    <InputOTPGroup className="w-full flex justify-center">
                        {[...Array(6)].map((_, i) => <InputOTPSlot key={i} index={i} />)}
                    </InputOTPGroup>
                </InputOTP>
            </div>
            <SubmitButton label="Verify Code" pendingLabel="Verifying..."/>
        </form>
     ) : (
        <form action={resetFormAction} className="space-y-6">
            <input type="hidden" name="email" value={email} />          
            <input type="hidden" name="otp" value={otpValue} />
            
            <div className="flex items-center justify-center gap-2 text-green-500 bg-green-500/10 p-3 rounded-md">
                <CheckCircle className="w-5 h-5"/>
                <p className="font-medium text-sm">Code Verified</p>
            </div>

            <AnimatePresence>
                <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                >
                    <Label htmlFor="newPassword">New Password</Label>          
                    <Input id="newPassword" name="newPassword" type="password" placeholder="••••••••" required />
                </motion.div>
            </AnimatePresence>
            <SubmitButton label="Reset Password" pendingLabel="Resetting..."/>
        </form>
     )}
    </AuthFormWrapper>
  );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ResetPasswordContent />
        </Suspense>
    )
}
