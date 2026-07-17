/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#a78bfa',
        secondary: '#22d3ee',
        dark: '#0f172a',
        darker: '#020617',
        panel: 'rgba(15, 23, 42, 0.6)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(167, 139, 250, 0.3)',
      },
    },
  },
  plugins: [],
};
