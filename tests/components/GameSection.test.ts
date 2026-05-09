import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { computed, defineComponent, ref } from 'vue'

vi.mock('keen-slider/vue', () => ({
  useKeenSlider: () => [ref<HTMLDivElement | undefined>(undefined), ref(undefined)],
}))
vi.mock('keen-slider/keen-slider.min.css', () => ({}))

vi.stubGlobal('useI18n', () => ({ t: (k: string) => k }))
vi.stubGlobal('computed', computed)

const NuxtImgStub = defineComponent({
  props: ['src', 'alt'],
  inheritAttrs: false,
  template: '<img :src="src" :alt="alt" />',
})

import GameSection from '../../app/components/sections/GameSection.vue'

describe('GameSection', () => {
  it('renders the section with id="game"', () => {
    const wrapper = mount(GameSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    expect(wrapper.find('section#game').exists()).toBe(true)
  })

  it('renders the h3 with Game key and sword icons', () => {
    const wrapper = mount(GameSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    const h3 = wrapper.find('h3')
    expect(h3.exists()).toBe(true)
    expect(h3.text()).toContain('Game')
    expect(h3.find('span.icon-sword-left').exists()).toBe(true)
    expect(h3.find('span.icon-sword-right').exists()).toBe(true)
  })

  it('renders 6 carousel slides', () => {
    const wrapper = mount(GameSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    const slides = wrapper.findAll('.keen-slider__slide')
    expect(slides).toHaveLength(6)
    expect(slides[0]!.find('img').attributes('src')).toBe('/img/chess/game/game-01-th.jpg')
    expect(slides[5]!.find('img').attributes('src')).toBe('/img/chess/game/game-06-th.jpg')
  })
})
