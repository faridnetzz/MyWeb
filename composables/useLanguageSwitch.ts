/**
 * The site has two languages, so switching is a toggle to whichever one is not
 * active. The path keeps the current page, query, and hash.
 */
export const useLanguageSwitch = () => {
  const { locale, locales } = useI18n()
  const switchLocalePath = useSwitchLocalePath()

  const target = computed(() => locales.value.find((l) => l.code !== locale.value)!)
  const path = computed(() => switchLocalePath(target.value.code))

  return { target, path }
}
