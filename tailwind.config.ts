import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#10B981',
        accent: '#F59E0B',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2563EB 0%, #10B981 100%)',
      },
      borderRadius: {
        'lg': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 20px 40px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
export default config
