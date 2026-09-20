<script setup lang="ts">
defineProps<{
  num?: string
  eyebrow: string
  title: string
  lead?: string
}>()
</script>

<template>
  <div class="section-head reveal" v-reveal>
    <span class="eyebrow"><template v-if="num">{{ num }} — </template>{{ eyebrow }}</span>
    <h2 class="section-title">{{ title }}</h2>
    <p v-if="lead" class="section-lead">{{ lead }}</p>
  </div>
</template>
