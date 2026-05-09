import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import SvgIconsSection from '../../components/sections/SvgIconsSection.vue'

describe('SvgIconsSection', () => {
  it('defines the 6 social <symbol>s', () => {
    const wrapper = mount(SvgIconsSection)
    const ids = wrapper.findAll('symbol').map((s) => s.attributes('id'))
    expect(ids).toEqual([
      'facebook-icon',
      'twitter-icon',
      'linkedin-icon',
      'behance-icon',
      'eagle-icon',
      'etsy-icon'
    ])
    expect(wrapper.find('svg#svg-icons').exists()).toBe(true)
  })
})
