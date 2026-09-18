# Gambar karakter empat fase OpsScore

Prompt untuk ilustrasi karakter tiap fase di section "Empat fase AI Readiness" (`/opsscore`). Dipakai bareng `PHASE_COPY` di `src/lib/opsscore/copy.ts`.

Arah gayanya mengikuti panel adegan di dalam kuis (`SectionScene`, `PhaseScene`): bidang gelap, garis tipis, satu aksen biru, objek digambar sebagai proyeksi, bukan benda nyata. Jadi landing, kuis, dan report terbaca sebagai satu produk.

## Spesifikasi file

| Hal | Nilai |
| --- | --- |
| Rasio | 1:1 |
| Ukuran | 1200 × 1200 px, diturunkan ke 600 × 600 saat dipasang |
| Format | PNG, latar gelap ikut di dalam gambar (bukan transparan) |
| Nama file | `public/assets/opsscore/phase-1.png` … `phase-4.png` |
| Safe area | Figur di tengah, sisakan 8% kosong di tiap sisi supaya aman saat dipotong |
| Teks | Tidak ada teks, huruf, atau angka di dalam gambar |

## Gaya bersama (tempel di depan tiap prompt)

```
Futuristic technical illustration, vector line art on a dark near-black background
#13171A with a faint electric-blue grid receding into depth. Every object is a
translucent wireframe projection: thin 1.5px electric-blue #2C70FE edges, small vertex
dots at the corners, faint blue inner fill, as if beamed into the air. The person is
drawn as a clean off-white #F4F7F5 line figure with light flat shading, realistic
proportions, calm face: an Indonesian small business owner in modern casual clothes and
an apron. Strict palette: near-black background, off-white figure, electric blue for
everything projected, warm grey #A7A2A9 only for depth. Fine halftone texture, very
subtle scanlines, controlled soft glow on the blue elements only. Flat frontal camera,
centered figure, generous empty space, composed like an instrument panel diagram.
No purple or magenta neon, no cyberpunk city, no chrome, no lens flare, no rainbow light.
```

## Prompt per fase

**Fase 1 — The Juggler (Si Paling Hafal).** Semua data ada di kepala pemilik.

```
[gaya bersama] A shop owner at the center, looking up, hands open mid-juggle. Five
holographic objects orbit their head along a thin elliptical path marked with tick marks
and node dots: a cash box, a stack of receipts, a produce crate, a clock, a phone — all
blue wireframe projections, none of them solid. Above the head an octagonal HUD frame
holds a dense tangle of thin blue lines, a knot of unstructured memory, a few line ends
escaping the frame. One object at the lower right has left the orbit and is breaking
apart into small particles as it falls. Nothing here is stored anywhere but in the head.
```

**Fase 2 — The Connector (Si Paling Fast Response).** Data ada, tapi berserakan di chat.

```
[gaya bersama] A shop owner holding a phone in both hands, thumb scrolling, standing
inside a tall column of holographic chat bubbles that pours out of the phone and rises
past the top of the frame. Dozens of wireframe bubbles at varying opacity, overlapping,
unsorted, drifting sideways. Deep in the stack one single bubble is solid electric blue
and denser than the rest: the number being searched for. A thin scanning line sweeps
down the column hunting for it. The data exists, but it is suspended in the air.
```

**Fase 3 — The Organizer (Si Paling Excel).** Sudah tercatat, tapi laporan masih disusun tangan.

```
[gaya bersama] A shop owner at a plain desk beside a large holographic spreadsheet
lattice standing upright in the air, one hand reaching into the grid and dragging a
single row out of it. Grid cells are blue wireframe with visible node points; the dragged
row is solid electric blue and trails a thin line toward a second, empty panel where the
owner is placing it by hand. A queue of identical empty panels waits behind it. The link
between the two panels runs through the person's hand, not through a machine.
```

**Fase 4 — The Autopilot (Si Paling Siap AI).** Data sudah bisa dibaca mesin.

```
[gaya bersama] A shop owner standing calm, hands at their sides, one step back from the
work. Three blue data streams made of moving particles flow in from the left, each led by
a small wireframe icon — a cart, a crate, a coin — converging into a single octagonal hub
floating at chest height with solid electric-blue edges. One clean line leaves the hub and
feeds a floating dashboard panel showing three even bars and a four-pointed spark.
Everything snaps to the background grid. The owner holds nothing; the system runs itself.
```

## Negative prompt

```
text, letters, numbers, watermark, logo, photorealism, 3D render, chrome, purple or
magenta neon, cyberpunk city street, rainbow lights, lens flare, heavy bloom, busy
background, cartoon mascot, chibi, exaggerated facial expression, robot, android,
floating UI screenshots, hand-drawn sketch texture
```

## Menjaga keempatnya konsisten

- Buat Fase 1 dulu sampai puas, lalu pakai gambar itu sebagai style reference untuk tiga sisanya. Seed sama kalau model-nya mendukung.
- Tinggi figur sama di semua gambar, sekitar 70% tinggi kanvas, kamera sejajar dada.
- Biru hanya untuk yang diproyeksikan. Badan orangnya tidak pernah biru, supaya kontras "manusia vs data" tetap terbaca.
- Satu objek kunci per gambar yang paling terang: simpul ingatan, satu bubble chat, baris yang disalin, hub oktagon. Itu yang membuat keempatnya terbaca sebagai satu rangkaian naik.
- Cek di ukuran kecil (240 px). Kalau objek kuncinya tidak terbaca, minta versi dengan objek lebih besar dan detail lebih sedikit.

## Kalau mau versi terang

Landing-nya berlatar `paper`, jadi empat kartu gelap akan jadi elemen paling berat di halaman. Itu bisa bagus (mereka jadi jangkar visual), tapi kalau terasa terlalu berat, ganti dua baris pertama gaya bersama dengan:

```
Vector line art on an off-white #F4F7F5 background with a faint blue blueprint grid.
Objects are blue wireframe projections with visible vertex dots; the person is drawn in
near-black #08090A line work with light grey flat shading.
```

Sisa promptnya tidak berubah.
