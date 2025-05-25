
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Loader2 } from 'lucide-react';
import type { WarrantyStep } from '@/lib/types';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import WarrantyAccordionCard from '@/components/warranty-accordion-card';

const warrantyFlowStepsData: WarrantyStep[] = [
  {
    id: 'total-combo-step',
    iconName: 'Gem',
    title: 'SurfaceGuard365 – Total Combo Plan',
    summary: '10-Year Countertop + Cabinet Warranty', 
    priceMonthly: 149.75, 
    priceAnnually: 599, 
    planId: 'total-combo',
    bestValue: true, 
    isDeclineStep: false,
    ctaSelectText: 'Select Total Combo Plan',
    features: [
      { text: 'Complete Cabinet warranty protection', icon: 'CheckCircle' },
      { text: 'Full kitchen surface coverage — countertops, cabinets', icon: 'CheckCircle' },
      { text: 'Accidental damage protection (chips, cracks, stains)', icon: 'CheckCircle' },
      { text: 'Professional care kit', icon: 'CheckCircle' },
      { text: 'VIP 24/7 customer support line', icon: 'CheckCircle' },
      { text: 'Priority service response', icon: 'CheckCircle' },
      { text: 'Transferable for life of the plan', icon: 'CheckCircle' },
      { text: 'Upgrade incentives first day of coverage', icon: 'CheckCircle' },
      { text: 'Everything included in the Extended Plan', icon: 'CheckCircle' },
    ],
    specialOfferText: 'Best Value – Save 30% vs purchasing separately',
  },
  {
    id: 'extended-step',
    iconName: 'Zap',
    title: 'SurfaceGuard365 – Extended',
    summary: '10-Year Countertop Warranty + VIP Support', 
    priceMonthly: 124.75, 
    priceAnnually: 499, 
    planId: 'extended',
    isDeclineStep: false,
    ctaSelectText: 'Select Extended Plan',
    features: [
      { text: 'Comprehensive 10-Year Countertop coverage', icon: 'CheckCircle' },
      { text: 'Protection against heat marks and deep scratches', icon: 'CheckCircle' },
      { text: 'Includes accidental damage from common kitchen use', icon: 'CheckCircle' },
      { text: 'VIP priority customer support', icon: 'CheckCircle' },
      { text: 'Annual professional surface inspection eligibility', icon: 'CheckCircle' },
    ],
  },
  {
    id: 'core-step',
    iconName: 'Shield',
    title: 'SurfaceGuard365 – Core',
    summary: '5-Year Countertop Warranty',
    priceMonthly: 74.75,
    priceAnnually: 299,
    planId: 'core',
    isDeclineStep: false,
    ctaSelectText: 'Select Core Plan',
    features: [
      { text: 'Solid 5-Year Countertop protection', icon: 'CheckCircle' },
      { text: 'Covers common stains (coffee, wine, oil)', icon: 'CheckCircle' },
      { text: 'Protection against minor chips and cracks', icon: 'CheckCircle' },
      { text: 'Access to standard customer support', icon: 'CheckCircle' },
    ],
  },
  {
    id: 'decline-step',
    iconName: 'XCircle', 
    title: 'Continue with Complimentary 30-Day Protection',
    summary: "If a full plan isn't for you right now, your complimentary 30-day protection is already active. You can upgrade to a full plan anytime within the next 30 days.",
    isDeclineStep: true,
    ctaDeclineText: 'Keep Free 30-Day Plan',
    tooltipText: 'No immediate action needed. Consider upgrading later for long-term peace of mind.',
    features: [ 
        { text: 'Basic coverage for 30 days.', icon: 'CheckCircle'},
        { text: 'Option to upgrade to a full plan.', icon: 'CheckCircle'}
    ], 
  },
];

export default function WarrantyPage() {
  const [stepViewActive, setStepViewActive] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSeeCoverageOptions = () => {
    setStepViewActive(true);
  };

  const handleDecline = () => {
    console.log('User chose Free 30-Day Plan. Flagging lead for follow-up.');
    toast({
      title: 'Complimentary Protection Confirmed!',
      description: 'Your 30-day protection is active. You can upgrade anytime.',
      duration: 5000,
    });
    setTimeout(() => {
      router.push('/trade-in'); 
    }, 2000);
  };
  
  if (!isClient) {
    return (
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-4">
        <Image
            src="https://igscountertops.b-cdn.net/kitchencabinets.now%20assets/Cabiets%20assets/ELITECRAFT%20Imperial%20Blue/imperial-blue-main-gallery-image-1.jpg"
            alt="Modern kitchen background"
            fill={true}
            className="-z-10 filter brightness-75 object-cover"
            data-ai-hint="kitchen cabinets"
            priority={false}
        />
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative flex flex-1 flex-col items-center justify-start overflow-hidden pt-12 pb-8 px-4 md:px-6 lg:px-8 min-h-screen">
      <Image
        src="https://igscountertops.b-cdn.net/kitchencabinets.now%20assets/Cabiets%20assets/ELITECRAFT%20Imperial%20Blue/imperial-blue-main-gallery-image-1.jpg"
        alt="Modern kitchen background"
        fill={true}
        className="-z-10 filter brightness-75 object-cover"
        data-ai-hint="kitchen cabinets"
        priority={false}
      />
      <div className="relative z-10 w-full max-w-2xl mx-auto space-y-8 flex flex-col items-center">
        {!stepViewActive && (
          <Card className="w-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-xl">
            <CardHeader className="items-center text-center pt-8 pb-6 px-6 bg-gradient-to-br from-[#002455] to-[#003875] rounded-t-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-white z-10 relative leading-snug">
                You’re Eligible for Extended Protection
                <br />
                Peace of mind starts with your free 30-day warranty.
              </CardTitle>
              <CardDescription className="text-lg text-white max-w-xl mx-auto text-center mb-6 z-10 relative">
                You’ve activated your 30-day SurfaceGuard365 warranty. Now explore extended coverage options — including 5- and 10-year plans to keep your countertops and cabinets protected for years to come.
              </CardDescription>
              <Button 
                onClick={handleSeeCoverageOptions} 
                size="lg" 
                className="w-full bg-gradient-to-r from-[#002455] to-[#003875] text-primary-foreground hover:shadow-lg hover:shadow-[#002455]/40 hover:-translate-y-0.5 transition-all duration-300 py-3 text-base rounded-2xl relative overflow-hidden group h-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                View Extended Coverage Plans
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardHeader>
          </Card>
        )}

        {stepViewActive && (
          <div className="w-full space-y-6">
            {warrantyFlowStepsData.map((step, index) => (
              <WarrantyAccordionCard 
                key={step.id} 
                step={step} 
                onDecline={handleDecline}
                defaultOpen={index === 0 && !!step.bestValue} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
