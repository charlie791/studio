
'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import type { WarrantyStep } from '@/lib/types';
import { PageLayout } from '@/components/layout/page-layout';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { PageTitle, BodyText } from '@/components/ui/typography';
import { CardHeader, CardContent } from '@/components/ui/card';
import WarrantyAccordionCard from '@/components/warranty-accordion-card';
import { Loader2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';


const warrantyFlowStepsData: WarrantyStep[] = [
  {
    id: 'total-combo-step',
    iconName: 'Gem',
    title: 'SurfaceGuard365 – Total Combo Plan',
    summary: 'Premium 10-Year Cabinet + Countertop Protection',
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
    iconName: 'Shield',
    title: 'Continue with Complimentary 30-Day Protection',
    summary: "Basic coverage with significant limitations",
    planId: 'free-30-day',
    isDeclineStep: true,
    ctaDeclineText: 'Keep 30-Day Plan',
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
    router.prefetch('/checkout');
    router.prefetch('/confirmation');
  }, [router]);

  const handleSeeCoverageOptions = () => {
    setStepViewActive(true);
  };

  const handleDecline = () => {
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
      <PageLayout className="flex flex-1 flex-col items-center justify-center py-8 sm:py-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </PageLayout>
    );
  }

  return (
    <PageLayout className="py-8 sm:py-12">
      <div className="container mx-auto max-w-4xl space-y-6 sm:space-y-8 flex flex-col items-center">
        {!stepViewActive && (
          <EnhancedCard className="w-full max-w-2xl text-center enhanced-card-mobile-margins animate-card-entrance p-0">
            <CardHeader className="p-6 sm:p-8 bg-gradient-to-br from-[#002455] to-[#003875] rounded-t-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                <PageTitle as="h1" className="!text-white !mb-3 z-10 relative leading-snug">
                    You’ve Been Matched with Custom Protection Plans
                </PageTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8">
              <BodyText className="text-gray-700 max-w-xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
                You’re about to activate your 30-day SurfaceGuard365 warranty. Before we finalize it, take a look at your extended protection options — including personalized 5- and 10-year plans built to cover your exact surfaces.
              </BodyText>
              <EnhancedButton
                onClick={handleSeeCoverageOptions}
                variant="primary"
                size="lg"
                className="w-full max-w-[320px] sm:max-w-xs mx-auto" 
              >
                <ArrowRight className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Review My Coverage Options
              </EnhancedButton>
            </CardContent>
          </EnhancedCard>
        )}

        {stepViewActive && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {warrantyFlowStepsData.map((step, index) => (
              <div key={step.id} className={cn(
                "flex justify-center", 
                step.isDeclineStep && "md:col-span-2 lg:col-span-3" 
              )}>
                <WarrantyAccordionCard
                  step={step}
                  onDecline={handleDecline}
                  defaultOpen={index === 0 && !!step.bestValue}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
