import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.vue',
    './pages/**/*.vue',
    './layouts/**/*.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
