# Konsep: halaman bespoke AkarKita (/work/akarkita)

Tanggal: 2026-10-30. Jenis: scrollytelling (halaman proyek bespoke, ADR 0013).
Proyek: T-0087. Prosedur: skill `alur-desain` 1.3.0, `references/konsep.md`. Izin: studio (lab).

## Brief

| Butir | Isi |
|---|---|
| Tujuan | Setelah membaca, calon klien percaya bahwa Coderoach bisa memodelkan pengetahuan budaya lokal yang rumit (kekerabatan, waris) sebagai data yang benar, bukan sekadar menempel istilah, dan pembaca keluarga Nusantara merasa produknya paham dunia mereka. |
| Pembaca | Calon klien yang domainnya penuh aturan lokal; dan anggota keluarga besar Sunda atau Minang yang ingin silsilahnya tidak hilang. Membaca di ponsel, sering setelah acara keluarga. |
| Insight | Satu orang yang sama dipanggil berbeda tergantung siapa yang bertanya dan adat mana yang dipakai: "Uwa" bagi keponakan Sunda, "Mamak" bagi kemenakan Minang. Aplikasi silsilah umum hanya kenal "paman". Sumber: `projects.ts` (masalah, body), DESIGN.md repo AkarKita (dunia visual Tenun Nusantara), engine kekerabatan relatif terhadap orang yang dipilih. |
| Satu pesan | Istilah kekerabatan dihitung dari siapa yang Anda pilih, menurut adat yang Anda pakai. |
| Bukti | Engine kekerabatan, faraid, dan tata letak silsilah sebagai fungsi murni yang teruji (fbda784); dua lensa: Pancakaki Sunda bilateral dan suku Minang garis ibu; istilah, pewarisan suku, dan peringatan pernikahan sesuku disimpan sebagai data; canvas sendiri dengan pan/zoom/pinch dan level detail; offline, foto dikompres di perangkat (9adfc1d); faraid dengan pecahan eksak, membedakan pusaka tinggi dan harta pencaharian, edukatif bukan fatwa; dipakai satu keluarga besar sungguhan. Render dari keluarga contoh. |
| Nada dan identitas | DESIGN.md repo AkarKita, "Tenun Nusantara": latar biru keabuan pucat, tinta biru tua, aksen nila `oklch(0.42 0.11 262)`, benang emas, mengkudu, kunyit; warna adat (Minang merah-emas-hitam, Sunda hijau-tanah-krem); Archivo variable (display lebar wdth 118-125, label sempit wdth 82); sudut kecil 2-8 px. Plus DESIGN.md situs bagian bespoke. |
| Batasan | Halaman web bahasa Indonesia, terbaca tanpa JS, LCP ≤2,5 s, CLS <0,1, reduced-motion, 320 sampai 1440 px. Aset: dua tangkapan pohon (desktop, ponsel), keluarga fiktif. Faraid adalah topik agama: tanpa klaim fatwa, angka contoh ditandai. Tanpa foto keluarga nyata; Flow boleh untuk suasana tanpa wajah. |
| Kriteria menilai ide | (1) Orisinal: bukan diagram pohon generik. (2) Relevan: memperlihatkan istilah yang berubah menurut siapa yang bertanya dan adat mana. (3) Jujur dan hormat: adat dan faraid tidak disederhanakan sampai salah; contoh ditandai. (4) Identitas Tenun Nusantara. (5) Terbaca tanpa JS dan di 320 px. |

## Ideasi

Ide mentah dari Farrez: tidak ada (delegasi penuh 30 Okt 2026). Putaran 1: tiga subagen terpisah
tanpa referensi. Putaran 2 setelah rujukan dibuka. Huruf = urutan acak untuk penilai.

