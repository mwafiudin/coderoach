# Konsep: halaman bespoke d-day (/work/d-day)

Tanggal: 2026-10-30. Jenis: scrollytelling (halaman proyek bespoke, ADR 0013).
Proyek: T-0087. Prosedur: skill `alur-desain` 1.3.0, `references/konsep.md`. Izin: studio (lab,
anonim). Batas: tanpa aturan strategi, saldo, hasil trading, harga stop, atau nama mitra; semua
data simulasi.

## Brief

| Butir | Isi |
|---|---|
| Tujuan | Setelah membaca, calon klien yang ingin mengotomasi proses berisiko (uang, operasi, mesin) percaya bahwa Coderoach membangun otomasi yang aman untuk dihentikan dan sulit untuk dilanjutkan sembarangan. |
| Pembaca | Pemilik aturan atau proses yang tahu apa yang harus terjadi tapi tidak membaca kode dan tidak bisa menjaga server sepanjang hari; membaca di laptop, curiga pada "bot". |
| Insight | Yang ditakuti bukan otomatisnya, tapi saat otomatis itu salah dan tidak ada yang tahu, atau tidak bisa dihentikan. Karena itu kehati-hatian dipindah: berhenti cukup satu ketukan, lanjut harus dibuktikan. Sumber: `projects.ts`, `_referensi/portofolio/_kerja/d-day-fakta.md` (commit fe0cba2: "kill switch satu ketukan; kehati-hatian dipindah ke Lanjutkan"). |
| Satu pesan | Berhenti cukup satu ketukan; melanjutkan harus dibuktikan. |
| Bukti | Status engine dari heartbeat, tick terakhir, halt, dan posisi tanpa proteksi, yang terburuk menang; kill switch satu tombol; Lanjutkan terbuka hanya bila sinkron exchange berumur paling lama 10 menit membuktikan order dan catatan cocok, diperiksa ulang server; worker terpisah memegang kunci, dashboard tidak; rekonsiliasi baca-saja menemukan stop yang dibatalkan dari luar dan order bukan buatan engine; backtest, bayangan, dan live satu loop; uji testnet ditutup 7 Okt 2026 (stop nyata, order ditolak, proses mati di tengah order). Lanjutkan dengan mengetik LANJUTKAN (tur). |
| Nada dan identitas | DESIGN.md repo d-day: gaya Apple gelap, font sistem dengan angka tabular, satu aksen System Orange `#ff9f0a`, naik hijau `#30d158`, turun `#ff6961`, latar hidup yang membawa status sistem (`latar-waspada`, `latar-bahaya`), kaca di nav dan panel, gerak pegas dengan pengganti untuk gerak dikurangi. Plus DESIGN.md situs bagian bespoke. |
| Batasan | Halaman web bahasa Indonesia, terbaca tanpa JS, LCP ≤2,5 s, CLS <0,1, reduced-motion, 320 sampai 1440 px. Aset: tur 40 detik dan empat tangkapan (keadaan, log, kill switch, rekonsiliasi), data simulasi. Tanpa angka trading, tanpa nama simbol nyata selain yang sudah di tangkapan, tanpa kesan "bot cuan". |
| Kriteria menilai ide | (1) Orisinal: bukan dashboard tour atau grafik harga. (2) Relevan: asimetri berhenti dan lanjut. (3) Jujur: data simulasi ditandai, tidak ada klaim hasil trading. (4) Identitas d-day (gelap, oranye tunggal, latar yang membawa status). (5) Terbaca tanpa JS dan di 320 px. |

## Ideasi

Ide mentah dari Farrez: tidak ada (delegasi penuh 30 Okt 2026). Putaran 1: tiga subagen terpisah
tanpa referensi. Putaran 2 setelah rujukan dibuka. Huruf = urutan acak untuk penilai.

