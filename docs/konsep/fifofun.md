# Konsep: halaman bespoke FiFoFun (/work/fifofun)

Tanggal: 2026-10-30. Jenis: scrollytelling (halaman proyek bespoke, ADR 0013).
Proyek: T-0087. Prosedur: skill `alur-desain` 1.3.0, `references/konsep.md`. Izin: studio (lab).
Batas: rumah tangga fiktif; tanpa nama bank (copy yang tayang menyebut "e-Statement bank").

## Brief

| Butir | Isi |
|---|---|
| Tujuan | Setelah membaca, calon klien percaya bahwa Coderoach membangun perangkat lunak keuangan yang memeriksa dirinya sendiri terhadap sumber di luar dirinya, bukan sekadar mencatat. |
| Pembaca | Keluarga atau pemilik usaha kecil yang mengelola uang di spreadsheet dan pernah kaget saldonya tidak sama dengan rekening; juga calon klien fintech kecil. Membaca di ponsel. |
| Insight | Spreadsheet anggaran tidak pernah diperiksa terhadap apa pun di luar dirinya, jadi salah kategori dan saldo dompet yang minus bertahan berminggu-minggu. Yang membuat angka bisa dipercaya adalah saldo yang dicetak bank, sampai ke sen. Sumber: `projects.ts`, `_referensi/portofolio/_kerja/fifofun-fakta.md` (repo publik, MIT). |
| Satu pesan | Setiap angka dicocokkan dengan saldo cetakan bank dulu, baru dipakai untuk merencanakan. |
| Bukti | Parser e-Statement dengan empat pemeriksaan rekonsiliasi, yang terkuat menelusuri rantai saldo baris demi baris (4265a70); impor yang tidak cocok ditolak utuh; uang "dipastikan bank" terpisah dari "hanya perkiraan" (dompet digital, tunai); saldo dompet yang meleset dicatat sebagai penyesuaian; anggaran di samping median bulan sebelumnya; pos jarang dihargai per bulan; ringkasan 3 bulan sebagai PDF; Playwright mengukur grafik dan axe di setiap push (1121214). Rekaman memakai rumah tangga fiktif. |
| Nada dan identitas | Repo FiFoFun (`src/app/globals.css`, `layout.tsx`): IBM Plex Sans self-hosted, warna sistem Apple dengan `light-dark()`, aksen system teal `#0071a4` (gelap `#40c8e0`), hijau `#248a3d`, merah `#d70015`, skala teks gaya iOS (body 17), radius 6 sampai 20 px, kelompok inset. Plus DESIGN.md situs bagian bespoke. |
| Batasan | Halaman web bahasa Indonesia, terbaca tanpa JS, LCP ≤2,5 s, CLS <0,1, reduced-motion, 320 sampai 1440 px. Aset: tur, loop ponsel ringkasan, enam tangkapan (impor, rekonsiliasi, anggaran, ringkasan, ringkasan 3 bulan), rumah tangga fiktif. Tanpa nama bank, tanpa angka nyata. |
| Kriteria menilai ide | (1) Orisinal: bukan dashboard anggaran atau grafik pengeluaran. (2) Relevan: memperlihatkan pemeriksaan terhadap bank sebagai inti. (3) Jujur: angka contoh ditandai, rekonsiliasi digambarkan seperti kerjanya. (4) Identitas FiFoFun. (5) Terbaca tanpa JS dan di 320 px. |

## Ideasi

Ide mentah dari Farrez: tidak ada (delegasi penuh 30 Okt 2026). Putaran 1: tiga subagen terpisah
tanpa referensi. Putaran 2 setelah rujukan dibuka. Huruf = urutan acak untuk penilai.

