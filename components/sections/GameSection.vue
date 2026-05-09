<script setup lang="ts">
const { t } = useI18n()
const { container } = useChessSlider({ perView: 1, spacing: 16 })

const slides = Array.from({ length: 6 }, (_, i) => `game-${String(i + 1).padStart(2, '0')}`)
</script>

<template>
  <section id="game" class="game py-16 px-4">
    <h3 class="flex items-center justify-center gap-3 text-3xl font-bold mb-6">
      <span class="icon-sword-left" aria-hidden="true" />
      {{ t('Game') }}
      <span class="icon-sword-right" aria-hidden="true" />
    </h3>

    <div ref="container" class="keen-slider">
      <div v-for="slide in slides" :key="slide" class="keen-slider__slide item">
        <img :src="`/img/chess/game/${slide}-th.jpg`" :alt="`Game ${slide}`" class="w-full" />
        <a :href="`/img/chess/game/${slide}-hd.jpg`" target="_blank" class="zoom" :aria-label="`Open ${slide} HD`">
          <span class="icon-zoom-in" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
</template>
