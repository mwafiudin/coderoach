# Konsep: katalog proyek (/work)

Tanggal: 2026-11-14. Jenis: storyboard scroll untuk halaman yang sudah tayang. Data sketsa:
`docs/konsep/storyboard/katalog-work.json`. Dasar: `docs/riset/2026-11-standar-portofolio.md`.

## Brief

| Butir | Isi |
|---|---|
| Tujuan | Pembaca menemukan proyek yang paling dekat dengan masalahnya dalam satu layar, lalu membukanya. |
| Pembaca | Pemilik usaha yang datang dari beranda atau dari tautan langsung, sering setelah melihat satu studi kasus. Membuka di laptop; sebagian di ponsel. |
| Insight | Mutu katalog tidak seragam karena sampulnya tidak seragam: dua proyek punya papan presentasi yang didesain, tiga belas memakai tangkapan mentah, dan tabel padat tidak terbaca di ukuran kartu (riset bagian 1). Hanya 3 dari 15 kartu punya loop. |
| Satu pesan | Lima belas sistem yang jalan, dan Anda bisa menyaring sampai ke yang mirip dengan usaha Anda. |
| Bukti | Judul dihitung dari data (`work/page.tsx:63-74`, di produksi "15 proyek, 9 bidang usaha."), saringan layanan dan bidang, kartu per proyek dengan bidang dan tahun. |
| Nada dan identitas | DESIGN.md situs: kertas dan tinta, satu aksen `#2C70FE`, kartu "specimen tray" 16px, label mono untuk posisi dan bidang. |
| Batasan | Tanpa pin. Katalog sudah jalan tanpa JS (`CatalogClient.tsx:39-41`); semua gerak tambahan harus tetap begitu. Loop tidak diputar di perangkat sentuh, di reduced motion, atau saat Save-Data (`CardPreview.tsx:20-27`). |

## Halaman sekarang

Diukur di coderoach.id pada 14 Nov 2026, layar 1274×1146. Total ±389vh, kisi mulai di 56vh.

| # | Adegan | vh | Berkas | Gerak sekarang |
|---|---|---|---|---|
| 1 | Kepala: remah roti, Mode presentasi, penanda posisi, judul jumlah, lede | 0–40 | `CatalogClient.tsx:110-137` | Tidak ada |
| 2 | Saringan layanan (segmen) dan bidang (chip) | 40–56 | `CatalogClient.tsx:139-142`, `FilterBar.tsx` | Kisi berganti seketika |
| 3 | Kartu utama, dua kolom | 56–110 | `ProjectCard.tsx` varian `feature` | Sampul membesar 1,05× saat disorot, judul jadi biru |
| 4 | Kisi 14 kartu | 110–370 | `ProjectCard.tsx`, `CardPreview.tsx` | Sama; loop saat disorot hanya untuk Laporta, Jeda, FiFoFun |
| 5 | Klik kartu membuka overlay | n/a | `work/@modal/(.)[slug]/page.tsx:30-31` | Overlay selalu memakai cerita bersama, bukan halaman bespoke |
| 6 | Footer | 370–389 | `Footer.tsx` | Tidak ada |

## Storyboard scroll

