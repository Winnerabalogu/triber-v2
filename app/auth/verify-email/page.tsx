"use client"

import { useEffect, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { verifyEmailAction } from '@/lib/actions';
import AuthService from '@/services/auth.service';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import AuthFormWrapper from '@/components/auth/AuthFormWrapper';
import { Loader2 } from 'lucide-react';


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "Verifying..." : "Verify Account"}
    </Button>
  );
}

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [state, formAction] = useFormState(verifyEmailAction, { success: false, message: "" });  
  const [isResending, setIsResending] = useState(false);  
  useEffect(() => {
    if (state.success) {
      toast.success("Success!", { description: state.message });
      router.push('/auth/login');
    } else if (state.message) {
      toast.error("Verification Failed", { description: state.message });
    }
  }, [state, router]);
  
  const handleResend = async () => {
    if (!email) return;
    setIsResending(true);
    try {
      await AuthService.resendOtp(email);
      toast.info("A new OTP has been sent to your email.");
    } catch (error: any) {
      toast.error("Failed to Resend", { description: error.message });
    } finally {
      setIsResending(false);
    }
  };
  
  if (!email) {
    return <div className="text-center p-10">Invalid page access. Email parameter is missing.</div>;
  }

  return (
    <AuthFormWrapper
      title="Verify Your Email"
      description={`We've sent a 6-digit code to ${email}. Please enter it below.`}
      footerHref="/auth/register"
      footerLabel="Need to create a different account?"
    >      
      <form action={formAction} className="space-y-6">        
        <input type="hidden" name="email" value={email} />        
        <InputOTP name="otp" maxLength={6}>
          <InputOTPGroup className="w-full flex justify-center">
            {[...Array(6)].map((_, i) => <InputOTPSlot key={i} index={i} />)}
          </InputOTPGroup>
        </InputOTP>

        <SubmitButton />
        
        <div className="text-center text-sm">
          <p className="text-muted-foreground">Didn't receive a code?{' '}
            <Button variant="link" type="button" onClick={handleResend} disabled={isResending} className="p-0 h-auto">
              {isResending ? 'Sending...' : 'Resend OTP'}
            </Button>
          </p>
        </div>
      </form>
    </AuthFormWrapper>
  );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    )
}