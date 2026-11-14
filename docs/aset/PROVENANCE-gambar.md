# Asal-usul gambar buatan AI

Gambar di bawah dibuat dengan AI dan diberi keterangan "Foto ilustrasi buatan AI" di halaman yang
memakainya. Semuanya foto suasana: tidak menampilkan layar, hasil, atau komponen produk. Layar
produk di situs ini selalu tangkapan asli.

| Berkas | Dipakai di | Alat dan model | Akun | Tanggal |
|---|---|---|---|---|
| `public/assets/suasana/yiheecam-kebun-teh.v1.webp` | `/work/yiheecam`, latar hero | Google Flow, Nano Banana 2.1, 16:9, 0 kredit | Google AI Pro farrez | 28 Okt 2026 |
| `public/assets/suasana/laporta-kasir.v1.webp` | `/work/laporta`, sebelum adegan struk | sama | sama | 28 Okt 2026 |
| `public/assets/suasana/jeda-kereta.v1.webp` | `/work/jeda`, sebelum adegan dua meja | sama | sama | 28 Okt 2026 |

Pengolahan: diunduh 1376x768 JPEG dari Flow, dikonversi ke WebP kualitas 80 dengan ffmpeg, tanpa
potong. SynthID dari Google tertanam; watermark terlihat dimatikan di akun.

## Prompt

**yiheecam-kebun-teh:** Photorealistic first-person view from an action camera mounted on the
chin of a motorcycle helmet, riding a narrow winding asphalt road through tea plantations in the
highlands south of Bandung, West Java, early morning mist over rolling hills of green tea bushes,
the top of the motorcycle dashboard and handlebar visible at the bottom edge, gloved hands on the
grips, slight wide-angle lens look, natural soft daylight, no text, no logos, no brand marks.

**laporta-kasir:** Photorealistic close-up of a small Indonesian fried chicken stall counter at
closing time, a compact thermal receipt printer printing a long paper receipt that curls over the
edge of the stainless steel counter, warm amber lamp light, blurred kitchen in the background, no
readable text on the receipt, no logos, no faces.

**jeda-kereta:** Photorealistic view inside an Indonesian commuter train next to the window, a
small open paper notebook with a pen and a smartphone resting on a person's lap, soft overcast
light, muted warm grey tones, calm and quiet mood, the window shows a blurred dark tunnel wall, no
readable text, no faces, no logos.

Varian yang tidak terpakai tetap di proyek Flow "Oct 28 - 16:47" milik akun itu.

## RideDeck (`/work/ridedeck`, 28 Okt 2026)

Bukan foto suasana, jadi masing-masing diberi keterangan sendiri di bawah gambarnya.

| Berkas | Isi dan asal | Keterangan di halaman |
|---|---|---|
| `public/assets/ridedeck/konsep-ikon.v1.webp` | Lembar tiga konsep ikon dari Gemini (Nano Banana, Flash High), akun Google AI Pro farrez, 22 Okt 2026. Asli: `rideDeck-lab/gemini/lembar.png`, diperkecil ke 1200 px, WebP q84. Prompt di `docs/brief-gambar-ikon.md` repo rideDeck-ayam. | "Konsep buatan AI (Gemini), hanya acuan." |
| `public/assets/ridedeck/ronin-{body,steer,wheel-front,wheel-rear,light-head,light-brake,light-tail}.v1.glb` | Sejak 29 Okt 2026: model bersendi yang dipakai app (rideDeck-ayam `app/src/main/assets/models/sim`, commit 15b2d60). Bentuk dari Tencent Hunyuan3D-2 atas gambar acuan Google Flow (bukan foto TVS), lalu diselaraskan ke ukuran buku manual TVS Ronin 2026 (jarak sumbu 1.357 mm, caster 27 derajat, tinggi jok 795 mm); roda dan lampu prosedural; tanpa standar. Alur lengkap `rideDeck-lab/sim3d/PROVENANCE.md`. Dikompres meshopt, total 364 KB. Lisensi: Tencent Hunyuan 3D 2.0 Community License (atribusi wajib, ditulis di Sumber). Bentuk meniru desain TVS Motor; dipakai atas keputusan farrez (ADR 0014), tanpa logo. Model lama `ronin.v1.glb` (dari foto TVS) dihapus. | Atribusi di bagian Sumber; label per gambar dihapus atas permintaan farrez 29 Okt 2026 |
| `public/assets/ridedeck/ronin-poster.v2.webp` | Render model lama (ronin.glb dari foto TVS) dengan three.js 0.186.1 dan material grafit polos, 1200x800, WebP q86; dipakai sebagai poster sebelum rig bersendi dimuat. | sama dengan model |

