
'use client';

import Image from 'next/image';
import { Suspense } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CreditCard, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { WarrantyPlan, CheckoutData } from '@/lib/types';
import Link from 'next/link';

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
      <div className="text-center py-10">
        <p className="text-xl text-destructive">Invalid warranty plan selected.</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/warranty">Choose a Plan</Link>
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-xl bg-card text-card-foreground">
      <CardHeader className="text-center">
        <CreditCard className="mx-auto h-12 w-12 text-primary mb-4" />
        <CardTitle className="text-3xl font-bold">Complete Your Purchase</CardTitle>
        <CardDescription>You're one step away from securing your {selectedPlan.name} plan.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border p-4 rounded-md bg-muted/50">
          <h3 className="text-lg font-semibold flex items-center gap-2"><ShieldCheck className="text-primary h-5 w-5"/> {selectedPlan.name}</h3>
          <p className="text-2xl font-bold text-primary">
            4 Flex Payments of ${selectedPlan.priceMonthly.toFixed(2)}
          </p>
          <p className="text-sm font-normal text-muted-foreground">
            Total: ${selectedPlan.priceAnnually.toFixed(2)} (One-time charge)
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cardholder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name as on Card" {...field} />
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
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="•••• •••• •••• ••••" {...field} maxLength={16} />
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
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} />
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
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} maxLength={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CreditCard className="mr-2 h-4 w-4" />
              )}
              Pay ${selectedPlan.priceAnnually.toFixed(2)} Securely
            </Button>
          </form>
        </Form>
      </CardContent>
        <CardFooter className="flex justify-center">
        <Button variant="link" asChild>
          <Link href="/warranty" className="text-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Change Plan
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function CheckoutPage() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-4 py-8">
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
        <CheckoutPageContent />
      </Suspense>
    </div>
  )
}
