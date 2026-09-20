/** Live clock for a fixed IANA timezone — rendered client-side only. */
export const useClock = (timeZone: string) => {
  const time = ref('')
  let timer: ReturnType<typeof setInterval> | undefined

  const tick = () => {
    time.value = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(new Date())
  }

  onMounted(() => {
    tick()
    timer = setInterval(tick, 1000)
  })

  onBeforeUnmount(() => clearInterval(timer))

  return time
}
