/**
 * OpsScore instrument — areas, the 27 questions, and the gate's select options.
 * Copy and scores live here, never in components (docs/opsscore-brief.md §4).
 *
 * Scoring by position: for `scale` and scored `single` questions, option index = score.
 * The first option scores 0, the last scores options.length - 1. Reordering or adding
 * options changes results, so bump INSTRUMENT_VERSION in config.ts when you do.
 * Option `id`s are what gets stored in `answers`; keep them stable.
 */

export type AreaId = 'sales' | 'ops' | 'finance' | 'stock' | 'people' | 'owner' | 'web' | 'ai';

export type QuestionType = 'scale' | 'single' | 'multi' | 'branch' | 'volume';

export type ScaleIcon = 'head' | 'chat' | 'sheet' | 'app' | 'system';

export type Option = {
  id: string;
  label: string;
  icon?: ScaleIcon;
  /** Short name, used where the whole scale is shown at once (quiz intro). */
  short?: string;
};

export type Question = {
  id: string;
  area: AreaId;
  type: QuestionType;
  prompt: string;
  /** Wording for service businesses (industry = Jasa), where "product" does not fit. */
  promptJasa?: string;
  /** Example or analogy shown under the question, so it reads the same way for everyone. */
  hint: string;
  options: Option[];
  /** False for questions that are stored but never scored (H1 is segmentation). */
  scored: boolean;
  /** `multi` only: options that must be the sole selection. */
  exclusive?: string[];
  /** `branch` only: choosing `when` skips `skips`, and removes the area from scoring. */
  branch?: { when: string; skips: string[] };
};

export const AREAS: Array<{ id: AreaId; label: string }> = [
  { id: 'sales', label: 'Penjualan & prospek' },
  { id: 'ops', label: 'Operasional harian' },
  { id: 'finance', label: 'Keuangan & kas' },
  { id: 'stock', label: 'Stok & pembelian' },
  { id: 'people', label: 'Tim & SDM' },
  { id: 'owner', label: 'Ketergantungan owner' },
  { id: 'web', label: 'Kehadiran online' },
  { id: 'ai', label: 'Kesiapan AI' },
];

export const AREA_LABELS = Object.fromEntries(AREAS.map((a) => [a.id, a.label])) as Record<
  AreaId,
  string
>;

/** Standard scale — "where does this data live right now" (0–4). */
export const SCALE_OPTIONS: Option[] = [
  { id: 'kepala', label: 'Di kepala saya, atau tanya orangnya', icon: 'head', short: 'Kepala' },
  { id: 'chat', label: 'Grup WhatsApp / chat', icon: 'chat', short: 'Chat' },
  { id: 'spreadsheet', label: 'Excel, Google Sheets, atau buku', icon: 'sheet', short: 'Spreadsheet' },
  { id: 'aplikasi', label: 'Aplikasi langganan (Jurnal, Moka, Mekari, dll)', icon: 'app', short: 'Aplikasi' },
  { id: 'sistem', label: 'Sistem yang dibuat khusus untuk bisnis ini', icon: 'system', short: 'Sistem' },
];

const scale = (id: string, area: AreaId, prompt: string, hint: string): Question => ({
  id,
  area,
  type: 'scale',
  prompt,
  hint,
  options: SCALE_OPTIONS,
  scored: true,
});

const single = (id: string, area: AreaId, prompt: string, hint: string, options: Option[]): Question => ({
  id,
  area,
  type: 'single',
  prompt,
  hint,
  options,
  scored: true,
});

