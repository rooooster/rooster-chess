import { describe, it, expect } from 'vitest'
import { existsSync, statSync } from 'node:fs'
import { resolve } from 'node:path'

describe('public assets', () => {
  it('chess og-image exists in public/', () => {
    const p = resolve(__dirname, '../public/img/og-images/chess.jpg')
    expect(existsSync(p)).toBe(true)
    expect(statSync(p).size).toBeGreaterThan(0)
  })
})
