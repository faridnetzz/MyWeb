export type ThemeMode = 'dark' | 'light'

const STORAGE_KEY = 'afm-theme'

/**
 * The initial theme is applied by an inline script in nuxt.config before paint,
 * so this composable only mirrors and mutates `<html data-theme>`.
 */
export const useTheme = () => {
  const theme = useState<ThemeMode>('theme', () => 'dark')

  const set = (value: ThemeMode) => {
    theme.value = value
    if (import.meta.client) {
      document.documentElement.dataset.theme = value
      try {
        localStorage.setItem(STORAGE_KEY, value)
      } catch {
        /* private mode / storage disabled — the theme just won't persist */
      }
    }
  }

  const toggle = () => set(theme.value === 'dark' ? 'light' : 'dark')

  onMounted(() => {
    theme.value = (document.documentElement.dataset.theme as ThemeMode) || 'dark'
  })

  return { theme, set, toggle }
}
