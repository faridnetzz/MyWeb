<script setup lang="ts">
const { marquee } = usePortfolio()

// the track is duplicated so translateX(-50%) loops seamlessly
const items = computed(() => [...marquee.value, ...marquee.value])
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee-track">
      <span v-for="(item, i) in items" :key="`${item}-${i}`" class="marquee-item">{{ item }}</span>
    </div>
  </div>
</template>
