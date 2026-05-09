<script setup lang="ts">
const { t } = useI18n()

const SITE_URL = 'https://rooster-chess.netlify.app'

useSeoMeta({
  title: () => `${t('title')} · Rooster Studio`,
  description: () => t('description'),
  ogTitle: () => `${t('title')} · Rooster Studio`,
  ogDescription: () => t('description'),
  ogImage: `${SITE_URL}/img/og-images/chess.jpg`,
  ogUrl: `${SITE_URL}/`,
  twitterCard: 'summary_large_image',
})

useHead({
  link: [
    { rel: 'alternate', hreflang: 'en', href: `${SITE_URL}/` },
    { rel: 'alternate', hreflang: 'uk', href: `${SITE_URL}/ua/` },
    { rel: 'alternate', hreflang: 'pl', href: `${SITE_URL}/pl/` },
    { rel: 'alternate', hreflang: 'x-default', href: `${SITE_URL}/` },
  ],
})
</script>

<template>
  <main class="chess">
    <HeroSection />
    <HeaderSection />
    <TableSection />
    <HiwSection />
    <FiguresSection />
    <RoosterSection />
    <GameSection />
    <TeamSection />
    <SvgIconsSection />
  </main>
</template>
