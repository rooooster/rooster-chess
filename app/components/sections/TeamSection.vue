<script setup lang="ts">
import IconBehance from '~/components/icons/IconBehance.vue'
import IconEagle from '~/components/icons/IconEagle.vue'
import IconEtsy from '~/components/icons/IconEtsy.vue'
import IconFacebook from '~/components/icons/IconFacebook.vue'
import IconLinkedin from '~/components/icons/IconLinkedin.vue'
import IconTwitter from '~/components/icons/IconTwitter.vue'

const { t } = useI18n()

const icons = {
  IconBehance,
  IconEagle,
  IconEtsy,
  IconFacebook,
  IconLinkedin,
  IconTwitter,
} as const

type IconName = keyof typeof icons

const members: ReadonlyArray<{
  photo: string
  nameKey: string
  role: string
  phone: string
  email: string
  socials: ReadonlyArray<{ icon: IconName; href: string; label: string }>
}> = [
  {
    photo: '/img/chess/team/antonpivniuk-2.jpg',
    nameKey: 'AntonPivniuk',
    role: 'CEO, Designer',
    phone: '+380 95 126 26 80',
    email: 'antonpivniuk@gmail.com',
    socials: [
      { icon: 'IconBehance', href: 'https://www.behance.net/antonpivniuk', label: 'Behance' },
      { icon: 'IconLinkedin', href: 'https://www.linkedin.com/in/antonpivniuk', label: 'LinkedIn' },
      { icon: 'IconFacebook', href: 'https://www.facebook.com/apivniuk', label: 'Facebook' },
    ],
  },
  {
    photo: '/img/chess/team/ihororlovskyi-2.jpg',
    nameKey: 'IhorOrlovskyi',
    role: 'CTO, Designer',
    phone: '+380 95 345 25 89',
    email: 'ihororlovskyi@gmail.com',
    socials: [
      { icon: 'IconEagle', href: 'http://ihororlovskyi.com/', label: 'Website' },
      { icon: 'IconLinkedin', href: 'https://www.linkedin.com/in/ihororlovskyi', label: 'LinkedIn' },
      { icon: 'IconFacebook', href: 'https://www.facebook.com/profile.php?id=1617270694', label: 'Facebook' },
    ],
  },
]

const studioSocials: ReadonlyArray<{ icon: IconName; href: string; label: string }> = [
  { icon: 'IconFacebook', href: 'https://www.facebook.com/rooster.studio', label: 'Facebook' },
  { icon: 'IconEtsy', href: 'https://www.etsy.com/listing/250199234/chess-table-gods-chess', label: 'Etsy' },
  { icon: 'IconTwitter', href: 'https://twitter.com/rooster_studio', label: 'Twitter' },
]
</script>

<template>
  <section id="team" class="team">
    <div class="members">
      <h3>{{ t('Team') }}</h3>
      <article v-for="m in members" :key="m.email">
        <div class="image-contur">
          <NuxtImg :src="m.photo" :alt="`${t(m.nameKey)} Photo`" />
        </div>
        <h4>{{ t(m.nameKey) }}</h4>
        <h5>{{ m.role }}</h5>
        <p>{{ m.phone }}</p>
        <p><a :href="`mailto:${m.email}`">{{ m.email }}</a></p>
        <nav class="social">
          <a
            v-for="s in m.socials"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener"
          >
            <component :is="icons[s.icon]" />
            <span class="tooltip">{{ s.label }}</span>
          </a>
        </nav>
      </article>
    </div>

    <div class="buy">
      <h3>{{ t('Contact') }}</h3>
      <h4>Rooster Studio</h4>
      <p>{{ t('KyivUkraine') }}</p>
      <nav class="email">
        <a href="mailto:ihororlovskyi@gmail.com">ihororlovskyi@gmail.com</a>
        <br>
        <a href="mailto:antonpivniuk@gmail.com">antonpivniuk@gmail.com</a>
      </nav>
      <nav class="social">
        <a
          v-for="s in studioSocials"
          :key="s.label"
          :href="s.href"
          target="_blank"
          rel="noopener"
        >
          <component :is="icons[s.icon]" />
          <span class="tooltip">{{ s.label }}</span>
        </a>
      </nav>
    </div>
  </section>
</template>