| # | Sudut | Ide dalam satu kalimat | Putaran | Ditandai "jelas"? |
|---|---|---|---|---|
| F | pembaca, lokal | Tuas MCB: turun satu ketukan, naik terkunci sampai bukti sinkron muncul | 1 | ya |
| A | pembaca, lokal | Penjaga perlintasan: palang turun tanpa tanya, naik hanya setelah rel dipastikan kosong | 1 | |
| K | pembaca, lokal | Tukang parkir "kosong, Bos?": rekonsiliasi disorot per baris dengan aba-aba | 1 | |
| P | pembaca, lokal | Satu malam pemilik tidur, rel jam 22.00 sampai 06.00, sistem tetap bisa dihentikan | 1 | |
| H | pembaca, lokal | Dua pintu tak sama: keluar lebar tanpa kunci, masuk sempit berkunci | 1 | |
| C | mekanisme | Satu kartu status, latar bergeser ke waspada lalu bahaya; yang terburuk menang dan kalimat tidak kembali | 1 | ya |
| M | mekanisme | Tombol dulu, bukti kemudian: Hentikan langsung bereaksi, Lanjutkan menunggu tiga baris bukti | 1 | |
| B | mekanisme | Siapa pegang kunci: worker memegang kunci, dashboard hanya kaca | 1 | |
| Q | mekanisme | Bukti yang menua: stempel sinkron memudar menuju batas 10 menit, lalu Lanjutkan terkunci lagi | 1 | |
| E | mekanisme | Satu loop tiga rupa: bingkai tetap, label Backtest, Bayangan, Live berganti | 1 | |
| J | metafora luar | Kunci ganda brankas: lanjut butuh dua kunci, sinkron dan rekonsiliasi | 1 | ya |
| G | metafora luar | Lock-out tag-out: yang menghentikan memasang gembok dan tag, tag lepas setelah log cocok | 1 | |
| D | metafora luar | Hitungan kasa: luka tidak ditutup sebelum hitungan masuk dan keluar klop | 1 | |
| L | metafora luar | Sakelar orang mati dibalik: bawaannya berhenti aman, lanjut harus terus disahkan | 1 | |
| N | metafora luar | Checklist kokpit: batal lepas landas satu baris, lanjut checklist panjang berjenjang | 1 | |
| R | rujukan luar industri | Tombol darurat jamur merah di mesin pabrik: ditekan sekali mengunci di bawah, dan hanya bisa dilepas dengan diputar setelah penyebabnya diperiksa | 2 | |
| I | identitas | Latar hidup d-day: seluruh halaman ikut berubah warna dari tenang ke waspada ke bahaya, satu-satunya oranye adalah tombol berhenti | 2 | |
| O | mekanisme, bukti | Ketik LANJUTKAN: halaman berakhir di kolom yang meminta pembaca mengetik kata itu, tetapi tetap terkunci karena buktinya kedaluwarsa | 2 | |

Rujukan setelah putaran 1: empat tangkapan dan tur 40 detik d-day (data simulasi); DESIGN.md repo
d-day (gelap, oranye tunggal, latar yang membawa status); luar industri: tombol berhenti darurat
mesin (IEC 60947-5-5: ditekan mengunci, dilepas dengan memutar).

## Penilaian (subagen terpisah)

| # | Orisinal | Relevan | Layak | Catatan |
|---|---|---|---|---|
| G | 5 | 5 | ya | LOTO: gembok dan tag sebagai bukti fisik penghentian |
| R | 4 | 5 | ya | E-stop jamur: mekanismenya sendiri asimetris |
| A | 4 | 5 | ya | Perlintasan lokal; risiko terasa ilustrasi anak |
| Q | 4 | 4 | ya | Bukti yang menua; cocok jadi lapisan |
| O | 4 | 5 | sulit | Kolom ketik tanpa JS menyesatkan |
| N | 3 | 5 | ya | Metafora penerbangan sudah aus |
| F | 3 | 5 | ya | Dekat dengan R, kurang dramatis |
| H | 3 | 4 | ya | Generik |
| P | 3 | 3 | ya | Isi tipis |
| D | 5 | 3 | sulit | Sisi berhenti hilang, nuansa medis berat; gugur |
| L | 4 | 2 | sulit | Dead man's switch minta ditahan, berlawanan dengan satu ketukan; gugur |
| K | 4 | 2 | ya | Hanya rekonsiliasi; gugur |
| J | 2 | 4 | ya | Brankas klise; gugur |
| M | 2 | 5 | ya | Tur dashboard; gugur |
| C | 2 | 3 | ya | Identitas, bukan cerita |
| I | 2 | 3 | ya | Lapisan |
| B | 3 | 2 | ya | Arsitektur, bukan pesan; gugur |
| E | 2 | 1 | ya | Gugur |

Fakta produk untuk naskah (repo d-day): `trading_state` menyimpan `halt_level` (`none`,
`halt_masuk`, `halt_total`), `halt_reason`, dan `halted_at` (`db/migrations/0001_init.sql`,
`0003_halt_level.sql`); Lanjutkan butuh potret worker sinkron berumur paling lama 10 menit
(`dashboard/src/lib/lanjutkan.ts`, `UMUR_SINKRON_MAKS_MS`, ADR 0021), dan aset tanpa proteksi
dibersihkan oleh pernyataan manusia, bukan oleh tick.

## Tiga konsep

### Konsep A: Gembok dan tag (G + Q)

- Ide: di pabrik, siapa pun yang menghentikan mesin menggantung gembok dan tag di sakelarnya, dan
  mesin tidak menyala lagi sebelum tag dilepas dengan syaratnya. Di d-day, Hentikan semua adalah
  gembok itu: satu ketukan, langsung terpasang, dengan tag yang mencatat tingkat, alasan, dan
  waktu. Melepasnya butuh bukti: potret sinkron yang masih segar dan catatan yang cocok.
