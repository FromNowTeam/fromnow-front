/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}', './public/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        fnPink: '#FEC7C6',
        fnBlue: '#8EB9E6',
        fnYellow: '#FEE987',
        fnGreen: '#B0DDC1',
        black900: '#1C1C1E',
        black700: '#6E6D73',
        black500: '#B3B4B9',
        black300: '#E4E5EA',
        black100: '#FBFBFD',
      },
    },
    fontFamily: {
      PTDBlack: ['Pretendard-Black'],
      PTDBold: ['Pretendard-Bold'],
      PTDExtraBold: ['Pretendard-ExtraBold'],
      PTDExtraLight: ['Pretendard-ExtraLight'],
      PTDLight: ['Pretendard-Light'],
      PTDMedium: ['Pretendard-Medium'],
      PTDRegular: ['Pretendard-Regular'],
      PTDSemiBold: ['Pretendard-SemiBold'],
      PTDThin: ['Pretendard-Thin'],
      UhBeeBold: ['UhBee-Bold'],
      UhBee: ['UhBee'],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.w-fit': {
          width: 'fit-content',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover', 'focus']);
    },
  ],
};
