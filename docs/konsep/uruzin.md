# Konsep: halaman bespoke Uruzin OS (/work/uruzin)

Tanggal: 2026-11-14. Jenis: storyboard scroll untuk halaman proyek bespoke (ADR 0013), sebelum
aset dibuat. Format: `docs/konsep/storyboard/FORMAT.md`, data sketsa di
`docs/konsep/storyboard/uruzin.json`.

## Ketergantungan izin (dibaca dulu)

- Hari ini entri `uruzin` berizin `legacy` (`src/lib/portfolio/projects.ts`, slug `uruzin`). Copy
  boleh ditulis ulang, tapi tidak boleh diberi gambar atau angka baru
  (`src/lib/portfolio/legacy-baseline.ts`, angka yang boleh hanya `2023` dan `2026`). [terbukti, baca kode]
- `bespokeBlocker()` di `src/lib/portfolio/bespoke.ts` menolak halaman bespoke untuk entri
  `legacy`, jadi halaman ini tidak bisa tayang sama sekali sebelum izinnya berganti. [terbukti, baca kode]
- Farrez menyatakan 14 Nov 2026 bahwa semua klien sudah memberi izin. Yang dibutuhkan: izin itu
  dicatat di Coderoach OS sebagai `IZN-2026-NNN` dengan cakupan `nama`, `logo`, `tangkapan`
  (dan `angka` kalau nanti ada angka terukur), lalu `consent` di `projects.ts` diganti, `uruzin`
  dibuang dari `LEGACY_ENTRIES`, dan slugnya ditambahkan ke `BESPOKE_SLUGS`. Sebelum itu,
  storyboard ini hanya rencana.
- Semua tangkapan baru diambil dari akun demo dengan data contoh. Sampul yang tayang sekarang memuat
  nama dan email seorang staf (layar login dan kepala dashboard); tangkapan baru tidak boleh
  memuatnya. [terbukti, dilihat di `scripts/portfolio-assets/portfolio-uruzin-os.webp`]

## Brief

| Butir | Isi |
|---|---|
| Tujuan | Setelah membaca, pemilik jasa profesional (konsultan, kantor jasa) percaya bahwa pekerjaan panjang yang melewati banyak tim bisa dilihat dari satu tempat, dan bahwa tagihannya tidak tertinggal di belakang pekerjaannya. |
| Pembaca | Pemilik atau direktur kantor jasa dengan beberapa tim (sales, operasional, keuangan), membaca di laptop kantor. Bukan orang teknis. |
| Insight | Di jasa perizinan, satu klien adalah rangkaian pekerjaan panjang yang berpindah tangan. Yang tertahan dan yang belum ditagih baru ketahuan saat klien menanyakannya. Sumber: `projects.ts` (summary.problem, body). |
| Satu pesan | Satu klien diikuti dari konsultasi pertama sampai izin terbit dan tagihan lunas, jadi yang tertahan terlihat sebelum klien bertanya. |
| Bukti | Alur layanan, pipeline dan peluang, penawaran, pengurusan sampai izin terbit; keuangan penuh di sisi yang sama (invoice, pembelian, biaya, kas dan bank, bagan akun, aset tetap, pajak); dashboard yang membuka hari dengan yang perlu ditagih dan yang lewat jatuh tempo; papan tugas per tim (Sales, Finance, Operasional, Creative, Marketing, IT) dengan prioritas dan tenggat; kinerja per orang dan laporan produktivitas; kerja sama sejak 2023 lewat situs perusahaan. Semua dari `projects.ts`. Tidak ada angka terukur. |
| Identitas | Dari repo aplikasi klien (`Coderoach Studio/klien/uruzin/uruzin-app/tailwind.config.ts` dan `src/app/globals.css`), dicocokkan dengan sampul: hijau merek `#21663a`, hijau tua `#1a5230`, latar `#f7faf6`, tinta `#141614`, gradasi logo `#017641` ke `#019b5a`, Poppins untuk judul, Roboto untuk teks. Tanda logo: huruf U dari dua daun (`public/brand/logo-mark.svg`). Sampul memakai judul kapital tebal ("SYSTEM OPERATIONS & FINANCE") yang lebih rapat dari Poppins; hurufnya **diduga** dari papan presentasi saja, bukan dari aplikasi. |
| Batasan | Bahasa Indonesia, terbaca tanpa JS, LCP ≤2,5 s, CLS <0,1, reduced-motion, 320 sampai 1440 px. Pin hanya di layar ≥1024×900. Tidak ada angka di luar `2023` dan `2026` sampai ada izin `angka` dan sumbernya. Nama klien Uruzin di contoh tidak dipakai; berkas klien contoh tidak bernama perusahaan sungguhan. |

