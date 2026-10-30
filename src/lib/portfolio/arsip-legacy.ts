/**
 * The rpn-os and uruzin entries exactly as projects.ts carried them until 30 Oct 2026, kept so the
 * old copy can come back unchanged. Both are client entries on legacy consent (ADR 0009): their copy
 * may be reworded, never given new numbers or images, and Wafi may still prefer the old wording.
 *
 * To restore one: replace its object in PORTFOLIO (src/lib/portfolio/projects.ts) with the one
 * here, run `npm test`, then sync production (docs/portfolio-ops.md, step 4). arsip.test.ts keeps
 * these copies whole and checks they still pass the legacy rules, so a restore is always allowed.
 */

import type { PortfolioEntry } from './projects';

export const ARSIP_LEGACY: PortfolioEntry[] = [
  {
    slug: 'rpn-os',
    consent: 'legacy',
    order: 2,
    kind: 'client',
    client: 'RPN OS',
    tagline: 'ERP rumah produksi, dari pembelian bahan sampai buku besar.',
    meta: 'AGRIFOOD · ERP',
    industry: 'manufacturing',
    service: 'build',
    publishedYear: '2026',
    pills: ['NEXT.JS', 'DRIZZLE', 'POSTGRES', 'FIFO'],
    excerpt:
      'Sistem operasi untuk RPN Agro (PT Robbani Permata Niaga), rumah produksi sambal dan greens yang memasok jaringan outlet Geprek Wow. Persediaan FIFO, HPP aktual per batch, dan jurnal double-entry yang menutup buku setiap bulan.',
    cover: {
      file: 'portfolio-rpn-os.webp',
      alt: 'Dashboard RPN OS: nilai persediaan FIFO, batch produksi berjalan, piutang per outlet, dan surat jalan',
      focalX: 1,
      focalY: 50,
    },
    summary: {
      problem:
        'Bahan dibeli dari pasar dan supplier, diolah bertahap, lalu dikirim dan ditagih ke outlet. HPP yang bisa dipertanggungjawabkan harus bisa ditelusuri sampai harga bahan yang benar-benar terpakai.',
      solution:
        'Satu rantai dokumen dari PO sampai pembayaran, persediaan FIFO per lapisan harga, batch produksi dengan HPP dan yield aktual, dan jurnal double-entry di bawah setiap dokumen.',
      result:
        'Pembukuan dimulai dari posisi yang diketahui benar setelah masa uji, dengan invoice historis termigrasi dan pembayaran ganda dibersihkan sebelum buku dibuka.',
    },
    body: [
      { h2: 'Rumah produksi dengan rantai yang panjang' },
      'RPN Agro memproduksi sambal dan greens untuk jaringan outlet Geprek Wow. Bahan datang dari pasar dan supplier, diolah bertahap, lalu dikirim dengan surat jalan dan ditagih dengan invoice. Setiap tahap punya biaya, dan HPP yang bisa dipertanggungjawabkan harus bisa ditelusuri sampai ke harga bahan yang benar-benar terpakai.',
      { h2: 'Setiap dokumen menyambung ke dokumen berikutnya' },
      'Procurement berjalan sebagai rantai: PO, kedatangan barang, faktur supplier, lalu pembayaran, dengan jalur terpisah untuk belanja pasar yang memang tidak pernah punya PO. Setiap kedatangan membentuk lapisan FIFO dengan harga satuannya sendiri.',
      'Produksi mengambil bahan dari lapisan itu. Batch boleh berjalan beberapa hari, dicatat harian dan dipanen saat hasilnya bisa ditimbang, dan sambal melewati tahap antara (Cabe Selep) sebelum dimasak. HPP aktual dan yield terbentuk dari situ. Susut proses melekat ke HPP, sementara kerugian nyata dicatat terpisah sebagai write-off, supaya dua hal yang berbeda tidak saling menyamar.',
      'Distribusi menutup rantainya. Surat jalan bernomor resmi mengeluarkan stok secara FIFO, outlet mengonfirmasi penerimaan, invoice terbit, piutang bertambah, dan jatuh temponya dihitung dari termin masing-masing outlet.',
      { h2: 'Akuntansi di bawah semuanya' },
      'Setiap dokumen memposting jurnal double-entry-nya sendiri. Di atasnya berjalan PPN per baris dan PPh yang dipotong, aset tetap dengan penyusutan bulanan yang masuk ke HPP (bukan beban operasional), rekonsiliasi bank, dan tutup buku yang menghasilkan laporan akrual. HR ikut di dalamnya: jadwal shift, absensi ber-geofence, upah berbasis porsi jam, dan slip yang bisa dicetak.',
      'Hak akses tidak ditentukan oleh jabatan. Setiap wewenang adalah modul tersendiri, sehingga manajemen operasional bisa menjalankan produksi tanpa melihat kas dan nilai persediaan perusahaan.',
      { h2: 'Dari masa uji ke buku sungguhan' },
      'Pada 23 Agustus 2026 sistem menjalani cutoff: masa uji berakhir dan pembukuan dimulai dari posisi yang diketahui benar. Sebelumnya, 397 invoice historis (Januari sampai Juli 2026, sepuluh outlet) dan 643 baris pengeluaran senilai Rp580 juta dimigrasikan, aset tetap Rp62 juta masuk saldo awal, dan 25 pembayaran ganda senilai Rp33,9 juta ditemukan lalu dibersihkan, sekaligus menutup celah yang dulu membiarkan pembayaran melebihi nilai fakturnya.',
    ],
  },
  {
    slug: 'uruzin',
    consent: 'legacy',
    order: 5,
    kind: 'client',
    client: 'Uruzin OS',
    tagline: 'Sistem operasional dan keuangan untuk konsultan perizinan usaha.',
    meta: 'LEGAL SERVICES · ERP',
    industry: 'legal',
    service: 'build',
    publishedYear: '2026',
    pills: ['OPERASIONAL', 'KEUANGAN', 'TASK BOARD'],
    excerpt:
      'Satu sistem untuk Uruzin, dari peluang, penawaran, dan pengurusan izin klien sampai invoice, piutang, dan pajak. Setiap orang melihat pekerjaannya sendiri; manajemen melihat arus kasnya langsung.',
    cover: {
      file: 'portfolio-uruzin-os.webp',
      alt: 'Uruzin OS: halaman login, dashboard pendapatan dan piutang, serta papan tugas per tim',
      focalX: 1,
      focalY: 50,
    },
    summary: {
      problem:
        'Satu klien perizinan berarti rangkaian pekerjaan panjang, dari konsultasi sampai izin terbit. Makin banyak klien, makin sulit melihat pekerjaan yang tertahan dan tagihan yang belum dibayar.',
      solution:
        'Satu sistem yang mengikuti perjalanan klien dari peluang dan penawaran sampai pengurusan izin, dengan keuangan penuh di sisi yang sama: invoice, piutang, kas, aset, dan pajak.',
      result:
        'Dashboard membuka hari dengan yang perlu ditagih dan yang lewat jatuh tempo, dan papan tugas per tim memperlihatkan pekerjaan yang tertahan sebelum klien menanyakannya.',
    },
    body: [
      { h2: 'Satu klien, satu rangkaian pekerjaan panjang' },
      'Uruzin mengurus legalitas dan perizinan usaha: pendirian PT dan CV, NIB, sertifikat halal, BPOM, sampai HAKI. Satu klien berarti satu rangkaian pekerjaan yang panjang, dari konsultasi, penawaran, dan pengumpulan dokumen sampai izinnya terbit. Semakin banyak klien, semakin sulit melihat pekerjaan mana yang tertahan dan tagihan mana yang belum dibayar.',
      { h2: 'Operasional dan keuangan dalam satu alur' },
      'Uruzin OS mengikuti perjalanan satu klien: layanan, pipeline dan peluang, penawaran, lalu pengurusan, tahap ketika dokumen diproses sampai izin terbit. Di sisi yang sama, keuangan berjalan penuh: penjualan dan invoice, pembelian, biaya, kas dan bank, bagan akun, aset tetap, dan pajak.',
      'Dashboard membuka hari dengan angka yang perlu ditindaklanjuti: pendapatan bulan berjalan, invoice yang perlu ditagih beserta yang sudah lewat jatuh tempo, pekerjaan yang siap ditagih, total piutang, dan arus kas enam bulan terakhir.',
      'Pekerjaan harian dikelola sebagai papan tugas per tim (Sales, Finance, Operasional, Creative, Marketing, IT) dengan prioritas dan tenggat, sehingga yang tertahan terlihat sebelum klien menanyakannya.',
      { h2: 'Visibilitas, bukan pengawasan' },
      'Setiap orang melihat tugas dan kinerjanya sendiri: pekerjaan yang selesai, tingkat produktivitas, dan rata-rata waktu penyelesaian. Laporan produktivitas memberi manajemen gambaran yang sama tanpa rapat status tambahan.',
      'Kerja sama dengan Uruzin dimulai pada 2023 lewat situs perusahaannya, dan kini berlanjut ke sistem yang menjalankan operasional hariannya.',
    ],
  },
];

/** When the copy above was taken out of projects.ts. */
export const ARSIP_LEGACY_SINCE = '2026-10-30';
