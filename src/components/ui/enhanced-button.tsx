
'use client'

import { Button as ShadcnButton, type ButtonProps as ShadcnButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type React from 'react';

// Define the custom variants and sizes for EnhancedButton
type CustomEnhancedButtonVariant = 'primary' | 'secondary' | 'warning' | 'success';
type CustomEnhancedButtonSize = 'sm' | 'md' | 'lg';

// Allow standard Shadcn variants and sizes as well
type PossibleVariants = CustomEnhancedButtonVariant | ShadcnButtonProps['variant'];
type PossibleSizes = CustomEnhancedButtonSize | ShadcnButtonProps['size'];

interface EnhancedButtonProps extends Omit<ShadcnButtonProps, 'variant' | 'size'> {
  children: React.ReactNode;
  variant?: PossibleVariants;
  size?: PossibleSizes;
  // onClick, disabled, className, type, asChild are inherited from ShadcnButtonProps
}

export function EnhancedButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  asChild = false,
  // type prop will be handled by ...rest if not explicitly defined
  ...rest
}: EnhancedButtonProps) {
  const baseStyles = "relative overflow-hidden font-bold transition-all duration-300 transform-gpu group";

  const customVariantStyles: Record<CustomEnhancedButtonVariant, string> = {
    primary: "bg-gradient-to-r from-[#002455] to-[#003875] hover:from-[#003875] hover:to-[#1e3a8a] text-primary-foreground shadow-[0_10px_30px_rgba(0,36,85,0.3)] hover:shadow-[0_20px_50px_rgba(0,36,85,0.4)] hover:-translate-y-1",
    secondary: "bg-white text-[#002455] border-2 border-[#002455] hover:bg-[#002455] hover:text-white shadow-[0_8px_24px_rgba(0,36,85,0.2)] hover:shadow-[0_15px_35px_rgba(0,36,85,0.3)] hover:-translate-y-1",
    warning: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-destructive-foreground shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:shadow-[0_15px_35px_rgba(220,38,38,0.4)] hover:-translate-y-1",
    success: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_35px_rgba(16,185,129,0.4)] hover:-translate-y-1"
  };

  const customSizeStyles: Record<CustomEnhancedButtonSize, string> = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl"
  };

  const isCustomVariant = variant && (variant === 'primary' || variant === 'secondary' || variant === 'warning' || variant === 'success');
  const isCustomSize = size && (size === 'sm' || size === 'md' || size === 'lg');

  // Determine props to pass to ShadcnButton
  const shadcnVariantProp = isCustomVariant ? 'default' : variant as ShadcnButtonProps['variant'];
  const shadcnSizeProp = isCustomSize ? 'default' : size as ShadcnButtonProps['size'];

  // Determine which styles to apply
  const appliedCustomVariantStyle = isCustomVariant ? customVariantStyles[variant as CustomEnhancedButtonVariant] : '';
  const appliedCustomSizeStyle = isCustomSize ? customSizeStyles[size as CustomEnhancedButtonSize] : '';
  const shouldApplyBaseStyles = isCustomVariant; // Only apply our base (for group, etc.) if it's a custom variant

  return (
    <ShadcnButton
      asChild={asChild}
      variant={shadcnVariantProp}
      size={shadcnSizeProp}
      className={cn(
        shouldApplyBaseStyles ? baseStyles : '',
        appliedCustomVariantStyle,
        appliedCustomSizeStyle,
        disabled && "opacity-50 cursor-not-allowed hover:transform-none !shadow-none",
        className // User-provided classes
      )}
      disabled={disabled}
      {...rest} // Pass down other props like type, onClick
    >
      {asChild ? (
        children // If asChild, ShadcnButton (as Slot) gets the children directly
      ) : (
        <>
          {/* Shine effect overlay - only for our custom variants when not asChild */}
          {isCustomVariant && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          )}
          {children}
        </>
      )}
    </ShadcnButton>
  );
}
