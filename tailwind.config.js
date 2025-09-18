import heroui from '@heroui/react';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              main: 'var(--color-blue-200)',
              DEFAULT: 'var(--color-blue-400)',
            },
          },
        },
        dark: {
          colors: {
            primary: {
              main: 'var(--color-yellow-200)',
              DEFAULT: 'var(--color-yellow-400)',
            },
          },
        },
      },
    }),
  ],
};
