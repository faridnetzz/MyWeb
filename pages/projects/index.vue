<script setup lang="ts">
import type { Project } from '~/composables/usePortfolio'

const { projects, profile } = usePortfolio()
const route = useRoute()
const router = useRouter()

useSeoMeta({
  title: `Projects — ${profile.name}`,
  description: 'Every project: AI video analytics platforms, national ETLE deployments, smart city CCTV, and more.'
})

const categories = ['All', ...new Set(projects.map((p) => p.category))]
const activeCategory = ref('All')

const visible = computed(() =>
  activeCategory.value === 'All' ? projects : projects.filter((p) => p.category === activeCategory.value)
)

const selected = ref<Project | null>(null)

// deep link: /projects?p=<slug> opens that project straight away
onMounted(() => {
  const slug = route.query.p
  if (typeof slug === 'string') selected.value = projects.find((p) => p.slug === slug) ?? null
})

watch(selected, (project) => {
  router.replace({ query: project ? { p: project.slug } : {} })
})
</script>

<template>
  <div>
    <section class="page-head">
      <div class="wrap">
        <NuxtLink to="/" class="back-link">
          <AppIcon name="arrow-left" />
          Kembali ke home
        </NuxtLink>

        <span class="eyebrow">Archive</span>
        <h1 class="section-title" style="max-width: 18ch">All projects</h1>
        <p class="section-lead">
          {{ projects.length }} project — dari platform AI multi-tenant sampai deployment ETLE skala nasional.
          Klik salah satu buat lihat scope dan detail teknisnya.
        </p>
      </div>
    </section>

    <section class="section" style="padding-top: 0; border-top: none">
      <div class="wrap">
        <div class="filters">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            :class="{ 'is-active': activeCategory === cat }"
            @click="activeCategory = cat"
          >
            {{ cat }}
            <template v-if="cat !== 'All'">
              ({{ projects.filter((p) => p.category === cat).length }})
            </template>
          </button>
        </div>

        <div class="projects">
          <div
            v-for="(project, i) in visible"
            :key="project.slug"
            class="reveal"
            v-reveal="i * 50"
            style="display: flex"
          >
            <ProjectCard :project="project" :index="i" @open="selected = project" />
          </div>
        </div>
      </div>

      <ProjectModal :project="selected" @close="selected = null" />
    </section>
  </div>
</template>
