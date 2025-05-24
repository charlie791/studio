
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Removed SurfaceGuardLogoSVG component

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
          {/* Number 1 in place of the logo */}
          <div className="mb-6 lg:mb-8 h-[70px] sm:h-[80px] flex justify-center items-center">
            <span className="text-6xl font-bold text-card-foreground">1</span>
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
