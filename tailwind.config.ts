import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-teal': '#0f766e',
        'brand-ink': '#0f172a',
        'brand-paper': '#f6faf8',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(15, 118, 110, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
