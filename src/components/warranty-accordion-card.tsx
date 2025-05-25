
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCircle, Star, ShoppingCart, XCircle, Flame } from 'lucide-react';
import type { WarrantyStep, LucideIconType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface WarrantyAccordionCardProps {
  step: WarrantyStep;
  onDecline: () => void;
  className?: string;
  defaultOpen?: boolean;
}

const iconMap: Record<string, LucideIconType> = {
  CheckCircle: CheckCircle,
  Star: Star,
  Flame: Flame,
};

export default function WarrantyAccordionCard({ step, onDecline, className, defaultOpen = false }: WarrantyAccordionCardProps) {
  const SpecialOfferIcon = step.specialOfferText?.startsWith('🔥') ? iconMap['Flame'] : null;

  return (
    <TooltipProvider>
      <Card className={cn(
        "w-full shadow-xl flex flex-col bg-card text-card-foreground border-[6px] border-primary relative overflow-visible", // overflow-visible for badge
        className
      )}>
        {step.bestValue && (
          <div className="absolute -top-4 -left-4 z-10 bg-primary text-primary-foreground text-sm font-semibold p-3 rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg transform -rotate-12">
            <Star className="w-6 h-6 fill-current mb-1" />
            Most Popular
          </div>
        )}
        
        <div className={cn("pt-6 px-6 pb-4", step.bestValue ? "pl-28" : "")}> {/* Adjust padding if badge is present */}
          <h2 className="text-2xl font-semibold text-card-foreground">{step.title}</h2>
          <p className="text-sm text-card-foreground mt-1">{step.summary}</p>
          
          {step.priceMonthly !== undefined && (
            <div className="mt-3">
              <p className="text-3xl font-bold text-card-foreground">${step.priceMonthly.toFixed(2)}
                <span className="text-base font-normal"> x 4 Flex Payments</span>
              </p>
              {step.priceAnnually !== undefined && (
                 <p className="text-xs text-card-foreground">Total: ${step.priceAnnually.toFixed(2)} (One-time charge)</p>
              )}
            </div>
          )}
        </div>

        <Accordion type="single" collapsible className="w-full px-6" defaultValue={defaultOpen ? step.id : undefined}>
          <AccordionItem value={step.id} className="border-b-0"> {/* Remove default border if not needed */}
            <AccordionTrigger className="text-sm text-accent hover:no-underline justify-start py-2">
              {step.isDeclineStep ? "View Details" : "What's Included?"}
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 text-sm">
              <ul className="space-y-2 mb-3">
                {step.features.map((feature, index) => {
                  const FeatureIcon = feature.icon ? iconMap[feature.icon] : CheckCircle;
                  return (
                    <li key={index} className="flex items-start">
                      <FeatureIcon className={cn("w-4 h-4 text-green-400 mr-2 mt-0.5 shrink-0", feature.isHighlighted ? "text-yellow-400" : "")} />
                      <span className="text-card-foreground">{feature.text}</span>
                    </li>
                  );
                })}
              </ul>
              {step.specialOfferText && (
                <p className="font-semibold text-card-foreground flex items-center">
                  {SpecialOfferIcon && <SpecialOfferIcon className="w-4 h-4 mr-1 text-orange-400" />}
                  {step.specialOfferText.replace('🔥 ','')}
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <CardFooter className="flex flex-col sm:flex-row gap-2 pt-2 pb-6 px-6 mt-auto">
          {!step.isDeclineStep && step.planId && (
            <Button asChild className="w-full">
              <Link href={`/checkout?planId=${step.planId}`}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {step.ctaSelectText || 'Select Plan'}
              </Link>
            </Button>
          )}

          {step.isDeclineStep && step.ctaDeclineText && (
             <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button onClick={onDecline} variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive-foreground">
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
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}
