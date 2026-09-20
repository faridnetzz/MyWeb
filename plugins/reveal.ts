/**
 * v-reveal — fades an element in the first time it scrolls into view.
 *
 * Markup keeps `class="reveal"` so the hidden state is already in the SSR HTML
 * (no flash of content before hydration); the directive only does the watching.
 * Optional binding value is a stagger delay in ms: v-reveal="120".
 *
 * The revealed state is the `data-in` attribute rather than a class. Elements
 * like the experience accordion also carry a `:class` binding, and Vue patches
 * class by rewriting el.className wholesale — which would erase a class the
 * directive had added, leaving the element stuck at opacity 0.
 */
export default defineNuxtPlugin((nuxtApp) => {
  // SSR still has to resolve the directive, it just has nothing to do
  if (import.meta.server) {
    nuxtApp.vueApp.directive('reveal', { getSSRProps: () => ({}) })
    return
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const reveal = (el: Element) => el.setAttribute('data-in', '')

  const observer = reduced
    ? null
    : new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            reveal(entry.target)
            observer?.unobserve(entry.target)
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
      )

  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({}),

    mounted(el: HTMLElement, binding) {
      el.classList.add('reveal')

      if (!observer) {
        reveal(el)
        return
      }

      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
      observer.observe(el)
    },

    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    }
  })
})
