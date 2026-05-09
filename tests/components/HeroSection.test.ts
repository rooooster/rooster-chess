import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HeroSection from '../../components/sections/HeroSection.vue'

vi.stubGlobal(
  'useI18n',
  vi.fn(() => ({
    locale: { value: 'en' },
    locales: { value: [] },
    t: (k: string) =>
      ({
        ItsNotChessTable: "It's more than a Chess Table",
        ItsWar: "It's a Battle"
      }[k] ?? k)
  }))
)

describe('HeroSection', () => {
  it('renders the headline copy from i18n keys', () => {
    const wrapper = mount(HeroSection)
    expect(wrapper.find('h1').text()).toBe("It's a Battle")
    expect(wrapper.find('h2').text()).toBe("It's more than a Chess Table")
    expect(wrapper.find('section#hero').exists()).toBe(true)
  })
})
