<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <header class="flex items-center justify-between p-4">
    <NuxtLink to="/" class="logo flex items-center gap-2">
      <NuxtImg
        src="/img/chess/header/logo.png"
        alt="Rooster Studio Logo"
        width="40"
        height="40"
      />
      <h6><span>Rooster</span> Studio</h6>
    </NuxtLink>

    <LocaleSwitcher />

    <nav id="anhors" class="anhors anhors-static">
      <a href="#hero" class="page-scroll" aria-label="hero" />
      <a href="#table" class="page-scroll">
        <span class="icon-table" aria-hidden="true" />
        <p>{{ t('Table') }}</p>
      </a>
      <a href="#figures" class="page-scroll">
        <span class="icon-knight-right" aria-hidden="true" />
        <p>{{ t('ChessPieces') }}</p>
      </a>
      <a href="#game" class="page-scroll">
        <span class="icon-swords" aria-hidden="true" />
        <p>{{ t('Game') }}</p>
      </a>
      <a href="#team" class="page-scroll">
        <span class="icon-rook-right" aria-hidden="true" />
        <p>{{ t('Team') }}</p>
      </a>
    </nav>
  </header>
</template>
