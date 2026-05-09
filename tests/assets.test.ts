import { describe, it, expect } from 'vitest'
import { existsSync, statSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(__dirname, '..')
const countFiles = (dir: string): number => {
  if (!existsSync(dir)) return 0
  let count = 0
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = resolve(dir, entry.name)
    if (entry.isDirectory()) count += countFiles(p)
    else if (entry.isFile()) count += 1
  }
  return count
}

describe('public assets migration', () => {
  it('spot check: chess og-image is present and non-empty', () => {
    const p = resolve(root, 'public/img/og-images/chess.jpg')
    expect(existsSync(p)).toBe(true)
    expect(statSync(p).size).toBeGreaterThan(0)
  })

  it('public/img file count is at least 70', () => {
    const publicCount = countFiles(resolve(root, 'public/img'))
    expect(publicCount).toBeGreaterThanOrEqual(70)
  })

  it('public/img preserves expected sub-trees', () => {
    for (const sub of ['chess', 'favicons', 'fresco', 'home', 'og-images', 'owl-carousel']) {
      const p = resolve(root, 'public/img', sub)
      expect(existsSync(p), sub).toBe(true)
      expect(countFiles(p), sub).toBeGreaterThan(0)
    }
  })

  it('public/fonts/ exists and is non-empty', () => {
    const p = resolve(root, 'public/fonts')
    expect(existsSync(p)).toBe(true)
    expect(countFiles(p)).toBeGreaterThan(0)
  })
})
