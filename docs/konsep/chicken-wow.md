# Konsep: halaman bespoke Chicken Wow (/work/chicken-wow)

Tanggal: 2026-10-30. Jenis: scrollytelling (halaman proyek bespoke, ADR 0013).
Proyek: T-0087. Prosedur: skill `alur-desain` 1.3.0, `references/konsep.md`.
Izin: IZN-2026-001 (klien Masaya Food; nama, logo, tangkapan).

## Brief

| Butir | Isi |
|---|---|
| Tujuan | Setelah membaca, pemilik jaringan F&B yang gerainya terus bertambah percaya bahwa menu dan daftar gerai bisa diubah timnya sendiri tanpa developer, dan bahwa situs bisa membawa pengikut media sosial ke gerai terdekat. |
| Pembaca | Pemilik atau manajer marketing brand F&B lokal (Jawa Timur, banyak gerai, jualan lewat GoFood/ShopeeFood dan Instagram/TikTok), membaca di ponsel. |
| Insight | Brand makanan berubah tiap minggu (menu baru, harga, paket, gerai baru), tapi situsnya membeku karena isinya tertanam di HTML; akibatnya tautan di bio diarahkan ke Linktree dan pengikut mendarat di properti orang lain. Sumber: `projects.ts` (menu dan gerai tertanam di HTML, halaman utama 404, Linktree di bio), inventaris URL portofolio (13 gerai di Jawa Timur menurut meta deskripsi situs, 14 Okt 2026). |
| Satu pesan | Menu dan gerai berubah dari panel, dan pengikut di media sosial mendarat di gerai terdekat lewat situs sendiri. |
| Bukti | menu.json dan outlets.json diterbitkan panel Laravel/Filament multi-tenant ke document root; 38 gambar ke WebP, aset 20,3 MB ke 9,4 MB; halaman Menu, Kemitraan, Lokasi, Karier yang dulu 404; /info mengurutkan gerai dari yang terdekat memakai lokasi ponsel; CI tiga kali deploy berturut-turut sebelum server menarik rilis; deploy lewat Git di cPanel setelah FTP diblokir firewall. |
| Nada dan identitas | Situs klien (tangkapan 14 Okt 2026): navy `#152477` dengan grid tipis, kuning `#ffd400` untuk tombol dan sorotan, pil merah "SAMBAL NENDANG", huruf Poppins sangat tebal, nada santai ("Solusi Mama Gak Masak", "mulai 10 ribu aja"). Plus DESIGN.md situs bagian bespoke. |
| Batasan | Halaman web bahasa Indonesia, terbaca tanpa JS, LCP ≤2,5 s, CLS <0,1, reduced-motion, 320 sampai 1440 px. Satu tangkapan beranda di repo (`chicken-wow-beranda.v1.webp`). Izin: nama, logo, tangkapan; tidak ada angka penjualan. Tidak ada akses repo kode klien dari sesi ini; situs live menolak akses agen. Flow boleh untuk foto suasana (bukan foto produk palsu). |
| Kriteria menilai ide | (1) Orisinal: bukan grid fitur atau sebelum/sesudah situs. (2) Relevan: memperlihatkan perubahan yang tidak lagi lewat developer, dan pengikut yang mendarat di situs sendiri. (3) Jujur: tidak memalsukan menu, harga, alamat gerai, atau foto produk; contoh ditandai. (4) Nada klien yang riang, tetap terbaca. (5) Terbaca tanpa JS dan di 320 px. |

## Ideasi

Ide mentah dari Farrez: tidak ada (delegasi penuh 30 Okt 2026). Putaran 1: tiga subagen terpisah,
satu sudut masing-masing, tanpa referensi. Putaran 2 ditulis setelah rujukan dibuka. Huruf = urutan
acak untuk penilai.

