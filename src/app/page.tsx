
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Define the new SVG logo component
const SurfaceGuardLogoSVG = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 296 78" // Based on the natural dimensions of the provided logo image
    className={cn("h-auto", className)} // Allows className to control sizing, h-auto maintains aspect ratio
    aria-label="Surface Guard 365 Logo"
  >
    {/* Shield Path */}
    <path
      d="M10 5 H80 C82 5 85 8 85 10 V40 C85 65 50 73 47.5 73 C45 73 10 65 10 40 V10 C10 8 13 5 15 5 H10 Z"
      fill="#002455"    // Dark Blue (var(--primary))
      stroke="#FDA001"  // Lumen Gold (var(--primary-foreground) or var(--accent))
      strokeWidth="3"
    />
    {/* 365 Text */}
    <text
      x="47.5" // Approx horizontal center of shield (10 to 85 is 75 wide, center is 10 + 75/2 = 47.5)
      y="48"   // Adjusted for vertical centering within the shield
      fontFamily="Arial, Helvetica, sans-serif" // Generic sans-serif
      fontSize="34"    // Scaled to fit within shield
      fontWeight="bold"
      fill="#FDA001"    // Lumen Gold
      textAnchor="middle"
    >
      365
    </text>
    {/* SURFACE Text */}
    <text
      x="105" // Positioned to the right of the shield
      y="36"  // Top line of text
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="32"
      fontWeight="bold"
      fill="#002455"    // Dark Blue
    >
      SURFACE
    </text>
    {/* GUARD Text */}
    <text
      x="105" // Positioned to the right of the shield
      y="70"  // Bottom line of text
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="32"
      fontWeight="bold"
      fill="#002455"    // Dark Blue
    >
      GUARD
    </text>
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
          <div className="mb-6 lg:mb-8 h-auto flex justify-center items-center">
            {/* Use the new SVG logo component */}
            <SurfaceGuardLogoSVG className="w-[200px] sm:w-[240px] md:w-[280px]" />
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
