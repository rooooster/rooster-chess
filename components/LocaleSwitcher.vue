<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

interface LocaleEntry {
  code: string
  name?: string
}

const items = computed<LocaleEntry[]>(() => locales.value as LocaleEntry[])
</script>

<template>
  <nav class="lang flex gap-3" aria-label="Language">
    <NuxtLink
      v-for="l in items"
      :key="l.code"
      :to="switchLocalePath(l.code as 'en' | 'ua' | 'pl')"
      :class="['lang-link', l.code, { active: l.code === locale }]"
      :aria-current="l.code === locale ? 'page' : undefined"
    >
      {{ l.code }}
    </NuxtLink>
  </nav>
</template>
