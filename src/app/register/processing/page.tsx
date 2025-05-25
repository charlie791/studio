
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const processingSteps = [
  "Verifying Property Location…",
  "Linking Surfaces To Your Account…",
  "Checking Available Protection Plans…",
  "Syncing Coverage Options…",
  "Registering Best-Matched Warranty Tiers…",
  "Preparing Upgrade Incentives…",
  "Finalizing Offer Eligibility…",
];

const stepDuration = 1500; 
const finalDelay = 1000; 

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
        clearInterval(stepInterval);
        setTimeout(() => {
          router.push('/warranty');
        }, finalDelay);
        return prevIndex; 
      });
    }, stepDuration);

    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => {
      clearInterval(stepInterval);
      clearInterval(dotInterval);
    };
  }, [router]);

  return (
    <div className="relative flex flex-1 flex-col items-center justify-start overflow-hidden p-4 py-12 min-h-screen">
      <Image
        src="https://igscountertops.b-cdn.net/kitchencabinets.now%20assets/Cabiets%20assets/ELITECRAFT%20Imperial%20Blue/imperial-blue-main-gallery-image-1.jpg"
        alt="Modern kitchen background"
        fill={true}
        className="-z-10 filter brightness-75 object-cover"
        data-ai-hint="kitchen cabinets"
        priority={false}
      />
      <Card className="w-full max-w-md text-center bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-xl">
        <CardHeader className="pt-8 pb-4 bg-gradient-to-br from-[#002455] to-[#003875] rounded-t-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          <CardTitle className="text-3xl font-bold tracking-tight text-white z-10 relative">Finalizing Your Account</CardTitle>
          <CardDescription className="text-base text-white/90 mt-2 px-4 z-10 relative">
            Please wait while we prepare your personalized warranty options. This may take a moment.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-8">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary mb-6" />
          <p className="text-lg font-medium text-gray-700 h-6">
            {processingSteps[currentStepIndex]}{dots}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
