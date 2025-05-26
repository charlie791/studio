
'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, MailCheck, Home, Loader2, Send, ShoppingCart, Check, AlertTriangle, Tag 
} from 'lucide-react';
import type { WarrantyPlan } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { PageLayout } from '@/components/layout/page-layout';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { PageTitle, SectionTitle, BodyText, CardTitleText, SmallText } from '@/components/ui/typography';
import { CardHeader, CardContent, CardFooter } from '@/components/ui/card'; // Standard Card parts
import { Separator } from '@/components/ui/separator';


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
  'free-30-day': {
    id: 'free-30-day',
    name: 'Complimentary 30-Day Protection',
    priceMonthly: 0,
    priceAnnually: 0,
    duration: '30 Days Only • Limited Benefits',
    features: [],
    icon: 'Shield',
  },
};

function OrderDetailsSectionFree({ userEmail, plan }: { userEmail: string; plan: WarrantyPlan }) {
  return (
    <div className="bg-[#002455]/5 border-2 border-[#002455]/10 rounded-2xl p-6 mb-8">
      <CardTitleText as="h2" className="!text-xl text-[#002455] !mb-2">
        {plan.name}
      </CardTitleText>
      <BodyText className="text-[#6b7280] !mb-5">
        {plan.duration}
      </BodyText>
      
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-5 text-center">
        <MailCheck className="w-8 h-8 text-[#002455] mx-auto mb-3" />
        <BodyText className="text-gray-700 font-semibold !mb-1">
          A confirmation email has been sent to:
        </BodyText>
        <BodyText className="text-[#002455] !text-lg font-bold !mb-2">
          {userEmail}
        </BodyText>
        <SmallText className="text-gray-500 italic">
          (Please check your spam folder if you don't see it.)
        </SmallText>
      </div>
    </div>
  );
}

function TradeInOfferSection({ 
  projectNotes, 
  onNotesChange, 
  onSubmit, 
  isSubmitting 
}: {
  projectNotes: string;
  onNotesChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  return (
    <div className="text-center">
      <Badge 
        variant="secondary" 
        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FDA001] to-[#cc8001] text-white px-6 py-3 text-lg font-bold rounded-full mb-6 animate-pulsate-attention shadow-lg shadow-[#FDA001]/40 hover:animate-none"
      >
        <Tag className="w-6 h-6" />
        Exclusive Trade-In Offer!
      </Badge>
      
      <SectionTitle as="h2" className="!text-3xl text-[#002455] !mb-4 leading-tight">
        Ready to Upgrade Your Surfaces?
      </SectionTitle>
      <BodyText className="text-[#6b7280] !text-lg leading-relaxed mb-8 max-w-md mx-auto">
        Since you chose minimal protection, we're guessing you might be planning something bigger! 
        Let us help you get the kitchen of your dreams with fantastic trade-in values on beautiful new countertops.
      </BodyText>
      
      <div className="mb-8 text-left">
        <label htmlFor="project-notes" className="block text-base font-semibold text-gray-700 mb-3">
          Tell us about your project (Optional)
        </label>
        <Textarea
          id="project-notes"
          placeholder="What are you thinking? Current countertop material, dream surface, timeline, budget range, or any other details..."
          value={projectNotes}
          onChange={(e) => onNotesChange(e.target.value)}
          className="min-h-[120px] resize-none border-2 focus:border-[#002455] focus:ring-[#002455]/20 bg-white/80 focus:bg-white transition-all text-foreground"
          rows={4}
        />
      </div>
      
      <div className="space-y-4">
        <EnhancedButton 
          onClick={onSubmit}
          disabled={isSubmitting}
          variant="primary"
          size="lg"
          className="w-full"
        >
          <Send className="w-5 h-5 mr-3" />
          {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Get My Free Trade-In Quote'}
        </EnhancedButton>
        
        <EnhancedButton 
          variant="secondary"
          size="md" // Secondary button typically a bit smaller
          asChild
          className="w-full"
        >
          <a href="https://contractorsource.com/product-selection/" target="_blank" rel="noopener noreferrer">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Browse All Countertops
          </a>
        </EnhancedButton>
      </div>
    </div>
  );
}


function ConfirmationPageContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('planId');
  const purchasedPlan = planId ? mockPlans[planId] : null;
  const { toast } = useToast();
  const [projectNotes, setProjectNotes] = useState('');
  const [isSubmittingTradeIn, setIsSubmittingTradeIn] = useState(false);

  const userEmail = "your.email@example.com"; // Placeholder

  async function handleTradeInSubmit() {
    setIsSubmittingTradeIn(true);
    console.log('Trade-In Interest Notes:', projectNotes);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: 'Interest Submitted!',
      description: "Thanks for your interest in our trade-in offer. We'll be in touch if any follow-up is needed!",
    });
    setProjectNotes('');
    setIsSubmittingTradeIn(false);
  }


  if (!purchasedPlan) {
    return (
      <EnhancedCard warning className="w-full max-w-lg p-6 md:p-8 text-center animate-card-entrance">
        <CardHeader className="items-center pt-6 px-6 pb-4">
            <PageTitle as="h1" className="!text-3xl md:!text-4xl text-destructive">Invalid Plan</PageTitle>
        </CardHeader>
        <CardContent>
            <BodyText className="text-center text-destructive py-4">No plan details found. Please try again or contact support.</BodyText>
            <EnhancedButton variant="primary" size="lg" className="w-full mt-4" asChild>
                <Link href="/warranty">Choose a Plan</Link>
            </EnhancedButton>
        </CardContent>
      </EnhancedCard>
    );
  }

  const isFreePlan = purchasedPlan.id === 'free-30-day';

  if (isFreePlan) {
    return (
        <div className="w-full max-w-lg animate-slide-up"> {/* This wrapper might be redundant if PageLayout handles centering */}
          <EnhancedCard className="animate-card-entrance"> {/* Removed specific bg/border as EnhancedCard handles it */}
            <CardHeader className="relative bg-gradient-to-br from-[#002455] to-[#003875] p-8 md:p-10 text-center overflow-hidden rounded-t-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              
              <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mx-auto mb-6 flex items-center justify-center animate-success-pulse shadow-lg shadow-emerald-500/40">
                <Check className="w-9 h-9 text-white animate-check-draw" strokeWidth={3} />
              </div>
              
              <h1 className="text-3xl font-extrabold text-white mb-4 relative z-10"> {/* Changed to h1 for semantic Page Title */}
                Order Confirmed!
              </h1>
              <p className="text-white/90 text-lg leading-relaxed relative z-10">
                Thank you for choosing your complimentary Surface Guard 365. Your countertop protection is now active.
              </p>
            </CardHeader>

            <CardContent className="p-6 md:p-8">
              <OrderDetailsSectionFree userEmail={userEmail} plan={purchasedPlan} />
              
              <Separator className="my-8 bg-gray-300" />
              
              <TradeInOfferSection 
                projectNotes={projectNotes}
                onNotesChange={setProjectNotes}
                onSubmit={handleTradeInSubmit}
                isSubmitting={isSubmittingTradeIn}
              />
              
              <div className="mt-6 p-4 bg-[#002455]/5 rounded-xl text-center">
                <SmallText className="text-gray-600 leading-relaxed">
                  Your warranty details and policy documents are included in the email. 
                  You can manage your warranty from your account dashboard (coming soon).
                </SmallText>
              </div>
            </CardContent>
          </EnhancedCard>
        </div>
    );
  }

  // Fallback for Paid Plans (existing logic adapted to new components)
  return (
    <EnhancedCard className="w-full max-w-lg animate-card-entrance">
      <CardHeader className="items-center text-center pt-6 px-6 pb-4 bg-gradient-to-br from-[#002455] to-[#003875] rounded-t-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        <CheckCircle2 className="h-20 w-20 text-green-400 mb-6 z-10 relative" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white z-10 relative">Order Confirmed!</h1>
        <p className="text-white/90 text-base mt-2 z-10 relative">
            Thank you for choosing Surface Guard 365. Your countertop protection is now active.
        </p>
      </CardHeader>
      <CardContent className="space-y-6 mt-6 px-6 pt-6 pb-4">
        <div className="border p-4 rounded-md bg-muted/30 text-left"> {/* Lightened bg */}
          <CardTitleText as="h3" className="!text-xl text-[#002455] !mb-1">{purchasedPlan.name}</CardTitleText>
          <BodyText className="text-muted-foreground">Duration: {purchasedPlan.duration}</BodyText>
          <p className="text-2xl font-bold text-[#002455] mt-2">
            4 Flex Payments of ${purchasedPlan.priceMonthly.toFixed(2)}
          </p>
          <SmallText className="font-normal text-muted-foreground">
            Total: ${purchasedPlan.priceAnnually.toFixed(2)}
          </SmallText>
        </div>

        <div className="flex items-center justify-center p-4 border border-dashed rounded-md">
          <MailCheck className="h-8 w-8 text-[#002455] mr-3" />
          <div>
            <BodyText className="font-medium">A confirmation email has been sent to:</BodyText>
            <BodyText className="text-[#002455] font-semibold">{userEmail}</BodyText>
            <SmallText className="text-xs text-muted-foreground">(Please check your spam folder if you don't see it.)</SmallText>
          </div>
        </div>
        <SmallText className="pt-2 text-muted-foreground">
          Your warranty details and policy documents are included in the email. You can manage your warranty from your account dashboard (coming soon).
        </SmallText>
      </CardContent>
      <CardFooter className="flex justify-center px-6 pb-6 pt-4">
          <EnhancedButton
            asChild
            variant="primary"
            size="lg"
            className="w-full"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </EnhancedButton>
      </CardFooter>
    </EnhancedCard>
  );
}


export default function ConfirmationPage() {
  return (
    <PageLayout className="flex flex-1 flex-col items-center justify-center p-4 py-12">
      <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-[#002455]" /></div>}>
        <ConfirmationPageContent />
      </Suspense>
    </PageLayout>
  )
}
