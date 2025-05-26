
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PageLayout } from '@/components/layout/page-layout';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { PageTitle, BodyText, SmallText } from '@/components/ui/typography';

export default function LandingPage() {
  return (
    // Adjusted padding on PageLayout for overall screen, and removed from here
    <PageLayout className="flex flex-1 flex-col items-center justify-center py-8">
      {/* EnhancedCard already has mobile margins via global CSS. Added responsive padding here. */}
      <EnhancedCard className="w-full max-w-lg text-center animate-card-entrance p-6 sm:p-8 md:p-10">
        <div className="flex flex-col items-center">
          <div className="mb-6 lg:mb-8 h-auto flex justify-center items-center">
            <Image
              src="/SG365_Final.svg"
              alt="Surface Guard 365 Logo"
              width={296} 
              height={78} 
              className="w-[180px] h-auto sm:w-[240px] md:w-[280px]" // Responsive width
              priority
            />
          </div>

          <PageTitle as="h1" className="!text-[#002455] !mb-3"> {/* Typography component is responsive */}
            {' '}
            Protect Your
            <br />
            Countertops &amp; Cabinets
          </PageTitle>
          <BodyText className="!text-[#6b7280] !mb-6 sm:!mb-8 !text-center"> {/* Responsive margin */}
            Warranty your new surfaces in seconds
          </BodyText>

          <EnhancedButton variant="primary" size="lg" asChild>
            <Link href="/register">ACTIVATE WARRANTY</Link>
          </EnhancedButton>
          
          <SmallText className="mt-6 !text-[#9ca3af]"> {/* Typography component is responsive */}
            Already activated?{' '}
            <Link href="/login" className="font-semibold text-accent hover:underline">
              Sign In
            </Link>
          </SmallText>
        </div>
      </EnhancedCard>
    </PageLayout>
  );
}
