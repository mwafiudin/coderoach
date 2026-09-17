/**
 * OpsScore report copy (docs/opsscore-brief.md §6). Components read every string from here or
 * from questions.ts. Lines marked `// REVIEW` are drafts written during the build and need a human
 * pass before release; everything else is taken verbatim from the brief.
 */
import type { AreaId } from './questions';
import type { Band, Phase, ServiceClass } from './scoring';

export const PHASE_COPY: Record<Phase, { name: string; title: string; key: string }> = {
  1: {
    name: 'Ingatan',
    title: 'Fase Ingatan',
    key: 'Bisnis Anda berjalan di kepala Anda. AI belum bisa membantu — belum ada yang bisa dibaca.',
  },
  2: {
    name: 'Chat',
    title: 'Fase Chat',
    key: 'Datanya ada, berserakan di ratusan grup WA. Kalau ditanya, harus scroll.',
  },
  3: {
    name: 'Spreadsheet',
    title: 'Fase Spreadsheet',
    key: 'Anda sudah mencatat. Tapi setiap laporan masih butuh satu orang yang menyusunnya.',
  },
  4: {
    name: 'Sistem',
    title: 'Fase Sistem',
    key: 'Data Anda sudah bisa dibaca mesin. AI tinggal disambungkan.',
  },
};

/** Mini-feedback after each area in the quiz, reused as the diagnosis sentence in the report. */
export const AREA_FEEDBACK: Record<AreaId, Record<Band, string>> = {
  sales: {
    low: 'Prospek Anda hidup di chat. AI nggak bisa membaca yang nggak tercatat — dan sales Anda juga sering lupa.',
    mid: 'Prospek tercatat, tapi follow-up masih bergantung ingatan orang.',
    high: 'Pipeline Anda sudah rapi. Nggak perlu diapa-apain.',
  },
  ops: {
    low: 'Laporan Anda sampai, tapi telat dan bolong. Mesin nggak bisa belajar dari data yang bolong.',
    mid: 'Laporan masuk rutin, tapi masih perlu ditanya ulang. Kelengkapan belum dipaksa sistem.',
    high: 'Laporan lapangan Anda lengkap dan tepat waktu. Ini fondasi yang bagus.',
  },
  finance: {
    low: 'Angka laba yang datang dua minggu terlambat bukan data — itu sejarah. AI butuh data hari ini.',
    mid: 'Kas tercatat, tapi piutang dan selisih masih ketahuan belakangan.',
    high: 'Keuangan Anda real time. Area ini sudah siap.',
  },
  stock: {
    low: 'Stok yang nggak ketahuan selisihnya nggak bisa diprediksi. Prediksi stok justru hal termudah buat AI — kalau angkanya ada.',
    mid: 'Stok tercatat, selisih opname masih sering nggak terlacak sebabnya.',
    high: 'Stok Anda akurat. Prediksi tinggal disambungkan.',
  },
  people: {
    low: 'SOP di kepala orang lama itu risiko terbesar Anda. Bukan cuma buat AI — buat kelangsungan bisnis.',
    mid: 'SOP ada, tapi belum dipaksa jalan oleh sistem.',
    high: 'Tim Anda terdokumentasi. Orang boleh ganti, prosesnya tetap.',
  },
  owner: {
    low: 'Anda adalah database bisnis Anda sendiri. Dan database ini nggak bisa di-backup.',
    mid: 'Sebagian keputusan sudah pakai angka, tapi angkanya masih Anda yang menyusun.',
    high: 'Bisnis jalan tanpa Anda di tengahnya. Ini yang dicari.',
  },
  web: {
    low: 'Calon pelanggan nggak bisa menemukan Anda, dan yang menemukan masuk ke WA pribadi.',
    mid: 'Website ada, tapi belum jadi sumber lead yang terukur.',
    high: 'Kehadiran online Anda sudah bekerja sebagai alat jual.',
  },
  // The brief has no row for ai.
  ai: {
    low: 'Pertanyaan bisnis Anda belum bisa dijawab tanpa mengumpulkan datanya dulu. AI akan mengalami hal yang sama.', // REVIEW
    mid: 'Datanya ada di satu file, tapi masih disusun tangan. AI butuh sumber yang terus terisi.', // REVIEW
    high: 'Data Anda sudah rapi di satu tempat. AI tinggal disambungkan.', // REVIEW
  },
};

