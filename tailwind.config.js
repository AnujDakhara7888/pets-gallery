module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundSize: {
        '400%': '400% 400%',
      },
      keyframes: {
        gradientMove: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%, 100%': {
            'text-shadow':
              '0 0 20px rgba(255, 165, 0, 0.6), 0 0 40px rgba(255, 165, 0, 0.4)',
          },
          '50%': {
            'text-shadow':
              '0 0 30px rgba(255, 165, 0, 0.8), 0 0 60px rgba(255, 165, 0, 0.5)',
          },
        },
        pawWalk: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        gradientMove: 'gradientMove 8s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        glow: 'glow 3s ease-in-out infinite',
        pawWalk: 'pawWalk 2.0s ease-in-out infinite',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};