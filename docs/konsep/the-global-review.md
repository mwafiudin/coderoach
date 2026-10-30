# Konsep: halaman bespoke The Global Review (/work/the-global-review)

Tanggal: 2026-10-30. Jenis: scrollytelling (halaman proyek bespoke, ADR 0013).
Proyek: T-0087. Prosedur: skill `alur-desain` 1.3.0, `references/konsep.md`.
Izin: IZN-2026-002 (klien Global Future Institute; nama, logo, tangkapan).

## Brief

| Butir | Isi |
|---|---|
| Tujuan | Setelah membaca, pemilik media atau organisasi yang situsnya tua percaya bahwa tampilan dan kecepatan bisa diganti tanpa memaksa redaksinya belajar alat baru, dan bahwa Coderoach mengerjakan peralihan semacam itu dengan rapi. |
| Pembaca | Pemimpin redaksi, pengelola lembaga, atau tim komunikasi yang punya arsip bertahun-tahun di WordPress; membaca di laptop kantor, sering setelah rapat tentang "situs kita ketinggalan zaman". |
| Insight | Yang ditakuti redaksi bukan situs lama, tapi kehilangan kebiasaan dan arsipnya. Proyek CMS gagal ketika penulis dipaksa pindah alat. Sumber: `projects.ts` ("memaksa mereka pindah CMS adalah cara tercepat membuat proyek ini gagal"), `docs/laporan-lengkap.md` repo TGR ("tidak ada satu pun kebiasaan yang harus diganti", permalink lama dipertahankan apa adanya). |
| Satu pesan | Redaksi tetap menulis di tempat yang sama; yang berganti hanya apa yang dilihat pembaca. |
| Bukti | Peralihan domain 24 Agustus 2026; konten dibaca dari wp-json produksi tanpa migrasi database; webhook memperbarui halaman begitu tulisan disimpan; rute /en dengan canonical dan hreflang; arsip tersaring lewat URL; kartu pratinjau untuk WhatsApp; Statistik dari Search Console dan CrUX di dalam wp-admin; Sorotan Judul wajib sebelum terbit (panduan redaksi). |
| Nada dan identitas | Identitas situs TGR (`src/app/globals.css`): kanvas `#f8f8f6`, tinta `#111`, aksen navy `#0b3d91`, emas merek `#b27d0f`, kertas `#f6efdc`, Montserrat untuk judul dan antarmuka, Cardo serif untuk bacaan; ciri khas "Sorotan Judul" (coretan penanda pada frasa kunci judul). Plus DESIGN.md situs bagian bespoke. |
| Batasan | Halaman web bahasa Indonesia, terbaca tanpa JS, LCP ≤2,5 s, CLS <0,1, reduced-motion, 320 sampai 1440 px. Satu tangkapan asli (beranda). Izin klien mencakup nama, logo, tangkapan; tidak ada angka baru tanpa izin. Flow boleh, tapi foto tokoh atau kejadian geopolitik buatan AI tidak pantas untuk media analisis. |
| Kriteria menilai ide | (1) Orisinal: bukan "sebelum/sesudah" situs atau diagram headless kotak-panah. (2) Relevan: memperlihatkan bahwa satu tindakan redaksi yang sama menghasilkan situs baru. (3) Jujur: tidak memalsukan tampilan wp-admin atau artikel; teks contoh ditandai. (4) Hormat pada media klien: tidak meniru logo atau byline sungguhan selain di tangkapan berizin. (5) Terbaca tanpa JS dan di 320 px. |

## Ideasi

Ide mentah dari Farrez: tidak ada (delegasi penuh 30 Okt 2026).

Putaran 1: tiga subagen terpisah, satu sudut masing-masing, tanpa melihat hasil lain dan tanpa
referensi. Putaran 2 ditulis setelah rujukan dibuka. Huruf = urutan acak untuk penilai.

