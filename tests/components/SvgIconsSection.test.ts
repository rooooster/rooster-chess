import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SvgIconsSection from '../../app/components/sections/SvgIconsSection.vue'

describe('SvgIconsSection', () => {
  it('renders a section with id="svg-icons"', () => {
    const wrapper = mount(SvgIconsSection)
    expect(wrapper.find('section#svg-icons').exists()).toBe(true)
  })

  it('renders 6 <symbol> definitions with the expected ids', () => {
    const wrapper = mount(SvgIconsSection)
    const symbols = wrapper.findAll('symbol')
    expect(symbols).toHaveLength(6)
    const ids = symbols.map((s) => s.attributes('id')).sort()
    expect(ids).toEqual(
      [
        'behance-icon',
        'eagle-icon',
        'etsy-icon',
        'facebook-icon',
        'linkedin-icon',
        'twitter-icon',
      ].sort(),
    )
  })

  it('marks the section as hidden / aria-hidden', () => {
    const wrapper = mount(SvgIconsSection)
    const section = wrapper.find('section#svg-icons')
    expect(section.attributes('aria-hidden')).toBe('true')
    expect(section.attributes('hidden')).toBeDefined()
  })
})
