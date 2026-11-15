# Look-dev: sampul kartu portofolio /work

Tanggal: 2026-11-14, direvisi hari yang sama (struktur B, versi sampul v4/v5).

## Struktur B (yang tayang sejak v4/v5)

Keputusan Farrez 14 Nov 2026: papan mengikuti susunan Uruzin OS ("System Operations and Finance").
Yang dibaca pertama adalah **apa produknya**, bukan nama mereknya. Pilihan A (tanpa ornamen) dan B
(satu ornamen) ada di `docs/konsep/sampul/struktur-uruzin-laporta.html`; Farrez memilih B.

| Butir | Aturan |
|---|---|
| Ukuran | 1600×1000, webp q84 ≤300 KB; versi EN dirender dari templat yang sama untuk /en nanti |
| Judul | kategori produk, Archivo 800 64 px huruf besar, maksimal 470 px (mengecil otomatis bila satu kata lebih lebar) |
| Merek | ikon 42 px dan nama 34 px warna aksen, di atas judul |
| Baris dukung | JetBrains Mono 19 px huruf besar, satu pembeda yang ada buktinya; satu baris, atau dua baris (`<br>`) bila isinya daftar fitur plus "dan masih banyak lagi" seperti RideDeck (permintaan Farrez 15 Nov 2026) |
| Label pembaca | kanan atas, mono 17 px, garis kiri, pembagian baris seimbang |
| Grid | garis tipis y 250/760 dan x 440/1480 dengan tanda silang |
| Layar | jendela UI datar dimiringkan (rotateY -13°), tanpa bingkai laptop; ponsel berbingkai tipis. App yang hanya ada di HP memakai susunan khusus (YiheeCam: gambar kamera dan dua ponsel; RideDeck: ponsel landscape dan portrait, kokpit, cuaca rute, dan musik diperbesar) |
| Ornamen | **satu** benda clay di kiri bawah, dekat judul |
| Teks | label tiap produk lewat prosedur kerajinan kalimat `bahasa-lisan`, 2–3 pilihan, Farrez memilih; klaim tanpa bukti diganti versi yang bisa dibuktikan |
| Templat | `_referensi/portofolio/_kerja/sampul-v5/papan/papan5.html` (beserta bahan dan 26 papan PNG ID/EN), dirakit `_referensi/portofolio/_alat/sampul/rakit-papan5.mts` |

Kartu katalog memotong papan: kartu pertama (feature) memakai rasio 3:2 atau tinggi bebas dengan
`focalX: 1`, kartu terakhir kadang lebar 2:1. Judul di kiri bawah dan label kanan atas harus tetap
terbaca di potongan itu.

Rencana RO v6 (15 Nov 2026): penggunanya anggota usaha penjualan langsung berjenjang yang tidak
menyimpan stok, jadi "Asisten bisnis distributor" dan ornamen kardus membuat pemilik usaha membaca
bisnis gudang. Farrez memilih narasi "skema bonus berlapis": judul "Penerjemah skema bonus", dukung
"Bonus cair, beli berapa, di bawah siapa" (dua baris), label "Untuk program bonus berjenjang",
ornamen papan klip. Jangan pakai "distributor" (sebutan resmi banyak perusahaan MLM, terbaca sebagai
pemilik stok), "MLM" (stigma), atau "mitra" (lekat dengan pengemudi ojol). Peraturan memakai
"anggota" (Permendag 70/2019 Pasal 1 angka 7).

## Keputusan versi v3 (diganti struktur B)

