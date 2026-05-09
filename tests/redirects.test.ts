import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('Netlify _redirects', () => {
  const redirects = readFileSync(resolve(__dirname, '../public/_redirects'), 'utf8')

  it('contains a /ru/* rule that returns 410 Gone', () => {
    expect(redirects).toMatch(/\/ru\/\*/)
    expect(redirects).toMatch(/410/)
  })
})
