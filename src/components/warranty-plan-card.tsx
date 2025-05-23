
'use client';

import type { WarrantyPlan } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Star, Shield, Zap, Gem, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface WarrantyPlanCardProps {
  plan: WarrantyPlan;
}

const iconMap: Record<string, LucideIcon> = {
  Shield: Shield,
  Zap: Zap,
  Gem: Gem,
  CheckCircle: CheckCircle, 
};

export default function WarrantyPlanCard({ plan }: WarrantyPlanCardProps) {
  const PlanIconComponent = plan.icon ? iconMap[plan.icon] : null;

  return (
    <Card className={cn("flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300", plan.popular ? "border-primary border-2" : "")}>
      {plan.popular && (
        <div className="bg-primary text-primary-foreground text-xs font-semibold py-1 px-3 rounded-t-md -mb-px text-center flex items-center justify-center gap-1">
          <Star className="w-4 h-4 fill-current" /> Most Popular
        </div>
      )}
      <CardHeader className="text-center items-center">
        {PlanIconComponent && <PlanIconComponent className="w-12 h-12 text-primary mb-3" />}
        <CardTitle className="text-2xl font-semibold">{plan.name}</CardTitle>
        <CardDescription>{plan.duration}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-center mb-6">
          <span className="text-4xl font-bold">${plan.priceMonthly.toFixed(2)}</span>
          <span className="text-muted-foreground"> x 4 Flex Payments</span>
          <p className="text-sm text-muted-foreground mt-1">
            Total: ${plan.priceAnnually.toFixed(2)} (One-time charge)
          </p>
        </div>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => {
            const FeatureIconComponent = feature.icon ? iconMap[feature.icon] : CheckCircle;
            return (
              <li key={index} className="flex items-start">
                {FeatureIconComponent ? 
                  <FeatureIconComponent className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" /> : 
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                }
                <span>{feature.text}</span>
              </li>
            );
          })}
        </ul>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/checkout?planId=${plan.id}`}>
            {plan.ctaText || 'Select Plan'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

