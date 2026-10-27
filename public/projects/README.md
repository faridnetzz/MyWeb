# Project images

## Cover

Drop a cover image here, then reference it by path from the matching entry
in `composables/usePortfolio.ts`:

```ts
cover: 'sward/cover.webp'
```

16:9, 1200×675 or larger. WebP or PNG. A project with no `cover` falls back to
its `logo`, or to a generated pattern, so leaving it out is fine.

## Gallery

Screenshots shown in the project modal. Each entry needs two files, named after
its `src`:

```ts
gallery: [{ src: 'sward/vms', caption: { en: '…', id: '…' } }]
```

- `sward/vms.webp` — full size, at most 1600px wide; tall full-page captures are fine
- `sward/vms-thumb.webp` — exactly 800×500, cropped from the top of the image

The first entry is shown large and uses the full-size file; every other entry
uses its thumbnail until opened. Keep both files for every entry so the order
can change freely.

## Before anything lands here

No recognisable faces, readable plate numbers, client site names, internal IPs,
or operator credentials. Most of these deployments are under NDA. Check the
whole image, not just the obvious parts: account emails in sidebars, camera
names, and the stream overlay (OSD) text burned into video frames.

Prefer synthetic or anonymised data over redacting a real screenshot — a blur
still shows the layout of a client's system. When a real screenshot is the
point, pixelate the sensitive areas before saving rather than blurring lightly:
a soft blur on short text can be read back.
