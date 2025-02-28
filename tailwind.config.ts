/** @type {import('tailwindcss').Config} */
import { withTV } from 'tailwind-variants/transformer'
import tailwindcssAnimate from 'tailwindcss-animate'
import tailwindcssReactAriaComponents from 'tailwindcss-react-aria-components'

const config = withTV({
  darkMode: ['class'],
  content: [ "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}", ],
  theme: {
  	extend: {
  		colors: {
  			light: 'hsl(var(--light))',
  			dark: 'hsl(var(--dark))',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			toggle: 'hsl(var(--toggle))',
  			bg: 'hsl(var(--bg))',
  			fg: 'hsl(var(--fg))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				fg: 'hsl(var(--primary-fg))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				fg: 'hsl(var(--secondary-fg))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			tertiary: {
  				DEFAULT: 'hsl(var(--tertiary))',
  				fg: 'hsl(var(--tertiary-fg))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				fg: 'hsl(var(--accent-fg))',
  				subtle: 'hsl(var(--accent-subtle))',
  				'subtle-fg': 'hsl(var(--accent-subtle-fg))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			success: {
  				DEFAULT: 'hsl(var(--success))',
  				fg: 'hsl(var(--success-fg))'
  			},
  			info: {
  				DEFAULT: 'hsl(var(--info))',
  				fg: 'hsl(var(--info-fg))'
  			},
  			danger: {
  				DEFAULT: 'hsl(var(--danger))',
  				fg: 'hsl(var(--danger-fg))'
  			},
  			warning: {
  				DEFAULT: 'hsl(var(--warning))',
  				fg: 'hsl(var(--warning-fg))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				fg: 'hsl(var(--muted-fg))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			overlay: {
  				DEFAULT: 'hsl(var(--overlay))',
  				fg: 'hsl(var(--overlay-fg))'
  			},
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
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			'3xl': 'calc(var(--radius) + 7.5px)',
  			'2xl': 'calc(var(--radius) + 5px)',
  			xl: 'calc(var(--radius) + 2.5px)',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			'playwrite': ['var(--font-playwrite)'],
  		}
  	}
  },
  plugins: [
    tailwindcssAnimate,
    tailwindcssReactAriaComponents
  ]
})

export default config
