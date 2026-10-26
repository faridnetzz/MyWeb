/**
 * Single source of truth for every piece of copy on the site.
 * No component hardcodes content; edit it here.
 *
 * Text that differs per language is written as `{ en: '…', id: '…' }`; plain
 * strings (names, tech terms) are shared. Interface labels such as buttons
 * and section headings live in i18n/locales instead.
 */
import { resolveTranslatable, type Locale, type Translatable } from '~/utils/i18n'

export type Social = {
  label: string
  handle: string
  href: string
  icon: 'github' | 'linkedin' | 'mail' | 'whatsapp' | 'instagram'
}

/** Keys, not labels: the labels live in i18n/locales under project.status / project.category. */
export type ProjectStatus = 'production' | 'ongoing' | 'delivered' | 'rnd'
export type ProjectCategory = 'platform' | 'government' | 'smartCity' | 'commercial' | 'mobile'

export type Project = {
  slug: string
  name: string
  client: string
  role: string
  year: string
  status: ProjectStatus
  featured: boolean
  category: ProjectCategory
  summary: string
  description: string
  highlights: string[]
  metrics: { value: string; label: string }[]
  tags: string[]
  /** filename in public/projects/; omitted projects fall back to a pattern */
  cover?: string
  /** built-in architecture diagram shown in the modal */
  diagram?: 'sward' | 'seribuwajah'
  /** transparent logo in public/projects/, shown on the card when there is no cover */
  logo?: string
  /** interactive mock dashboard rendered at the top of the modal */
  demo?: 'sward'
}

export type Experience = {
  date: string
  role: string
  company: string
  type: string
  points: string[]
  stack: string[]
}

type Portfolio = {
  profile: {
    name: string
    initials: string
    title: string
    /** cycled by the typewriter in the hero */
    roles: string[]
    location: string
    timezone: string
    email: string
    whatsapp: string
    available: boolean
    availabilityNote: string
    resumeUrl: string
    tagline: string
    summary: string
  }
  socials: Social[]
  navItems: { id: string; label: string; num: string }[]
  stats: { num: string; label: string; note: string }[]
  about: { paragraphs: string[]; facts: { k: string; v: string }[] }
  services: { icon: string; title: string; desc: string; scope: string[] }[]
  projects: Project[]
  experience: Experience[]
  stack: { key: string; label: string; items: string[] }[]
  certifications: { name: string; issuer: string; period: string; note: string }[]
  /** ticker under the hero */
  marquee: string[]
}

const EMAIL = 'ahmad@faridmuharram.dev'
const WHATSAPP = '+6281234567890' // TODO: real number

const NOW = { en: 'now', id: 'sekarang' }

