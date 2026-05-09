<script setup lang="ts">
const { t } = useI18n()

const pieces = [
  { icon: 'icon-rook-left', key: 'Rook' },
  { icon: 'icon-knight-left', key: 'Knight' },
  { icon: 'icon-bishop-left', key: 'Bishop' },
  { icon: 'icon-queen', key: 'Queen' },
  { icon: 'icon-king', key: 'King' },
  { icon: 'icon-bishop-right', key: 'Bishop' },
  { icon: 'icon-knight-right', key: 'Knight' },
  { icon: 'icon-rook-right', key: 'Rook' }
] as const

const figureImages = [1, 2, 3, 4]
</script>

<template>
  <section id="figures" class="figures py-16 px-4 text-center">
    <h3 class="text-3xl font-bold mb-8">{{ t('ChessPieces') }}</h3>

    <div class="grid grid-cols-4 md:grid-cols-8 gap-4 mb-8">
      <article v-for="(piece, i) in pieces" :key="i" class="flex flex-col items-center gap-2">
        <span :class="piece.icon" class="text-4xl" aria-hidden="true" />
        <h5>{{ t(piece.key) }}</h5>
      </article>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="n in figureImages" :key="n" :class="['figure', `figure-0${n}`]">
        <img :src="`/img/chess/figures/figure-0${n}-th.jpg`" :alt="`Figure 0${n}`" class="w-full" />
        <a :href="`/img/chess/figures/figure-0${n}-hd.jpg`" target="_blank" class="zoom" :aria-label="`Open figure ${n} HD`">
          <span class="icon-zoom-in" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
</template>
