/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['light'],
  },
  plugins: [daisyui],
}
