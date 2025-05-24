
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import WarrantyPlanCard from '@/components/warranty-plan-card';
import type { WarrantyPlan } from '@/lib/types';
import { ArrowRight } from 'lucide-react'; // Removed ShieldQuestion
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const warrantyPlansData: WarrantyPlan[] = [
  {
    id: 'core',
    name: 'SurfaceGuard365 – Core',
    priceMonthly: 74.75, // Flex payment amount
    priceAnnually: 299, // Total one-time charge
    duration: '5-Year Warranty',
    icon: 'Shield',
    features: [
      { text: 'Protection against common stains' },
      { text: 'Coverage for minor chips' },
      { text: '5-year countertop protection' },
      { text: 'Standard email support' },
    ],
    ctaText: 'Choose Core Plan',
  },
  {
    id: 'total-combo',
    name: 'SurfaceGuard365 – Total Combo Plan',
    priceMonthly: 149.75, // Flex payment amount
    priceAnnually: 599, // Total one-time charge
    duration: '10-Year Countertop + Cabinet Warranty',
    icon: 'Gem',
    popular: true,
    features: [
      { text: 'All Extended Plan benefits' },
      { text: 'Full coverage for countertops & cabinets' },
      { text: 'Accidental damage protection included' },
      { text: 'Annual professional care & inspection visit' },
      { text: 'Dedicated VIP support line' },
    ],
    ctaText: 'Choose Total Combo',
  },
  {
    id: 'extended',
    name: 'SurfaceGuard365 – Extended',
    priceMonthly: 124.75, // Flex payment amount
    priceAnnually: 499, // Total one-time charge
    duration: '10-Year Warranty',
    icon: 'Zap',
    features: [
      { text: 'All Core Plan benefits' },
      { text: 'Extended coverage for major damages' },
      { text: 'Protection against heat marks & scratches' },
      { text: '10-year countertop protection' },
      { text: 'Priority phone & email support' },
    ],
    ctaText: 'Choose Extended Plan',
  },
];

export default function WarrantyPage() {
  return (
    <div className="relative flex flex-1 flex-col items-center overflow-hidden">
      <Image
        src="https://igscountertops.b-cdn.net/kitchencabinets.now%20assets/Cabiets%20assets/ELITECRAFT%20Imperial%20Blue/imperial-blue-main-gallery-image-1.jpg"
        alt="Modern kitchen background"
        layout="fill"
        objectFit="cover"
        className="-z-10 filter brightness-75"
        data-ai-hint="kitchen cabinets"
        priority={false}
      />
      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-12 py-8 px-4 md:px-6 lg:px-8">
        <header className="text-center space-y-4 bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
          {/* Icon removed */}
          <h1 className="text-4xl font-bold tracking-tight text-card-foreground">Choose the Right Protection for Your Surfaces</h1>
          <p className="text-lg text-card-foreground max-w-2xl mx-auto">
            You’re eligible for SurfaceGuard365 coverage — select a plan to lock in lasting protection for your countertops and cabinets.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {warrantyPlansData.map((plan) => (
            <WarrantyPlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mt-12">
          <Card className="max-w-2xl mx-auto shadow-xl border-2 border-accent bg-card text-card-foreground">
            <CardHeader className="pt-8 text-center">
              <CardTitle className="text-3xl font-bold text-primary">Not Ready for a Warranty?</CardTitle>
            </CardHeader>
            <CardContent className="text-center px-4">
              <CardDescription className="text-lg text-card-foreground">
                Explore our limited-time trade-in offer and give your kitchen a fresh new look with brand new countertops.
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-center pt-2 pb-8">
              <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
                <Link href="/trade-in">
                  Explore Trade-In Offer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
