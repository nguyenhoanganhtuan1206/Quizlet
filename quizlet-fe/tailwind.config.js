/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        primary_sub: 'var(--color-primary-sub)',
      },
      fontFamily: {
        hurme: ["HurmeGeometricSans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
