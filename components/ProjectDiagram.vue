<script setup lang="ts">
import { resolveTranslatable, type Locale, type Translatable } from '~/utils/i18n'

/**
 * Architecture diagrams drawn from the project descriptions — no screenshots,
 * so nothing here exposes client footage, faces, or plate numbers.
 *
 * Geometry is shared: four nodes on one row, optional dashed group around a
 * span of them. Colours come from the theme tokens, so both themes work.
 */
type Node = { title: string; sub: string }
type Diagram = {
  nodes: [Node, Node, Node, Node]
  group?: { label: string; from: number; to: number }
  caption: string
}

const props = defineProps<{ name: string }>()
const { locale } = useI18n()

const diagrams: Record<string, Translatable<Diagram>> = {
  sward: {
    nodes: [
      { title: { en: 'CAMERAS', id: 'KAMERA' }, sub: { en: 'RTSP · multi-site', id: 'RTSP · multilokasi' } },
      { title: 'DEEPSTREAM', sub: 'decode · batch' },
      { title: { en: 'ANALYTICS', id: 'ANALITIK' }, sub: { en: 'FR · ANPR · PPE', id: 'FR · ANPR · APD' } },
      { title: 'DASHBOARD', sub: { en: 'scoped per tenant', id: 'dipisah per tenant' } }
    ],
    group: { label: { en: 'SINGLE GPU NODE', id: 'SATU NODE GPU' }, from: 1, to: 2 },
    caption: {
      en: 'Streams are added and removed at runtime; each tenant sees only its own sites and events.',
      id: 'Stream ditambah dan dihapus saat runtime; setiap tenant hanya melihat lokasi dan event miliknya sendiri.'
    }
  },
  seribuwajah: {
    nodes: [
      { title: { en: 'CITY CCTV', id: 'CCTV KOTA' }, sub: { en: 'public CCTV feeds', id: 'feed CCTV publik' } },
      { title: { en: 'DETECT', id: 'DETEKSI' }, sub: { en: 'low-light tuned', id: 'tuning low-light' } },
      { title: 'EMBED + MATCH', sub: { en: 'against watchlist', id: 'dengan watchlist' } },
      { title: 'OPERATOR', sub: { en: 'alert + review', id: 'alert + tinjau' } }
    ],
    caption: {
      en: 'Cameras, angles, and bandwidth were all pre-existing constraints — the tuning happened downstream.',
      id: 'Kamera, sudut, dan bandwidth sudah menjadi batasan sejak awal — tuning-nya dilakukan di tahap berikutnya.'
    }
  }
}

const NODE_W = 150
const NODE_Y = 70
const NODE_H = 64
const xs = [16, 200, 384, 568]

const diagram = computed(() => {
  const source = diagrams[props.name]
  return source && resolveTranslatable<Diagram>(source, locale.value as Locale)
})

const group = computed(() => {
  const g = diagram.value?.group
  if (!g) return null
  const left = xs[g.from] - 10
  return { ...g, x: left, w: xs[g.to] + NODE_W + 10 - left }
})

// gaps between the node boxes, where the connecting arrows sit
const arrows = computed(() => xs.slice(0, 3).map((x, i) => ({ from: x + NODE_W + 4, to: xs[i + 1] - 4 })))
</script>

<template>
  <figure v-if="diagram" class="pdiagram">
    <svg viewBox="0 0 734 196" role="img" :aria-label="$t('project.diagramLabel', { steps: diagram.nodes.map((n) => n.title).join(' → ') })">
      <g v-if="group">
        <rect
          :x="group.x"
          y="44"
          :width="group.w"
          height="116"
          rx="12"
          class="pd-group"
        />
        <text :x="group.x + 12" y="36" class="pd-group-label">{{ group.label }}</text>
      </g>

      <g v-for="(arrow, i) in arrows" :key="i">
        <line :x1="arrow.from" y1="102" :x2="arrow.to - 7" y2="102" class="pd-line" />
        <path :d="`M${arrow.to - 8} 97 L${arrow.to} 102 L${arrow.to - 8} 107 Z`" class="pd-head" />
      </g>

      <g v-for="(node, i) in diagram.nodes" :key="node.title">
        <rect :x="xs[i]" :y="NODE_Y" :width="NODE_W" :height="NODE_H" rx="10" class="pd-box" />
        <text :x="xs[i] + 16" :y="NODE_Y + 27" class="pd-title">{{ node.title }}</text>
        <text :x="xs[i] + 16" :y="NODE_Y + 46" class="pd-sub">{{ node.sub }}</text>
      </g>
    </svg>
    <figcaption>{{ diagram.caption }}</figcaption>
  </figure>
</template>