| # | Sudut | Ide dalam satu kalimat | Putaran | Ditandai "jelas"? |
|---|---|---|---|---|
| K | pembaca, lokal | Bio Instagram: tautan Linktree terhapus dan tertulis alamat situs sendiri, lalu daftar gerai terdekat muncul di bingkai yang sama | 1 | ya |
| D | pembaca, lokal | Kamis 16.40 ke 16.42: admin mengetik menu baru di panel, Simpan, kartu menu di situs berganti, tanpa chat ke developer | 1 | |
| Q | pembaca, lokal | Pembaca jadi pembeli lapar: dari gulir TikTok ke bio ke daftar gerai yang tersusun ulang dari yang terdekat | 1 | |
| A | pembaca, lokal | Peta Jawa Timur bertambah titik sampai 13 gerai, lalu satu titik contoh "gerai baru" tanpa menyentuh kode | 1 | |
| H | pembaca, lokal | Kertas promo ditempel bertumpuk di kaca gerai, harga contoh berganti tiap pekan | 1 | |
| M | mekanisme | Satu kartu menu.json yang barisnya menyala lalu menyusun diri jadi kartu menu bergaya situs | 1 | ya |
| F | mekanisme | Satu panel, dua laci tenant; isi hanya menetes ke laci yang dipilih | 1 | |
| B | mekanisme | Satu bingkai ponsel: "404" disapu menjadi Menu, Kemitraan, Lokasi, Karier | 1 | |
| N | mekanisme | Tumpukan 38 gambar menyusut dari 20,3 MB ke 9,4 MB, tiga lampu CI hijau berurutan | 1 | |
| E | mekanisme | Link-in-bio: baris gerai berpindah posisi saat lokasi menyala | 1 | |
| J | metafora luar | Papan jadwal stasiun: baris menu dan gerai diganti petugas (panel), huruf berputar | 1 | ya |
| C | metafora luar | Papan kapur menu dihapus spons dan ditulis ulang | 1 | |
| P | metafora luar | Dial radio: tiap gerai stasiun, jarum berhenti di sinyal terdekat | 1 | |
| G | metafora luar | Surat salah alamat (Linktree) ditolak, stempel "diterima, situs sendiri" | 1 | |
| L | metafora luar | Papan pengumuman RT dan peta lipat yang terbuka sampai gerai terdekat | 1 | |
| R | rujukan luar industri, lokal | Etalase rombong: label harga kertas di kaca diganti tangan pemilik sendiri, bukan tukang reklame; panel adalah tangan itu | 2 | |
| I | identitas klien | Halaman memakai bahasa situs klien sendiri: pil merah, tombol kuning raksasa "MULAI 10K"; yang berubah di setiap bab adalah isi pil dan tombol itu, dibaca dari satu berkas data | 2 | |
| O | mekanisme, kurir | Ojol sebagai pembawa: satu berkas data dikirim dari panel ke document root seperti pesanan diantar, dan situs "membuka bungkusnya" | 2 | |

Rujukan setelah putaran 1: tangkapan chickenwow.id 14 Okt 2026 (desktop, ponsel, /info): grid tipis
di atas navy, pil merah, tombol kuning sangat besar, Poppins tebal kapital, /info dengan foto produk
di lingkaran kuning dan tombol sosial; luar industri: etalase rombong dan warung dengan label harga
kertas yang ditulis tangan pemiliknya.

## Penilaian (subagen terpisah)

| # | Orisinal | Relevan | Layak | Catatan |
|---|---|---|---|---|
| K | 2 | 5 | sulit | Cepat jadi tiruan UI Instagram; gugur |
| D | 3 | 4 | ya | Jam persis terasa hidup, tapi hanya separuh pesan |
| Q | 3 | 4 | sulit | Risiko meniru UI TikTok |
| A | 2 | 3 | ya | Peta bertitik klise; gugur |
| H | 4 | 3 | ya | Menggambarkan masalah, belum solusi |
| M | 2 | 4 | ya | JSON jadi kartu, klise studi kasus dev; gugur |
| F | 3 | 2 | ya | Pembaca tidak peduli multi-tenant; gugur |
| B | 2 | 3 | ya | Sebelum/sesudah terselubung; gugur |
| N | 2 | 1 | ya | Angka teknis, bukan insight; gugur |
| E | 3 | 5 | ya | Mekanisme tepat dan jujur, kurang kejutan sendirian |
| J | 4 | 4 | ya | Cocok, tapi split-flap sudah sering dipakai |
| C | 2 | 3 | ya | Papan kapur klise di F&B; gugur |
| P | 5 | 4 | ya | "Mencari sinyal terdekat" segar dan bisa murni SVG |
| G | 3 | 3 | ya | Lucu tapi abstrak |
| L | 3 | 3 | ya | Cerita terbelah dua benda |
| R | 5 | 5 | ya | Terkuat: tangan pemilik, bukan tukang reklame, persis "tanpa developer" |
| I | 4 | 5 | ya | Halaman jadi buktinya; risiko terasa reskin |
| O | 4 | 3 | sulit | Rawan meniru merek ojol, pesan kabur |

