'use client';

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
import type { WarrantyPlan, CheckoutData } from '@/lib/types'; // Assuming CheckoutData is defined
import Link from 'next/link';

// Mock data for warranty plans - in a real app, this would come from a store or API
const mockPlans: Record<string, WarrantyPlan> = {
  essential: { id: 'essential', name: 'Essential Guard', priceMonthly: 9, priceAnnually: 99, duration: '1 Year', features: [] },
  premium: { id: 'premium', name: 'Premium Shield', priceMonthly: 19, priceAnnually: 199, duration: '3 Years', features: [] },
  ultimate: { id: 'ultimate', name: 'Ultimate Coverage', priceMonthly: 29, priceAnnually: 299, duration: '5 Years', features: [] },
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
    // Simulate Stripe API call
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
    <div className="flex flex-col items-center justify-center py-8">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CreditCard className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">Complete Your Purchase</CardTitle>
          <CardDescription>You're one step away from securing your {selectedPlan.name} plan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border p-4 rounded-md bg-muted/50">
            <h3 className="text-lg font-semibold flex items-center gap-2"><ShieldCheck className="text-primary h-5 w-5"/> {selectedPlan.name}</h3>
            <p className="text-2xl font-bold text-primary">${selectedPlan.priceAnnually} <span className="text-sm font-normal text-muted-foreground">/ year</span></p>
            <p className="text-sm text-muted-foreground">(or ${selectedPlan.priceMonthly}/month)</p>
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
                Pay ${selectedPlan.priceAnnually} Securely
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
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
      <CheckoutPageContent />
    </Suspense>
  )
}

