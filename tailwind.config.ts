
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
        // New animated background keyframes
        'gradient-shift': {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
            opacity: '0.3'
          },
          '33%': {
            transform: 'translate(30px, -30px) scale(1.1)',
            opacity: '0.5'
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
            opacity: '0.2'
          }
        },
        'gradient-shift-reverse': {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
            opacity: '0.3'
          },
          '33%': {
            transform: 'translate(-30px, 30px) scale(1.1)',
            opacity: '0.2'
          },
          '66%': {
            transform: 'translate(20px, -20px) scale(0.9)',
            opacity: '0.5'
          }
        },
        'float-slow': {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)'
          },
          '33%': {
            transform: 'translate(50px, -30px) scale(1.1)'
          },
          '66%': {
            transform: 'translate(-30px, 40px) scale(0.95)'
          }
        },
        'float-medium': {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)'
          },
          '50%': {
            transform: 'translate(-40px, -50px) scale(1.15)'
          }
        },
        'float-fast': {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)'
          },
          '25%': {
            transform: 'translate(30px, -20px) scale(1.05)'
          },
          '50%': {
            transform: 'translate(-20px, -40px) scale(1.1)'
          },
          '75%': {
            transform: 'translate(40px, 20px) scale(0.95)'
          }
        },
        particleDance: {
          '0%': { transform: 'translateY(100vh) translateX(0px) scale(0) rotate(0deg)', opacity: '0' },
          '5%': { opacity: '1' },
          '25%': { transform: 'translateY(75vh) translateX(30px) scale(1) rotate(90deg)' },
          '50%': { transform: 'translateY(50vh) translateX(-20px) scale(1.2) rotate(180deg)' },
          '75%': { transform: 'translateY(25vh) translateX(40px) scale(0.8) rotate(270deg)' },
          '95%': { opacity: '1' },
          '100%': { transform: 'translateY(-50px) translateX(-10px) scale(0) rotate(360deg)', opacity: '0' }
        },
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
        glowPulse: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.4' }
        },
        buttonShine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        warningStripe: { // For the repeating linear gradient background
          '0%': { backgroundPosition: '-24px 0' }, // Guide had '0%': { transform: 'translateX(-100%)' }, this is for bg position
          '100%': { backgroundPosition: '0 0' }, // Guide had '100%': { transform: 'translateX(100%)' }
        },
        intensePulsateWarning: {
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 8px 24px rgba(220, 38, 38, 0.4)'
          },
          '50%': {
            transform: 'scale(1.12)',
            boxShadow: '0 12px 40px rgba(220, 38, 38, 0.7)'
          }
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.2)', opacity: '0.4' },
          '100%': { transform: 'scale(1.4)', opacity: '0' }
        },
        intenseWarningRing: { // For the ::before pseudo-element
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.2)', opacity: '0.4' },
          '100%': { transform: 'scale(1.4)', opacity: '0' }
        },
        pulseWarning: { // General pulse for warning elements
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        successPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        checkDraw: {
          '0%': { strokeDasharray: '50', strokeDashoffset: '50' },
          '100%': { strokeDasharray: '50', strokeDashoffset: '0' }
        },
        pulsateAttention: {
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 8px 24px rgba(253, 160, 1, 0.4)'
          },
          '50%': {
            transform: 'scale(1.08)',
            boxShadow: '0 12px 36px rgba(253, 160, 1, 0.6)'
          }
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' }, // Changed from translateX to translateY to match guide
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: { // Linear glistening effect
          '0%': { transform: 'translateX(-100%)' }, // Corrected from rotational shimmer
          '100%': { transform: 'translateX(100%)' },
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
        // Background animations
        'gradient-shift': 'gradient-shift 20s ease-in-out infinite', // Corrected to use the 'gradient-shift' keyframe
        'gradient-shift-reverse': 'gradient-shift-reverse 25s ease-in-out infinite',
        'float-slow': 'float-slow 30s ease-in-out infinite',
        'float-medium': 'float-medium 20s ease-in-out infinite',
        'float-fast': 'float-fast 15s ease-in-out infinite',

        // Card animations
        'card-entrance': 'cardEntrance 1s ease-out',
        // Button animations
        // Warning animations
        'warning-stripe': 'warningStripe 2s linear infinite', // For the repeating gradient stripe background
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
        'slide-in': 'slideIn 0.3s ease-out forwards', // translateY
        'shimmer': 'shimmer 8s ease-in-out infinite', // Kept user preferred 8s
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
      // Custom utilities
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)'
      },
      backgroundSize: {
        'grid': '50px 50px',
        '200%': '200% 200%',
        '24px': '24px 100%',
      },
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
