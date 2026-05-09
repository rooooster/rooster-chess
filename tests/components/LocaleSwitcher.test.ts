import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, computed, defineComponent } from 'vue'
import LocaleSwitcher from '../../app/components/LocaleSwitcher.vue'

vi.stubGlobal('useI18n', () => ({
  locale: ref('en'),
  locales: ref([{ code: 'en' }, { code: 'ua' }, { code: 'pl' }]),
}))
vi.stubGlobal(
  'useSwitchLocalePath',
  () => (code: string) => (code === 'en' ? '/' : `/${code}/`),
)
vi.stubGlobal('computed', computed)

const NuxtLinkStub = defineComponent({
  props: ['to'],
  inheritAttrs: false,
  template: '<a :href="to" :data-active="$attrs[\'aria-current\']" :class="$attrs.class"><slot /></a>',
})

describe('LocaleSwitcher', () => {
  it('renders 3 locale links with correct paths', () => {
    const wrapper = mount(LocaleSwitcher, {
      global: { stubs: { NuxtLink: NuxtLinkStub } },
    })
    const links = wrapper.findAll('a')
    expect(links).toHaveLength(3)
    expect(links.map(l => l.attributes('href'))).toEqual(['/', '/ua/', '/pl/'])
    expect(links.map(l => l.text())).toEqual(['en', 'ua', 'pl'])
  })

  it('marks the active locale', () => {
    const wrapper = mount(LocaleSwitcher, {
      global: { stubs: { NuxtLink: NuxtLinkStub } },
    })
    const active = wrapper.find('a[data-active="page"]')
    expect(active.exists()).toBe(true)
    expect(active.attributes('href')).toBe('/')
    expect(active.attributes('class')).toContain('font-bold')
  })
})
