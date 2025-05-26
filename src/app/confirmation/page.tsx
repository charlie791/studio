
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, MailCheck, Home, Loader2, Send, ShoppingCart, Check, AlertTriangle } from 'lucide-react';
import type { WarrantyPlan } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';


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

// Internal components based on the guide
function OrderDetailsSection({ userEmail, plan }: { userEmail: string; plan: WarrantyPlan }) {
  return (
    <div className="bg-[#002455]/5 border-2 border-[#002455]/10 rounded-2xl p-6 mb-8">
      <h2 className="text-xl font-bold text-[#002455] mb-2">
        {plan.name}
      </h2>
      <p className="text-gray-600 mb-5">
        {plan.duration}
      </p>
      
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-5 text-center">
        <MailCheck className="w-8 h-8 text-primary mx-auto mb-3" />
        <p className="text-gray-700 font-semibold mb-1">
          A confirmation email has been sent to:
        </p>
        <p className="text-primary text-lg font-bold mb-2">
          {userEmail}
        </p>
        <p className="text-sm text-gray-500 italic">
          (Please check your spam folder if you don't see it.)
        </p>
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
        className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-[#cc8001] text-white px-6 py-3 text-lg font-bold rounded-full mb-6 animate-pulsate-attention shadow-lg shadow-accent/40 hover:animate-none"
      >
        <Tag className="w-6 h-6" />
        Exclusive Trade-In Offer!
      </Badge>
      
      <h2 className="text-3xl font-extrabold text-primary mb-4 leading-tight">
        Ready to Upgrade Your Surfaces?
      </h2>
      <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-md mx-auto">
        Since you chose minimal protection, we're guessing you might be planning something bigger! 
        Let us help you get the kitchen of your dreams with fantastic trade-in values on beautiful new countertops.
      </p>
      
      <div className="mb-8 text-left">
        <label htmlFor="project-notes" className="block text-base font-semibold text-gray-700 mb-3">
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
      
      <div className="space-y-4">
        <Button 
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#002455] to-[#003875] text-primary-foreground hover:shadow-lg hover:shadow-[#002455]/40 hover:-translate-y-0.5 transition-all duration-300 py-3 text-base font-semibold rounded-2xl relative overflow-hidden group h-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          <Send className="w-5 h-5 mr-3" />
          {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Get My Free Trade-In Quote'}
        </Button>
        
        <Button 
          variant="outline"
          asChild
          className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5 transition-all duration-300 font-semibold py-3 h-auto text-base"
        >
          <a href="https://contractorsource.com/product-selection/" target="_blank" rel="noopener noreferrer">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Browse All Countertops
          </a>
        </Button>
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: 'Interest Submitted!',
      description: "Thanks for your interest in our trade-in offer. We'll be in touch if any follow-up is needed!",
    });
    setProjectNotes(''); // Clear notes after submission
    setIsSubmittingTradeIn(false);
  }


  if (!purchasedPlan) {
    return (
      <Card className="w-full max-w-lg p-6 md:p-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-xl">
        <CardHeader className="items-center text-center pt-6 px-6 pb-4 bg-gradient-to-br from-destructive to-red-700 rounded-t-xl relative overflow-hidden">
            <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-white z-10 relative">Invalid Plan</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700">
            <p className="text-center text-destructive py-4">No plan details found. Please try again or contact support.</p>
            <Button asChild className="w-full mt-4 bg-gradient-to-r from-[#002455] to-[#003875] text-primary-foreground hover:shadow-lg hover:shadow-[#002455]/40 hover:-translate-y-0.5 transition-all duration-300 py-3 text-base font-semibold rounded-2xl relative overflow-hidden group h-auto">
                <Link href="/warranty">Choose a Plan</Link>
            </Button>
        </CardContent>
      </Card>
    );
  }

  const isFreePlan = purchasedPlan.id === 'free-30-day';

  if (isFreePlan) {
    return (
        <div className="w-full max-w-lg animate-slide-up">
          <Card className="overflow-hidden bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-xl">
            <CardHeader className="relative bg-gradient-to-br from-[#002455] to-[#003875] p-8 md:p-10 text-center overflow-hidden rounded-t-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              
              <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mx-auto mb-6 flex items-center justify-center animate-success-pulse shadow-lg shadow-emerald-500/40">
                <Check className="w-9 h-9 text-white animate-check-draw" strokeWidth={3} />
              </div>
              
              <CardTitle className="text-3xl font-extrabold text-white mb-4 relative z-10">
                Order Confirmed!
              </CardTitle>
              <CardDescription className="text-white/90 text-lg leading-relaxed relative z-10">
                Thank you for choosing your complimentary Surface Guard 365. Your countertop protection is now active.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 md:p-8">
              <OrderDetailsSection userEmail={userEmail} plan={purchasedPlan} />
              
              <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8" />
              
              <TradeInOfferSection 
                projectNotes={projectNotes}
                onNotesChange={setProjectNotes}
                onSubmit={handleTradeInSubmit}
                isSubmitting={isSubmittingTradeIn}
              />
              
              <div className="mt-6 p-4 bg-[#002455]/5 rounded-xl text-center">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your warranty details and policy documents are included in the email. 
                  You can manage your warranty from your account dashboard (coming soon).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
    );
  }

  // Fallback for Paid Plans (existing logic)
  return (
    <Card className="w-full max-w-lg bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-xl">
      <CardHeader className="items-center text-center pt-6 px-6 pb-4 bg-gradient-to-br from-[#002455] to-[#003875] rounded-t-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        <CheckCircle2 className="h-20 w-20 text-green-400 mb-6 z-10 relative" />
        <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-white z-10 relative">Order Confirmed!</CardTitle>
        <CardDescription className="text-white/90 text-base mt-2 z-10 relative">
            Thank you for choosing Surface Guard 365. Your countertop protection is now active.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 mt-6 px-6 pt-6 pb-4 text-gray-700">
        <div className="border p-4 rounded-md bg-muted/50 text-left">
          <h3 className="text-xl font-semibold mb-1 text-gray-800">{purchasedPlan.name}</h3>
          <p className="text-muted-foreground">Duration: {purchasedPlan.duration}</p>
          <p className="text-2xl font-bold text-primary mt-2">
            4 Flex Payments of ${purchasedPlan.priceMonthly.toFixed(2)}
          </p>
          <p className="text-sm font-normal text-muted-foreground">
            Total: ${purchasedPlan.priceAnnually.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-center p-4 border border-dashed rounded-md">
          <MailCheck className="h-8 w-8 text-primary mr-3" />
          <div>
            <p className="font-medium">A confirmation email has been sent to:</p>
            <p className="text-primary font-semibold">{userEmail}</p>
            <p className="text-xs text-muted-foreground">(Please check your spam folder if you don't see it.)</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground pt-2">
          Your warranty details and policy documents are included in the email. You can manage your warranty from your account dashboard (coming soon).
        </p>
      </CardContent>
      <CardFooter className="flex justify-center px-6 pb-6 pt-4">
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
      </CardFooter>
    </Card>
  );
}


export default function ConfirmationPage() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-4 py-12 bg-white/95 backdrop-blur-sm">
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
