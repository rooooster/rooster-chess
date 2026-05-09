import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { computed, defineComponent } from 'vue'
import IndexPage from '../../app/pages/index.vue'

vi.stubGlobal('useI18n', () => ({ t: (k: string) => k, locale: { value: 'en' } }))
vi.stubGlobal('computed', computed)
vi.stubGlobal('useSeoMeta', vi.fn())
vi.stubGlobal('useHead', vi.fn())
vi.stubGlobal('useLocaleHead', () => ({}))
vi.stubGlobal('definePageMeta', vi.fn())

const stubFor = (tag: string, id: string) =>
  defineComponent({ name: tag, template: `<section :id="'${id}'" />` })

describe('chess landing', () => {
  it('mounts all 9 sections', () => {
    const wrapper = mount(IndexPage, {
      global: {
        stubs: {
          HeroSection: stubFor('HeroSection', 'hero'),
          HeaderSection: stubFor('HeaderSection', 'header-section'),
          TableSection: stubFor('TableSection', 'table'),
          HiwSection: stubFor('HiwSection', 'hiw'),
          FiguresSection: stubFor('FiguresSection', 'figures'),
          RoosterSection: stubFor('RoosterSection', 'rooster'),
          GameSection: stubFor('GameSection', 'game'),
          TeamSection: stubFor('TeamSection', 'team'),
          SvgIconsSection: stubFor('SvgIconsSection', 'svg-icons'),
        },
      },
    })
    for (const id of [
      'hero',
      'header-section',
      'table',
      'hiw',
      'figures',
      'rooster',
      'game',
      'team',
      'svg-icons',
    ]) {
      expect(wrapper.find('#' + id).exists(), id).toBe(true)
    }
  })
})
