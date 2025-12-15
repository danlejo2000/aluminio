/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'otto-orange': '#F97316',
        'otto-dark': '#111827',   // Gris muy oscuro (Casi negro)
        'otto-panel': '#1F2937',  // Gris para paneles/tarjetas oscuras
        'otto-light-dark': '#374151',
        'otto-silver': '#F3F4F6', 
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        fadeIn: {
          'from': { opacity: 0 },
          'to': { opacity: 1 },
        },
        scaleIn: {
          'from': { opacity: 0, transform: 'scale(0.95)' },
          'to': { opacity: 1, transform: 'scale(1)' },
        },
        slideInRight: {
          'from': { transform: 'translateX(100%)' },
          'to': { transform: 'translateX(0)' },
        },
        fadeInDown: {
            'from': { opacity: 0, transform: 'translateY(-20px)' },
            'to': { opacity: 1, transform: 'translateY(0)' }
        },
        fadeInUp: {
            'from': { opacity: 0, transform: 'translateY(20px)' },
            'to': { opacity: 1, transform: 'translateY(0)' }
        }
      },
      animation: {
        blob: 'blob 7s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        fadeIn: 'fadeIn 0.3s ease-out',
        scaleIn: 'scaleIn 0.3s ease-out',
        slideInRight: 'slideInRight 0.3s ease-out',
        'fade-in-down': 'fadeInDown 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
      }
    },
  },
  plugins: [],
}