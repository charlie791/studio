
'use client'

// import { AnimatedBackground } from '@/components/ui/animated-background' // Removed
import { cn } from '@/lib/utils';
import type React from 'react';

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    // The main background color will come from the body tag (bg-background)
    <div className="min-h-screen relative flex flex-col"> 
      {/* <AnimatedBackground /> Removed */}
      {/* Added px-4 sm:px-6 lg:px-8 for responsive horizontal padding */}
      <main className={cn("relative z-10 flex-grow flex flex-col px-4 sm:px-6 lg:px-8", className)}> 
        {children}
      </main>
    </div>
  )
}