| # | Sudut | Ide dalam satu kalimat | Putaran | Ditandai "jelas"? |
|---|---|---|---|---|
| F | pembaca, lokal | Tautan tulisan di bubble grup WhatsApp tidak berubah satu huruf pun saat situs di bawahnya berganti | 1 | ya |
| K | pembaca, lokal | Garis waktu sehari redaksi (rapat, tulis, Simpan, tenggat) bertanda "tetap"; di titik Simpan halaman pembaca baru menyala | 1 | |
| B | pembaca, lokal | Rak map arsip per tahun menyala lengkap, penyaring arsip muncul sebagai URL yang bisa disalin | 1 | |
| P | pembaca, lokal | Satu tombol Simpan ilustrasi; kartu halaman baru muncul di sebelahnya dalam hitungan detik | 1 | |
| H | pembaca, lokal | Tiga pembaca lembaga kajian (pemred, peneliti, humas) membaca tulisan yang sama dan menemukan yang dicari | 1 | |
| M | mekanisme | Satu kartu tulisan berubah dari Draf ke Terbit karena Simpan; tiga baris (REST, webhook, halaman) menyala | 1 | ya |
| A | mekanisme | Satu judul contoh berpindah rupa: halaman /id, /en, kartu WhatsApp, baris arsip tersaring | 1 | |
| D | mekanisme | Tombol Terbit terkunci sampai coretan Sorotan Judul tergambar di frasa kunci: "Tanpa sorotan, tidak terbit" | 1 | |
| Q | mekanisme | Domain di URL bergeser ke yang baru sementara jalur permalink diam ditahan garis emas | 1 | |
| L | mekanisme | Tiga lembar Tulis, Statistik, Terbit; Statistik terselip di antara yang sudah dikenal redaksi | 1 | |
| C | metafora luar | Rumah direnovasi sambil ditinggali: fasad berganti, ruang redaksi tetap menyala | 1 | ya |
| N | metafora luar | Mesin kapal diganti di tengah pelayaran, anjungan diam | 1 | |
| G | metafora luar | Perpustakaan pindah gedung, nomor rak tetap | 1 | |
| E | metafora luar | Panggung berganti set, belakang panggung (naskah, tombol Terbitkan) sama | 1 | |
| J | metafora luar | Huruf timah yang sama dicetak tiga kali di kertas dan tinta berbeda, Sorotan muncul di tiap cetakan | 1 | |
| R | rujukan luar industri, lokal | Wayang kulit: dalang dan wayangnya (redaksi, tulisan) tetap di balik kelir; yang diganti lampu dan layarnya, penonton melihat bayangan yang lebih tajam | 2 | |
| I | identitas klien | Sorotan Judul jadi mesin halaman: blok navy menyapu frasa kunci di setiap judul bab saat digulir, dan bab terakhir menjelaskan bahwa redaksi sendiri yang memilih frasa itu | 2 | |
| O | mekanisme, bukti | Satu judul contoh ditulis di kolom isian ilustrasi; di sebelahnya beranda bergaya TGR menyusun judul itu lengkap dengan sorotannya | 2 | |

Rujukan setelah putaran 1: tangkapan beranda TGR berizin (blok sorotan navy pada "Politik Sukarno",
Montserrat tebal, Cardo untuk dek); panduan redaksi TGR bagian 6 "Sorotan Judul: coretan penanda pada
frasa kunci, WAJIB sebelum terbit"; luar industri: kelir wayang kulit (dalang tetap, lampu blencong
dan layar yang menentukan bayangan).

## Penilaian (subagen terpisah)

