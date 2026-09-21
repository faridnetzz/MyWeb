<script setup lang="ts">
/**
 * One synthetic camera feed. Every scene is drawn, not captured: silhouettes
 * instead of people, masked plates, no real locations.
 *
 * Motion is plain CSS keyframes. Durations and delays go through --dur and
 * --delay so the reduced-motion rule can freeze each element mid-cycle
 * instead of snapping it to its last (often off-screen) keyframe.
 */
type Scene = 'walk' | 'floor' | 'gate' | 'crowd' | 'smoke'
type Tone = 'ok' | 'warn' | 'alert' | 'info'

const props = defineProps<{
  cam: { id: string; name: string; scene: Scene }
  modules: string[]
  seed: number
}>()

const on = (m: string) => props.modules.includes(m)
const uid = `swc${Math.random().toString(36).slice(2, 9)}`

// cameras sharing a scene should not move in lockstep
const anim = (dur: number, delay = 0) => ({ '--dur': `${dur}s`, '--delay': `${-(delay + props.seed * 1.9)}s` })

const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ'
const pick = (s: string) => s[Math.floor(Math.random() * s.length)]
const plate = `${pick('BDFTZ')} •••• ${pick(letters)}${pick(letters)}`

const fps = Math.random() < 0.7 ? 25 : 15

const PRIMARY: Record<Scene, [string, string]> = {
  walk: ['fr', 'FR'],
  floor: ['ppe', 'PPE'],
  gate: ['anpr', 'ANPR'],
  crowd: ['crowd', 'CROWD'],
  smoke: ['fire', 'FIRE']
}
const moduleTag = computed(() => {
  const [key, label] = PRIMARY[props.cam.scene]
  return on(key) ? label : 'DETECT'
})

const walkers = computed(() => {
  const fr = on('fr')
  const t = (tone: Tone): Tone => (fr ? tone : 'info')
  return [
    { y: 76, s: 1.0, dir: 'to-right', dur: 13, delay: 0, label: fr ? 'ID #0142' : 'PERSON', tone: t('alert') },
    { y: 63, s: 0.78, dir: 'to-left', dur: 17, delay: 6, label: fr ? 'STAFF #2210' : 'PERSON', tone: t('ok') },
    { y: 85, s: 1.14, dir: 'to-right', dur: 11, delay: 8.5, label: fr ? 'UNKNOWN' : 'PERSON', tone: t('warn') }
  ]
})

const workers = computed(() => {
  const ppe = on('ppe')
  const t = (tone: Tone): Tone => (ppe ? tone : 'info')
  return [
    { x: 44, y: 77, s: 1.08, helmet: true, vest: true, label: ppe ? 'PPE OK' : 'PERSON', tone: t('ok'), dur: 7, delay: 0 },
    { x: 92, y: 70, s: 0.92, helmet: false, vest: true, label: ppe ? 'NO HELMET' : 'PERSON', tone: t('alert'), dur: 9, delay: 2 },
    { x: 130, y: 83, s: 1.16, helmet: true, vest: false, label: ppe ? 'NO VEST' : 'PERSON', tone: t('warn'), dur: 8, delay: 4 }
  ]
})

// fixed positions, sorted back-to-front so nearer figures overlap farther ones
const crowd = [
  [30, 48], [62, 47], [96, 49], [128, 48], [18, 56], [48, 58], [80, 55], [112, 57], [142, 56],
  [36, 67], [70, 66], [104, 68], [138, 69], [24, 79], [58, 80], [92, 78], [124, 81]
].map(([x, y]) => ({ x, y, s: 0.32 + ((y - 44) / 44) * 0.55 }))

const count = ref(crowd.length + 6)
let countTimer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  if (props.cam.scene !== 'crowd') return
  countTimer = setInterval(() => {
    count.value = Math.max(12, Math.min(58, count.value + Math.round(Math.random() * 4 - 2)))
  }, 2400)
})
onBeforeUnmount(() => clearInterval(countTimer))
</script>

