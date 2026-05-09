import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Track the currently-visible section among the given ids.
 * Returns a reactive ref of the active id (or null if none intersect).
 */
export function useScrollSpy(
  sectionIds: string[],
  options: IntersectionObserverInit = { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
) {
  const activeId = ref<string | null>(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    }, options)

    for (const el of elements) observer.observe(el)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return activeId
}
