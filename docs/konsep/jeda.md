# Konsep: halaman bespoke Jeda (/work/jeda)

Tanggal: 2026-11-14. Jenis: storyboard scroll untuk halaman yang sudah tayang (ADR 0013).
Format: `docs/konsep/storyboard/FORMAT.md`. Data sketsa: `docs/konsep/storyboard/jeda.json`.
Dasar: `docs/riset/2026-10-koreografi-scroll.md`, DESIGN.md (Bespoke project pages, Motion
vocabulary), `docs/riset/2026-11-standar-portofolio.md` bagian 6.

**Pagar utama:** Jeda adalah produk kesehatan mental. Pin pernah dicabut dari halaman ini karena
alasan itu (riset koreografi, "Penilaian ulang pilot"). Storyboard ini hanya memakai quiet reveal:
opasitas dan geser kecil, pelan, tanpa pin, tanpa parallax, tanpa angka yang berputar.

## Brief

| Butir | Isi |
|---|---|
| Tujuan | Psikolog, klinik, atau calon klien Coderoach di bidang kesehatan percaya bahwa aplikasi sensitif bisa dibangun dengan tenang: mencatat tanpa menghakimi, dan data tidak pergi ke mana-mana. |
| Pembaca | Psikolog atau pengelola layanan konseling yang menilai alat untuk kliennya; juga pembaca umum yang mungkin sedang menjalani konseling dan peka terhadap gerak. |
| Insight | Pekerjaan rumah CBT tercecer di kertas atau chat dan sering baru ditulis ulang menjelang sesi (`projects.ts` summary.problem). Psikolognya meminta lebih sedikit analisis dan lebih banyak kehadiran (body, "Mencatat, bukan menafsirkan"). |
| Satu pesan | Catatan ditulis saat perasaan berubah, di mana saja, lalu sampai dengan tenang di meja psikolog. |
| Bukti | Fitur dan body di `projects.ts`: catat cepat dengan situasi dan pikiran, tetap jalan tanpa internet, tautan bertoken dengan PIN opsional yang bisa kedaluwarsa dan dicabut, tanpa grafik mood atau streak di layar klien, tanpa SDK analitik. Tidak ada angka terukur, jadi halaman ini tidak memakai number reveal. |
| Identitas | Dari Jeda DESIGN.md: Nunito Sans, kertas abu hangat `#eeebe6`, tinta biru pudar `#4e6a84`, garis buku tulis. |
| Batasan | Quiet reveal saja, tidak pernah dipin. Catatan contoh karangan dan berlabel. Terbaca tanpa JS, LCP ≤2,5 s, CLS <0,1, reduced-motion, 320 sampai 1440 px. |

## Halaman sekarang

Sumber: `src/app/(frontend)/work/_bespoke/jeda/JedaPage.tsx` dan `jeda.css`.

| # | Adegan | Isi | Koreografi sekarang |
|---|---|---|---|
| 1 | Hero | Nama, judul dari `darkChapter.title`, tagline, "Tonton turnya", ponsel `jeda-daftar` di kanan, tiga lembar Masalah/Solusi/Hasil bergaris buku (`JedaPage.tsx:51-98`) | Ponsel melayang 6px terus-menerus, `jdFloat` 6 detik tanpa henti (`jeda.css:25-26`) |
| 2 | Suasana | Foto AI penumpang kereta menulis (`/assets/suasana/jeda-kereta.v1.webp`) | Statis |
| 3 | Satu catatan, dua meja | Tiga langkah, ponsel CSS berisi catatan karangan, jalur titik, tabel psikolog dengan baris "Baru sejak terakhir dibuka" (`JedaPage.tsx:106-172`) | Quiet reveal tanpa pin: catatan menyeberang saat lewat, `--q` dari `--p` 0,15–0,70 (`jeda.css:40-53`) |
| 4 | Fitur | Empat fitur zigzag dengan layar (`JedaPage.tsx:174-203`) | Enter: layar naik 24px dan memudar masuk |
| 5 | Tur | `TourChapter`, tur 50 detik | Video |
| 6 | Sumber | Catatan data karangan | Statis |