Usulan penilai: A = R+E "Label di kaca rombong", B = I+D "Halaman ini dicetak dari satu berkas"
(paling aman), C = P+J "Cari sinyal terdekat".

## Tiga konsep

Semua: nama gerai, jarak, dan harga yang tidak ada di tangkapan berizin ditandai "contoh"; kalimat
yang memang ada di situs klien ("Mulai 10K", "Sambal Nendang", "Solusi Mama Gak Masak") dipakai
apa adanya. Jumlah gerai 13 dari meta deskripsi situs (14 Okt 2026). Data outlets.json asli tidak
bisa diakses dari sesi ini, jadi tidak ada nama gerai asli.

### Konsep A: Label di kaca

- Ide: di warung dan rombong, pemilik menulis sendiri label harga di kaca etalase; tidak ada yang
  memanggil tukang reklame setiap kali harga berganti. Panel CMS adalah tangan pemilik itu. Lalu
  sudut pandang mundur: etalasenya satu dari 13 gerai, dan /info menyusun gerai dari yang terdekat.
- Relevan: dua separuh pesan dalam satu benda yang dikenal pembaca Jawa Timur.
- Koreografi: pin dan scrub pendek (≥1024×800): label kertas di kaca diganti satu per satu (menu
  baru, paket, harga), lalu kaca mengecil jadi satu dari deretan kartu gerai yang menyusun ulang
  (shared element). Di ponsel dan tanpa JS: urutan statis.

| Adegan | Pesan | Teks tampil | Yang terlihat | Transisi |
|---|---|---|---|---|
| 1 (pembuka) | Jawaban dulu | "Chicken Wow" Poppins 900 kapital, tagline, Masalah/Solusi/Hasil | Navy bergrid, pil merah "SAMBAL NENDANG", tombol kuning raksasa "MULAI 10K" (kalimat asli situs) | Statis |
| 2 | Dulu: menunggu developer | "Dulu, setiap label baru harus lewat developer" | Kaca etalase digambar garis, label kertas lama tertempel | Tetap |
| 3 | Kini: tangan sendiri | "Sekarang tim menulisnya sendiri dari panel" | Label contoh dicopot, label baru ditempel (menu baru, paket hemat) | Scrub: label berganti |
| 4 | Datanya | "Panel menerbitkan menu.json dan outlets.json ke situs" | Label kecil di sudut kaca menyebut nama berkasnya | Reveal |
| 5 | Gerai terdekat | "Dari bio ke gerai terdekat" | Kaca mengecil jadi satu kartu di deretan gerai contoh; deretan menyusun ulang dari yang terdekat | Shared element |
| 6 | Bukti | Tangkapan beranda berizin | Tangkapan | Enter |
| 7 | Teknis | 38 gambar ke WebP, 20,3 ke 9,4 MB; halaman yang dulu 404; deploy Git di cPanel; CI tiga kali | Daftar singkat | Quiet |

### Konsep B: Halaman ini dicetak dari satu berkas (paling aman)

- Ide: studi kasusnya ditulis dalam bahasa visual situs klien; di tiap bab isi pil dan tombol
  kuning berganti, dan di sampingnya tampil baris berkas data yang mengubahnya, bercap waktu
  contoh "Kamis 16.40" ke "16.42".
