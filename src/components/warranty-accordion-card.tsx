
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
        "w-full shadow-xl flex flex-col bg-card text-card-foreground border-[6px] border-primary relative",
        className
      )}>
        
        <CardHeader className={cn("pt-6 px-6 pb-4 flex flex-row items-start gap-4")}>
          {step.bestValue && (
            <div className="flex-shrink-0 bg-primary text-primary-foreground text-xs font-semibold p-2 rounded-full w-20 h-20 flex flex-col items-center justify-center text-center shadow-md mt-1">
              <Star className="w-5 h-5 fill-current mb-0.5" />
              <span className="block leading-tight">MOST</span>
              <span className="block leading-tight">POPULAR</span>
            </div>
          )}
          <div className={cn("flex-grow", step.bestValue ? "pt-1" : "")}> {/* Add padding top if badge shifts content */}
            <h2 className="text-2xl font-semibold text-card-foreground">{step.title}</h2>
            <p className="text-sm text-card-foreground mt-1">{step.summary}</p>
            
            {step.priceMonthly !== undefined && (
              <div className="mt-3">
                <p className="text-4xl font-bold text-card-foreground">${step.priceMonthly.toFixed(2)}</p>
                <div className="text-xs text-card-foreground mt-1">
                  <span>x 4 Flex Payments</span>
                  {step.priceAnnually !== undefined && (
                    <span className="block">Total: ${step.priceAnnually.toFixed(2)} (One-time charge)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardHeader>

        <Accordion type="single" collapsible className="w-full px-6" defaultValue={defaultOpen ? step.id : undefined}>
          <AccordionItem value={step.id} className="border-b-0">
            <AccordionTrigger className="text-sm text-accent hover:no-underline justify-start py-2 focus:text-accent focus-visible:ring-0 focus-visible:ring-offset-0">
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
        
        <CardFooter className="flex flex-col sm:flex-row gap-2 pt-4 pb-6 px-6 mt-auto">
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
