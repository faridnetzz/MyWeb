<script setup lang="ts">
/**
 * Mini SWard dashboard. Everything here is synthetic — tenants, cameras,
 * events, and counters are generated in the browser. It illustrates how the
 * product behaves, not what any client's deployment looks like.
 *
 * The point it makes is multi-tenancy: switching tenant swaps the cameras,
 * the enabled analytics modules, and the event stream, with nothing shared.
 */
type ModuleKey = 'fr' | 'anpr' | 'ppe' | 'fire' | 'crowd'
type Scene = 'walk' | 'floor' | 'gate' | 'crowd' | 'smoke'
type Tone = 'ok' | 'warn' | 'alert' | 'info'

interface Cam {
  id: string
  name: string
  scene: Scene
}
interface Tenant {
  key: string
  label: string
  site: string
  streams: [number, number]
  gpuBase: number
  eventsBase: number
  modules: ModuleKey[]
  cams: Cam[]
}
interface Evt {
  id: number
  time: string
  module: ModuleKey
  text: string
  cam: string
  conf: number
  tone: Tone
}

const MODULE_LABEL: Record<ModuleKey, string> = {
  fr: 'FR',
  anpr: 'ANPR',
  ppe: 'PPE',
  fire: 'Fire',
  crowd: 'Crowd'
}
const ALL_MODULES = Object.keys(MODULE_LABEL) as ModuleKey[]

/** which camera scenes can plausibly raise which module's events */
const SCENE_MODULES: Record<Scene, ModuleKey[]> = {
  walk: ['fr'],
  floor: ['ppe', 'fr'],
  gate: ['anpr'],
  crowd: ['crowd'],
  smoke: ['fire']
}

const tenants: Tenant[] = [
  {
    key: 'plant',
    label: 'Plant A',
    site: 'Manufacturing site',
    streams: [12, 12],
    gpuBase: 62,
    eventsBase: 1284,
    modules: ['ppe', 'fire', 'fr', 'crowd'],
    cams: [
      { id: 'CAM-01', name: 'Assembly', scene: 'floor' },
      { id: 'CAM-02', name: 'Warehouse', scene: 'smoke' },
      { id: 'CAM-03', name: 'Entrance', scene: 'walk' },
      { id: 'CAM-04', name: 'Canteen', scene: 'crowd' }
    ]
  },
  {
    key: 'city',
    label: 'City B',
    site: 'Smart city · 40 junctions',
    streams: [39, 40],
    gpuBase: 78,
    eventsBase: 8412,
    modules: ['anpr', 'fr', 'crowd'],
    cams: [
      { id: 'CAM-11', name: 'Junction 4', scene: 'gate' },
      { id: 'CAM-12', name: 'Plaza', scene: 'crowd' },
      { id: 'CAM-17', name: 'Sidewalk', scene: 'walk' },
      { id: 'CAM-23', name: 'Toll gate', scene: 'gate' }
    ]
  },
  {
    key: 'mall',
    label: 'Mall C',
    site: 'Retail · 3 floors',
    streams: [16, 16],
    gpuBase: 48,
    eventsBase: 2037,
    modules: ['fr', 'crowd', 'fire'],
    cams: [
      { id: 'CAM-31', name: 'Lobby', scene: 'crowd' },
      { id: 'CAM-32', name: 'Main door', scene: 'walk' },
      { id: 'CAM-35', name: 'Storage', scene: 'smoke' },
      { id: 'CAM-38', name: 'Atrium', scene: 'crowd' }
    ]
  }
]

const rand = (min: number, max: number) => min + Math.random() * (max - min)
const pick = <T,>(items: readonly T[]): T => items[Math.floor(Math.random() * items.length)]
const clamp = (n: number) => Math.round(Math.min(94, Math.max(30, n)))

const LETTERS = 'ABCDEFGHJKLMNPRSTUVWXYZ'.split('')
// always masked — a complete plate could coincide with a real vehicle
const plate = () => `${pick(['B', 'D', 'F', 'T', 'Z'])} •••• ${pick(LETTERS)}${pick(LETTERS)}`

