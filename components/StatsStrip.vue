<script setup lang="ts">
const { stats } = usePortfolio()
</script>

<template>
  <section class="section" style="border-top: none; padding-top: 0">
    <div class="wrap">
      <div class="stats reveal" v-reveal>
        <div v-for="s in stats" :key="s.label" class="stat">
          <div class="stat-num">{{ s.num }}</div>
          <div class="stat-label">{{ s.label }}</div>
          <div class="stat-note">{{ s.note }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
