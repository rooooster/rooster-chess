import { describe, expect, it, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import LocaleSwitcher from '../../components/LocaleSwitcher.vue'
import { __testHelpers } from '../setup'

const NuxtLinkStub = defineComponent({
  props: { to: { type: [String, Object], default: '' } },
  setup(props, { slots }) {
    return () => h('a', { 'data-to': String(props.to), href: String(props.to) }, slots.default?.())
  }
})

describe('LocaleSwitcher', () => {
  beforeEach(() => __testHelpers.resetLocale())

  it('renders one link per configured locale', () => {
    const wrapper = mount(LocaleSwitcher, {
      global: { stubs: { NuxtLink: NuxtLinkStub } }
    })
    const links = wrapper.findAll('a')
    expect(links).toHaveLength(3)
    expect(links.map((l) => l.text())).toEqual(['en', 'ua', 'pl'])
  })

  it('marks the active locale', () => {
    __testHelpers.setLocale('ua')
    const wrapper = mount(LocaleSwitcher, {
      global: { stubs: { NuxtLink: NuxtLinkStub } }
    })
    const active = wrapper.findAll('a').find((a) => a.classes('active'))
    expect(active?.text()).toBe('ua')
  })

  it('points each link at switchLocalePath(code)', () => {
    const wrapper = mount(LocaleSwitcher, {
      global: { stubs: { NuxtLink: NuxtLinkStub } }
    })
    const targets = wrapper.findAll('a').map((l) => l.attributes('data-to'))
    expect(targets).toEqual(['/', '/ua/', '/pl/'])
  })
})
