import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const file = resolve(__dirname, '../public/_redirects')

describe('Netlify _redirects', () => {
  it('drops /ru/* with HTTP 410 (gone)', () => {
    const content = readFileSync(file, 'utf8')
    expect(content).toMatch(/^\/ru\/\*\s+\/\s+410!\s*$/m)
  })
})
