
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout } from '@/components/layout/page-layout';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { PageTitle, BodyText, SmallText } from '@/components/ui/typography';
import { CardHeader, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  MapPin,
  Link as LinkIcon, 
  ShieldCheck,
  RefreshCw,
  Star,
  Gift,
  CheckCircle,
  type LucideIcon,
} from 'lucide-react';

const loadingStepsConfig = [
  { message: "Verifying Property Location…", icon: MapPin, duration: 1500 },
  { message: "Linking Surfaces To Your Account…", icon: LinkIcon, duration: 1500 },
  { message: "Checking Available Protection Plans…", icon: ShieldCheck, duration: 1500 },
  { message: "Syncing Coverage Options…", icon: RefreshCw, duration: 1500 },
  { message: "Registering Best-Matched Warranty Tiers…", icon: Star, duration: 1500 },
  { message: "Preparing Upgrade Incentives…", icon: Gift, duration: 1500 },
  { message: "Finalizing Offer Eligibility…", icon: CheckCircle, duration: 1500 }
];

const testimonials = [
  { id: 1, initials: "SM", name: "Sarah M.", location: "Austin, TX", quote: "Best purchase I've made for my kitchen! The warranty gives me complete peace of mind." },
  { id: 2, initials: "MR", name: "Michael R.", location: "Denver, CO", quote: "It really is peace of mind to have my countertop and cabinets warranty. Worth every penny!" },
  { id: 3, initials: "JL", name: "Jennifer L.", location: "Seattle, WA", quote: "The coverage options were perfect for our needs. Setup was incredibly easy!" },
  { id: 4, initials: "DK", name: "David K.", location: "Phoenix, AZ", quote: "Excellent protection for our investment. The team made everything so simple." }
];

export default function ProcessingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (currentStep >= loadingStepsConfig.length) {
      const timer = setTimeout(() => {
        router.push('/warranty'); 
      }, 1000); 
      return () => clearTimeout(timer);
    }

    const stepConfig = loadingStepsConfig[currentStep];
    const timer = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setProgress(((currentStep + 1) / loadingStepsConfig.length) * 100);
        setIsTransitioning(false);
      }, 300); 
    }, stepConfig?.duration || 1500);

    return () => clearTimeout(timer);
  }, [currentStep, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const CurrentIconComponent: LucideIcon = currentStep < loadingStepsConfig.length ? loadingStepsConfig[currentStep].icon : CheckCircle;
  const currentMessage = currentStep < loadingStepsConfig.length ? loadingStepsConfig[currentStep].message : "Finalizing Offer Eligibility…";

  return (
    <PageLayout className="flex flex-1 flex-col items-center justify-start py-8 sm:py-12">
      <EnhancedCard className="w-full max-w-2xl text-center animate-card-entrance p-0 enhanced-card-mobile-margins">
        <CardHeader className="p-6 sm:p-8 bg-gradient-to-br from-[#002455] to-[#003875] rounded-t-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          <PageTitle as="h1" className="!text-white !mb-2 z-10 relative">Finalizing Your Account</PageTitle>
          <BodyText className="text-center text-white/90 !text-base px-2 sm:px-4 z-10 relative">
            Please wait while we prepare your personalized warranty options. This may take a moment.
          </BodyText>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 md:p-10">
          <div className="mb-8 sm:mb-10">
            <div className="flex justify-center mb-6 h-12 sm:h-16"> 
              <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                <CurrentIconComponent 
                  className="w-12 h-12 sm:w-16 sm:h-16 text-primary animate-pulse"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            <BodyText className={`text-center text-gray-700 mb-6 h-6 transition-opacity duration-300 text-sm sm:text-base md:text-lg ${ 
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}>
              {currentMessage}
            </BodyText>

            <div className="w-full sm:w-4/5 mx-auto">
              <Progress value={progress} className="h-2 bg-muted" indicatorClassName="bg-primary" />
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 sm:p-6 relative overflow-hidden min-h-[130px] sm:min-h-[140px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`flex gap-3 sm:gap-4 transition-opacity duration-500 ease-in-out ${ 
                  index === currentTestimonial 
                    ? 'opacity-100 relative' 
                    : 'opacity-0 absolute inset-0 p-4 sm:p-6 pointer-events-none'
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-sm sm:text-base">
                    {testimonial.initials}
                  </div>
                </div>

                <div className="flex-1 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-2 mb-1">
                    <span className="font-semibold text-xs sm:text-sm text-foreground">
                      {testimonial.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {testimonial.location}
                    </span>
                  </div>
                  <div className="flex items-center mb-1 sm:mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                    ))}
                  </div>
                  <SmallText className="text-muted-foreground italic !text-xs sm:!text-sm">
                    "{testimonial.quote}"
                  </SmallText>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </EnhancedCard>
    </PageLayout>
  );
}
