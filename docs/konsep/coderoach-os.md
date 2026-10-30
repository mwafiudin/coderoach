# Konsep: halaman bespoke Coderoach OS (/work/coderoach-os)

Tanggal: 2026-10-30. Jenis: scrollytelling (halaman proyek bespoke, ADR 0013).
Proyek: T-0087. Prosedur: skill `alur-desain` 1.3.0, `references/konsep.md`. Izin: studio.

## Brief

| Butir | Isi |
|---|---|
| Tujuan | Setelah membaca, calon klien yang ingin sistem internal percaya bahwa Coderoach menjalankan studionya sendiri di atas sistem yang dibangunnya, dan bahwa pembukuan di dalamnya tidak bisa berbohong diam-diam. |
| Pembaca | Pemilik usaha kecil-menengah dan studio/agensi yang mengelola proyek, jam kerja, dan keuangan di spreadsheet terpisah; membaca di laptop saat menimbang membuat sistem sendiri. |
| Insight | Margin proyek baru ketahuan setelah semua spreadsheet direkap, terlambat untuk mengubah apa pun; dan angka yang bisa diketik tangan bisa salah tanpa ada yang tahu. Sumber: `projects.ts` (masalah, body), DESIGN.md coderoach-app ("Show the work"), trigger keseimbangan jurnal yang diuji dengan sengaja memposting jurnal timpang. |
| Satu pesan | Satu sistem dari penawaran sampai buku besar, dan buku besarnya menolak angka yang tidak seimbang. |
| Bukti | Jurnal double-entry dijaga trigger Postgres di akhir transaksi, diuji dengan jurnal timpang yang harus ditolak; jam kerja langsung jadi biaya proyek; status story naik dari PR, tes CI per kriteria penerimaan, dan deploy; webhook diterima sebagai inbox; server MCP untuk Claude Code; tanggal "hari ini" WIB; angka keuangan disaring di query SQL untuk staf; linimasa bertanggal dengan sourceRef commit. Rekaman dari database demo (data contoh). |
| Nada dan identitas | DESIGN.md coderoach-app (Coderoach Studio Design System, mode Operate): ink `#08090a`, paper `#f4f7f5`, electric `#2467f4` maksimal 5-10%, Satoshi, JetBrains Mono untuk semua yang bersuara sistem, sinyal success/warning/error hanya fungsional, tanpa gradien dan glow. Plus DESIGN.md situs bagian bespoke. |
| Batasan | Halaman web bahasa Indonesia, terbaca tanpa JS, LCP ≤2,5 s, CLS <0,1, reduced-motion, 320 sampai 1440 px. Aset ada: tur 80 detik, empat tangkapan v2 (beranda, proyek detail, tugas, laporan), semua data contoh. Copy tetap di `projects.ts`. Flow boleh, tapi produk ini tidak punya tempat fisik. |
| Kriteria menilai ide | (1) Orisinal: bukan dashboard tour atau grid fitur. (2) Relevan: memperlihatkan satu sumber dari penawaran ke buku besar, dan buku yang menolak angka timpang. (3) Jujur: angka contoh ditandai, tidak mengarang klien. (4) "Show the work": mekanisme nyata terlihat, bukan klaim. (5) Terbaca tanpa JS dan di 320 px. |

## Ideasi

Ide mentah dari Farrez: tidak ada (delegasi penuh 30 Okt 2026). Putaran 1: tiga subagen terpisah
tanpa referensi. Putaran 2 setelah rujukan dibuka. Huruf = urutan acak untuk penilai.

