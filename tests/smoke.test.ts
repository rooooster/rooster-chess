import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

describe('smoke', () => {
  it('mounts a trivial component', () => {
    const Hello = defineComponent({
      render: () => h('div', { class: 'hello' }, 'hi')
    })
    const wrapper = mount(Hello)
    expect(wrapper.text()).toBe('hi')
    expect(wrapper.classes('hello')).toBe(true)
  })
})
