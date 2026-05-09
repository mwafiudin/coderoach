/**
 * Placeholder content seed.
 *
 * Run via: npm run seed
 *
 * Idempotent — clears collections and recreates with placeholder data.
 * Requires DATABASE_URI + PAYLOAD_SECRET env vars (loaded via --env-file=.env.local).
 */
import { getPayload } from 'payload';
import config from '../payload.config';

async function seed() {
  const payload = await getPayload({ config });
  console.log('🌱 Seeding placeholder content...\n');

  // Helper: clear and recreate
  async function reset(slug: any, docs: any[]) {
    const existing = await payload.find({ collection: slug, limit: 200, overrideAccess: true });
    for (const d of existing.docs) {
      await payload.delete({ collection: slug, id: d.id, overrideAccess: true });
    }
    const created: any[] = [];
    for (const data of docs) {
      const doc = await payload.create({ collection: slug, data, overrideAccess: true });
      created.push(doc);
    }
    return created;
  }

  // ============ GLOBALS ============

  await payload.updateGlobal({
    slug: 'top-bar',
    data: {
      enabled: true,
      tag: '[ // OPEN UNTUK PROJECT ]',
      message: 'Slot 1–2 engagement baru kuartal ini — mulai dari diskusi 30 menit.',
      link: { label: 'Mulai brief proyek →', href: '#contact' },
    },
  });
  console.log('✓ TopBar');

  await payload.updateGlobal({
    slug: 'hero',
    data: {
      pillText: 'Small studio · Founder-led · Berbasis di Jakarta',
      headline: { lead: 'We build, automate,', accent: 'and ship intelligence.' },
      lede: 'Studio dev kecil yang bantu kamu bikin software, automasi workflow, dan dashboard analitik — mulai dari company website sampai sistem internal yang dipake harian.',
      ctaPrimary: { label: 'Mulai brief proyek', href: '#contact' },
      ctaSecondary: { label: 'Lihat hasil kami', href: '#work' },
      metaItems: [
        { value: '3+', label: 'tahun jalan' },
        { value: '10+', label: 'proyek shipped' },
        { value: 'Remote', label: 'berbasis Jakarta' },
      ],
      trustedBy: {
        label: 'Beberapa yang sudah kami bantu',
        tagline: 'Dari company website sampai dashboard analitik — F&B, marketing agency, dan brand lokal.',
      },
    },
  });
  console.log('✓ Hero');

  // Helper for Lexical paragraphs
  const lexParagraphs = (paragraphs: string[]) => ({
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        textFormat: 0,
        children: [{ mode: 'normal', text, type: 'text', style: '', detail: 0, format: 0, version: 1 }],
      })),
    },
  });

  await payload.updateGlobal({
    slug: 'studio',
    data: {
      sectionMarker: 'Tim di balik Coderoach',
      heading: 'Tim kecil. Output yang serius.',
      lede: 'Coderoach Studio dibangun oleh dua founder — kami sendiri yang scoping, ngoding, dan kirim hasil. Tanpa lapisan agency, tanpa proyek dilempar ke junior. Yang ngomong sama kamu adalah yang ngerjain.',
      stats: [
        { num: '2', label: 'FOUNDERS\nNO JUNIORS' },
        { num: '3', accent: '+ yr', label: 'JALAN\nSEJAK 2022' },
        { num: '10', accent: '+', label: 'PROYEK\nSHIPPED' },
        { num: '100', accent: '%', label: 'REMOTE\nJAKARTA' },
      ],
      about: {
        pageHeading: 'Studio kecil. Kerja serius.',
        pageLede:
          'Kami bukan agency, bukan freelancer biasa. Dua founder yang kerja langsung sama klien — dari brief sampai handoff. Kalau perlu lebih banyak tangan, kami kolaborasi sama jaringan engineer terpercaya.',
        mission:
          'Bantu bisnis dan operator Indonesia bikin software yang bener-bener dipake — bukan demo cantik yang stuck di Figma.',
        story: lexParagraphs([
          'Coderoach Studio dimulai 2022 sebagai partnership dua engineer — Izzul dan Farrez — yang frustrasi sama gimana proyek software dikerjakan di banyak agency lokal. Banyak yang jual jam, banyak klien yang beli jam. Hasilnya: sistem yang reward orang yang spend lebih banyak waktu, bukan yang solve masalahnya.',
          'Kami coba model berbeda: project-scoped, outcome-priced, founder-only. Gak ada hand-off ke junior. Gak ada timesheet babysitting. Dua orang yang ngerti bisa ship lebih banyak — dan ship lebih bagus — daripada sepuluh orang yang sebagian besarnya jadi layer terjemahan.',
          'Beberapa tahun jalan, taruhan ini terbayar. Sederet company website yang diship, internal tools yang earn its place, satu studio product (Laporta) yang sekarang dipake di operasi F&B multi-cabang, dan beberapa data pipeline yang automate kerja yang dulu jam-jaman jadi menit-menitan.',
          'Kami tetap kecil dengan sengaja. Dua founder — Izzul (Product & Frontend) dan Farrez (Backend & Infra). Yang scoping proyek kamu, dan yang ngoding-nya, akan selalu salah satu dari kami berdua.',
        ]),
        workspace: {
          address: 'Remote · Berbasis Jakarta, Indonesia',
          hours: 'Sen–Jum · 09:00–18:00 WIB · async di luar itu',
          tagline: 'Diskusi via Meet atau WhatsApp.',
        },
        timeline: [
          { year: '2022', title: 'Coderoach Studio dimulai', description: 'Dua engineer — Izzul dan Farrez — mulai ambil proyek bareng. Fokus: produk yang ship, bukan deliverable yang stuck.' },
          { year: '2023', title: 'Klien pertama', description: 'Build company website untuk Uruzin, Tumtim Cookies, dan beberapa brand lokal. Operating model project-scoped tervalidasi.' },
          { year: '2024', title: 'Laporta ship', description: 'Studio product pertama. Bridging SPV dan Accounting di operasi F&B multi-cabang — cut 50% budget salary accounting.' },
          { year: '2025', title: 'Masuk ke Intelligence work', description: 'Bangun ads multiplatform dashboard untuk agency digital marketing. Cut 70% manual reporting workload, support 3x campaign growth.' },
          { year: '2026', title: 'Versatile dev studio', description: 'Empat pintu masuk — Build, Automate, Intelligence, Augment — dengan disiplin shipping yang sama.' },
        ],
      },
    },
  });
  console.log('✓ Studio');

  await payload.updateGlobal({
    slug: 'contact',
    data: {
      sectionMarker: 'Mulai proyek',
      heading: { line1: 'Punya sesuatu yang mau dibangun?', line2Accent: 'Yuk ngobrol.' },
      lede: 'Kami ambil sedikit klien baru tiap kuartal supaya tiap proyek dapet attention penuh. Cerita aja apa yang mau kamu kirim ke production — kami baca tiap brief dan balas dalam 48 jam.',
      scopes: [
        { scope: 'Build' },
        { scope: 'Automate' },
        { scope: 'Intelligence' },
        { scope: 'Augment' },
        { scope: 'Belum yakin' },
      ],
      formLabels: {
        email: '[ // EMAIL KAMU ]',
        scope: '[ // JENIS PROYEK ]',
        brief: '[ // APA YANG MAU DIBANGUN? ]',
        submit: 'Kirim brief →',
        emailFallback: 'hello@coderoach.studio',
      },
      successHeading: 'Thanks — brief-nya udah masuk.',
    },
  });
  console.log('✓ Contact');

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Coderoach Studio',
      siteDescription: 'Studio dev kecil dari Jakarta — build, automate, ship intelligence.',
      navStatus: { label: 'OPEN · Q2 2026' },
      navCta: { label: 'Mulai brief →', href: '#contact' },
      footer: {
        tagline: 'Studio dev kecil yang bantu kamu bikin software, automasi workflow, dan dashboard yang beneran kepake. Remote-first, founder-led, berbasis di Jakarta.',
        badge: 'OPEN · Q2 2026',
        columns: [
          {
            heading: 'NAVIGATE',
            links: [
              { label: 'Services', href: '/#services' },
              { label: 'Work', href: '/work' },
              { label: 'Process', href: '/#process' },
              { label: 'Field notes', href: '/notes' },
              { label: 'FAQ', href: '/#faq' },
            ],
          },
          {
            heading: 'STUDIO',
            links: [
              { label: 'About', href: '/studio' },
              { label: 'Field notes', href: '/notes' },
              { label: 'Mulai proyek', href: '/#contact' },
            ],
          },
          {
            heading: 'CONTACT',
            links: [
              { label: 'hello@coderoach.studio', href: 'mailto:hello@coderoach.studio' },
              { label: '+62 813-3602-0915', href: 'https://wa.me/6281336020915' },
              { label: 'Based in Jakarta', href: '#' },
              { label: 'Remote-first', href: '#' },
            ],
          },
        ],
        metaLine: {
          left: '[ © 2026 CODEROACH STUDIO ]',
          right: 'BUILT IN-HOUSE · NEXT.JS 15 · [ // BUILD · AUTOMATE · SHIP // ]',
        },
      },
    },
  });
  console.log('✓ SiteSettings');

  await payload.updateGlobal({
    slug: 'blog-settings',
    data: {
      archiveHero: {
        sectionMarker: '[ FIELD NOTES / 01 ]',
        heading: 'Catatan dari studio.',
        lede: 'Engineering, operating, dan hal-hal di antara keduanya.',
      },
      postsPerPage: 12,
    },
  });
  console.log('✓ BlogSettings');

  // ============ SERVICES ============

  const serviceDocs = await reset('services', [
    {
      order: 1,
      slug: 'build',
      tag: 'BUILD',
      icon: 'build',
      title: 'Build',
      tagline: 'Web, mobile, dan tools yang bener-bener kepake.',
      blurb: 'Mulai dari company website sampai aplikasi internal. Modern stack, arsitektur yang waras, dan dokumentasi yang gak bikin tim selanjutnya pusing.',
      list: [{ item: 'Company website' }, { item: 'Web application' }, { item: 'Mobile app (iOS, Android)' }, { item: 'Internal admin tools' }],
      stack: [{ tech: 'Next.js' }, { tech: 'React Native' }, { tech: 'Postgres' }, { tech: 'TypeScript' }],
      heroLede: 'Kami desain, bangun, dan ship software yang earn its place — bukan demo yang stuck di staging. Dari greenfield product sampai internal tools yang menggantikan spreadsheet.',
      pricingNote: 'Project-scoped, gak per jam. Diskusi dulu untuk dapet quote yang akurat.',
      serviceFAQ: [
        { question: 'Bisa mobile?', answer: 'Bisa — React Native untuk cross-platform, native iOS/Android kalau use case-nya nuntut.' },
        { question: 'Custom design atau template?', answer: 'Selalu custom. Kami bukan toko Figma template.' },
      ],
    },
    {
      order: 2,
      slug: 'automate',
      tag: 'AUTOMATE',
      icon: 'automate',
      title: 'Automate',
      tagline: 'Workflow yang dulu jalan manual, sekarang jalan sendiri.',
      blurb: 'Banyak tim masih copy-paste antar spreadsheet jam 2 pagi. Kami ganti orang itu dengan sistem yang gak butuh tidur — lengkap dengan audit log dan observability.',
      list: [{ item: 'Workflow automation' }, { item: 'API integration & data pipeline' }, { item: 'Reporting automation' }, { item: 'Process digitization' }],
      stack: [{ tech: 'Node.js' }, { tech: 'Python' }, { tech: 'n8n' }, { tech: 'Webhooks' }],
      heroLede: 'Otomasi yang reliable dan observable. Kerjaan ops yang dulu pegel dikerjain manual, sekarang jalan di code dengan audit log yang bisa di-trace.',
      pricingNote: 'Project-scoped per scope automation. Discovery dulu sebelum quote.',
    },
    {
      order: 3,
      slug: 'intelligence',
      tag: 'INTELLIGENCE',
      icon: 'intelligence',
      title: 'Intelligence',
      tagline: 'Data yang ngarah ke keputusan, bukan cuma chart cantik.',
      blurb: 'Bikin dashboard itu gampang. Yang susah bikin data layer yang KPI-nya bener, anomali yang fire on time, dan insight yang berani dipake buat ambil keputusan.',
      list: [{ item: 'Data warehouse & ETL' }, { item: 'Custom analytics dashboard' }, { item: 'Multi-platform ads analytics' }, { item: 'Forecasting & anomaly detection' }],
      stack: [{ tech: 'BigQuery' }, { tech: 'Postgres' }, { tech: 'Looker Studio' }, { tech: 'Airflow' }],
      heroLede: 'Dari API multi-platform sampai dashboard yang dipake harian — kami bangun pipeline-nya, bukan cuma chart-nya.',
      pricingNote: 'Discovery dan scoping dulu. Tiap stack data beda biaya, kami transparan dari awal.',
    },
    {
      order: 4,
      slug: 'augment',
      tag: 'AUGMENT',
      icon: 'augment',
      title: 'Augment',
      tagline: 'Tambah AI ke sistem yang udah jalan.',
      blurb: 'LLM sekarang udah jadi infrastruktur. Kami integrasiin di tempat yang beneran moves the needle — internal search, document processing, agentic workflow.',
      list: [{ item: 'LLM integration & RAG' }, { item: 'Agentic workflow' }, { item: 'AI internal tools' }, { item: 'Document processing' }],
      stack: [{ tech: 'Anthropic' }, { tech: 'OpenAI' }, { tech: 'LangChain' }, { tech: 'pgvector' }],
      heroLede: 'AI yang earn its place — bukan chatbot demo. Kami tambah intelligence ke alur kerja yang udah ada, di tempat yang latensi-nya kebayar dengan hasil.',
      pricingNote: 'Pilot scope dulu, expand setelah ada hasil yang measurable.',
    },
  ]);
  console.log(`✓ Services (${serviceDocs.length})`);

  const serviceMap = Object.fromEntries(serviceDocs.map((s: any) => [s.slug, s.id]));

  // ============ PROJECTS (cases + studio products) ============

  await reset('projects', [
    // Featured studio product — Laporta
    {
      order: 1,
      slug: 'laporta',
      kind: 'studio',
      client: 'Laporta',
      tagline: 'Profit intelligence layer di atas POS, untuk operator F&B Indonesia.',
      meta: 'F&B OPS · STUDIO PRODUCT',
      industry: 'fb',
      service: serviceMap.build,
      pills: [{ pill: 'NEXT.JS' }, { pill: 'POSTGRES' }, { pill: 'METABASE' }],
      featured: true,
      _status: 'published',
      publishedYear: '2024',
      excerpt: 'Bridging SPV dan Accounting di operasi F&B multi-cabang. Cut 50% budget salary accounting, cut waktu processing data, sistem yang scalable.',
      featuredDetails: {
        badgeLabel: '[ FEATURED · STUDIO PRODUCT ]',
        shippedLabel: '[ ✓ SHIPPED ]',
        metaLine: 'F&B OPS · STUDIO PRODUCT · MULTI-CABANG',
        headline: 'Laporta — bridging SPV dan Accounting di operasi F&B multi-cabang.',
        description: 'Aplikasi yang menyederhanakan alur data dari cabang ke head office. Petty Cash, Stock Opname, Waste, dan data non-POS lainnya diproses cepat lewat satu workflow — dimonitor langsung oleh Area Manager, Investor, dan Decision Maker. Dibangun untuk operator F&B Indonesia yang udah outgrow spreadsheet tapi belum cocok pake enterprise ERP.',
        metrics: [
          { num: '50', accent: '%', label: 'CUT BUDGET ACCOUNTING' },
          { num: '↓', accent: '4×', label: 'WAKTU PROCESSING' },
          { num: '∞', accent: '', label: 'SCALABLE MULTI-CABANG' },
        ],
        codePanel: {
          tag: '[ .TS ]',
          path: 'apps/laporta/sync.ts',
          lines: [
            { line: '<span style="color:#C4C0C5">export async function</span> syncOutlet() {' },
            { line: '&nbsp;&nbsp;<span style="color:#C4C0C5">const</span> cash&nbsp; = <span style="color:#C4C0C5">await</span> outlet.pettyCash()' },
            { line: '&nbsp;&nbsp;<span style="color:#C4C0C5">const</span> stock = <span style="color:#C4C0C5">await</span> outlet.stockOpname()' },
            { line: '&nbsp;&nbsp;<span style="color:#C4C0C5">const</span> waste = <span style="color:#C4C0C5">await</span> outlet.waste()' },
            { line: '&nbsp;&nbsp;<span style="color:#C4C0C5">const</span> book&nbsp; = ledger(cash, stock, waste)' },
            { line: '&nbsp;&nbsp;<span style="color:#C4C0C5">await</span> push(<span style="color:#2C70FE">"hq.dashboard"</span>, book)' },
            { line: '&nbsp;&nbsp;<span style="color:#C4C0C5">return</span> book' },
            { line: '}' },
          ],
        },
        stack: [{ tech: 'NEXT.JS' }, { tech: 'POSTGRES' }, { tech: 'METABASE' }, { tech: 'VERCEL' }],
      },
      studio: {
        vizType: 'laporta',
        usage: 'F&B MULTI-CABANG',
        externalLink: { label: 'laporta.id', href: 'https://laporta.id' },
        bullets: [
          { bullet: 'Petty Cash · Stock Opname · Waste' },
          { bullet: 'Bridge SPV ↔ Accounting' },
          { bullet: 'Dashboard Area Manager' },
          { bullet: 'Multi-cabang aggregation' },
        ],
      },
    },
    // Real client work
    {
      order: 2,
      slug: 'ads-multiplatform-dashboard',
      kind: 'client',
      client: 'Digital Marketing Agency',
      tagline: 'Ads data warehouse — Meta, TikTok, Google Ads jadi satu source of truth.',
      meta: 'AGENCY · INTELLIGENCE',
      industry: 'agency',
      service: serviceMap.intelligence,
      pills: [{ pill: 'AIRFLOW' }, { pill: 'LOOKER STUDIO' }],
      _status: 'published',
      publishedYear: '2025',
      excerpt: 'Reporting yang dulu manual 4 jam sehari, sekarang otomatis 30 menit. Tim ops bisa support 3x growth campaign tanpa nambah orang.',
    },
    {
      order: 3,
      slug: 'pt-raja-roti-cemerlang',
      kind: 'client',
      client: 'PT Raja Roti Cemerlang Tbk',
      tagline: 'Company website + corporate page untuk perusahaan F&B publik.',
      meta: 'F&B · BUILD',
      industry: 'fb',
      service: serviceMap.build,
      pills: [{ pill: 'NEXT.JS' }, { pill: 'CMS' }],
      _status: 'published',
      publishedYear: '2025',
      excerpt: 'Refresh company site dengan content management yang gampang dipake tim internal — tanpa harus minta tolong dev tiap update.',
    },
    {
      order: 4,
      slug: 'uruzin',
      kind: 'client',
      client: 'Uruzin',
      tagline: 'Brand site dengan struktur konten yang gampang di-maintain.',
      meta: 'BRAND · BUILD',
      industry: 'other',
      service: serviceMap.build,
      pills: [{ pill: 'NEXT.JS' }, { pill: 'TAILWIND' }],
      _status: 'published',
      publishedYear: '2024',
      excerpt: 'Brand site dengan struktur halaman yang fleksibel, performance yang ringan, dan editorial flow yang sesuai sama identitas brand.',
    },
    {
      order: 5,
      slug: 'tumtim-cookies',
      kind: 'client',
      client: 'Tumtim Cookies',
      tagline: 'Company website lengkap dengan katalog produk dan order flow.',
      meta: 'F&B · BUILD',
      industry: 'fb',
      service: serviceMap.build,
      pills: [{ pill: 'NEXT.JS' }, { pill: 'CMS' }],
      _status: 'published',
      publishedYear: '2024',
      excerpt: 'Site untuk brand cookies dengan katalog produk, order inquiry, dan tone yang sesuai sama brand voice mereka.',
    },
    {
      order: 11,
      slug: 'viralytics',
      kind: 'studio',
      client: 'Viralytics',
      tagline: 'End-to-end KOL OS — sourcing, contracts, live performance.',
      meta: 'KOL OS · STUDIO PRODUCT',
      industry: 'agency',
      pills: [{ pill: 'TIKTOK API' }, { pill: 'NODE.JS' }],
      _status: 'published',
      publishedYear: '2025',
      excerpt: 'KOL campaign management tanpa spreadsheet. Sourcing → contract → live tracking dalam satu workspace.',
      studio: {
        vizType: 'viralytics',
        usage: '380 CAMPAIGNS',
        externalLink: { label: 'viralytics.id', href: 'https://viralytics.id' },
        bullets: [
          { bullet: 'KOL directory & sourcing' },
          { bullet: 'Campaign administration' },
          { bullet: 'Live performance dashboards' },
          { bullet: 'TikTok & Meta API integrations' },
        ],
      },
    },
  ]);
  console.log(`✓ Projects (6) — 1 featured studio product + 4 client cases + 1 studio product`);

  // ============ PROCESS / TENETS / FAQs / CLIENTS ============

  await reset('process-phases', [
    { order: 1, tag: 'PHASE 01', icon: 'discover', name: 'Discover', what: 'Kami petakan masalah sebenarnya, bukan cuma output yang diminta. Wawancara stakeholder, audit sistem yang jalan, scope yang ditighten.', deliv: 'Brief tertulis · technical scope · success metric' },
    { order: 2, tag: 'PHASE 02', icon: 'design', name: 'Design', what: 'Wireframe, data model, system architecture. Kami desain yang bisa kami pertahankan di code, bukan cuma di Figma.', deliv: 'Clickable prototype · technical spec · ERD' },
    { order: 3, tag: 'PHASE 03', icon: 'layers', name: 'Build', what: 'Sprint dua mingguan. Demo tiap akhir sprint. Gak ada kejutan di akhir. Continuous deploy dari hari pertama.', deliv: 'Working software · deploy berkala' },
    { order: 4, tag: 'PHASE 04', icon: 'handoff', name: 'Handoff', what: 'Dokumentasi, training, source code, akses infra. Kami jadi telepon support, bukan dependency.', deliv: 'Source · docs · credential infra · support 30 hari' },
  ]);
  console.log('✓ ProcessPhases (4)');

  await reset('tenets', [
    { order: 1, icon: 'users', title: 'Founder yang ngoding sendiri.', description: 'Yang scoping proyek kamu adalah yang ngoding-nya. Gak ada lapisan agency, gak ada handoff ke junior, gak ada terjemahan yang bocor di tengah jalan.' },
    { order: 2, icon: 'voice', title: 'Opinionated, bukan obedient.', description: 'Kami akan bangun apa yang kamu minta. Tapi kalau ada cara yang lebih masuk akal untuk goal kamu, kami akan ngomong dari awal — bukan setelah proyek jalan.' },
    { order: 3, icon: 'shield', title: 'Built to outlast.', description: 'Arsitektur bersih, dokumentasi handoff lengkap, gak ada vendor lock-in. Kami posisi sebagai partner support, bukan dependency permanen.' },
  ]);
  console.log('✓ Tenets (3)');

  await reset('faqs', [
    { order: 1, question: 'Cara kalian price proyek gimana?', answer: 'Project-based per scope, bukan per jam. Setelah diskusi 30–60 menit di awal, kami kasih proposal dengan milestone dan deliverable yang jelas. Gak ada hourly billing, gak ada timesheet.' },
    { order: 2, question: 'Proyek paling kecil yang kalian ambil?', answer: 'Untuk full project paling kecil mulai dari skala company website dengan struktur konten yang serius. Kalau scope-nya lebih kecil dari itu, kami biasanya rekomendasiin freelancer terpercaya — kadang kami refer langsung.' },
    { order: 3, question: 'Bisa retainer?', answer: 'Bisa, untuk product yang udah live dan butuh continuous improvement. Tapi bukan model "pool of hours" — kami tetep scope per cycle.' },
    { order: 4, question: 'Kalian based di mana?', answer: 'Remote-first, dengan dua founder berbasis di Jakarta. Klien bisa di mana aja di Indonesia atau SEA — kami biasa kerja via Meet, WhatsApp, atau on-site untuk kickoff dan milestone besar.' },
    { order: 5, question: 'Stack apa yang kalian pakai?', answer: 'Pragmatis dan modern: Next.js, React Native, Node.js, Python, Postgres, BigQuery, Airflow, Anthropic/OpenAI. Stack disesuaiin sama problem, bukan sama resume kami.' },
    { order: 6, question: 'Ada NDA?', answer: 'Iya, mutual NDA standar tersedia sebelum diskusi detail. Tinggal minta.' },
    { order: 7, question: 'Setelah proyek selesai, gimana?', answer: 'Source code, infrastructure, dan dokumentasi semua jadi punya kamu. Kami bisa lanjut retainer untuk improvement berikutnya, atau handoff bersih ke tim internal kamu. Pilihan kamu, kami fleksibel.' },
  ]);
  console.log('✓ FAQs (7)');

  // Trusted-by marquee — dummy/abstract names sampai ada client logo asset siap
  await reset('clients', [
    { order: 1, name: 'Acme Co.' },
    { order: 2, name: 'Studio Kanvas' },
    { order: 3, name: 'Nara Group' },
    { order: 4, name: 'Pendar Labs' },
    { order: 5, name: 'Halu Brand' },
    { order: 6, name: 'Bangsal' },
    { order: 7, name: 'Kopi Kuat' },
    { order: 8, name: 'Senja Studio' },
  ]);
  console.log('✓ Clients (8 dummy)');

  // ============ AUTHORS + POSTS ============

  // Delete posts first (FK to authors) before resetting authors
  const existingPosts = await payload.find({ collection: 'posts', limit: 200, overrideAccess: true });
  for (const p of existingPosts.docs) {
    await payload.delete({ collection: 'posts', id: p.id, overrideAccess: true });
  }

  const authorDocs = await reset('authors', [
    { name: 'M Izzul Haq W', slug: 'izzul-haq-w', role: 'Founder · Product & Frontend', bio: 'Founder Coderoach. Yang ngurus bisnis dan frontend. Suka case study yang impact-nya kelihatan di P&L, bukan cuma di dashboard.' },
    { name: 'Farrez Al Hakim', slug: 'farrez-al-hakim', role: 'Co-founder · Backend & Infra', bio: 'Co-founder Coderoach. Backend, infrastruktur, data pipeline — yang biasanya gak kelihatan tapi nentuin sistemnya tahan lama atau enggak.' },
  ]);
  console.log(`✓ Authors (${authorDocs.length})`);

  const izzul = (authorDocs[0] as any).id;
  const farrez = (authorDocs[1] as any).id;

  // Helper: build a minimal Lexical root with paragraphs
  const lex = (paragraphs: string[]) => ({
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        textFormat: 0,
        children: [{ mode: 'normal', text, type: 'text', style: '', detail: 0, format: 0, version: 1 }],
      })),
    },
  });

  await reset('posts', [
    {
      title: 'Kenapa kami gak jual jam.',
      slug: 'kenapa-gak-jual-jam',
      excerpt: 'Hourly billing optimize buat hal yang salah. Ini yang kami lakuin sebagai gantinya — dan kenapa tiap proyek Coderoach itu project-scoped.',
      category: 'operating',
      author: izzul,
      publishedAt: '2026-04-22T09:00:00.000Z',
      _status: 'published',
      featured: true,
      tags: [{ tag: 'operations' }, { tag: 'pricing' }],
      content: lex([
        'Hourly billing itu default-nya banyak agency. Kami belum pernah pakai. Ini alasannya.',
        'Kalau vendor charge per jam, struktur insentifnya reward orang yang spend lebih banyak waktu, bukan yang solve masalahnya lebih cepat. Buyer akhirnya jadi police timesheet, bukan evaluasi outcome.',
        'Project pricing balik insentifnya. Kami propose scope, sepakat sama outcome, dan tim di-reward kalau selesai lebih cepat. Outcome yang lebih bagus, less rework, gak ada padding.',
        'Trade-off-nya: kami harus jujur soal scope dari awal. Itu fungsinya diskusi 30 menit di awal — supaya kedua sisi jelas sebelum mulai.',
      ]),
    },
    {
      title: 'Postgres untuk semuanya (sampai gak bisa lagi).',
      slug: 'postgres-untuk-semuanya',
      excerpt: 'Kapan satu instance Postgres mulai gak cukup, dan apa yang berikutnya. Catatan pragmatis dari studio.',
      category: 'engineering',
      author: farrez,
      publishedAt: '2026-04-08T09:00:00.000Z',
      _status: 'published',
      tags: [{ tag: 'postgres' }, { tag: 'architecture' }, { tag: 'data' }],
      content: lex([
        'Untuk sebagian besar proyek di studio, Postgres cover hampir semua kebutuhan: transactional, analytical, queue, search, bahkan vector lewat pgvector.',
        'Kapan itu mulai gak cukup? Tiga sinyal yang biasanya muncul.',
        'Pertama, write contention di hot table. Kedua, query OLAP yang ngabisin CPU yang dipake transactional workload. Ketiga, vector search ke jutaan embedding — pgvector masih jalan, tapi cost-per-query mulai gak nyaman.',
        'Kalau ketemu salah satunya, kami tambah specialized store untuk sinyal itu — Redis queue, Clickhouse OLAP, vector DB dedicated — tapi cuma untuk satu sinyal. Sisanya tetep di Postgres. Default tetep simple.',
      ]),
    },
    {
      title: 'Catatan dari bangun Laporta.',
      slug: 'catatan-bangun-laporta',
      excerpt: 'Laporta dimulai sebagai tool untuk satu klien F&B kami sendiri. Yang kami pikir 3 bulan, ternyata jadi proyek panjang yang ngajarin banyak hal soal operating F&B.',
      category: 'studio',
      author: izzul,
      publishedAt: '2026-03-15T09:00:00.000Z',
      _status: 'published',
      tags: [{ tag: 'product' }, { tag: 'laporta' }, { tag: 'fb' }],
      content: lex([
        'Laporta dimulai sebagai tool untuk satu klien F&B kami sendiri. Kami pikir bisa ship 3 bulan. Ternyata jauh lebih lama dari itu.',
        'Yang kami dapet bener: logic P&L, multi-outlet aggregation, alur Petty Cash → Stock Opname → Waste yang menjembatani SPV dan Accounting.',
        'Yang akan kami lakuin beda kalau ngulang: customer onboarding. Kami asumsi operator F&B akan self-serve. Mereka enggak. Kami rebuild onboarding dua kali sebelum kepake.',
        'Yang surprise: feature yang paling kepake bukan dashboard interaktif. Tapi ringkasan harian yang dikirim langsung ke decision maker — yang format-nya simpel dan bisa dibaca sambil naik motor.',
      ]),
    },
  ]);
  console.log('✓ Posts (3)');

  // ============ PAGES (block-based) ============

  /**
   * Payload-fetched docs come back with internal `id` fields on nested arrays/groups.
   * Reusing them in `create()` for a different doc would conflict, so strip recursively.
   */
  const stripIds = (val: any): any => {
    if (Array.isArray(val)) return val.map(stripIds);
    if (val && typeof val === 'object') {
      const { id: _id, ...rest } = val;
      const out: any = {};
      for (const [k, v] of Object.entries(rest)) out[k] = stripIds(v);
      return out;
    }
    return val;
  };

  // Reuse the studio global lede/heading + hero global as block defaults.
  const heroGlobalRaw = await payload.findGlobal({ slug: 'hero', depth: 0 }).catch(() => null) as any;
  const studioGlobalRaw = await payload.findGlobal({ slug: 'studio', depth: 0 }).catch(() => null) as any;
  const contactGlobalRaw = await payload.findGlobal({ slug: 'contact', depth: 0 }).catch(() => null) as any;
  const heroGlobal = stripIds(heroGlobalRaw);
  const studioGlobal = stripIds(studioGlobalRaw);
  const contactGlobal = stripIds(contactGlobalRaw);

  const homeLayout = [
    {
      blockType: 'hero',
      pillText: heroGlobal?.pillText,
      headline: heroGlobal?.headline,
      lede: heroGlobal?.lede,
      ctaPrimary: heroGlobal?.ctaPrimary,
      ctaSecondary: heroGlobal?.ctaSecondary,
      metaItems: heroGlobal?.metaItems,
      showOpsConsole: true,
      showTrustedBy: true,
      trustedBy: heroGlobal?.trustedBy,
    },
    { blockType: 'serviceList', heading: 'Empat cara kami bantu.', lede: 'Bukan jual jam — kami jual hasil.', source: 'all' },
    { blockType: 'work', heading: "Yang udah kami ship.", lede: 'Sebagian engagement yang sudah jalan — dari company website sampai data pipeline.', showViewAllLink: true },
    { blockType: 'products', heading: 'Produk yang kami bangun, kami pakai, kami pertahankan.', lede: 'Tes paling jujur buat tim engineering bukan brief klien — tapi produk sendiri.' },
    { blockType: 'process', heading: 'Dari brief ke produksi, empat fase.', lede: 'Setiap proyek jalan di pola yang sama. Scope beda, stack beda — disiplin shipping-nya konsisten.' },
    {
      blockType: 'studio',
      heading: studioGlobal?.heading,
      lede: studioGlobal?.lede,
      stats: studioGlobal?.stats,
      pullQuote: {
        quote: 'Dua founder, satu fokus: software yang bener-bener kepake. Yang scoping proyek kamu adalah yang ngoding — gak ada layer agency, gak ada handoff ke junior.',
        attribution: 'Coderoach Studio · Operating note',
      },
      fullStudioLink: { label: 'Lihat selengkapnya →', href: '/studio' },
    },
    { blockType: 'notes', heading: 'Catatan terbaru dari studio.', lede: 'Engineering, operating, dan hal-hal di antara keduanya.', limit: 3, showViewAllLink: true },
    { blockType: 'faq', heading: 'Pertanyaan yang biasanya muncul.', source: 'collection' },
    {
      blockType: 'contact',
      sectionMarker: '[ CONTACT ]',
      heading: contactGlobal?.heading,
      lede: contactGlobal?.lede,
      scopes: contactGlobal?.scopes,
      formLabels: contactGlobal?.formLabels,
      successHeading: contactGlobal?.successHeading,
    },
  ];

  await reset('pages', [
    {
      title: 'Home',
      slug: 'home',
      _status: 'published',
      seo: {
        metaTitle: '',
        metaDescription: '',
      },
      layout: homeLayout,
    },
    {
      title: 'About',
      slug: 'about',
      _status: 'published',
      seo: {
        metaTitle: 'About — Coderoach Studio',
        metaDescription: 'Studio kecil. Kerja serius. Dua founder, remote-first, build/automate/intelligence/augment.',
      },
      layout: [
        {
          blockType: 'hero',
          pillText: 'About',
          headline: { lead: 'Studio kecil.', accent: 'Kerja serius.' },
          lede: 'Dua founder yang scoping, ngoding, dan kirim hasil sendiri. Tanpa lapisan agency, tanpa handoff ke junior.',
          ctaPrimary: { label: 'Mulai diskusi', href: '/#contact' },
          showOpsConsole: false,
          showTrustedBy: false,
        },
        {
          blockType: 'statsGrid',
          eyebrow: 'Studio',
          heading: 'Angka-angka yang kami pegang.',
          stats: studioGlobal?.stats,
        },
        { blockType: 'studio', heading: studioGlobal?.heading, lede: studioGlobal?.lede, stats: studioGlobal?.stats },
        {
          blockType: 'ctaBanner',
          eyebrow: 'Ready to ship?',
          heading: 'Punya brief? Yuk ngobrol.',
          description: 'Kami balas tiap brief dalam 48 jam.',
          cta: { label: 'Mulai brief proyek →', href: '/#contact' },
          tone: 'dark',
        },
      ],
    },
  ]);
  console.log('✓ Pages (2) — home + about');

  console.log('\n✓ Seed complete. Visit /admin to log in & edit, or http://localhost:3000 to view.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
