import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { useScrollSpy } from '../../app/composables/useScrollSpy'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

describe('useScrollSpy', () => {
  let observers: Array<{ cb: IntersectionObserverCallback; targets: Element[] }> = []

  beforeEach(() => {
    observers = []
    // Replace IntersectionObserver with a controllable mock
    class MockIO {
      cb: IntersectionObserverCallback
      targets: Element[] = []
      constructor(cb: IntersectionObserverCallback) {
        this.cb = cb
        observers.push({ cb, targets: this.targets })
      }
      observe(el: Element) {
        this.targets.push(el)
      }
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return []
      }
    }
    vi.stubGlobal('IntersectionObserver', MockIO)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns the id of the intersecting section', async () => {
    // Set up DOM with 3 sections
    document.body.innerHTML =
      '<section id="a"></section><section id="b"></section><section id="c"></section>'

    const TestHarness = defineComponent({
      setup() {
        const active = useScrollSpy(['a', 'b', 'c'])
        return { active }
      },
      render() {
        return h('div', this.active ?? 'none')
      },
    })

    const wrapper = mount(TestHarness, { attachTo: document.body })
    await nextTick()

    expect(observers.length).toBe(1)
    const { cb, targets } = observers[0]!
    expect(targets.length).toBe(3)

    // Simulate 'b' intersecting
    cb(
      [
        {
          isIntersecting: true,
          target: document.getElementById('b')!,
        } as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    )
    await nextTick()
    expect(wrapper.text()).toBe('b')

    wrapper.unmount()
  })
})
