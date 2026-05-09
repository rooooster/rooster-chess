<script setup lang="ts">
const { t } = useI18n()

const pieces = [
  { iconClass: 'icon-rook-left', label: 'Rook' },
  { iconClass: 'icon-knight-left', label: 'Knight' },
  { iconClass: 'icon-bishop-left', label: 'Bishop' },
  { iconClass: 'icon-queen', label: 'Queen' },
  { iconClass: 'icon-king', label: 'King' },
  { iconClass: 'icon-bishop-right', label: 'Bishop' },
  { iconClass: 'icon-knight-right', label: 'Knight' },
  { iconClass: 'icon-rook-right', label: 'Rook' },
] as const

const figures = Array.from({ length: 4 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0')
  return {
    n,
    th: `/img/chess/figures/figure-${n}-th.jpg`,
    hd: `/img/chess/figures/figure-${n}-hd.jpg`,
  }
})
</script>

<template>
  <section id="figures" class="figures">
    <h3>{{ t('ChessPieces') }}</h3>

    <article
      v-for="(piece, idx) in pieces"
      :key="`${piece.iconClass}-${idx}`"
    >
      <span :class="piece.iconClass" aria-hidden="true" />
      <h5>{{ t(piece.label) }}</h5>
    </article>

    <div
      v-for="figure in figures"
      :key="figure.n"
      :class="`figure figure-${figure.n}`"
    >
      <NuxtImg :src="figure.th" alt="" loading="lazy" />
      <a :href="figure.hd" target="_blank" rel="noopener">
        <span class="icon-zoom-in" aria-hidden="true" />
      </a>
    </div>
  </section>
</template>
