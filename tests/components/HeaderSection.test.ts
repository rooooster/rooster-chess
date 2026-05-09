import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { computed, defineComponent, ref } from 'vue'
import HeaderSection from '../../app/components/sections/HeaderSection.vue'

vi.stubGlobal('useI18n', () => ({ t: (k: string) => k }))
vi.stubGlobal('computed', computed)
vi.stubGlobal('useScrollSpy', () => ref(null))

const NuxtImgStub = defineComponent({
  props: ['src', 'alt'],
  inheritAttrs: false,
  template: '<img :src="src" :alt="alt" />',
})
const NuxtLinkStub = defineComponent({
  props: ['to'],
  template: '<a :href="to"><slot /></a>',
})
const LocaleSwitcherStub = defineComponent({
  template: '<nav data-stub="locale-switcher"></nav>',
})

const stubs = {
  NuxtImg: NuxtImgStub,
  NuxtLink: NuxtLinkStub,
  LocaleSwitcher: LocaleSwitcherStub,
}

describe('HeaderSection', () => {
  it('renders the header with logo NuxtLink to "/"', () => {
    const wrapper = mount(HeaderSection, { global: { stubs } })
    expect(wrapper.find('header').exists()).toBe(true)
    const logo = wrapper.find('a.logo')
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('href')).toBe('/')
    const img = logo.find('img')
    expect(img.attributes('src')).toBe('/img/chess/header/logo.png')
  })

  it('renders the LocaleSwitcher', () => {
    const wrapper = mount(HeaderSection, { global: { stubs } })
    expect(wrapper.find('[data-stub="locale-switcher"]').exists()).toBe(true)
  })

  it('renders 5 anchor links with correct hrefs', () => {
    const wrapper = mount(HeaderSection, { global: { stubs } })
    const nav = wrapper.find('nav#anhors')
    expect(nav.exists()).toBe(true)
    const anchors = nav.findAll('a')
    expect(anchors).toHaveLength(5)
    expect(anchors.map((a) => a.attributes('href'))).toEqual([
      '#hero',
      '#table',
      '#figures',
      '#game',
      '#team',
    ])
  })

  it('renders i18n labels for the 4 labelled anchors', () => {
    const wrapper = mount(HeaderSection, { global: { stubs } })
    const text = wrapper.find('nav#anhors').text()
    expect(text).toContain('Table')
    expect(text).toContain('ChessPieces')
    expect(text).toContain('Game')
    expect(text).toContain('Team')
  })
})
