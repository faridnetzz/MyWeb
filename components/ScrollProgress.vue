<script setup lang="ts">
const value = ref(0)

const update = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight
  value.value = max > 0 ? Math.min(window.scrollY / max, 1) : 0
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>

<template>
  <div class="progress" :style="{ '--p': value }" aria-hidden="true" />
</template>
