# Konsep: halaman bespoke Viralytics (/work/viralytics)

Tanggal: 2026-10-30. Jenis: scrollytelling (halaman proyek bespoke, ADR 0013).
Proyek: T-0087. Prosedur: skill `alur-desain` 1.3.0, `references/konsep.md`. Izin: studio
(produk venture; nama mitra tidak disebut).

## Brief

| Butir | Isi |
|---|---|
| Tujuan | Setelah membaca, pemilik agensi KOL atau tim marketing brand percaya bahwa campaign influencer bisa dijalankan sebagai satu alur bergerbang yang semua pihak lihat bersama, dan bahwa laporan hasil tidak perlu disusun ulang. |
| Pembaca | Pemilik atau account manager agensi KOL, dan brand manager yang membayar campaign; membaca di laptop di sela menagih draft lewat chat. |
| Insight | Campaign KOL macet bukan karena kurang KOL, tapi karena tidak ada yang tahu siapa sedang menunggu siapa: brand tidak tahu KOL mana menunggu keputusannya, agensi menagih draft dan link satu per satu, angka views disalin tangan, laporan disusun ulang dari nol. Sumber: `projects.ts`, `_referensi/portofolio/_kerja/viralytics-fakta.md` (dari operasi mitra venture). |
| Satu pesan | Setiap langkah campaign punya pemilik dan gerbang, jadi semua orang melihat siapa yang sedang ditunggu. |
| Bukti | Fase Create Campaign, Submission, Drafting, Posting/Live dengan persetujuan brand per fase (commit 21df1da); link unggahan diverifikasi sebelum metrik ditarik otomatis (de99a87); status berubah seketika lewat SSE (11bec22); auth self-hosted Argon2id, sesi DB, CSRF (8ebf527); mode demo dicabut (4192092); laporan views, engagement, ER, biaya per view dan engagement dari data operasinya. Rekaman dan tangkapan data fiktif (handle berakhiran .contoh). |
| Nada dan identitas | Design System Viralytics (`Design System/colors_and_type.css` repo): tema gelap bawaan hitam pekat `#000`, kartu `#0b0f19`, biru merek `#2563eb` dengan halo, Satoshi untuk judul dan metrik, Inter untuk teks, pil sukses hijau. Plus DESIGN.md situs bagian bespoke. |
| Batasan | Halaman web bahasa Indonesia, terbaca tanpa JS, LCP ≤2,5 s, CLS <0,1, reduced-motion, 320 sampai 1440 px. Aset: tur 40 detik, empat tangkapan (papan campaign, direktori KOL, alur konten/fase, laporan), semua data fiktif. Flow boleh, tapi foto influencer buatan AI tidak pantas (menyerupai orang nyata). |
| Kriteria menilai ide | (1) Orisinal: bukan dashboard tour atau grid fitur. (2) Relevan: memperlihatkan "siapa menunggu siapa" yang terlihat semua pihak, dan laporan yang tidak disalin. (3) Jujur: data fiktif ditandai, tidak menampilkan orang atau handle nyata. (4) Identitas Viralytics (gelap, biru, Satoshi). (5) Terbaca tanpa JS dan di 320 px. |

## Ideasi

Ide mentah dari Farrez: tidak ada (delegasi penuh 30 Okt 2026). Putaran 1: tiga subagen terpisah
tanpa referensi. Putaran 2 setelah rujukan dibuka. Huruf = urutan acak untuk penilai.

