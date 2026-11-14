# Konsep: halaman bespoke YiheeCam (/work/yiheecam)

Tanggal: 2026-11-14. Jenis: storyboard scroll untuk halaman yang sudah tayang (ADR 0013).
Format: `docs/konsep/storyboard/FORMAT.md`. Data sketsa: `docs/konsep/storyboard/yiheecam.json`.
Dasar: `docs/riset/2026-10-koreografi-scroll.md`, DESIGN.md (Bespoke project pages, Motion
vocabulary), `docs/riset/2026-11-standar-portofolio.md` bagian 6.

## Brief

| Butir | Isi |
|---|---|
| Tujuan | Calon klien dengan perangkat atau sistem lama yang ditinggalkan vendornya percaya bahwa Coderoach bisa membaca protokol yang tidak didokumentasikan dan membangun pengendali yang lebih jujur dari aslinya. |
| Pembaca | Pemilik perangkat keras atau tim operasional yang terjebak di aplikasi vendor yang mati; juga pengendara touring yang paham masalahnya. Membaca di laptop atau ponsel. |
| Insight | Kamera yang masih bagus jadi tidak bisa dikendalikan karena aplikasi resminya ditarik dan ditolak Android 15 (`projects.ts` summary.problem). |
| Satu pesan | Protokol kamera dibangun ulang dari byte-nya, dan hasilnya terbaca dalam satu lirikan dari stang. |
| Bukti | Timeline 7–8 Okt 2026 dengan empat commit (`yiheeCam@9f3fcbc`, `@d17d62e`, `@8bb0296`, `@15e0aa7`); fitur: papan split-flap dari nilai yang dilaporkan kamera, berhenti rekam dua ketukan, papan TERPUTUS dengan nilai terakhir berlabel; body: kamera tiruan yang meniru firmware, penggantinya tidak memanggil server lain. Tidak ada angka terukur, jadi tanpa number reveal. |
| Identitas | Dari yiheeCam DESIGN.md: Barlow Condensed, dasar gelap `#0e0e0d`, tile split-flap, lampu rekam `#ff3b36`, amber `#f2b53a` untuk label. |
| Batasan | Satu pin saja, ≤220vh, ≥768×640. Byte di papan tetap berlabel ilustrasi (kode ASCII hurufnya sendiri). Live view berisi pola uji tetap dipotong, bukan dicat ulang. Terbaca tanpa JS, LCP ≤2,5 s, CLS <0,1, reduced-motion, 320 sampai 1440 px. |

## Halaman sekarang

Sumber: `src/app/(frontend)/work/_bespoke/yiheecam/YiheeCamPage.tsx` dan `yiheecam.css`.

| # | Adegan | Isi | Koreografi sekarang |
|---|---|---|---|
| 1 | Hero | Foto AI jalan kebun teh dari dagu helm, nama sebagai tile flap, tagline, ponsel `yiheecam-yakin` terpotong, keterangan foto (`YiheeCamPage.tsx:83-126`) | Exit: foto bergeser sampai 60px saat digulir (`yiheecam.css:59-69`) |
| 2 | Ringkasan | Masalah/Solusi/Hasil di panel (`YiheeCamPage.tsx:128-141`) | Statis |
| 3 | Papan | "Dibangun ulang dari byte.", empat tahap, papan flap hex ke REC, BATT, SD, lampu rekam (`YiheeCamPage.tsx:143-173`) | Pin dan scrub 220vh, hanya ≥768×640 (`yiheecam.css:91-109`) |
| 4 | Fitur | Tiga fitur dengan ponsel (`YiheeCamPage.tsx:175-203`) | Enter: layar naik 28px |
| 5 | Sumber | Catatan uji dengan kamera tiruan | Statis |

Yang kurang: body ("Membaca protokol yang tidak didokumentasikan", "Hanya bicara dengan kamera") dan
timeline tidak tampil, padahal itu cerita intinya. Diagram protokol (`yiheecam-protokol.v1.webp`)
hanya dipakai sebagai sampul. Papan ilustrasi dan papan di app asli tidak pernah dipertemukan.
Geser foto hero 60px melewati batas DESIGN.md ("a few pixels on a mood photo"). Tidak ada tur dan
tidak ada loop.

