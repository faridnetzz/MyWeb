<script setup lang="ts">
const { profile, socials, navItems } = usePortfolio()
const localePath = useLocalePath()
const clock = useClock(profile.value.timezone)
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="wrap">
      <div class="footer-top">
        <div class="footer-brand">
          <NuxtLink :to="localePath('/')" class="brand">
            <span class="brand-mark">{{ profile.initials }}</span>
            <span class="brand-name">farid<b>.</b></span>
          </NuxtLink>
          <p>{{ $t('footer.tagline', { title: profile.title }) }}</p>
        </div>

        <div class="footer-cols">
          <div class="footer-col">
            <h4>{{ $t('footer.navigate') }}</h4>
            <NuxtLink v-for="item in navItems" :key="item.id" :to="localePath(`/#${item.id}`)">{{ item.label }}</NuxtLink>
            <NuxtLink :to="localePath('/projects')">{{ $t('nav.allProjects') }}</NuxtLink>
          </div>
          <div class="footer-col">
            <h4>{{ $t('footer.elsewhere') }}</h4>
            <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener noreferrer">
              {{ s.label }}
            </a>
          </div>
          <div class="footer-col">
            <h4>{{ $t('footer.status') }}</h4>
            <span>{{ profile.available ? $t('footer.open') : $t('footer.notLooking') }}</span>
            <span>{{ profile.location }}</span>
            <a :href="profile.resumeUrl" download>{{ $t('hero.downloadCv') }}</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© {{ year }} {{ profile.name }} · {{ $t('footer.built') }}</span>
        <span class="footer-clock">
          <i />
          <ClientOnly fallback="--:--:--">{{ clock }}</ClientOnly>
          WIB · Jakarta
        </span>
      </div>
    </div>
  </footer>
</template>
