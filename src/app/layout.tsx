
import type { Metadata } from 'next';
import { Geist } from 'next/font/google'; // Removed Geist_Mono as it's not explicitly used by new design system
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Footer from '@/components/layout/footer';
// Removed PageLayout import from here, it will be used on individual pages

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Surface Guard 365',
  description: 'Ultimate Protection for Your Countertops',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} antialiased flex flex-col min-h-screen bg-background`}>
        {/* PageLayout will be applied within each page.tsx now */}
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