| # | Orisinal | Relevan | Layak | Catatan |
|---|---|---|---|---|
| F | 3 | 4 | ya | Bukti permalink dari sisi pembaca; bubble harus ilustrasi |
| K | 3 | 5 | ya | Kebiasaan redaksi langsung, bentuk garis waktu biasa |
| B | 2 | 4 | ya | Rak arsip tertebak |
| P | 1 | 4 | ya | Gugur, hanya demo tombol |
| H | 2 | 2 | ya | Gugur, tidak menyentuh insight |
| M | 1 | 4 | sulit | Gugur, kotak-panah, berisiko meniru wp-admin |
| A | 3 | 4 | ya | Satu tulisan di banyak tempat, kekuatan headless yang jujur |
| D | 4 | 3 | sulit | Pesannya condong ke "alat mengatur" |
| Q | 4 | 5 | ya | Terkuat: dari satu baris URL, arsip dan kebiasaan terbaca sekaligus |
| L | 2 | 3 | ya | Daftar fitur, bukan cerita |
| C | 2 | 4 | ya | Gugur, renovasi klise |
| N | 2 | 3 | ya | Gugur, klise |
| G | 3 | 5 | ya | Pas tapi sering dipakai |
| E | 2 | 4 | ya | Tertebak |
| J | 4 | 4 | ya | Cocok dengan kertas `#f6efdc` dan dua huruf TGR |
| R | 5 | 4 | sulit | Paling tak terduga; harus abstrak supaya tidak eksotis |
| I | 4 | 3 | ya | Identitas klien sebagai alat cerita, relevansi baru di akhir |
| O | 2 | 4 | sulit | Dekat sekali dengan meniru wp-admin |

Usulan penilai: A = Q+F "Alamat yang diam" (paling aman), B = R+I "Kelir", C = J+A(+K) "Satu acuan,
banyak cetakan".

Koreksi fakta dari penyusun naskah sebelum GK: domain tidak berganti. `theglobal-review.com` tetap
alamatnya; yang pindah adalah WordPress (ke `cms.theglobal-review.com`) dan yang menjawab alamat itu
(situs Next.js). Jadi di konsep A seluruh URL diam, termasuk domainnya; yang berganti adalah halaman
di baliknya.

## Tiga konsep

### Konsep A: Alamat yang diam (paling aman)

- Ide: satu alamat tulisan yang sama, huruf demi huruf, sebelum dan sesudah 24 Agustus 2026; yang
  berganti hanya halaman yang menjawabnya.
- Relevan: arsip dan kebiasaan tidak hilang dibuktikan oleh benda yang paling dikenal pembaca, tautan.
- Koreografi: wipe di satu bingkai (sebelum dan sesudah), quiet reveal untuk bab lain.

| Adegan | Pesan | Teks tampil | Yang terlihat | Transisi |
|---|---|---|---|---|
| 1 | Jawaban dulu | Nama, tagline, ringkasan | Satu URL contoh besar dalam Montserrat | Statis |
| 2 | Alamat tetap | "Alamatnya tidak berubah satu huruf pun" | Bubble WhatsApp ilustrasi berisi tautan yang sama | Wipe bingkai di bawahnya |
| 3 | Yang berganti | Kartu pratinjau besar, /en, arsip tersaring | Kartu digambar ulang | Reveal |
| 4 | Bukti | Tangkapan beranda berizin | Tangkapan | Enter |

### Konsep B: Kelir

- Ide: pertunjukan wayang tetap dimainkan dalang yang sama di balik kelir; yang diganti lampu dan
  layarnya, dan bayangan di kelir jadi lebih tajam. Redaksi = dalang (tidak berubah), Next.js =
  lampu dan kelir baru, pembaca = penonton. Visual abstrak: bidang kertas kelir, cahaya, bentuk
  gunungan geometris tanpa tokoh, dan blok Sorotan Judul navy sebagai "bayangan" yang menajam.
- Relevan: tepat pada insight (yang di balik layar tidak berubah), dan lokal.
- Risiko: wayang membawa muatan budaya dan politik; untuk media geopolitik bisa terbaca sebagai
  komentar. Butuh penggarapan sangat abstrak.
- Koreografi: quiet reveal (bayangan menajam), tanpa pin.

| Adegan | Pesan | Teks tampil | Yang terlihat | Transisi |
|---|---|---|---|---|
| 1 | Jawaban dulu | Nama, tagline, ringkasan | Kelir kertas krem dengan siluet gunungan geometris kabur | Blur ke tajam |
| 2 | Di balik kelir | "Redaksi tetap di wp-admin" | Sisi belakang: daftar kebiasaan redaksi | Reveal |
| 3 | Lampu baru | Next.js, webhook, /en | Cahaya menyorot, bayangan judul contoh menajam dengan sorotan | Reveal |
| 4 | Bukti | Tangkapan beranda | Tangkapan | Enter |

