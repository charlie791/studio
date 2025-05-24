
'use client';

import Image from 'next/image'; // Added import
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { Loader2, Mail, Lock, LogIn, HomeIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { LoginData } from '@/lib/types';
import { authInitializationError, getFirebaseAuthInstance } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect } from 'react';
import ClientOnly from '@/components/client-only';

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const form = useForm<LoginData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (authInitializationError) {
      let errorMessage = "Firebase services could not be initialized. Please contact support.";
      if (authInitializationError.message.includes("auth/invalid-api-key") || 
          authInitializationError.message.includes("Firebase: Error (auth/invalid-api-key)") ||
          authInitializationError.message.includes("API Key is not set")) {
        errorMessage = "Firebase configuration is missing or invalid. Please ensure environment variables are correctly set and contact support if the issue persists.";
      }
      toast({
        title: 'Firebase Initialization Failed',
        description: errorMessage,
        variant: 'destructive',
        duration: Infinity,
      });
    }
  }, []);

  async function onSubmit(data: LoginData) {
    if (authInitializationError) {
      toast({
        title: 'Cannot Log In',
        description: 'Firebase is not initialized. Please check configuration or contact support.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const auth = getFirebaseAuthInstance();
      await signInWithEmailAndPassword(auth, data.email, data.password);
      
      toast({
        title: 'Login Successful!',
        description: "You've been successfully logged in.",
      });

      const redirectUrl = searchParams.get('redirectUrl');
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push('/warranty'); // Default redirect to warranty page
      }
    } catch (error: any) {
      console.error("Firebase Auth Error on login:", error);
      let errorMessage = 'Failed to log in. Please check your credentials and try again.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'The email address is not valid.';
      } else if (error === authInitializationError || 
               error.message.includes("auth/invalid-api-key") || 
               error.message.includes("API Key is not set") ||
               error.message.includes("Firebase: Error (auth/invalid-api-key)") ||
               error.message.includes("Failed to initialize Firebase")) {
         errorMessage = "Firebase configuration is missing or invalid. Please contact support.";
      }
      toast({
        title: 'Login Failed',
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
        layout="fill"
        objectFit="cover"
        className="-z-10 filter brightness-75"
        data-ai-hint="kitchen cabinets"
        priority={false}
      />
      <Card className="w-full max-w-md bg-card/90 backdrop-blur-sm shadow-2xl rounded-xl p-2 sm:p-4 md:p-6 border-[6px] border-primary">
        <CardHeader className="text-center items-center pt-6 px-6 pb-4">
          <CardTitle className="text-3xl font-bold text-primary">Welcome Back!</CardTitle>
          <CardDescription className="text-muted-foreground mt-2 text-sm">
            Sign in to access your account and manage your warranties.
          </CardDescription>
        </CardHeader>
        <ClientOnly fallback={ClientFallback}>
          <CardContent className="px-6 pb-6 pt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                       <div className="relative flex items-center">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        <FormControl>
                          <Input type="email" placeholder="e.g. jane.doe@example.com" {...field} className="pl-10" />
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
                          <Input type="password" placeholder="••••••••" {...field} className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base" disabled={form.formState.isSubmitting || !!authInitializationError}>
                  {form.formState.isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <LogIn className="mr-2 h-4 w-4" />
                  )}
                  Sign In
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center px-6 pb-6 pt-2 space-y-3">
              <p className="text-sm text-card-foreground text-center">
                  Need to activate?{' '}
                  <Link href="/register" className="font-semibold text-accent hover:underline">
                    Create an account
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
