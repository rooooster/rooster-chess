<script setup lang="ts">
definePageMeta({
  // Single-language portfolio page; opt out of @nuxtjs/i18n routing.
  i18n: false
})

const siteUrl = 'https://rooster-chess.netlify.app'

useSeoMeta({
  title: 'Rooster Studio',
  description: 'Rooster Studio — for fun and beauty. Selected works.',
  ogTitle: 'Rooster Studio',
  ogDescription: 'Rooster Studio — for fun and beauty. Selected works.',
  ogImage: `${siteUrl}/img/og-images/home.jpg`,
  ogUrl: `${siteUrl}/home/`
})

useHead({
  link: [
    { rel: 'shortcut icon', href: '/img/favicons/favicon-32.png' },
    { rel: 'apple-touch-icon', href: '/img/favicons/favicon-144.png' }
  ]
})

interface Entry {
  label: string
  href: string
  linkText: string
}

const sites: Entry[] = [
  { label: "God's Chess", href: 'http://rooooster.com', linkText: 'rooooster.com' },
  { label: 'Skoryk Competition 2016', href: 'http://skoryk-competition.com', linkText: 'skoryk-competition.com' },
  { label: 'Monte Carlo Riviera', href: 'http://mcriviera.com', linkText: 'mcriviera.com' },
  { label: 'Nebo Event Management Agency', href: 'http://nebo.ua', linkText: 'nebo.ua' }
]

const branding: Entry[] = [
  { label: 'Nebo Event Management Agency', href: 'https://www.facebook.com/NEBO.events.management', linkText: 'logo' },
  { label: 'Wish Happy', href: 'http://rooooster.com/wish-happy', linkText: 'logo' },
  { label: 'Академія Кодування', href: 'https://www.facebook.com/uacodeacademy', linkText: 'logo' },
  { label: 'Bigcitymom', href: 'https://www.facebook.com/bigcitymom', linkText: 'logo' }
]

const animation: Entry[] = [
  { label: 'Lehrplattform', href: 'http://rooooster.com/lehrplattform', linkText: 'page' },
  { label: 'Luckylabs', href: 'http://rooooster.com/luckylabs', linkText: 'page' }
]
</script>

<template>
  <main class="home max-w-3xl mx-auto px-4 py-16">
    <NuxtLink to="/home/" class="inline-block mb-6"><span class="icon-rooster text-4xl" aria-hidden="true" /></NuxtLink>
    <h1 class="text-4xl font-extrabold">Rooster Studio</h1>
    <h2 class="text-xl opacity-70 mt-1">For Fun &amp; Beauty</h2>

    <hr class="my-8 border-current/20" />

    <h3 class="text-2xl font-semibold mb-3">Sites</h3>
    <div v-for="(s, i) in sites" :key="`site-${i}`" class="flex justify-between border-b border-current/10 py-1.5">
      <span>{{ s.label }}</span>
      <a :href="s.href" target="_blank" rel="noopener" class="underline">{{ s.linkText }}</a>
    </div>

    <hr class="my-8 border-current/20" />

    <h3 class="text-2xl font-semibold mb-3">Branding</h3>
    <div v-for="(b, i) in branding" :key="`brand-${i}`" class="flex justify-between border-b border-current/10 py-1.5">
      <span>{{ b.label }}</span>
      <a :href="b.href" target="_blank" rel="noopener" class="underline">{{ b.linkText }}</a>
    </div>

    <hr class="my-8 border-current/20" />

    <h3 class="text-2xl font-semibold mb-3">Animation &amp; Fun</h3>
    <div v-for="(a, i) in animation" :key="`anim-${i}`" class="flex justify-between border-b border-current/10 py-1.5">
      <span>{{ a.label }}</span>
      <a :href="a.href" target="_blank" rel="noopener" class="underline">{{ a.linkText }}</a>
    </div>
  </main>
</template>
