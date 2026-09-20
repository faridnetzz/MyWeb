/** Shared open state so the header button and the global palette agree. */
export const useCommandPalette = () => {
  const open = useState('cmdk-open', () => false)

  return {
    open,
    show: () => (open.value = true),
    hide: () => (open.value = false),
    toggle: () => (open.value = !open.value)
  }
}
