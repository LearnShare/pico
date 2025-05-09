/** @type {import('next').NextConfig} */
const {
  fontFamily,
} = require('tailwindcss/defaultTheme');

const nextConfig = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-sans)',
          ...fontFamily.sans,
        ],
      },
    },
  },
};

module.exports = nextConfig;
