# Konsep: halaman bespoke RideDeck (/work/ridedeck)

Tanggal: 2026-11-14. Jenis: storyboard scroll untuk halaman yang sudah tayang (ADR 0013, 0014).
Format: `docs/konsep/storyboard/FORMAT.md`. Data sketsa: `docs/konsep/storyboard/ridedeck.json`.
Dasar: `docs/riset/2026-10-koreografi-scroll.md`, DESIGN.md (Bespoke project pages, Motion
vocabulary), `docs/riset/2026-11-standar-portofolio.md` bagian 6.

## Brief

| Butir | Isi |
|---|---|
| Tujuan | Calon klien percaya bahwa Coderoach menguji batas platform di perangkat sungguhan sebelum berjanji, dan bisa membangun antarmuka yang dibaca sekilas dalam keadaan sulit. |
| Pembaca | Pengendara touring, pemilik produk yang butuh app Android khusus perangkat; membaca di ponsel, sering di luar ruangan. |
| Insight | Saat touring, membuka navigasi, musik, telepon, dan tracking berarti bolak-balik ke Recents di HP yang bergetar di stang, kadang dengan sarung tangan (`projects.ts` summary.problem). |
| Satu pesan | Satu dasbor di stang yang selalu bisa dituju kembali, dan jujur soal batasnya. |
| Bukti | Lima fitur dan enam entri timeline 20–29 Okt 2026 (`rideDeck-ayam@ea35f90` sampai `@07177c0`); body: uji di HP sebelum MVP, isi notifikasi tidak disimpan dan tidak dikirim. Simulator memakai port 1:1 model bensin dan gigi app (ADR 0014). Tidak ada angka terukur, jadi tanpa number reveal. |
| Identitas | Dari rideDeck DESIGN.md: Archivo variable (label lebar 118), malam `#0a0b0c`, jendela hitam di bingkai baja, pita Dymo merah, hijau, amber, angka segmen hijau `#3ddc5a`, amber `#ffb000`. |
| Batasan | Satu pin saja (morph, 200vh, ≥1024×640). Model Ronin bukan model resmi TVS dan atribusinya di Sumber. Video hero buatan AI berlabel. Terbaca tanpa JS, LCP ≤2,5 s, CLS <0,1, reduced-motion, 320 sampai 1440 px. three.js dimuat hanya dekat viewport. |

## Halaman sekarang

Sumber: `src/app/(frontend)/work/_bespoke/ridedeck/RideDeckPage.tsx`, `ridedeck.css`,
`HeroLoop.tsx`, `RoninSim.tsx`, `RoninMorph.tsx`, `morph-scene.ts`.

| # | Adegan | Isi | Koreografi sekarang |
|---|---|---|---|
| 1 | Hero | Video AI jalan gunung senja (3,4 detik, diulang), nama, tagline, jendela kecepatan "--", ponsel dasbor (`RideDeckPage.tsx:73-108`) | Video loop tanpa tombol jeda, berhenti saat keluar layar (`HeroLoop.tsx`) |
| 2 | Ringkasan | Tiga jendela baja berpita (`RideDeckPage.tsx:110-125`) | Statis |
| 3 | Simulator | "Motor pemiliknya, dan dasbor yang membacanya." Ronin 3D bersendi dan kartu app (`RideDeckPage.tsx:127-142`) | Interaktif, bukan scroll; panggung menempel `top: 72px` |
| 4 | Morph | "Dari motor ke layar." Ronin terurai dari hub depan jadi titik yang membentuk ponsel (`RideDeckPage.tsx:144-161`) | Pin dan scrub 200vh, ≥1024×640 (`ridedeck.css:104-108`) |
| 5 | Iterasi | 22 Okt dan 28 Okt berdampingan (`RideDeckPage.tsx:163-191`) | Tanpa gerak (DESIGN.md menulis "wipe", kodenya berdampingan) |
| 6 | Ikon | Lembar konsep ikon Gemini dan ikon akhir (`RideDeckPage.tsx:193-213`) | Statis |
| 7 | Fitur | Lima fitur dengan ponsel (`RideDeckPage.tsx:215-243`) | Enter: layar naik 28px |
| 8 | Sumber | Catatan tangkapan dan atribusi model | Statis |