/** Fixed closing line in the report, right before the CTA. */
export const REPORT_CLOSING =
  'AI yang Anda mau ada di jawaban terakhir Anda. Yang menghalanginya ada di tiga area di atas.';

/** Step 5 service classes — shown without prices. */
export const SERVICE_CLASS_COPY: Record<ServiceClass, { label: string; body: string }> = {
  'SYS-TOOL': {
    label: 'SYS-TOOL',
    body: 'Satu proses yang perlu dirapikan dulu. Biasanya 4–8 minggu.',
  },
  'SYS-DIV': {
    label: 'SYS-DIV',
    body: 'Satu divisi penuh yang perlu disistemkan. Biasanya 2–4 bulan.',
  },
  'SYS-OS': {
    label: 'SYS-OS',
    body: 'Rantai penuh dari penjualan sampai keuangan. Biasanya 4–8 bulan, didahului discovery.',
  },
  WEB: {
    label: 'WEB',
    body: 'Operasional Anda sudah rapi. Yang tertinggal adalah cara calon pelanggan menemukan Anda.',
  },
  READY: {
    label: '—',
    body: 'Anda sudah siap AI. Kalau mau membahas apa yang bisa diotomasi, kirim brief.',
  },
};

/** Report note when G1 = no website and G2 = no internet leads. */
export const WEB_NOTE = {
  label: 'Catatan WEB', // REVIEW
  body: 'Di luar tiga area di atas: calon pelanggan belum bisa menemukan Anda lewat internet. Ini bisa dikerjakan terpisah dari sistem operasional.', // REVIEW
};

export const CTA_COPY = {
  brief: 'Kirim brief, kami balas dalam 2 hari',
  automation: 'Bahas apa yang bisa diotomasi',
};

/**
 * One concrete action per scored question. A priority area shows the action for its
 * lowest-scoring question (Priority.focusQuestion), never a generic line.
 */
export const ACTIONS: Record<string, string> = {
  A1: 'Pindahkan setiap calon pelanggan yang bertanya ke satu daftar bersama: nama, kontak, tanggal, dan apa yang ditanyakan.', // REVIEW
  A2: 'Mulai dari satu daftar prospek dengan tanggal follow-up berikutnya, siapa pun yang mengisinya.', // REVIEW (example from the brief)
  A4: 'Catat tanggal transaksi terakhir setiap pelanggan, supaya yang lama tidak kembali bisa dilihat dalam satu filter.', // REVIEW
  B1: 'Ganti laporan harian lewat chat dengan satu format isian yang sama untuk semua outlet, tim, atau proyek.', // REVIEW
  B2: 'Tetapkan jam tutup laporan harian dan satu tempat angkanya dikumpulkan, supaya Anda tahu hasilnya hari itu juga.', // REVIEW
  B3: 'Jadikan kolom penting di format laporan wajib diisi, supaya laporan yang bolong tidak bisa terkirim.', // REVIEW
  B4: 'Pindahkan approval cuti, pengeluaran, dan diskon dari chat ke satu form yang mencatat siapa menyetujui dan kapan.', // REVIEW
  C1: 'Catat kas masuk dan keluar setiap hari di satu tempat, lengkap dengan kategorinya.', // REVIEW
  C2: 'Buat satu daftar piutang dengan tanggal jatuh tempo per pelanggan, dan periksa setiap minggu.', // REVIEW
  C3: 'Tetapkan tanggal tutup buku yang sama setiap bulan, lalu majukan pelan-pelan sampai laba bulan lalu diketahui dalam seminggu.', // REVIEW
  C4: 'Cocokkan kas fisik dengan catatan setiap tutup hari, supaya selisih ketahuan pada hari yang sama.', // REVIEW
  D1: 'Catat stok masuk dan keluar per lokasi di satu tempat, dengan nama barang dan satuan yang sama di semua catatan.', // REVIEW
  D2: 'Jadwalkan stock opname rutin dan tulis sebab setiap selisih, supaya polanya mulai terlihat.', // REVIEW
  E1: 'Pindahkan absensi dan jadwal shift ke satu tempat yang bisa dilihat tim, bukan diumumkan lewat grup.', // REVIEW
  E2: 'Minta setiap orang kunci menuliskan langkah kerjanya, mulai dari tugas yang paling sering ditanyakan orang lain.', // REVIEW
  E3: 'Pilih satu SOP yang paling sering dilanggar, tulis ulang jadi daftar periksa, dan pakai setiap hari.', // REVIEW
  F1: 'Kumpulkan pertanyaan tim yang berulang minggu ini, lalu buat jawabannya bisa mereka lihat sendiri.', // REVIEW
  F3: 'Pilih tiga angka yang paling menentukan keputusan Anda, dan pastikan ketiganya tersedia tanpa perlu disusun dulu.', // REVIEW
  G1: 'Mulai dari satu halaman yang menjelaskan apa yang Anda jual, untuk siapa, dan cara menghubungi Anda.', // REVIEW
  G2: 'Arahkan semua lead dari internet ke satu nomor atau inbox bersama, bukan ke WA pribadi.', // REVIEW
  G3: 'Mulai bulan ini, tanyakan dan catat dari mana setiap pelanggan baru datang: iklan, Google, atau referral.', // REVIEW
  H2: 'Satukan data penjualan dan biaya per produk atau layanan di satu tempat, sebelum memikirkan AI.', // REVIEW
};

