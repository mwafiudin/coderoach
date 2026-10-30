# Konsep: halaman bespoke LocaScore (/work/locascore)

Tanggal: 2026-10-30. Jenis: scrollytelling (halaman proyek bespoke, ADR 0013).
Proyek: T-0087. Prosedur: skill `alur-desain` 1.3.0, `references/konsep.md`.

## Brief

| Butir | Isi |
|---|---|
| Tujuan | Setelah membaca, calon klien (pemilik jaringan F&B, investor outlet) percaya bahwa memilih lokasi bisa dibuktikan dengan alasan, bukan firasat, dan bahwa Coderoach bisa membangun alat analitik semacam itu. |
| Pembaca | Pemilik atau manajer ekspansi brand F&B yang sedang membuka cabang, membaca di laptop atau ponsel di antara survei lokasi; juga calon klien Coderoach yang menilai kemampuan studio di bidang data. |
| Insight | Keputusan lokasi diambil cepat padahal mengikat lama: kontrak sewa bertahun-tahun ditandatangani sesudah kunjungan satu sore ("ramai kok", "dekat sekolah", "kompetitornya cuma satu"). Sumber: `projects.ts` body, PRODUCT.md repo locascore ("Spreadsheet dressed up" sebagai anti-referensi), dan bobot skor yang dikalibrasi dari 10 outlet Geprek Wow (`lib/scoring.ts`). |
| Satu pesan | Satu link Google Maps menjadi putusan GO atau NO-GO yang alasannya bisa dibaca. |
| Bukti | Enam faktor berbobot di `lib/scoring.ts` (demografi 25%, traffic 25%, ekosistem 15%, demand 15%, kompetitor 15%, kualitas tapak 5%); ambang putusan GO skor ≥70 dan balik modal ≤18 bulan, CAUTION ≥55 dan ≤24 bulan; empat belas kategori titik; biaya Places sekitar $1,35 per lokasi (README); kalibrasi dari 10 outlet berjalan. Semua angka contoh di halaman ditandai "Data contoh" (tangkapan sampul dari MOCK_MODE). |
| Nada dan identitas | DESIGN.md locascore "The Briefing Room": navy `#052258`, Signal Blue `#0B5EFE`, workspace `#F4F7FB`, Nunito 800 untuk angka, PT Sans untuk teks, warna hanya untuk aksi dan putusan (hijau GO, amber CAUTION, merah NO GO), satu-satunya bayangan untuk kartu putusan. Plus DESIGN.md situs bagian bespoke (hero menjawab dulu, angka ke Sumber, gerak membaca `--p` dan berhenti selesai). |
| Batasan | Satu halaman web, bahasa Indonesia, terbaca tanpa JS, LCP ≤2,5 s, CLS <0,1, reduced-motion, 320 px sampai 1440 px. Hanya ada satu tangkapan layar asli (sampul kelayakan). Repo tidak berjalan lokal, jadi adegan digambar dengan HTML/CSS/SVG dan data contoh. Flow boleh dipakai bila cerita butuh. Copy tetap di `projects.ts`. |
| Kriteria menilai ide | (1) Orisinal: tidak terlihat seperti halaman SaaS analitik biasa (kartu metrik, grafik dekoratif). (2) Relevan: memperlihatkan perjalanan dari satu link ke putusan beralasan, dan menjawab "kunjungan satu sore". (3) Bisa dibaca tanpa JS dan di 320 px. (4) Jujur: angka contoh ditandai, tidak ada klaim hasil yang tidak ada sumbernya. (5) Memakai identitas LocaScore, bukan bahasa Coderoach. |

## Ideasi

Ide mentah dari Farrez: tidak ada (Farrez memberi izin penuh dan tidak sedang menunggu, 30 Okt 2026).

Putaran 1 dijalankan tiga subagen terpisah, masing-masing satu sudut, tanpa melihat hasil yang lain
dan tanpa membuka referensi. Putaran 2 ditulis setelah rujukan dibuka. Huruf di kolom # adalah
urutan acak yang diberikan ke penilai.

