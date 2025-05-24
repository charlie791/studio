
import Link from 'next/link';
import Image from 'next/image'; // Import next/image
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// The SurfaceGuardLogoSVG component definition that was here has been removed.
// The logo will now be loaded from /public/SG365_Final.svg

export default function LandingPage() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-4">
      <Image
        src="https://igscountertops.b-cdn.net/kitchencabinets.now%20assets/Cabiets%20assets/ELITECRAFT%20Imperial%20Blue/imperial-blue-main-gallery-image-1.jpg"
        alt="Modern kitchen background"
        layout="fill"
        objectFit="cover"
        className="-z-10 filter brightness-75"
        data-ai-hint="kitchen cabinets"
        priority
      />
      <Card className="w-full max-w-lg p-6 sm:p-8 md:p-10 bg-card text-card-foreground border-[6px] border-primary shadow-2xl rounded-xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 lg:mb-8 h-auto flex justify-center items-center">
            {/* Use next/image to load the SVG from the public folder */}
            <Image
              src="/SG365_Final.svg" // Updated src to use the new SVG file name
              alt="Surface Guard 365 Logo"
              width={296} // Intrinsic width from SVG viewBox
              height={78} // Intrinsic height from SVG viewBox
              className="w-[200px] sm:w-[240px] md:w-[280px] h-auto" // Responsive sizing
              priority // Good for LCP elements
            />
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
            className="w-full mt-8 py-3 text-base sm:text-lg font-semibold" // Relies on theme for colors
          >
            <Link href="/register">
              ACTIVATE WARRANTY
            </Link>
          </Button>

          <p className="mt-6 text-sm text-card-foreground">
            Already activated?{' '}
            <Link href="/login" className="font-semibold text-accent hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
