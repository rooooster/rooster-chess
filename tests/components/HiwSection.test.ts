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

import HiwSection from '../../app/components/sections/HiwSection.vue'

describe('HiwSection', () => {
  it('renders the section with id="hiw"', () => {
    const wrapper = mount(HiwSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    expect(wrapper.find('section#hiw').exists()).toBe(true)
  })

  it('renders the h4 with HowItsworks key', () => {
    const wrapper = mount(HiwSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    const h4 = wrapper.find('h4')
    expect(h4.exists()).toBe(true)
    expect(h4.text()).toContain('HowItsworks')
  })

  it('renders 11 carousel slides', () => {
    const wrapper = mount(HiwSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    const slides = wrapper.findAll('.keen-slider__slide')
    expect(slides).toHaveLength(11)
    expect(slides[0]!.find('img').attributes('src')).toBe('/img/chess/hiw/hiw-01-th.jpg')
    expect(slides[10]!.find('img').attributes('src')).toBe('/img/chess/hiw/hiw-11-th.jpg')
  })
})