<template>
  <div class="cam">
    <svg class="cam-svg" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient :id="`${uid}-smoke`">
          <stop offset="0" stop-color="#cbd5e1" stop-opacity="0.55" />
          <stop offset="1" stop-color="#cbd5e1" stop-opacity="0" />
        </radialGradient>
        <radialGradient :id="`${uid}-heat`">
          <stop offset="0" stop-color="#f87171" stop-opacity="0.5" />
          <stop offset="0.55" stop-color="#fbbf24" stop-opacity="0.16" />
          <stop offset="1" stop-color="#fbbf24" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- walk: sidewalk in front of a building, face recognition on heads -->
      <template v-if="cam.scene === 'walk'">
        <rect width="160" height="46" class="c-wall" />
        <rect x="14" y="10" width="22" height="30" class="c-window" />
        <rect x="46" y="10" width="22" height="30" class="c-window" />
        <rect x="96" y="14" width="18" height="32" class="c-door" />
        <rect x="124" y="10" width="22" height="30" class="c-window" />
        <polygon points="0,46 160,46 160,90 0,90" class="c-floor" />
        <line x1="0" y1="57" x2="160" y2="57" class="c-line" />
        <g v-for="(p, i) in walkers" :key="i" class="sw-walk" :class="p.dir" :style="anim(p.dur, p.delay)">
          <g :transform="`translate(0 ${p.y}) scale(${p.s})`">
            <SwardPerson :box="on('fr') ? 'head' : 'body'" :label="p.label" :tone="p.tone" />
          </g>
        </g>
      </template>

      <!-- floor: shop floor, PPE compliance per worker -->
      <template v-else-if="cam.scene === 'floor'">
        <rect width="160" height="42" class="c-wall" />
        <polygon points="0,42 160,42 160,90 0,90" class="c-floor" />
        <rect x="8" y="20" width="34" height="27" rx="2" class="c-machine" />
        <rect x="12" y="24" width="13" height="8" class="c-screen" />
        <rect x="114" y="16" width="38" height="31" rx="2" class="c-machine" />
        <rect x="48" y="42" width="60" height="5" rx="1" class="c-machine" />
        <line x1="0" y1="62" x2="160" y2="62" class="c-hazard" />
        <g v-for="(w, i) in workers" :key="i" class="sw-sway" :style="anim(w.dur, w.delay)">
          <g :transform="`translate(${w.x} ${w.y}) scale(${w.s})`">
            <SwardPerson :helmet="w.helmet" :vest="w.vest" box="body" :label="w.label" :tone="w.tone" />
          </g>
        </g>
      </template>

      <!-- gate: vehicle approaching, plate locked once it is close enough -->
      <template v-else-if="cam.scene === 'gate'">
        <rect width="160" height="38" class="c-sky" />
        <polygon points="0,38 58,38 0,90" class="c-floor" />
        <polygon points="102,38 160,38 160,90" class="c-floor" />
        <polygon points="58,38 102,38 160,90 0,90" class="c-road" />
        <line x1="80" y1="40" x2="80" y2="90" class="c-lane" />
        <rect x="126" y="28" width="18" height="24" rx="1.5" class="c-machine" />
        <line x1="126" y1="50" x2="104" y2="50" class="c-barrier" />
        <g class="sw-approach" :style="anim(6.5)">
          <rect x="-19" y="-5" width="7" height="5" rx="1" class="car-wheel" />
          <rect x="12" y="-5" width="7" height="5" rx="1" class="car-wheel" />
          <path d="M-20 -5 Q-20 -17 -15 -18 L15 -18 Q20 -17 20 -5 Z" class="car-body" />
          <path d="M-14 -18 L-10 -28 L10 -28 L14 -18 Z" class="car-body" />
          <path d="M-12 -19 L-8.6 -26.4 L8.6 -26.4 L12 -19 Z" class="car-glass" />
          <rect x="-18" y="-15" width="7" height="3" rx="1" class="car-light" />
          <rect x="11" y="-15" width="7" height="3" rx="1" class="car-light" />
          <rect x="-6.5" y="-11" width="13" height="4.5" rx="0.6" class="car-plate" />
          <g class="sw-lock" :style="anim(6.5)">
            <rect x="-22" y="-31" width="44" height="32" rx="1" class="b-box b-info" />
            <text x="-22" y="-32.8" class="b-label t-info">{{ on('anpr') ? 'CAR 0.97' : 'VEHICLE' }}</text>
            <template v-if="on('anpr')">
              <rect x="-8.5" y="-12.8" width="17" height="8" rx="0.8" class="b-box b-ok" />
              <text x="-11" y="7.5" class="b-label t-ok">{{ plate }}</text>
            </template>
          </g>
        </g>
      </template>

      <!-- crowd: occupancy inside a monitored zone -->
      <template v-else-if="cam.scene === 'crowd'">
        <rect width="160" height="38" class="c-wall" />
        <polygon points="0,38 160,38 160,90 0,90" class="c-floor" />
        <line x1="80" y1="38" x2="-30" y2="90" class="c-line" />
        <line x1="80" y1="38" x2="190" y2="90" class="c-line" />
        <line x1="0" y1="60" x2="160" y2="60" class="c-line" />
        <template v-if="on('crowd')">
          <ellipse cx="86" cy="64" rx="48" ry="18" :fill="`url(#${uid}-heat)`" class="sw-pulse" :style="anim(3.2)" />
          <polygon points="12,42 148,42 158,88 2,88" class="b-zone" />
        </template>
        <g v-for="(p, i) in crowd" :key="i" class="sw-bob" :style="anim(2.2 + (i % 4) * 0.45, i * 0.37)">
          <g :transform="`translate(${p.x} ${p.y}) scale(${p.s})`">
            <SwardPerson />
          </g>
        </g>
        <g v-if="on('crowd')">
          <rect x="104" y="13" width="50" height="13" rx="2" class="hud-chip" />
          <text x="108.5" y="22" class="hud-text">COUNT {{ count }}</text>
        </g>
      </template>

      <!-- smoke: storage racks, plume detected before it spreads -->
      <template v-else-if="cam.scene === 'smoke'">
        <rect width="160" height="90" class="c-wall" />
        <polygon points="0,56 160,56 160,90 0,90" class="c-floor" />
        <g v-for="x in [8, 116]" :key="x">
          <rect :x="x" y="14" width="36" height="44" class="c-rack" />
          <line :x1="x" y1="28" :x2="x + 36" y2="28" class="c-line" />
          <line :x1="x" y1="43" :x2="x + 36" y2="43" class="c-line" />
          <rect :x="x + 4" y="19" width="10" height="9" class="c-box" />
          <rect :x="x + 18" y="34" width="12" height="9" class="c-box" />
          <rect :x="x + 6" y="48" width="14" height="10" class="c-box" />
        </g>
        <g
          v-for="i in 5"
          :key="i"
          class="sw-rise"
          :style="{ ...anim(5, i * 1.05), transformOrigin: '86px 64px' }"
        >
          <circle cx="86" cy="64" r="10" :fill="`url(#${uid}-smoke)`" />
        </g>
        <g v-if="on('fire')" class="sw-blink" :style="anim(1.4)">
          <rect x="62" y="22" width="48" height="46" rx="1" class="b-box b-warn" />
          <text x="62" y="20" class="b-label t-warn">SMOKE 0.83</text>
        </g>
      </template>
    </svg>

    <div class="cam-hud">
      <span>{{ cam.id }} · {{ cam.name }}</span>
      <span class="cam-live"><i />LIVE</span>
    </div>
    <div class="cam-foot">
      <span>{{ fps }} fps</span>
      <span class="cam-mod" :class="{ 'is-off': moduleTag === 'DETECT' }">{{ moduleTag }}</span>
    </div>
  </div>
