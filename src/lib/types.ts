import type { LucideIcon } from 'lucide-react';

export interface WarrantyPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnually: number;
  duration: string;
  features: { text: string; icon?: LucideIcon }[];
  icon?: LucideIcon;
  ctaText?: string;
  popular?: boolean;
}

export interface RegistrationData {
  productName: string;
  purchaseDate: Date;
  serialNumber: string;
  fullName: string;
  email: string;
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
