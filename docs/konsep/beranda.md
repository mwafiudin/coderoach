# Konsep: beranda coderoach.id (/)

Tanggal: 2026-11-14. Jenis: storyboard scroll untuk halaman yang sudah tayang. Beranda belum
pernah di-storyboard (`docs/riset/2026-11-standar-portofolio.md` bagian 2). Data sketsa:
`docs/konsep/storyboard/beranda.json`.

## Brief

| Butir | Isi |
|---|---|
| Tujuan | Dalam satu kali scroll, pemilik usaha memutuskan dua hal: apakah membangun sistem sendiri layak, dan apakah studio ini bisa dipercaya membangunnya (PRODUCT.md, Users & purpose). |
| Pembaca | Pemilik dan direktur usaha Indonesia dengan 10 sampai 200 karyawan, di F&B, produksi makanan, jasa profesional, dan media. Biasanya bukan orang teknis. Datang dari rekomendasi atau pencarian, membuka di laptop saat jam kerja, sudah memakai dua atau tiga langganan yang tidak saling nyambung. |
| Insight | Yang membuat mereka percaya bukan kata sifat, tapi sistem yang jalan dan klien yang bisa disebut. Sekarang klien hanya tampil sebagai nama teks di pita yang berjalan, tanpa tautan ke apa yang dibangun (riset 14 Nov, bagian 3). |
| Satu pesan | Punya sistem sendiri, tanpa tagihan yang membesar tiap tambah orang. Buktinya sistem yang sudah jalan untuk klien yang bisa Anda lihat. |
| Bukti | Lima klien yang boleh disebut (`src/lib/landing/copy.ts`, `CLIENTS`), studi kasus di /work, OpsConsole, empat tahap proses, FAQ. Izin logo semua klien dari Farrez, 14 Nov 2026. |
| Nada dan identitas | DESIGN.md situs ("Ruang Kendali"): kertas dan tinta, satu aksen `#2C70FE`, hairline, grid blueprint, label mono hanya untuk ukuran dan posisi. PRODUCT.md: tanpa hero gelap untuk drama, tanpa kisi kartu ikon, bahasa Indonesia biasa dengan sapaan "Anda". |
| Batasan | Pengecualian gerak terikat scroll di ADR 0012 hanya berlaku untuk halaman proyek; beranda tidak ikut ("Not extended"). Jadi beranda **tanpa pin dan tanpa scrub**: hanya quiet reveal, progress rail proses yang sudah ada, dan number reveal untuk hasil terukur. Terbaca tanpa JS, LCP ≤2,5 s, CLS <0,1, reduced-motion. Versi bahasa Inggris `/en` menyusul; tata letak harus tahan teks yang lebih panjang. |
| Kriteria menilai | (1) Bukti lebih dulu dari klaim. (2) Gerak menjelaskan sesuatu, bukan hiasan. (3) Tidak melanggar aturan PRODUCT.md. (4) Tanpa angka baru. (5) Bekerja di 320 px. |

## Halaman sekarang

Urutan dan posisi diukur di coderoach.id pada 14 Nov 2026, layar 1274×1146, lewat skrip di
browser pane. Total tinggi halaman ±1453vh.

| # | Adegan | vh | Berkas | Gerak sekarang |
|---|---|---|---|---|
| 1 | Hero kiri teks, kanan OpsConsole, pita klien di bawahnya | 0–106 | `Hero.tsx`, `OpsConsole.tsx`, `MarqueePause.tsx` | Masuk berurutan saat dimuat (`animate-hero-in`), oktagon bergeser pelan, **latar grid bergeser 0,18× scroll** (`InteractionsClient.tsx:96-101`), umpan konsol tiap 3,2 detik, pita klien berjalan dengan tombol jeda |
| 2 | Kapan bisnis butuh sistem sendiri? Tiga gejala dan satu panel angka yang hilang | 106–213 | `narrative/sections.tsx:53-120`, `illustrations.tsx:117` | Reveal saat masuk, tanda tanya berkedip di panel |
| 3 | Langganan atau bangun sendiri? Dua kolom dan grafik biaya | 213–327 | `narrative/sections.tsx:192-243`, `CostChart` | Reveal saat masuk; grafik diam |
| 4 | Yang kami bangun: tiga layanan | 327–477 | `Services.tsx` | Sorotan kursor |
| 5 | Sistem yang sudah berjalan: Laporta unggulan dan empat baris | 477–647 | `Work.tsx` | Sorotan kursor, hover baris dari arah masuk kursor |
| 6 | Produk yang kami bangun dan pakai sendiri | 647–860 | `Products.tsx` | Reveal saat masuk |
| 7 | Dari pemetaan sampai benar-benar dipakai: empat tahap | 860–945 | `Process.tsx`, `InteractionsClient.tsx:102-127` | Rail terisi biru mengikuti scroll, titik tahap menyala |
| 8 | Cocok untuk siapa? | 945–1023 | `narrative/sections.tsx:246-375` | Reveal saat masuk |
| 9 | Studio, babak tinta | 1023–1132 | `Studio.tsx`, `ui/AnimatedCount.tsx` | **Angka statistik naik dari 0** saat masuk |
| 10 | Catatan dari studio | 1132–1212 | `HomeNotes.tsx` | Reveal |
| 11 | Pertanyaan yang sering masuk | 1212–1315 | `FAQ.tsx` | Reveal |
| 12 | Kontak dan footer | 1315–1453 | `Contact.tsx`, `DeployConsole.tsx`, `Footer.tsx` | Konsol deploy terbuka saat kirim |

