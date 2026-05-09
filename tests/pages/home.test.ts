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

  it('lists working portfolio entries under Sites', () => {
    const wrapper = mount(HomePage, { global: { stubs: { NuxtLink: NuxtLinkStub } } })
    const text = wrapper.text()
    expect(text).toContain("God's Chess")
    expect(text).toContain('Rooster Studio archive')
    expect(text).toContain('Nebo Event Management Agency')
  })

  it('does not link to dead domains', () => {
    const wrapper = mount(HomePage, { global: { stubs: { NuxtLink: NuxtLinkStub } } })
    const html = wrapper.html()
    expect(html).not.toContain('skoryk-competition.com')
    expect(html).not.toContain('mcriviera.com')
    expect(html).not.toContain('rooooster.com/lehrplattform')
    expect(html).not.toContain('rooooster.com/luckylabs')
    expect(html).not.toContain('rooooster.com/wish-happy')
  })
})
