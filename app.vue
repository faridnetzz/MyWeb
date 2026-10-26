<script setup lang="ts">
import { LOCALE_COOKIE } from '~/utils/i18n'

// lang, canonical, hreflang alternates, and og:locale for the active language
const localeHead = useLocaleHead()

useHead(() => ({
  htmlAttrs: { lang: localeHead.value.htmlAttrs.lang },
  link: localeHead.value.link,
  meta: localeHead.value.meta
}))

/**
 * Remembers the language in use, so the redirect script in <head> can send a
 * returning visitor from "/" back to it. Any page in a language counts as
 * choosing it, including one opened from a shared link.
 */
const { locale } = useI18n()
const localeCookie = useCookie(LOCALE_COOKIE, { maxAge: 60 * 60 * 24 * 365, sameSite: 'lax', path: '/' })

onMounted(() => watch(locale, (value) => (localeCookie.value = value), { immediate: true }))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
