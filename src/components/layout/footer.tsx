import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Surface Guard 365. All rights reserved.</p>
        <p className="mt-1">Your trusted partner in countertop protection.</p>
        <div className="mt-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/">
              <HomeIcon className="mr-2 h-4 w-4" />
              Back to Home (Test)
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
