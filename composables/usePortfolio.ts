/**
 * Single source of truth for every piece of copy on the site.
 * No component hardcodes content; edit it here.
 */

export type Social = {
  label: string
  handle: string
  href: string
  icon: 'github' | 'linkedin' | 'mail' | 'whatsapp' | 'instagram'
}

export type Project = {
  slug: string
  name: string
  client: string
  role: string
  year: string
  status: 'Production' | 'Ongoing' | 'Delivered' | 'R&D'
  featured: boolean
  category: 'AI Platform' | 'Government' | 'Smart City' | 'Commercial' | 'Mobile'
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

export const usePortfolio = () => {
  const profile = {
    name: 'Ahmad Farid Muharram',
    initials: 'AFM',
    title: 'AI & Computer Vision Developer',
    /** cycled by the typewriter in the hero */
    roles: [
      'AI & Computer Vision Developer',
      'R&D Supervisor',
      'Edge AI & DeepStream Engineer',
      'Technical Project Manager'
    ],
    location: 'Jawa Barat, Indonesia',
    timezone: 'Asia/Jakarta',
    email: 'faridnetzz@gmail.com',
    whatsapp: '+6281234567890', // TODO: real number
    available: true,
    availabilityNote: 'Open for AI / CV & R&D roles',
    resumeUrl: '/cv-ahmad-farid-muharram.pdf', // TODO: add the PDF to /public
    tagline:
      'I build production AI video analytics — from the GPU pipeline to the dashboard the client actually uses.',
    summary:
      'R&D Supervisor architecting multi-tenant AI video analytics platforms (DeepStream/YOLO) for face recognition, ANPR, and real-time detection at scale. I pair hands-on engineering — edge AI, GPU optimisation, custom model training — with team leadership, project management, and direct client engagement.'
  }

  // TODO: fill in the real LinkedIn URL
  const socials: Social[] = [
    { label: 'GitHub', handle: '@faridnetzz', href: 'https://github.com/faridnetzz', icon: 'github' },
    { label: 'LinkedIn', handle: 'Ahmad Farid Muharram', href: 'https://www.linkedin.com/in/', icon: 'linkedin' },
    { label: 'Email', handle: profile.email, href: `mailto:${profile.email}`, icon: 'mail' },
    {
      label: 'WhatsApp',
      handle: 'Chat langsung',
      href: `https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`,
      icon: 'whatsapp'
    }
  ]

  const navItems = [
    { id: 'about', label: 'About', num: '01' },
    { id: 'services', label: 'Services', num: '02' },
    { id: 'work', label: 'Work', num: '03' },
    { id: 'experience', label: 'Experience', num: '04' },
    { id: 'stack', label: 'Stack', num: '05' },
    { id: 'contact', label: 'Contact', num: '06' }
  ]

  const stats = [
    { num: '2+', label: 'Years leading R&D', note: 'Supervisor level' },
    { num: '6', label: 'Shipped AI modules', note: 'FR · ANPR · PPE · Fire' },
    { num: 'National', label: 'ETLE deployment scale', note: 'Korlantas Polri' },
    { num: '24/7', label: 'Uptime target per site', note: 'Edge + on-prem GPU' }
  ]

  const about = {
    paragraphs: [
      'I lead the R&D function at **Office and Security Solution**, where my team designs and ships an AI video analytics platform that runs on real camera infrastructure across Indonesia — police, city government, industrial sites.',
      'Most of my work sits at the messy intersection of **model, GPU, and network**: squeezing a detector into a Jetson budget, keeping 40+ RTSP streams alive on one DeepStream pipeline, reconciling what a demo promises with what a site survey allows.',
      'The other half is people and paperwork — scoping with clients, sizing hardware, running procurement, and translating "we want smart CCTV" into something an engineer can actually build.'
    ],
    facts: [
      { k: 'Now', v: 'R&D Supervisor @ Office and Security Solution' },
      { k: 'Focus', v: 'DeepStream pipelines, ANPR, face recognition at scale' },
      { k: 'Based in', v: 'Jawa Barat — working across Jabodetabek & luar pulau' },
      { k: 'Learning', v: 'Multi-tenant platform architecture, VLM for video search' },
      { k: 'Off-screen', v: 'Networking gear, homelab, and too many CCTV datasheets' }
    ]
  }

  const services = [
    {
      icon: 'cpu',
      title: 'AI Video Analytics',
      desc: 'End-to-end detection pipelines on NVIDIA DeepStream — face recognition, ANPR, PPE, fire/smoke, crowd counting — tuned for real camera feeds, not benchmark clips.',
      scope: ['DeepStream', 'YOLO', 'TensorRT', 'Multi-stream', 'Re-ID']
    },
    {
      icon: 'layers',
      title: 'Platform & Integration',
      desc: 'Multi-tenant dashboards, event APIs, message brokers, and the plumbing that turns raw inference into something operations teams can act on.',
      scope: ['Python', 'REST API', 'Kafka', 'MySQL', 'Dashboards']
    },
    {
      icon: 'server',
      title: 'Edge & Infrastructure',
      desc: 'GPU sizing, on-prem and edge deployment, VPN meshes between sites, and camera network design that survives a real install day.',
      scope: ['Jetson', 'MikroTik', 'WireGuard', 'TrueNAS', 'Site survey']
    },
    {
      icon: 'compass',
      title: 'Technical Leadership',
      desc: 'Running R&D roadmaps and annual government projects: scoping, budgeting, vendor coordination, commissioning, and client-facing technical defence.',
      scope: ['Project mgmt', 'INAPROC', 'Team mentoring', 'Client demo']
    }
  ]

  const projects: Project[] = [
    {
      slug: 'oss-vision-sward',
      name: 'OSS Vision / SWard',
      client: 'Office and Security Solution',
      role: 'Architect & Lead',
      year: '2024 — now',
      status: 'Production',
      featured: true,
      category: 'AI Platform',
      summary:
        'Multi-tenant AI video analytics platform on DeepStream/YOLO. Full pipeline from edge capture to dashboard, deployed across Indonesian sites with analytics modules clients mix per deployment.',
      description:
        'SWard is the product the rest of my work funnels into: one platform, many tenants, each with their own cameras, analytics modules, and operators. The hard part was never the model — it was making a single GPU box host dozens of streams, keeping tenants isolated, and letting sales promise a module combination that engineering can actually provision.',
      highlights: [
        'Designed the multi-tenant data model so each client sees only their own sites, cameras, and events',
        'Built the DeepStream pipeline layer: dynamic stream add/remove, per-stream analytics config, GPU batching',
        'Modular analytics — face recognition, ANPR, PPE, fire/smoke, crowd — enabled per tenant without a rebuild',
        'Hardware sizing playbook so a deployment quote maps to real stream counts and GPU headroom'
      ],
      metrics: [
        { value: '40+', label: 'streams / GPU node' },
        { value: '6', label: 'analytics modules' },
        { value: 'Multi-tenant', label: 'architecture' }
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
      year: '2024 — now',
      status: 'Ongoing',
      featured: true,
      category: 'Government',
      summary:
        'Electronic Traffic Law Enforcement camera deployment for the National Traffic Police. Site surveys, installation, integration, and commissioning across multiple provinces.',
      description:
        'A national ETLE rollout is 20% computer vision and 80% logistics. I run the annual project: surveying intersections, specifying camera and compute per point, coordinating installation crews, and taking the system through integration and commissioning with Korlantas.',
      highlights: [
        'Annual project manager — scope, schedule, budget, and technical risk across multiple sites',
        'Site surveys translating intersection geometry into camera placement, lens choice, and plate-read angles',
        'ANPR tuning against Indonesian plate variants, night conditions, and motorbike-heavy traffic',
        'Integration and commissioning with the client\'s existing enforcement back-office'
      ],
      metrics: [
        { value: 'National', label: 'deployment scope' },
        { value: 'Annual', label: 'project cycle' },
        { value: 'Multi-site', label: 'commissioning' }
      ],
      tags: ['ANPR', 'ETLE', 'Site survey', 'Integration', 'Commissioning', 'Project management']
    },
    {
      slug: 'sigap-seribu-wajah',
      name: 'SIGAP / Seribu Wajah',
      client: 'Diskominfo Bandar Lampung',
      role: 'R&D Lead',
      year: '2024',
      status: 'Delivered',
      featured: true,
      category: 'Smart City',
      summary:
        'Real-time AI CCTV analytics for Bandar Lampung city government — live face recognition and detection running across public camera feeds.',
      description:
        'A smart-city face recognition deployment on top of the city\'s existing CCTV network. The constraint was everything: cameras we did not choose, bandwidth we did not control, and a watchlist that had to match under street lighting.',
      highlights: [
        'Face recognition over live city CCTV feeds with watchlist matching and alerting',
        'Tuned recognition thresholds for low-light, off-angle, and low-resolution street cameras',
        'Operator-facing dashboard for live alerts and event review',
        'Worked directly with Diskominfo staff on handover and day-to-day operation'
      ],
      metrics: [
        { value: 'Real-time', label: 'city-wide feeds' },
        { value: 'Live', label: 'watchlist matching' },
        { value: 'Gov', label: 'handover & training' }
      ],
      tags: ['Face Recognition', 'Real-time', 'Smart City', 'CCTV Analytics', 'Dashboard'],
      diagram: 'seribuwajah'
    },
    {
      slug: 'gns-industrial-safety',
      name: 'GNS — Safety & Compliance Suite',
      client: 'GNS',
      role: 'Solution Design',
      year: '2024 — 2025',
      status: 'Production',
      featured: true,
      category: 'Commercial',
      summary:
        'Commercial deployment of OSS Vision analytics: fire/smoke detection, face recognition, PPE compliance, and crowd monitoring, with hardware sizing and pricing.',
      description:
        'An industrial client wanted four different analytics on one camera estate. I designed the solution end to end — which module runs where, what GPU it needs, what it costs — then took it through technical presentation and deployment.',
      highlights: [
        'Fire/smoke detection tuned to reduce false alarms from steam, headlights, and sunlight',
        'PPE compliance checks (helmet, vest) at plant entry and work zones',
        'Crowd monitoring and occupancy counting on shared areas',
        'Hardware sizing and commercial scenarios presented directly to the client'
      ],
      metrics: [
        { value: '4', label: 'analytics modules' },
        { value: 'On-prem', label: 'GPU deployment' },
        { value: 'End-to-end', label: 'design to delivery' }
      ],
      tags: ['Fire/Smoke', 'PPE Detection', 'Crowd Monitoring', 'Hardware Sizing', 'Pre-sales']
    },
    {
      slug: 'brin-emission-monitoring',
      name: 'BRIN Emission Monitoring',
      client: 'BRIN',
      role: 'Data Engineering',
      year: '2024',
      status: 'Delivered',
      featured: false,
      category: 'Government',
      summary:
        'Carbon and emission monitoring — camera pipelines, sensor ingestion, dashboards, and data engineering for research clients.',
      description:
        'A monitoring stack for emission research: pull from cameras and sensors, normalise it, store it, and put it behind dashboards researchers can actually query.',
      highlights: [
        'Camera and sensor ingestion pipelines with scheduled collection',
        'Data normalisation and storage for long-running measurement series',
        'Dashboards for monitoring and reporting'
      ],
      metrics: [
        { value: 'IoT', label: 'sensor ingestion' },
        { value: 'Dashboards', label: 'for researchers' }
      ],
      tags: ['Camera Pipelines', 'Dashboards', 'Data Engineering', 'IoT']
    },
    {
      slug: 'siaga-donasi',
      name: 'Siaga Donasi',
      client: 'PT. Airlangga Multi Karya',
      role: 'Android Developer',
      year: '2021',
      status: 'Delivered',
      featured: false,
      category: 'Mobile',
      summary:
        'Native Android donation app built in Java, with Xendit payment gateway integration and a REST API backend.',
      description:
        'My first shipped product: a donation platform on Android. Native Java, REST integration, and a real payment gateway — the project that taught me what "done" means when money moves through your code.',
      highlights: [
        'Built the Android client natively in Java',
        'Integrated the Xendit payment gateway end to end',
        'Consumed and helped shape the REST API',
        'Handled debugging and Play Store release preparation'
      ],
      metrics: [
        { value: 'Native', label: 'Android / Java' },
        { value: 'Xendit', label: 'payment gateway' }
      ],
      tags: ['Java', 'Android', 'REST API', 'Xendit', 'Mobile']
    }
  ]

  const experience: Experience[] = [
    {
      date: 'Mei 2024 — Now',
      role: 'Supervisor Research & Development',
      company: 'Office and Security Solution, Jakarta',
      type: 'Full-time',
      points: [
        'Annual Project Manager for the ETLE Korlantas Polri national deployment',
        'Lead and mentor a cross-functional R&D team — engineers, researchers, annotators',
        'Architect a multi-tenant AI video analytics platform on DeepStream/YOLO',
        'Manage GPU, hardware, and budget resources against timelines and technical risk',
        'Report to senior management and lead client technical presentations and Q&A'
      ],
      stack: ['DeepStream', 'YOLO', 'TensorRT', 'Python', 'GPU', 'Project management']
    },
    {
      date: 'Nov 2023 — Apr 2024',
      role: 'IT Engineer',
      company: 'Graha Karya Informasi',
      type: 'Full-time',
      points: [
        'Staged and deployed applications for the Jasamarga SMT4 project',
        'Backup IT support at Prudential Tower',
        'Data collection and backup for Pertamina EP'
      ],
      stack: ['Deployment', 'Windows Server', 'Backup', 'Support']
    },
    {
      date: 'Mar 2022 — Mar 2023',
      role: 'IT Support Staff',
      company: 'Fajar Gelora Inti',
      type: 'Full-time',
      points: [
        'Daily checks and troubleshooting across hardware, software, networks, CCTV, and telephony',
        'Configured MikroTik routers and TrueNAS cloud servers',
        'Managed IT asset inventory and reporting, plus data and OS backups'
      ],
      stack: ['MikroTik', 'TrueNAS', 'CCTV', 'Networking']
    },
    {
      date: 'Apr 2021 — Jul 2021',
      role: 'Software Developer',
      company: 'PT. Airlangga Multi Karya',
      type: 'Contract',
      points: [
        'Built the Siaga Donasi Android app natively in Java',
        'Integrated the Xendit payment gateway and consumed RESTful APIs',
        'Handled app lifecycle, debugging, and Play Store release prep'
      ],
      stack: ['Java', 'Android', 'REST API', 'Xendit']
    },
    {
      date: 'Feb 2016 — Apr 2016',
      role: 'Technical Support',
      company: 'Biznet Networks',
      type: 'Internship',
      points: [
        'Fiber optic splicing and termination',
        'Network troubleshooting across cabling and router configurations'
      ],
      stack: ['Fiber optic', 'Networking', 'Troubleshooting']
    }
  ]

  const stack = [
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
        'Model Training',
        'Dataset & Annotation'
      ]
    },
    {
      key: 'eng',
      label: 'Engineering',
      items: ['Python', 'GStreamer', 'PHP & MySQL', 'Java (Android)', 'REST API', 'Kafka', 'Git', 'Docker', 'Linux']
    },
    {
      key: 'infra',
      label: 'Infrastructure',
      items: [
        'Jetson / Edge GPU',
        'MikroTik',
        'WireGuard VPN',
        'TrueNAS',
        'Multi-site CCTV',
        'RTSP / ONVIF',
        'Networking',
        'On-prem servers'
      ]
    },
    {
      key: 'lead',
      label: 'Leadership',
      items: [
        'Project Management',
        'R&D Roadmap',
        'Client Engagement',
        'Team Mentoring',
        'Procurement (INAPROC)',
        'Technical Presentation',
        'Vendor Coordination'
      ]
    }
  ]

  const certifications = [
    {
      name: 'NVIDIA DeepStream & TensorRT',
      issuer: 'Self-directed / applied in production',
      period: '2024 — now',
      note: 'Multi-stream pipelines, GPU batching, model deployment'
    },
    {
      name: 'MikroTik Network Fundamentals',
      issuer: 'Applied — Fajar Gelora Inti',
      period: '2022 — 2023',
      note: 'Routing, VPN, and multi-site camera networks'
    },
    {
      name: 'Fiber Optic Splicing & Termination',
      issuer: 'Biznet Networks',
      period: '2016',
      note: 'FTTH installation and troubleshooting'
    }
  ]

  /** ticker under the hero */
  const marquee = [
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

  const featuredProjects = projects.filter((p) => p.featured)

  return {
    profile,
    socials,
    navItems,
    stats,
    about,
    services,
    projects,
    featuredProjects,
    experience,
    stack,
    certifications,
    marquee
  }
}
