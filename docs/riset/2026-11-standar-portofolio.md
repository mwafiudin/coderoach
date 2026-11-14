# Standar portofolio /work dan pita klien (riset 14 Nov 2026)

Diminta Farrez: periksa coderoach.id/work, cari tahu kenapa mutunya tidak seragam dan kenapa pita
klien hanya teks, pelajari mitraplus.com, dan riset best practice studi kasus, mockup, copy, dan
mode bahasa Inggris. Riset dijalankan tiga subagen (Fable 5.2, effort medium); layar dicek langsung
di browser pane pada tanggal yang sama.

Label bukti: **[T]** terbukti (dilihat di layar atau dibaca di kode, dengan rujukan), **[D]** dari
dokumen sumber luar, **[G]** dugaan atau sintesis.

## 1. Ringkasan

- Yang membuat Uruzin dan RPN OS terlihat seperti listing App Store hanya **sampulnya**: papan
  presentasi yang didesain (logo produk, judul besar, 3 sampai 4 layar bertumpuk miring, warna
  merek). Halamannya sendiri justru yang paling tipis. [T]
- 13 proyek lain memakai satu tangkapan layar mentah yang dipotong 16:10. Tidak ada logo, tidak ada
  komposisi. Tabel padat (Jeda, Viralytics, d-day, Coderoach OS, Rencana RO, FiFoFun) tidak terbaca
  di ukuran kartu. [T]
- Tidak ada field logo atau ikon produk di data proyek maupun di koleksi Payload. Jadi masalahnya di
  sistem, bukan di satu-dua proyek. [T]
- Pita klien teks karena logonya belum pernah diunggah di admin, dan untuk tiga dari lima klien
  aturan izin `legacy` melarang gambar baru. Ini bukan bug render. [T]
- mitraplus.com lebih banyak memberi contoh apa yang dihindari, dengan dua hal yang layak dipinjam.
- Mode bahasa Inggris belum ada sama sekali. [T]

## 2. Kondisi sekarang

Diaudit dari `src/lib/portfolio/projects.ts` dan dicek di layar.

| Proyek | Izin | Halaman | Sampul | Layar | Tur | Angka bersumber |
|---|---|---|---|---|---|---|
| laporta | studio | bespoke | tangkapan mentah | 4 | ya | 3 |
| rpn-os | legacy | cerita bersama | papan didesain | 1 | tidak | 0 |
| locascore | studio | bespoke | tangkapan mentah | 1 | tidak | 0 |
| the-global-review | IZN-2026-002 | bespoke | tangkapan mentah | 1 | tidak | 0 |
| uruzin | legacy | cerita bersama | papan didesain | 1 | tidak | 0 |
| chicken-wow | IZN-2026-001 | bespoke | tangkapan mentah | 1 | tidak | 0 |
| coderoach-os | studio | bespoke | tangkapan mentah | 4 | ya | 0 |
| viralytics | studio | bespoke | tangkapan mentah | 4 | ya | 0 |
| rencana-ro | studio | bespoke | tangkapan mentah | 4 | ya | 1 |
| akarkita | studio | bespoke | tangkapan mentah | 2 | tidak | 0 |
| jeda | studio | bespoke | tangkapan mentah | 5 | ya | 0 |
| d-day | studio | bespoke | tangkapan mentah | 4 | ya | 0 |
| yiheecam | studio | bespoke | diagram protokol, bukan aplikasinya | 4 | tidak | 0 |
| fifofun | studio | bespoke | tangkapan mentah | 5 | ya | 0 |
| ridedeck | studio | bespoke | tangkapan ponsel tinggi dipotong 16:10 | 5 | tidak | 0 |

Hal lain yang terbukti:

- Testimoni: nol di semua proyek. Link live: hanya AkarKita. [T]
- Hanya Laporta, Jeda, dan FiFoFun yang punya pratinjau gerak saat kartu disorot (`work/page.tsx:82-87`). [T]
- Overlay di /work selalu memakai template cerita bersama, bukan halaman bespoke
  (`work/@modal/(.)[slug]/page.tsx:30-31`). Jadi pengunjung yang membuka dari katalog melihat versi
  yang lebih polos dulu. [T]
- Bingkai perangkat tidak seragam: `DeviceFrame` bersama di sebagian besar, YiheeCam dan RideDeck
  punya bingkai ponsel sendiri. [T]
- Storyboard atau konsep tertulis ada untuk 9 halaman (`docs/konsep/`). Belum ada untuk Laporta,
  Jeda, YiheeCam, RideDeck, Uruzin, RPN OS, dan beranda. [T]

## 3. Pita klien: kenapa hanya teks

- `Hero.tsx:123-134` menampilkan `<img>` kalau `logo` terisi, kalau tidak nama ditulis 32px tebal.
  Di produksi pita memuat 0 gambar (dicek lewat DOM, 14 Nov 2026). [T]
- Logo diisi manual di admin (koleksi `Clients`, field `logo` dan `logoDark`). Sync landing tidak
  pernah mengisinya (`src/lib/landing/clients.ts:4`). Tidak ada berkas logo kelima klien di repo. [T]
