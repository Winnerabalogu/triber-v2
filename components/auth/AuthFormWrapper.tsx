"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';

interface AuthFormWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footerHref: string;
  footerLabel: string;
}

export default function AuthFormWrapper({
  title,
  description,
  children,
  footerHref,
  footerLabel,
}: AuthFormWrapperProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md border border-foreground/60">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        <CardFooter>
          <Button variant="link" className="w-full text-sm font-normal" asChild>
            <Link href={footerHref}>{footerLabel}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}