Temuan yang melanggar aturan yang sudah ada:

- Latar grid hero bergeser mengikuti scroll. Itu parallax dekoratif, dilarang DESIGN.md (Motion
  vocabulary, "Not used"). [terbukti: `InteractionsClient.tsx:96-101`]
- Statistik studio dirender `0` di HTML lalu naik ke nilainya. Di produksi teksnya terbaca
  "0+ yr" sebelum discroll. Aturan number reveal meminta nilai akhir sudah ada di HTML, dan hanya
  untuk hasil terukur. [terbukti: `AnimatedCount.tsx:22`, dicek di DOM produksi 14 Nov 2026]
- Rail proses mulai dari `--progress: 0`. Tanpa JS rail kosong dan titik tahap tidak menyala;
  DESIGN.md meminta gerak beristirahat di keadaan selesai. [dari baca kode: `Process.tsx:26`]
- Pita klien memuat 0 gambar. [terbukti, DOM produksi]

## Storyboard scroll

Posisi vh adalah sasaran di layar 1274×1146 setelah perubahan, dibulatkan.

| # | scroll vh | layar | koreografi | gerak | ponsel | reduced-motion | aset ada/belum |
|---|---|---|---|---|---|---|---|
| B1 | 0–90 | Hero di kertas: judul, lede, dua tombol, OpsConsole di kolom kanan | none | Masuk berurutan saat dimuat dan umpan konsol tetap. Pergeseran latar dihapus | Konsol di bawah teks | Tanpa masuk berurutan, konsol diam | ada |
| B2 **baru** | 90–120 | Pita logo klien: marquee yang sama, lima nama teks diganti logo berwarna asli (pilihan Farrez 14 Nov 2026, opsi marquee) | none | Tetap berjalan dengan tombol jeda; tinggi logo dihitung dari luasnya (`lib/landing/logo-size.ts`) | Marquee yang sama, logo mengecil | Marquee berhenti, logo dibungkus jadi baris diam | ada: `scripts/landing-assets/klien-*.v1.webp` |
| B3 | 150–257 | Kapan bisnis butuh sistem sendiri? | quiet-reveal | Tiga gejala muncul; lalu tiga garis putus-putus tergambar dari tiap gejala ke panel angka, dan berhenti sebelum sampai (**baru**) | Garis disembunyikan, gejala bertumpuk | Garis sudah tergambar, berhenti sebelum panel | ada |
| B4 | 257–371 | Langganan atau bangun sendiri? | quiet-reveal | Garis grafik biaya tergambar sekali dari kiri saat grafik masuk, penanda titik balik muncul terakhir (**baru**) | Sama, grafik selebar layar | Grafik utuh | ada |
| B5 | 371–521 | Tiga layanan | quiet-reveal | Tiap layanan memuat tautan ke /work tersaring menurut layanannya, dengan jumlah proyek dihitung dari data, dan deret sampul kecil proyeknya yang muncul saat kartu masuk (**baru**) | Deret sampul jadi dua sampul saja | Deret tampil diam | belum: sampul seragam |
| B6 | 521–691 | Sistem yang sudah berjalan | quiet-reveal | Tiap baris diberi ikon produk di kolom 56px; saat disorot, sampul kecil dan loop muncul di sisi baris (**baru**). Angka unggulan memakai number reveal hanya bila sama dengan angka Laporta yang bersumber; kalau tidak, diam | Tanpa sorotan, ikon dan sampul diam | Tanpa loop | belum: ikon produk, sampul; loop: 3 dari 15 ada |
| B7 | 691–904 | Produk yang kami pakai sendiri | quiet-reveal | Baris di panel instrumen masuk satu per satu seperti umpan konsol, sekali | Sama | Panel utuh | ada |
| B8 | 904–990 | Empat tahap proses | progress-rail | Rail terisi biru seperti sekarang; nilai istirahatnya penuh, jadi tanpa JS rail sudah biru | Rail tegak | Rail penuh | ada |
| B9 **baru** | 990–1068 | Cocok untuk siapa? Daftar "Cocok kalau" bisa dicentang pembaca, dengan penghitung centang | none | Centang dan penghitung berubah saat diklik, bukan saat scroll | Target sentuh 44px | Sama | ada (teks `copy.ts`) |
| B10 | 1068–1176 | Studio, babak tinta | none | Angka statistik tampil dengan nilai akhir sejak HTML, tanpa hitung naik | Dua kolom statistik | Sama | ada |
| B11 | 1176–1256 | Catatan dari studio | quiet-reveal | Seperti sekarang | Sama | Langsung tampil | ada |
| B12 | 1256–1359 | Pertanyaan yang sering masuk | quiet-reveal | Seperti sekarang | Sama | Langsung tampil | ada |
| B13 | 1359–1460 | Kontak dan footer | none | Konsol deploy terbuka saat kirim, seperti sekarang | Sama | Konsol tampil tanpa animasi | ada |

