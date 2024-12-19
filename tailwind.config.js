/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0095F6',
        secondary: '#2a4856',
        pseudo: '#ffffff',
        primaryDark: '#333333',
        primaryLight: '#f0f4fa',
        secondaryLight: '#8f908f',
        lightGreen: '#82d16f',
        lightBlue: '#0095F6',
        lightYellow: '#ffb606',
        lightRed: '#dd4b39',
      },
      fontFamily: {
        sans: ['"Inter"'],
        'sans-serif': ['"Inter", sans-serif'],
      },
      fontWeight: {
        'medium': 500,
        'bold': 600,
        'black': 900,
      },
      fontSize: {
        'xs': '0.75rem',  // Extra small 12.0px
        'sm': '0.875rem', // Small 14.0px
        'base': '1rem',    // Base font size 16.0px (default)
        'lg': '1.125rem',  // Large 18.0px
        'xl': '1.25rem',   // Extra large 20.0px
        '2xl': '1.5rem',   // 2x large 24.0px
        '3xl': '1.875rem', // 3x large 30.0px
        '4xl': '2.25rem',  // 4x large 36.0px
        '5xl': '3rem',     // 5x large 48.0px
      }
    },
    screens: {
      max: '360px',
      sm: '640px',
      middle: '768px',
      mid: '780px',
      center: '1200px',
      lg: '1280px',
      xl: '1920px',
    },
  },
  plugins: [],
};
