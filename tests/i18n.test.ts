import { describe, expect, it } from 'vitest'
import en from '../i18n/locales/en.json'
import ua from '../i18n/locales/ua.json'
import pl from '../i18n/locales/pl.json'

describe('i18n locale parity', () => {
  const enKeys = Object.keys(en).sort()
  const uaKeys = Object.keys(ua).sort()
  const plKeys = Object.keys(pl).sort()

  it('en, ua, pl all have the same set of keys', () => {
    expect(uaKeys).toEqual(enKeys)
    expect(plKeys).toEqual(enKeys)
  })

  it('all keys have non-empty string values in every locale', () => {
    for (const k of enKeys) {
      expect((en as Record<string, string>)[k]).toBeTruthy()
      expect((ua as Record<string, string>)[k]).toBeTruthy()
      expect((pl as Record<string, string>)[k]).toBeTruthy()
    }
  })
})
