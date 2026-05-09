import { describe, expect, it } from 'vitest'
import { existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(__dirname, '..')

describe('static asset migration', () => {
  it('public/img/og-images/chess.jpg exists', () => {
    expect(existsSync(resolve(root, 'public/img/og-images/chess.jpg'))).toBe(true)
  })

  it('public/img has at least the 78 source images', () => {
    const count = countFiles(resolve(root, 'public/img'))
    expect(count).toBeGreaterThanOrEqual(78)
  })

  it('public/fonts contains the icomoon set', () => {
    for (const ext of ['eot', 'svg', 'ttf', 'woff']) {
      expect(existsSync(resolve(root, `public/fonts/icomoon.${ext}`))).toBe(true)
    }
  })
})

function countFiles(dir: string): number {
  let n = 0
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) n += countFiles(resolve(dir, entry.name))
    else n += 1
  }
  return n
}
