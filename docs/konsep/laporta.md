# Konsep: halaman bespoke Laporta (/work/laporta)

Tanggal: 2026-11-14. Jenis: storyboard scroll untuk halaman yang sudah tayang (ADR 0013).
Format: `docs/konsep/storyboard/FORMAT.md`. Data sketsa: `docs/konsep/storyboard/laporta.json`.
Dasar: `docs/riset/2026-10-koreografi-scroll.md`, DESIGN.md (Bespoke project pages, Motion
vocabulary), `docs/riset/2026-11-standar-portofolio.md` bagian 6.

## Brief

| Butir | Isi |
|---|---|
| Tujuan | Calon klien F&B multi-cabang percaya bahwa data di luar POS (kas kecil, stok, waste, setoran) bisa ditutup rapi dari ponsel crew sampai buku besar, dan bahwa Coderoach bisa membangun sistem yang memegang uang orang lain. |
| Pembaca | Pemilik atau manajer area jaringan F&B yang sudah melampaui spreadsheet tapi belum cocok dengan ERP; membaca di laptop kantor atau ponsel di sela kunjungan outlet. |
| Insight | Angka dari cabang harus disalin ulang sebelum bisa dibaca head office, jadi masalah di outlet baru terlihat setelah laporannya dirapikan (`projects.ts` body, "Masalahnya bukan POS"). |
| Satu pesan | Satu shift ditutup dari ponsel crew dan langsung jadi jurnal yang seimbang. |
| Bukti | Tiga angka terukur di `LAPORTA_METRICS`: input penjualan 2,7 ke 1,7 layar (`laporta_v2@7d244f9`), ubah sel jadwal 0,7–1,2 dtk ke 76–101 ms (`laporta_v2@69ab349`), bukti transfer 14/14 terbaca benar (`laporta_v2@57435fc`). Tujuh langkah tutup shift dari `features[0]`. Tur 50 detik dari database demo. |
| Identitas | Dari app: Montserrat dan JetBrains Mono, kertas `#fafafb`, tinta `#111114`, amber `#b45309` untuk teks dan `#f59e0b` sebagai isian. Struk kasir dan cap SEIMBANG. |
| Batasan | Terbaca tanpa JS, LCP ≤2,5 s, CLS <0,1, reduced-motion, 320 sampai 1440 px. Satu pin saja, ≤220vh, hanya ≥1024×760. Tanpa angka baru di luar `projects.ts`. Struk tetap berlabel "Data contoh". |

## Halaman sekarang

Sumber: `src/app/(frontend)/work/_bespoke/laporta/LaportaPage.tsx` dan `laporta.css`.

| # | Adegan | Isi | Koreografi sekarang |
|---|---|---|---|
| 1 | Hero | Eyebrow, nama 168px, tagline, "Tonton turnya", sobekan struk "BUKA SHIFT" di kanan, Masalah/Solusi/Hasil (`LaportaPage.tsx:57-100`) | Statis |
| 2 | Suasana | Foto AI meja kasir saat tutup (`/assets/suasana/laporta-kasir.v1.webp`) | Statis |
| 3 | Struk | Tujuh langkah tercetak, "Terkunci setelah diserahkan", jurnal D/K, cap SEIMBANG, tiga angka terukur di kaki struk (`LaportaPage.tsx:108-176`) | Pin dan scrub 220vh, `--q` dari `--p` 0,27–0,82, hanya ≥1024×760 (`laporta.css:47-64`) |
| 4 | Fitur | Empat fitur bernomor, layar dalam `DeviceFrame` (`LaportaPage.tsx:179-219`) | Enter: layar naik 40px dan memudar masuk (`laporta.css:146-149`) |
| 5 | Tur | `TourChapter`, tur 50 detik | Video |
| 6 | Sumber | `Sources` dengan tiga angka dan catatan demo | Statis |

Yang kurang: tiga angka terukur, bukti terkuat halaman, hanya tampil sebagai baris mono 13px di kaki
struk. Struk dan layar ponsel asli tidak pernah dipertemukan, jadi pembaca tidak melihat bahwa tujuh
baris itu memang layar crew. Empat fitur panjang tanpa penanda posisi.

## Storyboard scroll

| # | scroll vh | Layar | Koreografi | Gerak | Ponsel | Reduced-motion | Aset |
|---|---|---|---|---|---|---|---|
| A1 | 0–100 | Hero: ikon produk di depan eyebrow, nama, tagline, sobekan struk, ringkasan | none | Tidak ada | Sobekan disembunyikan, ikon tetap | Sama | `laporta-ikon.v1.svg` belum |
| A2 | 100–170 | Foto suasana meja kasir | none | Tidak ada | Sama | Sama | `laporta-kasir.v1.webp` ada |
| A3 | 170–390 | Struk dicetak; kolom teks memberi tanda langkah yang sedang tercetak | pin-scrub | Struk keluar dari slot baris demi baris; nama langkah aktif di kolom kiri menebal mengikuti baris yang sama | Tidak dipin, struk tercetak saat lewat | Struk tercetak penuh, cap tampil | HTML, tanpa berkas |
| A4 | 390–480 | **Baru.** "Tujuh langkah yang sama, di ponsel crew." Daftar langkah struk mengecil ke dalam bingkai ponsel berisi layar Tutup Shift asli | shared-element | Daftar tujuh langkah bergeser dan mengecil ke posisi checklist di layar, lalu layar asli memudar masuk di atasnya | Daftar dan layar ditumpuk, layar memudar masuk saat lewat | Crossfade: daftar dan layar berdampingan | `laporta-tutup-shift.v2.webp` ada |
| A5 | 480–580 | **Baru.** "Diukur di Laporta sendiri." Tiga angka besar, angka sebelum dicoret di sampingnya, tiap angka menaut ke Sumber | number-reveal | Angka sebelum tampil dulu, dicoret, lalu angka sesudah memudar masuk; nilai akhir sudah ada di HTML | Tiga angka ditumpuk | Angka akhir dan angka sebelum yang tercoret tampil langsung | HTML, tanpa berkas |
| A6 | 580–980 | Empat fitur dengan rel kemajuan di kiri: Shift, Kas, Stok, Jurnal | progress-rail | Penanda di rel pindah ke fitur yang melewati garis baca; tiap titik rel adalah tautan ke fiturnya | Rel jadi baris nomor di atas tiap fitur, tidak menempel | Rel statis, tautan tetap jalan | `laporta-setoran.v2.webp`, `laporta-stock-opname.v2.webp`, `laporta-laba-rugi.v2.webp` ada |
| A7 | 980–1080 | Tur 50 detik | none | Video diputar oleh pembaca | Sama | Poster | `laporta-tur.v2.mp4` ada |
| A8 | 1080–1140 | Sumber | none | Tidak ada | Sama | Sama | Tanpa berkas |

