<script setup lang="ts">
import { useKeenSlider } from 'keen-slider/vue'
import 'keen-slider/keen-slider.min.css'

const { t } = useI18n()

const tableImages = [
  { th: '/img/chess/table/table-01-th.jpg', hd: '/img/chess/table/table-01-hd.jpg' },
  { th: '/img/chess/table/table-02-th.jpg', hd: '/img/chess/table/table-02-hd.jpg' },
  { th: '/img/chess/table/table-03-th.jpg', hd: '/img/chess/table/table-03-hd.jpg' },
  { th: '/img/chess/table/table-04-th.jpg', hd: '/img/chess/table/table-04-hd.jpg' },
] as const

const photos = [
  { th: '/img/chess/table/table-photo-01-th.jpg', hd: '/img/chess/table/table-photo-01-hd.jpg' },
  { th: '/img/chess/table/table-photo-02-th.jpg', hd: '/img/chess/table/table-photo-02-hd.jpg' },
  { th: '/img/chess/table/table-photo-03-th.jpg', hd: '/img/chess/table/table-photo-03-hd.jpg' },
] as const

const [container] = useKeenSlider<HTMLDivElement>({
  loop: true,
  slides: { perView: 1 },
})
</script>

<template>
  <section id="table" class="table">
    <div ref="container" class="keen-slider">
      <div
        v-for="img in tableImages"
        :key="img.th"
        class="keen-slider__slide"
      >
        <NuxtImg :src="img.th" alt="" loading="lazy" />
        <a :href="img.hd" target="_blank" rel="noopener">
          <span class="icon-zoom-in" aria-hidden="true" />
        </a>
      </div>
    </div>

    <article>
      <NuxtImg
        src="/img/chess/table/table-photo-00-th.gif"
        alt=""
        class="empty"
      />
      <h4>
        <span class="icon-hammer" aria-hidden="true" />
        {{ t('TableConstructionAndDetails') }}
      </h4>
    </article>

    <article
      v-for="photo in photos"
      :key="photo.th"
      class="photo"
    >
      <NuxtImg :src="photo.th" alt="" loading="lazy" />
      <a :href="photo.hd" target="_blank" rel="noopener">
        <span class="icon-zoom-in" aria-hidden="true" />
      </a>
    </article>
  </section>
</template>