`ikon.v1.svg` bukan buatan AI: diterjemahkan 1:1 dari vektor `ic_launcher_*` app. `dasbor-22okt.v1.webp`
adalah tangkapan layar asli HP pemilik (22 Okt 2026, 00.05), status bar dipotong.

**ridedeck-hero (gambar):** Photorealistic first-person view from a motorcyclist at blue hour on a
winding mountain road in Java, Indonesia. The warm beam of a round headlight lights the wet asphalt
ahead. At the bottom edge, gloved hands on a matte black handlebar, softly out of focus. Distant town
lights glitter in the valley below, a last thin orange glow on the horizon, light mist between the
hills. Wide 16:9 frame, natural colours, slight motion blur at the road edges, full-frame camera at
24mm. No text, no logos, no brand names, no phone, no screens, no other people, no watermark.

**ridedeck-hero (klip, bingkai awal = gambar di atas):** Single continuous shot with no cuts,
first-person view from the rider. The camera rolls slowly and steadily forward along the road at a
calm touring pace, the handlebars and gloved hands stay fixed at the bottom of the frame with only a
gentle vibration. The headlight beam moves ahead on the wet asphalt, mist drifts slowly between the
hills, the town lights in the valley twinkle softly. The scene stays the same place and the same
light from start to end. No text, no logos, no people besides the rider's hands, no phone, no
screens. Silent.

