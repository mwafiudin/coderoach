# Konsep: halaman bespoke Rencana RO (/work/rencana-ro)

Tanggal: 2026-10-30. Jenis: scrollytelling (halaman proyek bespoke, ADR 0013).
Proyek: T-0087. Prosedur: skill `alur-desain` 1.3.0, `references/konsep.md`. Izin: studio.
Batas: nama prinsipal dan istilah skema bonusnya tidak ditulis di mana pun (repo ini publik);
memakai istilah netral yang sudah dipakai copy dan rekaman v2 (kaki, poin, unit, repeat order,
tutup mingguan, bonus periode).

## Brief

| Butir | Isi |
|---|---|
| Tujuan | Setelah membaca, pemilik usaha atau jaringan penjualan percaya bahwa data mentah bisa diubah jadi saran mingguan yang bisa langsung dijalankan, dan bahwa Coderoach membangun alat yang dibaca orang biasa, bukan analis. |
| Pembaca | Calon klien Coderoach yang punya data tapi tidak punya saran; dan, sebagai cerminan, pengguna produknya: distributor independen, banyak yang ibu-ibu lanjut usia, membaca di ponsel pagi hari. |
| Insight | Pengguna tidak membaca laporan; ia mencari jawaban dan langkah. Tiap minggu ada empat pertanyaan yang sama: bonus cair berapa, beli berapa, taruh di mana, kapan harus repeat order. Salah hitung berarti poin hangus. Sumber: PRODUCT.md repo NDS-ETL (wawancara pemilik), `projects.ts` (masalah). |
| Satu pesan | Data mentah back office menjadi empat jawaban minggu ini, masing-masing dengan tanggal datanya. |
| Bukti | Penarik data tiap jam (Playwright, satu sesi per login, run sekaligus kunci); simulasi repeat order di atas pohon jaringan sendiri; rencana disimpan terstruktur per run; pengingat email, push, kalender; RLS per distributor, kredensial terenkripsi; cek sesi 137 ke 27 ms setelah pindah ke Singapura (metrik bersumber di `projects.ts`); beranda empat kartu menggantikan empat mode dan enam laci (3 Okt 2026). Rekaman memakai jaringan fiktif. |
| Nada dan identitas | DESIGN.md repo NDS-ETL: arah Apple HIG untuk permukaan utilitas (clarity, deference), font sistem (SF Pro/Segoe), skala teks diangkat untuk pembaca lanjut usia (13/15/17), aksen biru `#0067d6` untuk teks dan isian, `#007aff` hanya untuk indikator tipis, mode gelap tangga Apple `#000`/`#1c1c1e`/`#2c2c2e`, motion hanya umpan balik (tanpa scroll-scrub sinematik di app). Plus DESIGN.md situs bagian bespoke. |
| Batasan | Halaman web bahasa Indonesia, terbaca tanpa JS, LCP ≤2,5 s, CLS <0,1, reduced-motion, 320 sampai 1440 px. Aset: tur 50 detik dan lima tangkapan v2 (beranda desktop dan ponsel, rencana RO, kalender, riwayat run), jaringan fiktif. Tanpa nama prinsipal dan istilah skemanya. Flow boleh untuk foto suasana (tanpa wajah orang nyata). |
| Kriteria menilai ide | (1) Orisinal: bukan dashboard tour. (2) Relevan: dari data mentah ke empat jawaban yang dibaca orang biasa di ponsel. (3) Jujur: angka contoh ditandai, metrik dengan sumber, tidak menyebut prinsipal. (4) Hormat pada pembaca lanjut usia: teks besar, tenang, bukan gimmick. (5) Terbaca tanpa JS dan di 320 px. |

## Ideasi

Ide mentah dari Farrez: tidak ada (delegasi penuh 30 Okt 2026). Putaran 1: tiga subagen terpisah
tanpa referensi. Putaran 2 setelah rujukan dibuka. Huruf = urutan acak untuk penilai.

