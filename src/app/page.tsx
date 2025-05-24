
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const SurfaceGuardLogoSVG = () => (
  <svg viewBox="0 0 240 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
    {/* Shield with gold border. Path adjusted for stroke to be visually centered on the 0-60 width */}
    <path d="M1 1 H59 V40 C59 55 30 69 30 69 C30 69 1 55 1 40 V1 Z" fill="#002455" stroke="#FDA001" strokeWidth="2"/>
    {/* 365 text in gold */}
    <text x="30" y="36" fontFamily="var(--font-geist-sans), Arial, sans-serif" fontSize="26" fontWeight="bold" fill="#FDA001" textAnchor="middle" dominantBaseline="middle">365</text>
    {/* SURFACE text in dark blue */}
    <text x="75" y="28" fontFamily="var(--font-geist-sans), Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#002455" dominantBaseline="middle">SURFACE</text>
    {/* GUARD text in dark blue */}
    <text x="75" y="56" fontFamily="var(--font-geist-sans), Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#002455" dominantBaseline="middle">GUARD</text>
  </svg>
);

export default function LandingPage() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-4">
      <Image
        src="https://igscountertops.b-cdn.net/kitchencabinets.now%20assets/Cabiets%20assets/ELITECRAFT%20Imperial%20Blue/imperial-blue-main-gallery-image-1.jpg"
        alt="Modern kitchen background"
        layout="fill"
        objectFit="cover"
        className="-z-10"
        data-ai-hint="kitchen cabinets"
        priority
      />
      <Card className="w-full max-w-lg p-6 sm:p-8 md:p-10 bg-card text-card-foreground border-[6px] border-primary shadow-2xl rounded-xl">
        <div className="flex flex-col items-center text-center">
          {/* New Logo */}
          <div className="mb-6 lg:mb-8 h-[70px] sm:h-[80px] flex justify-center items-center">
            <SurfaceGuardLogoSVG />
          </div>

          {/* Updated Text */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-card-foreground">
            Protect Your
            <br />
            Countertops & Cabinets
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-card-foreground">
            Warranty your new surfaces in seconds
          </p>

          {/* Updated Button - Simplified to use theme defaults for primary button */}
          <Button
            asChild
            size="lg"
            className="w-full mt-8 py-3 text-base sm:text-lg font-semibold" 
          >
            <Link href="/register">
              ACTIVATE WARRANTY
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