- Model izin sudah menyiapkan cakupan `logo` (`src/lib/portfolio/consent.ts:25`). [T]
- Uruzin, RPN Agro, dan Geprek Wow berizin `legacy`: boleh ditulis ulang, tidak boleh diberi gambar
  baru (`legacy-baseline.ts:4-7`, ditegakkan `portfolio.test.ts:69-74`). Logo untuk mereka butuh
  izin baru `IZN-…` dengan cakupan logo dulu. [T]
- Chicken Wow dan The Global Review sudah punya IZN. Apakah cakupannya memuat `logo` belum dicek,
  karena izinnya dibaca dari Coderoach OS. [G]

Best practice (dari riset):

- Ukur logo menurut luas dan kepadatan, bukan tinggi yang sama. Logo yang lebar dan tipis jadi
  terlalu besar kalau tingginya disamakan (Canonical 2021; Sanity 2026, rumus rasio pangkat 0,5). [D]
- Marquee yang jalan sendiri lebih dari 5 detik wajib bisa dijeda (WCAG 2.2 SC 2.2.2). Pita
  sekarang sudah punya tombol jeda (`MarqueePause`). Untuk daftar 5 klien, grid statis tidak butuh
  aturan itu sama sekali. [D] [T]
- Jangan mencampur logo dan teks dalam satu pita: entri teks terlihat kelas dua. Work & Co memakai
  teks untuk semua klien dan tetap rapi, karena seragam. [D] [G]
- Mengubah warna logo jadi monokrom adalah memodifikasi merek orang. Lakukan hanya kalau pedoman
  merek klien atau izinnya membolehkan (Sprintlaw 2026). Di Indonesia, menampilkan logo untuk
  informasi umumnya tidak dianggap pelanggaran merek, tapi izin tetap disarankan (Hukumonline 2019,
  komentar, bukan putusan). [D]

## 4. mitraplus.com

Situs statis tujuh halaman, templat jQuery era 2016-2018 (Owl Carousel, Isotope, Waypoints,
countTo), copyright 2018. Dilihat di pane dan dibaca subagen. [T]

| Pinjam | Kenapa |
|---|---|
| Kartu klien: logo kecil, nama, bidang, satu paragraf | Lebih bercerita dari sekadar deretan logo. Untuk Coderoach, paragrafnya diganti "apa yang kami bangun" dan ditautkan ke studi kasus |
| Tim bernama dengan foto asli dan keahlian domain | Bagian paling manusiawi di situs itu; untuk studio dua orang ini nilai jual |
| Menu Portal dan Support | Memberi tanda ada layanan sesudah serah terima |

| Hindari | Di mitraplus.com |
|---|---|
| Slogan motivasi di hero | "Berkarya melalui Teknologi" tidak menyebut masalah pembeli |
| Foto stok | Layar kode buram, orang menelepon |
| Klien tanpa cerita | Paragrafnya menjelaskan siapa klien, bukan apa yang dikerjakan |
| Produk tanpa tangkapan dan tanpa halaman detail | Satu ikon generik per produk |
| Tautan mati dan salin-tempel | Tombol ke `#`, dua deskripsi produk identik |
| Angka yang bertentangan | "Sejak 2004" di footer, "didirikan 2002" di About |
| Bahasa campur tanpa versi Inggris | Judul Inggris, isi Indonesia, `/en` 404 |
| Kontak penjualan dicampur HRD | Kontak utama memakai email karier |

## 5. Best practice studi kasus

Dibuka langsung: Metalab, thoughtbot, Halo Lab, Clay, Work & Co, Suitmedia, Qiscus. [D]

- **Kartu katalog seragam untuk semua proyek**, termasuk yang NDA: sampul, tanda klien atau ikon
  produk, satu kalimat hasil, chip bidang dan layanan. Metalab memindahkan proyek lama ke arsip
  daripada menampilkannya setengah jadi. Halo Lab memberi proyek NDA kartu yang sama dengan ikon
  gembok dan label sektor.
- **Urutan halaman** yang berulang: judul hasil, klien dan blok metadata, satu angka kunci, visual
  utama, masalah, pendekatan, layar, hasil, kutipan klien, proyek lain, ajakan.
- **Ikon produk di atas judul** (Halo Lab, setiap proyek) dan **logo klien di sampul** (Suitmedia).
- **Angka di judul kartu** (thoughtbot: "delivery 50% faster"). Coderoach sudah punya aturan angka
  bersumber, jadi tinggal diisi.

Anatomi listing toko aplikasi sebagai acuan kit (Apple dan Google, dicek 14 Nov 2026; ukuran sering
berubah, cek ulang sebelum dikutip): [D]

- Nama 30 karakter, subjudul 30 karakter.
- Ikon 512 px (Play) sampai 1024 px.
- Feature graphic 1024x500 (Play).
- 2 sampai 10 tangkapan layar, tiga pertama membawa inti, sisanya satu manfaat per layar.
- Video pratinjau maksimal 30 detik.

