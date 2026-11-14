# Konsep: halaman bespoke RPN OS (/work/rpn-os)

Tanggal: 2026-11-14. Jenis: storyboard scroll untuk halaman proyek bespoke (ADR 0013), sebelum
aset dibuat. Format: `docs/konsep/storyboard/FORMAT.md`, data sketsa di
`docs/konsep/storyboard/rpn-os.json`.

## Ketergantungan izin (dibaca dulu)

- Hari ini entri `rpn-os` berizin `legacy` (`src/lib/portfolio/projects.ts`, slug `rpn-os`): copy
  boleh ditulis ulang, tanpa gambar atau angka baru. Angka yang sudah tayang dan boleh dipakai:
  `2026`, `23`, `25`, `33,9`, `397`, `580`, `62`, `643` (`legacy-baseline.ts`). [terbukti, baca kode]
- `bespokeBlocker()` (`src/lib/portfolio/bespoke.ts`) menolak halaman bespoke untuk entri `legacy`.
  Halaman ini baru bisa tayang setelah izin Farrez (14 Nov 2026: semua klien sudah mengizinkan)
  dicatat di Coderoach OS sebagai `IZN-2026-NNN` dengan cakupan `nama`, `logo`, `tangkapan`, dan
  `angka` (untuk A8). Lalu `consent` diganti, `rpn-os` dibuang dari `LEGACY_ENTRIES`, slug masuk
  `BESPOKE_SLUGS`, dan angka di A8 dipindah ke `metrics` dengan sumbernya supaya tertaut ke Sumber.
- Sampul sekarang memuat nama orang di panel absensi dan surat jalan (penerima, sopir). Tangkapan
  baru diambil dari data contoh atau namanya dikaburkan. [terbukti, dilihat di
  `scripts/portfolio-assets/portfolio-rpn-os.webp`; apakah namanya nama asli belum dicek]

## Brief

| Butir | Isi |
|---|---|
| Tujuan | Setelah membaca, pemilik dapur produksi atau usaha makanan dengan banyak outlet percaya bahwa HPP per batch bisa dihitung dari harga bahan yang benar-benar dipakai, dan bahwa pembukuannya ikut tertulis di setiap langkah. |
| Pembaca | Pemilik atau direktur rumah produksi F&B dan jaringan outlet, membaca di laptop. Paham dagang, belum tentu paham akuntansi. |
| Insight | Harga cabai berubah setiap kali belanja, jadi HPP rata-rata menyembunyikan untung rugi tiap batch. Sumber: `projects.ts` (tagline, summary.problem: "Tanpa jejak dari bahan ke batch ke surat jalan, HPP hanya tebakan rata-rata"). |
| Satu pesan | Setiap batch sambal tahu harga cabai yang benar-benar masuk ke dalamnya, dan setiap dokumen menulis jurnalnya sendiri. |
| Bukti | Rantai PO, kedatangan barang, faktur supplier, pembayaran, plus jalur belanja pasar tanpa PO; lapisan FIFO per kedatangan; batch beberapa hari dengan tahap antara Cabe Selep; susut masuk HPP, kerugian nyata jadi write-off; surat jalan bernomor resmi, konfirmasi outlet, invoice, jatuh tempo per termin; jurnal double-entry per dokumen, PPN per baris, PPh, aset tetap disusutkan ke HPP, rekonsiliasi bank, tutup buku; HR (shift, absensi geofence, upah porsi jam, slip); wewenang per modul; cutoff 23 Agustus 2026 dengan 397 invoice historis, 643 baris pengeluaran Rp580 juta, aset tetap Rp62 juta, 25 pembayaran ganda Rp33,9 juta. Semua dari `projects.ts`. |
| Identitas | Dari repo aplikasi klien (`Coderoach Studio/klien/rpn-app/app/globals.css`, komentarnya: diambil dari rpn-agro.com), dicocokkan dengan sampul: tinta hijau hampir hitam `#06150a`, hijau hutan `#1a5c41` (sidebar dan tombol), lime `#aecc34` (garis aksen di bawah judul sampul), emas `#fccb28`, mint `#ceebd5`, kanvas `#fafbfa`. DM Sans untuk judul, Open Sans untuk teks (`app/layout.tsx`). Logo daun R (`app/icon.svg`). Judul sampul ("ONE SYSTEM. EVERY OPERATION.") memakai huruf kapital rapat yang bukan DM Sans; hurufnya **diduga** khusus papan presentasi. |
| Batasan | Bahasa Indonesia, terbaca tanpa JS, LCP ≤2,5 s, CLS <0,1, reduced-motion, 320 sampai 1440 px. Pin hanya ≥1024×900. Ilustrasi lapisan FIFO tanpa angka harga (harga digambar sebagai tinggi batang), karena angka contoh pun termasuk angka baru di entri ini. |

