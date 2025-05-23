
import type { LucideIcon } from 'lucide-react';

export interface WarrantyPlan {
  id: string;
  name: string;
  priceMonthly: number; // This now represents the flex payment amount
  priceAnnually: number; // This now represents the total one-time charge
  duration: string;
  features: { text: string; icon?: string }[];
  icon?: string;
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

