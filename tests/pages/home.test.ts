import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { computed } from 'vue'
import HomePage from '../../app/pages/home.vue'

vi.stubGlobal('useSeoMeta', vi.fn())
vi.stubGlobal('useHead', vi.fn())
vi.stubGlobal('definePageMeta', vi.fn())
vi.stubGlobal('computed', computed)

describe('home portfolio', () => {
  it('renders Rooster Studio h1', () => {
    const wrapper = mount(HomePage)
    expect(wrapper.find('h1').text()).toBe('Rooster Studio')
  })

  it('renders at least 4 portfolio entries', () => {
    const wrapper = mount(HomePage)
    const links = wrapper.findAll('a[href^="http"]')
    expect(links.length).toBeGreaterThanOrEqual(4)
  })

  it('all external links use rel="noopener"', () => {
    const wrapper = mount(HomePage)
    const externalLinks = wrapper.findAll('a[target="_blank"]')
    expect(externalLinks.length).toBeGreaterThan(0)
    for (const link of externalLinks) {
      expect(link.attributes('rel')).toContain('noopener')
    }
  })
})
