<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section id="hero" class="hero relative min-h-screen flex flex-col items-center justify-center text-center text-white">
    <div class="hero-bg absolute inset-0 bg-cover bg-center" aria-hidden="true" />
    <span class="icon-gods-chess relative" aria-hidden="true" />
    <h2 class="relative text-2xl md:text-3xl font-light tracking-wide">{{ t('ItsNotChessTable') }}</h2>
    <h1 class="relative text-5xl md:text-7xl font-extrabold uppercase tracking-tight">{{ t('ItsWar') }}</h1>
  </section>
</template>

<style scoped>
.hero-bg {
  background-image: url('/img/chess/hero/hero-bg.jpg');
}
</style>
