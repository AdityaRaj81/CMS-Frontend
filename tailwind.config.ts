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
        legal: {
          navy: '#0B1F3A',
          gold: '#C8A951',
          charcoal: '#2B2E34',
          ivory: '#F7F5EF',
          red: '#8B1E1E',
        },
      },
      fontFamily: {
        serif: ['IBM Plex Serif', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        sidebar: '280px',
      },
      backgroundColor: {
        primary: '#0B1F3A',
        secondary: '#F7F5EF',
        accent: '#C8A951',
        danger: '#8B1E1E',
      },
      borderColor: {
        primary: '#0B1F3A',
        accent: '#C8A951',
        danger: '#8B1E1E',
      },
      textColor: {
        primary: '#0B1F3A',
        secondary: '#2B2E34',
        muted: '#6B7280',
        light: '#F7F5EF',
      },
    },
  },
  plugins: [require('tailwindcss/plugin')],
}
export default config