## Halaman sekarang

Template cerita bersama (`src/app/(frontend)/work/_story/ProjectStory.tsx`). Tinggi vh perkiraan
dari kode, belum diukur.

| # | vh (perkiraan) | Adegan | Berkas |
|---|---|---|---|
| 1 | 0–130 | Hero: nama, tagline, Masalah/Solusi/Hasil, sampul papan presentasi apa adanya | `_story/StoryHero.tsx:17-18,65-68` |
| 2 | – | MetricBand, FeatureScene, TourChapter, StoryTimeline kosong, tidak dirender | `_story/ProjectStory.tsx:40-44` |
| 3 | 130–360 | "Cerita lengkap": empat h2 dan paragraf `body`, termasuk semua angka cutoff dalam satu paragraf panjang; kolom Stack | `_story/ProjectStory.tsx:59-79` |
| 4 | 360–400 | Sumber | `_story/Sources.tsx` |

Angka cutoff yang paling kuat terkubur di paragraf terakhir dan tidak tertaut ke Sumber, karena
`metrics` kosong.

## Storyboard scroll

| # | scroll vh | layar | koreografi | gerak | ponsel | reduced-motion | aset |
|---|---|---|---|---|---|---|---|
| A1 | 0–100 | Hero: "RPN OS" DM Sans 700 dengan garis lime, tagline, Masalah/Solusi/Hasil; sampul di kanan | none | Tidak ada | Sampul di bawah ringkasan | Sama | ada: `portfolio-rpn-os.webp` (sementara) |
| A2 | 100–140 | Pembuka rantai: empat tahap Pembelian, Produksi, Distribusi, Pembukuan | progress-rail | Rel tipis menempel di kiri dari A3 sampai A6, tahap aktif terisi hijau hutan; tiap tahap tautan ke adegannya | Rel disembunyikan; judul adegan sudah menyebut tahapnya | Rel diam, tahap aktif hanya dari tautan | belum: HTML/CSS |
| A3 | 140–360 | "Harga di setiap lapisan": rak lapisan bahan di kanan, setiap kedatangan satu lapisan dengan batang harga sendiri; jalur kedua "Belanja pasar, tanpa PO"; batch sambal di bawah | pin-scrub | Lapisan masuk satu per satu; batch mengambil dari lapisan paling lama dulu, sisanya dari lapisan berikut; bahan lewat Cabe Selep; HPP batch tersusun dari potongan batang yang terpakai | Tanpa pin: empat langkah bertumpuk, rak digambar sekali per langkah | Rak penuh, batch selesai, HPP tersusun, keempat kalimat tampil | belum: HTML/CSS; `rpn-batch.v1.webp` |
| A4 | 360–440 | "Susut dan kerugian dicatat terpisah": dua kolom, Susut proses masuk HPP, Kerugian nyata jadi write-off | quiet-reveal | Dua kolom muncul pelan berurutan | Bertumpuk | Diam | belum: HTML/CSS |
| A5 | 440–580 | "Satu baris, sampai ke piutang": baris hasil batch tampil di surat jalan, lalu konfirmasi outlet, invoice, dan piutang dengan jatuh tempo | shared-element | Baris yang sama berpindah dari dokumen ke dokumen; status Dikirim, Diterima, Ditagih menyala bergantian | Dokumen bertumpuk, baris disorot di tiap dokumen tanpa terbang | Empat dokumen berdampingan, crossfade | belum: `rpn-surat-jalan.v1.webp`, `rpn-invoice.v1.webp` |
| A6 | 580–760 | "Jurnal di bawah setiap langkah": kartu PO, kedatangan, surat jalan, invoice, pembayaran; tiap kartu menunjukkan jurnal debit dan kreditnya | sticky-stack | Kartu menumpuk satu per satu, kartu terakhir menutup dengan PPN, PPh, penyusutan ke HPP, rekonsiliasi, tutup buku | Kartu lebih pendek dari layar, bergulir biasa | Kartu tersusun tanpa gerak | belum: `rpn-jurnal.v1.webp` |
| A7 | 760–830 | "Wewenang per modul": dua kartu peran, manajemen operasional melihat Produksi, tidak melihat Kas dan Nilai persediaan | quiet-reveal | Modul yang tidak dilihat meredup pelan, diberi gembok dari set ikon | Bertumpuk | Sudah redup, gembok terpasang, label teks ikut | belum: HTML/CSS |
| A8 | 830–960 | "Buku dibuka dari posisi benar": cutoff 23 Agustus 2026, lalu 397 invoice, 643 baris Rp580 juta, aset tetap Rp62 juta, 25 pembayaran ganda Rp33,9 juta | number-reveal | Angka sudah ada di HTML; saat masuk layar tiap angka naik dari redup ke penuh dan garis bawah lime tergambar, tanpa hitung naik | Satu angka per baris | Angka penuh, garis sudah ada | ada di copy; sumber `metrics` belum |
| A9 | 960–1020 | Sumber dan proyek lain | none | Tidak ada | Sama | Sama | ada (template) |