## Yang membuat lebih menarik

| Perubahan | Sekarang | Kenapa |
|---|---|---|
| Pita klien diberi logo (B2) | Lima nama teks berjalan | Farrez memilih marquee logo, bukan kartu klien (14 Nov 2026). Logo berwarna asli karena mengubah warna merek orang butuh izin pedoman mereknya; ukuran menurut luas supaya logo lebar tidak menenggelamkan logo tegak (Canonical 2021, Sanity 2026) |
| Garis yang tidak sampai (B3) | Tiga gejala dan panel berdiri sendiri | Kalimatnya "sistemnya memang tidak pernah dirancang untuk nyambung". Garis putus yang berhenti sebelum panel memperlihatkan itu dengan bahasa blueprint, sekali saja |
| Grafik tergambar sekali (B4) | Grafik diam | Grafik itu menceritakan perubahan dari waktu ke waktu. Digambar sekali saat masuk, tidak terikat posisi scroll, jadi tetap di dalam aturan beranda |
| Layanan menunjuk bukti (B5) | Tiga kartu tanpa tautan ke proyek | Bukti lebih dulu dari kata sifat. Jumlah proyek dihitung dari data yang sama dengan /work, bukan angka yang diketik |
| Ikon dan loop di baris kerja (B6) | Baris teks dengan nomor | Sama dengan kartu katalog, jadi pembaca mengenali proyek yang sama di dua tempat |
| Centang sendiri (B9) | "Centang 3 dari 4?" tanpa bisa dicentang | Kalimatnya sudah mengajak mencentang. Interaksi kecil ini membuat pembaca menjawab untuk dirinya sendiri |
| Hapus parallax dan hitung naik (B1, B10) | Melanggar DESIGN.md | Perbaikan, bukan tambahan. Angka statistik studio bukan hasil terukur, jadi tidak diberi number reveal |
| Tanpa pin | Sama | ADR 0012 tidak memperluas gerak terikat scroll ke beranda. Lebih menarik di sini datang dari bukti yang bisa diklik, bukan dari menahan scroll |

Versi `/en`: semua adegan harus diuji dengan teks Inggris sebelum `/en` tayang. Pita logo dan
judul seksi paling rawan, karena lebarnya dihitung dari teks Indonesia. Struktur URL dan pemilih
bahasa: `/en` bertahap, diputuskan Farrez 14 Nov 2026 (ADR 0015).

## Aset yang perlu dibuat

| Berkas | Isi | Catatan |
|---|---|---|
| Logo Geprek Wow, RPN Agro, Chicken Wow, Uruzin, The Global Review | SVG atau PNG transparan, warna asli, plus versi untuk latar gelap bila ada | Izin Farrez 14 Nov 2026. Tiga klien masih berizin `legacy` di kode (`legacy-baseline.ts:4-7`, `portfolio.test.ts:69-74`), jadi izin ini perlu dicatat sebagai IZN dengan cakupan logo sebelum dipasang |
| Kalimat kartu klien | Tidak dipakai | Kartu klien tidak jadi dibuat; pita tetap marquee logo |
| Ikon produk 15 proyek | Persegi 1024 px | Sama dengan kit katalog |
| Sampul seragam 15 proyek | 16:10 dari satu templat | Menunggu keputusan cara membuat sampul (riset bagian 7 butir 1) |
| Loop kartu 12 proyek | ≤30 detik, tanpa suara, dengan poster | 3 dari 15 sudah ada |
