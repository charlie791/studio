
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PageLayout } from '@/components/layout/page-layout';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { PageTitle, BodyText, SmallText } from '@/components/ui/typography';

export default function LandingPage() {
  return (
    <PageLayout className="flex flex-1 flex-col items-center justify-center p-4">
      <EnhancedCard className="w-full max-w-lg p-6 sm:p-8 md:p-10 text-center animate-card-entrance">
        <div className="flex flex-col items-center">
          <div className="mb-6 lg:mb-8 h-auto flex justify-center items-center">
            <Image
              src="/SG365_Final.svg" // Using the correct SVG path from public
              alt="Surface Guard 365 Logo"
              width={296}
              height={78}
              className="w-[200px] sm:w-[240px] md:w-[280px] h-auto"
              priority
            />
          </div>

          <PageTitle as="h1" className="text-[#002455] !text-3xl sm:!text-4xl !mb-3">
            {' '}
            Protect Your
            <br />
            Countertops & Cabinets
          </PageTitle>
          {/* Ensure this text is the intended grey color */}
          <BodyText className="!text-base md:!text-lg !text-[#6b7280] !mb-8">
            Warranty your new surfaces in seconds
          </BodyText>

          <EnhancedButton variant="primary" size="lg" asChild>
            <Link href="/register">ACTIVATE WARRANTY</Link>
          </EnhancedButton>

          {/* Ensure "Already activated?" is the intended grey color */}
          <SmallText className="mt-6 !text-sm !text-[#9ca3af]">
            Already activated?{' '}
            <Link href="/login" className="font-semibold text-[#FDA001] hover:underline">
              Sign In
            </Link>
          </SmallText>
        </div>
      </EnhancedCard>
    </PageLayout>
  );
}
