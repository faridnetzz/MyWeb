<script setup lang="ts">
import type { Project } from '~/composables/usePortfolio'

/**
 * Cover band for a project card. Falls back to a generated pattern when no
 * image exists, so a card with nothing to show still looks deliberate rather
 * than broken — most of these projects cannot be screenshotted.
 */
const props = defineProps<{ project: Project }>()

const initials = computed(() =>
  props.project.name
    .split(/[\s/]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
)
</script>

<template>
  <div class="pvisual">
    <img
      v-if="project.cover"
      class="pvisual-cover"
      :src="`/projects/${project.cover}`"
      :alt="`${project.name} — ${project.client}`"
      loading="lazy"
      decoding="async"
    />
    <template v-else>
      <img
        v-if="project.logo"
        class="pvisual-logo"
        :src="`/projects/${project.logo}`"
        :alt="`${project.name} logo`"
        loading="lazy"
        decoding="async"
      />
      <span v-else class="pvisual-mark" aria-hidden="true">{{ initials }}</span>
      <span class="pvisual-cat">{{ project.category }}</span>
    </template>

    <span v-if="project.demo" class="pvisual-badge"><i />Live demo</span>
  </div>
</template>
