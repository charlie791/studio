
import type { LucideIcon, LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

// Helper type for Lucide icon components
export type LucideIconType = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;


// Existing types
export interface WarrantyPlan {
  id: string;
  name: string;
  priceMonthly: number; // This now represents the flex payment amount
  priceAnnually: number; // This now represents the total one-time charge
  duration: string;
  features: { text: string; icon?: keyof LucideIconMapType }[]; // Updated to match WarrantyStep
  icon?: keyof LucideIconMapType; // Use string keys for Lucide icons
  ctaText?: string;
  popular?: boolean;
}

export interface CreateAccountData {
  fullName: string;
  email: string;
  password: string;
}

export interface HomeWarrantyInfoData {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface TradeInLeadData {
  fullName: string;
  email: string;
  phone: string;
  currentCountertopMaterial?: string;
  notes?: string;
}

export interface CheckoutData {
  cardHolderName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

// Updated type for the warranty flow, now includes features
export interface WarrantyStep {
  id: string; // e.g., 'core-step', 'combo-step', 'decline-step'
  iconName?: keyof LucideIconMapType; // String key for the Lucide icon (optional, as not directly used in new card header)
  title: string;
  summary: string;
  priceMonthly?: number; // Flex payment amount
  priceAnnually?: number; // Total one-time charge (for context, if needed by checkout)
  planId?: string; // Maps to WarrantyPlan id for checkout
  bestValue?: boolean; // For "Most Popular" or "Best Value" badges
  isDeclineStep?: boolean;
  ctaSelectText?: string;
  ctaNextText?: string; // This might be removed or repurposed if no longer "next"
  ctaDeclineText?: string;
  tooltipText?: string;
  features: Array<{ text: string; icon?: keyof LucideIconMapType; isHighlighted?: boolean }>; // Features list
  specialOfferText?: string; // For text like "Best Value - Save 30%..."
}

export interface LucideIconMapType {
  Shield: LucideIconType;
  Gem: LucideIconType;
  Zap: LucideIconType;
  XCircle: LucideIconType;
  Ban: LucideIconType;
  ShoppingCart: LucideIconType;
  ArrowRight: LucideIconType;
  CheckCircle: LucideIconType;
  Star: LucideIconType;
  Flame: LucideIconType; // Added for "Best Value" flame icon
  // Add other icons used in the app here if you want a centralized type
}