### Konsep C: Satu acuan, banyak cetakan

- Ide: satu acuan huruf (judul contoh beserta Sorotan Judul yang dipilih redaksi) disusun sekali di
  wp-admin, lalu dicetak di banyak lembar: halaman berbahasa Indonesia, halaman /en, kartu
  pratinjau WhatsApp, dan baris arsip tersaring. Acuannya satu; cetakannya banyak, dan semuanya
  memakai sorotan yang sama.
- Relevan: redaksi menyusun satu kali di tempat yang sama, pembaca mendapat banyak permukaan baru.
  Ini cara kerja headless yang jujur (REST API ke banyak tampilan), dan sorotan adalah bukti bahwa
  pilihan redaksi yang dibawa ke mana-mana.
- Koreografi: pin dan scrub pendek (≥1024 px): acuan diam di kiri, lembar cetakan berganti di kanan
  satu per satu (sticky stack). Di ponsel dan tanpa JS: acuan lalu empat cetakan berurutan.

| Adegan | Pesan | Teks tampil | Yang terlihat | Transisi |
|---|---|---|---|---|
| 1 (pembuka) | Jawaban dulu | Nama TGR dalam Montserrat 800 dengan frasa "Global Review" tersorot navy; tagline; Masalah/Solusi/Hasil dalam Cardo | Kanvas `#f8f8f6`, judul bersorot persis gaya situs klien | Sorotan tersingkap kiri ke kanan sekali saat dimuat (mk), statis tanpa gerak |
| 2 | Satu acuan | "Ditulis sekali, di tempat yang sama" | Kartu kertas `#f6efdc` berlabel "Acuan, di wp-admin": judul contoh, kolom Sorotan Judul berisi frasa, catatan "wajib sebelum terbit" | Statis di kiri |
| 3 | Cetakan 1 | "Halaman tulisan" | Lembar halaman tulisan: kicker rubrik, judul bersorot, dek Cardo | Lembar masuk |
| 4 | Cetakan 2 | "/en, dengan hreflang" | Lembar yang sama dalam bahasa Inggris, label `hreflang="en"` | Lembar berganti |
| 5 | Cetakan 3 | "Kartu pratinjau di WhatsApp" | Kartu pratinjau besar yang digambar server (foto diganti bidang navy, logo TGR teks) | Lembar berganti |
| 6 | Cetakan 4 | "Arsip yang tersimpan di URL" | Baris arsip dan bilah alamat dengan parameter saring contoh | Lembar berganti |
| 7 | Bukti | Tangkapan beranda berizin | Tangkapan di bingkai browser | Enter |
| 8 | Untuk redaksi | Statistik di wp-admin, tanpa pelacak pihak ketiga; peralihan 24 Agustus 2026 tanpa memutus permalink | Teks | Quiet |

- Semua judul di lembar adalah judul contoh, ditandai "Contoh", bukan artikel asli; rubrik memakai
  nama rubrik nyata (publik di menu situs). Flow 0 kredit.

## Gerbang GK

Diputuskan subagen penilai terpisah atas nama Farrez (delegasi 30 Okt 2026), dicatat sebagai D-01
pada 2026-10-30.

- **Terpilih: Konsep C, Satu acuan, banyak cetakan**, ditambah satu butir dari F: lembar arsip
  menyebut bahwa alamat tulisan lama tetap sama. Paling tepat untuk satu pesan (redaksi menyusun
  sekali di tempat yang sama, pembaca melihatnya di banyak tempat), jujur tentang cara kerja
  headless, dan Sorotan Judul jadi benang merah yang bisa dibuktikan: ia ciri situs klien (terlihat
  di tangkapan berizin) dan dipilih redaksi, jadi yang tampil sebagai jagoan adalah kebiasaan
  redaksi, bukan alat Coderoach.
