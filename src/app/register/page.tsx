
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
import { Loader2, User, Mail, Lock, HomeIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { CreateAccountData } from '@/lib/types';
import { authInitializationError, getFirebaseAuthInstance } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useEffect } from 'react';
import ClientOnly from '@/components/client-only';

const createAccountFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function CreateAccountPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<CreateAccountData>({
    resolver: zodResolver(createAccountFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (authInitializationError) {
      let errorMessage = `Firebase services could not be initialized. Please contact support. Raw error: ${authInitializationError.message}`;
      if (authInitializationError.message.includes("auth/invalid-api-key") ||
          authInitializationError.message.includes("Firebase: Error (auth/invalid-api-key)") ||
          authInitializationError.message.includes("API Key is not set") ||
          authInitializationError.message.includes("Firebase configuration is missing or invalid")) {
        errorMessage = "**ACTION REQUIRED:** Firebase Initialization Failed.\n1. Verify all `NEXT_PUBLIC_FIREBASE_...` variables are correctly set in your `.env.local` file.\n2. **IMPORTANT: You MUST restart your Next.js development server after changing .env.local.**\n3. If issues persist, check your Firebase project console settings. Contact support if needed.";
      }
      toast({
        title: 'Firebase Initialization Failed',
        description: errorMessage,
        variant: 'destructive',
        duration: 300000, // 5 minutes, or choose a very long duration
      });
    }
  }, [toast]);


  async function onSubmit(data: CreateAccountData) {
    if (authInitializationError) {
      toast({
          title: 'Cannot Create Account',
          description: 'Firebase is not initialized. Please check configuration or contact support. Ensure .env.local is correct and you have restarted your dev server.',
          variant: 'destructive',
      });
      return;
    }

    try {
      const auth = getFirebaseAuthInstance();
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: data.fullName });

      toast({
        title: 'Account Created!',
        description: `Welcome, ${data.fullName}! Please provide your home details next.`,
      });
      router.push('/register/home-details');
    } catch (error: any) {
      console.error("Firebase Auth Error on submit:", error);
      let errorMessage = 'Failed to create account. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email address is already in use. Please try a different email or log in.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'The password is too weak. Please choose a stronger password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'The email address is not valid.';
      }
      else if (error === authInitializationError ||
               error.message.includes("auth/invalid-api-key") ||
               error.message.includes("API Key is not set") ||
               error.message.includes("Firebase: Error (auth/invalid-api-key)") ||
               error.message.includes("Failed to initialize Firebase")) {
         errorMessage = "Firebase configuration is missing or invalid. Please contact support. Ensure .env.local is correct and you have restarted your dev server.";
      }
      toast({
        title: 'Account Creation Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
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
      <Card className="w-full max-w-md shadow-2xl rounded-xl p-2 sm:p-4 md:p-6 border-[6px] border-primary bg-card">
        <CardHeader className="text-center items-center pt-6 px-6 pb-4">
          <CardTitle className="text-3xl font-bold text-card-foreground">Let’s Get You Covered</CardTitle>
          <CardDescription className="text-card-foreground mt-2 text-sm">
            Start by creating your account. It’s fast, easy, and just the first step toward protecting your new surfaces
          </CardDescription>
        </CardHeader>
        <ClientOnly fallback={ClientFallback}>
          <CardContent className="px-6 pb-6 pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <div className="relative flex items-center">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <FormControl>
                          <Input placeholder="Jane Doe" {...field} className="pl-10 text-foreground" />
                        </FormControl>
                      </div>
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
                       <div className="relative flex items-center">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <FormControl>
                          <Input type="email" placeholder="jane.doe@example.com" {...field} className="pl-10 text-foreground" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                       <div className="relative flex items-center">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} className="pl-10 text-foreground" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full py-3 text-base bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={form.formState.isSubmitting || !!authInitializationError}
                >
                  {form.formState.isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Create Account
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center px-6 pb-6 pt-2 space-y-3">
              <p className="text-sm text-card-foreground text-center">
                  Already activated?{' '}
                  <Link href="/login" className="font-semibold text-accent hover:underline">
                    Log in
                  </Link>
              </p>
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
