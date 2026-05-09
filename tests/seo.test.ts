import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import nuxtConfig from '../nuxt.config'

const root = resolve(__dirname, '..')

describe('SEO config (static)', () => {
  it('sitemap config lists all 4 URLs', () => {
    const cfg = nuxtConfig as { sitemap?: { urls?: Array<{ loc: string }> } }
    const locs = (cfg.sitemap?.urls ?? []).map((u) => u.loc).sort()
    expect(locs).toEqual(['/', '/home/', '/pl/', '/ua/'])
  })

  it('site.url is https rooster-chess.netlify.app', () => {
    const cfg = nuxtConfig as { site?: { url?: string } }
    expect(cfg.site?.url).toBe('https://rooster-chess.netlify.app')
  })

  it('robots config references the sitemap', () => {
    const cfg = nuxtConfig as { robots?: { sitemap?: string[] } }
    expect(cfg.robots?.sitemap).toContain('/sitemap.xml')
  })

  it('hreflang tags wired in pages/index.vue', () => {
    const idx = readFileSync(resolve(root, 'pages/index.vue'), 'utf8')
    expect(idx).toContain("hreflang: 'en'")
    expect(idx).toContain("hreflang: 'uk'")
    expect(idx).toContain("hreflang: 'pl'")
    expect(idx).toContain("hreflang: 'x-default'")
  })

  it('built sitemap.xml after build contains all 4 URLs (skipped if not built)', () => {
    const file = resolve(root, '.output/public/sitemap.xml')
    if (!existsSync(file)) return
    const xml = readFileSync(file, 'utf8')
    for (const path of ['/', '/ua/', '/pl/', '/home/']) {
      expect(xml).toContain(`https://rooster-chess.netlify.app${path}`)
    }
  })
})