| # | Sudut | Ide dalam satu kalimat | Putaran | Ditandai "jelas"? |
|---|---|---|---|---|
| H | pembaca, lokal | Buku kas keluarga di kiri, saldo cetakan di kanan, dicocokkan baris demi baris | 1 | ya |
| B | pembaca, lokal | Amplop gaji per pos, satu amplop ternyata kurang lalu dibuka | 1 | |
| N | pembaca, lokal | "Kok kurang?": satu angka selisih e-wallet dilacak sampai satu baris penyebab | 1 | |
| E | pembaca, lokal | Kertas mutasi ATM menjulur sepanjang halaman, tiap tanggal dicap cocok | 1 | |
| Q | pembaca, lokal | Suami dan istri sama-sama mencatat, saldo cetakan jadi hakim | 1 | |
| C | mekanisme | Pita cetakan: tiap baris "saldo sebelumnya + mutasi = saldo cetakan" disegel; satu gagal, seluruh pita menolak diri, tersimpan 0 baris | 1 | ya |
| J | mekanisme | Dua nasib impor bersebelahan: yang lolos disimpan, yang meleset sen mundur utuh | 1 | |
| A | mekanisme | Dua laci uang: dipastikan bank dan hanya perkiraan; dompet yang meleset memunculkan baris penyesuaian | 1 | |
| L | mekanisme | Satu saldo dompet yang bergeser diikuti sampai tercatat sebagai penyesuaian | 1 | |
| G | mekanisme | Batas anggaran tumbuh di samping median; pos tahunan dipotong dua belas | 1 | |
| F | metafora luar | Surveyor menutup poligon ukur: transaksi sebagai sisi, saldo cetakan sebagai patok, celah berarti ditolak | 1 | ya |
| D | metafora luar | Ukur dua kali, potong sekali: buku dan cetakan, rencana hanya bila sama | 1 | |
| K | metafora luar | Satu mata rantai sepeda retak memutus seluruh rantai saldo | 1 | |
| M | metafora luar | Navigator mengoreksi perkiraan dengan bintang: saldo bank memaku posisi | 1 | |
| P | metafora luar | Timbangan dapur dinolkan dulu sebelum menimbang | 1 | |
| R | rujukan luar industri, lokal | Buku tabungan yang dicetak di mesin cetak buku bank: tiap baris tercetak dengan saldonya, dan app membaca baris-baris itu sebagai juri, bukan sebagai catatan | 2 | |
| I | identitas | Kelompok inset gaya iOS dari app: dua kelompok "Dipastikan bank" dan "Hanya perkiraan" berdampingan, teal sebagai tanda yang sudah dicek | 2 | |
| O | mekanisme, bukti | Satu impor contoh dijalankan di halaman: empat pemeriksaan berurutan, yang keempat menelusuri rantai dan menunjuk baris yang salah | 2 | |

Rujukan setelah putaran 1: enam tangkapan, tur, dan loop ponsel FiFoFun (rumah tangga fiktif);
`globals.css` dan `layout.tsx` repo (IBM Plex Sans, warna sistem Apple, kelompok inset); luar
industri: poligon ukur tertutup dalam survei tanah (salah tutup), dan buku tabungan cetak.

Fakta mekanisme untuk naskah (`src/lib/statement/mandiri-xlsx.ts` repo FiFoFun, fungsi
`reconcile`): empat pemeriksaan independen: jumlah baris masuk sama dengan total di kepala
e-Statement; jumlah baris keluar sama dengan totalnya; saldo awal + masuk − keluar sama dengan saldo
akhir; dan rantai saldo per baris. Rantai sengaja lokal per baris: tiap baris diperiksa terhadap
saldo yang dicetak bank pada baris sebelumnya, bukan terhadap total yang kami jumlahkan sendiri,
sehingga satu baris yang hilang memutus rantai di satu titik, dan satu saldo yang salah terbaca
memutusnya di dua titik. Semua angka dalam sen.

## Penilaian (subagen terpisah)

| # | Orisinal | Relevan | Layak | Catatan |
|---|---|---|---|---|
| M | 5 | 5 | ya | Dead reckoning = catatan yang melenceng tanpa acuan luar; bintang = saldo cetakan |
| K | 4 | 5 | ya | Rantai saldo pemeriksaan terkuat; SVG vertikal pas di 320 px |
| Q | 3 | 4 | ya | Kisah manusia, bank jadi hakim |
| N | 3 | 4 | ya | Bagus sebagai babak, lemah sebagai kerangka |
| R | 2 | 5 | ya | Terlalu dekat struk Laporta |
| C | 2 | 5 | ya | Kertas plus cap, mengulang Laporta |
| E | 1 | 4 | ya | Sudah dipakai |
| F | 2 | 4 | sulit | Terlalu dekat lembar ukur LocaScore |
| H | 2 | 4 | ya | Aman dan datar |
| J | 2 | 4 | ya | Mengulang wipe Coderoach OS |
| P | 3 | 3 | ya | Hanya saldo awal |
| B | 3 | 2 | ya | Metode budgeting, bukan pemeriksaan; gugur |
| D | 1 | 3 | ya | Klise |
| O | 2 | 5 | sulit | Demo murni, cocok jadi babak bukti |
| A | 2 | 4 | ya | Bahan babak |
| L | 2 | 3 | ya | Sempit |
| I | 1 | 3 | ya | UI app, bukan ide |
| G | 2 | 1 | ya | Tidak menyentuh bank; gugur |

