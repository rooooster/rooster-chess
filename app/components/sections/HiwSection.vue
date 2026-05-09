<script setup lang="ts">
import { useKeenSlider } from 'keen-slider/vue'
import 'keen-slider/keen-slider.min.css'

const { t } = useI18n()

const hiwImages = Array.from({ length: 11 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0')
  return {
    th: `/img/chess/hiw/hiw-${n}-th.jpg`,
    hd: `/img/chess/hiw/hiw-${n}-hd.jpg`,
  }
})

const [container] = useKeenSlider<HTMLDivElement>({
  loop: true,
  slides: { perView: 1 },
})
</script>

<template>
  <section id="hiw" class="hiw">
    <h4>
      <span class="icon-hand" aria-hidden="true" />
      {{ t('HowItsworks') }}
    </h4>

    <div ref="container" class="keen-slider">
      <div
        v-for="img in hiwImages"
        :key="img.th"
        class="keen-slider__slide"
      >
        <NuxtImg :src="img.th" alt="" loading="lazy" />
        <a :href="img.hd" target="_blank" rel="noopener">
          <span class="icon-zoom-in" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
</template>
