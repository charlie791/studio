
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
import { CardHeader, CardContent, CardFooter } from '@/components/ui/card'; 
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
    <div className="bg-[#002455]/5 border-2 border-[#002455]/10 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
      <CardTitleText as="h2" className="!text-xl text-gray-800 !mb-2">
        {plan.name}
      </CardTitleText>
      <BodyText className="text-gray-600 !mb-5">
        {plan.duration}
      </BodyText>
      
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-5 text-center">
        <MailCheck className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-3" />
        <BodyText className="text-gray-700 font-semibold !mb-1">
          A confirmation email has been sent to:
        </BodyText>
        <BodyText className="text-primary font-bold !mb-2">
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
        className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-[#cc8001] text-white px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-bold rounded-full mb-6 animate-pulsate-attention shadow-lg shadow-accent/40 hover:animate-none"
      >
        <Tag className="w-5 h-5 sm:w-6 sm:h-6" />
        Exclusive Trade-In Offer!
      </Badge>
      
      <SectionTitle as="h2" className="text-gray-800 !mb-4 leading-tight">
        Ready to Upgrade Your Surfaces?
      </SectionTitle>
      <BodyText className="text-gray-600 leading-relaxed mb-8 max-w-md mx-auto">
        Since you chose minimal protection, we're guessing you might be planning something bigger! 
        Let us help you get the kitchen of your dreams with fantastic trade-in values on beautiful new countertops.
      </BodyText>
      
      <div className="mb-6 sm:mb-8 text-left">
        <label htmlFor="project-notes" className="block text-sm sm:text-base font-semibold text-gray-700 mb-3">
          Tell us about your project (Optional)
        </label>
        <Textarea
          id="project-notes"
          placeholder="What are you thinking? Current countertop material, dream surface, timeline, budget range, or any other details..."
          value={projectNotes}
          onChange={(e) => onNotesChange(e.target.value)}
          className="min-h-[120px] resize-none border-2 focus:border-primary focus:ring-primary/20 bg-white/80 focus:bg-white transition-all text-foreground"
          rows={4}
        />
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        <EnhancedButton 
          onClick={onSubmit}
          disabled={isSubmitting}
          variant="primary"
          size="lg"
          className="w-full"
        >
          {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="w-5 h-5 mr-3" /> }
          {isSubmitting ? 'Submitting...' : 'Get My Free Trade-In Quote'}
        </EnhancedButton>
        
        <EnhancedButton 
          variant="secondary"
          size="md" 
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

  const userEmail = "your.email@example.com"; 

  async function handleTradeInSubmit() {
    setIsSubmittingTradeIn(true);
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
      <EnhancedCard warning className="w-full max-w-lg text-center animate-card-entrance p-0 enhanced-card-mobile-margins">
        <CardHeader className="items-center p-6 sm:p-8 pt-6 bg-gradient-to-br from-[#002455] to-[#003875] rounded-t-xl relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            <PageTitle as="h1" className="!text-white z-10 relative">Invalid Plan</PageTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 pt-6">
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
        <div className="w-full max-w-lg animate-slide-up">
          <EnhancedCard className="animate-card-entrance enhanced-card-mobile-margins">
            <CardHeader className="relative bg-gradient-to-br from-[#002455] to-[#003875] p-6 sm:p-8 md:p-10 text-center overflow-hidden rounded-t-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center animate-success-pulse shadow-lg shadow-emerald-500/40">
                <Check className="w-8 h-8 sm:w-9 sm:h-9 text-white animate-check-draw" strokeWidth={3} />
              </div>
              
              <PageTitle as="h1" className="!text-white !mb-4 relative z-10">
                Order Confirmed!
              </PageTitle>
              <BodyText className="text-white/90 leading-relaxed relative z-10 px-2 sm:px-0">
                Thank you for choosing your complimentary Surface Guard 365. Your countertop protection is now active.
              </BodyText>
            </CardHeader>

            <CardContent className="p-6 sm:p-8">
              <OrderDetailsSectionFree userEmail={userEmail} plan={purchasedPlan} />
              
              <Separator className="my-6 sm:my-8 bg-gray-300" />
              
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
             <CardFooter className="flex justify-center p-6 sm:p-8 pb-8 pt-2">
              <EnhancedButton 
                variant="primary"
                size="lg"
                asChild
                className="w-full"
              >
                <a href="https://contractorsource.com/product-selection/" target="_blank" rel="noopener noreferrer">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Shop All Countertops
                </a>
              </EnhancedButton>
            </CardFooter>
          </EnhancedCard>
        </div>
    );
  }

  return (
    <EnhancedCard className="w-full max-w-lg animate-card-entrance p-0 enhanced-card-mobile-margins">
      <CardHeader className="items-center text-center p-6 sm:p-8 pt-8 bg-gradient-to-br from-[#002455] to-[#003875] rounded-t-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        <CheckCircle2 className="h-16 w-16 sm:h-20 sm:w-20 text-green-400 mb-4 sm:mb-6 z-10 relative" />
        <PageTitle as="h1" className="!text-white z-10 relative">Order Confirmed!</PageTitle>
        <BodyText className="text-white/90 mt-2 z-10 relative px-2 sm:px-0">
            Thank you for choosing Surface Guard 365. Your countertop protection is now active.
        </BodyText>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-6 sm:p-8 pt-6 sm:pt-8 pb-6">
        <div className="border p-4 rounded-md bg-muted/30 text-left"> 
          <CardTitleText as="h3" className="text-gray-800 !mb-1">{purchasedPlan.name}</CardTitleText>
          <BodyText className="text-muted-foreground">Duration: {purchasedPlan.duration}</BodyText>
          <p className="text-xl sm:text-2xl font-bold text-primary mt-2">
            4 Flex Payments of ${purchasedPlan.priceMonthly.toFixed(2)}
          </p>
          <SmallText className="font-normal text-muted-foreground">
            Total: ${purchasedPlan.priceAnnually.toFixed(2)}
          </SmallText>
        </div>

        <div className="flex items-center justify-center p-4 border border-dashed rounded-md">
          <MailCheck className="h-6 w-6 sm:h-8 sm:h-8 text-primary mr-3" />
          <div>
            <BodyText className="font-medium text-gray-700">A confirmation email has been sent to:</BodyText>
            <BodyText className="text-primary font-semibold">{userEmail}</BodyText>
            <SmallText className="text-xs text-muted-foreground">(Please check your spam folder if you don't see it.)</SmallText>
          </div>
        </div>
        <SmallText className="pt-2 text-muted-foreground text-center">
          Your warranty details and policy documents are included in the email. You can manage your warranty from your account dashboard (coming soon).
        </SmallText>
      </CardContent>
      <CardFooter className="flex justify-center p-6 sm:p-8 pb-8 pt-4">
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
    <PageLayout className="flex flex-1 flex-col items-center justify-center py-8 sm:py-12">
      <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
        <ConfirmationPageContent />
      </Suspense>
    </PageLayout>
  )
}
