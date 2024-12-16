import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
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
  		colors: {
  			lavenderMist: {
  				'50': '#eeeaf2',
  				'100': '#e1dde8',
  				'200': '#d3cfdc',
  				'300': '#c3b2cc',
  				'400': '#b488bc',
  				'500': '#a167aa',
  				'600': '#8a4fa9',
  				'700': '#713794',
  				'800': '#582f77',
  				'900': '#3f2359',
  				'1000': '#29123d'
  			},
  			blushPink: {
  				'50': '#fee9e8',
  				'100': '#fddddd',
  				'200': '#fcc1c1',
  				'300': '#faa3a3',
  				'400': '#f88b8b',
  				'500': '#f76969',
  				'600': '#f54e47',
  				'700': '#f1332c',
  				'800': '#d62621',
  				'900': '#a91b1b',
  				'1000': '#7c1011'
  			},
  			iceMint: {
  				'50': '#e5f9f8',
  				'100': '#ccf2f1',
  				'200': '#99e4e3',
  				'300': '#66d6d5',
  				'400': '#33c8c7',
  				'500': '#00bab8',
  				'600': '#00a5a3',
  				'700': '#008f8e',
  				'800': '#007171',
  				'900': '#005353',
  				'1000': '#003636'
  			},
  			honeyCream: {
  				'50': '#fef1dc',
  				'100': '#fce7c5',
  				'200': '#fbd6a5',
  				'300': '#f7c285',
  				'400': '#f5ab61',
  				'500': '#f5973e',
  				'600': '#f38817',
  				'700': '#d57012',
  				'800': '#a7580d',
  				'900': '#793f08',
  				'1000': '#4b2704'
  			},
  			secondary: {
  				'50': '#F2F8F9',
  				'100': '#D9EAFB',
  				'200': '#BCF0F7',
  				'300': '#A0D6F4',
  				'400': '#76C2F0',
  				'500': '#2E9296',
  				'600': '#257884',
  				'700': '#1C5E72',
  				'800': '#134460',
  				'900': '#0A2A4E'
  			},
  			primary: {
  				'50': '#FFF7F2',
  				'100': '#FFEDD9',
  				'200': '#FFDFB6',
  				'300': '#FFD193',
  				'400': '#FFC370',
  				'500': '#EC9A1D',
  				'600': '#C98219',
  				'700': '#A66F15',
  				'800': '#835C11',
  				'900': '#60490D'
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
  		backgroundImage: {
  			'blush-lavender-50': 'linear-gradient(to right, #fee9e8, #eeeaf2)',
  			'blush-lavender-100': 'linear-gradient(to right, #fddddd, #e1dde8)',
  			'blush-lavender-200': 'linear-gradient(to right, #fcc1c1, #d3cfdc)',
  			'blush-lavender-300': 'linear-gradient(to right, #faa3a3, #c3b2cc)',
  			'blush-lavender-400': 'linear-gradient(to right, #f88b8b, #b488bc)',
  			'blush-lavender-500': 'linear-gradient(to right, #f76969, #a167aa)',
  			'blush-lavender-600': 'linear-gradient(to right, #f54e47, #8a4fa9)',
  			'blush-lavender-700': 'linear-gradient(to right, #f1332c, #713794)',
  			'blush-lavender-800': 'linear-gradient(to right, #d62621, #582f77)',
  			'blush-lavender-900': 'linear-gradient(to right, #a91b1b, #3f2359)',
  			'blush-lavender-1000': 'linear-gradient(to right, #7c1011, #29123d)',
  			'lavender-blush-50': 'linear-gradient(to right, #eeeaf2, #fee9e8)',
  			'lavender-blush-100': 'linear-gradient(to right, #e1dde8, #fddddd)',
  			'lavender-blush-200': 'linear-gradient(to right, #d3cfdc, #fcc1c1)',
  			'lavender-blush-300': 'linear-gradient(to right, #c3b2cc, #faa3a3)',
  			'lavender-blush-400': 'linear-gradient(to right, #b488bc, #f88b8b)',
  			'lavender-blush-500': 'linear-gradient(to right, #a167aa, #f76969)',
  			'lavender-blush-600': 'linear-gradient(to right, #8a4fa9, #f54e47)',
  			'lavender-blush-700': 'linear-gradient(to right, #713794, #f1332c)',
  			'lavender-blush-800': 'linear-gradient(to right, #582f77, #d62621)',
  			'lavender-blush-900': 'linear-gradient(to right, #3f2359, #a91b1b)',
  			'lavender-blush-1000': 'linear-gradient(to right, #29123d, #7c1011)',
  			'blush-lavender-50-tr-bl': 'linear-gradient(to bottom left, #fee9e8, #eeeaf2)',
  			'blush-lavender-100-tr-bl': 'linear-gradient(to bottom left, #fddddd, #e1dde8)',
  			'blush-lavender-200-tr-bl': 'linear-gradient(to bottom left, #fcc1c1, #d3cfdc)',
  			'blush-lavender-300-tr-bl': 'linear-gradient(to bottom left, #faa3a3, #c3b2cc)',
  			'blush-lavender-400-tr-bl': 'linear-gradient(to bottom left, #f88b8b, #b488bc)',
  			'blush-lavender-500-tr-bl': 'linear-gradient(to bottom left, #f76969, #a167aa)',
  			'blush-lavender-600-tr-bl': 'linear-gradient(to bottom left, #f54e47, #8a4fa9)',
  			'blush-lavender-700-tr-bl': 'linear-gradient(to bottom left, #f1332c, #713794)',
  			'blush-lavender-800-tr-bl': 'linear-gradient(to bottom left, #d62621, #582f77)',
  			'blush-lavender-900-tr-bl': 'linear-gradient(to bottom left, #a91b1b, #3f2359)',
  			'blush-lavender-1000-tr-bl': 'linear-gradient(to bottom left, #7c1011, #29123d)',
  			'lavender-blush-50-tr-bl': 'linear-gradient(to top right, #fee9e8, #eeeaf2)',
  			'lavender-blush-100-tr-bl': 'linear-gradient(to top right, #fddddd, #e1dde8)',
  			'lavender-blush-200-tr-bl': 'linear-gradient(to top right, #fcc1c1, #d3cfdc)',
  			'lavender-blush-300-tr-bl': 'linear-gradient(to top right, #faa3a3, #c3b2cc)',
  			'lavender-blush-400-tr-bl': 'linear-gradient(to top right, #f88b8b, #b488bc)',
  			'lavender-blush-500-tr-bl': 'linear-gradient(to top right, #f76969, #a167aa)',
  			'lavender-blush-600-tr-bl': 'linear-gradient(to top right, #f54e47, #8a4fa9)',
  			'lavender-blush-700-tr-bl': 'linear-gradient(to top right, #f1332c, #713794)',
  			'lavender-blush-800-tr-bl': 'linear-gradient(to top right, #d62621, #582f77)',
  			'lavender-blush-900-tr-bl': 'linear-gradient(to top right, #a91b1b, #3f2359)',
  			'lavender-blush-1000-tr-bl': 'linear-gradient(to top right, #7c1011, #29123d)',
  			'honeyCream-iceMint-50': 'linear-gradient(to right, #fef1dc, #e5f7f7)',
  			'honeyCream-iceMint-100': 'linear-gradient(to right, #fce7c5, #d4f0f0)',
  			'honeyCream-iceMint-200': 'linear-gradient(to right, #fbd6a5, #b8e5e6)',
  			'honeyCream-iceMint-300': 'linear-gradient(to right, #f7c285, #99dbdb)',
  			'honeyCream-iceMint-400': 'linear-gradient(to right, #f5ab61, #78d0d1)',
  			'honeyCream-iceMint-500': 'linear-gradient(to right, #f5973e, #55c5c5)',
  			'honeyCream-iceMint-600': 'linear-gradient(to right, #f38817, #40d4d5)',
  			'honeyCream-iceMint-700': 'linear-gradient(to right, #d57012, #25c1c1)',
  			'honeyCream-iceMint-800': 'linear-gradient(to right, #a7580d, #1b9898)',
  			'honeyCream-iceMint-900': 'linear-gradient(to right, #793f08, #147070)',
  			'honeyCream-iceMint-1000': 'linear-gradient(to right, #4b2704, #0d4a4a)',
  			'iceMint-honeyCream-50': 'linear-gradient(to left, #e5f7f7, #fef1dc)',
  			'iceMint-honeyCream-100': 'linear-gradient(to left, #d4f0f0, #fce7c5)',
  			'iceMint-honeyCream-200': 'linear-gradient(to left, #b8e5e6, #fbd6a5)',
  			'iceMint-honeyCream-300': 'linear-gradient(to left, #99dbdb, #f7c285)',
  			'iceMint-honeyCream-400': 'linear-gradient(to left, #78d0d1, #f5ab61)',
  			'iceMint-honeyCream-500': 'linear-gradient(to left, #55c5c5, #f5973e)',
  			'iceMint-honeyCream-600': 'linear-gradient(to left, #40d4d5, #f38817)',
  			'iceMint-honeyCream-700': 'linear-gradient(to left, #25c1c1, #d57012)',
  			'iceMint-honeyCream-800': 'linear-gradient(to left, #1b9898, #a7580d)',
  			'iceMint-honeyCream-900': 'linear-gradient(to left, #147070, #793f08)',
  			'iceMint-honeyCream-1000': 'linear-gradient(to left, #0d4a4a, #4b2704)',
  			'honeyCream-iceMint-50-tr-bl': 'linear-gradient(to bottom left, #fef1dc, #e5f7f7)',
  			'honeyCream-iceMint-100-tr-bl': 'linear-gradient(to bottom left, #fce7c5, #d4f0f0)',
  			'honeyCream-iceMint-200-tr-bl': 'linear-gradient(to bottom left, #fbd6a5, #b8e5e6)',
  			'honeyCream-iceMint-300-tr-bl': 'linear-gradient(to bottom left, #f7c285, #99dbdb)',
  			'honeyCream-iceMint-400-tr-bl': 'linear-gradient(to bottom left, #f5ab61, #78d0d1)',
  			'honeyCream-iceMint-500-tr-bl': 'linear-gradient(to bottom left, #f5973e, #55c5c5)',
  			'honeyCream-iceMint-600-tr-bl': 'linear-gradient(to bottom left, #f38817, #40d4d5)',
  			'honeyCream-iceMint-700-tr-bl': 'linear-gradient(to bottom left, #d57012, #25c1c1)',
  			'honeyCream-iceMint-800-tr-bl': 'linear-gradient(to bottom left, #a7580d, #1b9898)',
  			'honeyCream-iceMint-900-tr-bl': 'linear-gradient(to bottom left, #793f08, #147070)',
  			'honeyCream-iceMint-1000-tr-bl': 'linear-gradient(to bottom left, #4b2704, #0d4a4a)',
  			'iceMint-honeyCream-50-tr-bl': 'linear-gradient(to top right, #fef1dc, #e5f7f7)',
  			'iceMint-honeyCream-100-tr-bl': 'linear-gradient(to top right, #fce7c5, #d4f0f0)',
  			'iceMint-honeyCream-200-tr-bl': 'linear-gradient(to top right, #fbd6a5, #b8e5e6)',
  			'iceMint-honeyCream-300-tr-bl': 'linear-gradient(to top right, #f7c285, #99dbdb)',
  			'iceMint-honeyCream-400-tr-bl': 'linear-gradient(to top right, #f5ab61, #78d0d1)',
  			'iceMint-honeyCream-500-tr-bl': 'linear-gradient(to top right, #f5973e, #55c5c5)',
  			'iceMint-honeyCream-600-tr-bl': 'linear-gradient(to top right, #f38817, #40d4d5)',
  			'iceMint-honeyCream-700-tr-bl': 'linear-gradient(to top right, #d57012, #25c1c1)',
  			'iceMint-honeyCream-800-tr-bl': 'linear-gradient(to top right, #a7580d, #1b9898)',
  			'iceMint-honeyCream-900-tr-bl': 'linear-gradient(to top right, #793f08, #147070)',
  			'iceMint-honeyCream-1000-tr-bl': 'linear-gradient(to top right, #4b2704, #0d4a4a)'
  		},
  		keyframes: {
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
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities, e, theme, variants }: any) {
      const gradients = theme("backgroundImage") as Record<string, string>;
      const newUtilities = Object.keys(gradients).reduce((acc, key) => {
        acc[`.text-${e(key)}`] = {
          backgroundImage: gradients[key],
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        };
        return acc;
      }, {} as Record<string, any>);

      addUtilities(newUtilities, variants("textColor"));
    },
  ],
} satisfies Config;

export default config;
