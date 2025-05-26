
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
  		},
  		keyframes: {
        // Card animations
        cardEntrance: {
          'from': {
            opacity: '0',
            transform: 'perspective(1000px) translateY(50px) rotateX(10deg)'
          },
          'to': {
            opacity: '1',
            transform: 'perspective(1000px) translateZ(0) rotateX(0deg)'
          }
        },
        glowPulse: { // Kept if used by EnhancedCard premium variant
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.4' }
        },
        // Button animations
        buttonShine: { // Kept for EnhancedButton
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        // Warning animations
        warningStripe: { // Kept for EnhancedCard warning variant and Dialog
          '0%': { backgroundPosition: '-24px 0' },
          '100%': { backgroundPosition: '0 0' },
        },
        intensePulsateWarning: { // Kept for Warning Dialog Badge
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 8px 24px rgba(220, 38, 38, 0.4)'
          },
          '50%': {
            transform: 'scale(1.12)',
            boxShadow: '0 12px 40px rgba(220, 38, 38, 0.7)'
          }
        },
        pulseRing: { // Kept for globals.css pulsating badge effects
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.2)', opacity: '0.4' },
          '100%': { transform: 'scale(1.4)', opacity: '0' }
        },
        intenseWarningRing: { // Kept for globals.css pulsating badge effects
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.2)', opacity: '0.4' },
          '100%': { transform: 'scale(1.4)', opacity: '0' }
        },
        pulseWarning: { // Kept for WarrantyAccordionCard decline badge
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        // Success animations
        successPulse: { // Kept for Confirmation Page success icon
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        checkDraw: { // Kept for Confirmation Page success icon
          '0%': { strokeDasharray: '50', strokeDashoffset: '50' },
          '100%': { strokeDasharray: '50', strokeDashoffset: '0' }
        },
        // Trade-in animations
        pulsateAttention: { // Kept for Confirmation Page trade-in badge
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 8px 24px rgba(253, 160, 1, 0.4)'
          },
          '50%': {
            transform: 'scale(1.08)',
            boxShadow: '0 12px 36px rgba(253, 160, 1, 0.6)'
          }
        },
        // Utility animations
        slideUp: { // Kept for general UI transitions
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: { // Kept for feature list items
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        shimmer: { // Kept for Card Headers
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' }
        },
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
        // Card animations
        'card-entrance': 'cardEntrance 1s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        // Button animations
        // 'button-shine': 'buttonShine 0.6s ease', // This animation name was not used by EnhancedButton, the effect is inline
        // Warning animations
        'warning-stripe': 'warningStripe 2s linear infinite', 
        'intense-pulsate-warning': 'intensePulsateWarning 1.8s ease-in-out infinite',
        'intense-warning-ring': 'intenseWarningRing 1.8s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s ease-in-out infinite',
        'pulse-warning': 'pulseWarning 2s ease-in-out infinite',
        // Success animations
        'success-pulse': 'successPulse 2s ease-in-out infinite',
        'check-draw': 'checkDraw 1s ease-out 0.3s both',
        // Trade-in animations
        'pulsate-attention': 'pulsateAttention 2s ease-in-out infinite',
        // General utility animations
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in': 'slideIn 0.3s ease-out forwards', 
        'shimmer': 'shimmer 8s ease-in-out infinite', 
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
      // Custom utilities
      textShadow: {
        'default': '0 2px 4px rgba(0, 36, 85, 0.1)'
      },
      transitionTimingFunction: {
        'cubic-bezier': 'cubic-bezier(0.25, 0.8, 0.25, 1)'
      },
      saturate: {
        '75': '.75',
      }
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 36, 85, 0.1)',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
} satisfies Config;
