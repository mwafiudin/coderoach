# Look-dev: sampul kartu portofolio /work

Tanggal: 2026-11-14. Gaya dipilih Farrez: **dari balik bahu, di tempat kerjanya** (styleframe 1 dari
tiga di `docs/konsep/sampul/styleframe-laporta.html`). Riset dasarnya ada di
`docs/riset/2026-11-standar-portofolio.md` dan laporan riset gambar marketing di sesi yang sama.

## Konteks

- **Cerita:** setiap sampul menjawab "dipakai siapa, di mana, untuk pekerjaan apa" dalam satu
  pandangan: crew di outlet saat tutup shift, surveyor di depan deretan ruko, distributor di gudang.
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