Teks layar, draf satu versi (judul lewat `references/kerajinan-kalimat.md` skill `bahasa-lisan`
sebelum dibangun; sapaan "Anda"):

- A3: "Setiap kedatangan bahan jadi lapisan dengan harganya sendiri." "Batch mengambil dari lapisan
  paling lama dulu." "Sambal lewat Cabe Selep sebelum dimasak." "HPP batch ini dari harga bahan yang
  benar-benar masuk."
- A4: "Susut proses masuk HPP. Kerugian nyata dicatat sendiri sebagai write-off, jadi keduanya
  tidak saling menyamar."
- A5: "Surat jalan mengeluarkan stok, outlet mengonfirmasi, invoice terbit, dan jatuh temponya
  ikut termin outlet itu."
- A7: "Wewenang tidak menempel pada jabatan."
- A8: "Sebelum buku dibuka, data lama dibersihkan dulu."

## Yang membuat lebih menarik

| Upgrade | Hari ini | Kenapa |
|---|---|---|
| A3 rak lapisan FIFO dalam pin | FIFO hanya disebut di paragraf | Tagline menjanjikan "tahu berapa harga cabai di setiap batch"; pin dan scrub memperlihatkan satu batch mengambil dari lapisan yang benar, alur berurutan yang cocok untuk pin |
| A2 rel empat tahap | Tidak ada | Cerita ini panjang (pembelian sampai tutup buku); progress rail memberi peta dan bisa diklik |
| A5 satu baris berpindah dokumen | Distribusi satu paragraf | Shared element membuktikan invoice dan piutang berasal dari baris yang sama dengan surat jalan |
| A6 tumpukan kartu jurnal | Akuntansi satu paragraf padat | Lima dokumen setara, satu kartu masing-masing: bentuk sticky stack |
| A8 angka cutoff dijadikan bab | Terkubur di paragraf terakhir, tanpa tautan Sumber | Number reveal hanya untuk hasil terukur, dan ini angka terukur yang sudah tayang; nilainya ada di HTML sejak awal |
| Identitas hijau dan lime RPN | Token situs Coderoach | Halaman bespoke memakai identitas produknya |

Pelajaran yang dipakai: pin ≤220vh dan hanya ≥1024×900 (Laporta, LocaScore); nilai akhir angka
sudah ada di HTML (aturan number reveal di DESIGN.md). Pilihan baru dari storyboard ini: angka
tidak dihitung naik dari nol, karena angka di tengah hitungan adalah angka yang salah dan bisa
terbaca pembaca layar; harga contoh digambar tanpa angka supaya tidak menambah angka baru; nama
orang di tangkapan tidak ikut tayang.

## Kit portofolio

| Butir | Status | Catatan |
|---|---|---|
| Ikon atau logo produk | Ada di repo klien, belum di situs | `rpn-app/app/icon.svg`, `lib/logo-paths.ts`; butuh cakupan `logo` |
| Sampul rakitan | Belum | Sampul sekarang papan presentasi; menunggu keputusan sampul seragam (riset 14 Nov, butir 7.1) |
| ≥4 layar | 1 dari 4 | Batch produksi, surat jalan, invoice dan piutang, jurnal |
| Loop kartu | Belum | Loop ≤30 detik: batch dipanen lalu surat jalan dicetak, dengan poster |
| Logo klien di pita | Belum | Pita menyebut RPN Agro dan Geprek Wow sebagai teks; logo RPN Agro belum ada di repo mana pun yang dicek; butuh cakupan `logo` dan unggahan admin |

## Aset yang perlu dibuat

Setelah izin tercatat, dari data contoh, nama orang dikaburkan. Simpan di `scripts/portfolio-assets/`.

| Berkas | Isi | Adegan |
|---|---|---|
| `rpn-batch.v1.webp` | Halaman batch produksi dengan HPP dan yield | A3 |
| `rpn-surat-jalan.v1.webp` | Surat jalan dengan status Dikirim dan Diterima | A5 |
| `rpn-invoice.v1.webp` | Invoice dan piutang per outlet dengan jatuh tempo | A5 |
| `rpn-jurnal.v1.webp` | Jurnal dari satu dokumen | A6 |
| `rpn-batch-loop.v1.mp4` + poster | Loop kartu ≤30 detik | kartu /work |
| `rpn-os-ikon.v1.svg` | Salinan `app/icon.svg` | ikon produk |
| Logo RPN Agro | Dari klien | pita klien |
| Entri `metrics` | Lima angka A8 dengan sumbernya | A8, Sumber |
