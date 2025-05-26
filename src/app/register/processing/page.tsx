
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout } from '@/components/layout/page-layout';
import { EnhancedCard } from '@/components/ui/enhanced-card';
import { PageTitle, BodyText } from '@/components/ui/typography';
import { CardHeader, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  MapPin,
  Link as LinkIcon, // Renamed to avoid conflict with Next.js Link
  ShieldCheck,
  RefreshCw,
  Star,
  Gift,
  CheckCircle,
  type LucideIcon,
} from 'lucide-react';

// Loading steps configuration
const loadingStepsConfig = [
  {
    message: "Verifying Property Location…",
    icon: MapPin,
    duration: 1500
  },
  {
    message: "Linking Surfaces To Your Account…",
    icon: LinkIcon,
    duration: 1500
  },
  {
    message: "Checking Available Protection Plans…",
    icon: ShieldCheck,
    duration: 1500
  },
  {
    message: "Syncing Coverage Options…",
    icon: RefreshCw,
    duration: 1500
  },
  {
    message: "Registering Best-Matched Warranty Tiers…",
    icon: Star,
    duration: 1500
  },
  {
    message: "Preparing Upgrade Incentives…",
    icon: Gift,
    duration: 1500
  },
  {
    message: "Finalizing Offer Eligibility…",
    icon: CheckCircle,
    duration: 1500
  }
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    initials: "SM",
    name: "Sarah M.",
    location: "Austin, TX",
    quote: "Best purchase I've made for my kitchen! The warranty gives me complete peace of mind."
  },
  {
    id: 2,
    initials: "MR",
    name: "Michael R.",
    location: "Denver, CO",
    quote: "It really is peace of mind to have my countertop and cabinets warranty. Worth every penny!"
  },
  {
    id: 3,
    initials: "JL",
    name: "Jennifer L.",
    location: "Seattle, WA",
    quote: "The coverage options were perfect for our needs. Setup was incredibly easy!"
  },
  {
    id: 4,
    initials: "DK",
    name: "David K.",
    location: "Phoenix, AZ",
    quote: "Excellent protection for our investment. The team made everything so simple."
  }
];

export default function ProcessingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle step progression
  useEffect(() => {
    if (currentStep >= loadingStepsConfig.length) {
      // Final delay before redirect
      const timer = setTimeout(() => {
        router.push('/warranty'); // Redirect to our warranty options page
      }, 1000); // finalDelay from original logic
      return () => clearTimeout(timer);
    }

    const stepConfig = loadingStepsConfig[currentStep];
    const timer = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setProgress(((currentStep + 1) / loadingStepsConfig.length) * 100);
        setIsTransitioning(false);
      }, 300); // Transition duration for text/icon fade
    }, stepConfig?.duration || 1500);

    return () => clearTimeout(timer);
  }, [currentStep, router]);

  // Rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const CurrentIconComponent: LucideIcon = currentStep < loadingStepsConfig.length ? loadingStepsConfig[currentStep].icon : CheckCircle;
  const currentMessage = currentStep < loadingStepsConfig.length ? loadingStepsConfig[currentStep].message : "Finalizing Offer Eligibility…";

  return (
    <PageLayout className="flex flex-1 flex-col items-center justify-start p-4 py-12">
      <EnhancedCard className="w-full max-w-2xl text-center animate-card-entrance">
        <CardHeader className="pt-8 pb-4 bg-gradient-to-br from-[#002455] to-[#003875] rounded-t-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          <PageTitle as="h1" className="!text-3xl !mb-2 text-center text-white z-10 relative">Finalizing Your Account</PageTitle>
          <BodyText className="text-center text-white/90 !text-base px-4 z-10 relative">
            Please wait while we prepare your personalized warranty options. This may take a moment.
          </BodyText>
        </CardHeader>
        <CardContent className="p-8 md:p-12">
          {/* Loading Section */}
          <div className="mb-10">
            {/* Icon */}
            <div className="flex justify-center mb-6 h-16"> {/* Added fixed height to prevent layout shift */}
              <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                <CurrentIconComponent 
                  className="w-16 h-16 text-primary animate-pulse" // Using theme's primary color
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {/* Loading Text */}
            <p className={`text-center text-lg font-medium text-foreground mb-6 h-6 transition-opacity duration-300 ${ // Added fixed height
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}>
              {currentMessage}
            </p>

            {/* Progress Bar */}
            <div className="w-4/5 mx-auto">
              <Progress value={progress} className="h-2 bg-muted" indicatorClassName="bg-primary" />
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="bg-muted/50 rounded-lg p-6 relative overflow-hidden min-h-[130px]"> {/* Added min-height */}
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`flex gap-4 transition-opacity duration-500 ease-in-out ${ // Increased duration
                  index === currentTestimonial 
                    ? 'opacity-100 relative' 
                    : 'opacity-0 absolute inset-0 p-6 pointer-events-none' // Added pointer-events-none
                }`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonial.initials}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-foreground">
                      {testimonial.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {testimonial.location}
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "{testimonial.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </EnhancedCard>
    </PageLayout>
  );
}
