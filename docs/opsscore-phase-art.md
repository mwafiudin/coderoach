# Gambar karakter empat fase OpsScore

Prompt untuk ilustrasi tiap fase di section "Empat fase AI Readiness" (`/opsscore`). Dipakai bareng `PHASE_COPY` di `src/lib/opsscore/copy.ts`.

Gayanya: ilustrasi konseptual siluet datar — figur hitam tanpa wajah, backlight dramatis, satu metafora besar per gambar — dengan palet dan motif Coderoach. Teal diganti electric blue, siluet memakai ink, dan sumber cahayanya berbentuk oktagon. Figurnya pemilik toko berapron, bukan eksekutif berjas.

## Spesifikasi file

| Hal | Nilai |
| --- | --- |
| Rasio | 1:1 |
| Ukuran | 1200 × 1200 px, diturunkan ke 600 × 600 saat dipasang |
| Format | PNG, latar ikut di dalam gambar (bukan transparan) |
| Nama file | `public/assets/opsscore/phase-1.png` … `phase-4.png` |
| Safe area | Sisakan 8% kosong di tiap sisi supaya aman saat dipotong |
| Teks | Tidak ada teks, huruf, atau angka di dalam gambar |

## Gaya bersama (tempel di depan tiap prompt)

```
Flat vector conceptual illustration, bold silhouette style. Faceless near-black #08090A
silhouettes with clean geometric body shapes and no facial features. Dramatic backlight:
a wide radial glow fills the frame, off-white #F4F7F5 at its core fading out to electric
blue #2C70FE at the edges. A thin warm white rim light traces the top edge of every
silhouette. Props are simplified geometric solids, oversized and theatrical, deep
perspective, strong diagonal composition, generous empty space. Strict three-color
palette: near-black, electric blue, off-white — no teal, no turquoise, no third hue.
Coderoach signature: the light source is an octagon, a faint blueprint grid runs across
the background, small tick marks mark any arc or path. The figure reads as a small shop
owner — apron, rolled sleeves — never a suit and tie. Cinematic and calm, not busy.
Vector clean edges, subtle grain, no photorealism, no 3D render, no text.
```

## Prompt per fase

**Fase 1 — The Juggler (Si Paling Hafal).** Semua data ada di kepala pemilik.

```
[gaya bersama] A shop-owner silhouette in an apron stands centered, arms raised
mid-juggle, head tilted up. Five oversized objects arc above in a wide orbit: a cash box,
a fan of receipts, a produce crate, a wall clock, a phone — flat black shapes with thin
rim light, spaced along a faint dotted arc marked with tick marks. Above the head floats
an octagon of light holding a tangled knot of thin glowing lines, the only detailed thing
in the whole frame. At the lower right one object has dropped out of the arc and falls
out of the light, its rim light gone. Everything is in the air: no table, no shelf, no
screen anywhere in the frame.
```

**Fase 2 — The Connector (Si Paling Fast Response).** Data ada, tapi berserakan di chat.

```
[gaya bersama] A shop-owner silhouette stands small at the bottom of the frame, phone
raised in both hands, thumb scrolling. Out of the phone rises a towering cliff face built
from chat bubbles: hundreds of flat black bubble shapes stacked past the top of the frame,
unsorted and overlapping. One single bubble deep inside the wall glows bright, the one
number being searched for, far out of reach. A thin beam from the phone sweeps across the
wall hunting for it. The figure is dwarfed by what it is holding.
```

**Fase 3 — The Organizer (Si Paling Excel).** Sudah tercatat, tapi laporan masih disusun tangan.

```
[gaya bersama] Two enormous upright panels face each other across a gap: on the left a
giant grid wall of cells, on the right a blank report sheet. A shop-owner silhouette walks
the narrow bridge between them, carrying one glowing row of data on their shoulders like a
heavy steel beam, rim-lit against the glow. A ladder leans on the grid wall behind them and
a queue of identical blank sheets waits on the right, each one another trip. The only thing
connecting the two panels is the person: no cable, no machine, no conveyor.
```

**Fase 4 — The Autopilot (Si Paling Siap AI).** Data sudah bisa dibaca mesin.

```
[gaya bersama] A shop-owner silhouette stands on a platform seen from behind, arms open
and relaxed, facing a bright octagon of light rising on the horizon like a sunrise. Three
streams of light flow in from the left, each led by a small flat icon — a cart, a crate, a
coin — converging into the octagon. From the octagon a single clean line continues to a
floating dashboard panel of three even bars, standing where a skyline would be. The figure
holds nothing and touches nothing; the system runs in front of it.
```

## Negative prompt

```
text, letters, numbers, watermark, logo, teal, turquoise, cyan, orange, rainbow palette,
facial features, eyes, mouth, suit and tie, necktie, briefcase, corporate stock
illustration, photorealism, 3D render, chrome, cyberpunk city, lens flare, heavy bloom,
busy background, cartoon mascot, chibi, robot, android, hand-drawn sketch texture
```

## Menjaga keempatnya konsisten

- Buat Fase 1 dulu sampai benar-benar pas, lalu pakai gambar itu sebagai style reference untuk tiga sisanya. Empat prompt terpisah hampir selalu meleset satu sama lain.
- Posisi sumber cahaya sama di keempat gambar: di belakang subjek, sedikit di atas garis mata.
- Satu titik paling terang per gambar, dan itu selalu yang jadi inti ceritanya: simpul ingatan, satu bubble chat, baris yang dipanggul, hub oktagon.
- Skala figur sengaja berbeda dan itu bagian dari pesannya. Fase 1 dan 4 figurnya besar dan tenang; Fase 2 figurnya kecil karena tertimbun; Fase 3 figurnya sedang karena sedang memanggul beban.
- Cek di ukuran kecil (240 px). Kalau titik terangnya tidak langsung terbaca, minta versi dengan objek lebih besar dan detail lebih sedikit.

## Kalau empat kartu biru terasa terlalu berat

Landing-nya berlatar `paper`, jadi empat gambar dengan latar biru penuh akan jadi elemen paling dominan di halaman. Kalau mau lebih tenang, ganti kalimat backlight di gaya bersama dengan:

```
Dramatic backlight: a wide radial glow fills the frame, off-white #F4F7F5 at its core
fading to pale grey at the edges. Electric blue #2C70FE appears only on the single most
important object and on the rim light.
```

Sisa promptnya tidak berubah.
