
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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Tag, Send, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { TradeInLeadData } from '@/lib/types';
import ClientOnly from '@/components/client-only'; 

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
    console.log('Trade-In Lead Data (Hot Lead!):', data);
    toast({
      title: 'Trade-In Offer Claimed!',
      description: `Thank you, ${data.fullName}. Our sales team will contact you shortly about your trade-in.`,
      variant: 'default',
    });
  }

  const ClientFallback = (
    <div className="flex justify-center items-center py-10">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-4 py-8">
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
          <Tag className="mx-auto h-12 w-12 text-accent mb-4 z-10 relative" />
          <CardTitle className="text-3xl font-bold tracking-tight text-accent z-10 relative">Exclusive Trade-In Offer!</CardTitle>
          <CardDescription className="text-base text-white/90 mt-2 z-10 relative">
            Interested in upgrading? Fill out the form below to learn about our special trade-in deals for new countertops.
          </CardDescription>
        </CardHeader>
        <ClientOnly fallback={ClientFallback}>
          <CardContent className="px-6 pt-6 pb-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Smith" {...field} />
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
                        <Input type="email" placeholder="jane.smith@example.com" {...field} />
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
                        <Input type="tel" placeholder="(555) 123-4567" {...field} />
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
                          <SelectTrigger>
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
                        <Textarea placeholder="Tell us more about your project or current countertops..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#002455] to-[#003875] text-primary-foreground hover:shadow-lg hover:shadow-[#002455]/40 hover:-translate-y-0.5 transition-all duration-300 py-3 text-base font-semibold rounded-2xl relative overflow-hidden group h-auto" 
                  disabled={form.formState.isSubmitting}
                >
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  {form.formState.isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Claim My Offer
                </Button>
              </form>
            </Form>
          </CardContent>
        </ClientOnly>
        <CardFooter className="flex justify-center px-6 pb-6 pt-2">
          <Button variant="link" asChild className="text-sm text-muted-foreground hover:text-accent">
            <Link href="/warranty">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Warranty Plans
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
