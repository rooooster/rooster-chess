<script setup lang="ts">
import { useKeenSlider } from 'keen-slider/vue'
import 'keen-slider/keen-slider.min.css'

const { t } = useI18n()

const gameImages = Array.from({ length: 6 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0')
  return {
    th: `/img/chess/game/game-${n}-th.jpg`,
    hd: `/img/chess/game/game-${n}-hd.jpg`,
  }
})

const [container] = useKeenSlider<HTMLDivElement>({
  loop: true,
  slides: { perView: 1 },
})
</script>

<template>
  <section id="game" class="game">
    <h3>
      <span class="icon-sword-left" aria-hidden="true" />
      {{ t('Game') }}
      <span class="icon-sword-right" aria-hidden="true" />
    </h3>

    <div ref="container" class="keen-slider">
      <div
        v-for="img in gameImages"
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
