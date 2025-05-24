
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react'; // Removed ShieldCheck import

const processingSteps = [
  "Validating Home Details",
  "Registering Your Address",
  "Binding Warranty to Your Property",
  "Fetching Available Warranty Plans",
  "Finalizing Setup",
];

const stepDuration = 1500; // ms per step
const finalDelay = 1000; // ms after last step before redirect

export default function ProcessingPage() {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prevIndex) => {
        if (prevIndex < processingSteps.length - 1) {
          return prevIndex + 1;
        }
        // Last step reached
        clearInterval(stepInterval);
        // Wait a bit more then redirect
        setTimeout(() => {
          router.push('/warranty');
        }, finalDelay);
        return prevIndex; // Keep on last message
      });
    }, stepDuration);

    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(stepInterval);
      clearInterval(dotInterval);
    };
  }, [router]);

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-4 min-h-screen">
      <Image
        src="https://igscountertops.b-cdn.net/kitchencabinets.now%20assets/Cabiets%20assets/ELITECRAFT%20Imperial%20Blue/imperial-blue-main-gallery-image-1.jpg"
        alt="Modern kitchen background"
        layout="fill"
        objectFit="cover"
        className="-z-10 filter brightness-75"
        data-ai-hint="kitchen cabinets"
        priority={false}
      />
      <Card className="w-full max-w-md text-center shadow-xl bg-card text-card-foreground">
        <CardHeader className="pt-8 pb-4">
          {/* Icon removed from here */}
          <CardTitle className="text-2xl font-bold text-card-foreground">Registering Your Warranty</CardTitle>
          <CardDescription className="text-card-foreground mt-2 px-4">
            Please wait while we process your information. This may take a moment.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-8">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary mb-6" />
          <p className="text-lg font-medium text-foreground h-6">
            {processingSteps[currentStepIndex]}{dots}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