| # | Sudut | Ide dalam satu kalimat | Putaran | Ditandai "jelas"? |
|---|---|---|---|---|
| H | pembaca, lokal | Buku kas bergaris dua kolom: baris timpang diketik, stempel "ditolak", dikoreksi, "seimbang" | 1 | ya |
| B | pembaca, lokal | Empat tab spreadsheet bertumpuk sampai tanggal 30, dibanding satu laporan yang angkanya ada sejak tanggal 3 | 1 | |
| O | pembaca, lokal | "Proyek ini untung atau rugi?": tiap guliran satu jam kerja masuk dan margin di detail proyek bergerak | 1 | |
| E | pembaca, lokal | Satu nomor penawaran ditelusuri lewat termin, jam, faktur, sampai jurnal, seperti nota dari laci ke buku kas | 1 | |
| L | pembaca, lokal | Sel spreadsheet ditimpa tanpa jejak di kiri, upaya yang sama ditolak dan berjejak di kanan | 1 | |
| C | mekanisme | Satu kartu jurnal dicoba dipos dua kali: timpang ditolak trigger, seimbang diterima | 1 | ya |
| Q | mekanisme | Satu baris jam kerja mengalir jadi biaya dan margin, "dihitung ulang 14.02 WIB" | 1 | |
| A | mekanisme | Kartu story naik sendiri di rel PR, CI per kriteria, deploy, tiap titik membawa commit | 1 | |
| J | mekanisme | Satu query dibaca pemilik dan staf: rate dan rekening tidak pernah dikirim ke staf | 1 | |
| F | mekanisme | Satu hari studio sebagai jam 00.00 sampai 24.00 WIB, tiap peristiwa jatuh pada jamnya | 1 | |
| N | metafora luar | Timbangan pasar yang ditera: jurnal timpang ditolak seperti anak timbangan yang gagal tera | 1 | ya |
| G | metafora luar | Rem darurat kereta: gerbong jurnal timpang menarik tuas, semua gerbong mundur (rollback) | 1 | |
| K | metafora luar | Pintu air: aliran dari hulu (penawaran) ke hilir (buku besar), pintu terakhir menahan yang timpang | 1 | |
| D | metafora luar | Chef yang makan masakannya sendiri: pesanan klien dan proyek studio memakai baris data yang sama | 1 | |
| P | metafora luar | Sistem saraf: jam, PR, CI, deploy adalah sinyal yang sampai ke status story tanpa diketik | 1 | |
| R | rujukan luar industri | Kotak hitam pesawat: setiap perubahan meninggalkan rekaman bertanggal yang tidak bisa dihapus; halaman membacakan rekaman studio sendiri (linimasa sourceRef) | 2 | |
| I | produk, dogfooding | Kode proyek mono (CRO-2026-xxx) jadi benang: satu kode yang sama muncul di penawaran, story, jam, invoice, jurnal, dan dibaca Claude Code lewat MCP | 2 | |
| M | identitas | "Show the work": halaman tanpa ilustrasi, hanya layar asli dan baris log mono yang menjelaskan apa yang terjadi di balik tiap angka | 2 | |

Rujukan setelah putaran 1: empat tangkapan v2 dan tur 80 detik Coderoach OS (data contoh);
DESIGN.md coderoach-app (mono untuk yang bersuara sistem, section marker `[ 01 ]`); luar industri:
perekam data penerbangan (rekaman berurut yang tidak bisa ditimpa). Catatan: halaman Laporta di
situs ini sudah memakai jurnal dengan cap SEIMBANG, jadi ide cap seimbang berisiko mengulang.

## Penilaian (subagen terpisah)

| # | Orisinal | Relevan | Layak | Catatan |
|---|---|---|---|---|
| H | 2 | 5 | ya | Buku kas dan stempel, sama dengan Laporta |
| B | 3 | 5 | ya | Tanggal 30 lawan tanggal 3 tepat mengenai insight margin |
| O | 3 | 4 | sulit | Tanpa JS hanya urutan statis |
| E | 2 | 5 | ya | "Laci ke buku kas" sama dengan judul Laporta |
| L | 4 | 5 | ya | Mengenai "salah diam-diam" langsung |
| C | 2 | 5 | ya | Bentuknya kartu jurnal Laporta |
| Q | 3 | 4 | ya | Kuat bila digabung benang kode |
| A | 3 | 2 | ya | Gugur, tidak menyentuh keuangan |
| J | 4 | 2 | ya | Gugur, bukan pesan utama |
| F | 3 | 2 | ya | Gugur |
| N | 4 | 4 | sulit | Tera lokal dan tepat, timbangan dekat klise |
| G | 5 | 3 | sulit | Rollback segar, separuh pesan |
| K | 4 | 4 | sulit | Hulu ke hilir memuat kedua bagian pesan |
| D | 2 | 3 | ya | Gugur, klise |
| P | 2 | 2 | sulit | Gugur |
| R | 4 | 3 | ya | Rekaman tak terhapus; insight margin tidak ada |
| I | 4 | 5 | ya | Satu kode jadi bukti "satu sistem" yang bisa dicek |
| M | 2 | 4 | ya | Prinsip eksekusi, dipakai di semua konsep |

## Tiga konsep

### Konsep A: Sel yang tidak bisa ditimpa (L + B)

- Ide: di spreadsheet, satu sel margin bisa ditimpa tanpa jejak dan selisihnya baru ketahuan saat
  rekap tanggal 30. Di Coderoach OS upaya yang sama ditolak oleh database dengan pesan galatnya
  sendiri, dan laporan laba rugi sudah terbaca sejak awal bulan.
- Bukti mekanisme: pesan galat asli trigger `0004_trigger_balance.sql` coderoach-app: "Jurnal %
  tidak balance: debit % <> kredit %", diperiksa di akhir transaksi, sehingga seluruh transaksi
  mundur. Bukan cap, supaya tidak mengulang Laporta.
