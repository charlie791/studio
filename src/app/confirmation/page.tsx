
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, MailCheck, Home, Loader2 } from 'lucide-react';
import type { WarrantyPlan } from '@/lib/types';

// Mock data for warranty plans - aligned with warranty/page.tsx
const mockPlans: Record<string, WarrantyPlan> = {
  core: { 
    id: 'core', 
    name: 'SurfaceGuard365 – Core', 
    priceMonthly: 74.75, 
    priceAnnually: 299, 
    duration: '5-Year Warranty', 
    features: [],
    icon: 'Shield',
  },
  'total-combo': { 
    id: 'total-combo', 
    name: 'SurfaceGuard365 – Total Combo Plan', 
    priceMonthly: 149.75, 
    priceAnnually: 599, 
    duration: '10-Year Countertop + Cabinet Warranty', 
    features: [],
    icon: 'Gem',
  },
  extended: { 
    id: 'extended', 
    name: 'SurfaceGuard365 – Extended', 
    priceMonthly: 124.75, 
    priceAnnually: 499, 
    duration: '10-Year Warranty', 
    features: [],
    icon: 'Zap',
  },
};


function ConfirmationPageContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('planId');
  const purchasedPlan = planId ? mockPlans[planId] : null;

  const userEmail = "your.email@example.com"; 

  return (
    <Card className="w-full max-w-lg shadow-xl p-6 md:p-8 bg-card text-card-foreground">
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
            <p className="text-2xl font-bold text-primary mt-2">
              4 Flex Payments of ${purchasedPlan.priceMonthly.toFixed(2)}
            </p>
            <p className="text-sm font-normal text-muted-foreground">
              Total: ${purchasedPlan.priceAnnually.toFixed(2)} (One-time charge)
            </p>
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
      </div>
    </Card>
  );
}


export default function ConfirmationPage() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-4 py-12">
      <Image
        src="https://igscountertops.b-cdn.net/kitchencabinets.now%20assets/Cabiets%20assets/ELITECRAFT%20Imperial%20Blue/imperial-blue-main-gallery-image-1.jpg"
        alt="Modern kitchen background"
        layout="fill"
        objectFit="cover"
        className="-z-10 filter brightness-75"
        data-ai-hint="kitchen cabinets"
        priority={false}
      />
      <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
        <ConfirmationPageContent />
      </Suspense>
    </div>
  )
}
