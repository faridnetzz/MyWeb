# Portfolio — Ahmad Farid Muharram

Situs portofolio personal. Nuxt 3, dark-first dengan light mode opsional, dua bahasa (English di `/`, Bahasa Indonesia di `/id`), satu halaman utama plus halaman arsip project.

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
app.vue                       NuxtLayout + NuxtPage, head per bahasa, cookie bahasa
layouts/default.vue           header, main, footer, widget global
pages/
  index.vue                   halaman utama, merangkai section
  projects/index.vue          arsip project dengan filter kategori
components/
  SiteHeader.vue              sticky nav + scroll-spy, tombol bahasa, theme toggle, drawer mobile
  LanguageSwitch.vue          tombol EN / ID
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
  usePortfolio.ts             seluruh konten situs, dalam dua bahasa
  useLanguageSwitch.ts        bahasa tujuan dan path-nya untuk tombol dan palette
  usePageSeo.ts               title + description, disalin ke tag OG dan Twitter
  useTheme.ts                 dark/light, persist di localStorage
  useScrollSpy.ts             nav link aktif mengikuti posisi scroll
  useClock.ts                 jam Asia/Jakarta
  useCommandPalette.ts        state buka/tutup palette
plugins/reveal.ts             directive v-reveal
utils/i18n.ts                 daftar bahasa, tipe Translatable, script redirect bahasa
i18n/locales/{en,id}.json     teks antarmuka: tombol, judul section, label form
assets/css/tokens.css         design token dan reset
assets/css/main.css           style komponen
```

## Konvensi

- Seluruh teks, project, pengalaman, dan skill berada di `composables/usePortfolio.ts`. Tidak ada komponen yang menulis konten secara hardcode.
- Teks yang berbeda per bahasa ditulis berdampingan: `{ en: '…', id: '…' }`. String biasa (nama, istilah teknis) dipakai di kedua bahasa. Bahasa yang terlewat menjadi error TypeScript, bukan teks kosong di halaman.
- Teks antarmuka (tombol, judul section, label form) ada di `i18n/locales/en.json` dan `id.json`, dengan key yang sama di kedua file. Di template pakai `$t('key')`, di script `t` dari `useI18n()`. Karakter `@` di pesan harus ditulis `{'@'}`.
- Link internal selalu lewat `localePath('/projects')` atau `localePath('/#work')`, supaya pengunjung tetap di bahasanya.
- Status dan kategori project disimpan sebagai key (`production`, `smartCity`, …); labelnya ada di `project.status` dan `project.category` pada file locale.
- Warna, font, radius, dan spacing berada di `assets/css/tokens.css`. Mengganti `--accent` sudah cukup untuk reskin; light mode ikut menyesuaikan.
- Section baru: buat komponen, gunakan `<SectionHead>`, daftarkan di `pages/index.vue`, lalu tambahkan entri `navItems` agar muncul di navigasi dan command palette.
- Animasi masuk: tambahkan `class="reveal" v-reveal` pada elemen. Nilai opsional berupa delay dalam milidetik, misal `v-reveal="120"` untuk stagger.

## Catatan implementasi

- Tema dipasang lewat inline script di `<head>` sebelum paint, sehingga tidak ada flash saat reload.
- Bahasa: hanya `/` yang bisa redirect, ke bahasa terakhir yang dipakai (cookie `afm-lang`) atau, pada kunjungan pertama, ke bahasa utama browser. Redirect ini juga inline script di `<head>`, karena deteksi bawaan `@nuxtjs/i18n` di situs statis baru jalan setelah hydrate: HTML Inggris ter-hydrate dalam bahasa lain (hydration mismatch) dan sempat tampil sebelum pindah. Link ke halaman lain tidak pernah di-redirect.
- `usePortfolio()` mengembalikan computed ref. Header, footer, dan command palette ada di layout yang tidak di-remount saat ganti bahasa, jadi nilai biasa akan tertinggal di bahasa lama. Di script pakai `.value`; di template otomatis.
- `v-reveal` bersifat universal: no-op di server, `IntersectionObserver` di client. Class `reveal` ditulis langsung di template agar state tersembunyi sudah ada di HTML hasil SSR.
- State reveal memakai atribut `data-in`, bukan class. Elemen yang juga memiliki binding `:class` akan kehilangan class yang ditambahkan secara imperatif, karena Vue menulis ulang `el.className` setiap kali melakukan patch.
- `prefers-reduced-motion` dihormati: animasi dimatikan dan konten langsung tampil.
- Tanpa JavaScript, `<noscript>` memaksa seluruh elemen `.reveal` tetap terlihat.
- Mobile: tidak ada horizontal overflow pada 320/390/768px, tap target 44px pada `pointer: coarse`, ukuran input 16px agar iOS tidak melakukan auto-zoom, safe-area inset untuk perangkat bernotch, dan drawer yang bisa di-scroll pada layar pendek.

## Deployment

Produksi: https://faridmuharram.dev, disajikan container `myweb` (nginx, port 8081) di `server-oss-1` lewat Cloudflare Tunnel `afm-tunnel` (container `myweb-tunnel`). Konfigurasi keduanya ada di `~/apps/myweb` pada server.

```bash
npm run generate
tar -C .output/public -czf - . | ssh serveross1@<host> 'bash ~/apps/myweb/deploy.sh'
```

Static hosting lain juga cukup:

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
4. Form kontak masih membuka aplikasi email lewat `mailto`. Ganti `submit()` pada `ContactSection.vue` dengan POST ke endpoint bila pesan perlu tersimpan.

## Lisensi

Kode bebas dipakai sebagai referensi. Konten, teks, dan data project adalah milik pribadi.
