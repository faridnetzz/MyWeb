// https://nuxt.com/docs/api/configuration/nuxt-config
import { DEFAULT_LOCALE, LOCALES, localeRedirectScript } from './utils/i18n'

const siteUrl = 'https://faridmuharram.dev'

/**
 * Runs before first paint so the stored theme is applied without a flash.
 * Kept as a raw string on purpose — it must not be bundled or deferred.
 */
const themeScript = `(function(){try{var t=localStorage.getItem('afm-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n'],

  css: ['~/assets/css/tokens.css', '~/assets/css/main.css'],

  /**
   * English lives at /, Indonesian at /id. Each page sets its own title and
   * description; app.vue adds lang, canonical, hreflang, and og:locale.
   *
   * The module's language detection is off: on a static site it can only
   * redirect after hydrating, so localeRedirectScript does it before paint
   * instead, and app.vue remembers the choice in a cookie.
   */
  i18n: {
    baseUrl: siteUrl,
    defaultLocale: DEFAULT_LOCALE,
    strategy: 'prefix_except_default',
    locales: LOCALES.map((locale) => ({ ...locale, file: `${locale.code}.json` })),
    detectBrowserLanguage: false
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { 'data-theme': 'dark' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'author', content: 'Ahmad Farid Muharram' },
        { name: 'theme-color', content: '#08080a' },

        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: `${siteUrl}/og.png` },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: `${siteUrl}/og.png` }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap'
        }
      ],
      script: [
        { innerHTML: localeRedirectScript, tagPosition: 'head' },
        { innerHTML: themeScript, tagPosition: 'head' }
      ],
      // without JS the reveal animation never fires, so show everything
      noscript: [{ innerHTML: '<style>.reveal{opacity:1!important;transform:none!important}</style>' }]
    }
  }
})
