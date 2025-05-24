
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
  features: { text: string; icon?: keyof LucideIconMapType };
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

// New type for the step-through warranty flow
export interface WarrantyStep {
  id: string; // e.g., 'core-step', 'combo-step', 'decline-step'
  iconName: keyof LucideIconMapType; // String key for the Lucide icon
  title: string;
  summary: string;
  priceMonthly?: number; // Flex payment amount
  priceAnnually?: number; // Total one-time charge (for context, if needed by checkout)
  planId?: string; // Maps to WarrantyPlan id for checkout
  bestValue?: boolean;
  isDeclineStep?: boolean;
  ctaSelectText?: string;
  ctaNextText?: string;
  ctaDeclineText?: string;
  tooltipText?: string;
}

// Map of Lucide icon names to components (used internally by components that need them)
// This is not part of types.ts usually, but helps define keyof LucideIconMapType
// This will be defined in the component using it. Example:
// import { Shield, Gem, Zap, XCircle } from 'lucide-react';
// export const iconMap = { Shield, Gem, Zap, XCircle };
// export type LucideIconMapType = typeof iconMap;
export interface LucideIconMapType {
  Shield: LucideIconType;
  Gem: LucideIconType;
  Zap: LucideIconType;
  XCircle: LucideIconType;
  Ban: LucideIconType;
  ShoppingCart: LucideIconType;
  ArrowRight: LucideIconType;
  CheckCircle: LucideIconType; // Added from warranty-plan-card
  Star: LucideIconType; // Added from warranty-plan-card
  // Add other icons used in the app here if you want a centralized type
}
