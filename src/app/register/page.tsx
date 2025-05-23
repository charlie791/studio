'use client';

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
import { Loader2, User, Mail, Lock, UserPlus, HomeIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { CreateAccountData } from '@/lib/types'; // Updated type
import { auth } from '@/lib/firebase'; // Firebase auth instance
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

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

  async function onSubmit(data: CreateAccountData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: data.fullName });

      toast({
        title: 'Account Created!',
        description: `Welcome, ${data.fullName}! Your account has been successfully created.`,
      });
      router.push('/warranty'); // Or to a dashboard/profile page
    } catch (error: any) {
      console.error("Firebase Auth Error:", error);
      let errorMessage = 'Failed to create account. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email address is already in use. Please try a different email or log in.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'The password is too weak. Please choose a stronger password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'The email address is not valid.';
      }
      // Catch missing Firebase config error
      else if (error.message.includes("Firebase: Error (auth/invalid-api-key)") || error.message.includes("Failed to initialize Firebase")) {
        errorMessage = "Firebase configuration is missing or invalid. Please contact support.";
      }
      toast({
        title: 'Account Creation Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-4">
      <Card className="w-full max-w-md bg-card/90 backdrop-blur-sm shadow-2xl rounded-xl p-2 sm:p-4 md:p-6">
        <CardHeader className="text-center items-center pt-6 px-6 pb-4">
          {/* UserPlus icon is fine for "Create Account" */}
          {/* <UserPlus className="mx-auto h-10 w-10 text-primary mb-3" /> */}
          <CardTitle className="text-3xl font-bold text-primary">Create Your Account</CardTitle>
          <CardDescription className="text-muted-foreground mt-2 text-sm">
            Quickly create your account and start protecting your home investments. It only takes a few minutes!
          </CardDescription>
        </CardHeader>
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
                        <Input placeholder="e.g. Jane Doe" {...field} className="pl-10" />
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
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-base" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center px-6 pb-6 pt-2 space-y-3">
            <p className="text-sm text-muted-foreground text-center">
                Already have an account?{' '}
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
      </Card>
    </div>
  );
}
