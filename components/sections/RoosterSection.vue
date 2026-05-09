<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section id="rooster" class="rooster py-16 px-4 text-center">
    <span class="icon-rooster text-6xl" aria-hidden="true" />
    <h4 class="text-xl mt-4">{{ t('WeAreNotChessProfessionals') }}</h4>
    <h3 class="text-3xl font-bold mt-2">{{ t('WeLikeCreateGoodDesignProducts') }}</h3>
  </section>
</template>
