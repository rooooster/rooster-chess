import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import HomePage from '../../pages/home.vue'

const NuxtLinkStub = defineComponent({
  props: { to: { type: [String, Object], default: '' } },
  setup(p, { slots }) {
    return () => h('a', { href: String(p.to) }, slots.default?.())
  }
})

describe('pages/home.vue', () => {
  it('renders Rooster Studio heading', () => {
    const wrapper = mount(HomePage, { global: { stubs: { NuxtLink: NuxtLinkStub } } })
    expect(wrapper.find('h1').text()).toBe('Rooster Studio')
  })

  it('lists at least 4 portfolio entries under Sites', () => {
    const wrapper = mount(HomePage, { global: { stubs: { NuxtLink: NuxtLinkStub } } })
    const text = wrapper.text()
    expect(text).toContain("God's Chess")
    expect(text).toContain('Skoryk Competition 2016')
    expect(text).toContain('Monte Carlo Riviera')
    expect(text).toContain('Nebo Event Management Agency')
  })
})
