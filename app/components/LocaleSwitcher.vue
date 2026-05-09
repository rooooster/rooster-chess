<script setup lang="ts">
const { locales, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() =>
  (locales.value as Array<{ code: string }>).filter(Boolean),
)
</script>

<template>
  <nav class="flex gap-2" aria-label="Language">
    <NuxtLink
      v-for="loc in availableLocales"
      :key="loc.code"
      :to="switchLocalePath(loc.code)"
      :class="['uppercase text-sm', loc.code === locale ? 'font-bold underline' : '']"
      :aria-current="loc.code === locale ? 'page' : undefined"
    >{{ loc.code }}</NuxtLink>
  </nav>
</template>
