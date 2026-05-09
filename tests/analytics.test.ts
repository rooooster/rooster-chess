import { describe, expect, it } from 'vitest'
import { execSync } from 'node:child_process'
import { resolve } from 'node:path'

const root = resolve(__dirname, '..')

const scanRoots = ['pages', 'components', 'layouts', 'composables', 'app.vue', 'nuxt.config.ts']

function grepRepo(needle: string): string {
  try {
    return execSync(
      `grep -rni --include='*.vue' --include='*.ts' --include='*.js' '${needle}' ${scanRoots.join(' ')}`,
      { cwd: root, encoding: 'utf8' }
    )
  } catch {
    return ''
  }
}

describe('analytics removal (Task 14a)', () => {
  it('no Yandex Metrika references', () => {
    expect(grepRepo('yandex')).toBe('')
    expect(grepRepo('mc.yandex.ru')).toBe('')
  })

  it('no UA-66287816 tracker reference', () => {
    expect(grepRepo('UA-66287816')).toBe('')
  })

  it('no googletagmanager / gtag injection', () => {
    expect(grepRepo('googletagmanager')).toBe('')
    expect(grepRepo('google-analytics.com')).toBe('')
  })
})
