import Link from 'next/link';
import { Button } from '@/components/ui/button';
import WarrantyPlanCard from '@/components/warranty-plan-card';
import type { WarrantyPlan } from '@/lib/types';
import { Shield, Zap, Gem, ArrowRight, ShieldQuestion } from 'lucide-react';

const warrantyPlansData: WarrantyPlan[] = [
  {
    id: 'essential',
    name: 'Essential Guard',
    priceMonthly: 9,
    priceAnnually: 99,
    duration: 'Basic Coverage',
    icon: Shield,
    features: [
      { text: 'Protection against common stains' },
      { text: 'Coverage for minor chips (up to 1cm)' },
      { text: '1-year plan duration' },
      { text: 'Email support' },
    ],
  },
  {
    id: 'premium',
    name: 'Premium Shield',
    priceMonthly: 19,
    priceAnnually: 199,
    duration: 'Comprehensive Protection',
    icon: Zap,
    popular: true,
    features: [
      { text: 'All Essential Guard benefits' },
      { text: 'Coverage for accidental damage (e.g., heat marks)' },
      { text: 'Protection against major chips (up to 3cm)' },
      { text: '3-year plan duration' },
      { text: 'Priority phone & email support' },
    ],
    ctaText: 'Get Premium Shield',
  },
  {
    id: 'ultimate',
    name: 'Ultimate Coverage',
    priceMonthly: 29,
    priceAnnually: 299,
    duration: 'Total Peace of Mind',
    icon: Gem,
    features: [
      { text: 'All Premium Shield benefits' },
      { text: 'Full replacement for irreparable damage' },
      { text: 'Annual professional cleaning & inspection' },
      { text: '5-year plan duration' },
      { text: 'Dedicated support agent' },
    ],
  },
];

export default function WarrantyPage() {
  return (
    <div className="space-y-12 py-8">
      <header className="text-center space-y-4">
        <ShieldQuestion className="mx-auto h-16 w-16 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight">Choose Your Surface Guard 365 Plan</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select the perfect warranty plan to protect your countertops and enjoy peace of mind.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {warrantyPlansData.map((plan) => (
          <WarrantyPlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <div className="text-center pt-8 border-t">
        <h2 className="text-2xl font-semibold mb-3">Not Ready for a Warranty?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Explore our limited-time trade-in offer and give your kitchen a fresh new look with brand new countertops.
        </p>
        <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
          <Link href="/trade-in">
            Explore Trade-In Offer
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
