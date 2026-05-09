import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TableSection from '../../components/sections/TableSection.vue'

vi.stubGlobal(
  'useI18n',
  vi.fn(() => ({
    locale: { value: 'en' },
    locales: { value: [] },
    t: (k: string) => k
  }))
)
vi.stubGlobal(
  'useChessSlider',
  vi.fn(() => ({ container: { value: null } }))
)

describe('TableSection', () => {
  it('renders 4 carousel slides + 3 photo articles', () => {
    const wrapper = mount(TableSection)
    expect(wrapper.findAll('.keen-slider__slide')).toHaveLength(4)
    expect(wrapper.findAll('article.photo')).toHaveLength(3)
    expect(wrapper.find('section#table').exists()).toBe(true)
  })
})