const GENERATORS: Record<ModuleKey, () => { text: string; tone: Tone }> = {
  fr: () => {
    const r = Math.random()
    if (r < 0.18) return { text: `Watchlist match · #0${Math.floor(rand(100, 999))}`, tone: 'alert' }
    if (r < 0.55) return { text: 'Unknown face', tone: 'warn' }
    return { text: `Staff verified · #${Math.floor(rand(2000, 2999))}`, tone: 'ok' }
  },
  anpr: () =>
    Math.random() < 0.15
      ? { text: `Blocklisted plate ${plate()}`, tone: 'alert' }
      : { text: `Plate read ${plate()}`, tone: 'ok' },
  ppe: () => {
    const r = Math.random()
    if (r < 0.45) return { text: 'No helmet', tone: 'alert' }
    if (r < 0.8) return { text: 'No safety vest', tone: 'warn' }
    return { text: 'PPE compliant', tone: 'ok' }
  },
  fire: () =>
    Math.random() < 0.25 ? { text: 'Smoke confirmed', tone: 'alert' } : { text: 'Smoke suspected', tone: 'warn' },
  crowd: () => {
    const n = Math.floor(rand(18, 64))
    return n > 50 ? { text: `Occupancy ${n} · over limit`, tone: 'warn' } : { text: `Occupancy ${n}`, tone: 'info' }
  }
}

const timeFmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Jakarta',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
})

let seq = 0
const makeEvent = (t: Tenant, secondsAgo = 0): Evt => {
  const module = pick(t.modules)
  const able = t.cams.filter((c) => SCENE_MODULES[c.scene].includes(module))
  const { text, tone } = GENERATORS[module]()
  return {
    id: ++seq,
    time: timeFmt.format(new Date(Date.now() - secondsAgo * 1000)),
    module,
    text,
    cam: (able.length ? pick(able) : pick(t.cams)).id,
    conf: rand(0.8, 0.98),
    tone
  }
}

const active = ref(tenants[0].key)
const tenant = computed(() => tenants.find((t) => t.key === active.value) ?? tenants[0])

const events = ref<Evt[]>([])
const eventsToday = ref(0)
const gpu = ref<number[]>([])
const clock = useClock('Asia/Jakarta')

const gpuNow = computed(() => gpu.value.at(-1) ?? tenant.value.gpuBase)
const spark = computed(() => {
  const pts = gpu.value
  if (pts.length < 2) return ''
  return pts.map((v, i) => `${((i / (pts.length - 1)) * 60).toFixed(1)},${(20 - ((v - 30) / 64) * 20).toFixed(1)}`).join(' ')
})

const reset = () => {
  const t = tenant.value
  events.value = [4, 11, 19, 32, 47].map((ago) => makeEvent(t, ago))
  eventsToday.value = t.eventsBase
  gpu.value = Array.from({ length: 24 }, () => clamp(t.gpuBase + rand(-6, 6)))
}

let eventTimer: ReturnType<typeof setTimeout> | undefined
let gpuTimer: ReturnType<typeof setInterval> | undefined

const scheduleEvent = () => {
  eventTimer = setTimeout(() => {
    events.value = [makeEvent(tenant.value), ...events.value].slice(0, 6)
    eventsToday.value++
    scheduleEvent()
  }, rand(1700, 3300))
}

onMounted(() => {
  reset()
  scheduleEvent()
  gpuTimer = setInterval(() => {
    const base = tenant.value.gpuBase
    const last = gpu.value.at(-1) ?? base
    // random walk, pulled back toward the tenant's baseline
    const next = clamp(last + rand(-5, 5) + (base - last) * 0.15)
    gpu.value = [...gpu.value.slice(1), next]
  }, 1000)
})

onBeforeUnmount(() => {
  clearTimeout(eventTimer)
  clearInterval(gpuTimer)
})

watch(active, reset)
</script>

