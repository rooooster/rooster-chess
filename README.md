# Rooster Chess

Marketing site for Rooster Studio's God's Chess product.

## Stack
- Nuxt 4 + Vue 3 + TypeScript
- Tailwind CSS v3
- @nuxtjs/i18n (en / ua / pl)
- @nuxt/image (ipx provider)
- @nuxtjs/sitemap + @nuxtjs/robots
- Vitest + @vue/test-utils for tests

## Scripts
- `pnpm install` — install dependencies
- `pnpm dev` — start dev server at http://localhost:3000
- `pnpm test` — run unit tests (Vitest)
- `pnpm typecheck` — run vue-tsc --noEmit
- `pnpm build` — generate static site (alias for `nuxt generate`)
- `pnpm preview` — preview the generated `.output/public/`

## Deploy
- Hosting: Netlify (existing site)
- Build command: `pnpm build`
- Publish directory: `.output/public`
- Static redirects in `public/_redirects` (e.g., `/ru/*` → 410 Gone)