export const QUESTIONS: Question[] = [
  // A — Penjualan & prospek
  scale(
    'A1',
    'sales',
    'Calon pelanggan yang tanya-tanya, dicatat di mana?',
    'Contohnya orang yang tanya harga lewat DM atau telepon minggu ini. Nama dan kebutuhannya tersimpan di mana?', // REVIEW hint
  ),
  single('A2', 'sales', 'Kalau ada prospek yang belum di-follow-up seminggu, siapa yang tahu?', 'Misalnya calon pembeli yang sudah minta penawaran, lalu tidak dihubungi lagi.', [ // REVIEW hint
    { id: 'tidak-ada', label: 'Nggak ada yang tahu' },
    { id: 'sales', label: 'Sales-nya sendiri, kalau ingat' },
    { id: 'saya', label: 'Saya, kalau sempat cek' },
    { id: 'sistem', label: 'Sistem yang mengingatkan' },
  ]),
  {
    id: 'A3',
    area: 'sales',
    type: 'volume',
    prompt: 'Berapa transaksi atau prospek per bulan?',
    hint: 'Kira-kira saja: jumlah nota, pesanan, atau orang yang bertanya dalam sebulan.', // REVIEW
    options: [
      { id: 'lt30', label: '< 30' },
      { id: '30-100', label: '30–100' },
      { id: '100-500', label: '100–500' },
      { id: 'gt500', label: '> 500' },
    ],
    scored: false,
  },
  {
    ...single(
      'A4',
      'sales',
      'Berapa lama sampai Anda tahu pelanggan lama yang berhenti membeli?',
      'Bayangkan Anda bertanya: siapa yang 3 bulan lalu masih jadi pelanggan, tapi sekarang hilang?', // REVIEW hint
      [
        { id: 'tidak-bisa', label: 'Nggak bisa dijawab' },
        { id: 'hari', label: 'Berhari-hari, disusun manual' },
        { id: 'jam', label: 'Beberapa jam' },
        { id: 'detik', label: 'Detik' },
      ],
    ),
    // REVIEW
    promptJasa: 'Berapa lama sampai Anda tahu klien lama yang berhenti memakai jasa Anda?',
  },

  // B — Operasional harian
  scale(
    'B1',
    'ops',
    'Laporan harian dari lapangan (outlet, tim, proyek) sampai ke Anda lewat apa?',
    'Misalnya omzet outlet, absensi kru, atau progres proyek hari itu.', // REVIEW hint
  ),
  single('B2', 'ops', 'Dari kejadian di lapangan sampai Anda tahu angkanya, butuh:', 'Contoh: penjualan kemarin sore. Kapan angka pastinya sampai ke Anda?', [ // REVIEW hint
    { id: 'tidak-lengkap', label: 'Nggak pernah benar-benar lengkap' },
    { id: 'mingguan', label: 'Mingguan' },
    { id: 'besok', label: 'Besoknya' },
    { id: 'hari-itu', label: 'Hari itu juga' },
    { id: 'realtime', label: 'Real time' },
  ]),
  single('B3', 'ops', 'Seberapa sering laporan harus ditanya ulang?', 'Misalnya laporan kas datang, tapi pengeluarannya kosong, jadi Anda harus bertanya lagi.', [ // REVIEW hint
    { id: 'harian', label: 'Hampir tiap hari' },
    { id: 'mingguan', label: 'Tiap minggu' },
    { id: 'jarang', label: 'Jarang' },
    { id: 'tidak-pernah', label: 'Nggak pernah, sistem nggak mengizinkan' },
  ]),
  single('B4', 'ops', 'Approval (cuti, pengeluaran, diskon) diminta lewat:', 'Misalnya staf minta izin cuti, beli perlengkapan, atau memberi diskon ke pelanggan.', [ // REVIEW hint
    { id: 'chat-saya', label: 'Chat langsung ke saya' },
    { id: 'chat-atasan', label: 'Chat ke atasan' },
    { id: 'form', label: 'Form' },
    { id: 'sistem', label: 'Di dalam sistem' },
  ]),

  // C — Keuangan & kas
  scale(
    'C1',
    'finance',
    'Kas masuk-keluar harian dicatat di:',
    'Termasuk kas kecil. Setiap uang masuk dan keluar hari ini dicatat di mana?', // REVIEW hint
  ),
  single('C2', 'finance', 'Siapa yang tahu daftar pelanggan yang belum bayar?', 'Pelanggan yang ambil barang atau pakai jasa dulu dan bayar belakangan, termasuk sudah berapa lama belum bayar.', [ // REVIEW hint
    { id: 'hafal', label: 'Saya hafal' },
    { id: 'catatan-sales', label: 'Catatan masing-masing sales' },
    { id: 'excel', label: 'Satu file Excel' },
    { id: 'sistem', label: 'Sistem, otomatis' },
  ]),
  single('C3', 'finance', 'Omset dan laba bulan lalu, Anda tahu angka pastinya kapan?', 'Bayangkan hari ini ditanya laba bulan lalu. Bisa dijawab pasti, atau masih menunggu hitungan?', [ // REVIEW hint
    { id: 'belum-pasti', label: 'Sampai sekarang belum pasti' },
    { id: 'lebih-2-minggu', label: 'Lebih dari 2 minggu setelah tutup bulan' },
    { id: 'seminggu', label: 'Seminggu' },
    { id: 'realtime', label: 'Kapan saja, real time' },
  ]),
  single('C4', 'finance', 'Kalau ada selisih kas, biasanya ketahuan kapan?', 'Selisih kas terjadi saat uang di laci atau rekening tidak sama dengan catatan.', [ // REVIEW hint
    { id: 'tidak-pernah', label: 'Nggak pernah ketahuan' },
    { id: 'sudah-masalah', label: 'Pas sudah jadi masalah' },
    { id: 'rekon-bulanan', label: 'Saat rekon bulanan' },
    { id: 'hari-itu', label: 'Hari itu juga' },
  ]),

  // D — Stok & pembelian
  {
    id: 'D0',
    area: 'stock',
    type: 'branch',
    prompt: 'Bisnis Anda pegang stok fisik?',
    hint: 'Barang yang disimpan untuk dijual atau diolah, seperti bahan baku atau barang dagangan.', // REVIEW
    options: [
      { id: 'ya', label: 'Ya' },
      { id: 'tidak', label: 'Tidak' },
    ],
    scored: false,
    branch: { when: 'tidak', skips: ['D1', 'D2'] },
  },
  scale(
    'D1',
    'stock',
    'Stok dicatat di:',
    'Kalau besok Anda tanya sisa stok barang paling laku, jawabannya dicari di mana?', // REVIEW hint
  ),
  single('D2', 'stock', 'Stock opname terakhir, selisihnya?', 'Stock opname artinya menghitung barang yang ada, lalu mencocokkannya dengan catatan.', [ // REVIEW hint
    { id: 'tidak-pernah', label: 'Nggak pernah opname' },
    { id: 'besar', label: 'Besar, dan nggak ketemu sebabnya' },
    { id: 'terlacak', label: 'Ada, tapi bisa dilacak' },
    { id: 'nol', label: 'Nyaris nol' },
  ]),

  // E — Tim & SDM
  scale(
    'E1',
    'people',
    'Absensi dan jadwal shift dikelola di:',
    'Siapa masuk jam berapa, dan siapa jaga shift apa minggu depan.', // REVIEW hint
  ),
  single('E2', 'people', 'Kalau satu orang kunci resign besok, tim pulih dalam:', 'Misalnya admin yang pegang jadwal, password, dan kontak supplier tiba-tiba berhenti.', [ // REVIEW hint
    { id: 'bulanan', label: 'Berbulan-bulan, bisnis terganggu' },
    { id: 'mingguan', label: 'Beberapa minggu' },
    { id: 'seminggu', label: 'Seminggu, ada catatan' },
    { id: 'tidak-terasa', label: 'Nggak terasa, semua terdokumentasi' },
  ]),
  single('E3', 'people', 'SOP bisnis Anda ada di mana?', 'SOP adalah cara kerja baku, misalnya cara buka toko, terima barang, atau tutup kas.', [ // REVIEW hint
    { id: 'kepala', label: 'Di kepala orang lama' },
    { id: 'tidak-dipakai', label: 'Pernah ditulis, nggak dipakai' },
    { id: 'dokumen', label: 'Dokumen yang dipakai' },
    { id: 'sistem', label: 'Di dalam sistem — sistem yang memaksa SOP-nya jalan' },
  ]),

  // F — Ketergantungan owner
  single(
    'F1',
    'owner',
    'Berapa jam sehari habis untuk menjawab pertanyaan tim?',
    'Pertanyaan seperti “stok masih ada?” atau “harga ini berapa?” yang sebenarnya bisa mereka cek sendiri.', // REVIEW hint
    [
      { id: 'gt3', label: 'Lebih dari 3 jam' },
      { id: '1-3', label: '1–3 jam' },
      { id: 'lt1', label: 'Kurang dari 1 jam' },
      { id: 'nol', label: 'Hampir nol' },
    ],
  ),
  {
    id: 'F2',
    area: 'owner',
    type: 'multi',
    prompt: 'Kalau Anda offline dua minggu tanpa HP, apa yang macet?',
    hint: 'Bayangkan Anda liburan tanpa sinyal. Apa yang pasti tertahan?', // REVIEW
    options: [
      { id: 'approval', label: 'Approval' },
      { id: 'pembayaran', label: 'Pembayaran' },
      { id: 'laporan', label: 'Laporan' },
      { id: 'harga', label: 'Keputusan harga' },
      { id: 'semua', label: 'Semuanya' },
      { id: 'tidak-ada', label: 'Nggak ada' },
    ],
    scored: false,
    exclusive: ['semua', 'tidak-ada'],
  },
  single('F3', 'owner', 'Keputusan penting bulan ini Anda ambil berdasarkan:', 'Keputusan seperti menaikkan harga, menambah stok, atau membuka cabang.', [ // REVIEW hint
    { id: 'feeling', label: 'Feeling dan pengalaman' },
    { id: 'manual', label: 'Angka yang disusun manual saat dibutuhkan' },
    { id: 'dashboard', label: 'Dashboard yang rutin dilihat' },
  ]),

  // G — Kehadiran online
  single('G1', 'web', 'Website bisnis Anda:', 'Website adalah alamat online resmi usaha Anda, bukan hanya akun media sosial.', [ // REVIEW hint
    { id: 'tidak-ada', label: 'Nggak ada' },
    { id: 'lama', label: 'Ada, terakhir update lebih dari setahun' },
    { id: 'rutin', label: 'Diupdate rutin' },
    { id: 'sumber-lead', label: 'Jadi sumber lead' },
  ]),
  single('G2', 'web', 'Lead dari internet masuk ke:', 'Orang yang menemukan Anda lewat Google, iklan, atau website, lalu menghubungi.', [ // REVIEW hint
    { id: 'tidak-ada', label: 'Nggak ada lead dari internet' },
    { id: 'wa-pribadi', label: 'WA pribadi saya' },
    { id: 'wa-admin', label: 'WA admin' },
    { id: 'crm', label: 'CRM' },
  ]),
  single('G3', 'web', 'Anda tahu pelanggan datang dari mana (iklan, Google, referral)?', 'Misalnya Anda tahu sebagian besar pelanggan datang dari Instagram, sisanya dari rekomendasi.', [ // REVIEW hint
    { id: 'tidak-tahu', label: 'Nggak tahu' },
    { id: 'kira-kira', label: 'Kira-kira' },
    { id: 'ada-data', label: 'Ada datanya' },
  ]),

  // H — Kesiapan AI
  {
    ...single('H1', 'ai', 'Anda sudah coba AI (ChatGPT dan semacamnya) untuk bisnis?', 'Misalnya ChatGPT untuk menulis caption, membalas email, atau merangkum dokumen.', [ // REVIEW hint
      { id: 'belum', label: 'Belum' },
      { id: 'tidak-nyantol', label: 'Pernah, nggak nyantol' },
      { id: 'pribadi', label: 'Dipakai pribadi — bikin caption, balas email' },
      { id: 'tim', label: 'Dipakai tim secara rutin' },
    ]),
    // Segmentation only (brief §4).
    scored: false,
  },
  {
    ...single(
      'H2',
      'ai',
      'Data untuk tahu produk paling untung ada di mana?',
      'AI seperti karyawan baru yang cerdas: ia hanya bisa menjawab dari catatan yang Anda berikan.', // REVIEW hint
      [
        { id: 'tidak-ada', label: 'Nggak ada' },
        { id: 'tersebar', label: 'Tersebar di beberapa tempat' },
        { id: 'excel', label: 'Satu file Excel' },
        { id: 'database', label: 'Database yang rapi' },
      ],
    ),
    // REVIEW
    promptJasa: 'Data untuk tahu layanan paling untung ada di mana?',
  },
  {
    id: 'H3',
    area: 'ai',
    type: 'multi',
    prompt: 'Yang paling ingin Anda serahkan ke AI?',
    hint: 'Pilih pekerjaan rutin yang paling ingin Anda lepas dari tangan sendiri.', // REVIEW
    options: [
      { id: 'balas-chat', label: 'Balas chat pelanggan' },
      { id: 'laporan', label: 'Bikin laporan' },
      { id: 'follow-up', label: 'Mengingatkan follow-up' },
      { id: 'prediksi-stok', label: 'Prediksi stok' },
      { id: 'rekap-keuangan', label: 'Rekap keuangan' },
      { id: 'tidak-kepikiran', label: 'Nggak kepikiran' },
    ],
    scored: false,
    exclusive: ['tidak-kepikiran'],
  },
];

