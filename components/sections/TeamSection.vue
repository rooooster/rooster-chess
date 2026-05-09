<script setup lang="ts">
const { t } = useI18n()

interface SocialLink {
  href: string
  icon: 'facebook' | 'twitter' | 'linkedin' | 'behance' | 'eagle' | 'etsy'
  label: string
}

const anton: { phone: string; email: string; socials: SocialLink[] } = {
  phone: '+380 95 126 26 80',
  email: 'antonpivniuk@gmail.com',
  socials: [
    { href: 'https://www.behance.net/antonpivniuk', icon: 'behance', label: 'Behance' },
    { href: 'https://www.linkedin.com/in/antonpivniuk', icon: 'linkedin', label: 'LinkedIn' },
    { href: 'https://www.facebook.com/apivniuk', icon: 'facebook', label: 'Facebook' }
  ]
}

const ihor: { phone: string; email: string; socials: SocialLink[] } = {
  phone: '+380 95 345 25 89',
  email: 'ihororlovskyi@gmail.com',
  socials: [
    { href: 'https://ihororlovskyi.com/', icon: 'eagle', label: 'WebSite' },
    { href: 'https://www.linkedin.com/in/ihororlovskyi', icon: 'linkedin', label: 'LinkedIn' },
    { href: 'https://www.facebook.com/ihororlovskyi', icon: 'facebook', label: 'Facebook' }
  ]
}

const studioSocials: SocialLink[] = [
  { href: 'https://www.facebook.com/rooster.studio', icon: 'facebook', label: 'Facebook' },
  { href: 'https://www.etsy.com/listing/250199234/chess-table-gods-chess', icon: 'etsy', label: 'Etsy' },
  { href: 'https://twitter.com/rooster_studio', icon: 'twitter', label: 'Twitter' }
]
</script>

<template>
  <section id="team" class="team grid md:grid-cols-2 gap-12 py-16 px-4">
    <div class="members">
      <h3 class="text-3xl font-bold mb-8">{{ t('Team') }}</h3>

      <article class="mb-10">
        <div class="image-contur w-32 h-32 rounded-full overflow-hidden mb-3">
          <img src="/img/chess/team/antonpivniuk-2.jpg" alt="Anton Pivniuk Photo" class="w-full h-full object-cover" />
        </div>
        <h4 class="text-xl font-semibold">{{ t('AntonPivniuk') }}</h4>
        <h5 class="text-sm opacity-70">CEO, Designer</h5>
        <p>{{ anton.phone }}</p>
        <p><a :href="`mailto:${anton.email}?subject=Hello Anton`">{{ anton.email }}</a></p>
        <nav class="social flex gap-3 mt-3">
          <a v-for="s in anton.socials" :key="s.icon" :href="s.href" target="_blank" rel="noopener" :aria-label="s.label">
            <svg class="w-6 h-6"><use :href="`#${s.icon}-icon`" /></svg>
          </a>
        </nav>
      </article>

      <article>
        <div class="image-contur w-32 h-32 rounded-full overflow-hidden mb-3">
          <img src="/img/chess/team/ihororlovskyi-2.jpg" alt="Ihor Orlovskyi Photo" class="w-full h-full object-cover" />
        </div>
        <h4 class="text-xl font-semibold">{{ t('IhorOrlovskyi') }}</h4>
        <h5 class="text-sm opacity-70">CTO, Designer</h5>
        <p>{{ ihor.phone }}</p>
        <p><a :href="`mailto:${ihor.email}?subject=Hello Ihor`">{{ ihor.email }}</a></p>
        <nav class="social flex gap-3 mt-3">
          <a v-for="s in ihor.socials" :key="s.icon" :href="s.href" target="_blank" rel="noopener" :aria-label="s.label">
            <svg class="w-6 h-6"><use :href="`#${s.icon}-icon`" /></svg>
          </a>
        </nav>
      </article>
    </div>

    <div class="buy">
      <h3 class="text-3xl font-bold mb-8">{{ t('Contact') }}</h3>
      <h4 class="text-xl font-semibold">Rooster Studio</h4>
      <p>{{ t('KyivUkraine') }}</p>
      <nav class="email mt-3">
        <a :href="`mailto:${ihor.email}?subject=Hello Ihor`">{{ ihor.email }}</a>
        <br />
        <a :href="`mailto:${anton.email}?subject=Hello Anton`">{{ anton.email }}</a>
      </nav>
      <nav class="social flex gap-3 mt-3">
        <a v-for="s in studioSocials" :key="s.icon" :href="s.href" target="_blank" rel="noopener" :aria-label="s.label">
          <svg class="w-6 h-6"><use :href="`#${s.icon}-icon`" /></svg>
        </a>
      </nav>
    </div>
  </section>
</template>
