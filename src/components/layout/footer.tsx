
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Using standard ShadCN Button for icon
import { EnhancedButton } from '@/components/ui/enhanced-button'; // For the link buttons
import { Menu, X, HomeIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  const pages = [
    { href: '/', label: 'Home (Landing)' },
    { href: '/register', label: 'Register (Create Account)' },
    { href: '/register/home-details', label: 'Register (Home Details)' },
    { href: '/register/processing', label: 'Register (Processing)' },
    { href: '/login', label: 'Login' },
    { href: '/warranty', label: 'Warranty Plans' },
    { href: '/checkout?planId=core', label: 'Checkout (Core Plan)' }, // Example planId
    { href: '/confirmation?planId=core', label: 'Confirmation (Core Plan)' }, // Example planId
    { href: '/trade-in', label: 'Trade-In Offer' },
  ];

  return (
    <footer className="bg-card/80 backdrop-blur-sm border-t border-border/30 py-4 mt-auto text-card-foreground relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full text-accent hover:text-accent hover:bg-accent/10"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isOpen && (
          <div className="animate-slide-up opacity-0 animation-delay-100" style={{animationFillMode: 'forwards'}}>
            <Separator className="my-4 bg-border/50" />
            <div>
              <h4 className="text-sm font-semibold text-card-foreground mb-3">
                Quick Test Navigation
              </h4>
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
                {pages.map((page) => (
                  <EnhancedButton
                    key={page.href}
                    variant="secondary"
                    size="sm"
                    asChild
                    className="!text-xs !h-auto !py-1.5 !px-3 !font-medium !shadow-sm !border-muted-foreground/20 !text-muted-foreground hover:!text-accent hover:!border-accent/40"
                  >
                    <Link href={page.href}>
                      {page.label}
                    </Link>
                  </EnhancedButton>
                ))}
              </div>
            </div>
             <Separator className="my-4 bg-border/50" />
             <EnhancedButton variant="secondary" size="sm" className="text-sm !font-medium !border-muted-foreground/40 !text-muted-foreground hover:!text-accent hover:!border-accent/60 !shadow-none !py-2 !px-4" asChild>
                  <Link href="/">
                      <HomeIcon className="mr-1 h-4 w-4" />
                      Return to Home
                  </Link>
              </EnhancedButton>
          </div>
        )}
      </div>
    </footer>
  );
}
