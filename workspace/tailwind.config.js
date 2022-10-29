/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/webapp/app/**/*.{js,ts,jsx,tsx}',
    './apps/webapp/pages/**/*.{js,ts,jsx,tsx}',
    './apps/webapp/components/**/*.{js,ts,jsx,tsx}',
    './libs/web-ui/src/**/*.{js,ts,tsx,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