| # | scroll vh | layar | koreografi | gerak | ponsel | reduced-motion | aset ada/belum |
|---|---|---|---|---|---|---|---|
| K1 | 0–40 | Kepala dengan judul jumlah | none | Tidak ada. Jumlah tetap teks biasa, bukan number reveal, karena bukan hasil terukur | Lede di bawah judul | Sama | ada |
| K2 | 40–56 | Saringan | shared-element | Saat saringan diganti, kartu yang tetap ada bergeser ke tempat barunya, yang keluar memudar, yang masuk muncul. Kartu tidak pernah berganti identitas | Sama, lebih singkat | Kisi berganti seketika | ada |
| K3 | 56–110 | Kartu utama dengan sampul seragam, ikon produk di atas nama | quiet-reveal | Muncul sekali saat dimuat; saat disorot, loop diputar di atas sampul | Satu kolom, poster dan tombol Pratinjau | Poster, tombol Pratinjau | belum: sampul, ikon |
| K4 | 110–370 | Kisi 14 kartu, semua dari templat sampul yang sama | quiet-reveal | Tiap baris kartu muncul saat masuk, opasitas dan geser 12px; loop saat disorot untuk semua kartu yang punya loop | Satu kolom; loop hanya lewat tombol Pratinjau | Kartu langsung tampil, tanpa loop otomatis | belum: 13 sampul, 15 ikon, 12 loop |
| K5 **baru** | 110–370 | Dari kartu ke halaman proyek | shared-element | Dipicu klik, bukan scroll: sampul kartu membesar menjadi gambar hero halaman yang dituju | Sama | Pindah halaman biasa, tanpa transisi | ada (sampul yang sama dipakai di hero) |
| K6 **baru** | 370–410 | Penutup sebelum footer: "Ceritakan proses yang paling merepotkan. Kami bantu petakan." dan tombol Konsultasi gratis 30 menit ke `/#contact` | quiet-reveal | Muncul saat masuk | Tombol selebar layar | Langsung tampil | ada (teks dari `copy.ts`, `BLOCK_COPY.contact` dan `HERO.ctaPrimary`) |

## Yang membuat lebih menarik

| Perubahan | Sekarang | Kenapa |
|---|---|---|
| Sampul seragam dan ikon produk (K3, K4) | 13 tangkapan mentah di samping 2 papan yang didesain | Bagian yang paling menentukan kesan mutu (riset bagian 1). Halo Lab menaruh ikon produk di atas judul dan Metalab menyeragamkan kartu, termasuk proyek NDA |
| Loop saat disorot untuk semua (K4) | 3 dari 15 | Kartu yang hidup hanya sebagian membuat sisanya terlihat setengah jadi. Aturan yang sudah ada tetap: tidak di perangkat sentuh, reduced motion, atau Save-Data |
| Kartu bergeser saat disaring (K2) | Kisi berganti seketika | Pembaca tetap melihat kartu yang sama berpindah, jadi tahu yang mana yang hilang. Cocok dengan shared element: data yang sama dilihat dua cara |
| Kartu ke halaman proyek (K5) | Overlay template bersama, berbeda dari halaman bespoke | Sampul yang membesar menghubungkan kartu dan halamannya. Butuh keputusan: overlay tetap atau kartu langsung membuka halaman bespoke (riset bagian 2 mencatat overlay menampilkan versi yang lebih polos dulu) |
| Penutup (K6) | Katalog berakhir di footer | Pembaca yang belum menemukan yang mirip diberi langkah berikutnya, dengan kalimat yang sudah ada di beranda |

## Kit portofolio yang dibutuhkan katalog

Dari riset bagian 2 dan 6. Hitungan dicek di produksi 14 Nov 2026 (15 kartu, loop di Laporta,
Jeda, FiFoFun).

| Butir | Sudah | Belum |
|---|---|---|
| Ikon produk | 0 dari 15 | Semua; juga belum ada field-nya di `projects.ts` maupun Payload |
| Sampul dari satu templat | 2 dari 15 (Uruzin, RPN OS) | 13 |
| Loop kartu ≤30 detik dengan poster | 3 dari 15 | 12 |
| Varian NDA | Belum ada | Templat yang sama dengan label sektor |

## Aset yang perlu dibuat

| Berkas | Isi | Catatan |
|---|---|---|
| `<slug>-ikon.v1.png` × 15 | Ikon 1024 px, satu radius sudut untuk semua | Butuh field baru di data proyek; itu perubahan model data, jadi lewat keputusan Farrez |
| `<slug>-sampul.v1.webp` × 13 | Sampul 16:10 dari satu templat | Menunggu keputusan cara membuat sampul (riset bagian 7 butir 1). Tangkapan asli ditempel lewat kode atau alat desain, bukan digambar ulang AI |
| `<slug>-kartu-loop.v1.mp4` dan `.poster.webp` × 12 | Loop ≤30 detik tanpa suara | Untuk proyek yang punya tur, dipotong dari turnya |
