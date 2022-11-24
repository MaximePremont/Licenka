/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cabinet: ['Cabinet Grotesk'],
      },
      colors: {
        background: '#0C0026',
        primary: '#FF4405',
        secondary: '#AD00FF',
        special: 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary',
        speColor: 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary to-secondary',
      },
    },
  },
  plugins: [],
}