const content: Translatable<Portfolio> = {
  profile: {
    name: 'Ahmad Farid Muharram',
    initials: 'AFM',
    title: 'AI & Computer Vision Developer',
    roles: [
      'AI & Computer Vision Developer',
      'R&D Supervisor',
      'Edge AI & DeepStream Engineer',
      'Technical Project Manager'
    ],
    location: { en: 'West Java, Indonesia', id: 'Jawa Barat, Indonesia' },
    timezone: 'Asia/Jakarta',
    email: EMAIL,
    whatsapp: WHATSAPP,
    available: true,
    availabilityNote: { en: 'Open for AI / CV & R&D roles', id: 'Terbuka untuk posisi AI / CV & R&D' },
    resumeUrl: '/cv-ahmad-farid-muharram.pdf', // TODO: add the PDF to /public
    tagline: {
      en: 'I build production AI video analytics — from the GPU pipeline to the dashboard the client actually uses.',
      id: 'Saya membangun AI video analytics untuk produksi — dari pipeline GPU sampai dashboard yang benar-benar dipakai klien.'
    },
    summary: {
      en: 'R&D Supervisor architecting multi-tenant AI video analytics platforms (DeepStream/YOLO) for face recognition, ANPR, and real-time detection at scale. I pair hands-on engineering — edge AI, GPU optimisation, custom model training — with team leadership, project management, and direct client engagement.',
      id: 'R&D Supervisor yang merancang platform AI video analytics multi-tenant (DeepStream/YOLO) untuk face recognition, ANPR, dan deteksi real-time berskala besar. Saya memadukan engineering langsung — edge AI, optimasi GPU, training model custom — dengan kepemimpinan tim, manajemen project, dan komunikasi langsung dengan klien.'
    }
  },

  // TODO: fill in the real LinkedIn URL
  socials: [
    { label: 'GitHub', handle: '@faridnetzz', href: 'https://github.com/faridnetzz', icon: 'github' },
    { label: 'LinkedIn', handle: 'Ahmad Farid Muharram', href: 'https://www.linkedin.com/in/', icon: 'linkedin' },
    { label: 'Email', handle: EMAIL, href: `mailto:${EMAIL}`, icon: 'mail' },
    {
      label: 'WhatsApp',
      handle: { en: 'Direct chat', id: 'Chat langsung' },
      href: `https://wa.me/${WHATSAPP.replace(/\D/g, '')}`,
      icon: 'whatsapp'
    }
  ],

  navItems: [
    { id: 'about', label: { en: 'About', id: 'Tentang' }, num: '01' },
    { id: 'services', label: { en: 'Services', id: 'Layanan' }, num: '02' },
    { id: 'work', label: { en: 'Work', id: 'Project' }, num: '03' },
    { id: 'experience', label: { en: 'Experience', id: 'Pengalaman' }, num: '04' },
    { id: 'stack', label: 'Stack', num: '05' },
    { id: 'contact', label: { en: 'Contact', id: 'Kontak' }, num: '06' }
  ],

  stats: [
    {
      num: '2+',
      label: { en: 'Years leading R&D', id: 'Tahun memimpin R&D' },
      note: { en: 'Supervisor level', id: 'Level supervisor' }
    },
    {
      num: '6',
      label: { en: 'Shipped AI modules', id: 'Modul AI di produksi' },
      note: { en: 'FR · ANPR · PPE · Fire', id: 'FR · ANPR · APD · Api' }
    },
    {
      num: { en: 'National', id: 'Nasional' },
      label: { en: 'ETLE deployment scale', id: 'Skala deployment ETLE' },
      note: 'Korlantas Polri'
    },
    {
      num: '24/7',
      label: { en: 'Uptime target per site', id: 'Target uptime per lokasi' },
      note: 'Edge + on-prem GPU'
    }
  ],

  about: {
    paragraphs: [
      {
        en: 'I lead the R&D function at **Office and Security Solution**, where my team designs and ships an AI video analytics platform that runs on real camera infrastructure across Indonesia — police, city government, industrial sites.',
        id: 'Saya memimpin fungsi R&D di **Office and Security Solution**, tempat tim saya merancang dan merilis platform AI video analytics yang berjalan di infrastruktur kamera nyata di seluruh Indonesia — kepolisian, pemerintah kota, hingga kawasan industri.'
      },
      {
        en: 'Most of my work sits at the messy intersection of **model, GPU, and network**: squeezing a detector into a Jetson budget, keeping 40+ RTSP streams alive on one DeepStream pipeline, reconciling what a demo promises with what a site survey allows.',
        id: 'Sebagian besar pekerjaan saya ada di persimpangan yang rumit antara **model, GPU, dan jaringan**: memadatkan detektor agar muat di budget Jetson, menjaga 40+ stream RTSP tetap hidup dalam satu pipeline DeepStream, dan menyelaraskan janji demo dengan kenyataan hasil survei lokasi.'
      },
      {
        en: 'The other half is people and paperwork — scoping with clients, sizing hardware, running procurement, and translating "we want smart CCTV" into something an engineer can actually build.',
        id: 'Separuh lainnya adalah urusan orang dan administrasi — scoping bersama klien, sizing hardware, menjalankan pengadaan, dan menerjemahkan "kami mau CCTV pintar" menjadi sesuatu yang benar-benar bisa dibangun engineer.'
      }
    ],
    facts: [
      { k: { en: 'Now', id: 'Sekarang' }, v: 'R&D Supervisor @ Office and Security Solution' },
      {
        k: { en: 'Focus', id: 'Fokus' },
        v: {
          en: 'DeepStream pipelines, ANPR, face recognition at scale',
          id: 'Pipeline DeepStream, ANPR, face recognition berskala besar'
        }
      },
      {
        k: { en: 'Based in', id: 'Domisili' },
        v: {
          en: 'West Java — working across Jabodetabek and other islands',
          id: 'Jawa Barat — bekerja di Jabodetabek & luar pulau'
        }
      },
      {
        k: { en: 'Learning', id: 'Sedang belajar' },
        v: {
          en: 'Multi-tenant platform architecture, VLM for video search',
          id: 'Arsitektur platform multi-tenant, VLM untuk pencarian video'
        }
      },
      {
        k: { en: 'Off-screen', id: 'Di luar kerja' },
        v: {
          en: 'Networking gear, homelab, and too many CCTV datasheets',
          id: 'Perangkat jaringan, homelab, dan terlalu banyak datasheet CCTV'
        }
      }
    ]
  },

  services: [
    {
      icon: 'cpu',
      title: 'AI Video Analytics',
      desc: {
        en: 'End-to-end detection pipelines on NVIDIA DeepStream — face recognition, ANPR, PPE, fire/smoke, crowd counting — tuned for real camera feeds, not benchmark clips.',
        id: 'Pipeline deteksi end-to-end di NVIDIA DeepStream — face recognition, ANPR, APD, api/asap, penghitungan keramaian — di-tuning untuk feed kamera nyata, bukan klip benchmark.'
      },
      scope: ['DeepStream', 'YOLO', 'TensorRT', 'Multi-stream', 'Re-ID']
    },
    {
      icon: 'layers',
      title: { en: 'Platform & Integration', id: 'Platform & Integrasi' },
      desc: {
        en: 'Multi-tenant dashboards, event APIs, message brokers, and the plumbing that turns raw inference into something operations teams can act on.',
        id: 'Dashboard multi-tenant, event API, message broker, dan semua penghubung yang mengubah hasil inferensi mentah menjadi sesuatu yang bisa ditindaklanjuti tim operasional.'
      },
      scope: ['Python', 'REST API', 'Kafka', 'MySQL', { en: 'Dashboards', id: 'Dashboard' }]
    },
    {
      icon: 'server',
      title: { en: 'Edge & Infrastructure', id: 'Edge & Infrastruktur' },
      desc: {
        en: 'GPU sizing, on-prem and edge deployment, VPN meshes between sites, and camera network design that survives a real install day.',
        id: 'Sizing GPU, deployment on-prem dan edge, VPN mesh antar lokasi, serta desain jaringan kamera yang tetap andal saat hari instalasi sesungguhnya.'
      },
      scope: ['Jetson', 'MikroTik', 'WireGuard', 'TrueNAS', { en: 'Site survey', id: 'Survei lokasi' }]
    },
    {
      icon: 'compass',
      title: { en: 'Technical Leadership', id: 'Kepemimpinan Teknis' },
      desc: {
        en: 'Running R&D roadmaps and annual government projects: scoping, budgeting, vendor coordination, commissioning, and client-facing technical defence.',
        id: 'Menjalankan roadmap R&D dan project tahunan pemerintah: scoping, penganggaran, koordinasi vendor, commissioning, hingga mempertanggungjawabkan solusi teknis di depan klien.'
      },
      scope: [
        { en: 'Project mgmt', id: 'Manajemen project' },
        'INAPROC',
        { en: 'Team mentoring', id: 'Mentoring tim' },
        { en: 'Client demo', id: 'Demo klien' }
      ]
    }
  ],

  projects: [
    {
      slug: 'oss-vision-sward',
      name: 'OSS Vision / SWard',
      client: 'Office and Security Solution',
      role: { en: 'Architect & Lead', id: 'Arsitek & Lead' },
      year: { en: `2024 — ${NOW.en}`, id: `2024 — ${NOW.id}` },
      status: 'production',
      featured: true,
      category: 'platform',
      summary: {
        en: 'Multi-tenant AI video analytics platform on DeepStream/YOLO. Full pipeline from edge capture to dashboard, deployed across Indonesian sites with analytics modules clients mix per deployment.',
        id: 'Platform AI video analytics multi-tenant berbasis DeepStream/YOLO. Pipeline lengkap dari capture di edge sampai dashboard, ter-deploy di berbagai lokasi di Indonesia dengan modul analitik yang bisa dikombinasikan klien per deployment.'
      },
      description: {
        en: 'SWard is the product the rest of my work funnels into: one platform, many tenants, each with their own cameras, analytics modules, and operators. The hard part was never the model — it was making a single GPU box host dozens of streams, keeping tenants isolated, and letting sales promise a module combination that engineering can actually provision.',
        id: 'SWard adalah produk yang menjadi muara seluruh pekerjaan saya: satu platform, banyak tenant, masing-masing dengan kamera, modul analitik, dan operatornya sendiri. Bagian tersulitnya tidak pernah ada di model — melainkan membuat satu mesin GPU menampung puluhan stream, menjaga isolasi antar tenant, dan memastikan kombinasi modul yang dijanjikan tim sales benar-benar bisa disediakan oleh engineering.'
      },
      highlights: [
        {
          en: 'Designed the multi-tenant data model so each client sees only their own sites, cameras, and events',
          id: 'Merancang data model multi-tenant sehingga setiap klien hanya melihat lokasi, kamera, dan event miliknya sendiri'
        },
        {
          en: 'Built the DeepStream pipeline layer: dynamic stream add/remove, per-stream analytics config, GPU batching',
          id: 'Membangun layer pipeline DeepStream: tambah/hapus stream secara dinamis, konfigurasi analitik per stream, GPU batching'
        },
        {
          en: 'Modular analytics — face recognition, ANPR, PPE, fire/smoke, crowd — enabled per tenant without a rebuild',
          id: 'Analitik modular — face recognition, ANPR, APD, api/asap, keramaian — diaktifkan per tenant tanpa rebuild'
        },
        {
          en: 'Hardware sizing playbook so a deployment quote maps to real stream counts and GPU headroom',
          id: 'Playbook sizing hardware agar penawaran deployment sesuai dengan jumlah stream dan kapasitas GPU yang sebenarnya'
        }
      ],
      metrics: [
        { value: '40+', label: { en: 'streams / GPU node', id: 'stream / node GPU' } },
        { value: '6', label: { en: 'analytics modules', id: 'modul analitik' } },
        { value: 'Multi-tenant', label: { en: 'architecture', id: 'arsitektur' } }
      ],
      tags: ['DeepStream', 'YOLO', 'TensorRT', 'Multi-tenant', 'Edge AI', 'Face Recognition', 'ANPR'],
      diagram: 'sward',
      logo: 'sward-logo.webp',
      demo: 'sward'
    },
    {
      slug: 'etle-korlantas',
      name: 'ETLE Korlantas Polri',
      client: 'Korps Lalu Lintas Polri',
      role: 'Annual Project Manager',
      year: { en: `2024 — ${NOW.en}`, id: `2024 — ${NOW.id}` },
      status: 'ongoing',
      featured: true,
      category: 'government',
      summary: {
        en: 'Electronic Traffic Law Enforcement camera deployment for the National Traffic Police. Site surveys, installation, integration, and commissioning across multiple provinces.',
        id: 'Deployment kamera Electronic Traffic Law Enforcement untuk Korlantas Polri. Survei lokasi, instalasi, integrasi, dan commissioning di berbagai provinsi.'
      },
      description: {
        en: 'A national ETLE rollout is 20% computer vision and 80% logistics. I run the annual project: surveying intersections, specifying camera and compute per point, coordinating installation crews, and taking the system through integration and commissioning with Korlantas.',
        id: 'Rollout ETLE nasional itu 20% computer vision dan 80% logistik. Saya menjalankan project tahunannya: menyurvei persimpangan, menentukan spesifikasi kamera dan compute per titik, mengoordinasikan tim instalasi, serta membawa sistem melalui integrasi dan commissioning bersama Korlantas.'
      },
      highlights: [
        {
          en: 'Annual project manager — scope, schedule, budget, and technical risk across multiple sites',
          id: 'Project manager tahunan — scope, jadwal, anggaran, dan risiko teknis di banyak lokasi'
        },
        {
          en: 'Site surveys translating intersection geometry into camera placement, lens choice, and plate-read angles',
          id: 'Survei lokasi yang menerjemahkan geometri persimpangan menjadi penempatan kamera, pilihan lensa, dan sudut baca plat nomor'
        },
        {
          en: 'ANPR tuning against Indonesian plate variants, night conditions, and motorbike-heavy traffic',
          id: 'Tuning ANPR untuk variasi plat nomor Indonesia, kondisi malam hari, dan lalu lintas yang didominasi sepeda motor'
        },
        {
          en: "Integration and commissioning with the client's existing enforcement back-office",
          id: 'Integrasi dan commissioning dengan back-office penindakan yang sudah dimiliki klien'
        }
      ],
      metrics: [
        { value: { en: 'National', id: 'Nasional' }, label: { en: 'deployment scope', id: 'cakupan deployment' } },
        { value: { en: 'Annual', id: 'Tahunan' }, label: { en: 'project cycle', id: 'siklus project' } },
        { value: { en: 'Multi-site', id: 'Multilokasi' }, label: 'commissioning' }
      ],
      tags: [
        'ANPR',
        'ETLE',
        { en: 'Site survey', id: 'Survei lokasi' },
        { en: 'Integration', id: 'Integrasi' },
        'Commissioning',
        { en: 'Project management', id: 'Manajemen project' }
      ]
    },
    {
      slug: 'sigap-seribu-wajah',
      name: 'SIGAP / Seribu Wajah',
      client: 'Diskominfo Bandar Lampung',
      role: 'R&D Lead',
      year: '2024',
      status: 'delivered',
      featured: true,
      category: 'smartCity',
      summary: {
        en: 'Real-time AI CCTV analytics for Bandar Lampung city government — live face recognition and detection running across public camera feeds.',
        id: 'Analitik CCTV berbasis AI secara real-time untuk Pemerintah Kota Bandar Lampung — face recognition dan deteksi langsung pada feed kamera publik.'
      },
      description: {
        en: "A smart-city face recognition deployment on top of the city's existing CCTV network. The constraint was everything: cameras we did not choose, bandwidth we did not control, and a watchlist that had to match under street lighting.",
        id: 'Deployment face recognition smart city di atas jaringan CCTV kota yang sudah ada. Semuanya adalah batasan: kamera yang bukan pilihan kami, bandwidth yang tidak kami kendalikan, dan watchlist yang tetap harus cocok di bawah lampu jalan.'
      },
      highlights: [
        {
          en: 'Face recognition over live city CCTV feeds with watchlist matching and alerting',
          id: 'Face recognition pada feed CCTV kota secara langsung, dengan pencocokan watchlist dan alert'
        },
        {
          en: 'Tuned recognition thresholds for low-light, off-angle, and low-resolution street cameras',
          id: 'Tuning threshold pengenalan untuk kamera jalan yang minim cahaya, bersudut miring, dan beresolusi rendah'
        },
        {
          en: 'Operator-facing dashboard for live alerts and event review',
          id: 'Dashboard operator untuk alert langsung dan peninjauan event'
        },
        {
          en: 'Worked directly with Diskominfo staff on handover and day-to-day operation',
          id: 'Bekerja langsung dengan staf Diskominfo untuk serah terima dan operasional harian'
        }
      ],
      metrics: [
        { value: 'Real-time', label: { en: 'city-wide feeds', id: 'feed se-kota' } },
        { value: 'Live', label: { en: 'watchlist matching', id: 'pencocokan watchlist' } },
        { value: { en: 'Gov', id: 'Pemkot' }, label: { en: 'handover & training', id: 'serah terima & pelatihan' } }
      ],
      tags: [
        'Face Recognition',
        'Real-time',
        'Smart City',
        { en: 'CCTV Analytics', id: 'Analitik CCTV' },
        'Dashboard'
      ],
      diagram: 'seribuwajah'
    },
    {
      slug: 'gns-industrial-safety',
      name: 'GNS — Safety & Compliance Suite',
      client: 'GNS',
      role: { en: 'Solution Design', id: 'Desain Solusi' },
      year: '2024 — 2025',
      status: 'production',
      featured: true,
      category: 'commercial',
      summary: {
        en: 'Commercial deployment of OSS Vision analytics: fire/smoke detection, face recognition, PPE compliance, and crowd monitoring, with hardware sizing and pricing.',
        id: 'Deployment komersial analitik OSS Vision: deteksi api/asap, face recognition, kepatuhan APD, dan pemantauan keramaian, lengkap dengan sizing hardware dan penawaran harga.'
      },
      description: {
        en: 'An industrial client wanted four different analytics on one camera estate. I designed the solution end to end — which module runs where, what GPU it needs, what it costs — then took it through technical presentation and deployment.',
        id: 'Klien industri menginginkan empat analitik berbeda di satu jaringan kamera. Saya merancang solusinya dari awal sampai akhir — modul mana yang berjalan di mana, GPU apa yang dibutuhkan, berapa biayanya — lalu membawanya ke presentasi teknis hingga deployment.'
      },
      highlights: [
        {
          en: 'Fire/smoke detection tuned to reduce false alarms from steam, headlights, and sunlight',
          id: 'Deteksi api/asap yang di-tuning untuk menekan alarm palsu dari uap, lampu kendaraan, dan sinar matahari'
        },
        {
          en: 'PPE compliance checks (helmet, vest) at plant entry and work zones',
          id: 'Pemeriksaan kepatuhan APD (helm, rompi) di pintu masuk pabrik dan area kerja'
        },
        {
          en: 'Crowd monitoring and occupancy counting on shared areas',
          id: 'Pemantauan keramaian dan penghitungan okupansi di area bersama'
        },
        {
          en: 'Hardware sizing and commercial scenarios presented directly to the client',
          id: 'Sizing hardware dan skenario komersial yang dipresentasikan langsung ke klien'
        }
      ],
      metrics: [
        { value: '4', label: { en: 'analytics modules', id: 'modul analitik' } },
        { value: 'On-prem', label: { en: 'GPU deployment', id: 'deployment GPU' } },
        { value: 'End-to-end', label: { en: 'design to delivery', id: 'dari desain sampai delivery' } }
      ],
      tags: [
        { en: 'Fire/Smoke', id: 'Api/Asap' },
        { en: 'PPE Detection', id: 'Deteksi APD' },
        { en: 'Crowd Monitoring', id: 'Pemantauan Keramaian' },
        { en: 'Hardware Sizing', id: 'Sizing Hardware' },
        'Pre-sales'
      ]
    },
    {
      slug: 'brin-emission-monitoring',
      name: { en: 'BRIN Emission Monitoring', id: 'Pemantauan Emisi BRIN' },
      client: 'BRIN',
      role: 'Data Engineering',
      year: '2024',
      status: 'delivered',
      featured: false,
      category: 'government',
      summary: {
        en: 'Carbon and emission monitoring — camera pipelines, sensor ingestion, dashboards, and data engineering for research clients.',
        id: 'Pemantauan karbon dan emisi — pipeline kamera, ingestion data sensor, dashboard, dan data engineering untuk klien riset.'
      },
      description: {
        en: 'A monitoring stack for emission research: pull from cameras and sensors, normalise it, store it, and put it behind dashboards researchers can actually query.',
        id: 'Stack pemantauan untuk riset emisi: ambil data dari kamera dan sensor, normalisasi, simpan, lalu sajikan lewat dashboard yang benar-benar bisa di-query para peneliti.'
      },
      highlights: [
        {
          en: 'Camera and sensor ingestion pipelines with scheduled collection',
          id: 'Pipeline ingestion kamera dan sensor dengan pengambilan data terjadwal'
        },
        {
          en: 'Data normalisation and storage for long-running measurement series',
          id: 'Normalisasi dan penyimpanan data untuk seri pengukuran jangka panjang'
        },
        {
          en: 'Dashboards for monitoring and reporting',
          id: 'Dashboard untuk pemantauan dan pelaporan'
        }
      ],
      metrics: [
        { value: 'IoT', label: { en: 'sensor ingestion', id: 'ingestion sensor' } },
        { value: { en: 'Dashboards', id: 'Dashboard' }, label: { en: 'for researchers', id: 'untuk peneliti' } }
      ],
      tags: [
        { en: 'Camera Pipelines', id: 'Pipeline Kamera' },
        { en: 'Dashboards', id: 'Dashboard' },
        'Data Engineering',
        'IoT'
      ]
    },
    {
      slug: 'siaga-donasi',
      name: 'Siaga Donasi',
      client: 'PT. Airlangga Multi Karya',
      role: 'Android Developer',
      year: '2021',
      status: 'delivered',
      featured: false,
      category: 'mobile',
      summary: {
        en: 'Native Android donation app built in Java, with Xendit payment gateway integration and a REST API backend.',
        id: 'Aplikasi donasi Android native berbasis Java, dengan integrasi payment gateway Xendit dan backend REST API.'
      },
      description: {
        en: 'My first shipped product: a donation platform on Android. Native Java, REST integration, and a real payment gateway — the project that taught me what "done" means when money moves through your code.',
        id: 'Produk pertama yang saya rilis: platform donasi di Android. Java native, integrasi REST, dan payment gateway sungguhan — project yang mengajarkan saya arti "selesai" ketika ada uang yang mengalir lewat kode saya.'
      },
      highlights: [
        {
          en: 'Built the Android client natively in Java',
          id: 'Membangun aplikasi Android secara native dengan Java'
        },
        {
          en: 'Integrated the Xendit payment gateway end to end',
          id: 'Mengintegrasikan payment gateway Xendit secara end-to-end'
        },
        {
          en: 'Consumed and helped shape the REST API',
          id: 'Mengonsumsi dan ikut membentuk REST API'
        },
        {
          en: 'Handled debugging and Play Store release preparation',
          id: 'Menangani debugging dan persiapan rilis ke Play Store'
        }
      ],
      metrics: [
        { value: 'Native', label: 'Android / Java' },
        { value: 'Xendit', label: 'payment gateway' }
      ],
      tags: ['Java', 'Android', 'REST API', 'Xendit', 'Mobile']
    }
  ],

  experience: [
    {
      date: { en: 'May 2024 — Now', id: 'Mei 2024 — Sekarang' },
      role: 'Supervisor Research & Development',
      company: 'Office and Security Solution, Jakarta',
      type: { en: 'Full-time', id: 'Penuh waktu' },
      points: [
        {
          en: 'Annual Project Manager for the ETLE Korlantas Polri national deployment',
          id: 'Annual Project Manager untuk deployment nasional ETLE Korlantas Polri'
        },
        {
          en: 'Lead and mentor a cross-functional R&D team — engineers, researchers, annotators',
          id: 'Memimpin dan membimbing tim R&D lintas fungsi — engineer, peneliti, annotator'
        },
        {
          en: 'Architect a multi-tenant AI video analytics platform on DeepStream/YOLO',
          id: 'Merancang arsitektur platform AI video analytics multi-tenant berbasis DeepStream/YOLO'
        },
        {
          en: 'Manage GPU, hardware, and budget resources against timelines and technical risk',
          id: 'Mengelola sumber daya GPU, hardware, dan anggaran terhadap timeline dan risiko teknis'
        },
        {
          en: 'Report to senior management and lead client technical presentations and Q&A',
          id: 'Melapor ke manajemen senior serta memimpin presentasi teknis dan sesi tanya jawab dengan klien'
        }
      ],
      stack: ['DeepStream', 'YOLO', 'TensorRT', 'Python', 'GPU', { en: 'Project management', id: 'Manajemen project' }]
    },
    {
      date: 'Nov 2023 — Apr 2024',
      role: 'IT Engineer',
      company: 'Graha Karya Informasi',
      type: { en: 'Full-time', id: 'Penuh waktu' },
      points: [
        {
          en: 'Staged and deployed applications for the Jasamarga SMT4 project',
          id: 'Staging dan deployment aplikasi untuk project Jasamarga SMT4'
        },
        {
          en: 'Backup IT support at Prudential Tower',
          id: 'Backup IT support di Prudential Tower'
        },
        {
          en: 'Data collection and backup for Pertamina EP',
          id: 'Pengumpulan dan backup data untuk Pertamina EP'
        }
      ],
      stack: ['Deployment', 'Windows Server', 'Backup', 'Support']
    },
    {
      date: 'Mar 2022 — Mar 2023',
      role: 'IT Support Staff',
      company: 'Fajar Gelora Inti',
      type: { en: 'Full-time', id: 'Penuh waktu' },
      points: [
        {
          en: 'Daily checks and troubleshooting across hardware, software, networks, CCTV, and telephony',
          id: 'Pengecekan harian dan troubleshooting hardware, software, jaringan, CCTV, dan telepon'
        },
        {
          en: 'Configured MikroTik routers and TrueNAS cloud servers',
          id: 'Konfigurasi router MikroTik dan cloud server TrueNAS'
        },
        {
          en: 'Managed IT asset inventory and reporting, plus data and OS backups',
          id: 'Mengelola inventaris dan pelaporan aset IT, serta backup data dan OS'
        }
      ],
      stack: ['MikroTik', 'TrueNAS', 'CCTV', 'Networking']
    },
    {
      date: 'Apr 2021 — Jul 2021',
      role: 'Software Developer',
      company: 'PT. Airlangga Multi Karya',
      type: { en: 'Contract', id: 'Kontrak' },
      points: [
        {
          en: 'Built the Siaga Donasi Android app natively in Java',
          id: 'Membangun aplikasi Android Siaga Donasi secara native dengan Java'
        },
        {
          en: 'Integrated the Xendit payment gateway and consumed RESTful APIs',
          id: 'Mengintegrasikan payment gateway Xendit dan mengonsumsi RESTful API'
        },
        {
          en: 'Handled app lifecycle, debugging, and Play Store release prep',
          id: 'Menangani lifecycle aplikasi, debugging, dan persiapan rilis Play Store'
        }
      ],
      stack: ['Java', 'Android', 'REST API', 'Xendit']
    },
    {
      date: 'Feb 2016 — Apr 2016',
      role: 'Technical Support',
      company: 'Biznet Networks',
      type: { en: 'Internship', id: 'Magang' },
      points: [
        {
          en: 'Fiber optic splicing and termination',
          id: 'Penyambungan (splicing) dan terminasi fiber optik'
        },
        {
          en: 'Network troubleshooting across cabling and router configurations',
          id: 'Troubleshooting jaringan, mulai dari kabel hingga konfigurasi router'
        }
      ],
      stack: [{ en: 'Fiber optic', id: 'Fiber optik' }, 'Networking', 'Troubleshooting']
    }
  ],

  stack: [
    {
      key: 'ai',
      label: 'AI / Vision',
      items: [
        'NVIDIA DeepStream',
        'YOLO (v5–v11)',
        'TensorRT',
        'OpenCV',
        'PyTorch',
        'Face Recognition',
        'ANPR / OCR',
        { en: 'Model Training', id: 'Training Model' },
        { en: 'Dataset & Annotation', id: 'Dataset & Anotasi' }
      ]
    },
    {
      key: 'eng',
      label: 'Engineering',
      items: ['Python', 'GStreamer', 'PHP & MySQL', 'Java (Android)', 'REST API', 'Kafka', 'Git', 'Docker', 'Linux']
    },
    {
      key: 'infra',
      label: { en: 'Infrastructure', id: 'Infrastruktur' },
      items: [
        'Jetson / Edge GPU',
        'MikroTik',
        'WireGuard VPN',
        'TrueNAS',
        { en: 'Multi-site CCTV', id: 'CCTV Multilokasi' },
        'RTSP / ONVIF',
        'Networking',
        { en: 'On-prem servers', id: 'Server On-prem' }
      ]
    },
    {
      key: 'lead',
      label: { en: 'Leadership', id: 'Kepemimpinan' },
      items: [
        { en: 'Project Management', id: 'Manajemen Project' },
        'R&D Roadmap',
        { en: 'Client Engagement', id: 'Komunikasi Klien' },
        { en: 'Team Mentoring', id: 'Mentoring Tim' },
        { en: 'Procurement (INAPROC)', id: 'Pengadaan (INAPROC)' },
        { en: 'Technical Presentation', id: 'Presentasi Teknis' },
        { en: 'Vendor Coordination', id: 'Koordinasi Vendor' }
      ]
    }
  ],

  certifications: [
    {
      name: 'NVIDIA DeepStream & TensorRT',
      issuer: {
        en: 'Self-directed / applied in production',
        id: 'Belajar mandiri / diterapkan di produksi'
      },
      period: { en: `2024 — ${NOW.en}`, id: `2024 — ${NOW.id}` },
      note: {
        en: 'Multi-stream pipelines, GPU batching, model deployment',
        id: 'Pipeline multi-stream, GPU batching, deployment model'
      }
    },
    {
      name: 'MikroTik Network Fundamentals',
      issuer: { en: 'Applied — Fajar Gelora Inti', id: 'Diterapkan — Fajar Gelora Inti' },
      period: '2022 — 2023',
      note: {
        en: 'Routing, VPN, and multi-site camera networks',
        id: 'Routing, VPN, dan jaringan kamera multilokasi'
      }
    },
    {
      name: 'Fiber Optic Splicing & Termination',
      issuer: 'Biznet Networks',
      period: '2016',
      note: {
        en: 'FTTH installation and troubleshooting',
        id: 'Instalasi dan troubleshooting FTTH'
      }
    }
  ],

  marquee: [
    'DEEPSTREAM',
    'YOLO',
    'TENSORRT',
    'FACE RECOGNITION',
    'ANPR',
    'EDGE AI',
    'PYTHON',
    'GSTREAMER',
    'MULTI-TENANT',
    'JETSON',
    'RTSP',
    'SMART CITY'
  ]
}

/**
 * Every field is a computed ref in the active language. The header, footer,
 * and command palette sit in the layout and are not remounted when the
 * language changes, so plain values would go stale there.
 */
export const usePortfolio = () => {
  const { locale } = useI18n()
  const portfolio = computed(() => resolveTranslatable<Portfolio>(content, locale.value as Locale))
  const pick = <K extends keyof Portfolio>(key: K) => computed(() => portfolio.value[key])

  const projects = pick('projects')

  return {
    profile: pick('profile'),
    socials: pick('socials'),
    navItems: pick('navItems'),
    stats: pick('stats'),
    about: pick('about'),
    services: pick('services'),
    projects,
    featuredProjects: computed(() => projects.value.filter((p) => p.featured)),
    experience: pick('experience'),
    stack: pick('stack'),
    certifications: pick('certifications'),
    marquee: pick('marquee')
  }
}