| # | Sudut | Ide dalam satu kalimat | Putaran | Ditandai "jelas"? |
|---|---|---|---|---|
| G | pembaca, lokal | Grup keluarga pasca-lebaran bertanya "ini Uwa siapa?", pohon menjawab dengan menyorot satu simpul | 1 | ya |
| C | pembaca, lokal | Satu simpul dibelah dua lensa: kiri Sunda memanggilnya Uwa, kanan Minang memanggilnya Mamak | 1 | |
| M | pembaca, lokal | Dari sudut kemenakan Minang: suku mengalir lewat garis ibu, hanya saudara laki-laki ibu yang jadi Mamak | 1 | |
| P | pembaca, lokal | Foto lama tanpa nama ("Bapak, Uwa, entah siapa") ditautkan satu per satu ke simpul pohon | 1 | |
| E | pembaca, lokal | Pecahan waris edukatif dan pusaka tinggi Minang yang diturunkan menurut suku, bukan dibagi | 1 | |
| A | mekanisme | Satu kartu orang yang sapaannya berganti saat penanya dan adatnya diganti, dengan baris aturan di bawahnya | 1 | ya |
| K | mekanisme | Lembar aturan sebagai baris data; satu baris diubah, sapaan di pohon ikut berubah, lensa ketiga ditambah tanpa kode | 1 | |
| H | mekanisme | Kanvas dilihat dari dekat ke jauh: orang, lalu kelompok keluarga, lalu rumpun | 1 | |
| L | mekanisme | Satu harta contoh dibagi pecahan eksak di samping desimal yang dibulatkan dan selisih | 1 | |
| N | mekanisme | Sinyal hilang, ponsel tetap menghitung sapaan dan menampilkan foto yang dikompres | 1 | |
| B | metafora luar | Lungsin (orang) dan pakan (adat): istilah adalah simpul di persilangannya | 1 | ya |
| J | metafora luar | Rasi bintang yang sama dinamai berbeda menurut kampung pengamat | 1 | |
| F | metafora luar | Fokus lensa: kerabat tajam atau buram menurut jarak hubungan dari orang yang dipilih | 1 | |
| Q | metafora luar | Satu sungai dinamai berbeda oleh tiap kampung di tepinya | 1 | |
| D | metafora luar | Kompas yang utaranya selalu si penanya | 1 | |
| R | data produk | Tabel aturan dari data seed: untuk kakak dan adik ayah dan ibu, Sunda membedakan menurut umur (Uwa lawan Emang, sisi mana pun), Minang menurut sisi (semua saudara laki-laki ibu Mamak, tua atau muda; saudara laki-laki ayah Pak tuo atau Pak etek) | 2 | |
| I | identitas | Motif tenun sebagai legenda: tiap lensa adat punya pola benangnya sendiri di simpul pohon, seperti di canvas app | 2 | |
| O | mekanisme, bukti | Pilih penanya: empat kerabat yang sama dibaca berturut-turut oleh dua penanya dan dua adat, dan pembaca melihat sendiri kolom mana yang berubah | 2 | |

Rujukan setelah putaran 1: tangkapan pohon desktop dan ponsel (keluarga contoh); `seed-data/terms.sunda.ts`
dan `terms.minang.ts` repo AkarKita (aturan istilah sebagai data: Uwa untuk kakak orang tua
gender apa pun, Emang/Bibi untuk adiknya; Mamak untuk saudara laki-laki ibu tua atau muda, dengan
alias Mak dang dan Mak etek, Pak tuo dan Pak etek untuk saudara laki-laki ayah); luar industri:
kamus dwibahasa yang memetakan satu kata ke dua kata berbeda menurut konteks.

## Penilaian (subagen terpisah)

| # | Orisinal | Relevan | Layak | Catatan |
|---|---|---|---|---|
| G | 2 | 4 | sulit | Mudah jadi tiruan WhatsApp |
| C | 2 | 5 | ya | Jelas; akurat hanya bila simpulnya kakak laki-laki ibu |
| M | 3 | 4 | ya | Satu adat, kontras hilang |
| P | 4 | 3 | ya | Mengenali orang, bukan istilah relatif |
| E | 4 | 2 | sulit | Faraid rawan disederhanakan, keluar dari pesan |
| A | 2 | 5 | ya | Kartu biasa |
| K | 2 | 3 | ya | Mirip wipe spreadsheet |
| H | 2 | 1 | ya | Generik |
| L | 2 | 1 | ya | Mengulang Coderoach OS |
| N | 1 | 1 | ya | Tidak relevan |
| B | 5 | 5 | ya | Lungsin × pakan = dua sumbu insight, identitas Tenun |
| J | 4 | 4 | ya | Kampung = adat, pengamat = penanya |
| F | 3 | 2 | ya | Jarak hubungan, bukan istilah |
| Q | 3 | 3 | ya | Sumbu penanya lemah |
| D | 4 | 4 | ya | Kuat di "siapa memilih", adat hilang sendirian |
| R | 2 | 5 | ya | Bukti bagus, bentuk tabel |
| I | 3 | 3 | ya | Lapisan identitas |
| O | 3 | 5 | ya | Isi tepat, bentuk matriks |

## Tiga konsep

Istilah di bawah dicek ke `seed-data/terms.sunda.ts` dan `terms.minang.ts` (30 Okt 2026).

### Konsep A: Kain silsilah (B + O)

- Ide: satu orang tetap, Rahmat (fiktif), ditenun di kain. Benang lungsin tegak adalah penanya,
  benang pakan mendatar adalah adat, dan istilahnya ada di persilangan. Pembaca melihat sendiri
  bahwa di Sunda yang membedakan adalah umur, di Minang sisi.
- Matriks (penanya, lalu Sunda dan Minang): anak adik perempuannya (Uwa, Mamak alias Mak dang);
  anak adik laki-lakinya (Uwa, Pak tuo); adik perempuannya (Lanceuk, Uda); anaknya (Bapa, Apak).
- Koreografi: quiet reveal, benang demi benang: tiap baris penanya ditenun saat masuk, tanpa pin.
  Grid 2×4 muat di 320 px; tanpa JS kain sudah utuh.

