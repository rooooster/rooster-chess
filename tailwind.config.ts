import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.ts',
    './app.vue',
    './app/**/*.{vue,ts}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
