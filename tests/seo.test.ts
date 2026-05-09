import { describe, it, expect } from 'vitest'
import { readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(__dirname, '..')
const config = readFileSync(resolve(root, 'nuxt.config.ts'), 'utf8')

const isFile = (p: string) => {
  try { return statSync(p).isFile() }
  catch { return false }
}

describe('SEO config', () => {
  it('registers @nuxtjs/sitemap and @nuxtjs/robots modules', () => {
    expect(config).toContain('@nuxtjs/sitemap')
    expect(config).toContain('@nuxtjs/robots')
  })

  it('sets site.url to the production URL', () => {
    expect(config).toMatch(/site\s*:\s*\{[^}]*url\s*:\s*['"]https:\/\/rooster-chess\.netlify\.app['"]/s)
  })
})

describe.skipIf(!isFile(resolve(root, '.output/public/sitemap.xml')))('SEO build artifacts', () => {
  it('sitemap includes 4 expected URLs', () => {
    const sitemap = readFileSync(resolve(root, '.output/public/sitemap.xml'), 'utf8')
    for (const path of ['/', '/ua/', '/pl/', '/home/']) {
      expect(sitemap).toContain('https://rooster-chess.netlify.app' + path)
    }
  })

  it('robots.txt has Sitemap line', () => {
    const robots = isFile(resolve(root, '.output/public/robots.txt'))
      ? readFileSync(resolve(root, '.output/public/robots.txt'), 'utf8')
      : ''
    expect(robots).toContain('Sitemap:')
  })
})
