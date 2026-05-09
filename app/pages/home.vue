<script setup lang="ts">
definePageMeta({ key: 'home' })

const SITE_URL = 'https://rooster-chess.netlify.app'
const OG_IMAGE = `${SITE_URL}/img/og-images/chess.jpg`
const TITLE = 'Rooster Studio'
const DESCRIPTION = 'Rooster Studio — For Fun & Beauty'

useSeoMeta({
  title: TITLE,
  description: DESCRIPTION,
  ogTitle: TITLE,
  ogDescription: DESCRIPTION,
  ogImage: OG_IMAGE,
})
</script>

<template>
  <main class="home">
    <a href="/home/"><span class="icon-rooster" /></a>
    <h1>Rooster Studio</h1>
    <h2>For Fun &amp; Beauty</h2>

    <hr>

    <h3>Sites</h3>

    <div>God's Chess | <a href="http://rooooster.com" target="_blank" rel="noopener">rooooster.com</a></div>
    <div>Skoryk Competition 2016 | <span class="text-gray-400" title="Link no longer available">skoryk-competition.com</span></div>
    <div>Monte Carlo Riviera | <span class="text-gray-400" title="Link no longer available">mcriviera.com</span></div>
    <div>Nebo Event Management Agency | <a href="http://nebo.ua" target="_blank" rel="noopener">nebo.ua</a></div>

    <hr>

    <h3>Branding</h3>

    <div>Nebo Event Management Agency | <a href="https://www.facebook.com/NEBO.events.management" target="_blank" rel="noopener">logo</a></div>
    <div>Wish Happy | <span class="text-gray-400" title="Link no longer available">logo</span></div>
    <div>Академія Кодування | <a href="https://www.facebook.com/uacodeacademy" target="_blank" rel="noopener">logo</a></div>
    <div>Bigcitymom | <a href="https://www.facebook.com/bigcitymom" target="_blank" rel="noopener">logo</a></div>

    <hr>

    <h3>Animation &amp; Fun</h3>

    <div>Lehrplattform | <span class="text-gray-400" title="Link no longer available">page</span></div>
    <div>Luckylabs | <span class="text-gray-400" title="Link no longer available">page</span></div>
  </main>
</template>
