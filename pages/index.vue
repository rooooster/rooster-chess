<script setup lang="ts">
import HeroSection from '~/components/sections/HeroSection.vue'
import HeaderSection from '~/components/sections/HeaderSection.vue'
import TableSection from '~/components/sections/TableSection.vue'
import HiwSection from '~/components/sections/HiwSection.vue'
import FiguresSection from '~/components/sections/FiguresSection.vue'
import RoosterSection from '~/components/sections/RoosterSection.vue'
import GameSection from '~/components/sections/GameSection.vue'
import TeamSection from '~/components/sections/TeamSection.vue'
import SvgIconsSection from '~/components/sections/SvgIconsSection.vue'

const { t, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const siteUrl = 'https://rooster-chess.netlify.app'
const ogImage = `${siteUrl}/img/og-images/chess.jpg`

useSeoMeta({
  title: () => `${t('title')} · Rooster Studio`,
  description: () => t('description'),
  ogTitle: () => `${t('title')} · Rooster Studio`,
  ogDescription: () => t('description'),
  ogImage,
  ogUrl: () => `${siteUrl}${locale.value === 'en' ? '/' : `/${locale.value}/`}`,
  twitterCard: 'summary_large_image'
})

useHead({
  link: [
    { rel: 'shortcut icon', href: '/img/favicons/favicon-32.png' },
    { rel: 'apple-touch-icon', href: '/img/favicons/favicon-144.png' },
    { rel: 'alternate', hreflang: 'en', href: `${siteUrl}${switchLocalePath('en')}` },
    { rel: 'alternate', hreflang: 'uk', href: `${siteUrl}${switchLocalePath('ua')}` },
    { rel: 'alternate', hreflang: 'pl', href: `${siteUrl}${switchLocalePath('pl')}` },
    { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/` }
  ]
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
