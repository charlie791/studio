
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
  state: z.string().min(2, { message: 'State must be at least 2 characters (e.g., FL).' }).default('FL'), // Ensure default if somehow not set
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789).' }),
  phoneNumber: z.string().regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, { message: 'Please enter a valid 10-digit phone number.' }),
});

export default function HomeDetailsPage() {
  const router = useRouter();
  const form = useForm<HomeWarrantyInfoData>({
    resolver: zodResolver(homeWarrantyInfoFormSchema),
    defaultValues: {
      streetAddress: '',
      city: '',
      state: 'FL', // Default state to Florida
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
        layout="fill"
        objectFit="cover"
        className="-z-10 filter brightness-75"
        data-ai-hint="kitchen cabinets"
        priority={false}
      />
      <Card className="w-full max-w-lg shadow-2xl rounded-xl p-2 sm:p-4 md:p-6 border-[6px] border-primary">
        <CardHeader className="text-center items-center pt-6 px-6 pb-4">
          <CardTitle className="text-3xl font-bold text-card-foreground">You’re Almost Protected</CardTitle>
          <CardDescription className="text-card-foreground mt-2 text-sm">
            Add your address to lock in your coverage eligibility — only available for a limited time after move-in.
          </CardDescription>
        </CardHeader>
        <ClientOnly fallback={ClientFallback}>
          <CardContent className="px-6 pb-6 pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="streetAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <div className="relative flex items-center">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <FormControl>
                          <Input placeholder="e.g., 123 Main St" {...field} className="pl-10" />
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
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Anytown" {...field} />
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
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          {/* State field is disabled and pre-filled */}
                          <Input {...field} disabled />
                        </FormControl>
                        <FormMessage /> {/* Should not show error if always 'FL' and valid */}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 90210" {...field} />
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
                      <FormLabel>Phone Number</FormLabel>
                      <div className="relative flex items-center">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <FormControl>
                          <Input type="tel" placeholder="e.g., (555) 123-4567" {...field} className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-primary py-3 text-base" disabled={form.formState.isSubmitting}>
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
