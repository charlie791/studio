
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <ShieldCheck className="h-8 w-8" />
            <span>Surface Guard 365</span>
          </Link>
          <nav className="flex items-center space-x-4 ml-4">
            <Link href="/register" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Register
            </Link>
            <Link href="/warranty" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Warranty Plans
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