| # | Sudut | Ide dalam satu kalimat | Putaran | Ditandai "jelas"? |
|---|---|---|---|---|
| C | pembaca, lokal | Papan rapat berisi kalimat firasat ("ramai kok", "dekat sekolah") dicoret satu per satu oleh faktor berbobot, berakhir jadi satu skor | 1 | ya |
| E | pembaca, lokal | Rel waktu 15.00 sampai 21.00: penanda "Anda di sini" berhenti di 16.00 saat lokasi sepi, padahal puncak traffic contoh jam 19.00 | 1 | |
| H | pembaca, lokal | Lembar kontrak sewa ruko 3 tahun di samping lembar putusan yang angkanya naik ke GO, CAUTION, atau NO-GO | 1 | |
| I | pembaca, lokal | Tautan maps.app.goo.gl terbuka jadi enam baris faktor yang ditumpuk, lalu stempel putusan jatuh | 1 | |
| P | pembaca, lokal | Percakapan WhatsApp dengan pemilik ruko: satu dijawab firasat, satu dijawab data, bubble ketiga putusan | 1 | |
| M | mekanisme | Tautan dipotong jadi koordinat, pin jatuh ke peta garis, lalu jadi lencana kelurahan | 1 | ya |
| N | mekanisme | Kiri tiga kesan sore itu, kanan 14 kategori titik menyala di radius; kesan dicoret atau dikonfirmasi | 1 | |
| O | mekanisme | Garis jalan berganti tebal per kelas OSM jadi estimasi traffic, dengan catatan bahwa itu perkiraan | 1 | |
| B | mekanisme | Satu batang dari enam bilah selebar bobotnya mengisi satu per satu, melewati garis ambang 70 | 1 | |
| G | mekanisme | Surveyor mengoreksi satu field, satu bilah bergeser, total jatuh di bawah 70 dan putusan berganti | 1 | |
| J | metafora luar | Sidang: enam faktor jadi saksi berbobot, "kunjungan satu sore" saksi tunggal yang dipatahkan | 1 | ya |
| D | metafora luar | Rontgen: peta radius di lightbox, cahaya menyapu, temuan bernomor dengan catatan gaya radiolog | 1 | |
| F | metafora luar | Bor inti geologi: tiap lapisan satu faktor setebal bobotnya, dasar kolom dibaca jadi putusan | 1 | |
| K | metafora luar | Buletin prakiraan cuaca: peluang dan keyakinan per faktor, dari kabut ke cerah | 1 | |
| L | metafora luar | Akta notaris: pasal berbobot, paraf per pasal, materai GO | 1 | |
| A | rujukan luar industri | Surat ukur tanah gaya BPN: yang diukur bukan patok batas tapi 14 kategori di sekitar lokasi, ditutup cap putusan | 2 | |
| Q | rujukan web | Peta lingkungan bergaya ilustrasi dengan cincin radius yang mengisi saat digulir, lalu mengecil jadi kartu putusan | 2 | |
| R | produk (prinsip "built for comparison") | Dua ruko berdampingan: yang tampak ramai sore itu dan yang sepi; faktor dibuka bersamaan dan yang sepi menang | 2 | |
| S | produk (kalibrasi) | Sepuluh outlet berjalan sebagai titik di garis skor; kandidat baru diletakkan di antara mereka | 2 | |

Rujukan yang dibuka setelah putaran pertama:
- Antoine Corbineau, "Life on maps" (antoinecorbineau.com, lewat Siteinspire): peta ilustrasi padat
  sebagai halaman utama. Dipinjam: peta sebagai panggung cerita, bukan hiasan.
- Luar industri: Surat Ukur dan Gambar Situasi BPN (dokumen pertanahan Indonesia): tabel titik ukur
  bernomor, sketsa bidang berskala, nomor berkas, dan pengesahan. Dipinjam: putusan yang sah karena
  setiap titik ukurnya tercatat.
- Pola produk sendiri: tangkapan "Kesimpulan Kelayakan" (sampul), yang memimpin dengan skor 82, GO,
  dan alasan satu kalimat sebelum radar faktor.