- Risiko: terasa seperti reskin situs klien; "baris data" mendekati klise JSON-jadi-kartu.

### Konsep C: Cari sinyal terdekat

- Ide: radio transistor; tiap gerai stasiun, jarum digeser oleh gulir dan berhenti di sinyal
  terkuat (gerai terdekat); penyiar (admin panel) mengganti acara (menu) tanpa teknisi pemancar.
- Risiko: dua metafora (radio untuk lokasi, penyiar untuk panel) dalam satu benda; jarak dan
  kekuatan sinyal hanya ilustrasi, padahal /info memakai lokasi ponsel sungguhan.

## Gerbang GK

Diputuskan subagen penilai terpisah atas nama Farrez (delegasi 30 Okt 2026), D-01, 2026-10-30.

- **Terpilih: Konsep A, Label di kaca, dengan bahasa visual dari ide I** (pil merah, kuning
  `#ffd400`, Poppins 900, navy bergrid sebagai label di kaca). Satu-satunya konsep yang membawa
  kedua separuh pesan dalam satu benda yang dikenal pembaca F&B Jawa Timur, dan "tangan pemilik,
  bukan tukang reklame" langsung mengena; bahasa visual klien menjaga halaman tetap milik Chicken Wow.
- **Kalah, B (Halaman ini dicetak dari satu berkas):** mudah terbaca sebagai reskin situs klien,
  baris data dekat dengan klise JSON-jadi-kartu, dan separuh pesan gerai terdekat lemah.
- **Kalah, C (Cari sinyal terdekat):** dua metafora dalam satu benda, dan "kekuatan sinyal"
  menggambarkan /info secara keliru, padahal /info memakai lokasi ponsel sungguhan.

Koreksi wajib dan pemenuhannya:

1. "Rombong" diganti "etalase kaca", dibuka sebagai perumpamaan ("Ibarat label harga di kaca
   etalase"), digambar garis HTML/CSS.
2. Label baru hanya kalimat yang ada di tangkapan berizin ("Sambal Nendang", "Mulai 10K", "Krispy
   Greens", "Pesan sekarang") atau fakta dari meta situs (13 gerai di Jawa Timur); label lama
   ditandai contoh.
3. Tidak menyalahkan pihak lain: "Dulu, mengganti menu berarti mengubah kode situs."
4. Kartu gerai bernama dan berjarak contoh, tanpa alamat; satu kalimat bahwa /info asli memakai
   lokasi ponsel pembaca; "13 gerai" dengan sumber dan tanggalnya.
5. Tanpa JS dan di 320 px: label lama (tercoret, redup) di atas label baru, dan dua urutan gerai
   berdampingan atau bertumpuk. Semua label teks HTML. Pin hanya di layar ≥1024×900 dengan gerak.

## Produksi

- Dibangun di `src/app/(frontend)/work/_bespoke/chicken-wow/`; Poppins dan Nunito (instance
  sendiri, supaya halaman LocaScore tidak ikut memuat bobot teks).
- Kuota: Flow 0 kredit, Gemini 0 permintaan. Tidak ada foto produk baru; satu-satunya foto adalah
  tangkapan beranda berizin.
- GD5: pratinjau lokal 1440×900 (kaca ditahan, label berganti) dan 320 px (tanpa luber, dua urutan
  gerai bertumpuk), lalu audit `impeccable` oleh subagen terpisah.
- Audit `impeccable` (subagen, dari kode): 17/20. Diterapkan: label lama tetap 6:1 saat istirahat
  (pudar 15%, coretan yang membawa makna); "Dulu" dan "Sekarang" untuk pembaca layar; ambang pin
  900 px seperti LocaScore; pil tidak membungkus; warna tinta lembut jadi token; `aria-label` di
  figure dibuang supaya figcaption jadi namanya. Dibiarkan: risiko CLS dari 220vh setelah hidrasi
  (pola bersama dengan LocaScore dan Laporta, di bawah lipatan).