| # | Sudut | Ide dalam satu kalimat | Putaran | Ditandai "jelas"? |
|---|---|---|---|---|
| G | pembaca, lokal | Halaman buku catatan tulisan tangan berisi coretan hitungan, dirapikan baris demi baris jadi empat kartu jawaban | 1 | ya |
| C | pembaca, lokal | Empat pertanyaan pagi, satu per layar dengan huruf sangat besar, masing-masing dijawab kartu asli bertanggal data | 1 | |
| M | pembaca, lokal | Poin mau hangus: jam tutup mingguan yang tenang, dua timbangan kaki, unit yang disarankan menyeimbangkan | 1 | |
| A | pembaca, lokal | Grup upline penuh tabel dan pesan terusan, diganti satu kartu rencana yang jelas | 1 | |
| P | pembaca, lokal | Petugas yang bangun lebih pagi: rel waktu dari tengah malam sampai ibu membuka ponsel pukul 06.00 | 1 | |
| E | mekanisme | Satu kartu "Rencana minggu ini" berganti keadaan tiap jam sampai empat jawabannya terisi, tiap angka bercap tanggal data | 1 | ya |
| J | mekanisme | Kunci run: dua tarikan ditekan bersamaan, yang kedua menunggu gembok | 1 | |
| B | mekanisme | Pohon jaringan fiktif menerima pembelian satu per satu, tiap kali dengan siapa, kaki mana, berapa unit, alasan | 1 | |
| N | mekanisme | Rencana tersimpan per run, tampilan baru berlaku mundur ke riwayat lama | 1 | |
| H | mekanisme | Satu rencana keluar lewat empat pintu (email, push, kalender, beranda) dengan angka dan tanggal data yang sama | 1 | |
| K | metafora luar | Resep: data mentah sebagai bahan, empat jawaban sebagai empat hidangan | 1 | ya |
| D | metafora luar | Juru mudi membaca peta sebelum berlayar, empat haluan diumumkan | 1 | |
| L | metafora luar | Giliran air sawah: saluran data membagi air ke empat petak jawaban menurut jadwal tutup mingguan | 1 | |
| F | metafora luar | Etiket apoteker: empat jawaban ditulis seperti etiket obat (apa, berapa, kapan), tanggal data seperti tanggal kedaluwarsa | 1 | |
| Q | metafora luar | Kalender tanam: hari tutup dan hari repeat order menyala, kotak hari membesar jadi kartu jawaban | 1 | |
| R | rujukan luar industri, lokal | Koran pagi: tarikan berjalan semalam seperti mesin cetak, dan pukul 06.00 "koran" empat judul tiba di ponsel, tiap judul dengan tanggal terbit datanya | 2 | |
| I | identitas | Empat kalimat jawaban dalam ukuran huruf yang dipakai app untuk pembaca lanjut usia, tanpa grafik; halaman sendiri membuktikan "jawaban, bukan laporan" | 2 | |
| O | mekanisme, bukti | Satu angka diikuti: dari baris mentah tabel kaki bertanggal, masuk simulasi, keluar sebagai kalimat "Beli 3 unit di kaki kiri" dengan tanggal yang sama | 2 | |

Rujukan setelah putaran 1: lima tangkapan v2 dan tur 50 detik (jaringan fiktif); DESIGN.md dan
PRODUCT.md repo app (HIG utilitas, skala teks diangkat, empat pertanyaan); luar industri: koran
pagi yang dicetak semalam dan tiba sebelum pembaca bangun.

## Penilaian (subagen terpisah)

