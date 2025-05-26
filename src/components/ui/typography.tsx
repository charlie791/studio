
import { cn } from '@/lib/utils'
import type React from 'react';

interface TypographyProps {
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements; // Allow specifying the HTML tag
}

export function PageTitle({ children, className, as = 'h1' }: TypographyProps) {
  const Component = as;
  return (
    <Component className={cn(
      "text-4xl md:text-5xl font-extrabold text-[#002455] leading-tight mb-6", // Using guide's color
      "text-shadow", // Using custom utility from tailwind.config.ts
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
      "text-2xl md:text-3xl font-bold text-[#002455] leading-tight mb-4", // Using guide's color
      className
    )}>
      {children}
    </Component>
  )
}

export function CardTitleText({ children, className, as = 'h3' }: TypographyProps) { // Renamed to avoid conflict with ShadCN CardTitle
  const Component = as;
  return (
    <Component className={cn(
      "text-xl md:text-2xl font-bold text-[#002455] leading-tight mb-3", // Using guide's color
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
      "text-base md:text-lg text-[#6b7280] leading-relaxed", // Using guide's color
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
      "text-sm text-[#9ca3af] leading-relaxed", // Using guide's color
      className
    )}>
      {children}
    </Component>
  )
}
