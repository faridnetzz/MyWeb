<script setup lang="ts">
type Item = {
  id: string
  group: string
  label: string
  icon: string
  hint?: string
  /** awaited, but the result is ignored — navigateTo returns more than a promise */
  run: () => unknown
}

const { profile, socials, navItems, projects } = usePortfolio()
const { t } = useI18n()
const localePath = useLocalePath()
const language = useLanguageSwitch()
const palette = useCommandPalette()
const { toggle: toggleTheme } = useTheme()

const query = ref('')
const activeIndex = ref(0)
const input = ref<HTMLInputElement | null>(null)
const copied = ref(false)

const items = computed<Item[]>(() => [
  ...navItems.value.map((n) => ({
    id: `nav-${n.id}`,
    group: t('palette.navigation'),
    label: n.label,
    icon: 'arrow-right',
    hint: `#${n.id}`,
    run: () => navigateTo(localePath(`/#${n.id}`))
  })),
  {
    id: 'nav-archive',
    group: t('palette.navigation'),
    label: t('nav.allProjects'),
    icon: 'grid',
    hint: localePath('/projects'),
    run: () => navigateTo(localePath('/projects'))
  },
  ...projects.value.map((p) => ({
    id: `project-${p.slug}`,
    group: t('palette.projects'),
    label: p.name,
    icon: 'briefcase',
    hint: p.year,
    run: () => navigateTo(localePath(`/projects?p=${p.slug}`))
  })),
  {
    id: 'action-theme',
    group: t('palette.actions'),
    label: t('palette.toggleTheme'),
    icon: 'sun',
    run: () => toggleTheme()
  },
  {
    id: 'action-language',
    group: t('palette.actions'),
    label: t('lang.switch', { name: language.target.value.name }),
    icon: 'globe',
    hint: language.target.value.code.toUpperCase(),
    run: () => navigateTo(language.path.value)
  },
  {
    id: 'action-copy',
    group: t('palette.actions'),
    label: copied.value ? t('palette.copied') : t('palette.copyEmail', { email: profile.value.email }),
    icon: copied.value ? 'check' : 'copy',
    run: async () => {
      try {
        await navigator.clipboard.writeText(profile.value.email)
        copied.value = true
        setTimeout(() => (copied.value = false), 1600)
      } catch {
        window.location.href = `mailto:${profile.value.email}`
      }
    }
  },
  {
    id: 'action-cv',
    group: t('palette.actions'),
    label: t('hero.downloadCv'),
    icon: 'file-text',
    run: () => window.open(profile.value.resumeUrl, '_blank')
  },
  ...socials.value.map((s) => ({
    id: `social-${s.label}`,
    group: t('footer.elsewhere'),
    label: s.label,
    icon: s.icon,
    hint: s.handle,
    run: () => window.open(s.href, '_blank', 'noopener')
  }))
])

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return items.value
  return items.value.filter((i) => `${i.label} ${i.group} ${i.hint ?? ''}`.toLowerCase().includes(q))
})

/** Group headings are rendered by comparing each row with the one before it. */
const showGroup = (index: number) =>
  index === 0 || filtered.value[index].group !== filtered.value[index - 1].group

const run = async (item: Item) => {
  const keepOpen = item.id === 'action-copy' || item.id === 'action-theme'
  await item.run()
  if (!keepOpen) palette.hide()
}

const move = (delta: number) => {
  const total = filtered.value.length
  if (!total) return
  activeIndex.value = (activeIndex.value + delta + total) % total

  nextTick(() => {
    document
      .querySelector('.cmdk-item.is-active')
      ?.scrollIntoView({ block: 'nearest' })
  })
}

const onKeydown = (e: KeyboardEvent) => {
  const key = e.key.toLowerCase()

  if ((e.metaKey || e.ctrlKey) && key === 'k') {
    e.preventDefault()
    palette.toggle()
    return
  }

  if (!palette.open.value) return

  if (e.key === 'Escape') {
    e.preventDefault()
    palette.hide()
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    move(1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    move(-1)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const item = filtered.value[activeIndex.value]
    if (item) run(item)
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

watch(query, () => (activeIndex.value = 0))

watch(palette.open, async (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (!open) return
  query.value = ''
  activeIndex.value = 0
  await nextTick()
  input.value?.focus()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="palette.open.value" class="cmdk-backdrop" @click.self="palette.hide()">
        <Transition name="pop" appear>
          <div class="cmdk" role="dialog" aria-modal="true" :aria-label="$t('palette.label')">
            <div class="cmdk-input">
              <AppIcon name="search" />
              <input
                ref="input"
                v-model="query"
                type="text"
                :placeholder="$t('palette.placeholder')"
                :aria-label="$t('palette.search')"
              />
              <kbd>ESC</kbd>
            </div>

            <div class="cmdk-list">
              <template v-if="filtered.length">
                <template v-for="(item, i) in filtered" :key="item.id">
                  <div v-if="showGroup(i)" class="cmdk-group">{{ item.group }}</div>
                  <button
                    class="cmdk-item"
                    type="button"
                    :class="{ 'is-active': i === activeIndex }"
                    @mouseenter="activeIndex = i"
                    @click="run(item)"
                  >
                    <AppIcon :name="item.icon" />
                    <span>{{ item.label }}</span>
                    <small v-if="item.hint">{{ item.hint }}</small>
                  </button>
                </template>
              </template>
              <div v-else class="cmdk-empty">{{ $t('palette.empty', { query }) }}</div>
            </div>

            <div class="cmdk-foot">
              <span><kbd>↑</kbd><kbd>↓</kbd> {{ $t('palette.navigate') }}</span>
              <span><kbd>↵</kbd> {{ $t('palette.select') }}</span>
              <span><kbd>esc</kbd> {{ $t('palette.close') }}</span>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
