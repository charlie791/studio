
'use client';

import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
import { Loader2, MapPin, Phone, ArrowRight, HomeIcon } from 'lucide-react'; 
import type { HomeWarrantyInfoData } from '@/lib/types';
import ClientOnly from '@/components/client-only';

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
    console.log('Home Warranty Info:', data);
    router.push('/register/processing');
  }

  const ClientFallback = (
    <div className="flex justify-center items-center py-10">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

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
      <Card className="w-full max-w-lg bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-xl">
        <CardHeader className="text-center items-center pt-6 px-6 pb-4 bg-gradient-to-br from-[#002455] to-[#003875] rounded-t-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          <CardTitle className="text-3xl font-bold tracking-tight text-white z-10 relative">You’re Almost Protected</CardTitle>
          <CardDescription className="text-base text-white/90 mt-2 z-10 relative">
            Add your address to lock in your coverage eligibility — only available for a limited time after move-in.
          </CardDescription>
        </CardHeader>
        <ClientOnly fallback={ClientFallback}>
          <CardContent className="px-6 pb-6 pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="streetAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Street Address</FormLabel>
                      <div className="relative flex items-center">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-[2fr_auto_1.5fr] gap-x-2 sm:gap-x-4 items-start">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">City</FormLabel>
                        <FormControl>
                          <Input placeholder="Anytown" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="w-12">
                        <FormLabel className="text-gray-700">State</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
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
                          <Input placeholder="90210" {...field} />
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
                          <Input type="tel" placeholder="(555) 123-4567" {...field} className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full py-3 text-base font-semibold bg-gradient-to-r from-[#002455] to-[#003875] text-primary-foreground hover:shadow-lg hover:shadow-[#002455]/40 hover:-translate-y-0.5 transition-all duration-300 rounded-2xl relative overflow-hidden group h-auto" 
                  disabled={form.formState.isSubmitting}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  {form.formState.isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="mr-2 h-4 w-4" />
                  )}
                  Save and Continue
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center px-6 pb-6 pt-2 space-y-3">
            <Button variant="link" asChild className="text-sm text-muted-foreground hover:text-accent p-0 h-auto">
                <Link href="/">
                    <HomeIcon className="mr-1 h-4 w-4" />
                    Return to Home
                </Link>
            </Button>
          </CardFooter>
        </ClientOnly>
      </Card>
    </div>
  );
}
