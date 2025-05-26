
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { PageTitle, BodyText } from '@/components/ui/typography';
import { CardHeader, CardContent } from '@/components/ui/card';


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
    <PageLayout className="flex flex-1 flex-col items-center justify-start p-4 py-12"> {/* Changed to justify-start */}
      <EnhancedCard className="w-full max-w-md text-center animate-card-entrance">
        <CardHeader className="pt-8 pb-4">
          <PageTitle as="h1" className="!text-3xl !mb-2 text-center text-[#002455]">Finalizing Your Account</PageTitle>
          <BodyText className="text-center text-[#6b7280] !text-base px-4">
            Please wait while we prepare your personalized warranty options. This may take a moment.
          </BodyText>
        </CardHeader>
        <CardContent className="py-8">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#002455] mb-6" />
          <BodyText className="text-lg font-medium text-[#002455] h-6">
            {processingSteps[currentStepIndex]}{dots}
          </BodyText>
        </CardContent>
      </EnhancedCard>
    </PageLayout>
  );
}