<template>
  <figure class="sw-demo">
    <div class="sw">
      <div class="sw-top">
        <div class="sw-brand">
          <img src="/projects/sward-mark.webp" alt="" width="25" height="22" />
          <span>SWard</span>
        </div>

        <div class="sw-tenants" role="tablist" aria-label="Tenant">
          <button
            v-for="t in tenants"
            :key="t.key"
            type="button"
            role="tab"
            :aria-selected="active === t.key"
            :class="{ 'is-active': active === t.key }"
            @click="active = t.key"
          >
            {{ t.label }}
          </button>
        </div>

        <div class="sw-live">
          <i />
          LIVE
          <span>{{ clock || '--:--:--' }} WIB</span>
        </div>
      </div>

      <div class="sw-kpis">
        <div class="sw-kpi">
          <small>Streams</small>
          <b>{{ tenant.streams[0] }}<span>/{{ tenant.streams[1] }}</span></b>
        </div>
        <div class="sw-kpi">
          <small>GPU</small>
          <b>{{ gpuNow }}<span>%</span></b>
          <svg class="sw-spark" viewBox="0 0 60 20" preserveAspectRatio="none" aria-hidden="true">
            <polyline :points="spark" />
          </svg>
        </div>
        <div class="sw-kpi">
          <small>Events today</small>
          <b>{{ eventsToday.toLocaleString('en-US') }}</b>
        </div>
        <div class="sw-kpi">
          <small>Modules</small>
          <b>{{ tenant.modules.length }}<span>/{{ ALL_MODULES.length }}</span></b>
        </div>
      </div>

      <div class="sw-main">
        <div class="sw-cams">
          <SwardCamera
            v-for="(cam, i) in tenant.cams"
            :key="`${tenant.key}-${cam.id}`"
            :cam="cam"
            :modules="tenant.modules"
            :seed="i"
          />
        </div>

        <div class="sw-feed">
          <div class="sw-feed-head">
            <span>Events</span>
            <small>{{ tenant.site }}</small>
          </div>
          <TransitionGroup tag="ul" name="sw-evt" class="sw-events">
            <li v-for="e in events" :key="e.id" class="sw-evt" :class="`is-${e.tone}`">
              <span class="sw-badge">{{ MODULE_LABEL[e.module] }}</span>
              <div>
                <p>{{ e.text }}</p>
                <small>{{ e.cam }} · {{ e.time }} · {{ e.conf.toFixed(2) }}</small>
              </div>
            </li>
          </TransitionGroup>
        </div>
      </div>

      <div class="sw-modules">
        <small>Enabled for {{ tenant.label }}</small>
        <span
          v-for="m in ALL_MODULES"
          :key="m"
          class="sw-mod"
          :class="{ 'is-on': tenant.modules.includes(m) }"
        >
          {{ MODULE_LABEL[m] }}
        </span>
      </div>
    </div>

    <figcaption>
      Interactive illustration with synthetic data — not client footage, UI, or records. Switch tenants to
      see each one isolated to its own cameras, modules, and events.
    </figcaption>
  </figure>
</template>

<style>
/* Lives here rather than in main.css: this component is lazy-loaded, so its
   styles ship in the same chunk and only when the SWard modal opens. */

.sw-demo {
  --sw-ok: var(--accent);
  --sw-warn: #fbbf24;
  --sw-alert: #f87171;
  --sw-info: #60a5fa;
  --sw-brand: linear-gradient(90deg, #2f5be0, #8b2fc9, #e0187a, #f5462f, #ff8a1a, #ffc61a);
  margin: 0 0 24px;
}
:root[data-theme='light'] .sw-demo {
  --sw-warn: #b45309;
  --sw-alert: #dc2626;
  --sw-info: #2563eb;
}
.sw-demo figcaption {
  margin-top: 10px;
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--text-faint);
}

.sw {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-strong);
  border-radius: var(--r-md);
  background: var(--bg-inset);
}
.sw::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 2px;
  background: var(--sw-brand);
}

/* top bar */
.sw-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
  padding: 14px 16px 12px;
  border-bottom: 1px solid var(--border);
}
.sw-brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-size: 0.98rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.sw-brand img { width: 25px; height: auto; }
.sw-tenants {
  display: flex;
  gap: 3px;
  padding: 3px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-card);
}
.sw-tenants button {
  padding: 5px 12px;
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-dim);
  transition: color 0.2s var(--ease), background-color 0.2s var(--ease), box-shadow 0.2s var(--ease);
}
.sw-tenants button:hover { color: var(--text); }
.sw-tenants button.is-active {
  color: var(--text);
  background: var(--bg-elev);
  box-shadow: inset 0 0 0 1px var(--border-strong);
}
.sw-live {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: var(--sw-alert);
}
.sw-live i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
  animation: sw-rec 1.2s steps(2, start) infinite;
}
.sw-live span { letter-spacing: 0; color: var(--text-faint); font-variant-numeric: tabular-nums; }

