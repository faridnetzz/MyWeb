<script setup lang="ts">
import type { GalleryImage } from '~/composables/usePortfolio'

/**
 * Screenshot gallery for the project modal: the first image large, the rest
 * as thumbnails, any of them opening a lightbox at full size. Tall full-page
 * captures scroll inside the lightbox instead of shrinking to fit.
 */
const props = defineProps<{ items: GalleryImage[] }>()

const full = (item: GalleryImage) => `/projects/${item.src}.webp`
const thumb = (item: GalleryImage) => `/projects/${item.src}-thumb.webp`

const openIndex = ref<number | null>(null)
const current = computed(() =>
  openIndex.value === null ? null : { item: props.items[openIndex.value], number: openIndex.value + 1 }
)

const lightbox = ref<HTMLElement | null>(null)
// filled by index: a plain ref array in v-for does not keep the source order
const triggers: HTMLElement[] = []

const open = async (index: number) => {
  openIndex.value = index
  await nextTick()
  lightbox.value?.focus()
}

const close = () => {
  const index = openIndex.value
  openIndex.value = null
  if (index !== null) triggers[index]?.focus()
}

const step = (delta: number) => {
  if (openIndex.value === null) return
  openIndex.value = (openIndex.value + delta + props.items.length) % props.items.length
  lightbox.value?.scrollTo({ top: 0 })
}

/** Keeps Tab inside the lightbox, so focus cannot wander to the modal behind it. */
const trapTab = (e: KeyboardEvent) => {
  const buttons = [...(lightbox.value?.querySelectorAll<HTMLElement>('button') ?? [])]
  if (!buttons.length) return
  const first = buttons[0]
  const last = buttons[buttons.length - 1]
  const active = document.activeElement
  if (e.shiftKey && (active === first || active === lightbox.value)) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && active === last) {
    e.preventDefault()
    first.focus()
  }
}

/**
 * Registered in the capture phase so it runs before the modal's own window
 * listener: Escape here closes only the lightbox, not the modal behind it.
 */
const onKeydown = (e: KeyboardEvent) => {
  if (openIndex.value === null) return
  if (e.key === 'Tab') return trapTab(e)

  const actions: Record<string, () => void> = { Escape: close, ArrowLeft: () => step(-1), ArrowRight: () => step(1) }
  const action = actions[e.key]
  if (!action) return
  e.preventDefault()
  e.stopPropagation()
  action()
}

onMounted(() => window.addEventListener('keydown', onKeydown, { capture: true }))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown, { capture: true }))
</script>

<template>
  <figure class="gallery">
    <div class="gallery-grid">
      <button
        v-for="(item, i) in items"
        :key="item.src"
        :ref="(el) => (triggers[i] = el as HTMLElement)"
        type="button"
        class="gallery-item"
        :class="{ 'is-lead': i === 0 }"
        :aria-label="item.caption"
        @click="open(i)"
      >
        <!-- the lead tile is wide, so it gets the full-size image; the rest share 800×500 thumbnails -->
        <img v-if="i === 0" :src="full(item)" alt="" decoding="async" />
        <img v-else :src="thumb(item)" alt="" width="800" height="500" loading="lazy" decoding="async" />
      </button>
    </div>
    <figcaption>{{ $t('gallery.note') }}</figcaption>

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="current"
          ref="lightbox"
          class="lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="$t('gallery.label')"
          tabindex="-1"
          @click.self="close"
        >
          <div class="lightbox-bar">
            <span class="lightbox-count">{{ $t('gallery.count', { current: current.number, total: items.length }) }}</span>
            <button class="icon-btn" type="button" :aria-label="$t('gallery.prev')" @click="step(-1)">
              <AppIcon name="arrow-left" />
            </button>
            <button class="icon-btn" type="button" :aria-label="$t('gallery.next')" @click="step(1)">
              <AppIcon name="arrow-right" />
            </button>
            <button class="icon-btn" type="button" :aria-label="$t('gallery.close')" @click="close">
              <AppIcon name="close" />
            </button>
          </div>

          <figure class="lightbox-figure">
            <img :key="current.item.src" :src="full(current.item)" :alt="current.item.caption" decoding="async" />
            <figcaption>{{ current.item.caption }}</figcaption>
          </figure>
        </div>
      </Transition>
    </Teleport>
  </figure>
</template>