## Halaman sekarang

Template cerita bersama (`src/app/(frontend)/work/_story/ProjectStory.tsx`), karena `uruzin` tidak
ada di `BESPOKE_SLUGS`. Tinggi dalam vh adalah perkiraan dari padding di kode, belum diukur.

| # | vh (perkiraan) | Adegan | Berkas |
|---|---|---|---|
| 1 | 0–130 | Hero: nama, tagline, Masalah/Solusi/Hasil, lalu sampul papan presentasi apa adanya | `_story/StoryHero.tsx:17-18,65-68` |
| 2 | – | MetricBand, FeatureScene, TourChapter, StoryTimeline: kosong, tidak dirender (tidak ada `metrics`, `features`, `showcase`, `timeline`) | `_story/ProjectStory.tsx:40-44` |
| 3 | 130–300 | "Cerita lengkap": tiga h2 dan paragraf dari `body`, kolom Stack di kanan | `_story/ProjectStory.tsx:59-79` |
| 4 | 300–340 | Sumber | `_story/Sources.tsx` |

Tidak ada gerak selain reveal bawaan StoryEnhancer. Sampul adalah satu-satunya visual.

## Storyboard scroll

| # | scroll vh | layar | koreografi | gerak | ponsel | reduced-motion | aset |
|---|---|---|---|---|---|---|---|
| A1 | 0–100 | Hero: "Uruzin OS" Poppins 700, tagline, Masalah/Solusi/Hasil di kiri; sampul di kanan bawah | none | Tidak ada; jawaban tampil dulu | Sampul di bawah ringkasan, lebar penuh | Sama | ada: `portfolio-uruzin-os.webp` (sementara; diganti sampul rakitan setelah izin) |
| A2 | 100–320 | "Satu berkas, banyak tangan": map berkas klien contoh di tengah, enam pos di atasnya (Peluang, Penawaran, Pengurusan, Izin terbit, Invoice, Lunas), satu kalimat per pos di kiri | pin-scrub | Map bergeser dari pos ke pos mengikuti gulir; di Izin terbit cap hijau menempel, di Lunas tanda invoice berganti | Tanpa pin: enam pos jadi daftar tegak, map kecil di setiap pos | Daftar enam pos, map di pos Lunas dengan cap Izin terbit | belum: ilustrasi HTML/CSS (tanpa berkas gambar) |
| A3 | 320–440 | "Hari dibuka dari yang perlu ditagih": tangkapan dashboard di bingkai browser, daftar lima hal di kiri | shared-element | Kartu invoice dari A2 mengecil dan mendarat di baris "perlu ditagih" dashboard; lalu lima baris di kiri menyala sesuai urutan copy | Tangkapan dipotong ke kartu atas; kartu invoice tidak terbang, hanya muncul | Kartu invoice dan dashboard tampil berdampingan, crossfade | belum: `uruzin-dashboard.v1.webp` |
| A4 | 440–560 | "Yang tertahan terlihat lebih dulu": papan tugas per tim, satu kartu lewat tenggat diberi cincin hijau tua | quiet-reveal | Kolom papan muncul pelan satu per satu; cincin pada kartu tertahan muncul terakhir | Satu kolom saja, digeser dengan potongan gambar | Papan utuh dengan cincin sudah terpasang | belum: `uruzin-tugas.v1.webp` |
| A5 | 560–680 | "Visibilitas, bukan pengawasan": kartu "Kinerja saya" di kiri, laporan produktivitas manajemen di kanan | quiet-reveal | Dua layar masuk pelan berurutan, hanya opasitas dan geser kecil | Bertumpuk, kinerja dulu | Dua layar tampil diam | belum: `uruzin-kinerja.v1.webp`, `uruzin-produktivitas.v1.webp` |
| A6 | 680–760 | "Dari situs ke sistem": dua titik di satu garis, 2023 situs perusahaan dan 2026 sistem harian | quiet-reveal | Garis hijau digambar sekali dari 2023 ke 2026 | Sama, tegak | Garis sudah penuh | belum (opsional): `uruzin-situs.v1.webp` |
| A7 | 760–820 | Sumber dan proyek lain | none | Tidak ada | Sama | Sama | ada (template) |

Teks layar (bahasa lisan, isinya dari `projects.ts`). Judul adegan di bawah masih **draf satu
versi**: sebelum dibangun, tiap judul lewat prosedur `references/kerajinan-kalimat.md` skill
`bahasa-lisan` (2 sampai 3 pilihan per baris, Farrez memilih). Sapaan "Anda" (PRODUCT.md).

