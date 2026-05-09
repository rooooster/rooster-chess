<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { active } = useScrollSpy(['hero', 'table', 'figures', 'game', 'team'])
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-30 flex items-center justify-between px-4 py-3 bg-black/60 backdrop-blur text-white">
    <NuxtLink :to="localePath('/')" class="logo flex items-center gap-2">
      <img src="/img/chess/header/logo.png" alt="Rooster Studio Logo" class="w-8 h-8" />
      <h6 class="font-semibold tracking-tight"><span>Rooster</span> Studio</h6>
    </NuxtLink>

    <LocaleSwitcher class="lang" />

    <nav id="anhors" class="anhors hidden md:flex gap-4 items-center">
      <a :class="['page-scroll', { active: active === 'hero' }]" href="#hero" aria-label="hero" />
      <a :class="['page-scroll flex items-center gap-1', { active: active === 'table' }]" href="#table">
        <span class="icon-table" aria-hidden="true" />
        <p>{{ t('Table') }}</p>
      </a>
      <a :class="['page-scroll flex items-center gap-1', { active: active === 'figures' }]" href="#figures">
        <span class="icon-knight-right" aria-hidden="true" />
        <p>{{ t('ChessPieces') }}</p>
      </a>
      <a :class="['page-scroll flex items-center gap-1', { active: active === 'game' }]" href="#game">
        <span class="icon-swords" aria-hidden="true" />
        <p>{{ t('Game') }}</p>
      </a>
      <a :class="['page-scroll flex items-center gap-1', { active: active === 'team' }]" href="#team">
        <span class="icon-rook-right" aria-hidden="true" />
        <p>{{ t('Team') }}</p>
      </a>
    </nav>
  </header>
</template>
