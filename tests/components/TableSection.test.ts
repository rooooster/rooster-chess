import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { computed, defineComponent, ref } from 'vue'

vi.mock('keen-slider/vue', () => ({
  useKeenSlider: () => [ref<HTMLDivElement | undefined>(undefined), ref(undefined)],
}))
vi.mock('keen-slider/keen-slider.min.css', () => ({}))

vi.stubGlobal('useI18n', () => ({ t: (k: string) => k }))
vi.stubGlobal('computed', computed)

const NuxtImgStub = defineComponent({
  props: ['src', 'alt'],
  inheritAttrs: false,
  template: '<img :src="src" :alt="alt" :class="$attrs.class" />',
})

import TableSection from '../../app/components/sections/TableSection.vue'

describe('TableSection', () => {
  it('renders the section with id="table"', () => {
    const wrapper = mount(TableSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    expect(wrapper.find('section#table').exists()).toBe(true)
  })

  it('renders 4 carousel slides', () => {
    const wrapper = mount(TableSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    const slides = wrapper.findAll('.keen-slider__slide')
    expect(slides).toHaveLength(4)
    const srcs = slides.map((s) => s.find('img').attributes('src'))
    expect(srcs).toEqual([
      '/img/chess/table/table-01-th.jpg',
      '/img/chess/table/table-02-th.jpg',
      '/img/chess/table/table-03-th.jpg',
      '/img/chess/table/table-04-th.jpg',
    ])
  })

  it('renders the construction article with i18n key', () => {
    const wrapper = mount(TableSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    const h4 = wrapper.find('article h4')
    expect(h4.exists()).toBe(true)
    expect(h4.text()).toContain('TableConstructionAndDetails')
  })

  it('renders 3 photo articles linking to HD images', () => {
    const wrapper = mount(TableSection, { global: { stubs: { NuxtImg: NuxtImgStub } } })
    const photoArticles = wrapper.findAll('article.photo')
    expect(photoArticles).toHaveLength(3)
    const hrefs = photoArticles.map((a) => a.find('a').attributes('href'))
    expect(hrefs).toEqual([
      '/img/chess/table/table-photo-01-hd.jpg',
      '/img/chess/table/table-photo-02-hd.jpg',
      '/img/chess/table/table-photo-03-hd.jpg',
    ])
  })
})
