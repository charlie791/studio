import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-4">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Modern kitchen background"
        layout="fill"
        objectFit="cover"
        className="-z-10 filter blur-sm brightness-75"
        data-ai-hint="modern kitchen"
        priority
      />
      <Card className="w-full max-w-lg p-8 md:p-10 bg-card/80 backdrop-blur-md shadow-2xl rounded-xl">
        <div className="flex flex-col items-center text-center">
          <Shield className="mx-auto h-14 w-14 text-accent mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Protect Your Investment.
            <br />
            <span className="text-accent">Secure Your Peace of Mind.</span>
          </h1>
          <p className="text-muted-foreground mt-4 text-sm md:text-base">
            Activate your warranty for your new home&apos;s countertops and cabinets. Enjoy lasting beauty and protection with HomeCare Shield.
          </p>
          <Button asChild size="lg" className="w-full mt-8 bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-base font-semibold">
            <Link href="/register">
              Activate Your Warranty
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-6">
            Returning user?{' '}
            <Link href="/login" className="font-semibold text-accent hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
