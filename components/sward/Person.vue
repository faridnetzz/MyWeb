<script setup lang="ts">
/**
 * A silhouette standing with its feet at (0, 0). Deliberately featureless:
 * the demo must never show anything that reads as a real face.
 */
withDefaults(
  defineProps<{
    helmet?: boolean
    vest?: boolean
    box?: 'head' | 'body' | null
    label?: string
    tone?: 'ok' | 'warn' | 'alert' | 'info'
  }>(),
  { helmet: false, vest: false, box: null, label: '', tone: 'info' }
)
</script>

<template>
  <g>
    <rect x="-3.4" y="-9.5" width="2.8" height="9.5" rx="1.2" class="p-sil" />
    <rect x="0.6" y="-9.5" width="2.8" height="9.5" rx="1.2" class="p-sil" />
    <rect x="-4.8" y="-21" width="9.6" height="12.5" rx="3.2" :class="vest ? 'p-vest' : 'p-sil'" />
    <circle cx="0" cy="-24.6" r="3.5" class="p-head" />
    <path v-if="helmet" d="M-4 -25.3 A4 4 0 0 1 4 -25.3 Z" class="p-helmet" />

    <template v-if="box === 'head'">
      <rect x="-5.8" y="-30.6" width="11.6" height="11.6" rx="1" class="b-box" :class="`b-${tone}`" />
      <text x="-5.8" y="-32.4" class="b-label" :class="`t-${tone}`">{{ label }}</text>
    </template>
    <template v-else-if="box === 'body'">
      <rect x="-7" y="-31" width="14" height="32.5" rx="1.2" class="b-box" :class="`b-${tone}`" />
      <text x="-7" y="-32.8" class="b-label" :class="`t-${tone}`">{{ label }}</text>
    </template>
  </g>
</template>
