<script setup lang="ts">
const { profile, socials, navItems } = usePortfolio()
const clock = useClock(profile.timezone)
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="wrap">
      <div class="footer-top">
        <div class="footer-brand">
          <NuxtLink to="/" class="brand">
            <span class="brand-mark">{{ profile.initials }}</span>
            <span class="brand-name">farid<b>.</b></span>
          </NuxtLink>
          <p>{{ profile.title }} — building AI video analytics that survive contact with real sites.</p>
        </div>

        <div class="footer-cols">
          <div class="footer-col">
            <h4>Navigate</h4>
            <NuxtLink v-for="item in navItems" :key="item.id" :to="`/#${item.id}`">{{ item.label }}</NuxtLink>
            <NuxtLink to="/projects">All projects</NuxtLink>
          </div>
          <div class="footer-col">
            <h4>Elsewhere</h4>
            <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener noreferrer">
              {{ s.label }}
            </a>
          </div>
          <div class="footer-col">
            <h4>Status</h4>
            <span>{{ profile.available ? 'Open to work' : 'Not looking' }}</span>
            <span>{{ profile.location }}</span>
            <a :href="profile.resumeUrl" download>Download CV</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© {{ year }} {{ profile.name }} · Built with Nuxt 3</span>
        <span class="footer-clock">
          <i />
          <ClientOnly fallback="--:--:--">{{ clock }}</ClientOnly>
          WIB · Jakarta
        </span>
      </div>
    </div>
  </footer>
</template>
