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
| `public/assets/ridedeck/ronin.v1.glb` | Model TVS Ronin buatan AI dari foto produk publik TVS Motor: bentuk Tencent Hunyuan3D-2 (Space anonim), warna diproyeksikan dari foto, 22 Okt 2026. Asli `rideDeck-lab/ronin3d/ronin.glb` (1,97 MB), dikompres `@gltf-transform/cli@4.5.1 meshopt` ke 433 KB. Alur lengkap: `rideDeck-lab/ronin3d/PROVENANCE.md`. Lisensi bentuk: Tencent Hunyuan 3D 2.0 Community License (Indonesia termasuk wilayahnya, wajib atribusi). Bentuk dan warna turunan desain TVS; dipakai atas keputusan farrez 28 Okt 2026 (ADR 0014), tanpa logo TVS. | "Model buatan AI dari foto publik TVS Ronin, bukan model resmi TVS Motor..." beserta atribusi lisensi |
| `public/assets/ridedeck/hero-jalan-loop.v1.mp4` dan `.poster.webp` | Foto suasana jalan gunung senja dari atas motor: Google Flow, Nano Banana 2.1 (16:9, 2 varian, 0 kredit), varian kedua dipilih karena tanpa speedometer pabrikan; lalu Frames to video Omni 1.1 Flash 720p 4 detik x1, 7 kredit (saldo 887 sebelum, sekitar 880 sesudah). Akun Google AI Pro farrez, 28 Okt 2026. Diolah ffmpeg: audio dibuang, crossfade 0,7 detik di sambungan supaya loop mulus, H.264 CRF 27, 3,4 detik, 568 KB; poster dari bingkai pertama. Asli di `D:\downloads\claude\2026-10-28-flow-ridedeck-hero\`. Prompt di bawah. | "Video ilustrasi buatan AI (Google Flow), bukan rekaman perjalanan." |
| `public/assets/ridedeck/ronin-poster.v2.webp` | Render model di atas dengan three.js 0.186.1, cahaya, kamera, dan material yang sama dengan viewer, 1200x800, WebP q86. Sejak 29 Okt 2026 warna hasil proyeksi foto tidak dipakai: model tampil dengan satu material grafit polos (permintaan farrez, lebih bersih). | sama dengan model |

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

**ridedeck-transfer (29 Okt 2026):** `public/assets/ridedeck/transfer-loop.v1.mp4` dan `.poster.webp`,
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