- **Kalah, A (Alamat yang diam):** setelah koreksi bahwa domain tidak berganti, tidak ada yang
  bergerak di layar selain wipe sebelum dan sesudah, bentuk yang ditolak kriteria brief.
- **Kalah, B (Kelir):** wayang dan gunungan membawa muatan budaya dan politik; untuk media analisis
  geopolitik mudah terbaca sebagai komentar redaksi, dan bila dibuat cukup abstrak maknanya hilang.

Koreksi wajib dan cara memenuhinya:

1. Kartu Acuan bukan tiruan wp-admin: kertas `#f6efdc` dengan Cardo, tanpa bilah samping, ikon, atau
   warna WordPress, berlabel "Ilustrasi, bukan tangkapan layar". Diverifikasi di panduan redaksi TGR
   bagian 6: Sorotan Judul memang kotak di layar sunting, dan sejak Agustus 2026 Terbitkan dengan
   kotak kosong menyimpan tulisan sebagai draf (termasuk sunting cepat, massal, dan jadwal).
2. Judul contoh netral ("Membaca Ulang Peta Kerja Sama Maritim di Kawasan"), tanpa byline atau
   tanggal, label "Contoh" di setiap lembar.
3. Kartu WhatsApp tanpa tiruan antarmuka WhatsApp dan tanpa gambar logo: nama ditulis sebagai teks.
   Bentuknya mengikuti aslinya (`opengraph-image.tsx` repo TGR: 1200×630, foto, overlay navy, logo;
   judul tidak digambar di dalam gambar karena aplikasi menampilkannya di bawah).
4. Tanpa JS dan di 320 px: tumpukan vertikal statis dengan sorotan penuh; tidak ada pin sama sekali
   (acuan hanya `position: sticky` di kolomnya pada layar ≥1024 px, lembar bergulir biasa);
   sorotan yang terbelah baris memakai `box-decoration-break: clone`; URL arsip terbungkus.
5. Klaim dicek ke repo TGR: hreflang (`src/lib/seo.ts` `alternates.languages`), isi /en (laporan
   lengkap: antarmuka dan isi artikel tersedia di /en), parameter arsip (`CategoryBrowser.tsx`:
   `waktu`, `urut`, `page`), permalink lama dipertahankan (laporan lengkap), kartu pratinjau
   (`opengraph-image.tsx`). "Tanpa pelacak pihak ketiga" sudah ada di copy `projects.ts` yang tayang.

Koreografi akhir: sticky stack tanpa menahan scroll (kolom acuan menempel, lembar cetakan masuk satu
per satu dengan reveal pendek), karena ceritanya beberapa modul setara dari satu sumber.

## Produksi

- Dibangun di `src/app/(frontend)/work/_bespoke/the-global-review/`. Montserrat dipakai bersama
  Laporta, jadi variabel font-nya diganti nama dari `--font-laporta` ke `--font-montserrat`; Cardo
  ditambahkan.
- Sorotan tidak dianimasikan: ia pilihan redaksi dan tampil seperti di isu utama situsnya. Yang
  bergerak hanya lembar cetakan, sekali saat masuk.
- Kuota: Flow 0 kredit, Gemini 0 permintaan.
- GD5: pratinjau lokal 1440×900 (kolom acuan menempel, lembar bergulir) dan 320 px (tanpa luber,
  URL arsip terbungkus), lalu audit `impeccable` oleh subagen terpisah.
- Audit `impeccable` (subagen, dari kode): 17/20. Diterapkan: label dan catatan di kartu acuan
  memakai Montserrat; nama klien di h1 memakai `span`, `mark` hanya untuk contoh sorotan; nama
  cetakan jadi `h3`; nomor cetakan digelapkan ke 5,5:1 dan disembunyikan dari pembaca layar;
  tangkapan beranda ikut bergerak masuk; `!important` dibuang. Tanggal tangkapan 14 Oktober 2026
  dari catatan sampul di `projects.ts`.
