# Portfolio — Ahmad Farid Muharram

Situs portofolio personal. Nuxt 3, dark-first dengan light mode opsional, satu halaman utama plus halaman arsip project.

## Menjalankan

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # SSR build → .output
npm run generate     # static site → .output/public
npm run preview
```

Butuh Node 18 ke atas.

## Struktur

```
app.vue                       NuxtLayout + NuxtPage
layouts/default.vue           header, main, footer, widget global
pages/
  index.vue                   halaman utama, merangkai section
  projects/index.vue          arsip project dengan filter kategori
components/
  SiteHeader.vue              sticky nav + scroll-spy, theme toggle, drawer mobile
  SiteFooter.vue              sitemap ringkas, jam lokal Jakarta
  CommandPalette.vue          Cmd/Ctrl+K untuk section, project, dan action
  HeroSection.vue             availability badge, typewriter role, kartu status
  ProjectsSection.vue         project unggulan + modal detail
  ProjectCard.vue             kartu project, seluruh permukaan clickable
  ProjectModal.vue            metrics, highlights, stack per project
  ProjectVisual.vue           band visual kartu: cover, logo, atau pola fallback
  ProjectDiagram.vue          diagram arsitektur SVG
  sward/Demo.vue              mini dashboard SWard, data sintetis, lazy-loaded
  sward/Camera.vue            feed kamera sintetis per scene
  sward/Person.vue            siluet orang untuk feed kamera
  ExperienceSection.vue       timeline accordion
  StackSection.vue            tech stack bertab
  AboutSection.vue            narasi dan quick facts
  ServicesSection.vue         bidang pekerjaan
  CertificationsSection.vue   kredensial
  ContactSection.vue          info kontak dan form
  MarqueeStrip.vue            ticker tech stack
  StatsStrip.vue              angka ringkas
  SectionHead.vue             nomor, eyebrow, judul, lead
  ScrollProgress.vue          progress bar
  BackToTop.vue               tombol kembali ke atas
  AppIcon.vue                 set ikon stroke 24×24
composables/
  usePortfolio.ts             seluruh konten situs
  useTheme.ts                 dark/light, persist di localStorage
  useScrollSpy.ts             nav link aktif mengikuti posisi scroll
  useClock.ts                 jam Asia/Jakarta
  useCommandPalette.ts        state buka/tutup palette
plugins/reveal.ts             directive v-reveal
assets/css/tokens.css         design token dan reset
assets/css/main.css           style komponen
```

## Konvensi

- Seluruh teks, project, pengalaman, dan skill berada di `composables/usePortfolio.ts`. Tidak ada komponen yang menulis konten secara hardcode.
- Warna, font, radius, dan spacing berada di `assets/css/tokens.css`. Mengganti `--accent` sudah cukup untuk reskin; light mode ikut menyesuaikan.
- Section baru: buat komponen, gunakan `<SectionHead>`, daftarkan di `pages/index.vue`, lalu tambahkan entri `navItems` agar muncul di navigasi dan command palette.
- Animasi masuk: tambahkan `class="reveal" v-reveal` pada elemen. Nilai opsional berupa delay dalam milidetik, misal `v-reveal="120"` untuk stagger.

## Catatan implementasi

- Tema dipasang lewat inline script di `<head>` sebelum paint, sehingga tidak ada flash saat reload.
- `v-reveal` bersifat universal: no-op di server, `IntersectionObserver` di client. Class `reveal` ditulis langsung di template agar state tersembunyi sudah ada di HTML hasil SSR.
- State reveal memakai atribut `data-in`, bukan class. Elemen yang juga memiliki binding `:class` akan kehilangan class yang ditambahkan secara imperatif, karena Vue menulis ulang `el.className` setiap kali melakukan patch.
- `prefers-reduced-motion` dihormati: animasi dimatikan dan konten langsung tampil.
- Tanpa JavaScript, `<noscript>` memaksa seluruh elemen `.reveal` tetap terlihat.
- Mobile: tidak ada horizontal overflow pada 320/390/768px, tap target 44px pada `pointer: coarse`, ukuran input 16px agar iOS tidak melakukan auto-zoom, safe-area inset untuk perangkat bernotch, dan drawer yang bisa di-scroll pada layar pendek.

## Deployment

Static hosting cukup:

```bash
npm run generate
# unggah isi .output/public
```

Contoh konfigurasi nginx untuk hasil prerender:

```nginx
location / {
    try_files $uri $uri/index.html $uri.html =404;
    add_header Cache-Control "no-cache";
}
location /_nuxt/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
error_page 404 /404.html;
```

## Belum lengkap

Ditandai `TODO` di kode:

1. URL LinkedIn dan nomor WhatsApp pada `composables/usePortfolio.ts`.
2. `public/cv-ahmad-farid-muharram.pdf` — tombol Download CV belum punya berkas tujuan.
3. `public/og.png` (1200×630) untuk preview pada social media.
4. `siteUrl` pada `nuxt.config.ts`.
5. Form kontak masih membuka aplikasi email lewat `mailto`. Ganti `submit()` pada `ContactSection.vue` dengan POST ke endpoint bila pesan perlu tersimpan.

## Lisensi

Kode bebas dipakai sebagai referensi. Konten, teks, dan data project adalah milik pribadi.
