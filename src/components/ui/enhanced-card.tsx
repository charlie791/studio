
'use client'

import { Card } from '@/components/ui/card' // Using ShadCN Card as a base
import { cn } from '@/lib/utils'
import type React from 'react';

interface EnhancedCardProps {
  children: React.ReactNode
  className?: string
  // hover3D prop removed
  premium?: boolean
  warning?: boolean
  cardRef?: React.Ref<HTMLDivElement>;
}

export function EnhancedCard({
  children,
  className,
  // hover3D prop removed from destructuring
  premium = false,
  warning = false,
  cardRef
}: EnhancedCardProps) {
  return (
    <Card
      ref={cardRef}
      className={cn(
      // Base 3D card styling
      "relative overflow-visible border-white/20 bg-white/95 backdrop-blur-sm rounded-xl",
      "shadow-[0_40px_80px_rgba(0,0,0,0.15),0_20px_40px_rgba(0,36,85,0.1)] border",
      "transition-all duration-400 ease-cubic-bezier", // Kept for any non-hover transitions if added later

      // 3D hover effects REMOVED
      // The following line was removed:
      // hover3D && "hover:shadow-[0_60px_120px_rgba(0,0,0,0.2),0_30px_60px_rgba(0,36,85,0.15)] hover:-translate-y-1",

      // Premium styling
      premium && "border-2 border-[#FDA001]/20 shadow-[0_40px_80px_rgba(253,160,1,0.1)]",
      premium && "before:absolute before:inset-[-2px] before:bg-gradient-to-br before:from-[#FDA001] before:to-[#002455] before:rounded-inherit before:z-[-1] before:opacity-0 before:transition-opacity before:duration-400",
      // The following line was removed:
      // premium && hover3D && "hover:before:opacity-30",

      // Warning styling
      warning && "border-2 border-red-600 opacity-85 filter saturate-[.75]",
      warning && "before:absolute before:top-0 before:left-0 before:right-0 before:h-1.5 before:bg-gradient-to-r before:from-red-600 before:via-yellow-400 before:to-red-600 before:animate-warning-stripe",

      className
    )}>
      {children}
    </Card>
  )
}