Yang kurang: body ("Uji di HP dulu, janji kemudian", "Data tetap di HP") dan timeline tidak tampil.
Lima fitur adalah lima kartu dasbor yang setara, tapi disusun zigzag panjang. Video hero berulang
tanpa henti dan tidak bisa dijeda (WCAG 2.2 SC 2.2.2 berlaku untuk gerak otomatis yang berjalan
lebih dari 5 detik). Ikon akhir baru muncul di tengah halaman.

## Storyboard scroll

| # | scroll vh | Layar | Koreografi | Gerak | Ponsel | Reduced-motion | Aset |
|---|---|---|---|---|---|---|---|
| A1 | 0–110 | Hero: ikon akhir di depan eyebrow, nama, tagline, jendela kecepatan, ponsel, video, **tombol jeda video** | none | Video diputar, bisa dijeda; berhenti saat keluar layar | Video tetap, latar digelapkan | Poster diam, tombol jeda tidak tampil | `ikon.v1.svg` ada, `hero-jalan-loop.v1.mp4` ada, `ridedeck-dasbor.v1.webp` ada |
| A2 | 110–170 | Ringkasan tiga jendela | none | Tidak ada | Ditumpuk | Sama | Tanpa berkas |
| A3 | 170–330 | Simulator | none | Digerakkan pembaca, bukan gulir | Kontrol 3 kolom | Poster dan kartu diam, hujan tanpa animasi | GLB Ronin ada, `ronin-poster.v2.webp` ada |
| A4 | 330–530 | Morph motor ke layar | pin-scrub | Ronin terurai dari hub depan, titik menyusun ponsel, tangkapan asli memudar masuk | Tidak dipin, poster dan ponsel berdampingan | Poster dan tangkapan berdampingan | `ronin-poster.v2.webp` ada, `ridedeck-dasbor.v1.webp` ada |
| A5 | 530–640 | Iterasi 22 Okt ke 28 Okt dalam satu bingkai ponsel | wipe | Garis sapu mengikuti gulir saat bingkai melewati garis baca, tanpa pin | Dua ponsel berdampingan tanpa gerak | Dua ponsel berdampingan | `dasbor-22okt.v1.webp` ada, `ridedeck-dasbor.v1.webp` ada |
| A6 | 640–790 | **Baru.** "Uji di HP dulu, janji kemudian." Rel enam tahap dari timeline | progress-rail | Penanda rel pindah ke tahap yang melewati garis baca; tiap tahap bisa diklik | Rel jadi daftar bernomor | Rel statis, tautan jalan | Tanpa berkas |
| A7 | 790–870 | Konsep ikon ke ikon akhir | none | Tidak ada | Ditumpuk | Sama | `konsep-ikon.v1.webp` ada, `ikon.v1.svg` ada |
| A8 | 870–1270 | Lima fitur sebagai kartu dasbor bertumpuk | sticky-stack | Tiap kartu baja menempel lalu tertutup kartu berikutnya, satu kartu satu layar | Kartu tidak menempel; ponsel 200px supaya kartu lebih pendek dari layar | Kartu ditumpuk biasa | `ridedeck-dasbor.v1.webp`, `ridedeck-tangki.v2.webp`, `ridedeck-simulasi.v2.webp`, `ridedeck-kokpit.v1.webp`, `ridedeck-musik.v1.webp` ada |
| A9 | 1270–1340 | **Baru.** "Data tetap di HP." Satu paragraf body | quiet-reveal | Paragraf memudar masuk | Sama | Tampil | Tanpa berkas |
| A10 | 1340–1400 | Sumber dan atribusi model | none | Tidak ada | Sama | Sama | Tanpa berkas |

Isi A6 dari `timeline` (enam entri) dan body pertama; isi A9 dari body kedua. Sticky stack A8 hanya
di layar ≥1024 px; panggung simulator A3 yang sudah menempel tidak boleh bertumpang dengan stack.

### Judul adegan baru: pilihan

Nada B portofolio, sapaan Anda. Belum final; Farrez memilih.

