
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Loader2 } from 'lucide-react';
import type { WarrantyStep } from '@/lib/types';
import { useState, useEffect } from 'react';
import WarrantyOptionCard from '@/components/warranty-option-card';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const warrantyFlowStepsData: WarrantyStep[] = [
  {
    id: 'core-step',
    iconName: 'Shield',
    title: 'SurfaceGuard365 – Core',
    summary: '5-Year Countertop Warranty. Protection against common stains and minor chips.',
    priceMonthly: 74.75,
    priceAnnually: 299,
    planId: 'core',
    isDeclineStep: false,
    ctaNextText: 'See Next Option',
  },
  {
    id: 'total-combo-step',
    iconName: 'Gem',
    title: 'SurfaceGuard365 – Combo',
    summary: '10-Year Countertop + Cabinet Warranty. Comprehensive coverage including accidental damage.',
    priceMonthly: 149.75,
    priceAnnually: 599,
    planId: 'total-combo',
    bestValue: true,
    isDeclineStep: false,
    ctaNextText: 'See Next Option',
  },
  {
    id: 'extended-step',
    iconName: 'Zap',
    title: 'SurfaceGuard365 – Extended',
    summary: '10-Year Countertop Warranty. Includes heat marks, scratches, and VIP support.',
    priceMonthly: 124.75,
    priceAnnually: 499,
    planId: 'extended',
    isDeclineStep: false,
    ctaNextText: 'See Final Option',
  },
  {
    id: 'decline-step',
    iconName: 'XCircle',
    title: 'Final Option: Decline Full Coverage',
    summary: "If a full plan isn't for you right now, you can opt for our complimentary 30-day protection.",
    isDeclineStep: true,
    ctaDeclineText: 'Choose Free 30-Day Plan',
    tooltipText: 'You can upgrade to a full plan anytime within the next 30 days.',
  },
];

export default function WarrantyPage() {
  const [stepViewActive, setStepViewActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSeeCoverageOptions = () => {
    setStepViewActive(true);
  };

  const handleViewNext = () => {
    if (currentStepIndex < warrantyFlowStepsData.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleDecline = () => {
    console.log('User chose Free 30-Day Plan. Flagging lead for follow-up.');
    toast({
      title: 'Complimentary Protection Activated!',
      description: 'Your 30-day protection is now active. You can upgrade anytime.',
      duration: 5000,
    });
    // Optionally, redirect to trade-in or another page after a delay
    setTimeout(() => {
      router.push('/trade-in'); // Example: redirect to trade-in page
    }, 2000);
  };
  
  // Animation key to force re-render of card for simple "boom" effect
  const animationKey = `step-${currentStepIndex}`;

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
      <div className="relative z-10 w-full max-w-3xl mx-auto space-y-8 flex flex-col items-center">
        {!stepViewActive && (
          <Card className="w-full shadow-lg text-center border-[6px] border-primary">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-card-foreground">
                You’re Eligible for Extended Protection
                <br />
                Peace of mind starts with your free 30-day warranty.
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <CardDescription className="text-lg text-card-foreground max-w-2xl mx-auto">
                You’ve activated your 30-day SurfaceGuard365 warranty. Now explore extended coverage options — including 5- and 10-year plans to keep your countertops and cabinets protected for years to come.
              </CardDescription>
              <Button 
                onClick={handleSeeCoverageOptions} 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground py-3 px-6 text-lg mt-6"
              >
                View Extended Coverage Plans
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        )}

        {stepViewActive && (
          <div key={animationKey} className="w-full flex justify-center animate-slideUpFadeIn">
            <WarrantyOptionCard
              step={warrantyFlowStepsData[currentStepIndex]}
              onViewNext={currentStepIndex < warrantyFlowStepsData.length - 1 ? handleViewNext : undefined}
              onDecline={handleDecline}
            />
          </div>
        )}
      </div>
    </div>
  );
}
