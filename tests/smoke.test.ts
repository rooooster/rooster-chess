import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

describe('smoke', () => {
  it('mounts a component', () => {
    const Hello = defineComponent({ render: () => h('div', 'hello') })
    const wrapper = mount(Hello)
    expect(wrapper.text()).toBe('hello')
  })
})