- Koreografi: pin dan scrub pendek (≥1024×900): tag tergantung, lalu tiga syarat lepas terisi
  satu per satu sementara cap waktu sinkron menua; di akhir tag masih terpasang karena satu
  syarat belum terpenuhi (data simulasi). Di ponsel dan tanpa JS: tag dan daftar syarat statis.

| Adegan | Pesan | Teks tampil | Yang terlihat | Transisi |
|---|---|---|---|---|
| 1 | Jawaban dulu | Nama, tagline, ringkasan | Hitam, satu oranye | Statis |
| 2 | Berhenti | "Satu ketukan, langsung terkunci" | Gembok oranye pada tag: tingkat halt total, alasan, waktu (contoh) | Gembok terpasang |
| 3 | Syarat lepas | "Melepasnya harus dibuktikan" | Tiga syarat: sinkron ≤10 menit, order dan catatan cocok, aset tanpa proteksi dibereskan | Terisi satu per satu |
| 4 | Bukti menua | "Bukti yang basi tidak berlaku" | Cap sinkron bertambah umur melewati 10 menit, syarat pertama padam lagi | Scrub |
| 5 | Bukti asli | Tangkapan kill switch dan rekonsiliasi | Tangkapan | Enter |
| 6 | Tur | Tur 40 detik | TourChapter | - |

### Konsep B: Perlintasan (A + P)

- Satu malam dari kacamata penjaga palang: turun satu baris, naik menunggu rel kosong (log dan
  rekonsiliasi), latar ikut menggelap sesuai status.

### Konsep C: Tombol jamur (R + I, paling aman)

- Satu tombol darurat di tengah halaman: "ditekan" mengunci dan mengubah latar ke bahaya,
  "diputar" adalah deretan pemeriksaan yang harus lulus.

## Gerbang GK

Diputuskan subagen penilai terpisah atas nama Farrez (delegasi 30 Okt 2026), D-01, 2026-10-30.

- **Terpilih: Konsep A, Gembok dan tag (G + Q), dengan latar dari I sebagai lapisan.** Satu-satunya
  yang memperlihatkan asimetri sebagai benda: gembok terpasang tanpa syarat, tag punya syarat
  lepas, sejalan dengan `halt_level`, `halt_reason`, `halted_at`, dan `syaratLanjutkan()`; "bukti
  menua" menampilkan `UMUR_SINKRON_MAKS_MS` yang khas produk ini.
- **Kalah, B (Perlintasan):** ilustratif dan kekanakan; "rel kosong" mengaburkan syarat aslinya,
  cocok per engine live.
- **Kalah, C (Tombol jamur):** "diputar" bisa dilakukan siapa saja tanpa bukti, jadi metaforanya
  membantah pesan.

Koreksi wajib dan pemenuhannya:

1. Empat syarat persis `lanjutkan.ts`: ada potret dengan rekonsiliasi; umur potret paling lama
   10 menit; semua engine live ikut sinkron terakhir; semua berputusan cocok. Lalu mengetik
   LANJUTKAN. "Aset tanpa proteksi" dikosongkan oleh pernyataan manusia saat Lanjutkan ditekan,
   bukan syarat.
2. Pengecualian ditulis: tanpa engine live, syaratnya gugur.
3. Perbedaan dengan LOTO ditulis: di pabrik hanya pemasang yang boleh melepas gembok; di d-day
   yang melepasnya adalah bukti, bukan orang.
4. Tag memakai nilai kode: `halt_total`, "dihentikan manual dari dashboard"
   (`dashboard/src/app/halt/actions.ts`), cap waktu UTC, dan label "Data simulasi" di tag itu.
5. Tangkapan berada di tema terang; keterangannya menyebut itu. Halt total menggeser latar adegan
   ke `latar-bahaya` `#3d0b0b`, dengan status juga ditulis sebagai teks; oranye hanya untuk gembok.

## Produksi

- Dibangun di `src/app/(frontend)/work/_bespoke/d-day/`; tanpa font baru (font sistem, seperti app).
- Kuota: Flow 0 kredit, Gemini 0 permintaan.
- GD5: pratinjau lokal 1440×900 (latar berubah ke bahaya, gembok terpasang, syarat kedua basi) dan
  320 px (tanpa luber), lalu audit `impeccable` oleh subagen terpisah.
- Audit `impeccable` (subagen, dari kode): 15/20, tanpa P0/P1. Diterapkan: status di tag memakai
  kalimat app ("berhenti total: tidak ada order sampai dilanjutkan manusia",
  `dashboard/src/app/page.tsx`); latar bahaya punya pengganti tanpa `color-mix`; syarat terpenuhi
  dan gagal kini bertanda ikon centang dan silang (Phosphor), bukan hanya warna; titik henti
  pemeriksaan dihitung sekali. Dibiarkan: risiko CLS dari tinggi adegan setelah hidrasi (pola bersama).
