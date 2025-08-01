module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Arial', 'sans-serif'],
      },
      screens: {
        'ipadpro': '1024px',
      },
      corePlugins: {
        preflight: true,
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}