</template>

<style>
/* Feeds stay dark in both themes — video is dark regardless of the UI around
   it — so every colour below is fixed rather than a theme token. */

.cam {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  isolation: isolate;
  border-radius: 6px;
  background: linear-gradient(180deg, #1b2332, #0a0e15);
}
/* scanlines + vignette */
.cam::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.028) 0 1px, transparent 1px 3px),
    radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.45));
}
.cam-svg { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
.cam-hud,
.cam-foot {
  position: absolute;
  left: 6px;
  right: 6px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  gap: 6px;
  pointer-events: none;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.82);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}
.cam-hud { top: 5px; }
.cam-foot { bottom: 5px; color: rgba(255, 255, 255, 0.6); }
.cam-live { display: inline-flex; align-items: center; gap: 4px; color: #f87171; }
.cam-live i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  animation: sw-rec 1.2s steps(2, start) infinite;
}
.cam-mod { padding: 0 5px; border-radius: 3px; background: rgba(74, 222, 128, 0.18); color: #4ade80; }
.cam-mod.is-off { background: rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.6); }

/* scene paint */
.c-wall { fill: #1a2130; }
.c-sky { fill: #182033; }
.c-floor { fill: #121823; }
.c-road { fill: #0f141c; }
.c-window { fill: #222c3d; stroke: #2b3649; stroke-width: 0.6; }
.c-door { fill: #0e131b; stroke: #2b3649; stroke-width: 0.6; }
.c-line { fill: none; stroke: rgba(255, 255, 255, 0.07); stroke-width: 0.6; }
.c-lane { stroke: rgba(255, 255, 255, 0.25); stroke-width: 0.8; stroke-dasharray: 4 4; }
.c-hazard { stroke: rgba(250, 204, 21, 0.45); stroke-width: 1.2; stroke-dasharray: 5 3; }
.c-machine { fill: #232d3e; stroke: #2f3b50; stroke-width: 0.6; }
.c-screen { fill: #1d4ed8; opacity: 0.35; }
.c-barrier { stroke: #f87171; stroke-width: 1.6; stroke-linecap: round; }
.c-rack { fill: none; stroke: #2f3b50; stroke-width: 0.8; }
.c-box { fill: #2a3345; }
.p-sil { fill: #465163; }
.p-head { fill: #56627a; }
.p-vest { fill: #fb923c; }
.p-helmet { fill: #facc15; }
.car-body { fill: #4a5568; }
.car-glass { fill: #1e2736; }
.car-wheel { fill: #0b0e13; }
.car-light { fill: #fde68a; opacity: 0.85; }
.car-plate { fill: #e5e7eb; }

.b-box { fill: none; stroke-width: 0.9; }
.b-ok { stroke: #4ade80; }
.b-warn { stroke: #fbbf24; }
.b-alert { stroke: #f87171; }
.b-info { stroke: #60a5fa; stroke-dasharray: 2 1.5; }
.b-label {
  font-family: var(--font-mono);
  font-size: 5.2px;
  font-weight: 600;
  paint-order: stroke;
  stroke: rgba(0, 0, 0, 0.65);
  stroke-width: 1.4px;
}
.t-ok { fill: #4ade80; }
.t-warn { fill: #fbbf24; }
.t-alert { fill: #f87171; }
.t-info { fill: #60a5fa; }
.b-zone { fill: none; stroke: rgba(96, 165, 250, 0.55); stroke-width: 0.7; stroke-dasharray: 3 2; }
.hud-chip { fill: rgba(0, 0, 0, 0.55); stroke: rgba(248, 113, 113, 0.6); stroke-width: 0.6; }
.hud-text { font-family: var(--font-mono); font-size: 6px; font-weight: 600; fill: #fca5a5; }

/* motion — --dur / --delay are set per element in the template */
.sw-walk,
.sw-sway,
.sw-bob,
.sw-approach,
.sw-lock,
.sw-rise,
.sw-pulse,
.sw-blink {
  animation-duration: var(--dur, 4s);
  animation-delay: var(--delay, 0s);
  animation-iteration-count: infinite;
}
.sw-walk.to-right { animation-name: sw-right; animation-timing-function: linear; }
.sw-walk.to-left { animation-name: sw-left; animation-timing-function: linear; }
.sw-sway { animation-name: sw-sway; animation-timing-function: ease-in-out; animation-direction: alternate; }
.sw-bob { animation-name: sw-bob; animation-timing-function: ease-in-out; }
.sw-approach { animation-name: sw-approach; animation-timing-function: cubic-bezier(0.45, 0, 0.85, 0.55); }
.sw-lock { animation-name: sw-lock; animation-timing-function: linear; }
.sw-rise { animation-name: sw-rise; animation-timing-function: ease-out; }
.sw-pulse { animation-name: sw-pulse; animation-timing-function: ease-in-out; }
.sw-blink { animation-name: sw-blink; animation-timing-function: steps(2, jump-none); }

@keyframes sw-right { from { transform: translateX(-26px); } to { transform: translateX(186px); } }
@keyframes sw-left { from { transform: translateX(186px); } to { transform: translateX(-26px); } }
@keyframes sw-sway { from { transform: translateX(-5px); } to { transform: translateX(5px); } }
@keyframes sw-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-0.8px); } }
@keyframes sw-approach {
  0% { transform: translate(80px, 40px) scale(0.3); opacity: 0; }
  8% { opacity: 1; }
  72% { transform: translate(80px, 77px) scale(1.18); opacity: 1; }
  86%, 100% { transform: translate(80px, 94px) scale(1.5); opacity: 0; }
}
@keyframes sw-lock { 0%, 32% { opacity: 0; } 38%, 78% { opacity: 1; } 86%, 100% { opacity: 0; } }
@keyframes sw-rise {
  0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
  20% { opacity: 0.9; }
  100% { transform: translate(-6px, -40px) scale(1.9); opacity: 0; }
}
@keyframes sw-pulse { 0%, 100% { opacity: 0.65; } 50% { opacity: 1; } }
@keyframes sw-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
@keyframes sw-rec { to { visibility: hidden; } }

/* The global reduced-motion rule collapses every animation to its end state,
   which for these scenes means off-screen or invisible. Freeze each element
   mid-cycle instead, using its own duration and delay. */
@media (prefers-reduced-motion: reduce) {
  .cam [style*='--dur'] {
    animation-duration: var(--dur) !important;
    animation-iteration-count: infinite !important;
    animation-play-state: paused !important;
  }
}

@media (max-width: 560px) {
  /* in-frame labels are unreadable at this size; the boxes still carry it */
  .cam .b-label,
  .cam .hud-chip,
  .cam .hud-text { display: none; }
  .cam-hud,
  .cam-foot { font-size: 0.54rem; }
}
</style>
