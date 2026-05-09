import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { computed, defineComponent } from 'vue'
import TeamSection from '../../app/components/sections/TeamSection.vue'

vi.stubGlobal('useI18n', () => ({ t: (k: string) => k }))
vi.stubGlobal('computed', computed)

const NuxtImgStub = defineComponent({
  props: ['src', 'alt'],
  inheritAttrs: false,
  template: '<img :src="src" :alt="alt" />',
})

describe('TeamSection', () => {
  it('renders the section with id="team"', () => {
    const wrapper = mount(TeamSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    expect(wrapper.find('section#team').exists()).toBe(true)
  })

  it('renders 2 member articles with correct names', () => {
    const wrapper = mount(TeamSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    const members = wrapper.find('.members').findAll('article')
    expect(members).toHaveLength(2)
    expect(members[0]!.find('h4').text()).toBe('AntonPivniuk')
    expect(members[1]!.find('h4').text()).toBe('IhorOrlovskyi')
  })

  it('renders 3 social anchors per member with correct hrefs', () => {
    const wrapper = mount(TeamSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    const members = wrapper.find('.members').findAll('article')
    const antonSocials = members[0]!.find('nav.social').findAll('a')
    expect(antonSocials).toHaveLength(3)
    expect(antonSocials.map((a) => a.attributes('href'))).toEqual([
      'https://www.behance.net/antonpivniuk',
      'https://www.linkedin.com/in/antonpivniuk',
      'https://www.facebook.com/apivniuk',
    ])
    const ihorSocials = members[1]!.find('nav.social').findAll('a')
    expect(ihorSocials).toHaveLength(3)
    expect(ihorSocials.map((a) => a.attributes('href'))).toEqual([
      'http://ihororlovskyi.com/',
      'https://www.linkedin.com/in/ihororlovskyi',
      'https://www.facebook.com/profile.php?id=1617270694',
    ])
  })

  it('renders mailto links for each member', () => {
    const wrapper = mount(TeamSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    const text = wrapper.html()
    expect(text).toContain('mailto:antonpivniuk@gmail.com')
    expect(text).toContain('mailto:ihororlovskyi@gmail.com')
    expect(text).toContain('subject=Hello%20Anton')
  })

  it('renders the studio buy block with 3 social anchors', () => {
    const wrapper = mount(TeamSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    const buy = wrapper.find('.buy')
    expect(buy.exists()).toBe(true)
    expect(buy.find('h3').text()).toBe('Contact')
    expect(buy.find('h4').text()).toBe('Rooster Studio')
    const socials = buy.find('nav.social').findAll('a')
    expect(socials).toHaveLength(3)
    expect(socials.map((a) => a.attributes('href'))).toEqual([
      'https://www.facebook.com/rooster.studio',
      'https://www.etsy.com/listing/250199234/chess-table-gods-chess',
      'https://twitter.com/rooster_studio',
    ])
  })

  it('renders an svg icon inside each social anchor', () => {
    const wrapper = mount(TeamSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    const allSocialAnchors = wrapper.findAll('nav.social a')
    // 3 per member (x2) + 3 studio = 9 anchors
    expect(allSocialAnchors).toHaveLength(9)
    for (const a of allSocialAnchors) {
      expect(a.find('svg').exists()).toBe(true)
    }
  })
})