Yang kurang: dua paragraf body yang paling membedakan Jeda ("Mencatat, bukan menafsirkan" dan "Data
kesehatan tetap di tempatnya") tidak tampil di halaman sama sekali. Ponsel di hero melayang tanpa
henti: gerak dekoratif yang berjalan lebih dari 5 detik tanpa tombol jeda (WCAG 2.2 SC 2.2.2) dan
bertentangan dengan aturan "slow, small movement only" untuk halaman ini.

## Storyboard scroll

| # | scroll vh | Layar | Koreografi | Gerak | Ponsel | Reduced-motion | Aset |
|---|---|---|---|---|---|---|---|
| A1 | 0–100 | Hero: ikon Jeda di depan eyebrow, judul, tagline, ponsel daftar catatan, tiga lembar | none | **Dihapus:** ponsel tidak melayang lagi | Ponsel di bawah teks | Sama | `jeda-ikon.v1.svg` belum, `jeda-daftar.v1.webp` ada |
| A2 | 100–170 | Foto suasana kereta | none | Tidak ada | Sama | Sama | `jeda-kereta.v1.webp` ada |
| A3 | 170–330 | "Satu catatan, dua meja." | quiet-reveal | Situasi lalu pikiran muncul pelan di ponsel, "Tersimpan di perangkat" menyala, baru catatan menyeberang dan baris baru di tabel menebal | Jalur turun vertikal, urutan sama | Catatan sudah di tabel, bertanda baru | HTML, tanpa berkas |
| A4 | 330–450 | **Baru.** "Mencatat, bukan menafsirkan." Kiri: daftar yang sengaja tidak ada di layar klien. Kanan: tab Ringkasan di laptop psikolog | quiet-reveal | Kolom kiri tampil dulu; layar Ringkasan memudar masuk dan naik ±12px saat melewati garis baca | Teks di atas, layar di bawah | Keduanya tampil langsung | `jeda-ringkasan.v1.webp` ada |
| A5 | 450–540 | **Baru.** Tautan baca-saja untuk psikolog: tiga keadaan tautan, lalu satu paragraf soal data yang tidak keluar | quiet-reveal | Tiga keterangan tautan muncul satu per satu dengan opasitas | Ditumpuk, urutan sama | Semua tampil | HTML, tanpa berkas |
| A6 | 540–900 | Empat fitur zigzag | quiet-reveal | Layar memudar masuk dengan geser dikurangi dari 24px ke 12px | Ditumpuk | Tampil tanpa geser | `jeda-catat-cepat.v1.webp`, `jeda-daftar.v1.webp`, `jeda-catatan-lengkap.v1.webp`, `jeda-tabel-psikolog.v1.webp` ada |
| A7 | 900–1000 | Tur 50 detik | none | Video diputar oleh pembaca | Sama | Poster | `jeda-tur.v1.mp4` ada |
| A8 | 1000–1060 | Sumber | none | Tidak ada | Sama | Sama | Tanpa berkas |

Isi A4 dari body: tidak ada grafik mood, streak, lencana, atau ringkasan otomatis di layar klien;
angka dan grafik hanya di sisi psikolog. Isi A5 dari `features[3].body` dan body kedua. Karena A4
memakai `jeda-ringkasan`, fitur 04 di A6 diganti ke `jeda-tabel-psikolog.v1.webp` (ubah
`features[3].screen` di `projects.ts`), supaya satu layar tidak tampil dua kali.

### Judul dan teks baru: pilihan

Nada B portofolio (`bahasa-lisan/references/kerajinan-kalimat.md`), sapaan Anda, nada tenang untuk
topik kesehatan. Belum final; Farrez memilih.

| Bagian | Pilihan | Rekomendasi |
|---|---|---|
| A4 judul | (a) "Mencatat, bukan menafsirkan." (dari body) (b) "Layar klien hanya untuk menulis." (c) "Grafiknya ada di meja psikolog." | (a): sudah disetujui sebagai copy, satu-satunya kontras di halaman |
| A5 judul | (a) "Data kesehatan tetap di tempatnya." (dari body) (b) "Catatan Anda dibaca psikolog Anda, lewat tautan yang bisa dicabut." (c) "Tautannya Anda yang pegang." | (b): dari sudut pembaca dan bisa dibuktikan dari fitur 04. (a) gagal cek 6, "data" bahasa pembuat |
| A5 keterangan tautan | "PIN bila perlu", "Bisa kedaluwarsa", "Bisa dicabut" | Diturunkan dari `features[3].body`, tanpa klaim baru |
| A5 paragraf | Body asli memuat "SDK analitik", "tracker", dan "font di-host sendiri", yang gagal cek 6 dan 9. Usulan: "Aplikasinya tidak mengirim catatan ke layanan lain. Halaman psikolog tetap terbaca walau browsernya membatasi skrip." | Butuh persetujuan Farrez karena mengubah copy di `projects.ts` |

## Yang membuat lebih menarik

| Perubahan | Sekarang | Sesudah | Kenapa (riset koreografi) |
|---|---|---|---|
| Ponsel hero berhenti melayang | Melayang tanpa henti | Diam | Riset: kesehatan mental berarti "reveal opasitas lambat, tanpa pin dan parallax"; loop lebih dari 5 detik tanpa jeda melanggar SC 2.2.2. Menarik di sini berarti tenang |
| Catatan ditulis dulu, baru menyeberang (A3) | Catatan sudah lengkap sejak awal | Situasi, pikiran, tersimpan, lalu menyeberang | Animasi membantu bila menjelaskan perubahan keadaan (NN/g 2020). Urutannya sama dengan cara kerja app: tulis ke perangkat dulu, sinkron belakangan |
| Pembeda Jeda tampil (A4, A5) | Body tidak dirender | Dua adegan pelan dari body | Bukan efek baru: halaman jadi lebih menarik karena isinya yang paling khas akhirnya terbaca, tanpa menambah gerak |
| Geser fitur dikecilkan (A6) | 24px | 12px | Gerak kecil dan pelan untuk pembaca yang peka gerak |

## Kit portofolio

| Butir kit | Keadaan | Celah |
|---|---|---|
| Ikon produk | Ada di repo app (`Jeda/src/app/icon.svg`, `Jeda/public/icon-512.png`), belum di repo ini dan belum ada field-nya | Salin, buat master 1024 px dari SVG |
| Sampul rakitan | Tangkapan mentah `jeda-tabel-psikolog.v1.webp`; tabel padat tidak terbaca di ukuran kartu (riset standar, bagian 1) | Perlu sampul rakitan |
| ≥4 layar | 5 layar | Terpenuhi |
| Loop kartu | `jeda-catat-cepat-loop.v1.mp4` (8,8 detik) dan poster | Terpenuhi |

## Aset yang perlu dibuat

1. `jeda-ikon.v1.svg` dan `jeda-ikon.v1.png` (1024 px), disalin dari `Jeda/src/app/icon.svg`.
2. `jeda-sampul.v2.webp` (16:10): kertas `#eeebe6`, ikon dan nama, layar catat cepat di ponsel dan ringkasan di laptop, bingkai generik yang sama dengan halaman lain. Cara membuatnya menunggu keputusan Farrez (riset standar, bagian 7 butir 1).
3. Tidak ada aset gambar untuk A3 sampai A5: semuanya HTML/CSS dan layar yang sudah ada.

Catatan keamanan: tidak ada temuan di halaman. Klaim privasi di A5 harus tetap persis seperti yang
dibuktikan repo Jeda; jangan tulis "hanya psikolog yang bisa membaca", karena siapa pun yang memegang
tautan tanpa PIN bisa membukanya.
