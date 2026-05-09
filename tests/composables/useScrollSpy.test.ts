import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useScrollSpy } from '../../composables/useScrollSpy'

type IOEntry = { target: Element; isIntersecting: boolean; intersectionRatio: number }
type IOCallback = (entries: IOEntry[]) => void

describe('useScrollSpy', () => {
  let observerCallback: IOCallback | null = null
  const observed: Element[] = []

  beforeEach(() => {
    observed.length = 0
    observerCallback = null
    ;(globalThis as any).IntersectionObserver = class {
      constructor(cb: IOCallback) {
        observerCallback = cb
      }
      observe(el: Element) {
        observed.push(el)
      }
      disconnect() {}
      unobserve() {}
      takeRecords() {
        return []
      }
      root = null
      rootMargin = ''
      thresholds: number[] = []
    }
  })

  afterEach(() => {
    delete (globalThis as any).IntersectionObserver
    document.body.innerHTML = ''
  })

  it('updates active to the most-visible section id', async () => {
    document.body.innerHTML = `
      <section id="hero"></section>
      <section id="table"></section>
      <section id="game"></section>
    `

    const Probe = defineComponent({
      setup() {
        const { active } = useScrollSpy(['hero', 'table', 'game'])
        return () => h('div', { 'data-active': active.value ?? '' })
      }
    })
    const wrapper = mount(Probe, { attachTo: document.body })
    await nextTick()
    expect(observed.length).toBe(3)

    const tableEl = document.getElementById('table') as Element
    observerCallback!([
      { target: tableEl, isIntersecting: true, intersectionRatio: 0.7 },
      { target: document.getElementById('hero') as Element, isIntersecting: true, intersectionRatio: 0.3 }
    ])
    await nextTick()
    expect(wrapper.attributes('data-active')).toBe('table')

    wrapper.unmount()
  })
})