## Penilaian (subagen terpisah)

Penilai hanya menerima brief, kriteria, instruksi "pilih yang orisinal", dan daftar acak di atas.

| # | Orisinal (1-5) | Relevan (1-5) | Layak dibuat | Catatan |
|---|---|---|---|---|
| A | 5 | 4 | ya | Dunia ukur tanah khas Indonesia, mengukur yang biasanya ditaksir |
| B | 2 | 5 | ya | Jujur soal bobot, tapi ini bar chart bertumpuk; gugur di orisinal |
| C | 4 | 5 | ya | Firasat dari insight dijawab faktor di satu bingkai |
| D | 4 | 3 | sulit | Tidak menyentuh kontrak atau "satu sore" |
| E | 5 | 5 | ya | "Satu sore" jadi sumbu waktu yang bisa dilihat |
| F | 4 | 3 | ya | Geologi tidak berkaitan dengan sewa atau link |
| G | 3 | 4 | ya | Varian B |
| H | 4 | 5 | ya | Taruhan (kontrak 3 tahun) di samping buktinya |
| I | 2 | 5 | ya | Harfiah, pola sticky stack umum |
| J | 4 | 4 | ya | Jitu, tapi teatrikal untuk nada Briefing Room |
| K | 4 | 2 | sulit | "Peluang" mengaburkan putusan tegas; gugur |
| L | 4 | 3 | ya | Akta adalah hasil, bukan alasan |
| M | 2 | 3 | ya | Hanya pembuka |
| N | 4 | 5 | ya | Kesan diuji oleh 14 titik, lebih spasial dari C |
| O | 3 | 2 | ya | Satu faktor saja; gugur |
| P | 3 | 3 | ya | Chat klise, rawan terbaca testimoni palsu |
| Q | 2 | 3 | sulit | Peta cantik generik, keluar dari identitas navy |
| R | 4 | 5 | ya | Ruko sepi yang menang membalik intuisi |
| S | 3 | 4 | ya | Lebih cocok sebagai penutup |

Usulan penilai: A = E+H (waktu), B = A+N (ruang dan ukur), C = R+G+S (perbandingan, paling aman).
Catatan penyusun naskah: LocaScore tidak mengukur traffic per jam (traffic diturunkan dari kelas
jalan OSM dan rasio kemacetan), jadi naskah konsep A di bawah tidak boleh menggambar kurva jam
puncak sebagai keluaran produk. Kurva itu ditulis sebagai "yang tidak terlihat dari satu sore",
dan yang dibaca LocaScore digambar sebagai hal yang tidak bergantung jam kunjungan.

## Tiga konsep

### Konsep A: Satu sore, tiga tahun

- Ide: kunjungan satu sore dan kontrak tiga tahun diletakkan di satu sumbu waktu, lalu LocaScore
  mengisi jarak di antaranya dengan alasan.
- Kenapa relevan: insight-nya justru soal waktu, keputusan sesingkat satu sore mengikat 36 bulan.
- Koreografi: progress rail (rel waktu) untuk cerita bertahap, number reveal untuk skor. Tanpa pin.
- Naskah:

| Adegan | Pesan | Teks tampil | Yang terlihat | Transisi |
|---|---|---|---|---|
| 1 (pembuka) | Jawaban dulu | Nama, tagline, masalah/solusi/hasil | Rel horizontal tipis: "Sore survei, 16.00" di kiri, "Kontrak berakhir, bulan ke-36" jauh di kanan | Statis |
| 2 | Satu sore tidak cukup | "Yang terlihat sore itu" | Tiga catatan tangan di titik 16.00 | Rel memanjang saat digulir |
| 3 | Yang dibaca tidak bergantung jam | "Yang dibaca LocaScore" | Baris faktor dengan bobotnya mengisi rel | Number reveal skor |
| 4 | Putusan | GO, balik modal 15,8 bulan (data contoh) | Penanda balik modal jatuh sebelum bulan ke-18 di rel | Penanda bergeser ke posisinya |
| 5 | Bukti | Tangkapan Kesimpulan Kelayakan | Tangkapan asli | Enter |

