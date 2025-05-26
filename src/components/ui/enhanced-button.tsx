
'use client'

import { Button as ShadcnButton } from '@/components/ui/button' // Aliasing to avoid name collision
import { cn } from '@/lib/utils'
import type React from 'react';

interface EnhancedButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'warning' | 'success' | 'link' | 'outline' | 'ghost' | 'destructive'; // Added Shadcn variants
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'default'; // Added Shadcn sizes
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Added event type
  disabled?: boolean
  asChild?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function EnhancedButton({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className,
  onClick,
  disabled = false,
  asChild = false,
  type = 'button'
}: EnhancedButtonProps) {
  const baseStyles = "relative overflow-hidden font-bold transition-all duration-300 transform-gpu group rounded-xl" // Added group for shine, rounded-xl
  
  const variants = {
    primary: "bg-gradient-to-r from-[#002455] to-[#003875] hover:from-[#003875] hover:to-[#1e3a8a] text-white shadow-[0_10px_30px_rgba(0,36,85,0.3)] hover:shadow-[0_20px_50px_rgba(0,36,85,0.4)] hover:-translate-y-1",
    secondary: "bg-white text-[#002455] border-2 border-[#002455] hover:bg-[#002455] hover:text-white shadow-[0_8px_24px_rgba(0,36,85,0.2)] hover:shadow-[0_15px_35px_rgba(0,36,85,0.3)] hover:-translate-y-1",
    warning: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:shadow-[0_15px_35px_rgba(220,38,38,0.4)] hover:-translate-y-1",
    success: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_35px_rgba(16,185,129,0.4)] hover:-translate-y-1",
    // Adding mappings for other Shadcn variants to ensure compatibility or default behavior
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90", // Standard Shadcn destructive
    outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground", // Standard Shadcn outline
    ghost: "hover:bg-accent hover:text-accent-foreground", // Standard Shadcn ghost
    link: "text-primary underline-offset-4 hover:underline", // Standard Shadcn link
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg", // Guide says rounded-lg
    md: "px-6 py-3 text-base rounded-xl", // Guide says rounded-xl
    lg: "px-8 py-4 text-lg rounded-2xl", // Guide says rounded-2xl
    default: "h-10 px-4 py-2", // Shadcn default
    icon: "h-10 w-10", // Shadcn default
  }

  const currentVariant = variant as keyof typeof variants;
  const currentSize = size as keyof typeof sizes;

  return (
    <ShadcnButton
      type={type}
      asChild={asChild}
      className={cn(
        baseStyles,
        variants[currentVariant] || variants.primary, // Fallback to primary if variant not in new system
        sizes[currentSize] || sizes.md, // Fallback to md if size not in new system
        disabled && "opacity-50 cursor-not-allowed hover:transform-none !shadow-none", // Ensure disabled styles override hover
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {asChild ? (
        <>
        {children}
        {/* Shine effect overlay - only if not asChild or explicitly managed by child */}
        {!asChild && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />}
        </>
      ) : (
        <>
        {/* Shine effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
        {children}
        </>
      )}
    </ShadcnButton>
  )
}