- Koreografi: wipe di satu bingkai (≥1024×900, pin pendek): satu bingkai berisi dua baris yang
  sama; garis pemisah bergeser dari "spreadsheet" ke "Coderoach OS". Tanpa JS dan di 320 px: dua
  kartu bertumpuk.

| Adegan | Pesan | Teks tampil | Yang terlihat | Transisi |
|---|---|---|---|---|
| 1 (pembuka) | Jawaban dulu | Nama, tagline, Masalah/Solusi/Hasil, marker mono `[ 01 ]` | Kanvas paper, ink, satu aksen electric | Statis |
| 2 | Salah diam-diam | "Di spreadsheet, angka bisa ditimpa tanpa jejak" | Baris sel: Pendapatan, Biaya, Margin; sel biaya diketik ulang, margin berubah, tidak ada yang mencatat | Wipe mulai |
| 3 | Ditolak | "Di Coderoach OS, database menolaknya" | Jurnal contoh debit 4.500.000 kredit 4.200.000, galat mono dari trigger, "seluruh transaksi dibatalkan" | Wipe selesai |
| 4 | Terbaca sejak awal | "Margin tidak menunggu tanggal 30" | Tangkapan laporan laba rugi asli (data contoh) | Enter |
| 5 | Satu sistem | Fitur dari `projects.ts` dengan tangkapannya | Tangkapan proyek detail dan papan kerja | Enter |
| 6 | Tur | Tur 80 detik | TourChapter | - |

### Konsep B: Satu kode, satu benang (I + Q, paling aman)

- Kode proyek mono jadi satu-satunya tokoh, muncul di penawaran, story, jam kerja, invoice,
  jurnal, dan MCP. Kurang dramatis di sisi "menolak angka timpang".

### Konsep C: Pintu air (K + R)

- Penawaran di hulu, buku besar di hilir, pintu terakhir menahan aliran timpang, log mono di tiap
  pintu. Risiko: ilustratif, melawan "show the work".

## Gerbang GK

Diputuskan subagen penilai terpisah atas nama Farrez (delegasi 30 Okt 2026), D-01, 2026-10-30.

- **Terpilih: Konsep A, dengan benang kode proyek dari B di bagian "satu sistem".** Satu-satunya
  yang memperlihatkan dua bagian pesan sebagai mekanisme: angka salah tanpa ketahuan di
  spreadsheet, dan penolakan oleh database dengan galat aslinya. Keluar dari Laporta karena tokohnya
  pesan galat dan rollback, bukan cap atau buku kas.
- **Kalah, B (Satu kode, satu benang):** rapi tapi datar; sisi "menolak angka timpang" hilang.
- **Kalah, C (Pintu air):** ilustrasi melawan "show the work", dan produk ini tidak punya tempat fisik.

Koreksi wajib dan pemenuhannya:

1. Judul bukan "tidak bisa ditimpa" (trigger mengizinkan UPDATE/DELETE asal tetap seimbang); yang
   ditolak adalah ketimpangan. Judul adegan: "Buku yang menolak selisih".
2. Spreadsheet digambarkan jujur: biaya dicatat di satu tab dan tidak di rekap, sehingga totalnya
   selisih tanpa ada yang menolak; bukan "ditimpa tanpa jejak". Label generik "spreadsheet", tanpa
   tampilan merek.
3. Galat persis format trigger (`0004_trigger_balance.sql`, kolom `numeric(18,2)`):
   `Jurnal <uuid> tidak balance: debit 4500000.00 <> kredit 4200000.00`, uuid utuh bertanda contoh.
   "Seluruh transaksi dibatalkan" ditulis sebagai penjelasan (trigger DEFERRABLE, diperiksa saat
   COMMIT).
4. Angka contoh ditandai; "sejak tanggal 3" diganti "setiap jurnal diposting".
5. Adegan penolakan berupa keluaran log mono, bukan kartu jurnal bergaris.

## Produksi

- Dibangun di `src/app/(frontend)/work/_bespoke/coderoach-os/`; tanpa font baru (Satoshi dan
  JetBrains Mono sudah dipakai situs).
- Kuota: Flow 0 kredit, Gemini 0 permintaan.
- GD5: pratinjau lokal 1440×900 (wipe dari spreadsheet ke log galat) dan 320 px (dua sisi
  bertumpuk, tanpa luber), lalu audit `impeccable` oleh subagen terpisah.
- Audit `impeccable` (subagen, dari kode): 16/20, tanpa P0/P1. Diterapkan: garis pembatas wipe
  dipindah ke bingkai supaya tidak ikut terpotong `clip-path`; nomor pemberhentian disembunyikan
  dari pembaca layar; tautan tur memakai electric-700 (5,3:1); tabel spreadsheet diberi nama dari
  judulnya. Dibiarkan: risiko CLS dari 200vh setelah hidrasi (pola bersama halaman bespoke lain).