| Adegan | Pilihan | Rekomendasi |
|---|---|---|
| A6 | (a) "Uji di HP dulu, janji kemudian." (dari body) (b) "Dicoba di stang dulu, baru dijanjikan." (c) "Sepuluh hari, diuji di HP setiap tahap." | (a): sudah jadi copy. (c) menambah hitungan hari dari timeline, perlu dicek ulang sebelum dipakai |
| A9 | (a) "Data tetap di HP." (dari body) (b) "Isi chat Anda tidak keluar dari HP." | (b): dari sudut pembaca, dan body memang menyebut isi notifikasi WhatsApp tidak disimpan dan tidak dikirim |
| A9 paragraf | Body memuat "layanan aksesibilitas" dan "ADR" yang gagal cek 6. Usulan: "Isi notifikasi WhatsApp, telepon, dan Maps hanya dibaca saat itu, tidak disimpan dan tidak dikirim. Isi layar app lain tidak dibaca." | Butuh persetujuan Farrez karena mengubah copy di `projects.ts` |

## Yang membuat lebih menarik

| Perubahan | Sekarang | Sesudah | Kenapa (riset koreografi) |
|---|---|---|---|
| Tombol jeda video hero (A1) | Berulang tanpa henti | Bisa dijeda | WCAG 2.2 SC 2.2.2. Bukan efek, tapi syarat sebelum menambah gerak lain |
| Iterasi jadi wipe (A5) | Dua ponsel berdampingan | Satu bingkai disapu dari 22 ke 28 Okt | "Wipe in one frame: before and after". DESIGN.md sudah mencatatnya sebagai wipe; kodenya belum |
| Rel uji di HP (A6) | Body dan timeline tidak dirender | Enam tahap yang bisa diklik | "Progress rail: long or staged stories". Cerita "uji dulu" adalah urutan tahap |
| Fitur sebagai stack (A8) | Zigzag panjang | Kartu dasbor menumpuk satu per layar | "Sticky stack: several equal modules". Lima fitur setara, dan bentuk tumpukan kartu meniru dasbor app sendiri |
| Ikon di hero (A1) | Baru muncul di tengah | Di depan eyebrow sejak awal | Kit: ikon produk di atas judul (Halo Lab), bukan efek gerak |
| Pin tetap satu | Satu pin 200vh | Tetap satu | A5 dan A8 tidak dipin; NN/g Scrolljacking 101 |

## Kit portofolio

| Butir kit | Keadaan | Celah |
|---|---|---|
| Ikon produk | `public/assets/ridedeck/ikon.v1.svg` ada, tapi tidak ada field ikon di data proyek | Buat master 1024 px dari SVG; field ikon menunggu keputusan kit |
| Sampul rakitan | Tangkapan ponsel tinggi `ridedeck-tangki.v2.webp` dipotong 16:10 (riset standar, tabel bagian 2) | Perlu sampul rakitan |
| ≥4 layar | 5 layar | Terpenuhi |
| Loop kartu | Tidak ada `showcase.loop` | Perlu loop ≤30 detik dengan poster |

## Aset yang perlu dibuat

1. `ridedeck-ikon.v1.png` (1024 px), diekspor dari `ikon.v1.svg` yang sudah ada.
2. `ridedeck-dasbor-loop.v1.mp4` dan `.poster.webp` (≤30 detik, tanpa suara, ≤600 KB): rekaman layar dasbor. Usulan sumbernya fitur putar ulang perjalanan, supaya instrumen bergerak tanpa merekam sambil berkendara. Apakah mode putar ulang bisa direkam begini belum dicek (dugaan).
3. `ridedeck-sampul.v3.webp` (16:10): malam `#0a0b0c`, ikon dan nama, 2–3 layar dalam bingkai generik yang sama. Cara membuatnya menunggu keputusan Farrez (riset standar, bagian 7 butir 1).
4. Tidak ada aset untuk A5, A6, A8, A9: semuanya HTML/CSS dan layar yang sudah ada.

Catatan keamanan: simulator meminta izin sensor HP (`RoninSim.tsx`); izinnya hanya diminta dari klik
pembaca dan sudah punya keadaan `denied`. Tidak ada temuan baru dari baca kode ini.
