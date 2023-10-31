/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          'tomato': 'hsl(4, 100%, 67%)'
        },
        neutral: {
          'dark-slate-grey': 'hsl(234, 29%, 20%)',
          'charcoal-grey': 'hsl(235, 18%, 26%)',
          'grey': 'hsl(231, 7%, 60%)',
          'white': 'hsl(0, 0%, 100%)'
        },
      },
    },
  },
  plugins: [],
}
