import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate"; // Keep the import if you prefer it

export default {
	darkMode: ["class", '[data-theme="dark"]'], // Updated darkMode selector
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: { // Ensure sans is defined
				sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
			},
			colors: { // Colors object starts here
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				teal: { // Example custom color palette
					DEFAULT: '#0d9488',
					50: '#f0fdfa',
					100: '#ccfbf1',
					200: '#99f6e4',
					300: '#5eead4',
					400: '#2dd4bf',
					500: '#14b8a6',
					600: '#0d9488',
					700: '#0f766e',
					800: '#115e59',
					900: '#134e4a',
					950: '#042f2e',
				},
				coral: { // Example custom color palette
					DEFAULT: '#f97316',
					50: '#fff7ed',
					100: '#ffedd5',
					200: '#fed7aa',
					300: '#fdba74',
					400: '#fb923c',
					500: '#f97316',
					600: '#ea580c',
					700: '#c2410c',
					800: '#9a3412',
					900: '#7c2d12',
				}
                // ** FIX: Keyframes were incorrectly placed inside 'colors' before **
			}, // colors object ends here
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: { // Keyframes object starts here
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': { // Correctly placed
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'slide-in-up': { // Correctly placed
					 '0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				 'spin': { // Correctly placed
					from: { transform: 'rotate(0deg)' },
					to: { transform: 'rotate(360deg)' },
				 },
				"slide-down": { // Shadcn/Radix animation
					from: { height: "0" },
					to: { height: "var(--radix-collapsible-content-height)" },
				},
				"slide-up": { // Shadcn/Radix animation
					from: { height: "var(--radix-collapsible-content-height)" },
					to: { height: "0" },
				},
				"caret-blink": { // Shadcn/Radix animation
					 "0%,70%,100%": { opacity: "1" },
					 "20%,50%": { opacity: "0" },
				},
			}, // keyframes object ends here
			animation: { // Animation object starts here
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'slide-in-up': 'slide-in-up 0.5s ease-out forwards',
				'spin-slow': 'spin 3s linear infinite',
				"slide-down": "slide-down 0.2s ease-out",
				"slide-up": "slide-up 0.2s ease-out",
				"caret-blink": "caret-blink 1.25s ease-out infinite",
			}, // animation object ends here
		} // extend object ends here
	}, // theme object ends here
	plugins: [tailwindcssAnimate], // Use the imported variable
} satisfies Config;