- A2 judul: "Satu klien, satu berkas yang berpindah tangan." Pos: "Peluang masuk", "Penawaran
  dikirim", "Dokumen diurus", "Izin terbit", "Invoice dibuat", "Tagihan lunas".
- A3 judul: "Pagi dibuka dari yang perlu ditagih." Daftar: pendapatan bulan berjalan, invoice yang
  perlu ditagih dan yang lewat jatuh tempo, pekerjaan yang siap ditagih, total piutang, arus kas
  enam bulan terakhir.
- A4 judul: "Yang tertahan kelihatan sebelum klien bertanya."
- A5 judul: "Visibilitas, bukan pengawasan." Satu kalimat: "Setiap orang melihat tugas dan
  kinerjanya sendiri. Manajemen membaca gambaran yang sama, tanpa rapat status tambahan."
- A6 judul: "Mulai dari situs, lanjut ke sistem."

## Yang membuat lebih menarik

| Upgrade | Hari ini | Kenapa |
|---|---|---|
| A2 satu artefak yang berganti keadaan | Tiga paragraf menceritakan alur | Pin dan scrub cocok untuk alur kerja berurutan (riset koreografi); pembaca melihat satu berkas melewati enam pos, bukan membaca daftar |
| A3 berkas yang sama mendarat di dashboard | Dashboard hanya disebut di paragraf | Shared element membuktikan tagihan di dashboard berasal dari pekerjaan yang sama; inti pesannya "tagihan tidak tertinggal" |
| A4 kartu tertahan disorot | Tidak ada | Menunjuk satu benda yang pembaca kenali dari kantornya sendiri |
| A5 quiet reveal untuk kinerja | Tidak ada | Topik kinerja staf mudah terbaca sebagai pengawasan; gerak pelan tanpa pin menjaga nadanya, seperti Jeda |
| Identitas hijau Uruzin | Halaman memakai token situs Coderoach | Halaman bespoke memakai identitas produknya (ADR 0013) |
| Empat layar asli | Satu papan presentasi | Kit portofolio minta ≥4 layar; setiap layar punya satu tugas di cerita |

Pelajaran yang dipakai: pin ≤220vh dan hanya ≥1024×900 (Laporta, LocaScore); topik yang bisa terasa
sensitif pakai quiet reveal (Jeda); data contoh tidak meniru nama asli; teks tetap di DOM dan
halaman berhenti di keadaan selesai.

## Kit portofolio

| Butir | Status | Catatan |
|---|---|---|
| Ikon atau logo produk | Ada di repo klien, belum di situs | `uruzin-app/public/brand/logo-mark.svg`; butuh cakupan `logo` |
| Sampul rakitan | Belum | Sampul sekarang papan presentasi yang didesain, bagus tapi beda templat dengan proyek lain; menunggu keputusan cara membuat sampul seragam (riset 14 Nov, butir 7.1) |
| ≥4 layar | 1 dari 4 | Dashboard, tugas, kinerja, produktivitas (A3 sampai A5) |
| Loop kartu | Belum | Loop ≤30 detik tanpa suara: papan tugas, kartu dipindah ke Selesai, dengan poster |
| Logo klien di pita | Belum | `logo-full-green.png` dan `logo-full-white.png` ada di repo klien; butuh cakupan `logo` dan unggahan di admin `Clients` |

## Aset yang perlu dibuat

Semua setelah izin `IZN-…` tercatat; diambil dari akun demo dengan data contoh, tanpa nama dan email
staf sungguhan. Simpan di `scripts/portfolio-assets/`.

| Berkas | Isi | Adegan |
|---|---|---|
| `uruzin-dashboard.v1.webp` | Dashboard, 1440 lebar, kartu ringkasan dan arus kas | A3 |
| `uruzin-tugas.v1.webp` | Papan tugas dengan tiga kolom dan satu kartu lewat tenggat | A4 |
| `uruzin-kinerja.v1.webp` | Panel "Kinerja saya" | A5 |
| `uruzin-produktivitas.v1.webp` | Laporan produktivitas | A5 |
| `uruzin-situs.v1.webp` (opsional) | Situs perusahaan dari 2023 | A6 |
| `uruzin-tugas-loop.v1.mp4` + poster | Loop kartu ≤30 detik | kartu /work |
| `uruzin-ikon.v1.svg` | Salinan `logo-mark.svg` | ikon produk |
| Logo klien | `logo-full-green.png`, `logo-full-white.png` | pita klien |
