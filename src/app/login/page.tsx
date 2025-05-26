
'use client';

import { Suspense, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { Loader2, Mail, Lock, LogIn, HomeIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { LoginData } from '@/lib/types';
import { authInitializationError, getFirebaseAuthInstance } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import ClientOnly from '@/components/client-only';
import { PageLayout } from '@/components/layout/page-layout';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { PageTitle, BodyText, SmallText } from '@/components/ui/typography';
import { CardHeader, CardContent, CardFooter } from '@/components/ui/card';

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

function LoginPageContent() {
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
      let errorMessage = `Firebase services could not be initialized. Please contact support. Raw error: ${authInitializationError.message}`;
      if (authInitializationError.message.includes("auth/invalid-api-key") ||
          authInitializationError.message.includes("Firebase: Error (auth/invalid-api-key)") ||
          authInitializationError.message.includes("API Key is not set") ||
          authInitializationError.message.includes("Firebase configuration is missing or invalid") ) {
        errorMessage = "**ACTION REQUIRED:** Firebase Initialization Failed.\n1. Verify all `NEXT_PUBLIC_FIREBASE_...` variables are correctly set in your `.env.local` file.\n2. **IMPORTANT: You MUST restart your Next.js development server after changing .env.local.**\n3. If issues persist, check your Firebase project console settings. Contact support if needed.";
      }
      toast({
        title: 'Firebase Initialization Failed',
        description: errorMessage,
        variant: 'destructive',
        duration: 300000, 
      });
    }
  }, [toast]);

  async function onSubmit(data: LoginData) {
    if (authInitializationError) {
      toast({
        title: 'Cannot Log In',
        description: 'Firebase is not initialized. Please check configuration or contact support. Ensure .env.local is correct and you have restarted your dev server.',
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
        router.push('/warranty');
      }
    } catch (error: any) {
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
         errorMessage = "Firebase configuration is missing or invalid. Please contact support. Ensure .env.local is correct and you have restarted your dev server.";
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
    <PageLayout className="flex flex-1 flex-col items-center justify-center py-8 sm:py-12">
      <EnhancedCard className="w-full max-w-md animate-card-entrance p-0 enhanced-card-mobile-margins">
        <CardHeader className="text-center items-center p-6 sm:p-8 bg-gradient-to-br from-[#002455] to-[#003875] relative overflow-hidden rounded-t-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          <PageTitle as="h1" className="!text-white !mb-2 z-10 relative">Welcome Back!</PageTitle>
          <BodyText className="text-center text-white/90 !text-base z-10 relative px-2 sm:px-0">
            Sign in to access your account and manage your warranties.
          </BodyText>
        </CardHeader>
        <ClientOnly fallback={ClientFallback}>
          <CardContent className="p-6 sm:p-8 pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email Address</FormLabel>
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
                      <FormLabel className="text-gray-700">Password</FormLabel>
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
                <EnhancedButton 
                  type="submit" 
                  variant="primary"
                  size="lg"
                  className="w-full" 
                  disabled={form.formState.isSubmitting || !!authInitializationError}
                >
                  {form.formState.isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <LogIn className="mr-2 h-4 w-4" />
                  )}
                  Sign In
                </EnhancedButton>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center p-6 sm:p-8 pt-2 space-y-3 sm:space-y-4">
              <SmallText className="text-center text-muted-foreground"> {/* Changed from text-card-foreground */}
                  Need to activate?{' '}
                  <Link href="/register" className="font-semibold text-accent hover:underline">
                    Create an account
                  </Link>
              </SmallText>
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex flex-1 flex-col items-center justify-center p-4 h-screen"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
      <LoginPageContent />
    </Suspense>
  );
}
