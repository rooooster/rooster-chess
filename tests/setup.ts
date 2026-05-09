import { computed, h, nextTick, onMounted, onUnmounted, reactive, ref, toRefs, watch, watchEffect } from 'vue'
import { vi } from 'vitest'

const g = globalThis as Record<string, unknown>

// Vue auto-imports (Nuxt exposes these globally; Vitest does not)
g.computed = computed
g.h = h
g.nextTick = nextTick
g.onMounted = onMounted
g.onUnmounted = onUnmounted
g.reactive = reactive
g.ref = ref
g.toRefs = toRefs
g.watch = watch
g.watchEffect = watchEffect

// Default Nuxt/i18n auto-import stubs — individual tests may override.
const defaultLocales = [
  { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
  { code: 'ua', iso: 'uk-UA', file: 'ua.json', name: 'Українська' },
  { code: 'pl', iso: 'pl-PL', file: 'pl.json', name: 'Polski' }
]

const localeRef = ref('en')
const localesRef = ref(defaultLocales)

g.useI18n = vi.fn(() => ({
  locale: localeRef,
  locales: localesRef,
  t: (key: string) => key,
  setLocale: (code: string) => {
    localeRef.value = code
  }
}))
g.useSwitchLocalePath = vi.fn(() => (code: string) => (code === 'en' ? '/' : `/${code}/`))
g.useLocalePath = vi.fn(() => (path: string) => path)
g.useRoute = vi.fn(() => ({ path: '/', params: {}, query: {}, fullPath: '/' }))
g.useRouter = vi.fn(() => ({ push: vi.fn(), replace: vi.fn() }))
g.useHead = vi.fn(() => undefined)
g.useSeoMeta = vi.fn(() => undefined)
g.useState = (_key: string, init?: () => unknown) => ref(init?.())
g.definePageMeta = vi.fn()
g.defineNuxtConfig = (cfg: Record<string, unknown>) => cfg
g.defineI18nRoute = vi.fn()

export const __testHelpers = {
  setLocale(code: string) {
    localeRef.value = code
  },
  resetLocale() {
    localeRef.value = 'en'
  }
}
