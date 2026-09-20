<script setup lang="ts">
const { profile, socials } = usePortfolio()
const clock = useClock(profile.timezone)

/**
 * Typewriter over profile.roles.
 * Starts on the first role so the server HTML and the first client frame match.
 */
const typed = ref(profile.roles[0])
let timer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  let roleIndex = 0
  let charIndex = profile.roles[0].length
  let deleting = false

  const step = () => {
    const word = profile.roles[roleIndex]
    charIndex += deleting ? -1 : 1
    typed.value = word.slice(0, charIndex)

    let delay = deleting ? 34 : 62

    if (!deleting && charIndex === word.length) {
      deleting = true
      delay = 2200
    } else if (deleting && charIndex === 0) {
      deleting = false
      roleIndex = (roleIndex + 1) % profile.roles.length
      delay = 320
    }

    timer = setTimeout(step, delay)
  }

  timer = setTimeout(step, 2200)
})

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <section class="hero">
    <div class="hero-grid-bg" />
    <div class="hero-glow" />

    <div class="wrap hero-inner">
      <div>
        <span v-if="profile.available" class="pill reveal" v-reveal>
          <i class="dot" />
          {{ profile.availabilityNote }}
        </span>

        <h1 class="reveal" v-reveal="80">{{ profile.name }}</h1>

        <p class="hero-role reveal" v-reveal="140">
          <span>{{ typed }}</span>
          <span class="caret" aria-hidden="true" />
        </p>

        <p class="hero-sub reveal" v-reveal="200">{{ profile.tagline }}</p>

        <div class="hero-cta reveal" v-reveal="260">
          <NuxtLink class="btn btn-primary" to="/#work">
            <AppIcon name="grid" />
            Lihat project
          </NuxtLink>
          <a class="btn btn-ghost" :href="profile.resumeUrl" download>
            <AppIcon name="file-text" />
            Download CV
          </a>
        </div>

        <div class="hero-socials reveal" v-reveal="320">
          <a
            v-for="s in socials"
            :key="s.label"
            class="social-btn"
            :href="s.href"
            :title="`${s.label} — ${s.handle}`"
            :aria-label="s.label"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AppIcon :name="s.icon" />
          </a>
          <span class="sep" />
          <span class="tag">
            <AppIcon name="map-pin" style="width: 12px; height: 12px; margin-right: 6px" />
            {{ profile.location }}
          </span>
        </div>
      </div>

      <div class="hero-card reveal" v-reveal="180">
        <div class="hero-card-bar">
          <i /><i /><i />
          <span>~/status</span>
        </div>
        <div class="hero-card-body">
          <div class="hero-card-row">
            <span class="k">status</span>
            <span class="v s">{{ profile.available ? 'open to work' : 'heads-down' }}</span>
          </div>
          <div class="hero-card-row">
            <span class="k">role</span>
            <span class="v">R&amp;D Supervisor</span>
          </div>
          <div class="hero-card-row">
            <span class="k">focus</span>
            <span class="v">DeepStream · ANPR · FR</span>
          </div>
          <div class="hero-card-row">
            <span class="k">stack</span>
            <span class="v">Python · YOLO · TensorRT</span>
          </div>
          <div class="hero-card-row">
            <span class="k">local</span>
            <span class="v">
              <ClientOnly fallback="--:--:--">{{ clock }}</ClientOnly>
              WIB
            </span>
          </div>
          <div class="hero-card-row">
            <span class="k">reply</span>
            <span class="v">&lt; 24 jam</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
