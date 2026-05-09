import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import IndexPage from '../../pages/index.vue'

vi.stubGlobal(
  'useI18n',
  vi.fn(() => ({
    locale: { value: 'en' },
    locales: { value: [] },
    t: (k: string) => k
  }))
)
vi.stubGlobal('useSwitchLocalePath', vi.fn(() => (code: string) => (code === 'en' ? '/' : `/${code}/`)))
vi.stubGlobal('useChessSlider', vi.fn(() => ({ container: { value: null } })))

const stubAll = (id: string) =>
  defineComponent({
    setup: () => () => h('section', { id })
  })

describe('pages/index.vue', () => {
  it('mounts all 9 chess sections in order', () => {
    const stubs: Record<string, ReturnType<typeof stubAll>> = {
      HeroSection: stubAll('hero'),
      HeaderSection: stubAll('header-stub'),
      TableSection: stubAll('table'),
      HiwSection: stubAll('hiw'),
      FiguresSection: stubAll('figures'),
      RoosterSection: stubAll('rooster'),
      GameSection: stubAll('game'),
      TeamSection: stubAll('team'),
      SvgIconsSection: stubAll('svg-icons-stub')
    }
    const wrapper = mount(IndexPage, { global: { stubs } })
    const sectionIds = wrapper.findAll('main.chess > section').map((s) => s.attributes('id'))
    expect(sectionIds).toEqual([
      'hero',
      'header-stub',
      'table',
      'hiw',
      'figures',
      'rooster',
      'game',
      'team',
      'svg-icons-stub'
    ])
  })
})