| Adegan | Pesan | Teks tampil | Yang terlihat | Transisi |
|---|---|---|---|---|
| 1 | Jawaban dulu | Nama Archivo lebar, tagline, ringkasan | Kain biru keabuan, benang emas tipis | Statis |
| 2 | Satu orang | "Rahmat, dipanggil apa?" | Kartu Rahmat (fiktif), kakak laki-laki dua adik | Statis |
| 3 | Kain | Empat penanya × dua adat | Lungsin dan pakan, istilah di persilangan; kolom Sunda bergaris hijau-tanah, Minang merah-emas | Tiap baris ditenun saat masuk |
| 4 | Aturannya | "Sunda menimbang umur, Minang menimbang sisi" | Dua kalimat aturan dari data, plus Kamanakan dan Bako dengan catatan datanya | Reveal |
| 5 | Kain utuh | Tangkapan pohon asli | Pohon contoh | Enter |
| 6 | Kedalaman | Faraid dengan pecahan eksak, edukatif bukan fatwa; offline | Teks | Quiet |

### Konsep B: Utara adalah Anda (D + J)

- Langit yang sama berisi bintang keluarga, diputar per penanya; nama rasi ditulis menurut kampung
  Sunda atau nagari Minang. Paling berani; metafora menjauh dari produk.

### Konsep C: Simpul terbelah, lalu buku aturan (C + R, paling aman)

- Satu simpul dibelah dua lensa (Uwa dan Mamak), lalu aturan aslinya, ditutup kasus Kamanakan.

## Gerbang GK

Diputuskan subagen penilai terpisah atas nama Farrez (delegasi 30 Okt 2026), D-01, 2026-10-30.

- **Terpilih: Konsep A, Kain silsilah (B + O).** Matriks penanya × adat satu-satunya bentuk yang
  langsung memperlihatkan pesannya; metafora tenun adalah identitas AkarKita sendiri, tidak
  mengulang halaman lain, dan tanpa JS kainnya sudah utuh sebagai tabel semantik.
- **Kalah, B (Utara adalah Anda):** rasi yang diputar butuh JS dan menjauh dari produk; memetakan
  kampung ke adat berisiko menyeragamkan nagari.
- **Kalah, C (Simpul terbelah):** pilihan aman, satu kontras saja, tanpa sumbu penanya.

Koreksi wajib dan pemenuhannya:

1. Sumbu ditukar mengikuti DESIGN.md: pakan (baris) adalah penanya, lungsin (kolom) adalah adat.
2. Sumbu umur Sunda dibuat terlihat: Rahmat (fiktif) punya kakak perempuan dan adik laki-laki.
   Baris: anak kakak perempuannya (Emang, Mamak), anak adik laki-lakinya (Uwa, Pak tuo), adik
   laki-lakinya (Lanceuk, Uda), anaknya (Bapa, Apak). Semua dicek ke `seed-data/terms.*.ts`.
3. Istilah utama tetap Mamak; Mak dang dan Mak etek ditulis sebagai sapaan urutan yang
   bervariasi per nagari, seperti `notes` di data.
4. Cakupan aturan dibatasi: "untuk saudara laki-laki ibu, tua atau muda tetap Mamak", karena Minang
   juga membedakan umur di sisi lain (Pak tuo, Pak etek). Kamanakan dan Bako memakai catatan data
   persis.
5. Warna adat hanya di kepala kolom berlabel; istilah diberi `lang`; di 320 px label penanya
   bertumpuk; reveal tidak meniru animasi app; faraid tanpa angka.

## Produksi

- Dibangun di `src/app/(frontend)/work/_bespoke/akarkita/`; Archivo dipakai bersama RideDeck, jadi
  variabel font-nya diganti nama dari `--font-ridedeck` ke `--font-archivo`.
- Kuota: Flow 0 kredit, Gemini 0 permintaan.
- GD5: pratinjau lokal 1440×900 (kain dengan benang emas per baris) dan 320 px (tiap penanya jadi
  pita, dua istilah bersebelahan), lalu audit `impeccable` oleh subagen terpisah.
- Audit `impeccable` (subagen, dari kode): 16/20. Diterapkan: di bawah 640 px istilah 22 px dengan
  lebar 100, padding 12 px, dan kolom `minmax(0, 1fr)` (diukur: tidak ada istilah terpotong di
  320 px); kepala "Yang bertanya" disembunyikan secara visual saja; peran tabel, baris, dan sel
  eksplisit untuk Safari; `lang` di Pancakaki dan Mamak; nilai teks redup dan cincin fokus untuk
  pita tur gelap; warna lungsin jadi token. Subjudul kolom Sunda ditulis "garis ayah dan ibu"
  supaya sejajar dengan "Suku dari garis ibu". Dibiarkan: risiko CLS kecil dari Archivo lebar saat
  font-swap (next/font memakai fallback metrics).
