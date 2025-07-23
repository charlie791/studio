'use client'

import { Button as ShadcnButton, type ButtonProps as ShadcnButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type React from 'react'

type CustomEnhancedButtonVariant = 'primary' | 'secondary' | 'warning' | 'success';
type CustomEnhancedButtonSize = 'sm' | 'md' | 'lg';

type PossibleVariants = CustomEnhancedButtonVariant | ShadcnButtonProps['variant'];
type PossibleSizes = CustomEnhancedButtonSize | ShadcnButtonProps['size'];

interface EnhancedButtonProps extends Omit<ShadcnButtonProps, 'variant' | 'size' | 'children'> {
  children: React.ReactNode;
  variant?: PossibleVariants;
  size?: PossibleSizes;
}

export function EnhancedButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  asChild = false,
  type, 
  onClick, 
  ...rest
}: EnhancedButtonProps) {
  const baseStyles = "relative overflow-hidden font-bold transition-all duration-300 transform-gpu group";

  const customVariantStyles: Record<CustomEnhancedButtonVariant, string> = {
    primary: "bg-gradient-to-r from-[#ab3f31] to-[#8b2f23] hover:from-[#8b2f23] hover:to-[#6b1f13] text-white shadow-[0_10px_30px_rgba(171,63,49,0.3)] hover:shadow-[0_20px_50px_rgba(171,63,49,0.4)] hover:-translate-y-1",
    secondary: "bg-white text-[#ab3f31] border-2 border-[#ab3f31] hover:bg-[#ab3f31] hover:text-white shadow-[0_8px_24px_rgba(171,63,49,0.2)] hover:shadow-[0_15px_35px_rgba(171,63,49,0.3)] hover:-translate-y-1",
    warning: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-destructive-foreground shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:shadow-[0_15px_35px_rgba(220,38,38,0.4)] hover:-translate-y-1",
    success: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_35px_rgba(16,185,129,0.4)] hover:-translate-y-1"
  };

  // Mobile-first sizes, scaling up with sm: prefix
  const customSizeStyles: Record<CustomEnhancedButtonSize, string> = {
    sm: "px-3 py-2 text-xs rounded-lg sm:px-4 sm:py-2 sm:text-sm", // Base mobile, sm scales up
    md: "px-4 py-3 text-sm rounded-xl sm:px-6 sm:py-3 sm:text-base", // Base mobile, sm scales up
    lg: "px-5 py-3 text-base rounded-2xl sm:px-8 sm:py-4 sm:text-lg"  // Base mobile, sm scales up
  };
  
  const isCustomVariant = variant && (variant === 'primary' || variant === 'secondary' || variant === 'warning' || variant === 'success');
  const isCustomSize = size && (size === 'sm' || size === 'md' || size === 'lg');

  const shadcnVariantProp = isCustomVariant ? 'default' : variant as ShadcnButtonProps['variant'];
  // For ShadcnButton, if it's a custom size, we might want to pass 'default' to avoid conflicts
  // if ShadcnButton doesn't have 'sm', 'md', 'lg' as its direct size props.
  // However, ShadcnButton 'size' prop typically accepts 'default', 'sm', 'lg', 'icon'.
  // We will map our custom sizes to appropriate Shadcn sizes if needed, or rely on our customSizeStyles to override.
  // For simplicity, if it's a custom size, we'll apply custom styles and use 'default' for Shadcn's internal sizing.
  const shadcnSizeProp = isCustomSize ? 'default' : size as ShadcnButtonProps['size'];
  
  const selectedVariantStyle = isCustomVariant ? customVariantStyles[variant as CustomEnhancedButtonVariant] : '';
  const selectedSizeStyle = isCustomSize ? customSizeStyles[size as CustomEnhancedButtonSize] : '';

  if (asChild) {
    return (
      <ShadcnButton
        type={type}
        asChild={true}
        variant={shadcnVariantProp}
        size={shadcnSizeProp} // Pass Shadcn compatible size
        className={cn(
          baseStyles,
          selectedVariantStyle,
          selectedSizeStyle, // Our custom responsive sizes
          disabled && "opacity-50 cursor-not-allowed hover:transform-none !shadow-none",
          className
        )}
        disabled={disabled}
        onClick={onClick}
        {...rest}
      >
        {children}
      </ShadcnButton>
    );
  }

  return (
    <ShadcnButton
      type={type}
      asChild={false}
      variant={shadcnVariantProp}
      size={shadcnSizeProp} // Pass Shadcn compatible size
      className={cn(
        baseStyles,
        selectedVariantStyle,
        selectedSizeStyle, // Our custom responsive sizes
        disabled && "opacity-50 cursor-not-allowed hover:transform-none !shadow-none",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {isCustomVariant && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
      )}
      {children}
    </ShadcnButton>
  );
}
