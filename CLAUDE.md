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

### Important Design Tokens
- Background: #F5F5F5 (light grey)
- Primary: #3498DB (blue - trust)
- Accent: #FFB300 (orange - CTAs)
- Design philosophy: Clean, minimal, Apple-inspired

### Development Notes
- TypeScript path alias: `@/*` maps to `./src/*`
- Build errors and ESLint warnings are currently ignored for rapid development
- Firebase App Hosting configured with auto-scaling
- All UI components follow consistent patterns in `/src/components/ui/`