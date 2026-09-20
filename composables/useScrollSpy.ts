/** Highlights the nav link whose section is currently under the header. */
export const useScrollSpy = (ids: string[], offset = 140) => {
  const active = ref('')

  const update = () => {
    const y = window.scrollY + offset
    let current = ''

    for (const id of ids) {
      const el = document.getElementById(id)
      if (!el) continue
      if (el.getBoundingClientRect().top + window.scrollY <= y) current = id
    }

    // pin the last section at the page bottom; it would never activate otherwise
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = ids[ids.length - 1]
    }

    active.value = current
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
  })

  return active
}
