
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
import ClientOnly from '@/components/client-only'; // Import ClientOnly

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
    // Simulate API call for capturing lead
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Trade-In Lead Data (Hot Lead!):', data);
    toast({
      title: 'Trade-In Offer Claimed!',
      description: `Thank you, ${data.fullName}. Our sales team will contact you shortly about your trade-in.`,
      variant: 'default', // Use default variant for a positive message
    });
    // Potentially redirect or show further info
    // router.push('/');
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
      <Card className="w-full max-w-lg shadow-xl text-card-foreground border-[6px] border-primary rounded-xl p-2 sm:p-4 md:p-6">
        <CardHeader className="text-center">
          <Tag className="mx-auto h-12 w-12 text-accent mb-4" />
          <CardTitle className="text-3xl font-bold text-accent">Exclusive Trade-In Offer!</CardTitle>
          <CardDescription className="text-card-foreground">
            Interested in upgrading? Fill out the form below to learn about our special trade-in deals for new countertops.
          </CardDescription>
        </CardHeader>
        <ClientOnly fallback={ClientFallback}>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
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
                      <FormLabel>Email Address</FormLabel>
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
                      <FormLabel>Phone Number</FormLabel>
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
                      <FormLabel>Current Countertop Material (Optional)</FormLabel>
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
                      <FormLabel>Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us more about your project or current countertops..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={form.formState.isSubmitting}>
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
        <CardFooter className="flex justify-center">
          <Button variant="link" asChild>
            <Link href="/warranty" className="text-sm text-muted-foreground hover:text-accent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Warranty Plans
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
