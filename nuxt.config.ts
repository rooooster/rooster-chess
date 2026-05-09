export default defineNuxtConfig({
  compatibilityDate: '2026-05-09',
  devtools: { enabled: true },
  ssr: true,
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/app/css/main.css'],
  tailwindcss: {
    cssPath: '~/app/css/main.css',
    configPath: '~/tailwind.config.ts'
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})
