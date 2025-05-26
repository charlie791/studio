
'use client'

import { AnimatedBackground } from '@/components/ui/animated-background'
import { cn } from '@/lib/utils';
import type React from 'react';

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className="min-h-screen relative flex flex-col"> {/* Added flex flex-col for footer */}
      <AnimatedBackground />
      <main className={cn("relative z-10 flex-grow flex flex-col", className)}> {/* Added flex-grow */}
        {children}
      </main>
    </div>
  )
}
