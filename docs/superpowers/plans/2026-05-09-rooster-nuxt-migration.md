---
title: rooster-chess — Jekyll → Nuxt 3 migration
date: 2026-05-09
scope: PR/iteration #1 (no Supabase, no admin CMS)
out_of_scope: [Supabase admin login, content CMS — iteration #2]
languages: [en, ua, pl]
languages_dropped: [ru]
---

# rooster-chess: Jekyll → Nuxt 3 migration plan

## Decisions (locked-in from 2026-05-09 brainstorm)

| Topic | Decision |
|---|---|
| Stack | Nuxt 3 SSG + Vue 3 `<script setup>` + TypeScript + Tailwind CSS |
| Build | `nuxt generate` → static HTML/CSS/JS in `.output/public/` |
| Dev | Vite (built into Nuxt 3) replaces Gulp 3.x |
| i18n | `@nuxtjs/i18n`, strategy `prefix_except_default` (en on `/`, others prefixed) |
| Locales | `en` (default), `ua`, `pl`. **`ru` dropped.** |
| URL preservation | `/`, `/ua/`, `/pl/`, `/home/` preserved 1:1; `/ru/` returns 410 Gone via `_redirects` |
| Carousel | `keen-slider/vue` (light, Vue 3 ready) replaces OwlCarousel |
| Smooth scroll | Native CSS `scroll-behavior: smooth` + Vue Transition (replaces single-page-nav jQuery) |
| Images | `@nuxt/image` with IPX provider, lazy + srcset + WebP variants |
| SEO | `useSeoMeta` per page, `@nuxtjs/sitemap`, `@nuxtjs/robots`, hreflang for all locales |
| Tests | Vitest + Vue Test Utils for components; integration test for sitemap & i18n |
| Hosting | Netlify (existing site, static deploy) |
| Analytics | TBD — handled in Task 14 (UA-66287816-1 is dead since 2023; Yandex Metrika is RU) |
| Visual styles | Tailwind for layout/utility; scoped `<style>` for decorative elements |
| Content | Light refresh of `home.md` portfolio + chess taglines per "новий вдох без фанатизму" — Task 12 |

## URL structure (target = source for Tasks 7, 9, 13)

| Existing (Jekyll) | Target (Nuxt) | Notes |
|---|---|---|
| `/` | `/` | EN chess landing — default locale, no prefix |
| `/ua/` | `/ua/` | UA chess landing |
| `/pl/` | `/pl/` | PL chess landing |
| `/ru/` | — | 410 Gone via `_redirects` |
| `/home/` | `/home/` | Portfolio — no locale prefix (single-language page) |

## Glossary

| Term | Meaning |
|---|---|
| **section** | One of 9 chess landing modules: hero, header, table, hiw, figures, rooster, game, team, svg-icons |
| **legacy** | Jekyll source (`_pages`, `_includes`, `_layouts`, `_scss`, `_js`, `gulpfile.js`, `Gemfile*`, `_config.yml`, `package.jekyll.json`) — present until Task 15 deletes it |
| **i18n key** | Translation slot in `i18n/locales/<locale>.json` — replaces Jekyll frontmatter `key: value` lines |

## Definition of Done (the run is `pass` only if ALL true)

1. `pnpm test` exits 0 (Vitest, all suites green)
2. `pnpm typecheck` exits 0 (`vue-tsc --noEmit`)
3. `pnpm build` (`nuxt generate`) exits 0; `.output/public/index.html` exists
4. `.output/public/sitemap.xml` includes 4 URLs: `/`, `/ua/`, `/pl/`, `/home/`
5. `.output/public/robots.txt` exists with correct `Sitemap:` line
6. Visual sanity: all 9 chess sections render in the generated HTML for at least one locale (grep test on output)
7. `/ru/` redirects to `/` (or returns 410) per `_redirects`
8. `package.json` `version` bumped to `1.0.0` (was effectively 0.x via Jekyll)
9. All Jekyll legacy files deleted (no `_pages`, `_includes`, `_layouts`, `_scss`, `_js`, `gulpfile.js`, `Gemfile*`, `_config.yml`)
10. Final commit pushed to the variant branch (`task2/A` or `task2/B`)
11. Claude explicitly signals "task complete"

---

## Tasks (TDD: failing test → impl → green → commit)

### Task 01 — Skeleton: Nuxt 3 init

**Goal:** scaffold Nuxt 3 project alongside Jekyll source. Don't delete Jekyll yet — Task 15.

**Steps:**
1. `mv package.json package.jekyll.json` (preserve)
2. Run `pnpm dlx nuxi@latest init . --force --gitInit=false --packageManager=pnpm`
3. Add `typescript`, `vue-tsc` as devDeps
4. `pnpm install`
5. Add `"typecheck": "vue-tsc --noEmit"` and `"test": "vitest run"` scripts to new `package.json`

**Test (failing first):** `pnpm typecheck` — must pass on empty Nuxt skeleton.

**Commit:** `chore: init Nuxt 3 + TypeScript skeleton`

---

### Task 02 — Tooling: Tailwind, Vitest, ESLint

**Goal:** add styling and test infrastructure.

**Steps:**
1. `pnpm add -D @nuxtjs/tailwindcss tailwindcss postcss autoprefixer`
2. `pnpm add -D vitest @vue/test-utils @vitejs/plugin-vue jsdom`
3. Create `tailwind.config.ts` with `content: ['./components/**/*.vue', './pages/**/*.vue', './app.vue']`
4. Create `assets/css/main.css` with `@tailwind base/components/utilities`
5. Add `@nuxtjs/tailwindcss` to `nuxt.config.ts` modules
6. Create `vitest.config.ts` with jsdom environment + Vue plugin

**Test (failing first):** Add `tests/smoke.test.ts` with `import { mount } from '@vue/test-utils'; test('mount works', () => { ... })`. Run `pnpm test` — passes.

**Commit:** `chore: add Tailwind, Vitest, Vue Test Utils`

---

### Task 03 — i18n: install and configure 3 locales

**Goal:** `@nuxtjs/i18n` set up with `en` (default), `ua`, `pl`.

**Steps:**
1. `pnpm add @nuxtjs/i18n`
2. Create `i18n/locales/en.json`, `ua.json`, `pl.json` with chess translation keys extracted from existing `_pages/chess-*.md` frontmatter (≈22 keys per locale: `ItsNotChessTable`, `ItsWar`, `Table`, `ChessPieces`, `Game`, `Team`, ... `KyivUkraine`)
3. Configure `nuxt.config.ts`:
   ```ts
   i18n: {
     locales: [
       { code: 'en', iso: 'en-US', file: 'en.json' },
       { code: 'ua', iso: 'uk-UA', file: 'ua.json' },
       { code: 'pl', iso: 'pl-PL', file: 'pl.json' }
     ],
     defaultLocale: 'en',
     strategy: 'prefix_except_default',
     langDir: 'locales/',
     bundle: { optimizeTranslationDirective: false }
   }
   ```

**Test:** `tests/i18n.test.ts` — load each JSON and assert all 3 files have the same set of keys (no missing translations).

**Commit:** `feat(i18n): configure 3 locales (en/ua/pl), drop ru`

---

### Task 04 — Asset migration: copy `assets/img/` to `public/img/`

**Goal:** Nuxt serves images from `public/`. Existing 78 images preserved at same paths.

**Steps:**
1. `cp -R assets/img/ public/img/` (78 files, ~10 MB)
2. `cp -R assets/fonts/ public/fonts/`
3. `pnpm add @nuxt/image`
4. Add `'@nuxt/image'` to `nuxt.config.ts` modules
5. Configure provider: `image: { provider: 'ipx', formats: ['webp', 'avif', 'jpeg'] }`

**Test:** `tests/assets.test.ts` — assert `public/img/og-images/chess.jpg` exists (file system test).

**Commit:** `feat: migrate static assets to public/, add @nuxt/image (ipx)`

---

### Task 05 — Layouts: default + chess layout shell

**Goal:** create `layouts/default.vue` (used by all pages) with skeleton header/footer slot.

**Steps:**
1. `layouts/default.vue` with `<slot />` and locale-aware `<html lang="...">` via `useHead`
2. `components/LocaleSwitcher.vue` — switches between en/ua/pl, preserves current path
3. `<NuxtLink>` with `:to="$switchLocalePath('en')"` etc.

**Test:** `tests/components/LocaleSwitcher.test.ts` — mounts switcher, simulates click on `ua`, asserts emitted route.

**Commit:** `feat: add default layout + locale switcher component`

---

### Task 06 — Component: HeroSection

**Goal:** first of 9 chess sections. Mirrors `_includes/chess/01-hero.html`.

**Steps:**
1. `components/sections/HeroSection.vue` — uses `useI18n` for `ItsNotChessTable`, `ItsWar`. Tailwind classes for layout, scoped `<style>` for `.icon-gods-chess` SVG bg.
2. Hero background image: `<NuxtImg src="/img/chess/hero/bg.jpg" sizes="..." />`

**Test:** `tests/components/HeroSection.test.ts` — mount with i18n stub, assert `<h1>` and `<h2>` text content match the keys.

**Commit:** `feat(section): HeroSection (1/9)`

---

### Task 07 — Components: 8 remaining sections

**Goal:** port sections 02-09 from `_includes/chess/`.

**Steps (one subtask each, atomic commit per section):**
1. `HeaderSection` (02) — anchor nav with smooth scroll (native CSS, no jQuery)
2. `TableSection` (03) — uses `keen-slider/vue` for the carousel
3. `HiwSection` (04) — second `keen-slider/vue` instance
4. `FiguresSection` (05) — chess pieces grid, no carousel
5. `RoosterSection` (06) — branding block
6. `GameSection` (07)
7. `TeamSection` (08) — Anton Pivniuk + Ihor Orlovskyi cards, uses i18n keys
8. `SvgIconsSection` (09) — inline SVG sprite definitions

**Test (per section):** `tests/components/<Name>.test.ts` — mount with i18n stub, assert key DOM elements exist.

**Carousel install:** `pnpm add keen-slider`

**Commit:** one atomic commit per section: `feat(section): TableSection (3/9)` etc.

---

### Task 08 — Page: chess landing (`pages/index.vue`)

**Goal:** assemble all 9 sections into a single page; works for default locale (en), `/ua/`, `/pl/`.

**Steps:**
1. `pages/index.vue` imports and orders all 9 `<NuxtLink>` section components
2. `useSeoMeta({ title: ..., description: ..., ogImage: 'https://rooster-chess.netlify.app/img/og-images/chess.jpg' })` — note `.netlify.app` (was `.netlify.com` — deprecated)
3. Hreflang tags via `useHead` referencing all locales
4. Locale-routed automatically by `@nuxtjs/i18n` — same page mounted for `/`, `/ua/`, `/pl/`

**Test:** `tests/pages/index.test.ts` — mount the page, assert all 9 section components are present in render output.

**Commit:** `feat(page): chess landing assembles 9 sections + SEO meta`

---

### Task 09 — Page: portfolio (`pages/home.vue`)

**Goal:** port `_pages/home.md` portfolio content. Single-locale (en only — no i18n prefix), accessible at `/home/`.

**Steps:**
1. `pages/home.vue` (Nuxt routes `pages/home.vue` to `/home`; trailing slash via `nitro.routeRules`)
2. Set `useSeoMeta` and `definePageMeta({ key: 'home' })`
3. Skip i18n for this route via `nuxtI18n: false` in `definePageMeta` (or render plain content)
4. **Content refresh per Task 12** — for now, port 1:1

**Test:** `tests/pages/home.test.ts` — mount, assert "Rooster Studio" h1 + at least 4 portfolio entries.

**Commit:** `feat(page): home portfolio at /home/`

---

### Task 10 — SEO: sitemap + robots + hreflang

**Goal:** machine-discoverable site for crawlers.

**Steps:**
1. `pnpm add @nuxtjs/sitemap @nuxtjs/robots`
2. Add modules to `nuxt.config.ts`
3. `site.url = 'https://rooster-chess.netlify.app'` (or domain user provides)
4. Sitemap should auto-include 4 URLs: `/`, `/ua/`, `/pl/`, `/home/`
5. `robots.txt`: `User-agent: *`, `Allow: /`, `Sitemap: <url>`
6. Hreflang: in `pages/index.vue`, emit `<link rel="alternate" hreflang="en|ua|pl|x-default" />` via `useHead`

**Test:** `tests/seo.test.ts` — after `nuxt generate` (in CI mode or unit), assert `dist/sitemap.xml` contains all 4 URLs.

**Commit:** `feat(seo): sitemap, robots.txt, hreflang for 3 locales`

---

### Task 11 — Redirects: `/ru/` → 410 Gone

**Goal:** drop the RU locale gracefully. Old links return 410 (preferred) or redirect to `/`.

**Steps:**
1. Create `public/_redirects` (Netlify):
   ```
   /ru/*    /     410!
   ```
2. Document in plan: this signals "permanently gone" to crawlers, faster de-indexing than 301

**Test:** `tests/redirects.test.ts` — read `public/_redirects`, assert it contains the `/ru` rule.

**Commit:** `feat(redirects): /ru/ → 410 Gone`

---

### Task 12 — Content refresh ("новий вдох без фанатизму")

**Goal:** light text update — fix anachronisms, dead links, freshen portfolio.

**Steps:**
1. Review `home.md` portfolio:
   - Verify each external link still resolves (curl HEAD); replace dead links with archived versions or remove
   - Optionally add 1-2 newer projects if the user has any (note in commit; Claude can add `<!-- TODO: user input -->` placeholder)
2. Review chess taglines:
   - `ItsWar` → "It's a War" reads tone-deaf in 2026 with the war in Ukraine. Suggest `"It's a Battle"` or `"More Than a Game"` per locale.
   - Mark replaced strings in commit message; user can revert via review.
3. Update `i18n/locales/*.json` accordingly.

**Test:** none (subjective). Commit message documents every text change as a bullet list.

**Commit:** `content: light refresh — replace 'It's a War' with 'It's a Battle', verify portfolio links`

---

### Task 13 — Smooth scroll + scroll-spy nav (jQuery replacement)

**Goal:** drop jQuery `single-page-nav` and OwlCarousel (the latter handled in Task 07).

**Steps:**
1. In `HeaderSection.vue`: `<a href="#table" class="...">` plus CSS `html { scroll-behavior: smooth; }` in `assets/css/main.css`
2. Active-link tracking via `IntersectionObserver` in a composable `useScrollSpy(sectionIds: string[])` returning current active id; bind to `class="active"` on the matching anchor
3. Verify no `jquery`, `$`, `singlePageNav` anywhere via grep

**Test:** `tests/composables/useScrollSpy.test.ts` — mock IO, simulate intersection, assert reactive ref updates.

**Commit:** `feat(nav): scroll-spy via IntersectionObserver, drop jQuery`

---

### Task 14 — Analytics decision

**Goal:** decommission dead/RU trackers; add modern alternative or no-op.

**Status:** USER DECISION REQUIRED during plan review. Three options:

**Option 14a (recommended):** remove both Universal Analytics (dead since July 2023) and Yandex Metrika (RU service, anachronistic for UA brand in 2026). Add stub `components/Analytics.vue` that does nothing. Commit message lists what was removed.

**Option 14b:** add Google Analytics 4 (GA4). User must provide `G-XXXXXXX` measurement ID. Wire via `useHead` injecting `<script src="https://www.googletagmanager.com/gtag/js?id=...">`.

**Option 14c:** preserve dead UA tag inertia + remove Yandex only. Pragmatic if user fears breaking some downstream tool that polls UA endpoint (unlikely in 2026).

**Test:** `tests/analytics.test.ts` — assert no `yandex`, no `mc.yandex.ru`, no `UA-` literal in built output.

**Commit:** `chore(analytics): <one of: remove all / add GA4 G-XXX / remove Yandex only>`

---

### Task 15 — Cleanup: delete Jekyll source

**Goal:** repository contains only Nuxt 3 source. No leftover Ruby, no Gulp, no SCSS dirs.

**Steps:**
1. Verify Nuxt build is green: `pnpm test && pnpm typecheck && pnpm build`
2. Delete: `_pages/`, `_includes/`, `_layouts/`, `_scss/`, `_js/`, `gulpfile.js/`, `assets/` (already copied to `public/`), `Gemfile`, `Gemfile.lock`, `_config.yml`, `package.jekyll.json`, `package-lock.json` (was npm; pnpm now)
3. Update `.gitignore` for Nuxt (`.nuxt/`, `.output/`, `node_modules/`)
4. Update `README.md` with: stack, scripts, dev/build/deploy
5. Bump `package.json` `version` to `1.0.0`

**Test:** `tests/cleanup.test.ts` — assert none of the deleted paths exist.

**Commit:** `chore: remove Jekyll source, bump to 1.0.0`

---

## Post-migration sanity (manual, by reviewer — not automated)

- [ ] `pnpm dev` → open `http://localhost:3000/`, click locale switcher, verify all 3 locales render
- [ ] `pnpm build` → serve `.output/public/` with `pnpm dlx serve .output/public` and click through
- [ ] All 9 sections render at `/`, `/ua/`, `/pl/`
- [ ] `/home/` shows portfolio
- [ ] `/ru/` returns 410 (or redirects)
- [ ] `view-source` confirms hreflang tags
- [ ] `view-source: /sitemap.xml` shows 4 URLs
- [ ] No jQuery in bundle: `grep -ri 'jquery' .output/public/`
- [ ] No Yandex / dead UA in bundle (depends on Task 14 outcome)

## Out of scope (iteration #2)

- Supabase auth + admin login
- Content CMS (admin-edit-content-and-save flow)
- Image cropping / focal-point editor
- Per-locale dynamic content from DB
- Form submissions / contact

These are deferred to a future plan after iteration #1 ships green.
