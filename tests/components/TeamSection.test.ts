import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TeamSection from '../../components/sections/TeamSection.vue'

vi.stubGlobal(
  'useI18n',
  vi.fn(() => ({
    locale: { value: 'en' },
    locales: { value: [] },
    t: (k: string) =>
      ({
        Team: 'Team',
        Contact: 'Contact Us',
        AntonPivniuk: 'Anton Pivniuk',
        IhorOrlovskyi: 'Ihor Orlovskyi',
        KyivUkraine: 'Kyiv, Ukraine'
      }[k] ?? k)
  }))
)

describe('TeamSection', () => {
  it('renders both team member cards with names', () => {
    const wrapper = mount(TeamSection)
    const articles = wrapper.findAll('section#team .members article')
    expect(articles).toHaveLength(2)
    expect(articles[0].find('h4').text()).toBe('Anton Pivniuk')
    expect(articles[1].find('h4').text()).toBe('Ihor Orlovskyi')
  })

  it('shows the contact panel', () => {
    const wrapper = mount(TeamSection)
    expect(wrapper.find('section#team .buy').exists()).toBe(true)
    expect(wrapper.find('section#team .buy h3').text()).toBe('Contact Us')
  })
})
