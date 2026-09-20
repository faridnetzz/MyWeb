# Project covers

Drop a cover image here, then reference it by filename from the matching entry
in `composables/usePortfolio.ts`:

```ts
cover: 'sward-dashboard.webp'
```

Guidelines:

- 16:9, 1200×675 or larger. WebP or PNG.
- No recognisable faces, readable plate numbers, client site names, internal IPs,
  or operator credentials. Most of these deployments are under NDA.
- Prefer synthetic or anonymised data over redacting a real screenshot — a blur
  still shows the layout of a client's system.

A project with no `cover` falls back to a generated pattern, so leaving this
empty is fine.
