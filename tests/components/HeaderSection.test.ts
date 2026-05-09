import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import HeaderSection from '../../components/sections/HeaderSection.vue'

vi.stubGlobal(
  'useI18n',
  vi.fn(() => ({
    locale: { value: 'en' },
    locales: { value: [] },
    t: (k: string) =>
      ({ Table: 'Table', ChessPieces: 'Chess Pieces', Game: 'Game', Team: 'Team' }[k] ?? k)
  }))
)
vi.stubGlobal('useScrollSpy', vi.fn(() => ({ active: { value: null } })))
vi.stubGlobal('useLocalePath', vi.fn(() => (p: string) => p))

const NuxtLinkStub = defineComponent({
  props: { to: { type: [String, Object], default: '' } },
  setup(p, { slots }) {
    return () => h('a', { 'data-to': String(p.to), href: String(p.to) }, slots.default?.())
  }
})

const LocaleSwitcherStub = defineComponent({
  setup() {
    return () => h('nav', { class: 'lang' }, 'lang-stub')
  }
})

describe('HeaderSection', () => {
  it('renders 4 anchor scroll links + hero anchor', () => {
    const wrapper = mount(HeaderSection, {
      global: { stubs: { NuxtLink: NuxtLinkStub, LocaleSwitcher: LocaleSwitcherStub } }
    })
    const anchors = wrapper.findAll('nav#anhors a.page-scroll')
    const hrefs = anchors.map((a) => a.attributes('href'))
    expect(hrefs).toEqual(['#hero', '#table', '#figures', '#game', '#team'])
  })

  it('mounts the LocaleSwitcher slot', () => {
    const wrapper = mount(HeaderSection, {
      global: { stubs: { NuxtLink: NuxtLinkStub, LocaleSwitcher: LocaleSwitcherStub } }
    })
    expect(wrapper.find('nav.lang').exists()).toBe(true)
  })
})
