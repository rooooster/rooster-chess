import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(__dirname, '..')

const legacyPaths = [
  '_pages',
  '_includes',
  '_layouts',
  '_scss',
  '_js',
  'gulpfile.js',
  'assets',
  'Gemfile',
  'Gemfile.lock',
  '_config.yml',
  'package.jekyll.json',
  'package-lock.json'
]

describe('Jekyll cleanup', () => {
  it.each(legacyPaths)('legacy path %s is gone', (p) => {
    expect(existsSync(resolve(root, p))).toBe(false)
  })

  it('package.json is bumped to 1.0.0', () => {
    const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
    expect(pkg.version).toBe('1.0.0')
  })
})
