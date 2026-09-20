<script setup lang="ts">
const { experience } = usePortfolio()

// most recent role starts expanded
const openIndex = ref<number | null>(0)
const toggle = (i: number) => (openIndex.value = openIndex.value === i ? null : i)

// height has to be measured, so the collapse runs from JS hooks rather than CSS classes
const onEnter = (el: Element) => {
  const node = el as HTMLElement
  node.style.height = '0px'
  void node.offsetHeight
  node.style.height = `${node.scrollHeight}px`
}
const onAfterEnter = (el: Element) => ((el as HTMLElement).style.height = 'auto')
const onLeave = (el: Element) => {
  const node = el as HTMLElement
  node.style.height = `${node.scrollHeight}px`
  void node.offsetHeight
  node.style.height = '0px'
}
</script>

<template>
  <section id="experience" class="section">
    <div class="wrap">
      <SectionHead
        num="04"
        eyebrow="Career"
        title="From splicing fiber to leading R&amp;D"
        lead="Ten years of moving up the stack — cables, then networks, then code, then the team that writes it."
      />

      <div class="timeline">
        <div
          v-for="(job, i) in experience"
          :key="job.role + job.date"
          class="tl-item reveal"
          :class="{ 'is-open': openIndex === i }"
          v-reveal="i * 60"
        >
          <button
            class="tl-trigger"
            type="button"
            :aria-expanded="openIndex === i"
            :aria-controls="`job-${i}`"
            @click="toggle(i)"
          >
            <span class="tl-date">
              {{ job.date }}
              <span class="tl-type">{{ job.type }}</span>
            </span>
            <span class="tl-main">
              <span class="tl-role">{{ job.role }}</span>
              <span class="tl-company">{{ job.company }}</span>
            </span>
            <span class="tl-chevron"><AppIcon name="chevron-down" /></span>
          </button>

          <Transition name="collapse" @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave">
            <div v-show="openIndex === i" :id="`job-${i}`" class="tl-panel">
              <div class="tl-panel-inner">
                <ul>
                  <li v-for="point in job.points" :key="point">{{ point }}</li>
                </ul>
                <div class="tl-stack">
                  <span v-for="tech in job.stack" :key="tech" class="tag">{{ tech }}</span>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>
