'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, MailCheck, Home, Loader2 } from 'lucide-react';
import type { WarrantyPlan } from '@/lib/types';

// Mock data for warranty plans
const mockPlans: Record<string, WarrantyPlan> = {
  essential: { id: 'essential', name: 'Essential Guard', priceMonthly: 9, priceAnnually: 99, duration: '1 Year', features: [] },
  premium: { id: 'premium', name: 'Premium Shield', priceMonthly: 19, priceAnnually: 199, duration: '3 Years', features: [] },
  ultimate: { id: 'ultimate', name: 'Ultimate Coverage', priceMonthly: 29, priceAnnually: 299, duration: '5 Years', features: [] },
};


function ConfirmationPageContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('planId');
  const purchasedPlan = planId ? mockPlans[planId] : null;

  // In a real app, user email would come from session or context
  const userEmail = "your.email@example.com"; 

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Card className="w-full max-w-lg shadow-xl p-6 md:p-8">
        <CardHeader className="items-center">
          <CheckCircle2 className="h-20 w-20 text-green-500 mb-6" />
          <CardTitle className="text-3xl md:text-4xl font-bold">Order Confirmed!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Thank you for choosing Surface Guard 365. Your countertop protection is now active.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 mt-6">
          {purchasedPlan && (
            <div className="border p-4 rounded-md bg-muted/50 text-left">
              <h3 className="text-xl font-semibold mb-1">{purchasedPlan.name}</h3>
              <p className="text-muted-foreground">Duration: {purchasedPlan.duration}</p>
              <p className="text-2xl font-bold text-primary mt-2">${purchasedPlan.priceAnnually} <span className="text-sm font-normal text-muted-foreground">/ year</span></p>
            </div>
          )}
          <div className="flex items-center justify-center p-4 border border-dashed rounded-md">
            <MailCheck className="h-8 w-8 text-primary mr-3" />
            <div>
              <p className="font-medium">A confirmation email has been sent to:</p>
              <p className="text-primary font-semibold">{userEmail}</p>
              <p className="text-xs text-muted-foreground">(Please check your spam folder if you don't see it.)</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Your warranty details and policy documents are included in the email. You can manage your warranty from your account dashboard (coming soon).
          </p>
        </CardContent>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </Button>
          {/* <Button asChild variant="outline" size="lg">
            <Link href="/account/warranty">View My Warranty (Coming Soon)</Link>
          </Button> */}
        </div>
      </Card>
    </div>
  );
}


export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
      <ConfirmationPageContent />
    </Suspense>
  )
}
