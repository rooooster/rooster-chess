import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import GameSection from '../../components/sections/GameSection.vue'

vi.stubGlobal(
  'useI18n',
  vi.fn(() => ({ locale: { value: 'en' }, locales: { value: [] }, t: (k: string) => k }))
)
vi.stubGlobal('useChessSlider', vi.fn(() => ({ container: { value: null } })))

describe('GameSection', () => {
  it('renders 6 carousel slides', () => {
    const wrapper = mount(GameSection)
    expect(wrapper.findAll('.keen-slider__slide')).toHaveLength(6)
    expect(wrapper.find('section#game').exists()).toBe(true)
  })
})
