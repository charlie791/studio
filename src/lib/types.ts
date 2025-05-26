
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
  features: { text: string; icon?: keyof LucideIconMapType }[];
  icon?: keyof LucideIconMapType;
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

// Updated type for the warranty flow
export interface WarrantyStep {
  id: string;
  iconName?: keyof LucideIconMapType;
  title: string;
  summary: string;
  priceMonthly?: number;
  priceAnnually?: number; // Still useful for context, even if not always displayed
  planId?: string;
  bestValue?: boolean;
  isDeclineStep?: boolean;
  ctaSelectText?: string;
  ctaDeclineText?: string;
  tooltipText?: string;
  features: Array<{ text: string; icon?: keyof LucideIconMapType; isHighlighted?: boolean; included?: boolean }>; // Added included for decline step
  specialOfferText?: string;
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
  Flame: LucideIconType;
  Crown: LucideIconType;
  Diamond: LucideIconType;
  ChevronDown: LucideIconType;
  AlertTriangle: LucideIconType; // Added for warning card
  AlertCircle: LucideIconType; // Added for warning card
  X: LucideIconType; // Added for warning card features
}
