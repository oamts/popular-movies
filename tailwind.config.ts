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
        primary: '#E73980',
        secondary: '#861040',
      },
      fontSize: { '3.5xl': '2rem' },
      textColor: {
        'gray-700': '#323232',
        gray: '#646464',
      },
    },
  },
  plugins: [],
}
export default config
