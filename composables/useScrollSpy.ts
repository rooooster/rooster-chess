import { onMounted, onUnmounted, ref, type Ref } from 'vue'

export function useScrollSpy(sectionIds: string[], options: IntersectionObserverInit = {}): { active: Ref<string | null> } {
  const active = ref<string | null>(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return

    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) active.value = visible.target.id
      },
      { threshold: [0.25, 0.5, 0.75], ...options }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return { active }
}
