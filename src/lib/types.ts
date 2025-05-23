
import type { LucideIcon } from 'lucide-react';

export interface WarrantyPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnually: number;
  duration: string;
  features: { text: string; icon?: string }[]; // Changed LucideIcon to string
  icon?: string; // Changed LucideIcon to string
  ctaText?: string;
  popular?: boolean;
}

// Renamed from RegistrationData and updated fields
export interface CreateAccountData {
  fullName: string;
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
