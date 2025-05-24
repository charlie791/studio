import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const pages = [
    { href: '/', label: 'Home (Landing)' },
    { href: '/register', label: 'Register (Create Account)' },
    { href: '/register/home-details', label: 'Register (Home Details)' },
    { href: '/register/processing', label: 'Register (Processing)' },
    { href: '/login', label: 'Login' },
    { href: '/warranty', label: 'Warranty Plans' },
    { href: '/checkout?planId=core', label: 'Checkout (Core Plan)' },
    { href: '/confirmation?planId=core', label: 'Confirmation (Core Plan)' },
    { href: '/trade-in', label: 'Trade-In Offer' },
  ];

  return (
    <footer className="bg-card border-t border-border py-6 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/">
              <HomeIcon className="mr-2 h-4 w-4" />
              Back to Home (Test)
            </Link>
          </Button>
        </div>

        <Separator className="my-4" />

        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-2">Quick Test Navigation:</h4>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {pages.map((page) => (
              <Button key={page.href} asChild variant="link" size="sm" className="text-xs h-auto p-1">
                <Link href={page.href}>
                  {page.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