| # | Sudut | Ide dalam satu kalimat | Putaran | Ditandai "jelas"? |
|---|---|---|---|---|
| D | pembaca, lokal | Satu hari menagih di grup chat ("kak, draftnya udah?"), tiap pesan dicap "menunggu: Brand/KOL/Agensi", lalu diganti papan fase | 1 | ya |
| K | pembaca, lokal | Satu "bola" biru berpindah antar pemilik di rel fase; di gerbang tampil siapa memegang dan berapa lama | 1 | |
| A | pembaca, lokal | Dua belas tangkapan insight dikirim manual menumpuk, lalu menyusut jadi satu laporan yang terisi sendiri | 1 | |
| P | pembaca, lokal | Sudut KOL: rate card, termin, dan kapan pembayaran bisa ditagih di tiap titik | 1 | |
| H | pembaca, lokal | Satu brief tiga kali berubah, riwayat revisi terlihat semua pihak | 1 | |
| M | mekanisme | Satu kartu KOL melewati empat fase, pelat "menunggu" pindah pemilik di tiap gerbang | 1 | ya |
| F | mekanisme | Satu klik "Setujui" di layar brand mengganti lencana di layar agensi dan KOL serentak (SSE) | 1 | |
| B | mekanisme | Matriks KOL × fase terisi, tiap sel macet menulis nama yang ditunggu, sampai "0 menunggu" | 1 | |
| Q | mekanisme | Kolom views kosong sampai link lolos verifikasi, lalu views dan ER terisi sendiri | 1 | |
| L | mekanisme | Baris papan campaign meluncur jadi tabel laporan tanpa disalin | 1 | |
| C | metafora luar | Kanal berpintu air bertingkat: kapal naik bilik demi bilik setelah brand setuju | 1 | ya |
| J | metafora luar | "Pass" dapur: piring (unggahan) diperiksa sebelum keluar, baru angkanya mengalir ke meja laporan | 1 | |
| E | metafora luar | Papan keberangkatan bandara dengan kolom "ditahan oleh" sebagai tokoh utama | 1 | |
| N | metafora luar | Estafet: tongkat "draft" berhenti di zona oper karena pelari berikutnya belum siap | 1 | |
| G | metafora luar | Cetakan master: angka mengalir ke laporan, jalur lama salah ketik satu digit | 1 | |
| R | rujukan luar industri, lokal | Papan nomor antrean kantor pelayanan: tiap loket (Brand, Agensi, KOL) memperlihatkan item campaign yang sedang menunggu di lokenya | 2 | |
| I | identitas | Halo biru Viralytics hanya satu di halaman, dan ia menandai siapa yang sedang memegang campaign; halo berpindah saat digulir | 2 | |
| O | mekanisme, bukti | Satu link unggahan ditempel sekali dan diikuti: diverifikasi, metrik ditarik, lalu muncul di laporan dengan angka yang sama | 2 | |

Rujukan setelah putaran 1: empat tangkapan dan tur 40 detik Viralytics (data fiktif); Design
System Viralytics (hitam pekat, kartu `#0b0f19`, biru `#2563eb` dengan halo); luar industri: papan
nomor antrean di kantor pelayanan (loket memanggil nomor, semua orang di ruangan melihat giliran).

## Penilaian (subagen terpisah)

| # | Orisinal | Relevan | Layak | Catatan |
|---|---|---|---|---|
| D | 3 | 5 | sulit | Tampilan chat hampir pasti mirip WhatsApp |
| K | 4 | 5 | ya | Bola berpindah pemilik menjawab insight langsung |
| A | 3 | 4 | sulit | Tangkapan insight cenderung meniru Instagram |
| P | 3 | 2 | ya | Gugur |
| H | 2 | 2 | ya | Gugur |
| M | 2 | 5 | ya | Gugur, tur kanban |
| F | 3 | 4 | sulit | Serentak tidak terlihat tanpa JS |
| B | 3 | 5 | ya | "0 menunggu" kuat, bentuk tabel biasa |
| Q | 2 | 3 | ya | Gugur |
| L | 2 | 3 | ya | Gugur, dekat wipe Coderoach OS |
| C | 5 | 4 | sulit | Gerbang dan pemilik pas; perlu label di tiap bilik |
| J | 4 | 4 | sulit | Bernuansa F&B, menggemakan Chicken Wow |
| E | 1 | 5 | ya | Gugur, kembaran split-flap YiheeCam |
| N | 4 | 5 | ya | Pelari menunggu di zona oper adalah insight-nya |
| G | 1 | 3 | ya | Gugur, mengulang The Global Review |
| R | 3 | 5 | ya | Satu keluarga "papan" dengan split-flap |
| I | 4 | 4 | ya | Perangkat identitas, bukan cerita utama |
| O | 3 | 4 | ya | Bukti terkuat "laporan tidak disalin" |

## Tiga konsep

### Konsep A: Pintu air (C + I)

- Ide: campaign adalah kapal yang naik kanal bilik demi bilik (Create Campaign, Submission,
  Drafting, Posting/Live). Tiap pintu punya pelat pemilik; halo biru satu-satunya di halaman
  menandai pintu yang sedang menahan. Kolam teratas adalah laporan, berisi air yang sama.
- Koreografi: progress rail vertikal (kanal) tanpa pin, tiap bilik masuk saat digulir.
- Risiko: air dan kapal adalah ilustrasi besar; "air yang sama" abstrak untuk "laporan tidak disalin".

### Konsep B: Estafet (N + O)

