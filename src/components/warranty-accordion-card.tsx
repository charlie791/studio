
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Alert, AlertDescription as ShadcnAlertDescription } from '@/components/ui/alert'; 
import {
  Crown, Diamond, Check, Flame, ChevronDown, ShoppingCart, XCircle, Shield, Zap, Gem, AlertTriangle, X, Mail, Tag, Send, Loader2,
  type LucideIcon as LucideIconType
} from 'lucide-react';
import type { WarrantyStep } from '@/lib/types';
import { cn } from '@/lib/utils';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { CardTitleText, BodyText, SmallText, SectionTitle } from '@/components/ui/typography'; 
import { CardHeader, CardContent } from '@/components/ui/card';


const iconMap: Record<string, LucideIconType | undefined> = {
  Shield: Shield, Gem: Gem, Zap: Zap, CheckCircle: Check, Diamond: Diamond, Crown: Crown, Flame: Flame, ChevronDown: ChevronDown, ShoppingCart: ShoppingCart, XCircle: XCircle, AlertTriangle: AlertTriangle, X: X, Mail: Mail, Tag: Tag, Send: Send, AlertCircle: AlertTriangle, // Mapped AlertCircle to AlertTriangle for consistency if it was intended for warning icon
};

function FeaturesList({ features, isDeclineStep }: { features: WarrantyStep['features'], isDeclineStep?: boolean }) {
  if (!features) return null;
  return (
    <ul className="space-y-2 sm:space-y-2.5"> 
      {features.map((feature, index) => {
        const FeatureIcon =
          isDeclineStep ? (feature.included ? iconMap['CheckCircle'] : iconMap['X'])
          : (feature.icon && iconMap[feature.icon] ? iconMap[feature.icon] : iconMap['CheckCircle']);

        const iconColorClass = isDeclineStep
          ? (feature.included ? 'text-emerald-500' : 'text-red-500')
          : (feature.isHighlighted ? 'text-yellow-500' : 'text-emerald-500');

        const textColorClass = isDeclineStep
          ? (feature.included ? 'text-gray-700' : 'text-gray-500 line-through')
          : 'text-gray-700';

        return (
          <li
            key={index}
            className={cn(
              "flex items-start gap-2 sm:gap-3 text-sm sm:text-base opacity-0 animate-slide-in", 
              textColorClass
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {FeatureIcon && <FeatureIcon className={cn("w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5", iconColorClass)} />}
            <span>{feature.text}</span>
          </li>
        );
      })}
    </ul>
  );
}

function WarningList() {
  const warnings = [
    "No long-term warranty protection.",
    "No professional care kit included.", 
    "No VIP customer support or priority service.",
    "Your coverage will expire in 30 days."
  ];

  return (
    <div className="text-left mb-6 space-y-3">
      {warnings.map((warning, index) => (
        <div 
          key={index}
          className="flex items-start gap-3 opacity-0 animate-slide-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <BodyText className="text-gray-600 leading-relaxed">{warning}</BodyText> 
        </div>
      ))}
    </div>
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


  const handleShowBetterOptionsFromDialog = () => {
    setShowDeclineConfirmation(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmLimitedFromDialog = () => {
    setShowDeclineConfirmation(false);
    onDecline(); 
  };


  if (step.isDeclineStep) {
    return (
      <>
        <EnhancedCard
            warning 
            className={cn("w-full max-w-[380px] mx-auto animate-card-entrance p-0 enhanced-card-mobile-margins", className)}
        >
            <CardHeader className="relative bg-red-700 p-6 sm:p-8 text-center overflow-hidden rounded-t-xl">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 animate-warning-stripe" />
              <div className="flex flex-col items-center mb-4"> 
                <Badge 
                  variant="destructive"
                  className="inline-flex items-center gap-1.5 sm:gap-2 bg-red-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30 text-xs sm:text-sm font-semibold text-white z-10 animate-intense-pulsate-warning"
                >
                  {iconMap.AlertTriangle && <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />}
                  Limited Coverage
                </Badge>
              </div>
              <CardTitleText as="h2" className="!text-white !mb-2 z-10 relative">
                {step.title}
              </CardTitleText>
              <BodyText className="text-white/90 font-medium mb-4 sm:mb-6 z-10 relative px-2 sm:px-0">
                {step.summary}
              </BodyText>
              <div className="z-10 relative">
                 <BodyText className="text-white/80 mt-2">
                  30 days only • Limited benefits
                </BodyText>
              </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 md:p-7">
              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                  <EnhancedButton
                    variant="secondary" 
                    size="md"
                    className="w-full justify-between !p-3 sm:!p-4 !h-auto !text-left font-semibold !text-base text-gray-700 hover:!bg-red-600/10 !rounded-lg !shadow-none !border-0"
                  >
                    What's NOT included with free coverage
                    {iconMap.ChevronDown && <ChevronDown className={`w-5 h-5 text-red-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />}
                  </EnhancedButton>
                </CollapsibleTrigger>

                <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="pt-2 pb-4 sm:pb-5 px-1">
                    <FeaturesList features={step.features} isDeclineStep={true} />
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Alert variant="default" className="mt-4 sm:mt-5 border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 p-3 sm:p-4">
                {iconMap.AlertCircle && <AlertTriangle className="h-4 w-4 text-red-600" />}
                <ShadcnAlertDescription className="font-semibold !text-xs sm:!text-sm">
                  Coverage expires after 30 days with no renewal option
                </ShadcnAlertDescription>
              </Alert>

              <EnhancedButton
                onClick={() => setShowDeclineConfirmation(true)}
                variant="warning"
                size="lg"
                className="w-full mt-6"
              >
                {iconMap.X && <X className="w-5 h-5 mr-2" />}
                {step.ctaDeclineText || 'Keep 30-Day Plan'}
              </EnhancedButton>

              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                <SmallText className="text-xs text-red-700 italic">
                  You'll miss out on comprehensive protection and savings available with our premium plans
                </SmallText>
              </div>
            </CardContent>
        </EnhancedCard>

        <Dialog open={showDeclineConfirmation} onOpenChange={setShowDeclineConfirmation}>
          <DialogContent className="max-w-lg mx-4 p-0 sm:p-0 border-4 border-red-600 bg-background overflow-hidden rounded-xl">
             <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 animate-warning-stripe" />

            <EnhancedButton
              variant="secondary" 
              size="sm"
              onClick={() => setShowDeclineConfirmation(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 !rounded-full bg-red-600/10 hover:!bg-red-600/20 !shadow-none z-10 transition-all duration-300 hover:scale-110 !p-0"
              aria-label="Close dialog"
            >
              {iconMap.X && <X className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />}
            </EnhancedButton>

            <div className="pt-12 sm:pt-16 pb-8 sm:pb-10 px-6 sm:px-10 text-center">
              <Badge
                variant="destructive"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-bold rounded-full mb-6 sm:mb-8 animate-intense-pulsate-warning shadow-lg shadow-red-600/40 relative"
              >
                {iconMap.AlertTriangle && <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400" />}
                Limited Coverage
              </Badge>

              <DialogHeader className="mb-4 sm:mb-6">
                <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-red-600 leading-tight">
                  Final Warning - Are You Sure?
                </DialogTitle>
              </DialogHeader>
               <div className="text-center text-sm sm:text-base text-gray-700 space-y-3 py-2">
                <div className="font-semibold text-foreground">You are about to proceed with minimal coverage. This means:</div>
                  <WarningList />
                <div className="font-bold text-red-600">Are you sure you want to miss out on comprehensive protection and savings?</div>
              </div>
              
              <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
                <EnhancedButton
                  onClick={handleConfirmLimitedFromDialog}
                  variant="warning"
                  size="lg"
                  className="w-full"
                >
                  Yes, Keep Limited Coverage
                </EnhancedButton>
                <EnhancedButton
                  onClick={handleShowBetterOptionsFromDialog}
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  Wait, Show Me Better Options
                </EnhancedButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
      <EnhancedCard
          premium={step.bestValue}
          className={cn("w-full max-w-[380px] mx-auto animate-card-entrance p-0 enhanced-card-mobile-margins", className)}
      >
        <CardHeader className={cn(
          "relative p-6 sm:p-8 text-center overflow-hidden rounded-t-xl",
          "bg-gradient-to-br from-[#002455] to-[#003875]"
        )}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

          {step.bestValue && (
             <Badge variant="default" className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/20 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/30 flex items-center gap-1.5 text-xs font-semibold text-white z-10">
              {iconMap.Crown && <Crown className="w-3 h-3 sm:w-4 sm:h-4 fill-[#FDA001] text-[#FDA001]" />}
              Most Popular
            </Badge>
          )}

          {HeaderSpecificIcon && <HeaderSpecificIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 mx-auto mb-3 sm:mb-4 z-10 relative" />}

          <CardTitleText as="h2" className="!text-white !mb-2 z-10 relative">
            {step.title}
          </CardTitleText>
          <BodyText className="text-white/90 font-medium mb-4 sm:mb-6 z-10 relative px-2 sm:px-0">
            {step.summary}
          </BodyText>

          {step.priceMonthly !== undefined && (
            <div className="z-10 relative">
              <div className="text-3xl font-extrabold text-white">
                ${step.priceMonthly.toFixed(2)} 
                <span className="text-xl font-semibold align-baseline"> × 4 Flex Payments</span>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-4 sm:p-6 md:p-7">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <EnhancedButton
                variant="secondary" 
                size="md"
                className="w-full justify-between !p-3 sm:!p-4 !h-auto !text-left font-semibold !text-base text-gray-700 hover:!bg-[#002455]/10 !rounded-lg !shadow-none !border-0"
              >
                What's included in this plan?
                {iconMap.ChevronDown && <ChevronDown className={`w-5 h-5 text-[#FDA001] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />}
              </EnhancedButton>
            </CollapsibleTrigger>

            <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <div className="pt-2 pb-4 sm:pb-5 px-1">
                <FeaturesList features={step.features} />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {step.specialOfferText && (
            <div className="bg-gradient-to-r from-[#FDA001] to-[#cc8001] text-white px-4 py-2 sm:px-5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm text-center mt-4 sm:mt-5 flex items-center justify-center gap-1.5 sm:gap-2">
              {iconMap.Flame && <Flame className="w-3 h-3 sm:w-4 sm:h-4 fill-white" />}
              {step.specialOfferText.replace('🔥 ', '')}
            </div>
          )}

          <EnhancedButton
              variant="primary"
              size="lg"
              className="w-full mt-6"
              asChild
          >
            <Link href={`/checkout?planId=${step.planId}`}>
              {iconMap.ShoppingCart && <ShoppingCart className="w-5 h-5 mr-2" />}
              {step.ctaSelectText || 'Select Plan'}
            </Link>
          </EnhancedButton>
        </CardContent>
      </EnhancedCard>
  );
}
