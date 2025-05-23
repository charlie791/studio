import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center text-center space-y-12 py-8 md:py-16">
      <header className="space-y-4">
        <ShieldCheck className="mx-auto h-20 w-20 text-primary" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Surface Guard <span className="text-primary">365</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Ultimate Protection for Your Countertops. Peace of mind, guaranteed. Register your product and explore our comprehensive warranty plans.
        </p>
      </header>

      <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-xl overflow-hidden shadow-2xl">
        <Image
          src="https://placehold.co/1200x675.png"
          alt="Modern kitchen countertop"
          layout="fill"
          objectFit="cover"
          data-ai-hint="kitchen countertop"
          priority
        />
         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
         <div className="absolute bottom-6 left-6 text-left">
            <h2 className="text-2xl font-semibold text-white">Invest in Durability</h2>
            <p className="text-sm text-gray-200">Keep your surfaces pristine for years to come.</p>
         </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/register">
            Register Your Product
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/warranty">
            Explore Warranty Plans
            <Zap className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>

      <section className="w-full max-w-4xl space-y-8 pt-12">
        <h2 className="text-3xl font-semibold">Why Choose Surface Guard 365?</h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShieldCheck className="text-primary"/>Comprehensive Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Protection against stains, chips, and accidental damage. We've got you covered.</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Zap className="text-primary"/>Fast & Easy Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Our streamlined process ensures quick resolutions when you need it most.</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ArrowRight className="text-primary"/>Increased Home Value</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>A transferable warranty can be a significant selling point for your home.</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
