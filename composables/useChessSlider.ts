import 'keen-slider/keen-slider.min.css'
import type { Ref } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'

interface SliderHandle {
  destroy?: () => void
}

export function useChessSlider(opts: { perView?: number | 'auto'; spacing?: number } = {}) {
  const container: Ref<HTMLElement | null> = ref(null)
  let instance: SliderHandle | null = null

  onMounted(async () => {
    if (!container.value) return
    const { default: KeenSlider } = await import('keen-slider')
    instance = new KeenSlider(container.value, {
      loop: true,
      slides: { perView: opts.perView ?? 1, spacing: opts.spacing ?? 16 }
    }) as SliderHandle
  })

  onUnmounted(() => {
    instance?.destroy?.()
    instance = null
  })

  return { container }
}
