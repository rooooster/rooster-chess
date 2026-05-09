<script setup lang="ts">
const { t } = useI18n()
const { container } = useChessSlider({ perView: 1, spacing: 16 })

const slides = [
  'table-01',
  'table-02',
  'table-03',
  'table-04'
]

const photos = [
  'table-photo-01',
  'table-photo-02',
  'table-photo-03'
]
</script>

<template>
  <section id="table" class="table relative py-16 px-4">
    <div ref="container" class="keen-slider">
      <div v-for="slide in slides" :key="slide" class="keen-slider__slide item">
        <img :src="`/img/chess/table/${slide}-th.jpg`" :alt="`Table ${slide}`" class="w-full" />
        <a :href="`/img/chess/table/${slide}-hd.jpg`" target="_blank" class="zoom" :aria-label="`Open ${slide} HD`">
          <span class="icon-zoom-in" aria-hidden="true" />
        </a>
      </div>
    </div>

    <article class="mt-8 text-center">
      <img src="/img/chess/table/table-photo-00-th.gif" alt="Table photos" class="empty mx-auto" />
      <h4 class="mt-3 inline-flex items-center gap-2">
        <span class="icon-hammer" aria-hidden="true" />
        {{ t('TableConstructionAndDetails') }}
      </h4>
    </article>

    <article v-for="photo in photos" :key="photo" class="photo mt-4 relative">
      <img :src="`/img/chess/table/${photo}-th.jpg`" :alt="`Detail ${photo}`" class="w-full" />
      <a :href="`/img/chess/table/${photo}-hd.jpg`" target="_blank" class="zoom" :aria-label="`Open ${photo} HD`">
        <span class="icon-zoom-in" aria-hidden="true" />
      </a>
    </article>
  </section>
</template>
