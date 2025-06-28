
/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        text: "var(--color-text)",
        subtle: "var(--color-subtle-text)",
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        overlay: "var(--color-overlay)",
        border: "var(--color-border)",
        white: "var(--color-white)",
        "on-dark": "var(--color-text-on-dark)",
        'title-on-dark': 'var(--color-title-on-dark)',
        surface: "var(--color-surface)",
      },
    },
  },
  plugins: [],
};