1. **Kartu depan: papan presentasi** seperti Uruzin OS dan RPN OS (keputusan Farrez, 14 Nov 2026,
   setelah 13 sampul foto balik bahu tayang: "agak aneh kalau semua tampilan di bagian depannya ...
   baiknya mungkin di detail landing page-nya"). Ikon, nama, kalimat, chip, layar asli dalam bingkai
   laptop atau ponsel, di atas warna produk.
2. **Ornamen 3D clay** (pilihan B dari dua styleframe di `docs/konsep/sampul/gaya-ornamen-laporta.html`):
   tiga benda konteks per proyek, matte seperti tanah liat, warna dari palet produk.
3. **Foto balik bahu** (bagian di bawah) pindah ke halaman detail; berkasnya disimpan di
   `_referensi/portofolio/sampul-balik-bahu/` sampai storyboard tiap halaman diimplementasikan.

## Papan

| Butir | Aturan |
|---|---|
| Ukuran | 1600×1000, webp ≤300 KB |
| Kiri | ikon 96 px radius 22, nama 88 px huruf produk, kalimat = `tagline` di projects.ts, 3 chip mono (bidang, platform, tahun) |
| Kanan | laptop miring 9° dan/atau ponsel; layar selalu tangkapan asli |
| Latar | warna latar produk + sinar radial lembut di belakang perangkat |
| Ornamen | 3 benda clay: satu di belakang laptop, satu di depan bawah, satu di tepi ponsel; tidak menutupi angka atau judul di layar |
| Templat | `_referensi/portofolio/_alat/sampul/papan.html` |

## Blok gaya ornamen untuk prompt Flow

> Soft 3D render, wide 16:9, of three separate objects spaced well apart in a row, each fully
> visible with empty space around it, matte clay-like materials in {PALET}, rounded friendly forms,
> gentle studio light, isolated on a perfectly flat solid chroma {green (#00FF00) | magenta (#FF00FF)}
> background with no floor and no shadows on the background: {TIGA BENDA}. No text, no logos, no numbers.

Latar magenta untuk proyek yang bendanya hijau. Potong latar dengan `kunci.mts` (chroma key +
despill), satu PNG per benda.

---

# Versi pertama (foto balik bahu, dipindah ke halaman detail)

Tanggal: 2026-11-14. Gaya dipilih Farrez: **dari balik bahu, di tempat kerjanya** (styleframe 1 dari
tiga di `docs/konsep/sampul/styleframe-laporta.html`). Riset dasarnya ada di
`docs/riset/2026-11-standar-portofolio.md` dan laporan riset gambar marketing di sesi yang sama.

## Konteks

- **Cerita:** setiap sampul menjawab "dipakai siapa, di mana, untuk pekerjaan apa" dalam satu
  pandangan: crew di outlet saat tutup shift, surveyor di depan deretan ruko, anggota jaringan yang menyusun rencana bonus minggu ini.
- **Pembaca:** pemilik usaha yang menilai apakah studio pernah membangun sistem untuk pekerjaan
  seperti miliknya. Konteks harus memberi informasi, bukan suasana (NN/g, Photos as Web Content).
- **Tetangga:** kartu katalog /work (paper `#F7F8F9`, hairline, satu aksen biru situs). Nama dan
  kalimat proyek ada di HTML kartu, jadi gambar tanpa teks.
- **Platform:** kartu 360 sampai 420 px, halaman proyek sampai 1600 px. Anggaran still 300 KB
  (`npm test`).
- **Sumber:** adegan dari Google Flow (Nano Banana 2.1) dengan layar putih kosong; tangkapan layar
  asli ditempel lewat transformasi perspektif (`_referensi/portofolio/_alat/sampul/`).

## Aturan seri

| Butir | Aturan |
|---|---|
| Rasio dan ukuran | 16:10, 1600×1000, webp ≤300 KB |
| Kamera | Dari balik bahu, setinggi dada, sedikit dari kiri belakang; kesan lensa 35 mm |
| Orang | Satu orang, tanpa wajah: kepala belakang dan bahu terpotong di tepi kiri; tangan boleh |
| Perangkat | Satu perangkat utama (ponsel atau laptop), di sepertiga kanan, 30 sampai 45% lebar bingkai |
| Cahaya | Cahaya alami lembut dari satu sisi; adegan malam memakai lampu praktis hangat |
| Warna | Natural dan agak redup, satu benda beraksen warna produk |
| Ruang tajam | Hanya perangkat dan tangan; tempat kabur supaya terbaca sebagai bentuk dan warna |
| Latar Indonesia | Tempat biasa (ruko, konter stainless, gudang, ruang makan); tanpa daun pisang, baju adat, gedung pencakar langit |
| Dilarang | Wajah, logo, teks, papan nama, menu, uang, pelat nomor, kertas putih lain di bingkai |
| Layar | Selalu tangkapan asli, ditempel; AI tidak pernah menggambar UI |

## Blok gaya untuk prompt Flow

Ditempel di setiap prompt, lalu ditambah kalimat tempat dan perangkat per proyek:

> Editorial documentary product photograph, wide 16:10 landscape, over-the-shoulder at chest
> height from behind and slightly left of one person; the face is not visible, only the back of
> the head and one shoulder cropped at the left edge. 35mm look, shallow depth of field, soft
> natural light from one side, muted natural colours with a single {ACCENT} accent object, calm
> and professional. The {DEVICE} screen faces the camera and is completely blank flat pure white,
> evenly lit, no reflections, no text. Correct five-finger hands. An ordinary Indonesian setting,
> not a tourist postcard: no banana leaves, no traditional costume, no skyscrapers. No faces, no
> logos, no text, no signage, no menus, no money, no number plates, no other white paper in frame.

## Cek per gambar

1. Jumlah jari, cara memegang perangkat, perangkat tidak terbalik.
2. Tidak ada teks, logo, atau wajah yang bisa dikenali (perbesar 200%).
3. Layar kosong terdeteksi sebagai satu bidang putih dengan empat sudut; tempelan mengikuti
   perspektif.
4. Lihat di 400 px dan dalam abu-abu: tempat dan jenis pekerjaan tertebak dalam satu detik.
5. Gagal dua kali: ganti foto sungguhan di tempat aslinya.

## Asal dan label

Semua adegan buatan AI (Google Flow), dicatat di `scripts/portfolio-assets/PROVENANCE.md` dan
`_referensi/kuota-konten/log.csv`. Orang di gambar tidak pernah disebut sebagai klien atau
pengguna.
