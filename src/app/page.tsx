
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const LogoShieldSVG = () => (
  <svg viewBox="0 0 60 70" fill="#002455" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M0 0 H60 V40 C60 55 30 70 30 70 C30 70 0 55 0 40 V0 Z"/>
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
          <div className="flex items-center justify-center mb-6 lg:mb-8">
            <div className="relative w-[60px] h-[70px] sm:w-[70px] sm:h-[80px] mr-3 sm:mr-4">
              <LogoShieldSVG />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary-foreground text-2xl sm:text-3xl font-bold">
                365
              </span>
            </div>
            <div className="text-left">
              <span className="block text-3xl sm:text-4xl font-bold text-primary">
                SURFACE
              </span>
              <span className="block text-3xl sm:text-4xl font-bold text-primary -mt-1 sm:-mt-2">
                GUARD
              </span>
            </div>
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
