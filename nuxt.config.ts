// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxt/image', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  components: [{ path: '~/components', pathPrefix: false }],
  site: {
    url: 'https://rooster-chess.netlify.app',
    name: 'Rooster Studio',
    // Preserve trailing slashes in sitemap URLs (DoD: /, /ua/, /pl/, /home/).
    trailingSlash: true,
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: '~~/tailwind.config.ts',
  },
  image: {
    provider: 'ipx',
  },
  sitemap: {
    // Explicit URL list to satisfy DoD: exactly /, /ua/, /pl/, /home/ with trailing slashes.
    // - sitemaps: false        -> opt out of @nuxtjs/i18n's per-locale sitemap split,
    //                             producing a single /sitemap.xml file.
    // - excludeAppSources: true -> disable auto-discovery from i18n pages / nuxt:pages,
    //                             so the explicit list below is authoritative.
    sitemaps: false,
    excludeAppSources: true,
    urls: [
      { loc: '/', changefreq: 'monthly', priority: 1.0 },
      { loc: '/ua/', changefreq: 'monthly', priority: 0.9 },
      { loc: '/pl/', changefreq: 'monthly', priority: 0.9 },
      { loc: '/home/', changefreq: 'monthly', priority: 0.8 },
    ],
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