- Aset dan kuota: tanpa Flow. Risiko: mudah terbaca sebagai garis waktu biasa.

### Konsep B: Surat Ukur Tapak

- Ide: halaman berbentuk lembar ukur tapak. Yang biasanya ditaksir dari satu sore diukur seperti
  bidang tanah: titik bernomor di sketsa radius, tabel ukur enam faktor, lalu cap putusan.
  Meminjam tata letak dokumen ukur tanah (tabel titik, sketsa berskala, nomor berkas) tanpa lambang,
  nomor, atau nama instansi asli.
- Kenapa relevan: lawan dari "kunjungan satu sore" adalah pengukuran yang tercatat. Kontrak sewa
  ruko pembaca juga hidup di dunia dokumen tanah dan bangunan.
- Koreografi: pin dan scrub pendek (≤220vh, layar ≥1024×760) karena satu artefak berganti keadaan:
  sketsa terisi titik, tabel terisi, cap jatuh. Di layar kecil dan tanpa JS, lembar tampil terisi penuh.
- Naskah:

| Adegan | Pesan | Teks tampil | Yang terlihat | Transisi |
|---|---|---|---|---|
| 1 (pembuka) | Jawaban dulu | Nama besar Nunito 800, tagline, tiga kolom Masalah/Solusi/Hasil | Di kanan, kepala lembar ukur: "LEMBAR UKUR TAPAK", nomor berkas contoh, kolom "Kesan survei" berisi tiga catatan tangan ("ramai kok", "dekat sekolah", "kompetitornya cuma satu") | Statis, terbaca dalam 50 ms: navy, satu lembar putih |
| 2 | Satu link jadi satu titik | "Satu tautan Maps. Satu titik ukur." | Tautan maps disalin di kolom "Masukan", di bawahnya koordinat | Baris muncul |
| 3 | Yang ditaksir jadi diukur | "Empat belas kategori di sekitar titik" | Sketsa radius: titik bernomor per kategori (kompetitor, sekolah, bank, pasar modern) dan kelas jalan | Titik muncul berurutan saat scrub |
| 4 | Alasannya terbaca | "Tabel ukur" | Enam baris faktor: bobot, nilai, sumbangan poin; kesan sore di kepala lembar dicoret atau dicentang oleh baris yang menjawabnya | Baris mengisi |
| 5 | Putusan | "GO. Skor 82, balik modal 15,8 bulan (data contoh)" | Cap GO navy-hijau jatuh di kaki lembar dengan syarat ≥70 dan ≤18 bulan | Cap jatuh, satu-satunya bayangan |
| 6 | Bukti produk | Tangkapan Kesimpulan Kelayakan asli | Tangkapan di bingkai browser | Enter |
| 7 | Belajar dari jaringan | "Bobot dikalibrasi dari outlet yang sudah berjalan" | Dua paragraf dari copy, tanpa angka baru | Quiet |

- Aset dan kuota: tanpa Flow (lembar dan sketsa digambar HTML/SVG). Font Nunito dan PT Sans.

### Konsep C: Dua ruko (paling aman)

- Ide: dua kandidat berdampingan, ruko yang ramai sore itu dan ruko yang sepi. Faktor dibuka
  bersamaan, ruko yang sepi menang; satu koreksi surveyor memperlihatkan skornya bisa diperiksa.
- Kenapa relevan: LocaScore dibangun untuk perbandingan (prinsip 4 PRODUCT.md), dan twist-nya
  langsung membalik firasat "ramai kok".
- Koreografi: sticky stack per faktor (dua kolom, satu baris per faktor), wipe untuk koreksi.
- Naskah:

| Adegan | Pesan | Teks tampil | Yang terlihat | Transisi |
|---|---|---|---|---|
| 1 (pembuka) | Jawaban dulu | Nama, tagline, ringkasan | Dua kartu ruko: "Ruko A, ramai sore itu", "Ruko B, sepi" | Statis |
| 2 | Faktor dibuka | Nama faktor dan bobot | Dua kolom nilai berdampingan | Stack |
| 3 | Twist | "Yang sepi menang" | Skor B 78 GO, A 61 CAUTION (contoh) | Number reveal |
| 4 | Bisa diperiksa | "Surveyor mengoreksi satu angka" | Satu field berubah, skor bergeser | Wipe |
| 5 | Bukti | Tangkapan asli | | Enter |

