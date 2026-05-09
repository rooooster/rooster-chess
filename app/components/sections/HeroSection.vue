<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden"
  >
    <NuxtImg
      src="/img/chess/hero/hero-bg.jpg"
      alt=""
      class="absolute inset-0 w-full h-full object-cover -z-10"
    />
    <span class="icon-gods-chess" aria-hidden="true" />
    <h2 class="text-2xl md:text-3xl">{{ t('ItsNotChessTable') }}</h2>
    <h1 class="text-4xl md:text-6xl font-bold">{{ t('ItsWar') }}</h1>
  </section>
</template>

<style scoped>
.icon-gods-chess {
  /* placeholder for legacy icon font; a follow-up task will wire up the SVG sprite */
  display: inline-block;
  width: 4rem;
  height: 4rem;
}
</style>
