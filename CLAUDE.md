# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev                 # Start development server with Turbopack
npm run genkit:dev         # Start AI development server
npm run genkit:watch       # Start AI development with hot reload

# Build & Production
npm run build              # Create production build
npm run start              # Start production server

# Code Quality
npm run lint               # Run Next.js linting
npm run typecheck          # Run TypeScript type checking (tsc --noEmit)
```

## Architecture Overview

This is a Next.js 15 application for Surface Guard 365, a warranty registration and management system for homeowner surface protection plans.

### Tech Stack
- **Frontend**: Next.js 15.2.3 with App Router, React 18.3.1, TypeScript
- **Styling**: Tailwind CSS with custom animations, Radix UI components
- **Backend**: Firebase (Auth, Firestore, App Hosting)
- **AI**: Google Genkit integration at `/src/ai/`
- **Forms**: React Hook Form + Zod validation
- **Payments**: Stripe integration

### Key Application Flow
1. Landing page → User login/registration
2. Product registration with home address verification
3. Warranty plan selection (Basic/Enhanced/Premium)
4. Trade-in offer for declined warranties (generates "hot leads")
5. Stripe checkout → Order confirmation with email

### Project Structure
- `/src/app/` - Next.js App Router pages and layouts
- `/src/components/ui/` - Reusable UI components (40+ components)
- `/src/components/layout/` - Layout components (header, footer, page-layout)
- `/src/ai/` - Google Genkit AI integration
- `/src/lib/` - Core utilities (Firebase config, types, utils)
- `/src/hooks/` - Custom React hooks

### Important Design Tokens
- Background: #F5F5F5 (light grey)
- Primary: #002455 (dark blue - trust and reliability)
- Accent: #FDA001 (lumen gold - CTAs and highlights)
- Design philosophy: Clean, minimal, Apple-inspired

### Development Notes
- TypeScript path alias: `@/*` maps to `./src/*`
- Build errors and ESLint warnings are currently ignored for rapid development (next.config.ts)
- Firebase App Hosting configured with auto-scaling (max 1 instance in apphosting.yaml)
- All UI components follow consistent patterns in `/src/components/ui/`
- Firebase project ID: `surfaceguard-365-cad2s`
- Deployment: Dual hosting on Firebase App Hosting and Netlify
- Firebase config uses environment variables and includes robust error handling

### Deployment & URLs
- **Primary Domain**: `https://warranty.contractorsource.com/`
- **Main Landing Page**: Comprehensive marketing page at `/` (root URL)
- **Alternative Landing Pages**: Simple registration page at `/simple-landing` and `/surface-guard-365` routes
- **External Domain**: Uses `buyquartztops.com` for some marketing pages
- **Standalone HTML**: `surface-guard-365.html` exists for external hosting
- Auto-deployment from git pushes to main branch

### Testing & Code Quality
- No testing framework configured (no Jest, Vitest, etc.)
- Code quality relies on TypeScript checking and Next.js linting
- Use `npm run typecheck` to validate TypeScript before commits

### Key Dependencies
- **State Management**: TanStack React Query with Firebase integration
- **UI Components**: Radix UI primitives with custom styling
- **Styling**: Tailwind CSS with extensive custom animations (20+ keyframes)
- **AI Integration**: Google Genkit with Gemini 2.0 Flash model
- **Icons**: Lucide React icon library
- **Date Handling**: date-fns for date operations
- **Charts**: Recharts for data visualization

### Firebase Integration
- Firebase config in `/src/lib/firebase.ts` with environment variable validation
- Authentication handled through Firebase Auth
- Firestore for data storage (warranty registrations, user data)
- Analytics integration for tracking user behavior
- Robust error handling for missing environment variables

### Environment Variables Required
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`