**ridedeck-transfer (29 Okt 2026, tidak dipakai lagi sejak hari yang sama):** klip Flow 20 kredit diganti morph partikel three.js yang di-scrub gulir (permintaan farrez). Catatan asalnya tetap di sini.
**ridedeck-transfer (asli):** `public/assets/ridedeck/transfer-loop.v1.mp4` dan `.poster.webp`,
bagian "Dari motor ke layar". Dua gambar Nano Banana 2.1 (0 kredit), bingkai awal motor roadster retro
generik grafit tanpa logo dan bingkai akhir HP di dudukan stang dengan layar cahaya amber abstrak (tanpa
UI yang terbaca), lalu Frames to video Omni 1.1 Flash 720p 6 detik x2, 20 kredit. Varian 2 dipilih
(motor terurai dari hub roda depan; varian 1 hanya crossfade). Diolah ffmpeg: audio dibuang, tahan
bingkai akhir 1,2 detik, fade masuk 0,4 detik dan keluar 0,6 detik supaya loop tidak melompat, H.264
CRF 29, 538 KB. Poster bingkai detik 4,9. Asli di `D:\downloads\claude\2026-10-29-flow-ridedeck-transformasi\`.
Keterangan di halaman: animasi ilustrasi buatan AI, layar RideDeck sebenarnya ada di tangkapan di bawahnya.
Prompt klip: motor diam [0-1s]; mulai dari hub roda depan terurai jadi partikel cahaya amber dan
mengalir melengkung [1-4s]; aliran terkumpul ke HP dan layarnya menyala amber [4-5.5s]; diam [5.5-6s];
satu motor, satu HP, tanpa teks, logo, atau orang.

## Sampul kartu /work, papan berlapis dengan ornamen (14 Nov 2026)

Tiga belas berkas `scripts/portfolio-assets/<slug>-sampul.v3.webp`: papan presentasi seperti sampul
Uruzin dan RPN OS. Ikon, nama, `tagline`, dan chip dirender dari HTML; layar laptop dan ponsel
**tangkapan asli** dari folder ini; ornamen 3D clay buatan AI. Templat dan alat di
`_referensi/portofolio/_alat/sampul/` (`papan3.html`, `rakit-papan3.mts`, `kunci.mts`).

Tiap papan memuat 3 sampai 4 layar: satu layar utama di laptop (angka, grafik, atau fitur khas), dua
jendela browser di belakangnya, dan ponsel bila produknya punya versi mobile. Asal layar tambahan:

- Tangkapan data demo dari `_referensi/portofolio/_kerja/rekaman/` (Laporta v4, Coderoach OS v2),
  `_kerja/nds-rekam/stills` (Rencana RO: kalender, taruh di mana), dan `_kerja/jeda/rekaman/stills`
  (ringkasan dan tabel untuk psikolog, catatan baru). Semua berdata fiktif; tidak ada layar
  Rencana RO yang memuat istilah skema prinsipal (`rencana-ro.png` sengaja tidak dipakai).
- Rekaman situs live 14 Nov 2026 dengan Chrome headless, desktop 1440×900 dan ponsel 390×844 @2x:
  theglobal-review.com (beranda, Geopolitik, artikel), chickenwow.id (beranda, menu, lokasi,
  kemitraan), akarkita.vercel.app (beranda, warisan). Izin klien: IZN-2026-001, IZN-2026-002.
- LocaScore (`locascore-sampul.v4.webp`): direkam 14 Nov 2026 dari LocaScore yang dijalankan lokal
  dengan `MOCK_MODE=true` (data tiruan bawaan aplikasi) dan akun uji lokal: sembilan calon lokasi
  bernama "Kandidat A–I" di area publik Bandung dan Yogyakarta, dua survei contoh. Halaman detail
  direkam dalam posisi digulir ke bagian Kesimpulan, jadi banner "Mock mode aktif" tidak tampil;
  label "Data mock" di halaman itu tetap asli. Produksi tidak dipakai karena berisi rencana ekspansi
  klien.
- RideDeck (`ridedeck-sampul.v4.webp`): ponsel `ridedeck-musik.v1` (pemutar media), `ridedeck-kokpit.v1`,
  `ridedeck-tangki.v2`; kartu peta adalah potongan widget PETA dari `ridedeck-dasbor.v1` (x 32–748,
  y 1205–1339) yang diperbesar 2x. Dasbor penuh tidak dipakai karena bagian atasnya peringatan
  aksesibilitas. Tangkapan `rideDeck-lab/panel.png` dan `yt.png` tidak dipakai: memuat lokasi sekitar
  rumah dan thumbnail YouTube kreator lain.

- Ornamen: Google Flow, Nano Banana 2.1, 16:9, 0 kredit, akun Google AI Pro farrez. Tiga benda
  per gambar di latar hijau (#00FF00) atau magenta (#FF00FF, untuk AkarKita dan Jeda), dipotong
  dengan chroma key dan despill. Prompt ada di `docs/look-dev/sampul-portofolio.md`.
- **YiheeCam:** layar "merekam" memakai `yiheecam-yakin.v1.webp`. Area pratinjau kamera
  (x 0–780, y 118–558) yang di tangkapan demo berisi pola warna diganti foto POV kamera helm buatan
  Flow. Antarmuka di sekitarnya tetap asli. Alt teks menyebut pratinjau itu ilustrasi.
- Ikon Rencana RO: monogram "RO" buatan studio untuk sampul ini; ikon lama repo NDS-ETL tidak
  dipakai karena memuat singkatan portal prinsipal.
- Uruzin dan RPN OS tetap memakai sampul lama (izin legacy).

Versi v2 (papan satu layar per perangkat) disimpan di `_referensi/portofolio/sampul-papan-v2/`.
Versi v1 (`<slug>-sampul.v1.webp`, foto dari balik bahu) dikeluarkan dari repo dan disimpan
di `_referensi/portofolio/sampul-balik-bahu/` untuk halaman detail. Media-nya di produksi masih ada
karena sync tidak menghapus Media.