/* ------------------------------------------------------------------ */
/* Interface copy. Tone follows the site: short sentences, no          */
/* exclamation marks, no emoji. Drafts are marked REVIEW.              */
/* ------------------------------------------------------------------ */

export const LANDING_COPY = {
  // SEO carries the searched words ("siap pakai AI", "sistem operasional bisnis", "bisnis masih manual").
  metaTitle: 'Bisnis Anda siap pakai AI? Cek sistem operasionalnya dalam 5 menit', // REVIEW
  metaDescription:
    'Assessment gratis untuk bisnis yang masih banyak manual. Lihat di mana data operasional Anda hidup, fase bisnis Anda, dan tiga area yang perlu dirapikan sebelum pakai AI.', // REVIEW
  marker: '[ OPSSCORE ] · Cek operasional bisnis', // REVIEW
  headline: {
    lead: 'Bisnis Anda siap pakai AI?', // REVIEW
    accent: 'Cek dulu di mana datanya hidup.', // REVIEW
  },
  lede: 'AI itu langkah ketiga, bukan pertama. Urutannya tercatat, tersistem, baru AI. OpsScore memetakan di mana data operasional bisnis Anda hidup sekarang: di kepala, di chat, di spreadsheet, atau di sistem.', // REVIEW
  getTitle: 'Yang Anda dapat', // REVIEW
  get: [
    'Fase bisnis Anda: Ingatan, Chat, Spreadsheet, atau Sistem.', // REVIEW
    'Skor untuk delapan area, dari penjualan sampai keuangan.', // REVIEW
    'Tiga area prioritas, masing-masing dengan satu langkah konkret. Bisa disimpan sebagai PDF.', // REVIEW
  ],
  meta: ['27 pertanyaan', '±5 menit', 'Gratis'], // REVIEW
  cta: 'Mulai cek',
  phasesTitle: 'Empat fase yang diukur', // REVIEW
  phaseRange: (from: number, to: number) => `${from}–${to}`,
};

export const QUIZ_COPY = {
  brand: 'OpsScore',
  introMarker: '[ OPSSCORE ] · 27 pertanyaan · ±5 menit', // REVIEW
  instruction: 'Jawab sesuai yang benar-benar terjadi, bukan yang seharusnya.',
  scaleTitle: 'Hampir semua pertanyaan menanyakan satu hal', // REVIEW
  scaleQuestion: 'Di mana data bisnis Anda hidup sekarang?', // REVIEW
  scaleNote: 'Pilih tempat yang paling sering dipakai, walau belum rapi.', // REVIEW
  start: 'Mulai',
  lastResult: 'Lihat hasil terakhir Anda', // REVIEW
  resumeTitle: 'Anda pernah mulai cek ini.', // REVIEW
  resumeBody: 'Jawaban Anda tersimpan di perangkat ini.', // REVIEW
  resume: (area: string) => `Lanjutkan dari ${area}`,
  restart: 'Mulai ulang',
  back: 'Kembali',
  next: 'Lanjut',
  nextArea: (area: string) => `Lanjut ke ${area}`,
  seeResult: 'Lihat hasil',
  multiHint: 'Boleh pilih lebih dari satu.', // REVIEW
  remaining: (minutes: number) => (minutes <= 1 ? '±1 menit lagi' : `±${minutes} menit lagi`), // REVIEW
  keyboardHint: 'tekan angka untuk memilih', // REVIEW
  nextUp: (section: string) => `Berikutnya: ${section}`, // REVIEW
  questionPosition: (index: number, total: number) => `Pertanyaan ${index} dari ${total}`,
  sectionCount: (index: number, total: number) => `Bagian ${index} dari ${total}`, // REVIEW
  questionCount: (index: number, total: number) => `${index}/${total}`,
  feedbackMarker: 'Skor area', // REVIEW
  tapHint: 'Ketuk di mana saja untuk lanjut', // REVIEW
  scoring: 'Menghitung hasil', // REVIEW
  console: {
    command: 'opsscore run',
    read: (count: number) => `membaca ${count} jawaban`, // REVIEW
    areas: (count: number) => `menghitung ${count} area`, // REVIEW
    phase: 'fase ditentukan', // REVIEW
    priorities: 'menyusun prioritas', // REVIEW
    done: 'report siap', // REVIEW
  },
  errorTitle: 'Hasil belum bisa dihitung.', // REVIEW
  errorBody: 'Cek koneksi internet, lalu coba lagi. Jawaban Anda tetap tersimpan.', // REVIEW
  retry: 'Coba lagi',
  progressLabel: 'Progres per area', // REVIEW
};