| # | Orisinal | Relevan | Layak | Catatan |
|---|---|---|---|---|
| M | 4 | 5 | ya | Takut poin hangus jadi tegangan; timbangan dua kaki beda dari lembar ukur |
| G | 4 | 4 | sulit | Tulisan tangan sulit dibaca lansia, hanya titik awal |
| L | 4 | 3 | ya | Segar dan lokal; peta ke empat jawaban dipaksakan |
| F | 4 | 4 | ya | Pas, tapi bisa terasa menggurui; tanggal kedaluwarsa membalik arti tanggal data |
| P | 3 | 5 | ya | Kuat untuk pembaca pagi; rel waktu dekat estafet |
| Q | 3 | 4 | ya | Hanya "kapan" yang terjawab |
| R | 3 | 4 | ya | Mesin cetak mengulang struk printer |
| O | 3 | 5 | ya | Bukti terbaik, lebih cocok sebagai benang |
| I | 3 | 5 | ya | Aman |
| C | 2 | 5 | ya | Paling aman; gugur di orisinal |
| B | 3 | 4 | sulit | Pohon berat di 320 px |
| A | 3 | 4 | sulit | Sulit tanpa meniru UI WhatsApp |
| H | 3 | 3 | ya | Fitur, bukan pertanyaan |
| E | 2 | 4 | ya | Dashboard tour |
| J | 3 | 2 | ya | Gugur |
| N | 2 | 2 | ya | Gugur |
| K | 2 | 3 | ya | Klise |
| D | 2 | 2 | ya | Klise |

Fakta produk untuk naskah (tangkapan `rencana-ro-rencana-ro.v2.webp`, jaringan fiktif): bagian
"Kiri dan kanan" menampilkan unit per kaki (15 kiri, 34 kanan; 1 unit = 10rb poin, jadi 150rb kiri
dan 340rb kanan) dan dua bilah, "poin sekarang" dan "poin sesudah", lalu daftar siapa membeli di
kaki mana, berapa unit, berapa rupiah, dan kenapa. Tujuannya bukan kedua kaki sama berat; yang
dihitung adalah poin sesudah rencana dijalankan.

## Tiga konsep

### Konsep A: Sebelum tutup mingguan (M + O)

