
import { cn } from '@/lib/utils'
import type React from 'react';

interface TypographyProps {
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements; 
}

export function PageTitle({ children, className, as = 'h1' }: TypographyProps) {
  const Component = as;
  return (
    <Component className={cn(
      // Mobile-first: text-2xl, sm: scales up, lg: scales up further
      "text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#ab3f31] leading-tight mb-4 sm:mb-6",
      "text-shadow", 
      className
    )}>
      {children}
    </Component>
  )
}

export function SectionTitle({ children, className, as = 'h2' }: TypographyProps) {
  const Component = as;
  return (
    <Component className={cn(
      "text-xl sm:text-2xl lg:text-3xl font-bold text-[#ab3f31] leading-tight mb-3 sm:mb-4",
      className
    )}>
      {children}
    </Component>
  )
}

export function CardTitleText({ children, className, as = 'h3' }: TypographyProps) { 
  const Component = as;
  return (
    <Component className={cn(
      "text-lg sm:text-xl lg:text-2xl font-bold text-[#ab3f31] leading-tight mb-2 sm:mb-3",
      className
    )}>
      {children}
    </Component>
  )
}

export function BodyText({ children, className, as = 'p' }: TypographyProps) {
  const Component = as;
  return (
    <Component className={cn(
      "text-sm sm:text-base lg:text-lg text-[#6b7280] leading-relaxed", // Applied global line-height: 1.6
      className
    )}>
      {children}
    </Component>
  )
}

export function SmallText({ children, className, as = 'p' }: TypographyProps) {
  const Component = as;
  return (
    <Component className={cn(
      "text-xs sm:text-sm text-[#9ca3af] leading-relaxed", // Applied global line-height: 1.6
      className
    )}>
      {children}
    </Component>
  )
}
