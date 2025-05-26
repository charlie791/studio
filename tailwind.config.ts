
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
        // Background keyframes
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        gridPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.1' }
        },
        float1: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(10deg)' }
        },
        float2: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(-8deg)' }
        },
        float3: {
          '0%, 100%': { transform: 'translateY(0px) rotate(45deg)' },
          '50%': { transform: 'translateY(-25px) rotate(55deg)' }
        },
        float4: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(12deg)' }
        },
        particleDance: {
          '0%': { 
            transform: 'translateY(100vh) translateX(0px) scale(0) rotate(0deg)', 
            opacity: '0' 
          },
          '5%': { opacity: '1' },
          '25%': { 
            transform: 'translateY(75vh) translateX(30px) scale(1) rotate(90deg)' 
          },
          '50%': { 
            transform: 'translateY(50vh) translateX(-20px) scale(1.2) rotate(180deg)' 
          },
          '75%': { 
            transform: 'translateY(25vh) translateX(40px) scale(0.8) rotate(270deg)' 
          },
          '95%': { opacity: '1' },
          '100%': { 
            transform: 'translateY(-50px) translateX(-10px) scale(0) rotate(360deg)', 
            opacity: '0' 
          }
        },
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
        glowPulse: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.4' }
        },
        // Button animations
        buttonShine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        // Warning animations
        warningStripeKeyframe: { // Renamed from warningStripe to avoid conflict if used for something else
          '0%': { backgroundPosition: '-24px 0' }, // Adjusted as per guide for repeating-linear-gradient
          '100%': { backgroundPosition: '0 0' },
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
        // Success animations
        successPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        checkDraw: {
          '0%': { strokeDasharray: '50', strokeDashoffset: '50' },
          '100%': { strokeDasharray: '50', strokeDashoffset: '0' }
        },
        // Trade-in animations
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
        // Utility animations
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        shimmer: { // Reverted to linear shimmer
          '0%': { transform: 'translateX(-100%)' },
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
  			},
        pulseWarning: { 
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.85' },
        },
  		},
  		animation: {
        // Background animations
        'gradient-shift': 'gradientShift 20s ease infinite',
        'grid-pulse': 'gridPulse 10s ease-in-out infinite',
        'float-1': 'float1 6s ease-in-out infinite',
        'float-2': 'float2 6s ease-in-out infinite 2s',
        'float-3': 'float3 6s ease-in-out infinite 4s',
        'float-4': 'float4 6s ease-in-out infinite 3s',
        // Particle animations (generated dynamically in component)
        ...Array.from({ length: 20 }, (_, i) => ({
          [`particle-dance-${i + 1}`]: `particleDance 12s linear infinite` // Delay handled by inline style
        })).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
        // Card animations
        'card-entrance': 'cardEntrance 1s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        // Button animations
        'button-shine': 'buttonShine 0.6s ease',
        // Warning animations
        'warning-stripe': 'warningStripeKeyframe 2s linear infinite', // using the keyframe name
        'intense-pulsate-warning': 'intensePulsateWarning 1.8s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s ease-in-out infinite',
        // Success animations
        'success-pulse': 'successPulse 2s ease-in-out infinite',
        'check-draw': 'checkDraw 1s ease-out 0.3s both',
        // Trade-in animations
        'pulsate-attention': 'pulsateAttention 2s ease-in-out infinite',
        // General utility animations
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'shimmer': 'shimmer 8s ease-in-out infinite', // Reverted to 8s
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-warning': 'pulseWarning 2s ease-in-out infinite',
  		},
      // Custom utilities
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)'
      },
      backgroundSize: {
        'grid': '50px 50px',
        '200%': '200% 200%', // For gradientShift
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
