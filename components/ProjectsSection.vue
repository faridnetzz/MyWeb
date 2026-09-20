<script setup lang="ts">
import type { Project } from '~/composables/usePortfolio'

const { featuredProjects, projects } = usePortfolio()
const selected = ref<Project | null>(null)
</script>

<template>
  <section id="work" class="section">
    <div class="wrap">
      <SectionHead
        num="03"
        eyebrow="Selected work"
        title="Systems that run on real cameras."
        lead="Production deployments, not demos. Click a card for the scope, the constraints, and what I actually shipped."
      />

      <div class="projects">
        <div
          v-for="(project, i) in featuredProjects"
          :key="project.slug"
          class="reveal"
          v-reveal="i * 70"
          style="display: flex"
        >
          <ProjectCard :project="project" :index="i" @open="selected = project" />
        </div>
      </div>

      <div class="section-foot reveal" v-reveal>
        <NuxtLink class="btn btn-ghost" to="/projects">
          Semua project ({{ projects.length }})
          <AppIcon name="arrow-right" />
        </NuxtLink>
      </div>
    </div>

    <ProjectModal :project="selected" @close="selected = null" />
  </section>
</template>