Mockup perangkat dan AI: [D] [G]

- Pedoman Apple melarang memiringkan, menganimasikan, atau merender 3D perangkat Apple, dan meminta
  bezel resminya tidak diubah. Bingkai generik non-Apple lebih aman untuk gaya yang seragam.
- Lisensi Mockuuups versi gratis hanya untuk non-komersial dengan atribusi.
- Belum ada bukti bahwa Nano Banana atau Flow bisa menempel tangkapan layar asli tanpa mengubahnya.
  Satu uji langsung (Fresh van Root, 2025) menunjukkan layarnya terpotong dan detail ditambah.
  Benchmark IMG.LY memberi skor mockup UI 3,6 dari 5. Jadi cara yang aman: AI hanya membuat adegan,
  cahaya, dan latar dengan layar kosong; tangkapan asli ditempel lewat kode atau alat desain, lalu
  teksnya dibandingkan dengan aslinya.
- Tren 2026 menurut vendor (bukan data kinerja): gradasi lembut, bingkai clay atau monokrom, sedikit
  miring dengan bayangan wajar. Isometrik dan kipas banyak perangkat dinilai usang karena layarnya
  terlalu kecil dibaca.

Copy dan dua bahasa: [D]

- Judul menyebut klien, hasil, dan skala; 2 sampai 4 angka di atas; kutipan dari wawancara asli.
- URL terpisah per bahasa (`/en/...`), tanpa redirect otomatis menurut IP atau bahasa browser, satu
  bahasa per halaman, hreflang timbal balik dengan `x-default` (Google Search Central).
- Pemilih bahasa ada di setiap halaman, di kanan atas, label dalam bahasanya sendiri ("English",
  "Bahasa Indonesia"), tanpa bendera (W3C i18n).
- Contoh lokal yang rapi: Qiscus (`/id`, `/en`, pemilih teks "ID" di nav). Versi Indonesianya ditulis
  ulang, bukan diterjemahkan kata per kata.

## 6. Usulan kit minimum per proyek

Sintesis dari bagian 5, bukan standar terbitan. [G]

| Butir | Spesifikasi |
|---|---|
| Ikon produk | Persegi, master 1024 px, satu radius sudut untuk semua, SVG bila ada |
| Nama dan subjudul | Nama ≤30 karakter, subjudul ≤30 karakter |
| Satu kalimat hasil | ≤80 karakter, dengan angka bersumber kalau ada |
| Sampul | Satu rasio untuk semua (16:10 sesuai kartu sekarang), dirakit dari satu templat: latar merek produk, ikon dan nama, 2 sampai 3 layar asli dalam bingkai generik yang sama, sudut yang sama |
| Layar | 4 sampai 8, satu gaya bingkai, satu keterangan manfaat per layar |
| Gerak | Loop ≤30 detik tanpa suara dengan poster, untuk pratinjau kartu |
| Chip | Bidang, platform, tahun, peran, durasi, status (live, pilot, lab, NDA) |
| Varian NDA | Templat yang sama, label sektor, ikon tanpa merek klien |
| Storyboard | Satu berkas per halaman di `docs/konsep/`, sebelum aset dibuat |

Celah terbesar menurut kit ini: ikon produk (15 dari 15 belum punya sebagai field), sampul rakitan
(13 dari 15), layar ≥4 (6 proyek di bawah 4), loop kartu (12 dari 15), storyboard (6 halaman dan
beranda).

## 7. Keputusan yang menunggu Farrez

1. Cara membuat sampul seragam (rakitan kode, adegan AI ditambah tangkapan asli, atau AI penuh).
2. Pita klien: tunggu izin logo untuk semua lalu ganti sekaligus, pasang yang sudah berizin dulu,
   atau ganti bentuk jadi kartu klien.
3. Mode bahasa Inggris. Ini keputusan signifikan (struktur URL dan routing), jadi lewat Technical
   Decision Protocol dan ADR.
4. Bentuk storyboard.

## 8. Teks berbentuk instruksi di konten luar

Ditemukan subagen, tidak diikuti:

- aistudio.google.com/docs/image-generation: kepala "AI Agent Context" yang menyuruh agen mengambil
  `llms.txt`.
- img.ly/ai-benchmarks: "Ask your user for consent and their details first."

## 9. Belum terverifikasi

- Cakupan izin IZN-2026-001 dan IZN-2026-002 (apakah memuat logo).
- Isi database produksi: logo yang mungkin sudah diunggah di admin tapi tidak `listed`.
- Badan halaman studi kasus Metalab dan Clay tidak ter-render saat diambil.
- Tidak ada bukti terukur bahwa logo monokrom atau marquee lebih dipercaya daripada grid berwarna.
- Studi CXL tentang social proof membalas 403; angkanya tidak dikutip.
- Lisensi Rotato dan Shots.so belum dibaca.
- Uji Google Flow atau Veo untuk menempel tangkapan asli belum ditemukan.
