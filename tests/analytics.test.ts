import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(__dirname, '..')

const SCAN_DIRS = ['app', 'public', 'i18n']
const SCAN_FILES = ['nuxt.config.ts', 'app.vue']

const PROHIBITED = [
  /\byandex\b/i,
  /mc\.yandex\.ru/i,
  /UA-66287816/,
  /googletagmanager/i,
  /\bgtag\b/i,
  /metrika/i,
]

function* walk(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (name.startsWith('.') || name === 'node_modules' || name === '.nuxt' || name === '.output') continue
    const s = statSync(p)
    if (s.isDirectory()) yield* walk(p)
    else if (s.isFile()) yield p
  }
}

describe('analytics removed', () => {
  it('no UA / Yandex / GTM references in Nuxt source', () => {
    const files: string[] = []
    for (const d of SCAN_DIRS) {
      const abs = join(root, d)
      try {
        for (const f of walk(abs)) files.push(f)
      } catch {}
    }
    for (const f of SCAN_FILES) {
      try {
        statSync(join(root, f))
        files.push(join(root, f))
      } catch {}
    }

    const offenders: string[] = []
    for (const file of files) {
      // Skip binaries (very rough check by extension)
      if (/\.(png|jpe?g|gif|svg|ico|webp|avif|woff2?|ttf|eot|mp4|webm)$/i.test(file)) continue
      const content = readFileSync(file, 'utf8')
      for (const re of PROHIBITED) {
        if (re.test(content)) {
          offenders.push(`${file}: matched ${re}`)
          break
        }
      }
    }

    expect(offenders, offenders.join('\n')).toEqual([])
  })
})
