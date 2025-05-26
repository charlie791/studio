
'use client';

import { Button } from '@/components/ui/button'; // Keep for potential internal use by other components
import { Loader2, ArrowRight } from 'lucide-react';
import type { WarrantyStep } from '@/lib/types';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import WarrantyAccordionCard from '@/components/warranty-accordion-card';
import { PageLayout } from '@/components/layout/page-layout';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { PageTitle, BodyText } from '@/components/ui/typography';
import { CardHeader, CardContent } from '@/components/ui/card';


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
    summary: "Basic coverage with significant limitations",
    planId: 'free-30-day',
    isDeclineStep: true,
    ctaDeclineText: 'Keep Free 30-Day Plan',
    tooltipText: 'You can upgrade anytime within the next 30 days.',
    features: [
        { text: "Basic 30-day coverage only", included: true, icon: 'CheckCircle' },
        { text: "No long-term warranty protection", included: false, icon: 'XCircle' },
        { text: "No professional care kit included", included: false, icon: 'XCircle' },
        { text: "No VIP customer support", included: false, icon: 'XCircle' },
        { text: "No priority service response", included: false, icon: 'XCircle' },
        { text: "No transferable benefits", included: false, icon: 'XCircle' }
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
      description: 'Your 30-day protection is active. You will be redirected to confirm.',
      duration: 5000,
    });
    setTimeout(() => {
      router.push('/confirmation?planId=free-30-day');
    }, 2000);
  };

  if (!isClient) {
    return (
      <PageLayout className="flex flex-1 flex-col items-center justify-center p-4">
        <Loader2 className="h-12 w-12 animate-spin text-[#002455]" />
      </PageLayout>
    );
  }

  return (
    <PageLayout className="py-12 px-4">
      <div className="container mx-auto max-w-4xl space-y-8 flex flex-col items-center">
        {!stepViewActive && (
          <EnhancedCard className="w-full max-w-2xl text-center p-8 md:p-10 animate-card-entrance">
            <CardHeader className="items-center pb-6 px-0 pt-0">
              <PageTitle as="h1" className="text-[#002455] !mb-4 !text-3xl md:!text-4xl leading-snug">
                You’ve Been Matched with Custom Protection Plans
              </PageTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <BodyText className="!text-lg text-[#6b7280] max-w-xl mx-auto mb-8">
                You’re about to activate your free 30-day SurfaceGuard365 warranty. Before we finalize it, take a look at your extended protection options — including personalized 5- and 10-year plans built to cover your exact surfaces.
              </BodyText>
              <EnhancedButton
                onClick={handleSeeCoverageOptions}
                variant="primary"
                size="lg"
                className="w-full max-w-xs" 
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                Review My Coverage Options
              </EnhancedButton>
            </CardContent>
          </EnhancedCard>
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
    </PageLayout>
  );
}
