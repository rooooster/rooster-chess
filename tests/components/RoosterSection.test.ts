import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RoosterSection from '../../components/sections/RoosterSection.vue'

vi.stubGlobal(
  'useI18n',
  vi.fn(() => ({ locale: { value: 'en' }, locales: { value: [] }, t: (k: string) => k }))
)

describe('RoosterSection', () => {
  it('renders branding headline + tagline', () => {
    const wrapper = mount(RoosterSection)
    expect(wrapper.find('section#rooster').exists()).toBe(true)
    expect(wrapper.find('h3').text()).toBe('WeLikeCreateGoodDesignProducts')
    expect(wrapper.find('h4').text()).toBe('WeAreNotChessProfessionals')
  })
})
