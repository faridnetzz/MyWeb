/**
 * The site's languages. nuxt.config builds the i18n locale list from this,
 * so adding a language starts here.
 */
export const LOCALES = [
  { code: 'en', language: 'en-US', name: 'English' },
  { code: 'id', language: 'id-ID', name: 'Bahasa Indonesia' }
] as const

export type Locale = (typeof LOCALES)[number]['code']

export const DEFAULT_LOCALE: Locale = 'en'

/** Last language in use; "/" sends a returning visitor back to it. */
export const LOCALE_COOKIE = 'afm-lang'

/**
 * Runs in <head> before first paint, on "/" only: goes to the remembered
 * language, or on a first visit the browser's preferred one. Doing this before
 * Vue starts avoids hydrating English markup in another language (a hydration
 * mismatch) and the flash of English before a client-side redirect. Kept as a
 * raw string like the theme script — it must not be bundled or deferred.
 */
export const localeRedirectScript = (() => {
  const others = LOCALES.map((l) => l.code).filter((code) => code !== DEFAULT_LOCALE)
  return `(function(){try{if(location.pathname!=='/')return;var m=document.cookie.match(/(?:^|; )${LOCALE_COOKIE}=([^;]*)/);var l=m?m[1]:((navigator.languages&&navigator.languages[0])||navigator.language||'').slice(0,2).toLowerCase();if(${JSON.stringify(others)}.indexOf(l)>-1)location.replace('/'+l+location.search+location.hash)}catch(e){}})()`
})()

const LOCALE_CODES: readonly string[] = LOCALES.map((l) => l.code)

/**
 * Copy authored side by side in every language: `{ en: '…', id: '…' }`.
 *
 * Content types are written in their resolved form (plain strings), and
 * `Translatable<T>` derives the authoring form, so a field may hold either a
 * plain value (same in every language) or one entry per locale. A missing
 * locale is a type error, not a blank on the page.
 */
export type Translatable<T> = T extends string
  ? T | Record<Locale, T>
  : T extends readonly (infer U)[]
    ? Translatable<U>[]
    : T extends object
      ? { [K in keyof T]: Translatable<T[K]> }
      : T

const isPerLocale = (value: object): value is Record<Locale, unknown> => {
  const keys = Object.keys(value)
  return keys.length === LOCALE_CODES.length && LOCALE_CODES.every((code) => keys.includes(code))
}

/** Picks `locale` out of every per-locale entry, however deeply nested. */
export const resolveTranslatable = <T>(value: Translatable<T>, locale: Locale): T => {
  if (Array.isArray(value)) return value.map((item) => resolveTranslatable(item, locale)) as T
  if (value === null || typeof value !== 'object') return value as T
  if (isPerLocale(value)) return value[locale] as T

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, resolveTranslatable(item as Translatable<unknown>, locale)])
  ) as T
}
