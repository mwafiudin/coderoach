# Koreografi scroll untuk halaman proyek (riset 28 Okt 2026)

Dasar kosakata gerak di DESIGN.md (Bespoke project pages, Motion vocabulary). Dikumpulkan subagen
riset; tiap sumber dibuka pada tanggal itu. Yang belum terverifikasi ditandai di bagian akhir.

## Temuan inti

- **Scroll yang ditahan boleh, asal pendek dan fungsional.** NN/g (Scrolljacking 101, 2023): menahan
  scroll menurunkan orientasi; boleh bila fungsional, pendek, tidak pada teks penting, tanpa ganti
  arah, dan umumnya tidak di ponsel.
- **Animasi membantu bila menjelaskan perubahan keadaan**, bukan sebagai hiasan (NN/g, The Role of
  Animation and Motion in UX, 2020).
- **Parallax dan zoom adalah pemicu vestibular** (web.dev prefers-reduced-motion; Val Head, Smashing
  2020). WCAG 2.2 SC 2.3.3 meminta gerak non-esensial bisa dimatikan; SC 2.2.2 meminta loop lebih
  dari 5 detik bisa dijeda.
- **Scrollytelling yang baik menahan grafik dan menggerakkan teks**, tanpa mengubah mekanik scroll
  (The Pudding, How to implement scrollytelling, 2017).
- **CSS scroll-driven animations** (`animation-timeline: view()/scroll()`) jalan di luar main thread
  (Chrome for Developers). Dukungan: Chrome 115+, Safari 26+, Firefox 159+ menurut caniuse, tapi MDN
  (16 Sep 2026) masih "Limited availability". Situs ini tetap memakai mesin `--p` di StoryEnhancer,
  yang jalan di semua browser dan sudah menghormati reduced motion; SDA dipertimbangkan bila
  dukungan Firefox stabil terkonfirmasi.

## Pemetaan jenis cerita ke koreografi

| Jenis cerita | Koreografi | Alasan |
|---|---|---|
| Alur kerja berurutan | Pin dan scrub pendek, langkah diskret, progress rail | Satu artefak berganti keadaan menunjukkan sebab-akibat |
| Transformasi data | Shared element, number reveal | Kontinuitas elemen membuktikan laporan berasal dari data yang sama |
| Sebelum dan sesudah | Wipe di satu bingkai | Tidak perlu mencocokkan dua gambar |
| Perangkat keras dan sinyal | Image sequence pendek, theme morph, status rail | Benda fisik paling jelas lewat frame nyata |
| Ketenangan, kesehatan mental | Reveal opasitas lambat, tanpa pin dan parallax | Pembaca lebih mungkin sensitif terhadap gerak |
| Riwayat versi | Scroll horizontal native dengan snap, atau timeline vertikal | Membajak arah membingungkan |

## Penilaian ulang pilot (dan yang diubah)

| Halaman | Koreografi | Sesuai jenisnya? | Perubahan |
|---|---|---|---|
| Laporta | Pin dan scrub (struk) | Ya, alur kerja berurutan | Pin dari 300vh ke 220vh |
| Jeda | Pin dan scrub (dua meja) | **Tidak**: produk kesehatan mental | Pin dicabut; catatan menyeberang pelan saat lewat |
| YiheeCam | Pin dan scrub (papan flap) | Ya, perubahan keadaan perangkat | Pin 220vh, hanya layar ≥768 px |

Belum diterapkan, kandidat gelombang 2: progress rail yang bisa diklik untuk Laporta, image sequence
kamera untuk YiheeCam bila ada foto produk asli.

## Contoh yang dibuka

- apple.com/airpods-pro: image sequence dan pin; aset startframe/endframe terlihat di halaman.
- developer.chrome.com/blog/css-ui-ecommerce-sda: Tokopedia, redBus, Policybazaar memakai SDA CSS.
- scroll-driven-animations.style: demo resmi per pola (Bramus).
- linear.app: bagian fitur bernomor dengan mockup berganti keadaan (disimpulkan dari teks).
- pudding.cool/process/how-to-implement-scrollytelling: pola grafik tetap, teks bertahap.

## Belum terverifikasi

- Status Firefox stabil untuk `animation-timeline` (caniuse dan MDN berbeda).
- Pola gerak linear.app, stripe.com, dan apple.com disimpulkan dari teks halaman, bukan dilihat.
- Tidak ditemukan bukti terukur bahwa pin dan scrub menaikkan pemahaman di halaman studi kasus.
- Halaman Locomotive, Active Theory, Raycast, Vercel, Arc, dan Framer belum dibuka; studi kasus
  Codrops menolak akses (403).
