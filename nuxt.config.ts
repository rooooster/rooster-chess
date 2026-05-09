export default defineNuxtConfig({
  compatibilityDate: '2026-05-09',
  devtools: { enabled: true },
  ssr: true,
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  css: ['~/app/css/main.css'],
  tailwindcss: {
    cssPath: '~/app/css/main.css',
    configPath: '~/tailwind.config.ts'
  },
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'ua', iso: 'uk-UA', file: 'ua.json', name: 'Українська' },
      { code: 'pl', iso: 'pl-PL', file: 'pl.json', name: 'Polski' }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default'
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
