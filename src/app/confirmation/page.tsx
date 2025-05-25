
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, MailCheck, Home, Loader2 } from 'lucide-react';
import type { WarrantyPlan } from '@/lib/types';

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
    <Card className="w-full max-w-lg p-6 md:p-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-xl">
      <CardHeader className="items-center text-center pt-6 px-6 pb-4 bg-gradient-to-br from-[#002455] to-[#003875] rounded-t-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        <CheckCircle2 className="h-20 w-20 text-green-400 mb-6 z-10 relative" />
        <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-white z-10 relative">Order Confirmed!</CardTitle>
        <CardDescription className="text-base text-white/90 mt-2 z-10 relative">
          Thank you for choosing Surface Guard 365. Your countertop protection is now active.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 mt-6 px-6 pt-6 pb-4">
        {purchasedPlan && (
          <div className="border p-4 rounded-md bg-muted/50 text-left">
            <h3 className="text-xl font-semibold mb-1 text-gray-800">{purchasedPlan.name}</h3>
            <p className="text-muted-foreground">Duration: {purchasedPlan.duration}</p>
            <p className="text-2xl font-bold text-primary mt-2">
              4 Flex Payments of ${purchasedPlan.priceMonthly.toFixed(2)}
            </p>
            <p className="text-sm font-normal text-muted-foreground">
              Total: ${purchasedPlan.priceAnnually.toFixed(2)} (One-time charge)
            </p>
          </div>
        )}
        <div className="flex items-center justify-center p-4 border border-dashed rounded-md text-gray-700">
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
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center px-6 pb-6">
        <Button 
          asChild 
          size="lg" 
          className="w-full bg-gradient-to-r from-[#002455] to-[#003875] text-primary-foreground hover:shadow-lg hover:shadow-[#002455]/40 hover:-translate-y-0.5 transition-all duration-300 py-3 text-base font-semibold rounded-2xl relative overflow-hidden group h-auto"
        >
          <Link href="/">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
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
        fill={true}
        className="-z-10 filter brightness-75 object-cover"
        data-ai-hint="kitchen cabinets"
        priority={false}
      />
      <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
        <ConfirmationPageContent />
      </Suspense>
    </div>
  )
}
