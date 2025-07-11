"use client"
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { forgotPasswordAction } from '@/lib/actions';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import AuthFormWrapper from '@/components/auth/AuthFormWrapper';
import Link from 'next/link';


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "Sending..." : "Send Reset Code"}
    </Button>
  );
}

export default function ForgotPasswordPage() {  
  const [email, setEmail] = useState('');
  const [state, formAction] = useFormState(forgotPasswordAction, { success: false, message: "" });

  useEffect(() => {
    if (state.success) {
      toast.success("Request Sent!", { description: state.message });      
    } else if (state.message) {
      toast.error("Request Failed", { description: state.message });
    }
  }, [state]);

  return (
    <AuthFormWrapper
      title="Forgot Your Password?"
      description="No problem. Enter your email and we'll send you a reset code."
      footerHref="/auth/login"
      footerLabel="Back to Login"
    >
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <SubmitButton />
      </form>
      <div className="text-center text-sm text-muted-foreground mt-4">
        Already have a code?{' '}
        <Link 
          href={`/auth/reset-password?email=${email}`} 
          className="text-primary hover:underline font-medium"
        >
          Reset your password here
        </Link>
      </div>
    </AuthFormWrapper>
  );
}

