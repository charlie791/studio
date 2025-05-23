
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import WarrantyPlanCard from '@/components/warranty-plan-card';
import type { WarrantyPlan } from '@/lib/types';
import { ArrowRight, ShieldQuestion } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const warrantyPlansData: WarrantyPlan[] = [
  {
    id: 'core',
    name: 'SurfaceGuard365 – Core',
    priceMonthly: 74.75, 
    priceAnnually: 299, 
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
    priceMonthly: 149.75, 
    priceAnnually: 599, 
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
    priceMonthly: 124.75, 
    priceAnnually: 499, 
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
    <div className="space-y-12 py-8 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="text-center space-y-4">
        <ShieldQuestion className="mx-auto h-16 w-16 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight">Choose Your SurfaceGuard365 Plan</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select the perfect warranty plan to protect your countertops and cabinets, ensuring lasting beauty and peace of mind.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {warrantyPlansData.map((plan) => (
          <WarrantyPlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <div className="mt-16">
        <Card className="max-w-2xl mx-auto shadow-xl border-2 border-accent">
          <CardHeader className="pt-8 text-center">
            <CardTitle className="text-3xl font-bold text-primary">Not Ready for a Warranty?</CardTitle>
          </CardHeader>
          <CardContent className="text-center px-4">
            <CardDescription className="text-lg text-muted-foreground">
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
  );
}