/** Profile screens inside the quiz. Name and business name open it; the rest open their sections. */
export const PROFILE_COPY = {
  name: {
    prompt: 'Siapa nama Anda?', // REVIEW
    placeholder: 'Nama Anda', // REVIEW
  },
  brand: {
    greeting: (firstName: string) => `Halo, ${firstName}.`, // REVIEW
    prompt: 'Apa nama usaha Anda?', // REVIEW
    placeholder: 'Nama brand atau usaha', // REVIEW
    hint: 'Nama yang dikenal pelanggan, tidak harus nama PT.', // REVIEW
  },
  industry: {
    prompt: (brand?: string) => (brand ? `${brand} bergerak di bidang apa?` : 'Bisnis Anda bergerak di bidang apa?'), // REVIEW
    hint: 'Pilih yang paling mendekati.', // REVIEW
  },
  revenue: {
    prompt: (brand?: string) =>
      brand ? `Kira-kira berapa omset ${brand} per bulan?` : 'Kira-kira berapa omset bisnis Anda per bulan?', // REVIEW
    hint: 'Hanya untuk mengelompokkan hasil. Tidak tampil di report.', // REVIEW
  },
  employees: {
    prompt: (brand?: string) =>
      brand ? `Berapa orang di tim ${brand} sekarang?` : 'Berapa orang di tim Anda sekarang?', // REVIEW
    hint: 'Hitung semua yang bekerja rutin, termasuk paruh waktu.', // REVIEW
  },
};

export const RESULT_COPY = {
  metaTitle: 'Hasil OpsScore', // REVIEW
  marker: '[ OPSSCORE ] · Hasil', // REVIEW
  scoreLabel: 'OpsScore bisnis Anda',
  scoreLabelFor: (brand?: string | null) => (brand ? `OpsScore ${brand}` : 'OpsScore bisnis Anda'), // REVIEW
  outOf: '/100',
  phaseOf: (phase: number) => `Fase ${phase} dari 4`,
  areasTitle: 'Skor per area', // REVIEW
  stockSkipped: 'Stok tidak dihitung karena bisnis Anda tidak pegang stok fisik.', // REVIEW
  incompleteTitle: 'Assessment ini belum selesai.', // REVIEW
  incompleteBody: 'Jawaban yang tersimpan di perangkat Anda bisa dilanjutkan.', // REVIEW
  continueQuiz: 'Lanjutkan cek', // REVIEW
};

export const GATE_COPY = {
  marker: '[ REPORT LENGKAP ]', // REVIEW
  title: 'Buka report lengkap', // REVIEW
  intro: 'Report lengkap dan versi PDF-nya kami buka setelah ini. Kami hubungi lewat WA hanya kalau Anda mau.',
  phoneLabel: 'Nomor WhatsApp',
  phonePlaceholder: '0812-3456-7890',
  consent: 'Saya setuju dihubungi Coderoach lewat WhatsApp tentang hasil ini.', // REVIEW
  submit: 'Buka report lengkap', // REVIEW
  submitting: 'Membuka report', // REVIEW
  errors: {
    required: 'Wajib diisi.', // REVIEW
    phone: 'Nomor WA diawali 08, 10–13 digit.', // REVIEW
    consent: 'Centang persetujuan untuk lanjut.', // REVIEW
    server: 'Belum bisa dikirim. Coba lagi sebentar.', // REVIEW
    rateLimited: 'Terlalu banyak percobaan. Coba lagi beberapa menit lagi.', // REVIEW
  },
};