Teks baru di A4 dan A5 hanya judul pendek. Isinya diambil dari `features[0].body` dan `LAPORTA_METRICS`
(label, nilai, baseline). Fitur 01 di A6 tampil tanpa layar karena layarnya sudah dipakai A4.

### Judul adegan baru: pilihan

Nada B portofolio (`bahasa-lisan/references/kerajinan-kalimat.md`): subjeknya hasil atau masalah,
pendek dan tenang, sapaan Anda. Belum final; Farrez memilih, lalu semua judul diselaraskan.

| Adegan | Pilihan | Rekomendasi |
|---|---|---|
| A4 | (a) "Tujuh langkah yang sama, di ponsel crew." (b) "Yang tercetak tadi, ditekan crew di ponselnya." (c) "Struknya adalah layar crew." | (a): paling jelas, menyebut orang dan bendanya |
| A5 | (a) "Diukur di Laporta sendiri." (b) "Lebih ringkas, lebih cepat, terbaca benar." (c) "Angkanya diukur, bukan ditaksir." | (a): tenang, tidak menambah klaim; (b) bila Farrez mau subjek hasil, tiap kata punya angka di bawahnya |

## Yang membuat lebih menarik

| Perubahan | Sekarang | Sesudah | Kenapa (riset koreografi) |
|---|---|---|---|
| Langkah aktif di kolom teks (A3) | Teks kiri diam selama struk tercetak | Nama langkah yang sedang tercetak ikut menebal | Pola Pudding: grafik ditahan, teks yang bergerak bertahap. Pembaca tahu struk sedang di langkah mana tanpa membaca mono kecil |
| Struk ke layar asli (A4) | Struk dan layar ponsel terpisah jauh | Daftar yang sama berpindah ke layar Tutup Shift | Kosakata "shared element: same data seen two ways". Kontinuitas elemen membuktikan struk itu bukan hiasan, tapi layar crew yang sungguhan |
| Angka terukur jadi adegan (A5) | Tiga angka di kaki struk, 13px | Tiga angka besar dengan pembanding yang dicoret | "Number reveal: measured results only". Ketiganya memang terukur dan bersumber, jadi ini satu-satunya halaman dari empat ini yang berhak memakainya |
| Rel fitur (A6) | Empat fitur panjang tanpa posisi | Rel bisa diklik: Shift, Kas, Stok, Jurnal | Kandidat gelombang 2 di riset koreografi: "progress rail yang bisa diklik untuk Laporta". Cerita bertahap, rel tidak menutupi isi |
| Pin tetap satu | Satu pin 220vh | Tetap satu, A4 dan A5 tidak dipin | NN/g Scrolljacking 101: tahan scroll pendek dan jarang |

## Kit portofolio

Dibandingkan dengan kit minimum di `docs/riset/2026-11-standar-portofolio.md` bagian 6.

| Butir kit | Keadaan | Celah |
|---|---|---|
| Ikon produk | Ada di repo app (`laporta_v2/app/icon.svg`, 64×64, sudut 14), belum ada di repo ini dan belum ada field-nya | Salin ke `scripts/portfolio-assets/laporta-ikon.v1.svg`, buat master 1024 px |
| Sampul rakitan | Tangkapan mentah `laporta-setoran.v2.webp` dipotong 16:10 | Perlu sampul rakitan: ikon, nama, 2–3 layar asli dalam bingkai generik yang sama |
| ≥4 layar | 4 layar (setoran, tutup shift, stock opname, laba rugi) | Terpenuhi |
| Loop kartu | `laporta-tutup-shift-loop.v2.mp4` (5 detik) dan poster | Terpenuhi |

## Aset yang perlu dibuat

1. `laporta-ikon.v1.svg` dan `laporta-ikon.v1.png` (1024 px), disalin dari `laporta_v2/app/icon.svg`, tidak digambar ulang.
2. `laporta-sampul.v3.webp` (16:10): latar kertas `#fafafb`, ikon dan nama, layar setoran di laptop dan Tutup Shift di ponsel, satu sudut bingkai. Cara membuatnya menunggu keputusan Farrez (riset standar, bagian 7 butir 1).
3. Tidak ada aset gambar untuk A3 sampai A6: semua digambar HTML/CSS dari layar yang sudah ada.

Catatan keamanan: tidak ada temuan. Halaman tidak memuat input pengguna; struk dan angka statis.
