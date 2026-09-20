<script setup lang="ts">
const visible = ref(false)
const update = () => (visible.value = window.scrollY > 600)

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', update))

const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <Transition name="fade">
    <button v-if="visible" class="totop" type="button" aria-label="Back to top" @click="toTop">
      <AppIcon name="arrow-up" />
    </button>
  </Transition>
</template>
