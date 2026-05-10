# Coderoach Studio — Copywriting Extract

> Ekstraksi lengkap copywriting per halaman/section/post.
> Source: `src/lib/seed.ts` (CMS) + hardcoded TSX fallbacks.
> Tanggal: 2026-05-10 · Versi: pasca-reframe outcome-led & profesional hangat.

---

## Daftar Isi

- [A. Globals](#a-globals-digunakan-di-seluruh-halaman)
  - A1. TopBar
  - A2. Hero
  - A3. Studio Global
  - A4. Contact Global
  - A5. Site Settings (Nav + Footer)
  - A6. Blog Settings
- [B. Halaman](#b-halaman)
  - B1. Home `/`
  - B2. About `/about`
  - B3. Studio `/studio`
  - B4. Work `/work`
  - B5. Notes `/notes`
  - B6. 404
- [C. Services](#c-services-4-entries) (4)
- [D. Process Phases](#d-process-phases-4-entries) (4)
- [E. Tenets](#e-tenets-3-entries) (3)
- [F. FAQ](#f-faq-7-entries) (7)
- [G. Projects / Case Studies](#g-projects--case-studies-6-entries) (6)
- [H. Authors / Team](#h-authors--team-2-entries) (2)
- [I. Clients / Trusted-by](#i-clients--trusted-by-marquee) (8 dummy)
- [J. Posts / Field Notes](#j-posts--field-notes-3-entries) (3)
- [Catatan Akhir](#catatan-akhir)

---

# A. GLOBALS (digunakan di seluruh halaman)

## A1. TopBar (announcement bar di atas)

| Field | Copy |
|---|---|
| Tag | `[ // OPEN UNTUK Q2 2026 ]` |
| Message | Slot terbatas untuk engagement baru kuartal ini — mulai dari diskusi 30 menit. |
| Link label | Mulai brief proyek → |

## A2. Hero (homepage + about block)

| Field | Copy |
|---|---|
| Pill | Senior dev studio · Outcome-priced · Berbasis di Jakarta |
| Headline (lead) | We build, automate, |
| Headline (accent) | and ship intelligence. |
| Lede | Studio engineering yang membantu Anda membangun software, mengotomasi workflow, dan mengoperasikan dashboard analitik — dari company website hingga sistem internal yang digunakan harian. |
| CTA primary | Mulai brief proyek |
| CTA secondary | Lihat hasil kami |
| TrustedBy label | Beberapa klien yang telah kami tangani |
| TrustedBy tagline | Dari company website hingga dashboard analitik — F&B, marketing agency, dan brand lokal di Indonesia. |

**Meta items (3):**
- 3+ · tahun beroperasi
- 10+ · proyek shipped
- Remote · berbasis Jakarta

## A3. Studio Global (homepage block + /studio page)

| Field | Copy |
|---|---|
| Section marker | Tentang studio |
| Heading | Tim senior. Eksekusi yang terukur. |
| Lede | Coderoach Studio fokus pada engagement berskala kecil hingga menengah dengan tim engineer senior yang menangani proyek dari scoping hingga pengiriman. Tanpa hand-off ke junior, tanpa lapisan terjemahan — satu titik akuntabilitas dari awal hingga handoff. |
| Pull quote | Setiap engagement dikerjakan oleh engineer yang juga melakukan scoping. Tanpa lapisan agency, tanpa hand-off ke junior, tanpa konteks yang hilang di tengah jalan. |
| Pull quote attribution | Coderoach Studio · Operating note |

**Stats (4):**

| Num | Accent | Label |
|---|---|---|
| 3 | + yr | BEROPERASI SEJAK 2022 |
| 10 | + | PROYEK SHIPPED |
| 100 | % | SENIOR-LED · NO HAND-OFF |
| 4 | × | PINTU MASUK ENGAGEMENT |

## A4. Contact Global (homepage section + studio CTA)

| Field | Copy |
|---|---|
| Section marker | Mulai proyek |
| Heading line 1 | Punya sesuatu yang ingin dibangun? |
| Heading line 2 (accent) | Mari diskusi. |
| Lede | Kami menerima jumlah klien baru yang terbatas tiap kuartal agar tiap proyek mendapat perhatian penuh dari tim inti. Ceritakan apa yang ingin Anda kirim ke production — setiap brief dibaca tim senior dan dibalas dalam 48 jam kerja. |
| Email placeholder | anda@perusahaan.id |
| Brief placeholder | dashboard analitik untuk tim performance marketing kami… |
| Brief preview empty state | Brief Anda akan muncul di sini, persis seperti yang akan kami baca. |
| Success heading | Terima kasih — brief Anda sudah masuk. |
| Success body | Tim senior akan membalas brief Anda dalam 48 jam kerja. |

**Form labels:**
- Email: `[ // EMAIL ANDA ]`
- Scope: `[ // JENIS PROYEK ]`
- Brief: `[ // APA YANG INGIN DIBANGUN? ]`
- Submit: Kirim brief →
- Email fallback: hello@coderoach.studio

**Project scopes:** Build · Automate · Intelligence · Augment · Belum yakin

## A5. Site Settings (Nav + Footer)

| Field | Copy |
|---|---|
| Site name | Coderoach Studio |
| Site description (SEO) | Studio engineering dari Jakarta — build, automate, ship intelligence. |
| Nav status | OPEN · Q2 2026 |
| Nav CTA | Mulai brief → |
| Footer tagline | Studio engineering yang membantu bisnis Indonesia membangun software, mengotomasi workflow, dan mengoperasikan dashboard analitik. Remote-first, berbasis di Jakarta. |
| Footer badge | OPEN · Q2 2026 |
| Footer meta line (left) | `[ © 2026 CODEROACH STUDIO ]` |
| Footer meta line (right) | `BUILT IN-HOUSE · NEXT.JS 15 · [ // BUILD · AUTOMATE · SHIP // ]` |

**Footer columns:**
- **NAVIGATE** → Services · Work · Process · Field notes · FAQ
- **STUDIO** → About · Field notes · Mulai proyek
- **CONTACT** → hello@coderoach.studio · +62 813-3602-0915 · Based in Jakarta · Remote-first

## A6. Blog Settings (notes archive hero)

| Field | Copy |
|---|---|
| Section marker | `[ FIELD NOTES / 01 ]` |
| Heading | Catatan dari studio. |
| Lede | Engineering, operasional, dan hal-hal di antara keduanya. |

---

# B. HALAMAN

## B1. Home `/` — block sequence

| # | Block | Heading | Lede |
|---|---|---|---|
| 01 | Hero | (lihat A2) | (lihat A2) |
| 02 | ServiceList | Empat pintu masuk engagement. | Bukan menjual jam — kami menjual hasil yang terukur. |
| 03 | Work | Engagement yang telah kami kirim. | Sebagian engagement yang telah berjalan — dari company website hingga data pipeline. Case study lengkap tersedia atas permintaan. |
| 04 | Products | Produk yang kami bangun, gunakan, dan pertahankan. | Ujian paling jujur untuk tim engineering bukan brief klien — melainkan produk sendiri. |
| 05 | Process | Dari brief ke produksi, empat fase. | Setiap proyek mengikuti pola yang sama. Scope berbeda, stack berbeda — disiplin shipping tetap konsisten. |
| 06 | Studio | (lihat A3) | (lihat A3) |
| 07 | Notes | Catatan terbaru dari studio. | Engineering, operasional, dan hal-hal di antara keduanya. |
| 08 | FAQ | Pertanyaan yang biasanya muncul. | (dari collection FAQ) |
| 09 | Contact | (lihat A4) | (lihat A4) |

## B2. About `/about` (page collection — alternative About)

| Field | Copy |
|---|---|
| SEO title | About — Coderoach Studio |
| SEO description | Studio engineering, remote-first dari Jakarta — build, automate, intelligence, augment. |
| Hero pill | About |
| Hero headline (lead) | Studio engineering. |
| Hero headline (accent) | Eksekusi yang terukur. |
| Hero lede | Tim engineer senior yang menangani scoping hingga pengiriman. Tanpa lapisan agency, tanpa hand-off ke junior. |
| Hero CTA | Mulai diskusi |
| StatsGrid eyebrow | Studio |
| StatsGrid heading | Angka-angka yang kami pegang. |
| CTA banner eyebrow | Ready to ship? |
| CTA banner heading | Punya brief? Mari diskusi. |
| CTA banner description | Kami membalas setiap brief dalam 48 jam kerja. |
| CTA banner button | Mulai brief proyek → |

## B3. Studio `/studio`

| Field | Copy |
|---|---|
| SEO title | Studio — Coderoach |
| SEO description | Studio engineering dari Jakarta — build, automate, dan ship intelligence untuk bisnis Indonesia. |
| Page heading | Studio engineering. Eksekusi yang terukur. |
| Page lede | Coderoach Studio adalah tim engineer senior yang membangun software, otomasi, dan sistem data untuk bisnis di Indonesia. Setiap engagement dikerjakan langsung oleh tim inti dengan dokumentasi handoff yang lengkap dan transfer ownership di akhir proyek. |
| Mission | Membantu bisnis dan operator Indonesia membangun software yang benar-benar digunakan dalam operasional harian — bukan deliverable yang berhenti di staging. |
| Team section heading | Tim inti. Yang scoping juga yang membangun. |
| CTA section eyebrow | Tertarik berkolaborasi? |
| CTA section heading | Kami menerima jumlah klien baru yang terbatas tiap kuartal agar tiap proyek mendapat perhatian penuh. |
| CTA button | Mulai brief proyek → |

**Story (4 paragraf):**

1. Coderoach Studio dibentuk pada 2022 untuk mengisi celah antara agency tradisional dan freelancer lepas. Banyak proyek software lokal masih dikerjakan dengan model jam yang reward time spent, bukan masalah yang terselesaikan — sehingga proses dan deliverable tidak selalu sejalan dengan kebutuhan klien.
2. Kami mengoperasikan model berbeda: project-scoped dengan harga berdasarkan outcome, dikerjakan oleh tim engineer senior tanpa hand-off ke junior. Lebih sedikit lapisan terjemahan berarti lebih sedikit konteks yang hilang, dan jalur lebih cepat dari masalah ke solusi yang ship.
3. Setelah tiga tahun beroperasi, model ini terbukti pada hasil: company website yang ship, internal tools yang menggantikan spreadsheet, satu studio product (Laporta) yang kini digunakan operator F&B multi-cabang, dan data pipeline yang memangkas pekerjaan ops dari hitungan jam menjadi menit.
4. Tim inti tetap kecil dengan sengaja. Setiap proyek dikerjakan oleh engineer yang juga melakukan scoping — Izzul (Product & Frontend) dan Farrez (Backend & Infra), didukung jaringan engineer senior tepercaya saat skala proyek menuntut.

**Workspace:**
- Address: Remote · Berbasis Jakarta, Indonesia
- Hours: Sen–Jum · 09:00–18:00 WIB · async di luar jam tersebut
- Tagline: Diskusi awal via Google Meet atau WhatsApp Business.

**Timeline (5 entries):**

| Tahun | Title | Description |
|---|---|---|
| 2022 | Coderoach Studio resmi beroperasi | Dimulai dengan model project-scoped dan outcome-priced. Fokus: software yang ship ke production, bukan deliverable yang berhenti di staging. |
| 2023 | Engagement klien pertama | Kerjasama dengan Uruzin, Tumtim Cookies, dan beberapa brand lokal. Operating model project-scoped tervalidasi pada engagement nyata. |
| 2024 | Laporta ship ke production | Studio product pertama. Bridging SPV dan Accounting di operasi F&B multi-cabang — memangkas 50% budget salary accounting. |
| 2025 | Ekspansi ke Intelligence work | Pengembangan ads multiplatform dashboard untuk agency digital marketing. Memangkas 70% beban manual reporting dan mendukung pertumbuhan campaign 3×. |
| 2026 | Versatile dev studio | Empat pintu masuk — Build, Automate, Intelligence, Augment — dengan disiplin shipping yang sama di setiap engagement. |

## B4. Work `/work`

| Field | Copy |
|---|---|
| SEO title | Work — Coderoach Studio |
| SEO description | Forty engagements across F&B, logistics, finance, and agency. Selected client cases and studio products. |
| Section marker | `[ 02 / 06 ] · Work archive` |
| Heading | Forty engagements, six industries. |
| Lede | Each one ships with the same operating shape: a senior engineering team, full handoff documentation, and ownership transfer at completion. Filter to find work close to your problem. |
| Filter labels | Kind · Industry · Service |

## B5. Notes / Field Notes `/notes`

| Field | Copy |
|---|---|
| SEO title | Field Notes — Coderoach Studio |
| SEO description | Notes from the studio. Engineering, operating, and the bits in between. |
| Archive hero | (lihat A6) |

## B6. 404 `/not-found`

| Field | Copy |
|---|---|
| Eyebrow | `[ 404 · NOT_FOUND ]` |
| Heading | Halaman tidak ditemukan. |
| Body | URL yang Anda buka tidak cocok dengan halaman manapun yang kami ship. Kemungkinan halaman dipindahkan atau link salah ketik. |
| CTA primary | ← Kembali ke home |
| CTA secondary | Lihat hasil kami |

---

# C. SERVICES (4 entries)

## C1. Build — `/services/build`

| Field | Copy |
|---|---|
| Tag | BUILD |
| Tagline | Web, mobile, dan tools yang benar-benar digunakan. |
| Blurb | Mulai dari company website hingga aplikasi internal. Modern stack, arsitektur yang clean, dan dokumentasi handoff yang siap dilanjutkan tim Anda. |
| Hero lede | Kami mendesain, membangun, dan mengirim software yang earn its place — dari greenfield product hingga internal tools yang menggantikan spreadsheet. |
| Pricing note | Project-scoped, bukan per jam. Diskusi awal untuk quote yang akurat. |

- **List:** Company website · Web application · Mobile app (iOS, Android) · Internal admin tools
- **Stack:** Next.js · React Native · Postgres · TypeScript

**Service FAQ:**
- **Q: Bisa mobile?** — A: Bisa — React Native untuk cross-platform, native iOS/Android jika use case menuntut.
- **Q: Custom design atau template?** — A: Selalu custom. Setiap engagement didesain spesifik untuk kebutuhan klien.

## C2. Automate — `/services/automate`

| Field | Copy |
|---|---|
| Tag | AUTOMATE |
| Tagline | Workflow yang dulu manual, kini berjalan otomatis. |
| Blurb | Banyak tim masih melakukan copy-paste antar spreadsheet di luar jam kerja. Kami menggantikan pekerjaan manual itu dengan sistem otomatis yang reliable — lengkap dengan audit log dan observability. |
| Hero lede | Otomasi yang reliable dan observable. Pekerjaan ops yang dulu dikerjakan manual kini dijalankan oleh code, dengan audit log yang dapat di-trace kapan saja. |
| Pricing note | Project-scoped per scope automation. Discovery sebelum quote. |

- **List:** Workflow automation · API integration & data pipeline · Reporting automation · Process digitization
- **Stack:** Node.js · Python · n8n · Webhooks

## C3. Intelligence — `/services/intelligence`

| Field | Copy |
|---|---|
| Tag | INTELLIGENCE |
| Tagline | Data yang mengarahkan keputusan, bukan sekadar chart. |
| Blurb | Membuat dashboard itu mudah. Yang sulit adalah membangun data layer dengan KPI yang akurat, anomali yang fire on time, dan insight yang dapat dijadikan dasar pengambilan keputusan. |
| Hero lede | Dari API multi-platform hingga dashboard yang digunakan harian — kami membangun pipeline-nya, bukan hanya chart-nya. |
| Pricing note | Discovery dan scoping di awal. Tiap stack data berbeda biaya, kami transparan sejak diskusi pertama. |

- **List:** Data warehouse & ETL · Custom analytics dashboard · Multi-platform ads analytics · Forecasting & anomaly detection
- **Stack:** BigQuery · Postgres · Looker Studio · Airflow

## C4. Augment — `/services/augment`

| Field | Copy |
|---|---|
| Tag | AUGMENT |
| Tagline | Menambahkan AI ke sistem yang sudah berjalan. |
| Blurb | LLM kini menjadi bagian dari infrastruktur. Kami mengintegrasikannya pada titik yang benar-benar moves the needle — internal search, document processing, dan agentic workflow. |
| Hero lede | AI yang earn its place — bukan chatbot demo. Kami menambahkan intelligence ke alur kerja yang sudah ada, di tempat di mana latensi terbayar oleh hasil. |
| Pricing note | Pilot scope di awal, expand setelah ada hasil yang measurable. |

- **List:** LLM integration & RAG · Agentic workflow · AI internal tools · Document processing
- **Stack:** Anthropic · OpenAI · LangChain · pgvector

---

# D. PROCESS PHASES (4 entries)

| Tag | Phase | What | Deliverable |
|---|---|---|---|
| PHASE 01 | Discover | Kami memetakan masalah sebenarnya, bukan hanya output yang diminta. Wawancara stakeholder, audit sistem berjalan, dan tightening scope hingga jelas. | Brief tertulis · technical scope · success metric |
| PHASE 02 | Design | Wireframe, data model, system architecture. Kami mendesain sesuatu yang bisa kami pertahankan di code, bukan hanya di Figma. | Clickable prototype · technical spec · ERD |
| PHASE 03 | Build | Sprint dua mingguan dengan demo di tiap akhir sprint. Tanpa kejutan di akhir proyek. Continuous deploy sejak hari pertama. | Working software · deploy berkala |
| PHASE 04 | Handoff | Dokumentasi lengkap, training tim Anda, source code, dan akses infrastruktur. Kami berperan sebagai partner support — bukan dependency permanen. | Source · docs · credential infra · support 30 hari |

---

# E. TENETS (3 entries)

### 1. Senior end-to-end. Tanpa hand-off.
Engineer yang melakukan scoping adalah engineer yang melakukan pengiriman. Tanpa lapisan agency yang menerjemahkan ulang, tanpa hand-off ke junior, dan tanpa konteks yang hilang di tengah jalan.

### 2. Opinionated, bukan obedient.
Kami akan membangun apa yang Anda minta. Tetapi jika ada cara yang lebih masuk akal untuk goal Anda, kami akan menyampaikannya di awal — bukan setelah proyek berjalan.

### 3. Built to outlast.
Arsitektur yang clean, dokumentasi handoff yang lengkap, dan tanpa vendor lock-in. Kami memposisikan diri sebagai partner support, bukan dependency permanen.

---

# F. FAQ (7 entries)

| # | Question | Answer |
|---|---|---|
| 1 | Bagaimana cara Anda menentukan harga proyek? | Project-based per scope, bukan per jam. Setelah diskusi awal 30–60 menit, kami menyiapkan proposal dengan milestone dan deliverable yang jelas. Tanpa hourly billing, tanpa timesheet. |
| 2 | Berapa skala proyek paling kecil yang Anda terima? | Untuk full project, paling kecil dimulai dari skala company website dengan struktur konten yang serius. Jika scope-nya lebih kecil, kami biasanya merekomendasikan freelancer tepercaya — kadang kami refer langsung. |
| 3 | Apakah tersedia model retainer? | Tersedia, untuk product yang sudah live dan memerlukan continuous improvement. Bukan model "pool of hours" — kami tetap scope per cycle agar fokus pada outcome yang jelas. |
| 4 | Anda berbasis di mana? | Remote-first, dengan tim inti berbasis di Jakarta. Klien dapat berada di mana pun di Indonesia atau Asia Tenggara — kami biasa berkolaborasi via Google Meet, WhatsApp, atau on-site untuk kickoff dan milestone besar. |
| 5 | Stack apa yang Anda gunakan? | Pragmatis dan modern: Next.js, React Native, Node.js, Python, Postgres, BigQuery, Airflow, Anthropic/OpenAI. Stack disesuaikan dengan problem klien, bukan dengan resume kami. |
| 6 | Apakah tersedia NDA? | Tersedia. Mutual NDA standar dapat ditandatangani sebelum diskusi detail teknis dan bisnis. |
| 7 | Bagaimana setelah proyek selesai? | Source code, infrastructure, dan dokumentasi sepenuhnya menjadi milik Anda. Anda dapat melanjutkan dengan retainer untuk improvement berikutnya, atau handoff bersih ke tim internal — pilihan ada di tangan Anda. |

---

# G. PROJECTS / CASE STUDIES (6 entries)

## G1. Laporta — `/work/laporta` ★ FEATURED · STUDIO PRODUCT

| Field | Copy |
|---|---|
| Client | Laporta |
| Year | 2024 |
| Tagline | Profit intelligence layer di atas POS, untuk operator F&B Indonesia. |
| Meta | F&B OPS · STUDIO PRODUCT |
| Pills | NEXT.JS · POSTGRES · METABASE |
| Excerpt | Bridging SPV dan Accounting di operasi F&B multi-cabang. Cut 50% budget salary accounting, cut waktu processing data, sistem yang scalable. |
| External link | laporta.id |
| Usage | F&B MULTI-CABANG |

**Featured details:**
- Badge: `[ FEATURED · STUDIO PRODUCT ]`
- Shipped label: `[ ✓ SHIPPED ]`
- Meta line: `F&B OPS · STUDIO PRODUCT · MULTI-CABANG`
- Headline: Laporta — bridging SPV dan Accounting di operasi F&B multi-cabang.
- Description: Aplikasi yang menyederhanakan alur data dari cabang ke head office. Petty Cash, Stock Opname, Waste, dan data non-POS lainnya diproses cepat melalui satu workflow — termonitor langsung oleh Area Manager, Investor, dan Decision Maker. Dibangun untuk operator F&B Indonesia yang sudah melampaui kapasitas spreadsheet, namun belum cocok dengan enterprise ERP.

**Metrics:**
- 50% · CUT BUDGET ACCOUNTING
- ↓ 4× · WAKTU PROCESSING
- ∞ · SCALABLE MULTI-CABANG

**Studio bullets:**
- Petty Cash · Stock Opname · Waste
- Bridge SPV ↔ Accounting
- Dashboard Area Manager
- Multi-cabang aggregation

## G2. Ads Multiplatform Dashboard — `/work/ads-multiplatform-dashboard`

| Field | Copy |
|---|---|
| Client | Digital Marketing Agency |
| Year | 2025 |
| Tagline | Ads data warehouse — Meta, TikTok, Google Ads jadi satu source of truth. |
| Meta | AGENCY · INTELLIGENCE |
| Pills | AIRFLOW · LOOKER STUDIO |
| Excerpt | Reporting yang dulu manual 4 jam sehari, sekarang otomatis 30 menit. Tim ops bisa support 3x growth campaign tanpa nambah orang. |

## G3. PT Raja Roti Cemerlang Tbk — `/work/pt-raja-roti-cemerlang`

| Field | Copy |
|---|---|
| Client | PT Raja Roti Cemerlang Tbk |
| Year | 2025 |
| Tagline | Company website + corporate page untuk perusahaan F&B publik. |
| Meta | F&B · BUILD |
| Pills | NEXT.JS · CMS |
| Excerpt | Refresh company site dengan content management yang mudah digunakan tim internal — tanpa perlu meminta bantuan developer untuk setiap pembaruan. |

## G4. Uruzin — `/work/uruzin`

| Field | Copy |
|---|---|
| Client | Uruzin |
| Year | 2024 |
| Tagline | Brand site dengan struktur konten yang gampang di-maintain. |
| Meta | BRAND · BUILD |
| Pills | NEXT.JS · TAILWIND |
| Excerpt | Brand site dengan struktur halaman yang fleksibel, performance yang ringan, dan editorial flow yang sesuai sama identitas brand. |

> ⚠️ Tagline & excerpt masih ada slang (`gampang di-maintain`, `sesuai sama`). Belum di-polish.

## G5. Tumtim Cookies — `/work/tumtim-cookies`

| Field | Copy |
|---|---|
| Client | Tumtim Cookies |
| Year | 2024 |
| Tagline | Company website lengkap dengan katalog produk dan order flow. |
| Meta | F&B · BUILD |
| Pills | NEXT.JS · CMS |
| Excerpt | Site untuk brand cookies dengan katalog produk, order inquiry, dan tone yang sesuai sama brand voice mereka. |

> ⚠️ Excerpt masih ada slang (`sesuai sama`). Belum di-polish.

## G6. Viralytics — `/work/viralytics` ★ STUDIO PRODUCT

| Field | Copy |
|---|---|
| Client | Viralytics |
| Year | 2025 |
| Tagline | End-to-end KOL OS — sourcing, contracts, live performance. |
| Meta | KOL OS · STUDIO PRODUCT |
| Pills | TIKTOK API · NODE.JS |
| Excerpt | KOL campaign management tanpa spreadsheet. Sourcing → contract → live tracking dalam satu workspace. |
| Usage | 380 CAMPAIGNS |
| External link | viralytics.id |

**Studio bullets:**
- KOL directory & sourcing
- Campaign administration
- Live performance dashboards
- TikTok & Meta API integrations

---

# H. AUTHORS / TEAM (2 entries)

## H1. M Izzul Haq W

| Field | Copy |
|---|---|
| Slug | izzul-haq-w |
| Role | Founder · Product & Frontend |
| Bio | Founder & Product Engineer di Coderoach. Menangani sisi bisnis dan frontend engineering. Tertarik pada engagement yang dampaknya terlihat di P&L klien, bukan hanya di dashboard. |

## H2. Farrez Al Hakim

| Field | Copy |
|---|---|
| Slug | farrez-al-hakim |
| Role | Co-founder · Backend & Infra |
| Bio | Co-founder & Backend Engineer di Coderoach. Bertanggung jawab atas backend, infrastruktur, dan data pipeline — fondasi yang menentukan ketahanan jangka panjang sistem. |

---

# I. CLIENTS / TRUSTED-BY MARQUEE

8 dummy entries: Acme Co. · Studio Kanvas · Nara Group · Pendar Labs · Halu Brand · Bangsal · Kopi Kuat · Senja Studio

> ⚠️ Ini placeholder. Perlu diganti dengan nama/logo klien asli setelah aset siap.

---

# J. POSTS / FIELD NOTES (3 entries)

> ⚠️ **Catatan:** Tone post belum di-polish (masih bahasa editorial gaul: `gak`, `kepake`, `ngabisin`, `ngajarin`). Title masih mengandung slang. Bisa di-polish terpisah jika ingin disamakan dengan tone marketing baru.

## J1. Kenapa kami gak jual jam.

| Field | Value |
|---|---|
| Slug | `/notes/kenapa-gak-jual-jam` |
| Author | Izzul |
| Published | 2026-04-22 |
| Featured | Yes |
| Category | operating |
| Tags | operations, pricing |

**Excerpt:** Hourly billing optimize buat hal yang salah. Ini yang kami lakuin sebagai gantinya — dan kenapa tiap proyek Coderoach itu project-scoped.

**Body (4 paragraf):**

1. Hourly billing itu default-nya banyak agency. Kami belum pernah pakai. Ini alasannya.
2. Kalau vendor charge per jam, struktur insentifnya reward orang yang spend lebih banyak waktu, bukan yang solve masalahnya lebih cepat. Buyer akhirnya jadi police timesheet, bukan evaluasi outcome.
3. Project pricing balik insentifnya. Kami propose scope, sepakat sama outcome, dan tim di-reward kalau selesai lebih cepat. Outcome yang lebih bagus, less rework, gak ada padding.
4. Trade-off-nya: kami harus jujur soal scope dari awal. Itu fungsinya diskusi 30 menit di awal — supaya kedua sisi jelas sebelum mulai.

## J2. Postgres untuk semuanya (sampai gak bisa lagi).

| Field | Value |
|---|---|
| Slug | `/notes/postgres-untuk-semuanya` |
| Author | Farrez |
| Published | 2026-04-08 |
| Category | engineering |
| Tags | postgres, architecture, data |

**Excerpt:** Kapan satu instance Postgres mulai gak cukup, dan apa yang berikutnya. Catatan pragmatis dari studio.

**Body (4 paragraf):**

1. Untuk sebagian besar proyek di studio, Postgres cover hampir semua kebutuhan: transactional, analytical, queue, search, bahkan vector lewat pgvector.
2. Kapan itu mulai gak cukup? Tiga sinyal yang biasanya muncul.
3. Pertama, write contention di hot table. Kedua, query OLAP yang ngabisin CPU yang dipake transactional workload. Ketiga, vector search ke jutaan embedding — pgvector masih jalan, tapi cost-per-query mulai gak nyaman.
4. Kalau ketemu salah satunya, kami tambah specialized store untuk sinyal itu — Redis queue, Clickhouse OLAP, vector DB dedicated — tapi cuma untuk satu sinyal. Sisanya tetep di Postgres. Default tetep simple.

## J3. Catatan dari bangun Laporta.

| Field | Value |
|---|---|
| Slug | `/notes/catatan-bangun-laporta` |
| Author | Izzul |
| Published | 2026-03-15 |
| Category | studio |
| Tags | product, laporta, fb |

**Excerpt:** Laporta dimulai sebagai tool untuk satu klien F&B kami sendiri. Yang kami pikir 3 bulan, ternyata jadi proyek panjang yang ngajarin banyak hal soal operating F&B.

**Body (4 paragraf):**

1. Laporta dimulai sebagai tool untuk satu klien F&B kami sendiri. Kami pikir bisa ship 3 bulan. Ternyata jauh lebih lama dari itu.
2. Yang kami dapet bener: logic P&L, multi-outlet aggregation, alur Petty Cash → Stock Opname → Waste yang menjembatani SPV dan Accounting.
3. Yang akan kami lakuin beda kalau ngulang: customer onboarding. Kami asumsi operator F&B akan self-serve. Mereka enggak. Kami rebuild onboarding dua kali sebelum kepake.
4. Yang surprise: feature yang paling kepake bukan dashboard interaktif. Tapi ringkasan harian yang dikirim langsung ke decision maker — yang format-nya simpel dan bisa dibaca sambil naik motor.

---

# Catatan Akhir

## Source canonical
- **CMS content:** [`src/lib/seed.ts`](src/lib/seed.ts)
- **Hardcoded fallback:** [`src/app/(frontend)/`](src/app/(frontend)/) (Hero, Studio, Contact, Process, Services, Products, Work, ProjectArchive, not-found)

## Yang masih perlu polish (opsional)

1. **3 blog post titles + bodies** (J1–J3) — masih tone editorial gaul (`gak`, `kepake`, `ngabisin`, `ngajarin`).
2. **2 project excerpts** — Uruzin (G4) & Tumtim Cookies (G5) — masih ada slang ringan (`gampang di-maintain`, `sesuai sama brand voice`).
3. **Trusted-by marquee** (I) — 8 nama dummy. Perlu diganti dengan logo/nama klien asli.

## Tone guidelines aktif

- **Drop:** ngoding, ngerjain, ngurus, kepake, beneran, gak, banget, jam 2 pagi, pegel, yuk, cantik (untuk software), babysitting, jam-jaman, bareng, ambil proyek, bikin, kamu
- **Replace dengan:** membangun, mengerjakan, menangani, digunakan, benar-benar, tidak, sekali, di luar jam kerja, mari, polished, lengkap, hitungan jam, bersama, mengerjakan engagement, Anda
- **Pertahankan:** struktur kalimat pendek, bracket markers `[ // OPEN UNTUK PROJECT ]`, mix English untuk istilah teknis (stack, pipeline, dashboard, scoping, hand-off, deploy), bullet style.

## Positioning frame aktif

| Sebelum (founder-led) | Sesudah (outcome-led) |
|---|---|
| "2 founders, no juniors" | "Senior engineering · 10+ proyek shipped" |
| "Dua founder yang ngoding sendiri" | "Tim engineer senior, satu titik akuntabilitas, tanpa hand-off ke junior" |
| "Kami balas langsung dari salah satu founder" | "Tim senior membalas brief Anda dalam 48 jam kerja" |
| "Studio dev kecil, founder-led" | "Studio engineering, outcome-priced, berbasis Jakarta" |

**Prinsip:** akuntabilitas dan tidak adanya hand-off ke junior tetap dipertahankan sebagai keunggulan, tapi dibingkai sebagai operating model yang profesional, bukan sebagai konsekuensi "cuma dua orang."