- Ide: campaign adalah lari estafet empat pelari di lintasan: Agensi, Brand, KOL, lalu kembali
  ke Agensi. Tongkatnya berganti nama di tiap zona oper (shortlist, persetujuan fase, draft, link
  unggahan). Di setiap zona oper tertulis siapa yang sedang memegang tongkat dan siapa yang
  berdiri menunggu, karena semua pelari melihat lintasan yang sama. Di garis finis, link yang
  sama diverifikasi, lalu views dan ER tercatat di laporan dengan angka yang identik.
- Relevan: "siapa menunggu siapa" secara harfiah (zona oper), dan gerbang = serah terima tongkat
  yang hanya sah di zona.
- Koreografi: progress rail horizontal pada layar lebar (lintasan menempel, tongkat maju dengan
  gulir, pin pendek ≥1024×800, 200vh), di ponsel lintasan vertikal statis berurutan.

| Adegan | Pesan | Teks tampil | Yang terlihat | Transisi |
|---|---|---|---|---|
| 1 (pembuka) | Jawaban dulu | Nama Satoshi besar, tagline, Masalah/Solusi/Hasil di atas hitam | Lintasan tipis biru di bawah judul, satu titik halo di garis start | Statis |
| 2 | Lintasan bersama | "Semua orang melihat lintasan yang sama" | Empat zona oper: Agensi mengajukan shortlist, Brand menyetujui fase, KOL mengirim draft dan link, Agensi memverifikasi | Tongkat (halo biru) maju per zona |
| 3 | Yang ditunggu | Di tiap zona: "Memegang: Brand. Menunggu: KOL" (contoh) | Pelat pemilik di zona aktif | Ganti per zona |
| 4 | Finis | "Link diverifikasi, angka ditarik, tidak diketik" | Satu link contoh .contoh, lalu views dan ER | Number reveal (angka akhir di HTML) |
| 5 | Bukti | Fitur dengan tangkapan asli | Papan campaign, direktori KOL, fase, laporan | Enter |
| 6 | Tur | Tur 40 detik | TourChapter | - |

### Konsep C: Bola biru (K + I + B, paling aman)

- Satu bola halo biru di rel fase di atas tangkapan papan campaign; di tiap gerbang tertulis siapa
  memegang dan berapa lama; penutup matriks KOL × fase sampai "0 menunggu". Risiko: tur dasbor
  berbaju lain.

## Gerbang GK

Diputuskan subagen penilai terpisah atas nama Farrez (delegasi 30 Okt 2026), D-01, 2026-10-30.

- **Terpilih: Konsep B, Estafet, dengan halo tunggal dari I.** Di zona oper satu pelari memegang
  tongkat dan pelari berikutnya berdiri menunggu, persis "siapa menunggu siapa"; gerbang fase
  menjadi serah terima yang hanya sah di zona, cocok dengan persetujuan per fase. Tidak mengulang
  halaman lain, bisa dibangun dari teks HTML, dan bagian finis membuktikan laporan tidak disalin.
- **Kalah, A (Pintu air):** paling orisinal, tapi bergantung pada ilustrasi besar, dan "air yang
  sama" terlalu abstrak untuk laporan yang tidak disalin.
- **Kalah, C (Bola biru):** pilihan aman; tetap tur dasbor berbaju lain.

Koreksi wajib dan pemenuhannya:

