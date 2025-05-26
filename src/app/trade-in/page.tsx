
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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Tag, Send, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { TradeInLeadData } from '@/lib/types';
import ClientOnly from '@/components/client-only'; 
import { PageLayout } from '@/components/layout/page-layout';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { PageTitle, BodyText, SmallText } from '@/components/ui/typography';
import { CardHeader, CardContent, CardFooter } from '@/components/ui/card';


const tradeInFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().regex(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, { message: 'Please enter a valid 10-digit phone number.' }),
  currentCountertopMaterial: z.string().optional(),
  notes: z.string().optional(),
});

export default function TradeInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<TradeInLeadData>({
    resolver: zodResolver(tradeInFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      currentCountertopMaterial: '',
      notes: '',
    },
  });

  async function onSubmit(data: TradeInLeadData) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: 'Trade-In Offer Claimed!',
      description: `Thank you, ${data.fullName}. Our sales team will contact you shortly about your trade-in.`,
      variant: 'default', 
    });
    form.reset();
  }

  const ClientFallback = (
    <div className="flex justify-center items-center py-10">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  return (
    <PageLayout className="flex flex-1 flex-col items-center justify-center py-8">
      <EnhancedCard className="w-full max-w-lg animate-card-entrance p-0 enhanced-card-mobile-margins">
        <CardHeader className="text-center items-center p-6 sm:p-8 pt-6 bg-gradient-to-br from-[#002455] to-[#003875] rounded-t-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          <Tag className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-accent mb-4 z-10 relative" />
          <PageTitle as="h1" className="!text-white !mb-2 z-10 relative">Exclusive Trade-In Offer!</PageTitle>
          <BodyText className="text-white/90 !text-base mt-2 z-10 relative px-2 sm:px-0">
            Interested in upgrading? Fill out the form below to learn about our special trade-in deals for new countertops.
          </BodyText>
        </CardHeader>
        <ClientOnly fallback={ClientFallback}>
          <CardContent className="p-6 sm:p-8 pt-6 pb-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Smith" {...field} className="text-foreground"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="jane.smith@example.com" {...field} className="text-foreground"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="(555) 123-4567" {...field} className="text-foreground"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentCountertopMaterial"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Current Countertop Material (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="text-foreground">
                            <SelectValue placeholder="Select material" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="laminate">Laminate</SelectItem>
                          <SelectItem value="granite">Granite</SelectItem>
                          <SelectItem value="quartz">Quartz</SelectItem>
                          <SelectItem value="marble">Marble</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us more about your project or current countertops..." {...field} className="text-foreground"/>
                      </FormControl>
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
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Claim My Offer
                </EnhancedButton>
              </form>
            </Form>
          </CardContent>
        </ClientOnly>
        <CardFooter className="flex justify-center p-6 sm:p-8 pb-6 pt-2">
          <EnhancedButton variant="secondary" size="sm" className="!shadow-none" asChild>
            <Link href="/warranty">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Warranty Plans
            </Link>
          </EnhancedButton>
        </CardFooter>
      </EnhancedCard>
    </PageLayout>
  );
}
