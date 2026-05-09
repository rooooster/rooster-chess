// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxt/image'],
  components: [{ path: '~/components', pathPrefix: false }],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: '~~/tailwind.config.ts',
  },
  image: {
    provider: 'ipx',
  },
  nitro: {
    routeRules: {
      '/home': { redirect: '/home/' },
    },
  },
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'ua', iso: 'uk-UA', file: 'ua.json' },
      { code: 'pl', iso: 'pl-PL', file: 'pl.json' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    bundle: { optimizeTranslationDirective: false },
  },
})
