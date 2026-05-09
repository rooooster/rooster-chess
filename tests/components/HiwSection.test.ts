import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HiwSection from '../../components/sections/HiwSection.vue'

vi.stubGlobal(
  'useI18n',
  vi.fn(() => ({ locale: { value: 'en' }, locales: { value: [] }, t: (k: string) => k }))
)
vi.stubGlobal('useChessSlider', vi.fn(() => ({ container: { value: null } })))

describe('HiwSection', () => {
  it('renders 11 carousel slides', () => {
    const wrapper = mount(HiwSection)
    expect(wrapper.findAll('.keen-slider__slide')).toHaveLength(11)
    expect(wrapper.find('section#hiw').exists()).toBe(true)
  })
})
