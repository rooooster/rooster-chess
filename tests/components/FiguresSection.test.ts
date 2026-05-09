import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { computed, defineComponent } from 'vue'
import FiguresSection from '../../app/components/sections/FiguresSection.vue'

vi.stubGlobal('useI18n', () => ({ t: (k: string) => k }))
vi.stubGlobal('computed', computed)

const NuxtImgStub = defineComponent({
  props: ['src', 'alt'],
  inheritAttrs: false,
  template: '<img :src="src" :alt="alt" />',
})

describe('FiguresSection', () => {
  it('renders the section with id="figures"', () => {
    const wrapper = mount(FiguresSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    expect(wrapper.find('section#figures').exists()).toBe(true)
  })

  it('renders h3 with ChessPieces key', () => {
    const wrapper = mount(FiguresSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    expect(wrapper.find('h3').text()).toBe('ChessPieces')
  })

  it('renders 8 piece articles', () => {
    const wrapper = mount(FiguresSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    const articles = wrapper.findAll('article')
    expect(articles).toHaveLength(8)
  })

  it('renders 4 figure divs with HD links', () => {
    const wrapper = mount(FiguresSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    const figures = wrapper.findAll('div.figure')
    expect(figures).toHaveLength(4)
    const hrefs = figures.map((f) => f.find('a').attributes('href'))
    expect(hrefs).toEqual([
      '/img/chess/figures/figure-01-hd.jpg',
      '/img/chess/figures/figure-02-hd.jpg',
      '/img/chess/figures/figure-03-hd.jpg',
      '/img/chess/figures/figure-04-hd.jpg',
    ])
  })
})