## Storyboard scroll

| # | scroll vh | Layar | Koreografi | Gerak | Ponsel | Reduced-motion | Aset |
|---|---|---|---|---|---|---|---|
| A1 | 0–110 | Hero: ikon di depan eyebrow, nama flap, tagline, ponsel, foto suasana | none | Geser foto dikurangi dari 60px ke paling banyak 12px | Foto digelapkan penuh, ponsel di bawah | Foto diam | `yiheecam-ikon.v1.svg` belum, `yiheecam-kebun-teh.v1.webp` ada, `yiheecam-yakin.v1.webp` ada |
| A2 | 110–170 | Ringkasan | none | Tidak ada | Ditumpuk | Sama | Tanpa berkas |
| A3 | 170–390 | "Dibangun ulang dari byte." Papan flap | pin-scrub | Tile hex membalik jadi huruf urut baca, tahap menyala satu per satu, lampu rekam menyala terakhir | Tidak dipin di bawah 768px, membalik saat lewat | Papan sudah terbaca REC, BATT, SD | HTML, tanpa berkas |
| A4 | 390–490 | **Baru.** "Papan yang sama, di app." Papan ilustrasi mengecil ke posisi papan di layar Live asli | shared-element | Papan bergeser dan mengecil ke kotak status di ponsel, lalu tangkapan asli memudar masuk | Ditumpuk; tangkapan memudar masuk saat lewat | Crossfade diganti dua gambar berdampingan | `yiheecam-yakin.v1.webp` ada |
| A5 | 490–650 | **Baru.** "Membaca protokol yang tidak didokumentasikan." Rel empat tahap dari timeline, diagram protokol di sampingnya | progress-rail | Penanda rel pindah ke tahap yang melewati garis baca; tiap tahap bisa diklik; diagram tetap diam | Rel jadi daftar bernomor, diagram di bawah | Rel statis, tautan jalan | `yiheecam-protokol.v1.webp` ada |
| A6 | 650–750 | **Baru.** "Jujur saat sambungan putus." Satu bingkai ponsel: layar terhubung, lalu disapu jadi TERPUTUS | wipe | Garis sapu bergerak dari kiri ke kanan mengikuti gulir, tidak dipin | Dua tangkapan berdampingan tanpa gerak | Dua tangkapan berdampingan | `yiheecam-terputus.v1.webp` ada, `yiheecam-terhubung.v1.webp` belum |
| A7 | 750–930 | Fitur 01 dan 02 | none | Layar memudar masuk, geser 28px | Ditumpuk | Tanpa geser | `yiheecam-setting.v1.webp` ada, `yiheecam-yakin.v1.webp` ada |
| A8 | 930–1000 | **Baru.** "Hanya bicara dengan kamera." Satu paragraf body | quiet-reveal | Paragraf memudar masuk | Sama | Tampil | Tanpa berkas |
| A9 | 1000–1060 | Sumber | none | Tidak ada | Sama | Sama | Tanpa berkas |

Fitur 03 ("Jujur saat sambungan putus") pindah ke A6, jadi daftar fitur tinggal dua. Isi A5 dari
`timeline` (empat entri) dan body pertama; isi A8 dari body kedua. Teks A6 dari `features[2].body`.

Wipe di A6 butuh tangkapan terhubung bertema gelap. `yiheecam-yakin` bertema terang dan
`yiheecam-terputus` bertema gelap (dicek dari berkasnya), jadi menyapu keduanya akan terlihat
seperti ganti tema, bukan ganti keadaan. Sampai `yiheecam-terhubung.v1.webp` ada, A6 tampil sebagai
dua tangkapan berdampingan tanpa gerak.

### Judul adegan baru: pilihan

Nada B portofolio, sapaan Anda. Belum final; Farrez memilih.

