
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, MapPin, Phone, ArrowRight, HomeIcon } from 'lucide-react'; 
import type { HomeWarrantyInfoData } from '@/lib/types';
import ClientOnly from '@/components/client-only';
import { PageLayout } from '@/components/layout/page-layout';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { PageTitle, BodyText, SmallText } from '@/components/ui/typography';
import { CardHeader, CardContent, CardFooter } from '@/components/ui/card';

const homeWarrantyInfoFormSchema = z.object({
  streetAddress: z.string().min(5, { message: 'Street address must be at least 5 characters.' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters.' }),
  state: z.string().min(2, { message: 'State must be at least 2 characters (e.g., FL).' }).default('FL'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Please enter a valid ZIP code (12345 or 12345-6789).' }),
  phoneNumber: z.string().regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, { message: 'Please enter a valid 10-digit phone number.' }),
});

export default function HomeDetailsPage() {
  const router = useRouter();
  const form = useForm<HomeWarrantyInfoData>({
    resolver: zodResolver(homeWarrantyInfoFormSchema),
    defaultValues: {
      streetAddress: '',
      city: '',
      state: 'FL', 
      zipCode: '',
      phoneNumber: '',
    },
  });

  async function onSubmit(data: HomeWarrantyInfoData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/register/processing');
  }

  const ClientFallback = (
    <div className="flex justify-center items-center py-10">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  return (
    <PageLayout className="flex flex-1 flex-col items-center justify-center py-8 sm:py-12">
      <EnhancedCard className="w-full max-w-lg animate-card-entrance enhanced-card-mobile-margins p-0">
        <CardHeader className="text-center items-center p-6 sm:p-8 bg-gradient-to-br from-[#002455] to-[#003875] rounded-t-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          <PageTitle as="h1" className="!text-white !mb-2 z-10 relative">You’re Almost Protected</PageTitle>
          <BodyText className="text-center text-white/90 !text-base z-10 relative px-2 sm:px-0">
            Add your address to lock in your coverage eligibility — only available for a limited time after move-in.
          </BodyText>
        </CardHeader>
        <ClientOnly fallback={ClientFallback}>
          <CardContent className="p-6 sm:p-8 pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                <FormField
                  control={form.control}
                  name="streetAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Street Address</FormLabel>
                      <div className="relative flex items-center">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} className="pl-10 text-foreground" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-[1fr_auto_0.75fr] gap-2 sm:gap-3 items-start">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">City</FormLabel>
                        <FormControl>
                          <Input placeholder="Anytown" {...field} className="text-foreground"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="w-14 sm:w-16"> 
                        <FormLabel className="text-gray-700">State</FormLabel>
                        <FormControl>
                          <Input {...field} disabled className="text-foreground"/>
                        </FormControl>
                        <FormMessage /> 
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="90210" {...field} className="text-foreground"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Phone Number</FormLabel>
                      <div className="relative flex items-center">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <FormControl>
                          <Input type="tel" placeholder="(555) 123-4567" {...field} className="pl-10 text-foreground" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                    <ArrowRight className="mr-2 h-4 w-4" />
                  )}
                  Save and Continue
                </EnhancedButton>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center p-6 sm:p-8 pt-2 space-y-3">
            <EnhancedButton variant="secondary" size="sm" asChild>
                <Link href="/">
                    <HomeIcon className="mr-1 h-4 w-4" />
                    Return to Home
                </Link>
            </EnhancedButton>
          </CardFooter>
        </ClientOnly>
      </EnhancedCard>
    </PageLayout>
  );
}
