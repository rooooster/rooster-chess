# rooster-chess

Marketing site for Rooster Studio's God's Chess project, ported from Jekyll to **Nuxt 3** (SSG) in 2026.

## Stack

- [Nuxt 3](https://nuxt.com) static-site generation (`nuxt generate`)
- Vue 3 `<script setup>` + TypeScript
- [Tailwind CSS](https://tailwindcss.com) + scoped `<style>` for decorative bits
- [@nuxtjs/i18n](https://i18n.nuxtjs.org) — `en` (default), `ua`, `pl`
- [@nuxt/image](https://image.nuxt.com) with the IPX provider
- [keen-slider](https://keen-slider.io) carousels (drop-in replacement for OwlCarousel)
- [@nuxtjs/sitemap](https://nuxtseo.com/sitemap) + [@nuxtjs/robots](https://nuxtseo.com/robots)
- Vitest + Vue Test Utils for unit tests
- [Netlify](https://www.netlify.com) static hosting

## URLs

| Path | Notes |
|---|---|
| `/` | English chess landing |
| `/ua/` | Ukrainian chess landing |
| `/pl/` | Polish chess landing |
| `/home/` | Studio portfolio (single locale) |
| `/ru/*` | Returns 410 Gone (see `public/_redirects`) |

## Scripts

```bash
pnpm install
pnpm dev          # Vite dev server with HMR
pnpm test         # Vitest unit tests
pnpm typecheck    # vue-tsc --noEmit
pnpm build        # nuxt generate → .output/public/
pnpm preview      # serve the static build
```

## Deploy

Push to `master`. Netlify builds with `pnpm build` and publishes `.output/public/`.

#### Have fun! :)