## Tiga konsep

### Konsep A: Posisi pasti (M + A)

- Ide: rumah tangga berlayar dengan perkiraan. Catatan sendiri seperti dead reckoning: setiap
  transaksi yang diketik memindahkan posisi, dan kesalahan kecil menumpuk tanpa ada yang tahu.
  Saldo yang dicetak bank adalah fix bintang yang memaku posisi. Dompet digital dan tunai tetap
  perkiraan sampai saldonya dicek, dan selisihnya dicatat sebagai penyesuaian, bukan dihapus.
  Rencana (anggaran di samping median) baru digambar dari titik fix.
- Batas analogi: bank tidak memaku dompet digital atau tunai; keduanya tetap "hanya perkiraan".
- Koreografi: progress rail (garis rute vertikal): jejak perkiraan putus-putus melenceng sedikit
  demi sedikit, fix bank menariknya ke titik pasti di tiap e-Statement. Tanpa JS peta statis.

| Adegan | Pesan | Teks tampil | Yang terlihat | Transisi |
|---|---|---|---|---|
| 1 | Jawaban dulu | Nama, tagline, ringkasan | Kelompok inset gaya iOS, teal | Statis |
| 2 | Melenceng | "Catatan sendiri melenceng pelan-pelan" | Jejak putus-putus menjauh dari garis benar | Rail |
| 3 | Fix | "Saldo cetakan bank memaku posisi" | Titik fix teal; empat pemeriksaan impor; rantai lokal per baris | Reveal |
| 4 | Dua jenis uang | "Dipastikan bank" dan "Hanya perkiraan" | Dua kelompok inset; penyesuaian dicatat | Reveal |
| 5 | Rencana | Anggaran dari titik fix | Tangkapan anggaran | Enter |

### Konsep B: Satu mata rantai (K + O)

- Rantai vertikal, tiap mata "saldo cetakan baris sebelumnya + mutasi = saldo cetakan baris ini";
  satu mata retak, impor ditolak utuh. Empat pemeriksaan sebagai empat uji rantai. Harus
  menghindari visual "log ditolak" Coderoach OS.

### Konsep C: Kok kurang? (Q + N, paling aman)

- Suami dan istri mencatat sendiri-sendiri, saldo cetakan jadi hakim, selisih dilacak ke satu
  baris e-wallet.

## Gerbang GK

Diputuskan subagen penilai terpisah atas nama Farrez (delegasi 30 Okt 2026), D-01, 2026-10-30.

