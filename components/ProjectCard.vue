<script setup lang="ts">
import type { Project } from '~/composables/usePortfolio'

defineProps<{ project: Project; index: number }>()
defineEmits<{ open: [] }>()
</script>

<template>
  <!-- The button's ::after covers the card, so the whole surface is clickable
       without nesting a heading inside a <button>. -->
  <article class="pcard">
    <ProjectVisual :project="project" />

    <div class="pcard-top">
      <span class="pcard-index">{{ String(index + 1).padStart(2, '0') }} / {{ project.year }}</span>
      <span class="pcard-status"><i />{{ project.status }}</span>
    </div>

    <h3>{{ project.name }}</h3>
    <p class="pcard-role">{{ project.role }} · {{ project.client }}</p>
    <p>{{ project.summary }}</p>

    <div class="pcard-tags">
      <span v-for="tag in project.tags.slice(0, 4)" :key="tag" class="tag">{{ tag }}</span>
      <span v-if="project.tags.length > 4" class="tag">+{{ project.tags.length - 4 }}</span>
    </div>

    <button class="pcard-more" type="button" @click="$emit('open')">
      Lihat detail
      <AppIcon name="arrow-right" />
      <span class="sr-only">— {{ project.name }}</span>
    </button>
  </article>
</template>
