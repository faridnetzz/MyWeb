<script setup lang="ts">
const { stack } = usePortfolio()

const activeKey = ref(stack[0].key)
const activeGroup = computed(() => stack.find((g) => g.key === activeKey.value) ?? stack[0])
</script>

<template>
  <section id="stack" class="section">
    <div class="wrap">
      <SectionHead
        num="05"
        eyebrow="Toolkit"
        title="Things I reach for"
        lead="Grouped by what they're for rather than by logo — everything here has shipped in something real."
      />

      <div class="reveal" v-reveal>
        <div class="tabs" role="tablist">
          <button
            v-for="group in stack"
            :key="group.key"
            type="button"
            role="tab"
            :aria-selected="activeKey === group.key"
            :class="{ 'is-active': activeKey === group.key }"
            @click="activeKey = group.key"
          >
            {{ group.label }}
          </button>
        </div>

        <TransitionGroup tag="div" class="stack-grid" name="fade">
          <div v-for="item in activeGroup.items" :key="`${activeKey}-${item}`" class="stack-item">
            <i />
            <span>{{ item }}</span>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>
