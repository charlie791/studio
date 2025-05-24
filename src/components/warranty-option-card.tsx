
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Shield, Gem, Zap, XCircle, Ban, ShoppingCart, ArrowRight, Star, type LucideProps } from 'lucide-react';
import type { WarrantyStep, LucideIconType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { type ForwardRefExoticComponent, type RefAttributes } from 'react';

// Icon map to resolve string names to actual Lucide components
const iconMap: Record<string, LucideIconType> = {
  Shield: Shield as LucideIconType,
  Gem: Gem as LucideIconType,
  Zap: Zap as LucideIconType,
  XCircle: XCircle as LucideIconType,
  Ban: Ban as LucideIconType,
  ShoppingCart: ShoppingCart as LucideIconType,
  ArrowRight: ArrowRight as LucideIconType,
  Star: Star as LucideIconType,
};


interface WarrantyOptionCardProps {
  step: WarrantyStep;
  onViewNext?: () => void;
  onDecline: () => void; // Renamed for clarity, handles the "Choose Free 30-Day Plan" action
  className?: string;
}

export default function WarrantyOptionCard({ step, onViewNext, onDecline, className }: WarrantyOptionCardProps) {
  // StepIconComponent is no longer used in the header
  // const StepIconComponent = step.iconName ? iconMap[step.iconName] : null;

  return (
    <TooltipProvider>
      <Card className={cn(
        "w-full max-w-md shadow-xl flex flex-col animate-fadeIn bg-card text-card-foreground border-[6px] border-primary",
        className
      )}>
        {step.bestValue && (
          <div className="bg-primary text-primary-foreground text-xs font-semibold py-1 px-3 -mb-px text-center flex items-center justify-center gap-1 relative -top-[6px] mx-[calc(-1.5rem_+_6px)] rounded-t-md">
            {/* Adjusted for thicker border visually*/}
            <Star className="w-3 h-3 fill-current" /> Best Value
          </div>
        )}
        <CardHeader className="items-center text-center pt-6">
          {/* Icon removed from here */}
          <CardTitle className="text-2xl font-semibold text-card-foreground">{step.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow text-center">
          <p className="text-card-foreground mb-4">{step.summary}</p>
          {step.priceMonthly !== undefined && (
            <div className="mb-4">
              <p className="text-4xl font-bold text-card-foreground">${step.priceMonthly.toFixed(2)}</p>
              <p className="text-sm text-card-foreground">x 4 Flex Payments</p>
              {step.priceAnnually !== undefined && (
                 <p className="text-xs text-card-foreground mt-1">Total: ${step.priceAnnually.toFixed(2)} (One-time charge)</p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 pt-2 pb-6 px-6">
          {!step.isDeclineStep && step.planId && (
            <Button asChild className="w-full sm:w-auto flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href={`/checkout?planId=${step.planId}`}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {step.ctaSelectText || 'Select Plan'}
              </Link>
            </Button>
          )}

          {step.isDeclineStep && step.ctaDeclineText && (
             <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button onClick={onDecline} variant="outline" className="w-full sm:w-auto flex-1 border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive-foreground">
                        <XCircle className="mr-2 h-4 w-4" />
                        {step.ctaDeclineText}
                    </Button>
                </TooltipTrigger>
                {step.tooltipText && (
                    <TooltipContent side="bottom">
                        <p>{step.tooltipText}</p>
                    </TooltipContent>
                )}
            </Tooltip>
          )}

          {!step.isDeclineStep && onViewNext && (
            <Button onClick={onViewNext} variant="outline" className="w-full sm:w-auto flex-1">
              {step.ctaNextText || 'View Next Option'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}
