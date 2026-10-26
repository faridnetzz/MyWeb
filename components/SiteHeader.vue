<script setup lang="ts">
const { profile, navItems } = usePortfolio()
const localePath = useLocalePath()
const getRouteBaseName = useRouteBaseName()
const route = useRoute()
const { toggle: toggleTheme } = useTheme()
const palette = useCommandPalette()

// section ids are the same in every language
const active = useScrollSpy(navItems.value.map((i) => i.id))
const isHome = computed(() => getRouteBaseName(route) === 'index')

const stuck = ref(false)
const menuOpen = ref(false)

const onScroll = () => (stuck.value = window.scrollY > 8)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

// close the drawer on navigation
watch(
  () => route.fullPath,
  () => (menuOpen.value = false)
)

watch(menuOpen, (open) => {
  if (import.meta.client) document.body.style.overflow = open ? 'hidden' : ''
})
onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ''
})

const isActive = (id: string) => isHome.value && active.value === id
</script>

<template>
  <header class="header" :class="{ 'is-stuck': stuck || menuOpen }">
    <div class="wrap header-inner">
      <NuxtLink :to="localePath('/')" class="brand" :aria-label="$t('nav.home')">
        <span class="brand-mark">{{ profile.initials }}</span>
        <span class="brand-name">farid<b>.</b></span>
      </NuxtLink>

      <nav class="nav" :aria-label="$t('nav.sections')">
        <NuxtLink
          v-for="item in navItems"
          :key="item.id"
          :to="localePath(`/#${item.id}`)"
          :class="{ 'is-active': isActive(item.id) }"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="header-tools">
        <button class="kbd-btn" type="button" :aria-label="$t('header.openPalette')" @click="palette.show()">
          <AppIcon name="search" />
          <span>{{ $t('header.search') }}</span>
          <kbd>⌘K</kbd>
        </button>

        <LanguageSwitch />

        <button class="icon-btn theme-toggle" type="button" :aria-label="$t('header.toggleTheme')" @click="toggleTheme">
          <AppIcon name="sun" class="icon i-sun" />
          <AppIcon name="moon" class="icon i-moon" />
        </button>

        <button
          class="icon-btn menu-btn"
          type="button"
          :aria-expanded="menuOpen"
          :aria-label="$t('header.toggleMenu')"
          @click="menuOpen = !menuOpen"
        >
          <AppIcon :name="menuOpen ? 'close' : 'menu'" />
        </button>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="menuOpen" class="drawer-wrap">
        <!-- tap outside to dismiss -->
        <div class="drawer-scrim" @click="menuOpen = false" />
        <div class="drawer">
        <NuxtLink
          v-for="item in navItems"
          :key="item.id"
          :to="localePath(`/#${item.id}`)"
          :class="{ 'is-active': isActive(item.id) }"
          @click="menuOpen = false"
        >
          {{ item.label }}
          <span>{{ item.num }}</span>
        </NuxtLink>

        <NuxtLink :to="localePath('/projects')" @click="menuOpen = false">
          {{ $t('nav.allProjects') }}
          <span>↗</span>
        </NuxtLink>

        <!-- the ⌘K shortcut is keyboard-only; this is the touch entry point -->
        <button
          class="btn btn-ghost"
          type="button"
          style="margin-top: 16px; width: 100%"
          @click="menuOpen = false; palette.show()"
        >
          <AppIcon name="search" />
          {{ $t('header.searchMobile') }}
        </button>

        <a class="btn btn-primary" style="margin-top: 10px; width: 100%" :href="`mailto:${profile.email}`">
          <AppIcon name="mail" />
          {{ $t('header.contactMe') }}
        </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style>
/* Theme icon is swapped by CSS, not state — keeps SSR and hydration identical. */
:root[data-theme='light'] .theme-toggle .i-sun,
:root[data-theme='dark'] .theme-toggle .i-moon {
  display: none;
}
</style>
