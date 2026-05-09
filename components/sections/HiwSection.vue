<script setup lang="ts">
const { t } = useI18n()
const { container } = useChessSlider({ perView: 1, spacing: 16 })

const slides = Array.from({ length: 11 }, (_, i) => `hiw-${String(i + 1).padStart(2, '0')}`)
</script>

<template>
  <section id="hiw" class="hiw py-16 px-4">
    <h4 class="flex items-center gap-2 justify-center mb-6">
      <span class="icon-hand" aria-hidden="true" />
      {{ t('HowItsworks') }}
    </h4>

    <div ref="container" class="keen-slider">
      <div v-for="slide in slides" :key="slide" class="keen-slider__slide item">
        <img :src="`/img/chess/hiw/${slide}-th.jpg`" :alt="`How it works ${slide}`" class="w-full" />
        <a :href="`/img/chess/hiw/${slide}-hd.jpg`" target="_blank" class="zoom" :aria-label="`Open ${slide} HD`">
          <span class="icon-zoom-in" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
</template>
