
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Crown, Diamond, Check, Flame, ChevronDown, ShoppingCart, XCircle, Shield, Zap, Gem, type LucideIcon as LucideIconType } from 'lucide-react';
import type { WarrantyStep } from '@/lib/types';
import { cn } from '@/lib/utils';

// Icon map to resolve string names to actual Lucide components
const iconMap: Record<string, LucideIconType | undefined> = {
  Shield: Shield,
  Gem: Diamond, // Mapped Gem to Diamond for design consistency if 'Gem' is used in data
  Zap: Zap,
  CheckCircle: Check,
  Diamond: Diamond,
  Crown: Crown,
  Flame: Flame,
  ChevronDown: ChevronDown,
  ShoppingCart: ShoppingCart,
  XCircle: XCircle,
};


function FeaturesList({ features }: { features: Array<{ text: string; icon?: string; isHighlighted?: boolean }> }) {
  return (
    <ul className="space-y-2.5">
      {features.map((feature, index) => {
        const FeatureIcon = feature.icon && iconMap[feature.icon] ? iconMap[feature.icon] : Check;
        return (
          <li
            key={index}
            className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed opacity-0 -translate-x-2 animate-slide-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <FeatureIcon className={cn("w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5", feature.isHighlighted ? "text-yellow-500" : "")} />
            <span>{feature.text}</span>
          </li>
        );
      })}
    </ul>
  );
}

interface WarrantyAccordionCardProps {
  step: WarrantyStep;
  onDecline: () => void;
  className?: string;
  defaultOpen?: boolean;
}

export default function WarrantyAccordionCard({ step, onDecline, className, defaultOpen = false }: WarrantyAccordionCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  // Determine header icon: Diamond for plans, XCircle for decline, or specific icon from step.iconName
  const HeaderSpecificIcon = step.iconName && iconMap[step.iconName] 
    ? iconMap[step.iconName] 
    : step.isDeclineStep ? XCircle : Diamond;


  return (
    <TooltipProvider>
      <div className={cn("w-full", className)}>
        <Card className="overflow-hidden border-0 shadow-2xl bg-white/95 backdrop-blur-sm rounded-xl">

          <CardHeader className={cn(
            "relative p-6 md:p-8 text-center overflow-hidden",
            step.isDeclineStep ? "bg-gradient-to-br from-gray-600 to-gray-700" : "bg-gradient-to-br from-[#002455] to-[#003875]"
          )}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

            {step.bestValue && !step.isDeclineStep && (
              <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30 flex items-center gap-1.5 text-xs font-semibold text-white z-10">
                <Crown className="w-4 h-4 fill-accent" />
                Most Popular
              </div>
            )}
            
            {/* Render the determined icon */}
            {HeaderSpecificIcon && !step.isDeclineStep && <HeaderSpecificIcon className="w-6 h-6 fill-white/80 stroke-white/80 mx-auto mb-3 z-10 relative" />}
            {HeaderSpecificIcon && step.isDeclineStep && <HeaderSpecificIcon className="w-8 h-8 text-white/80 mx-auto mb-3 z-10 relative" />}


            <h2 className="text-xl md:text-2xl font-bold text-white mb-1 z-10 relative tracking-tight">
              {step.title}
            </h2>
            <p className="text-white/90 text-sm md:text-base font-medium mb-4 z-10 relative">
              {step.summary}
            </p>

            {step.priceMonthly !== undefined && step.priceAnnually !== undefined && !step.isDeclineStep && (
              <div className="z-10 relative">
                <div className="text-3xl font-extrabold text-white mb-0.5">
                  ${step.priceMonthly.toFixed(2)}
                  <span className="text-xl font-semibold"> × 4 Flex Payments</span>
                </div>
                <div className="text-white/80 text-sm md:text-base">
                  Total: ${step.priceAnnually.toFixed(2)} (One-time charge)
                </div>
              </div>
            )}
          </CardHeader>

          <CardContent className="p-5 md:p-7">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between items-center p-3 md:p-4 h-auto text-left font-semibold text-base text-gray-800 hover:bg-primary/5 rounded-lg transition-all duration-300"
                >
                  {step.isDeclineStep ? "View Details" : "What's included in this plan?"}
                  <ChevronDown className={`w-5 h-5 text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="pt-2 pb-5 px-1 md:px-2">
                  <FeaturesList features={step.features} />
                </div>
              </CollapsibleContent>
            </Collapsible>

            {step.specialOfferText && !step.isDeclineStep && (
              <div className="bg-gradient-to-r from-accent to-[#cc8001] text-white px-4 py-2.5 rounded-xl font-semibold text-sm text-center mt-5 flex items-center justify-center gap-2">
                <Flame className="w-4 h-4 fill-white" />
                {step.specialOfferText.replace('🔥 ', '')}
              </div>
            )}

            {!step.isDeclineStep && step.planId && (
              <Button asChild className="w-full bg-gradient-to-r from-[#002455] to-[#003875] text-primary-foreground hover:shadow-lg hover:shadow-[#002455]/40 hover:-translate-y-0.5 transition-all duration-300 text-base font-semibold py-3 rounded-2xl mt-6 relative overflow-hidden group h-auto">
                <Link href={`/checkout?planId=${step.planId}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {step.ctaSelectText || 'Select Plan'}
                </Link>
              </Button>
            )}

            {step.isDeclineStep && step.ctaDeclineText && (
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onDecline}
                    variant="outline"
                    className="w-full border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive hover:-translate-y-0.5 transition-all duration-300 text-base font-semibold py-3 rounded-2xl mt-6"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    {step.ctaDeclineText}
                  </Button>
                </TooltipTrigger>
                {step.tooltipText && (
                  <TooltipContent side="bottom" className="bg-popover text-popover-foreground">
                    <p>{step.tooltipText}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            )}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