- **Terpilih: Konsep A, Posisi pasti (M + A).** Satu-satunya yang memuat pemisahan yang memang ada
  di kode: "hanya perkiraan" (`balances.tsx`) dihitung dari uang yang masuk, persis dead reckoning;
  fix bintang cocok dengan teks app ("satu-satunya angka di halaman ini yang dicek ke sumber di
  luar app"); pengamatan yang gagal dibuang, seperti `import-statement.ts` yang tidak menyimpan
  satu transaksi pun dan menyebut barisnya. Peta laut belum dipakai halaman lain.
- **Kalah, B (Satu mata rantai):** "seluruh rantai putus" menyalahi kode (rantainya lokal, satu
  baris hilang memberi satu titik putus), dan visualnya dekat dengan wipe Coderoach OS.
- **Kalah, C (Kok kurang?):** paling aman dan paling datar; cocok sebagai babak, lemah sebagai kerangka.

Koreksi wajib dan pemenuhannya:

1. Tangkapan rekonsiliasi dan impor menampilkan nama bank; halaman ini hanya memakai tangkapan
   anggaran dan ringkasan 3 bulan. Temuan dilaporkan untuk keputusan Farrez (tangkapan itu sudah
   tayang di template bersama).
2. Batas analogi tampil di halaman: fix hanya untuk rekening bank; e-Statement hanya melihat top-up
   ke dompet digital; penyesuaian adalah pengamatan pemilik yang dicatat sebagai transaksi.
3. Empat pemeriksaan ditulis persis seperti `reconcile`.
4. Dua lapis dipisah: gerbang impor (empat pemeriksaan) dan perbandingan "app menghitung, bank
   mencetak" di Ringkasan.
5. Plot dibaca sebagai peta laut: jejak perkiraan putus-putus berlabel, fix teal berlabel; angka
   contoh ditandai fiktif.

## Produksi

- Dibangun di `src/app/(frontend)/work/_bespoke/fifofun/`; IBM Plex Sans lewat next/font.
- Hanya tangkapan anggaran dan ringkasan 3 bulan yang tampil di bagian fitur; tangkapan impor dan
  rekonsiliasi memuat nama bank (temuan dilaporkan; keduanya sudah tayang di template bersama).
- Kuota: Flow 0 kredit, Gemini 0 permintaan.
- GD5: pratinjau lokal 1440×900 (peta dengan dua titik pasti) dan 320 px (tanpa luber), lalu
  audit `impeccable` oleh subagen terpisah.
- Audit `impeccable` (subagen, dari kode): 15/20. Diterapkan: garis posisi sebenarnya digelapkan
  ke 3,3:1 dan masuk legenda; garis memakai `vector-effect: non-scaling-stroke` dan titik pasti
  diperbesar supaya tetap terbaca di 320 px; pemeriksaan pertama dan kedua ditulis "total uang"
  (yang dibandingkan nominal, bukan banyaknya baris); `role="list"`; keterangan peta menyebut bahwa
  bintangnya hanya untuk rekening bank. Dibiarkan: risiko CLS dari tinggi adegan setelah hidrasi
  (pola bersama); tur dan teks CMS tidak disaring nama bank (tur sudah tayang, dilaporkan bersama
  temuan tangkapan).

## Storyboard scroll (14 Nov 2026)

Data sketsa: `docs/konsep/storyboard/fifofun.json`. Satu pin saja tetap (Posisi pasti, 200vh, hanya
layar ≥1024×900). Adegan baru tanpa pin. Posisi vh diperkirakan dari kode di layar 1440×900,
belum diukur di produksi.

### Halaman sekarang

| # | Adegan | Berkas | Gerak sekarang |
|---|---|---|---|
| 1 | Hero: nama, tagline, Tonton turnya, ringkasan dalam grup inset | `FiFoFunPage.tsx:46-77` | Tidak ada |
| 2 | Posisi pasti: peta laut ilustrasi, garis perkiraan dan dua titik pasti | `FiFoFunPage.tsx:79-117`, `fifofun.css:35-53` | Pin 200vh: garis perkiraan diam, dua titik pasti muncul berurutan |
| 3 | Empat pemeriksaan impor | `FiFoFunPage.tsx:119-140`, `fifofun.css:59` | Tiap baris naik 12px saat masuk |
| 4 | Dua jenis uang, lalu fitur anggaran dan ringkasan 3 bulan | `FiFoFunPage.tsx:142-190`, `fifofun.css:65` | Tangkapan naik 28px dan muncul |
| 5 | Tur, babak gelap | `TourChapter.tsx` | Video tidak autoplay |
| 6 | Sumber | `Sources.tsx` | Tidak ada |

Catatan: loop ponsel `fifofun-ringkasan-hp-loop.v1.mp4` sudah ada dan dipakai kartu katalog, tapi
tidak tampil di halaman bespoke.

### Storyboard scroll

| # | scroll vh | layar | koreografi | gerak | ponsel | reduced-motion | aset ada/belum |
|---|---|---|---|---|---|---|---|
| F1 | 0–100 | Hero | none | Tidak ada | Satu kolom | Sama | ada (teks) |
| F2 | 100–300 | Posisi pasti | pin-scrub | Garis perkiraan tergambar dari kiri ke kanan mengikuti scroll; titik pasti mendarat tepat saat garis mencapainya, lalu garis mulai lagi dari posisi sebenarnya. Label kecil di ujung garis berganti dari "Perkiraan" ke "Pasti" | Tanpa pin, peta utuh | Peta utuh dengan dua titik pasti | ada (SVG di kode) |
| F3 | 300–400 | Empat pemeriksaan impor | quiet-reveal | Nomor tiap pemeriksaan berganti jadi tanda centang berurutan saat barisnya masuk | Sama, satu kolom | Keempatnya bernomor, tanpa animasi | ada |
| F4 **baru** | 400–480 | Rantai saldo: enam baris mutasi contoh dengan saldo cetakan bank, utuh lalu satu baris hilang | wipe | Di satu bingkai, garis sapu bergerak saat dibaca; di balik garis, satu baris hilang dan tepat satu titik rantai ditandai putus | Dua versi bertumpuk tanpa gerak | Dua versi berdampingan | belum: tabel contoh di kode, angka fiktif ditandai |
| F5 | 480–560 | Dua jenis uang: dipastikan bank dan hanya perkiraan | quiet-reveal | Bingkai teal pada grup "Dipastikan bank" tergambar sekali | Bertumpuk | Bingkai sudah ada | ada |
| F6 | 560–700 | Fitur: anggaran di browser, ringkasan 3 bulan di ponsel | quiet-reveal | Tangkapan naik pelan; ponsel memutar loop ringkasan dengan tombol jeda | Ponsel poster dulu | Poster diam, tombol putar | ada: anggaran, loop ponsel; belum: impor dan rekonsiliasi tanpa nama bank |
| F7 | 700–830 | Tur | none | Video tidak autoplay | Sama | Sama | ada |
| F8 | 830–900 | Sumber | none | Tidak ada | Sama | Sama | ada |

### Yang membuat lebih menarik

| Perubahan | Sekarang | Kenapa |
|---|---|---|
| Garis perkiraan tergambar (F2) | Garisnya sudah utuh sejak awal, hanya titik pasti yang muncul | Inti analoginya adalah melenceng pelan-pelan. Kalau garisnya tumbuh lalu dipaku, sebab-akibatnya terlihat, bukan dijelaskan. Pin tidak diperpanjang |
| Nomor jadi centang (F3) | Baris hanya bergeser 12px | Pemeriksaan berjalan berurutan di `reconcile`. Centang berurutan menunjukkan urutan itu |
| Rantai saldo (F4) | Kalimat panjang di pemeriksaan keempat menjelaskan rantai | Wipe di satu bingkai cocok untuk sebelum dan sesudah. Pembaca melihat sendiri bahwa satu baris hilang memutus satu titik, bukan seluruh rantai (koreksi GK pada konsep B) |
| Loop ringkasan di ponsel (F6) | Ringkasan 3 bulan tampil di bingkai browser, padahal dirancang untuk ponsel | Asetnya sudah ada. Fitur itu memang untuk dibaca dari ponsel |

### Kit portofolio

| Butir | Status | Celah |
|---|---|---|
| Ikon produk | Belum ada | Ikon 1024 px |
| Sampul rakitan | Tangkapan Ringkasan mentah | Sampul 16:10 di abu-abu grup app, aksen teal |
| Layar ≥4 | 5, tapi hanya 2 yang aman dipakai | Impor dan rekonsiliasi menampilkan nama bank |
| Loop kartu | Ada | Cukup |
| Tur | Ada, 45 detik | Tur juga memuat nama bank (temuan GK yang belum diputuskan) |
| Angka bersumber | 0 | Tidak ditambah |

### Aset yang perlu dibuat

| Berkas | Isi | Catatan |
|---|---|---|
| `fifofun-impor.v2.webp` | Hasil impor e-Statement tanpa nama bank | Rumah tangga dan e-Statement fiktif yang sama |
| `fifofun-rekonsiliasi.v2.webp` | Saldo hitungan app di samping saldo cetakan bank, tanpa nama bank | Membuka fitur "Satu angka yang dicek ke luar" di halaman ini |
| Tabel rantai F4 | Enam baris mutasi contoh dengan saldo per baris | Angka fiktif, dihitung supaya rantainya benar sebelum satu baris dihapus |
| `fifofun-ikon.v1.png` | Ikon produk 1024 px | Dari repo FiFoFun bila ada |
| `fifofun-sampul.v1.webp` | Sampul rakitan 16:10 | Mengikuti templat sampul yang belum diputuskan |
| Keputusan tur | Rekam ulang tur tanpa nama bank, atau biarkan | Keputusan Farrez, sudah tercatat sejak GK |
