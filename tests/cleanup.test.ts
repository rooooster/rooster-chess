import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(__dirname, '..')

const SHOULD_NOT_EXIST = [
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
  'package-lock.jekyll.json',
  'README.jekyll.md',
]

describe('Jekyll legacy cleanup', () => {
  it.each(SHOULD_NOT_EXIST)('%s is removed', (path) => {
    expect(existsSync(resolve(root, path)), path).toBe(false)
  })
})

describe('package.json version', () => {
  it('is bumped to 1.0.0', () => {
    const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
    expect(pkg.version).toBe('1.0.0')
  })
})
