export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Surface Guard 365. All rights reserved.</p>
        <p className="mt-1">Your trusted partner in countertop protection.</p>
      </div>
    </footer>
  );
}
