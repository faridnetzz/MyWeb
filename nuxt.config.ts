// https://nuxt.com/docs/api/configuration/nuxt-config

const siteUrl = 'https://ahmadfarid.dev' // TODO: real domain
const title = 'Ahmad Farid Muharram — AI & Computer Vision Developer'
const description =
  'R&D Supervisor building multi-tenant AI video analytics platforms. DeepStream, YOLO, face recognition, ANPR, and real-time detection at production scale.'

/**
 * Runs before first paint so the stored theme is applied without a flash.
 * Kept as a raw string on purpose — it must not be bundled or deferred.
 */
const themeScript = `(function(){try{var t=localStorage.getItem('afm-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  css: ['~/assets/css/tokens.css', '~/assets/css/main.css'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title,
      htmlAttrs: { lang: 'en', 'data-theme': 'dark' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: description },
        { name: 'author', content: 'Ahmad Farid Muharram' },
        { name: 'theme-color', content: '#08080a' },

        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: siteUrl },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: `${siteUrl}/og.png` },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: `${siteUrl}/og.png` }
      ],
      link: [
        { rel: 'canonical', href: siteUrl },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap'
        }
      ],
      script: [{ innerHTML: themeScript, tagPosition: 'head' }],
      // without JS the reveal animation never fires, so show everything
      noscript: [{ innerHTML: '<style>.reveal{opacity:1!important;transform:none!important}</style>' }]
    }
  }
})
