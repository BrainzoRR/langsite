/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-bg': '#0d1117',
        'card-bg': '#161b22',
        'card-hover': '#1c2330',
        'border': '#30363d',
        'accent': '#58a6ff',
        'accent-green': '#3fb950',
        'accent-yellow': '#d29922',
        'accent-purple': '#bc8cff',
        'accent-orange': '#f78166',
        'accent-pink': '#ff7eb6',
      },
      fontFamily: {
        'display': ['Syne', 'sans-serif'],
        'body': ['DM Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