1. Urutan dan peran mengikuti produk: Create Campaign, Submission (agensi mengajukan KOL, brand
   memutuskan per KOL), Drafting (KOL menyetor draft, disetujui di gerbang fase), Posting/Live (KOL
   mengirim link, tim agensi memverifikasi lalu metrik ditarik; commit de99a87 "KOL kirim,
   Specialist setujui, metrik ditarik"), lalu laporan. Persetujuan per fase dari `campaign_phases`
   (21df1da: approve/reject per fase).
2. Bukan satu tongkat: tiga lajur KOL contoh berjalan sejajar di fase berbeda; satu gugur di
   Submission; tanpa peringkat atau juara.
3. Satu oper balik: draft satu KOL dikembalikan sekali.
4. Finis dibingkai sebagai satu link yang diikuti (diverifikasi, metrik ditarik), angka akhir di
   HTML, bertanda data contoh, handle berakhiran .contoh.
5. Tanpa JS dan 320 px: lajur berupa daftar semantik, pelat "Memegang" dan "Menunggu" berupa teks;
   pin hanya ≥1024×900 dengan gerak; halo biru hanya satu.

## Produksi

- Dibangun di `src/app/(frontend)/work/_bespoke/viralytics/`; Inter ditambahkan (Satoshi sudah
  dipakai situs).
- Kuota: Flow 0 kredit, Gemini 0 permintaan.
- GD5: pratinjau lokal 1440×900 (tongkat bergerak melintasi empat zona) dan 320 px (zona dan
  lajur jadi kartu, tanpa luber), lalu audit `impeccable` oleh subagen terpisah.
- Audit `impeccable` (subagen, dari kode): 16/20. Diterapkan: zona yang belum dicapai tongkat
  hanya redup sampai 0,78 (teks tetap AA); lajur jadi kartu sampai 767 px; peran baris dan sel
  eksplisit untuk WebKit; tongkat digerakkan dengan `translate`; panel tur dikembalikan gelap
  dengan teks pengantar terang; warna teks lembut jadi token. Dibiarkan: nama fase terbaca dua kali
  oleh pembaca layar di desktop (dibutuhkan di ponsel, saat kepala kolom disembunyikan); risiko CLS
  dari 200vh setelah hidrasi (pola bersama).

## Storyboard scroll (14 Nov 2026)

Dasar: `docs/konsep/storyboard/FORMAT.md`, DESIGN.md "Motion vocabulary (bespoke pages)",
`docs/riset/2026-10-koreografi-scroll.md`, dan `docs/riset/2026-11-standar-portofolio.md`. Data
sketsa: `docs/konsep/storyboard/viralytics.json`. Belum ada kode yang diubah; ini rencana.

### Halaman sekarang

Dibaca dari `src/app/(frontend)/work/_bespoke/viralytics/ViralyticsPage.tsx` dan `viralytics.css`.

| Adegan | Isi | Koreografi | Rujukan |
|---|---|---|---|
| Hero | Nama Satoshi, tagline, "Tonton turnya", Masalah/Solusi/Hasil di atas hitam | none | section pertama |
| Estafet | Lintasan dengan tongkat bercahaya, empat zona (Submission, Drafting, Posting, Laporan) dengan pelat Memegang dan Menunggu | pin 200vh hanya ≥1024×900; tongkat bergerak dengan `translate` dari `--q`, zona yang belum dicapai redup sampai 0,78 | `.vr-scene`, `viralytics.css:41-75` |
| Lajur sejajar | Tabel tiga KOL contoh: @dita.contoh sampai Laporan, @bima.contoh draft dikembalikan sekali, @rani.contoh ditolak brand | none | section `lajur-judul` |
| Garis finis | Empat langkah satu link; "48.200 views, ER 6,1%" ditulis dua kali (metrik ditarik dan di laporan) | enter | `vr-finish` |
| Fitur | Empat fitur, masing-masing dengan tangkapan | enter per baris | `vr-feature` |
| Tur dan Sumber | Bab gelap 40 detik; belum ada metrik | none | `TourChapter`, `Sources` |

Celah yang terlihat: angka yang sama di garis finis hanya ditulis dua kali, jadi pembaca tidak
melihat bahwa itu satu data yang pindah; lajur Dita di tabel tidak tersambung ke link yang diikuti di
garis finis; tangkapan laporan asli muncul jauh di bawah, terpisah dari cerita link itu.

### Storyboard scroll

| # | scroll vh | layar | koreografi | gerak | ponsel | reduced-motion | aset ada/belum |
|---|---|---|---|---|---|---|---|
| V1 | 0–100 | Hero di atas hitam: ikon, nama, tagline, ringkasan; lintasan tipis dengan tongkat diam di garis start | none | Tidak ada | Sama, ringkasan satu kolom | Sama | `viralytics-ikon.v1.svg` belum |
| V2 | 100–300 | Estafet dipin: lintasan dan empat zona | pin-scrub | Tongkat maju per zona; pelat zona aktif menebal saat tongkat masuk, nama "Memegang" ditebalkan, zona yang dilewati tetap terbaca | Tidak dipin; zona jadi kartu bertumpuk, tongkat diam di garis finis | Tongkat di garis finis, semua zona terbaca penuh | Digambar HTML, ada |
| V3 | 300–390 | Lajur sejajar: tabel tiga KOL contoh, lajur @dita.contoh disorot biru-400 | none | Tidak ada gerak; sorotan statis menandai lajur yang diikuti di adegan berikutnya | Lajur jadi kartu seperti sekarang, kartu Dita paling atas | Sama | Tidak perlu aset |
| V4 | 390–520 | Garis finis: link @dita.contoh dari dikirim sampai laporan, lalu tangkapan laporan asli | shared-element | Satu chip "48.200 views, ER 6,1%" muncul di langkah Metrik ditarik, lalu turun ke langkah Di laporan campaign dan berganti format jadi baris kontribusi KOL; tangkapan laporan masuk di sampingnya | Tanpa perpindahan; chip ditulis sekali di baris laporan, tangkapan di bawah | Crossfade chip dari langkah 3 ke langkah 4; angka ada di DOM sekali | `viralytics-laporan.v1.webp` ada |
| V5 | 520–920 | Empat fitur, satu kartu per layar, dalam urutan campaign: papan, direktori KOL, fase, laporan | sticky-stack | Kartu menempel dan berikutnya menumpuk | Kartu berurutan, tiap kartu lebih pendek dari layar | Kartu berurutan tanpa menempel | `viralytics-campaign-board.v1.webp`, `viralytics-kol-discovery.v1.webp`, `viralytics-alur-konten.v1.webp`, `viralytics-laporan.v1.webp` ada |
| V6 | 920–1040 | Tur gelap 40 detik | none | Video tidak autoplay | Sama | Poster dan transkrip | `viralytics-tur.v1.mp4` dan poster ada |
| V7 | 1040–1090 | Sumber | none | Tidak ada | Sama | Sama | Tidak perlu aset |

Koreografi yang sengaja tidak dipakai: number reveal untuk 48.200 views (konsep 30 Okt menyebutnya,
tapi angka itu data contoh, bukan hasil terukur, dan DESIGN.md membatasi number reveal untuk angka
terukur; shared element dipakai sebagai gantinya), image sequence (tidak ada perangkat keras), pin
kedua (estafet sudah satu-satunya pin).

### Yang membuat lebih menarik

| Perubahan | Sekarang | Sesudah | Kenapa |
|---|---|---|---|
| Pelat zona aktif menebal (V2) | Zona hanya berubah opasitas | Nama yang memegang ditebalkan saat tongkat masuk | Pesan halaman "siapa menunggu siapa" terbaca di momen oper, bukan sesudahnya |
| Lajur Dita disorot (V3) | Tiga lajur setara, tidak tersambung ke garis finis | Lajur yang diikuti ditandai | Memberi pembaca tokoh untuk diikuti; menyambung V3 ke V4 tanpa kalimat penjelas |
| Shared element di garis finis (V4) | Angka sama ditulis dua kali | Satu chip pindah dari metrik ditarik ke laporan | Pola "transformasi data": membuktikan laporan membaca data yang sama, persis klaim "tidak disalin tangan" |
| Tangkapan laporan di garis finis (V4) | Laporan asli hanya di bagian fitur | Laporan asli tampil di ujung cerita link | Ilustrasi langsung didukung layar asli |
| Sticky stack fitur (V5) | Baris fitur biasa | Empat modul setara satu layar masing-masing | Jenis cerita "beberapa modul setara" |

Pelajaran lama yang dipakai: satu halo biru saja (tongkat); zona redup tidak di bawah 0,78 supaya
teks tetap AA; lajur jadi kartu sampai 767 px; handle berakhiran .contoh; tanpa juara atau peringkat
(koreksi GK 2). Tidak ada pin baru, jadi risiko CLS dari tinggi pin setelah hidrasi tidak bertambah.
Angka di V4 hanya angka contoh yang sudah tayang. Chip mendarat di baris laporan yang digambar HTML,
bukan di tangkapan: tangkapan laporan memakai data fiktifnya sendiri, jadi keduanya tidak boleh
terlihat seperti angka yang sama.

### Kit portofolio

| Butir kit | Keadaan | Celah |
|---|---|---|
| Ikon produk | Tidak ada di data | Ikon Viralytics dari repo atau `Design System/` produk, master 1024 px |
| Sampul rakitan | Tangkapan papan campaign mentah; tabel padat tidak terbaca di ukuran kartu | Sampul dari templat: latar hitam, ikon dan nama, laporan dan direktori KOL dalam bingkai generik |
| ≥4 layar | 4 layar | Terpenuhi |
| Loop kartu | Tidak ada (tur ada, loop tidak) | Loop ≤30 detik dipotong dari tur: review link sampai laporan |

### Aset yang perlu dibuat

| Berkas | Isi | Sumber | Catatan |
|---|---|---|---|
| `viralytics-ikon.v1.svg` | Ikon produk | Repo viralytics | Belum dicek apakah ada |
| `viralytics-sampul.v1.webp` | Sampul rakitan 16:10 | Dirakit kode dari tangkapan v1 | Menunggu keputusan cara membuat sampul (riset standar §7 butir 1) |
| `viralytics-link-laporan-loop.v1.mp4` dan poster | Loop kartu ≤30 detik | Potongan tur v1 | Tanpa suara, data fiktif |

Copy: semua teks layar diambil dari `projects.ts` dan halaman sekarang; tidak ada judul baru.