export const REPORT_COPY = {
  prioritiesTitle: (count: number) => (count === 3 ? 'Tiga area prioritas' : 'Area prioritas'), // REVIEW
  noPriorities: 'Tidak ada area yang perlu diprioritaskan. Semua area operasional sudah rapi.', // REVIEW
  scoreOf: (score: number) => `${score}/100`,
  marker: '[ REPORT ]', // REVIEW
  actionLabel: 'Mulai dari sini', // REVIEW
  classTitle: 'Yang kami sarankan', // REVIEW
  savePdf: 'Simpan PDF',
};

export const PRINT_COPY = {
  metaTitle: 'Report OpsScore', // REVIEW
  documentTitle: 'Report OpsScore',
  preparedFor: 'Disusun untuk', // REVIEW
  session: 'Sesi',
  footerUrl: 'coderoach.id/opsscore',
  briefUrl: 'coderoach.id/#contact', // REVIEW
  print: 'Simpan PDF',
  back: 'Kembali ke report', // REVIEW
  hint: 'Di jendela cetak, pilih Simpan sebagai PDF.', // REVIEW
};

export const SHARE_COPY = {
  button: 'Bagikan hasil', // REVIEW
  copied: 'Link tersalin', // REVIEW
  copyPrompt: 'Salin link ini', // REVIEW
  shareTitle: 'Hasil OpsScore', // REVIEW
  shareText: 'Ini fase operasional bisnis kami menurut OpsScore.', // REVIEW
  metaTitle: (phaseTitle: string) => `${phaseTitle} — hasil OpsScore`, // REVIEW
  marker: '[ OPSSCORE ] · Hasil yang dibagikan', // REVIEW
  scoreLabel: 'OpsScore bisnis ini', // REVIEW
  cta: 'Cek bisnis Anda',
  ctaNote: '27 pertanyaan, ±5 menit, gratis.', // REVIEW
};

/** Admin view (/admin/opsscore) — internal, read by the Coderoach team. */
export const ADMIN_COPY = {
  navGroup: 'OpsScore',
  navLink: 'Leads & funnel',
  title: 'OpsScore',
  funnelTitle: (days: number) => `${days} hari terakhir`,
  started: 'Mulai',
  completed: 'Selesai',
  gated: 'Isi gate',
  completionRate: 'Completion rate',
  gateRate: 'Gate conversion',
  filters: {
    qualified: 'Omset ≥ 50 jt',
    withPhone: 'Sudah isi WA',
    phase: 'Fase',
    status: 'Status',
    all: 'Semua',
    apply: 'Terapkan',
    reset: 'Reset',
  },
  exportCsv: 'Ekspor CSV',
  leadsCount: (count: number) => `${count} lead`,
  empty: 'Belum ada lead untuk filter ini.',
  columns: {
    date: 'Tanggal',
    name: 'Nama',
    brand: 'Brand',
    phone: 'WA',
    industry: 'Bidang',
    employees: 'Karyawan',
    revenue: 'Omset',
    phase: 'Fase',
    total: 'Total',
    priorities: 'Prioritas',
    serviceClass: 'Kelas',
    progress: 'Progres',
    intent: 'Intent (H3)',
    source: 'Sumber',
    status: 'Status',
    detail: 'Detail',
  },
  openDetail: 'Buka',
  direct: 'langsung',
  back: '← Semua lead',
  detailTitle: 'Detail sesi',
  sessionMeta: 'Sesi',
  leadTitle: 'Kontak',
  noLead: 'Belum mengisi profil.',
  progress: {
    gated: 'Isi WA',
    completed: 'Selesai, belum isi WA',
    stoppedAt: (section: string) => `Berhenti di ${section}`,
  },
  noPhone: 'Belum isi WA',
  scoresTitle: 'Skor',
  answersTitle: 'Jawaban mentah',
  instrumentVersion: (version: number) => `Instrumen v${version}`,
  statusSaving: 'Menyimpan…',
  statusError: 'Gagal menyimpan',
  followup: {
    new: 'Baru',
    contacted: 'Sudah dihubungi',
    qualified: 'Terkualifikasi',
    not_fit: 'Tidak cocok',
    converted: 'Converted',
  } as Record<string, string>,
  sessionStatus: {
    started: 'Mulai',
    completed: 'Selesai',
    gated: 'Isi gate',
  } as Record<string, string>,
  notFound: 'Sesi tidak ditemukan.',
};
