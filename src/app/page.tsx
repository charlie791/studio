
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden p-4">
      <Image
        src="https://igscountertops.b-cdn.net/kitchencabinets.now%20assets/Cabiets%20assets/ELITECRAFT%20Imperial%20Blue/imperial-blue-main-gallery-image-1.jpg"
        alt="Modern kitchen background"
        fill={true}
        className="-z-10 filter brightness-75 object-cover"
        data-ai-hint="kitchen cabinets"
        priority
      />
      <Card className="w-full max-w-lg p-6 sm:p-8 md:p-10 bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 lg:mb-8 h-auto flex justify-center items-center">
            <Image
              src="/SG365_Final.svg"
              alt="Surface Guard 365 Logo"
              width={296}
              height={78}
              className="w-[200px] sm:w-[240px] md:w-[280px] h-auto"
              priority
            />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-gray-800">
            Protect Your
            <br />
            Countertops & Cabinets
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-700">
            Warranty your new surfaces in seconds
          </p>

          <Button
            asChild
            size="lg"
            className="w-full mt-8 bg-gradient-to-r from-[#002455] to-[#003875] hover:shadow-lg hover:shadow-[#002455]/40 hover:-translate-y-0.5 transition-all duration-300 text-base font-semibold py-4 rounded-2xl relative overflow-hidden group text-primary-foreground h-auto"
          >
            <Link href="/register">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              ACTIVATE WARRANTY
            </Link>
          </Button>

          <p className="mt-6 text-sm text-gray-700">
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