- Aset dan kuota: tanpa Flow; butuh dua skenario contoh yang konsisten dengan `lib/scoring.ts`.
  Risiko: angka contoh rekaan terlihat seperti studi kasus nyata; dua kolom sempit di 320 px.

## Gerbang GK

Diputuskan oleh subagen penilai terpisah atas nama Farrez (delegasi Farrez 30 Okt 2026: "Tanpa izin
semuanya saya izinkan. Jadi tidak perlu kamu minta saya untuk intervensi lagi"), dicatat sebagai
D-01 pada 2026-10-30.

- **Terpilih: Konsep B, Surat Ukur Tapak.** Paling orisinal yang tetap relevan: bahasa ukur tanah
  adalah dunia pemilik ruko, dan pengukuran tercatat langsung membalas "kunjungan satu sore". Paling
  setia pada "The Briefing Room" (satu lembar putih, warna hanya di putusan, satu bayangan), dan
  tanpa JS lembarnya tampil terisi penuh. Tangkapan asli mencatat 18 kompetitor langsung, jadi
  catatan "kompetitornya cuma satu" bisa dicoret dengan angka dari tangkapan, bukan rekaan.
- **Kalah, Konsep A (Satu sore, tiga tahun):** sumbu waktu mengundang pembaca mengira LocaScore
  membaca jam ramai, padahal tidak, dan bentuknya mudah jadi garis waktu biasa.
- **Kalah, Konsep C (Dua ruko):** dua skenario rekaan paling mirip studi kasus palsu, tidak punya
  padanan di tangkapan asli, dan dua kolom sempit di 320 px.

Koreksi wajib dari penilai, dan cara memenuhinya:

1. Bobot di brief (`lib/scoring.ts` main) tidak cocok dengan tangkapan (dibuat dari build MOCK yang
   lebih lama; sumbangan enam baris berjumlah 70,6 sedangkan skornya 82 dan labelnya "7 faktor").
   Dipenuhi dengan tidak menampilkan bobot atau sumbangan poin: tabel ukur hanya memuat nilai 0-100
   per faktor persis dari tangkapan (69, 100, 95, 93, 70, 15) dan skor 82 seperti yang ditulis app.
2. Putusan menyebut keyakinan: "GO, skor 82, balik modal 15,8 bulan, keyakinan rendah".
3. Masukan memakai identitas tangkapan: "Calon Outlet Gajah Mada", -7.43620, 112.70650.
4. Bukan dokumen resmi: nomor berkas "LS-CONTOH-001", tanpa lambang, tanda tangan, atau kata
   "Surat Ukur"; judul lembar "Lembar Ukur Tapak"; putusan berbentuk lencana LocaScore; "Data contoh"
   di kepala lembar.
5. "Ramai kok" dijawab dengan traffic yang diturunkan dari kelas jalan OSM, ditulis sebagai
   estimasi. Di 320 px tabel ditumpuk per faktor.

GD5 (desain) memakai pratinjau berjalan, bukan kanvas statis, karena halaman ini bergerak
(`alur-desain` "Halaman bergerak" butir 2), dan diperiksa lewat `impeccable` sebelum merge.

## Produksi

- Dibangun di `src/app/(frontend)/work/_bespoke/locascore/` (pin dan scrub hanya di layar
  ≥1024×860; di bawah itu lembar tampil terisi penuh, karena lembar yang terisi sambil lewat akan
  menjawab kesan survei sesudah pembaca melewatinya).
- Kuota: Flow 0 kredit, Gemini 0 permintaan. Konsep ini tidak butuh gambar; semua digambar HTML/SVG.
- GD5: pratinjau lokal di 1440×900 dan 320 px (tanpa luber, lembar dan putusan terbaca) dan audit
  `impeccable` oleh subagen terpisah.
