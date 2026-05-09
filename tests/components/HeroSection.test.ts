import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { computed, defineComponent } from 'vue'
import HeroSection from '../../app/components/sections/HeroSection.vue'

vi.stubGlobal('useI18n', () => ({
  t: (key: string) => key,
}))
vi.stubGlobal('computed', computed)

const NuxtImgStub = defineComponent({
  props: ['src', 'alt'],
  inheritAttrs: false,
  template: '<img :src="src" :alt="alt" :class="$attrs.class" />',
})

describe('HeroSection', () => {
  it('renders the hero section with id="hero"', () => {
    const wrapper = mount(HeroSection, {
      global: { stubs: { NuxtImg: NuxtImgStub } },
    })
    expect(wrapper.find('section#hero').exists()).toBe(true)
  })

  it('renders h1 with ItsWar key', () => {
    const wrapper = mount(HeroSection, {
      global: { stubs: { NuxtImg: NuxtImgStub } },
    })
    expect(wrapper.find('h1').text()).toBe('ItsWar')
  })

  it('renders h2 with ItsNotChessTable key', () => {
    const wrapper = mount(HeroSection, {
      global: { stubs: { NuxtImg: NuxtImgStub } },
    })
    expect(wrapper.find('h2').text()).toBe('ItsNotChessTable')
  })

  it('renders NuxtImg with the correct src', () => {
    const wrapper = mount(HeroSection, {
      global: { stubs: { NuxtImg: NuxtImgStub } },
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/img/chess/hero/hero-bg.jpg')
  })

  it('renders the gods-chess icon span', () => {
    const wrapper = mount(HeroSection, {
      global: { stubs: { NuxtImg: NuxtImgStub } },
    })
    const icon = wrapper.find('span.icon-gods-chess')
    expect(icon.exists()).toBe(true)
    expect(icon.attributes('aria-hidden')).toBe('true')
  })
})
