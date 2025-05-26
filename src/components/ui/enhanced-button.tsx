
'use client';

import { Button as ShadcnButton } from '@/components/ui/button'; // Aliasing to avoid name collision
import { cn } from '@/lib/utils';
import type React from 'react';

interface EnhancedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'warning' | 'success' | 'link' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'default';
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  asChild?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function EnhancedButton({
  children,
  variant = 'primary',
  size = 'md', // Defaulting to 'md' as per guide, Shadcn's default is 'default'
  className,
  onClick,
  disabled = false,
  asChild = false,
  type = 'button',
}: EnhancedButtonProps) {
  const baseStyles =
    'relative overflow-hidden font-bold transition-all duration-300 transform-gpu group rounded-xl';

  // These variant/size mappings are for the custom visual styles of EnhancedButton.
  // They are applied on top of or instead of Shadcn's default button variants if EnhancedButton is used.
  const customVariants = {
    primary: "bg-gradient-to-r from-[#002455] to-[#003875] hover:from-[#003875] hover:to-[#1e3a8a] text-white shadow-[0_10px_30px_rgba(0,36,85,0.3)] hover:shadow-[0_20px_50px_rgba(0,36,85,0.4)] hover:-translate-y-1",
    secondary: "bg-white text-[#002455] border-2 border-[#002455] hover:bg-[#002455] hover:text-white shadow-[0_8px_24px_rgba(0,36,85,0.2)] hover:shadow-[0_15px_35px_rgba(0,36,85,0.3)] hover:-translate-y-1",
    warning: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:shadow-[0_15px_35px_rgba(220,38,38,0.4)] hover:-translate-y-1",
    success: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_35px_rgba(16,185,129,0.4)] hover:-translate-y-1",
    // Standard Shadcn variants might not always align with EnhancedButton's custom aesthetic.
    // If a Shadcn variant like 'outline', 'ghost', 'link', 'destructive' is passed,
    // it will primarily use Shadcn's styling for those.
    // If custom EnhancedButton styles are desired for these, they'd need mapping here.
    // For now, let's ensure the primary custom variants work and Shadcn ones fallback gracefully.
    link: "text-primary underline-offset-4 hover:underline", // Example of carrying over a Shadcn style
    outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };

  const customSizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl",
    // Standard Shadcn sizes
    default: "h-10 px-4 py-2", 
    icon: "h-10 w-10",
  };

  const selectedVariantStyle = customVariants[variant as keyof typeof customVariants] || customVariants.primary;
  const selectedSizeStyle = customSizes[size as keyof typeof customSizes] || customSizes.md;

  return (
    <ShadcnButton
      type={type}
      asChild={asChild}
      // We apply Shadcn's own variant/size props if EnhancedButton's variants are not 'primary', 'secondary', etc.
      // This logic can be complex. For now, let's prioritize EnhancedButton's specific styles.
      // To fully use Shadcn's variants with EnhancedButton's look, it would need more intricate class merging.
      // The simplest is to ensure that if a custom variant (primary, secondary) is chosen, its styles are applied.
      // If a Shadcn variant (e.g. 'link', 'outline') is chosen, it should use Shadcn's default.
      // This simplified logic primarily applies custom styles if they exist, otherwise relies on Shadcn's base button.
      variant={ (variant === 'primary' || variant === 'secondary' || variant === 'warning' || variant === 'success') ? 'default' : variant } // Use Shadcn 'default' as base for custom styles
      size={ (size === 'sm' || size === 'md' || size === 'lg') ? 'default' : size } // Use Shadcn 'default' as base for custom sizes
      className={cn(
        baseStyles,
        selectedVariantStyle,
        selectedSizeStyle,
        disabled && 'opacity-50 cursor-not-allowed hover:transform-none !shadow-none',
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {!asChild && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
      )}
      {children}
    </ShadcnButton>
  );
}
