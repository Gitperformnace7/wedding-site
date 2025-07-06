/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'elegant': ['Crimson Text', 'serif'],
        'modern': ['Inter', 'sans-serif'],
        'script': ['Great Vibes', 'Allura', 'Alex Brush', 'Dancing Script', 'cursive'],
        'russian': ['Cormorant Garamond', 'PT Serif', 'serif'],
      },
      colors: {
        'wedding': {
          'black': '#1a1a1a',
          'white': '#fefefe',
          'cream': '#f5f5f0',
          'gold': '#d4af37',
          'gold-light': '#f4e8c1',
          'gray': '#f8f8f8',
          'gray-dark': '#333333',
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
} 