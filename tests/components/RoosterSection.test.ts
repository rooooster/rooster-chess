import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { computed } from 'vue'
import RoosterSection from '../../app/components/sections/RoosterSection.vue'

vi.stubGlobal('useI18n', () => ({ t: (k: string) => k }))
vi.stubGlobal('computed', computed)

describe('RoosterSection', () => {
  it('renders the section with id="rooster"', () => {
    const wrapper = mount(RoosterSection)
    expect(wrapper.find('section#rooster').exists()).toBe(true)
  })

  it('renders h4 with WeAreNotChessProfessionals key', () => {
    const wrapper = mount(RoosterSection)
    expect(wrapper.find('h4').text()).toBe('WeAreNotChessProfessionals')
  })

  it('renders h3 with WeLikeCreateGoodDesignProducts key', () => {
    const wrapper = mount(RoosterSection)
    expect(wrapper.find('h3').text()).toBe('WeLikeCreateGoodDesignProducts')
  })

  it('renders the rooster icon span', () => {
    const wrapper = mount(RoosterSection)
    expect(wrapper.find('span.icon-rooster').exists()).toBe(true)
  })
})