export const QUESTION_BY_ID = Object.fromEntries(QUESTIONS.map((q) => [q.id, q])) as Record<
  string,
  Question
>;

export const questionsForArea = (area: AreaId) => QUESTIONS.filter((q) => q.area === area);

/** Industry is asked at the start of the sales section, so A4 and H2 can speak to service businesses. */
export const promptFor = (question: Question, industry?: string) =>
  industry === 'jasa' && question.promptJasa ? question.promptJasa : question.prompt;

/* ------------------------------------------------------------------ */
/* Gate — lead qualification fields (brief §8)                         */
/* ------------------------------------------------------------------ */

export const INDUSTRY_OPTIONS: Option[] = [
  { id: 'produksi', label: 'Produksi / Manufaktur' },
  { id: 'distribusi', label: 'Distribusi' },
  { id: 'jasa', label: 'Jasa' },
  { id: 'retail', label: 'Retail' },
  { id: 'kuliner', label: 'Kuliner' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'kriya', label: 'Kriya' },
  { id: 'lainnya', label: 'Lainnya' },
];

export const EMPLOYEE_OPTIONS: Option[] = [
  { id: '1-5', label: '1–5' },
  { id: '6-10', label: '6–10' },
  { id: '11-20', label: '11–20' },
  { id: '21-50', label: '21–50' },
  { id: '51-100', label: '51–100' },
  { id: '100+', label: '> 100' },
];

export const REVENUE_OPTIONS: Option[] = [
  { id: 'lt50', label: '< 50 jt' },
  { id: '50-100', label: '50–100 jt' },
  { id: '100-200', label: '100–200 jt' },
  { id: '200-400', label: '200–400 jt' },
  { id: '400-800', label: '400–800 jt' },
  { id: 'gt800', label: '> 800 jt' },
];
