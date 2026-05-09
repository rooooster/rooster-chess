<script setup lang="ts">
const { locale } = useI18n()

useHead({
  htmlAttrs: { lang: locale },
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="p-4 flex justify-end">
      <LocaleSwitcher />
    </header>
    <main class="flex-1">
      <slot />
    </main>
    <footer class="p-4 text-center text-sm text-gray-500">
      &copy;2026 Rooster Studio
    </footer>
  </div>
</template>
