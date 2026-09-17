/**
 * OpsScore report copy (docs/opsscore-brief.md §6). Components read every string from here or
 * from questions.ts. Lines marked `// REVIEW` are drafts written during the build and need a human
 * pass before release; everything else is taken verbatim from the brief.
 */
import type { AreaId } from './questions';
import type { Band, Phase, ServiceClass } from './scoring';

export const PHASE_COPY: Record<Phase, { title: string; key: string }> = {
  1: {
    title: 'Fase Ingatan',
    key: 'Bisnis Anda berjalan di kepala Anda. AI belum bisa membantu — belum ada yang bisa dibaca.',
  },
  2: {
    title: 'Fase Chat',
    key: 'Datanya ada, berserakan di ratusan grup WA. Kalau ditanya, harus scroll.',
  },
  3: {
    title: 'Fase Spreadsheet',
    key: 'Anda sudah mencatat. Tapi setiap laporan masih butuh satu orang yang menyusunnya.',
  },
  4: {
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
