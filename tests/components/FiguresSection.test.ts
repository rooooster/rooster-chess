import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FiguresSection from '../../components/sections/FiguresSection.vue'

vi.stubGlobal(
  'useI18n',
  vi.fn(() => ({ locale: { value: 'en' }, locales: { value: [] }, t: (k: string) => k }))
)

describe('FiguresSection', () => {
  it('renders 8 chess piece tiles + 4 figure photos', () => {
    const wrapper = mount(FiguresSection)
    expect(wrapper.findAll('section#figures article')).toHaveLength(8)
    expect(wrapper.findAll('section#figures .figure')).toHaveLength(4)
  })
})
