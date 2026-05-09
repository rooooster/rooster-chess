<script setup lang="ts">
const { locale, locales } = useI18n()

const currentIso = computed(() => {
  const all = (locales.value as Array<{ code: string; iso?: string }>)
  return all.find((l) => l.code === locale.value)?.iso ?? 'en-US'
})

useHead({
  htmlAttrs: { lang: currentIso }
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <slot />
  </div>
</template>
