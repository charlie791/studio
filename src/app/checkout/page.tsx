
'use client';

import Image from 'next/image'; // Keep for now, though background handled by PageLayout
import { Suspense } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, CreditCard, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { WarrantyPlan, CheckoutData } from '@/lib/types';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { PageTitle, SectionTitle, BodyText, SmallText } from '@/components/ui/typography';
import { CardHeader, CardContent, CardFooter } from '@/components/ui/card'; // Standard Card parts for structure


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

const checkoutFormSchema = z.object({
  cardHolderName: z.string().min(2, { message: 'Cardholder name is required.' }),
  cardNumber: z.string().length(16, { message: 'Card number must be 16 digits.' }).regex(/^\d+$/, { message: 'Card number must only contain digits.' }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Expiry date must be in MM/YY format.' }),
  cvc: z.string().min(3).max(4).regex(/^\d+$/, { message: 'CVC must be 3 or 4 digits.' }),
});

function CheckoutPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const planId = searchParams.get('planId');
  const selectedPlan = planId ? mockPlans[planId] : null;

  const form = useForm<CheckoutData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      cardHolderName: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  });

  async function onSubmit(data: CheckoutData) {
    await new Promise(resolve => setTimeout(resolve, 2500));
    console.log('Checkout Data (Mock Stripe):', data, 'Plan:', selectedPlan?.name);
    toast({
      title: 'Payment Successful!',
      description: `Your purchase of ${selectedPlan?.name} warranty is complete.`,
    });
    router.push(`/confirmation?planId=${planId}`);
  }

  if (!selectedPlan) {
    return (
      <EnhancedCard className="w-full max-w-md p-6 text-center animate-card-entrance">
        <PageTitle as="h1" className="text-destructive !text-xl !mb-2">Invalid Plan</PageTitle>
        <BodyText className="text-destructive">Invalid warranty plan selected.</BodyText>
        <EnhancedButton variant="link" size="md" className="mt-4 text-[#FDA001] hover:underline !shadow-none" asChild>
          <Link href="/warranty">Choose a Plan</Link>
        </EnhancedButton>
      </EnhancedCard>
    );
  }

  return (
    <EnhancedCard className="w-full max-w-md animate-card-entrance">
      <CardHeader className="text-center items-center pt-6 px-6 pb-4">
        <CreditCard className="mx-auto h-12 w-12 text-[#002455] mb-4" />
        <PageTitle as="h1" className="!text-3xl !mb-2 text-[#002455]">Complete Your Purchase</PageTitle>
        <BodyText className="!text-base text-[#6b7280] mt-2">You're one step away from securing your {selectedPlan.name} plan.</BodyText>
      </CardHeader>
      <CardContent className="space-y-6 px-6 pt-6 pb-4">
        <div className="border p-4 rounded-md bg-muted/30 text-center"> {/* Lightened background */}
          <SectionTitle as="h3" className="!text-lg text-[#002455] !mb-1">
            {selectedPlan.name}
          </SectionTitle>
          <BodyText className="!text-base text-[#6b7280]">
            4 Flex Payments of
          </BodyText>
          <p className="text-3xl font-bold text-[#002455] mt-1">
            ${selectedPlan.priceMonthly.toFixed(2)}
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#002455]">Cardholder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name as on Card" {...field} className="text-foreground"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#002455]">Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="•••• •••• •••• ••••" {...field} maxLength={16} className="text-foreground"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#002455]">Expiry Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} className="text-foreground"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#002455]">CVC</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} maxLength={4} className="text-foreground"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <EnhancedButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CreditCard className="mr-2 h-4 w-4" />
              )}
              Activate First Payment - ${selectedPlan.priceMonthly.toFixed(2)}
            </EnhancedButton>
          </form>
        </Form>
      </CardContent>
        <CardFooter className="flex justify-center px-6 pb-6 pt-2">
        <EnhancedButton variant="link" size="sm" className="text-sm text-muted-foreground hover:text-accent !shadow-none" asChild>
          <Link href="/warranty">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Change Plan
          </Link>
        </EnhancedButton>
      </CardFooter>
    </EnhancedCard>
  );
}

export default function CheckoutPage() {
  return (
    <PageLayout className="flex flex-1 flex-col items-center justify-center p-4 py-8">
      <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-[#002455]" /></div>}>
        <CheckoutPageContent />
      </Suspense>
    </PageLayout>
  )
}
