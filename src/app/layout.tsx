
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ContractorSource - Custom Cabinets, Countertops & Closets | Spraggins',
  description: 'Your builder trusted Spraggins for your home\'s core finishes. Now let ContractorSource help you personalize your space with custom closets, cabinet upgrades, and premium countertops. Expert craftsmanship, tailored service.',
  icons: {
    icon: 'https://contractorsource.com/wp-content/uploads/cropped-fav-icon-contractor-source-1.png',
    shortcut: 'https://contractorsource.com/wp-content/uploads/cropped-fav-icon-contractor-source-1.png',
    apple: 'https://contractorsource.com/wp-content/uploads/cropped-fav-icon-contractor-source-1.png',
  },
  openGraph: {
    title: 'ContractorSource - Make Your House Truly Yours',
    description: 'The same team trusted to install your home\'s core finishes is here to help you complete the look with custom closets, cabinets, and countertops.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
