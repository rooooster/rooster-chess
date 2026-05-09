import { describe, it, expect } from 'vitest'
import en from '../i18n/locales/en.json'
import ua from '../i18n/locales/ua.json'
import pl from '../i18n/locales/pl.json'

describe('i18n locale parity', () => {
  const locales = { en, ua, pl }

  it('all locales have same set of keys', () => {
    const enKeys = Object.keys(en).sort()
    expect(Object.keys(ua).sort()).toEqual(enKeys)
    expect(Object.keys(pl).sort()).toEqual(enKeys)
  })

  it('each locale has at least 20 keys', () => {
    for (const [name, dict] of Object.entries(locales)) {
      expect(Object.keys(dict).length, `locale ${name}`).toBeGreaterThanOrEqual(20)
    }
  })
})
