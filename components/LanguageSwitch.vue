<script setup lang="ts">
const { target, path } = useLanguageSwitch()
</script>

<template>
  <NuxtLink
    class="icon-btn lang-btn"
    :to="path"
    :hreflang="target.language"
    :aria-label="$t('lang.switch', { name: target.name })"
    :title="$t('lang.switch', { name: target.name })"
  >
    {{ target.code.toUpperCase() }}
  </NuxtLink>
</template>