/* KPIs */
.sw-kpis {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-bottom: 1px solid var(--border);
}
.sw-kpi {
  position: relative;
  padding: 12px 16px;
  border-right: 1px solid var(--border);
}
.sw-kpi:last-child { border-right: none; }
.sw-kpi small {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.64rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-faint);
}
.sw-kpi b {
  display: block;
  margin-top: 3px;
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}
.sw-kpi b span {
  margin-left: 1px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-faint);
}
.sw-spark {
  position: absolute;
  right: 14px;
  bottom: 14px;
  width: 60px;
  height: 20px;
}
.sw-spark polyline {
  fill: none;
  stroke: var(--sw-ok);
  stroke-width: 1.4;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}

/* cameras + event feed */
.sw-main {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
}
.sw-cams {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  padding: 12px;
  border-right: 1px solid var(--border);
}
.sw-feed { display: flex; flex-direction: column; min-width: 0; }
.sw-feed-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 14px 8px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
}
.sw-feed-head small {
  overflow: hidden;
  font-size: 0.7rem;
  letter-spacing: 0;
  text-overflow: ellipsis;
  text-transform: none;
  white-space: nowrap;
  color: var(--text-faint);
}
.sw-events {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 10px 10px;
}
.sw-evt {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-left: 2px solid var(--tone);
  border-radius: var(--r-xs);
  background: var(--bg-card);
}
.sw-evt.is-ok { --tone: var(--sw-ok); }
.sw-evt.is-warn { --tone: var(--sw-warn); }
.sw-evt.is-alert { --tone: var(--sw-alert); }
.sw-evt.is-info { --tone: var(--sw-info); }
.sw-badge {
  flex: none;
  min-width: 44px;
  padding: 2px 6px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--tone) 14%, transparent);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-align: center;
  color: var(--tone);
}
.sw-evt p { margin: 0; font-size: 0.8rem; line-height: 1.35; color: var(--text); }
.sw-evt small {
  display: block;
  margin-top: 2px;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  font-variant-numeric: tabular-nums;
  color: var(--text-faint);
}
.sw-evt-enter-active { transition: opacity 0.35s var(--ease-out), transform 0.35s var(--ease-out); }
.sw-evt-enter-from { opacity: 0; transform: translateY(-8px); }
.sw-evt-leave-active { position: absolute; left: 10px; right: 10px; transition: opacity 0.2s var(--ease); }
.sw-evt-leave-to { opacity: 0; }
.sw-evt-move { transition: transform 0.35s var(--ease-out); }

/* modules */
.sw-modules {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-top: 1px solid var(--border);
}
.sw-modules small {
  margin-right: 6px;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
}
.sw-mod {
  padding: 3px 9px;
  border: 1px dashed var(--border-strong);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--text-faint);
  text-decoration: line-through;
  opacity: 0.6;
}
.sw-mod.is-on {
  border-style: solid;
  border-color: var(--accent-line);
  background: var(--accent-soft);
  color: var(--accent);
  text-decoration: none;
  opacity: 1;
}

@keyframes sw-rec { to { visibility: hidden; } }

@media (max-width: 900px) {
  .sw-main { grid-template-columns: 1fr; }
  .sw-cams { border-right: none; border-bottom: 1px solid var(--border); }
  .sw-events .sw-evt:nth-child(n + 5) { display: none; }
}

@media (max-width: 560px) {
  .sw-top { padding: 12px; }
  .sw-tenants { order: 3; flex: 1 1 100%; }
  .sw-tenants button { flex: 1; }
  .sw-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .sw-kpi { padding: 10px 12px; }
  .sw-kpi:nth-child(2) { border-right: none; }
  .sw-kpi:nth-child(-n + 2) { border-bottom: 1px solid var(--border); }
  .sw-cams { gap: 6px; padding: 8px; }
}
</style>
