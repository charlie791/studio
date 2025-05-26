
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription as ShadcnAlertDescription } from '@/components/ui/alert';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Crown, Diamond, Check, Flame, ChevronDown, ShoppingCart, XCircle, Shield, Zap, Gem, AlertTriangle, AlertCircle, X,
  type LucideIcon as LucideIconType 
} from 'lucide-react';
import type { WarrantyStep } from '@/lib/types';
import { cn } from '@/lib/utils';

// Icon map to resolve string names to actual Lucide components
const iconMap: Record<string, LucideIconType | undefined> = {
  Shield: Shield,
  Gem: Gem, 
  Zap: Zap, 
  CheckCircle: Check,
  Diamond: Diamond,
  Crown: Crown,
  Flame: Flame,
  ChevronDown: ChevronDown,
  ShoppingCart: ShoppingCart,
  XCircle: XCircle,
  AlertTriangle: AlertTriangle,
  AlertCircle: AlertCircle,
  X: X,
};

function FeaturesList({ features, isDeclineStep }: { features: WarrantyStep['features'], isDeclineStep?: boolean }) {
  return (
    <ul className="space-y-2.5">
      {features.map((feature, index) => {
        const FeatureIcon = 
          isDeclineStep ? (feature.included ? iconMap['CheckCircle'] : iconMap['X']) 
          : (feature.icon && iconMap[feature.icon] ? iconMap[feature.icon] : iconMap['CheckCircle']);
        
        const iconColor = isDeclineStep ? (feature.included ? 'text-emerald-500' : 'text-red-500') : 'text-emerald-500';
        const textColor = isDeclineStep ? (feature.included ? 'text-gray-700' : 'text-gray-500 line-through') : 'text-gray-700 leading-relaxed';

        return (
          <li
            key={index}
            className={cn(
              "flex items-start gap-3 text-sm opacity-0 -translate-x-2 animate-slide-in",
              textColor
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {FeatureIcon && <FeatureIcon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", iconColor, feature.isHighlighted && !isDeclineStep ? "text-yellow-500" : "")} />}
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
  const [isOpen, setIsOpen] = useState(step.isDeclineStep ? true : defaultOpen);
  const [showDeclineConfirmation, setShowDeclineConfirmation] = useState(false);
  
  const HeaderSpecificIcon = step.iconName && iconMap[step.iconName] 
    ? iconMap[step.iconName] 
    : step.isDeclineStep ? Shield : Diamond;


  if (step.isDeclineStep) {
    return (
      <AlertDialog open={showDeclineConfirmation} onOpenChange={setShowDeclineConfirmation}>
        <TooltipProvider>
          <div className={cn("w-full max-w-[380px] mx-auto", className)}>
            <Card className="overflow-hidden border-2 border-red-600 shadow-2xl bg-white/95 backdrop-blur-sm opacity-85 filter saturate-[.75] relative rounded-xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 animate-pulse" />
              
              <CardHeader className="relative bg-gradient-to-br from-red-900 to-red-800 p-8 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                
                <div className="absolute top-4 left-6 bg-red-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30 flex items-center gap-1.5 text-xs font-semibold text-white z-10 animate-pulse">
                  <AlertTriangle className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  Limited Coverage
                </div>

                {HeaderSpecificIcon && <HeaderSpecificIcon className="w-6 h-6 fill-white/80 text-white/80 mx-auto mb-4 z-10 relative" />}
                
                <h2 className="text-2xl font-bold text-white mb-2 z-10 relative tracking-tight">
                  {step.title}
                </h2>
                <p className="text-white/90 text-base font-medium mb-6 z-10 relative">
                  {step.summary}
                </p>
                
                <div className="z-10 relative">
                   <div className="text-white/80 text-base mt-2">
                    30 days only • Limited benefits
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-7">
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-4 h-auto text-left font-semibold text-base text-gray-800 hover:bg-red-600/5 rounded-lg transition-all duration-300"
                    >
                      What's NOT included with free coverage
                      <ChevronDown className={`w-5 h-5 text-red-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="pt-2 pb-5">
                      <FeaturesList features={step.features} isDeclineStep={true} />
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Alert variant="default" className="mt-5 border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <ShadcnAlertDescription className="font-semibold">
                    Coverage expires after 30 days with no renewal option
                  </ShadcnAlertDescription>
                </Alert>

                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                      <Button 
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all duration-300 text-base font-bold py-3 text-white rounded-2xl mt-6 relative overflow-hidden group border-2 border-red-600 h-auto"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                        <X className="w-4 h-4 mr-2" />
                        {step.ctaDeclineText || 'Keep Free 30-Day Plan'}
                      </Button>
                    </AlertDialogTrigger>
                  </TooltipTrigger>
                  {step.tooltipText && (
                    <TooltipContent side="bottom" className="bg-popover text-popover-foreground">
                      <p>{step.tooltipText}</p>
                    </TooltipContent>
                  )}
                </Tooltip>

                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                  <p className="text-xs text-red-800 italic">
                    You'll miss out on comprehensive protection and savings available with our premium plans
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TooltipProvider>

        <AlertDialogContent className="sm:max-w-md border-red-500 bg-background">
          <AlertDialogHeader className="items-center text-center">
            <div className="mx-auto mb-4">
              <div className="bg-red-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30 flex items-center gap-1.5 text-xs font-semibold text-white z-10 animate-pulse">
                <AlertTriangle className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                Limited Coverage
              </div>
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-destructive">Final Warning - Are You Sure?</AlertDialogTitle>
          </AlertDialogHeader>
          
          <div className="text-center text-sm text-muted-foreground space-y-3 py-2 px-6">
            <div className="font-semibold text-foreground">You are about to proceed with minimal coverage. This means:</div>
            <ul className="list-disc list-inside text-left space-y-1 pl-4">
              <li>No long-term warranty protection.</li>
              <li>No professional care kit included.</li>
              <li>No VIP customer support or priority service.</li>
              <li>Your coverage will expire in 30 days.</li>
            </ul>
            <div className="font-bold text-destructive">Are you sure you want to miss out on comprehensive protection and savings?</div>
          </div>

          <AlertDialogFooter className="sm:justify-center gap-2 pt-4">
            <AlertDialogCancel asChild>
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Wait, Show Me Better Options
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-destructive-foreground" onClick={() => {
                onDecline();
                setShowDeclineConfirmation(false);
              }}>
                Yes, Keep Limited Coverage
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // Regular Plan Card (Non-Decline Step)
  return (
    <TooltipProvider>
      <div className={cn("w-full max-w-[380px] mx-auto", className)}>
        <Card className="overflow-hidden border-0 shadow-2xl bg-white/95 backdrop-blur-sm rounded-xl">
          <CardHeader className={cn(
            "relative p-6 md:p-8 text-center overflow-hidden",
            "bg-gradient-to-br from-[#002455] to-[#003875]"
          )}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

            {step.bestValue && (
               <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-primary/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary-foreground/30 flex items-center gap-1.5 text-xs font-semibold text-primary-foreground z-10">
                <Crown className="w-4 h-4 fill-primary-foreground text-primary-foreground" />
                Most Popular
              </div>
            )}
            
            {HeaderSpecificIcon && <HeaderSpecificIcon className="w-6 h-6 fill-white/80 stroke-white/80 text-white/80 mx-auto mb-3 z-10 relative" />}

            <h2 className="text-xl md:text-2xl font-bold text-white mb-1 z-10 relative tracking-tight">
              {step.title}
            </h2>
            <p className="text-white/90 text-sm md:text-base font-medium mb-4 z-10 relative">
              {step.summary}
            </p>

            {step.priceMonthly !== undefined && (
              <div className="z-10 relative">
                <div className="text-3xl font-extrabold text-white mb-0.5">
                  ${step.priceMonthly.toFixed(2)}
                  <span className="text-xl font-semibold"> × 4 Flex Payments</span>
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
                  What's included in this plan?
                  <ChevronDown className={`w-5 h-5 text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="pt-2 pb-5 px-1 md:px-2">
                  <FeaturesList features={step.features} />
                </div>
              </CollapsibleContent>
            </Collapsible>

            {step.specialOfferText && (
              <div className="bg-gradient-to-r from-accent to-[#cc8001] text-white px-4 py-2.5 rounded-xl font-semibold text-sm text-center mt-5 flex items-center justify-center gap-2">
                <Flame className="w-4 h-4 fill-white" />
                {step.specialOfferText.replace('🔥 ', '')}
              </div>
            )}

            <Button asChild className="w-full bg-gradient-to-r from-[#002455] to-[#003875] text-primary-foreground hover:shadow-lg hover:shadow-[#002455]/40 hover:-translate-y-0.5 transition-all duration-300 text-base font-semibold py-3 rounded-2xl mt-6 relative overflow-hidden group h-auto">
              <Link href={`/checkout?planId=${step.planId}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                <ShoppingCart className="w-4 h-4 mr-2" />
                {step.ctaSelectText || 'Select Plan'}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
