<script setup lang="ts">
import type { Project } from '~/composables/usePortfolio'

const props = defineProps<{ project: Project | null }>()
const emit = defineEmits<{ close: [] }>()
const localePath = useLocalePath()

const dialog = ref<HTMLElement | null>(null)

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.project,
  async (project) => {
    if (!import.meta.client) return

    document.body.style.overflow = project ? 'hidden' : ''

    if (project) {
      window.addEventListener('keydown', onKeydown)
      await nextTick()
      dialog.value?.focus()
    } else {
      window.removeEventListener('keydown', onKeydown)
    }
  }
)

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="project" class="modal-backdrop" @click.self="emit('close')">
        <Transition name="pop" appear>
          <div
            ref="dialog"
            class="modal"
            :class="{ 'is-wide': project.demo || project.gallery }"
            role="dialog"
            aria-modal="true"
            :aria-label="project.name"
            tabindex="-1"
          >
            <div class="modal-head">
              <div>
                <h3>{{ project.name }}</h3>
                <div class="modal-meta">
                  <span class="tag tag-accent">{{ project.role }}</span>
                  <span class="tag">{{ project.client }}</span>
                  <span class="tag">{{ project.year }}</span>
                  <span class="tag">{{ $t(`project.status.${project.status}`) }}</span>
                </div>
              </div>
              <button class="icon-btn" type="button" :aria-label="$t('project.close')" @click="emit('close')">
                <AppIcon name="close" />
              </button>
            </div>

            <div class="modal-body">
              <!-- the first visual a project has leads; the others follow the metrics -->
              <ProjectGallery v-if="project.gallery" :items="project.gallery" />
              <LazySwardDemo v-else-if="project.demo" />
              <ProjectDiagram v-else-if="project.diagram" :name="project.diagram" />

              <p>{{ project.description }}</p>

              <template v-if="project.metrics.length">
                <div class="modal-label">{{ $t('project.atAGlance') }}</div>
                <div class="modal-metrics">
                  <div v-for="m in project.metrics" :key="m.label" class="modal-metric">
                    <b>{{ m.value }}</b>
                    <span>{{ m.label }}</span>
                  </div>
                </div>
              </template>

              <template v-if="project.gallery && project.demo">
                <div class="modal-label">{{ $t('project.interactiveDemo') }}</div>
                <LazySwardDemo />
              </template>

              <template v-if="project.diagram && (project.gallery || project.demo)">
                <div class="modal-label">{{ $t('project.architecture') }}</div>
                <ProjectDiagram :name="project.diagram" />
              </template>

              <div class="modal-label">{{ $t('project.whatIDid') }}</div>
              <ul class="modal-points">
                <li v-for="point in project.highlights" :key="point">{{ point }}</li>
              </ul>

              <div class="modal-label">{{ $t('project.stackScope') }}</div>
              <div class="pcard-tags">
                <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>

            <div class="modal-foot">
              <button class="btn btn-ghost btn-sm" type="button" @click="emit('close')">
                {{ $t('project.close') }}
              </button>
              <a v-if="project.url" class="btn btn-ghost btn-sm" :href="project.url" target="_blank" rel="noopener">
                <AppIcon name="external" />
                {{ $t('project.visitSite') }}
              </a>
              <NuxtLink class="btn btn-primary btn-sm" :to="localePath('/#contact')" @click="emit('close')">
                <AppIcon name="mail" />
                {{ $t('project.ask') }}
              </NuxtLink>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