- Ide: jam tutup mingguan berjalan tenang di pojok. Dua bilah kaki memperlihatkan poin sekarang;
  satu angka diikuti dari baris mentah bertanggal sampai kalimat saran ("Beli 2 unit di kaki
  kiri", contoh), dan bilah bergeser ke poin sesudah. Lalu tiga jawaban lain menyusul.
- Koreografi: pin dan scrub pendek (≥1024×900): bilah "sekarang" memanjang ke "sesudah" saat saran
  dibaca; di ponsel dan tanpa JS kedua keadaan tampil berurutan.
- Risiko: timbangan bisa dibaca "harus seimbang", padahal tidak; harus memakai bahasa app
  ("poin sekarang", "poin sesudah"), bukan cap seimbang.

| Adegan | Pesan | Teks tampil | Yang terlihat | Transisi |
|---|---|---|---|---|
| 1 | Jawaban dulu | Nama, tagline, ringkasan, huruf besar | Latar terang HIG, biru `#0067d6` | Statis |
| 2 | Tegangan | "Tutup mingguan, Minggu 23.59 (contoh)" | Jam tenang, empat pertanyaan pagi tertulis kecil | Statis |
| 3 | Data mentah | "Baris tabel kaki, ditarik 07.00" | Satu baris mentah bertanggal | Reveal |
| 4 | Saran | "Beli 2 unit di kaki kiri" | Bilah kiri dan kanan bergerak dari sekarang ke sesudah | Scrub |
| 5 | Empat jawaban | Bonus cair, beli berapa, taruh di mana, kapan RO, masing-masing bertanggal | Empat kalimat besar | Reveal |
| 6 | Bukti | Fitur dan tangkapan asli | | Enter |

### Konsep B: Dari coretan ke jawaban (G + I)

- Halaman buku hitungan dengan coretan dan tanda tanya, disusun ulang jadi empat kalimat besar
  seukuran skala teks app, masing-masing bertanggal data; tulisan tangan hanya di babak pertama,
  selalu dengan teks asli di DOM. Analogi berhenti di satu hal: buku tidak menarik data sendiri.

### Konsep C: Empat pertanyaan pagi (C + P, paling aman)

- Pukul 06.00, satu pertanyaan per layar dengan huruf besar, dijawab tangkapan asli bertanggal;
  rel tipis menunjukkan kerja semalam.

## Gerbang GK

Diputuskan subagen penilai terpisah atas nama Farrez (delegasi 30 Okt 2026), D-01, 2026-10-30.

- **Terpilih: Konsep A, Sebelum tutup mingguan, dengan O sebagai tulang punggung dan M hanya
  sebagai tegangan waktu.** Satu-satunya yang membuktikan pesannya: satu angka diikuti dari baris
  mentah bertanggal sampai kalimat saran, persis mekanika produk; bilah "poin sekarang" ke "poin
  sesudah" ada di app, jadi tidak mengarang aturan.
- **Kalah, B (Dari coretan ke jawaban):** tulisan tangan sulit dibaca lansia, dan coretan
  menyiratkan app menggantikan buku hitungan, klaim yang tidak didukung bukti.
- **Kalah, C (Empat pertanyaan pagi):** tur dasbor empat kartu; bias aman.

Koreksi wajib dan pemenuhannya:

1. Tidak ada jam tutup karangan dan tidak ada hitung mundur: "Tutup mingguan, Jumat 23 Okt
   (contoh)", diam.
2. Saran dalam bahasa app: "Beli 49 unit: 15 untuk kaki kiri, 34 untuk kaki kanan" dan "1 unit =
   10rb poin, jadi 150rb kiri dan 340rb kanan" (dari tangkapan, jaringan fiktif); tanpa kata,
   ikon, atau bentuk timbangan; label bilah "poin sekarang" dan "poin sesudah".
3. Tangkapan yang memuat istilah skema (rencana RO, beranda ponsel) tidak dipakai di halaman ini;
   hanya kalender dan riwayat run, yang bersih. Temuan ini dilaporkan: tangkapan tersebut sudah
   tayang di template bersama sebelum halaman ini.
4. Satu aksen `#0067d6`, tanpa warna kartu app lain dan tanpa emoji; teks isi 17 px, angka jawaban
   sangat besar.
5. Scrub hanya ≥1024×900 tanpa reduced-motion; selain itu dua keadaan bilah berdampingan dengan
   angka di DOM.

## Produksi

- Dibangun di `src/app/(frontend)/work/_bespoke/rencana-ro/`; tanpa font baru (font sistem, seperti app).
- Hanya tangkapan kalender dan riwayat run yang tampil di bagian fitur; tur bersama tetap tampil
  seperti di template sebelumnya (temuan istilah dilaporkan terpisah).
- Kuota: Flow 0 kredit, Gemini 0 permintaan.
- GD5: pratinjau lokal 1440×900 (langkah menyala, bilah poin tumbuh) dan 320 px (tanpa luber).
- Audit `impeccable` (subagen, dari kode): 15/20. Diterapkan: tiap kaki kini punya dua baris
  berlabel, "Poin sekarang" dan "Poin sesudah", dengan angka di teks (poin awal contoh, tambahan
  dari rencana yang direkam); isian dan tepi bilah mencapai 3:1; bilah "sesudah" tumbuh dengan
  `scale`, bukan `width`; teks keterangan naik ke 15 dan 17 px; jawaban memakai angka beranda ponsel
  yang direkam (Rp2.550.000, 49 unit, di bawah Hendra Anggrekasih, closing Jumat 23 Okt). "Buku
  bonus" dan "masa aktif" adalah istilah yang sudah tayang di copy `projects.ts`, bukan istilah skema.
  Dibiarkan: risiko CLS dari tinggi scene setelah hidrasi (pola bersama).
