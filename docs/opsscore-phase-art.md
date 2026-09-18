# Gambar karakter empat fase OpsScore

Prompt untuk membuat ilustrasi karakter tiap fase di section "Empat fase AI Readiness" (`/opsscore`). Dipakai bareng `PHASE_COPY` di `src/lib/opsscore/copy.ts`.

## Spesifikasi file

| Hal | Nilai |
| --- | --- |
| Rasio | 1:1 |
| Ukuran | 1200 × 1200 px, diturunkan ke 600 × 600 saat dipasang |
| Format | PNG latar transparan (kalau tidak bisa, latar rata `#F4F7F5`) |
| Nama file | `public/assets/opsscore/phase-1.png` … `phase-4.png` |
| Safe area | Karakter di tengah, sisakan 8% kosong di tiap sisi supaya aman saat dipotong |
| Teks | Tidak ada teks di dalam gambar. Judul dan nama fase tetap dari HTML |

## Gaya bersama (tempel di depan tiap prompt)

```
Flat vector editorial illustration, clean geometric line work at even 2px weight,
limited palette: near-black ink #08090A, off-white paper #F4F7F5, one electric blue
accent #2C70FE used sparingly for the single most important object, soft warm grey
#A7A2A9 for secondary shapes. Subtle paper grain, no gradients, no glossy 3D, no drop
shadows, no neon glow. Calm technical mood, like a diagram in a design manual that
happens to have a person in it. Indonesian small business owner, modern casual clothes,
friendly and competent, not cartoonish and not corporate stock. Full body or
three-quarter view, centered, generous empty space around the figure, flat background.
```

## Prompt per fase

**Fase 1 — The Juggler (Si Paling Hafal).** Semua data ada di kepala pemilik.

```
[gaya bersama] A shop owner juggling five floating objects at once: a cash box, a
stack of receipts, a produce crate, a wall clock and a phone. The objects orbit around
the head in an arc. The head is drawn as a simple octagon outline in electric blue with
a dense tangle of thin lines inside, like a knot of memory. One object is slipping out
of the arc and starting to fall. Body language: quick, alert, slightly overloaded.
No desk, no computer, nothing written down.
```

**Fase 2 — The Connector (Si Paling Fast Response).** Data ada, tapi berserakan di chat.

```
[gaya bersama] A shop owner standing inside a tall column of chat bubbles that rises
past the top of the frame, thumb scrolling a phone held in both hands. The bubbles are
plain outlined rounded rectangles in grey, dozens of them, overlapping and unsorted.
One single bubble deep in the stack is filled electric blue, as if it holds the number
they are looking for. A magnifier outline hovers over the stack. Body language: fast,
responsive, buried in messages.
```

**Fase 3 — The Organizer (Si Paling Excel).** Sudah tercatat, tapi laporan masih disusun tangan.

```
[gaya bersama] A shop owner seated at a plain desk beside a large spreadsheet grid that
stands upright like a board, hand-copying one row from the grid onto a separate report
sheet. Grid cells are thin grey outlines, a few cells filled electric blue to mark the
row being moved. A second identical sheet waits in a tray. Body language: patient,
methodical, doing the same transfer again. Nothing is automated, the link between grid
and report is literally the owner's hand.
```

**Fase 4 — The Autopilot (Si Paling Siap AI).** Data sudah bisa dibaca mesin.

```
[gaya bersama] A shop owner standing calmly with hands relaxed, one step back from the
work. Beside them, three thin lines labelled by simple icons (a cart, a crate, a coin)
flow into a single octagon hub outlined in electric blue, and out of the hub one line
continues to a small dashboard panel showing three neat bars and a four-pointed spark.
Everything is aligned and evenly spaced. Body language: unhurried, in control, watching
the system run instead of running it.
```

## Negative prompt

```
text, letters, numbers, watermark, logo, UI screenshot, photorealism, 3D render,
glossy plastic, neon glow, heavy drop shadow, gradient mesh, cluttered background,
office stock photo vibe, cartoon mascot, chibi, exaggerated facial expression,
multiple accent colors, rainbow palette
```

## Menjaga keempatnya konsisten

- Generate keempat gambar dalam satu sesi, dengan style prompt yang sama persis dan seed yang sama kalau model-nya mendukung.
- Kunci framing: tinggi karakter di semua gambar kira-kira sama, sekitar 70% tinggi kanvas.
- Empat karakter boleh orang yang berbeda, karena pengguna akan mengenali dirinya di salah satunya. Yang harus sama adalah gaya garis, palet, dan sudut pandang.
- Biru elektrik hanya boleh muncul di satu objek per gambar: simpul ingatan, satu bubble chat, baris yang disalin, dan hub oktagon. Itu yang membuat keempatnya terbaca sebagai satu rangkaian.
- Setelah jadi, cek di ukuran kecil (240 px). Kalau objek kuncinya sudah tidak terbaca, minta versi dengan objek lebih besar dan detail lebih sedikit.
