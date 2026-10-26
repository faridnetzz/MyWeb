<script setup lang="ts">
import type { Project, ProjectCategory } from '~/composables/usePortfolio'

const { projects, profile } = usePortfolio()
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()

usePageSeo(
  () => `${t('archive.seoTitle')} — ${profile.value.name}`,
  () => t('archive.seoDescription')
)

type Filter = 'all' | ProjectCategory

const categories = computed<Filter[]>(() => ['all', ...new Set(projects.value.map((p) => p.category))])
const activeCategory = ref<Filter>('all')

const countIn = (category: ProjectCategory) => projects.value.filter((p) => p.category === category).length

const visible = computed(() =>
  activeCategory.value === 'all' ? projects.value : projects.value.filter((p) => p.category === activeCategory.value)
)

const selected = ref<Project | null>(null)

// deep link: /projects?p=<slug> opens that project straight away
onMounted(() => {
  const slug = route.query.p
  if (typeof slug === 'string') selected.value = projects.value.find((p) => p.slug === slug) ?? null
})

watch(selected, (project) => {
  router.replace({ query: project ? { p: project.slug } : {} })
})
</script>

<template>
  <div>
    <section class="page-head">
      <div class="wrap">
        <NuxtLink :to="localePath('/')" class="back-link">
          <AppIcon name="arrow-left" />
          {{ $t('archive.back') }}
        </NuxtLink>

        <span class="eyebrow">{{ $t('archive.eyebrow') }}</span>
        <h1 class="section-title" style="max-width: 18ch">{{ $t('archive.title') }}</h1>
        <p class="section-lead">{{ $t('archive.lead', { count: projects.length }) }}</p>
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
            <template v-if="cat === 'all'">{{ $t('archive.all') }}</template>
            <template v-else>{{ $t(`project.category.${cat}`) }} ({{ countIn(cat) }})</template>
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