| Adegan | Pilihan | Rekomendasi |
|---|---|---|
| A4 | (a) "Papan yang sama, di app." (b) "Dari ilustrasi ke layar di stang." (c) "Sekali lirik, sudah terbaca." | (c): dari sudut pengendara; (a) bila ingin menegaskan bahwa papannya asli |
| A5 | (a) "Membaca protokol yang tidak didokumentasikan." (dari body) (b) "Kameranya diam, aplikasinya harus belajar bahasanya." (c) "Vendornya pergi, protokolnya dibaca ulang." | (a): sudah jadi copy dan paling jujur; (c) lebih memikat tapi "pergi" perlu dicek ke fakta (aplikasinya ditarik, vendornya belum tentu tutup) |
| A6 | (a) "Jujur saat sambungan putus." (dari fitur) (b) "Kalau putus, layarnya bilang putus." | (b): bisa dibayangkan, lolos cek 8 |
| A8 | (a) "Hanya bicara dengan kamera." (dari body) | Satu-satunya; paragrafnya memuat "tracker" dan "IMEI" yang gagal cek 6 untuk pembaca umum, usulan: "Aplikasi resminya ikut mengambil nomor IMEI HP. Penggantinya hanya tersambung ke kamera." Butuh persetujuan Farrez |

## Yang membuat lebih menarik

| Perubahan | Sekarang | Sesudah | Kenapa (riset koreografi) |
|---|---|---|---|
| Papan ke layar asli (A4) | Papan ilustrasi berdiri sendiri | Papan yang sama mendarat di layar app | "Shared element: same data seen two ways". Ilustrasi jadi bukti karena berakhir di tangkapan asli |
| Cerita protokol tampil (A5) | Body dan timeline tidak dirender | Rel empat tahap yang bisa diklik | "Progress rail: long or staged stories". Empat tahap riset sampai pemutar live view adalah cerita bertahap |
| Putus dan terhubung di satu bingkai (A6) | Fitur 03 satu tangkapan | Sapuan dari terhubung ke TERPUTUS | "Wipe in one frame: before and after". Pembaca tidak perlu mencocokkan dua gambar |
| Geser foto hero | 60px | ≤12px | DESIGN.md: parallax hanya beberapa piksel di foto suasana; pemicu vestibular (WCAG 2.3.3) |
| Image sequence kamera | Tidak ada | Tetap tidak ada | Kandidat di riset koreografi hanya "bila ada foto produk asli". Belum ada foto kamera asli, dan model atau foto AI kamera akan mengarang benda fisiknya |

## Kit portofolio

| Butir kit | Keadaan | Celah |
|---|---|---|
| Ikon produk | Ada di repo app sebagai adaptive icon Android (`yiheeCam/app/src/main/res/drawable/ic_launcher_foreground.xml` dan `_background.xml`), belum ada SVG atau PNG di repo ini | Ekspor ke SVG dan master 1024 px |
| Sampul rakitan | Sampulnya diagram protokol, bukan aplikasinya (riset standar, tabel bagian 2) | Perlu sampul rakitan dari layar app |
| ≥4 layar | 4 berkas, tapi satu diagram; layar app asli hanya 3 | Kurang satu layar app: `yiheecam-terhubung.v1.webp` sekaligus mengisi A6 |
| Loop kartu | Tidak ada | Perlu loop ≤30 detik dengan poster |

## Aset yang perlu dibuat

1. `yiheecam-ikon.v1.svg` dan `.png` (1024 px), diekspor dari vektor adaptive icon di repo app, tidak digambar ulang.
2. `yiheecam-terhubung.v1.webp`: layar Live bertema gelap saat tersambung ke kamera tiruan, tata letak dan potongan sama dengan `yiheecam-terputus`. Live view berpola uji dipotong seperti `yiheecam-yakin`.
3. `yiheecam-papan-loop.v1.mp4` dan `.poster.webp` (≤30 detik, tanpa suara, ≤600 KB menurut ADR 0006): rekaman layar dengan kamera tiruan, ketuk rekam, ketuk berhenti sampai YAKIN?, ketuk lagi. Live view berpola uji dipotong.
4. `yiheecam-sampul.v2.webp` (16:10): dasar `#0e0e0d`, ikon dan nama sebagai tile flap, 2–3 layar app. Cara membuatnya menunggu keputusan Farrez (riset standar, bagian 7 butir 1).

Catatan keamanan: tidak ada temuan di halaman. Copy A8 menyebut temuan analisis aplikasi resmi;
nama vendor atau nama tracker tidak ditulis tanpa sumber yang bisa ditautkan.
