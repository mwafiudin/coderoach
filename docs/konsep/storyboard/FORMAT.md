# Format storyboard scroll

Satu storyboard per halaman: tabel di `docs/konsep/<slug>.md` (bagian "Storyboard scroll") dan data
sketsa di `docs/konsep/storyboard/<slug>.json` yang dirender papan visual.

## JSON

```json
{
  "slug": "laporta",
  "judul": "Laporta",
  "halaman": "/work/laporta",
  "satuPesan": "kalimat inti halaman",
  "identitas": { "latar": "#hex", "tinta": "#hex", "aksen": "#hex", "huruf": "nama font" },
  "adegan": [
    {
      "id": "A1",
      "nama": "Hero",
      "scroll": [0, 100],
      "koreografi": "none | pin-scrub | quiet-reveal | sticky-stack | wipe | shared-element | image-sequence | progress-rail | number-reveal",
      "tata": "hero | split-kiri | split-kanan | perangkat-penuh | artefak-pin | tumpuk-kartu | wipe | grid | kutipan | angka | penutup",
      "elemen": [
        { "jenis": "teks | judul | laptop | ponsel | browser | kartu | angka | logo | ikon | diagram | video | foto", "label": "isi singkat", "posisi": "kiri | kanan | tengah | atas | bawah | penuh" }
      ],
      "gerak": "apa yang bergerak dan kapan, satu kalimat",
      "ponsel": "perbedaan di layar < 768 px",
      "reducedMotion": "apa yang tampil tanpa gerak",
      "aset": [ { "berkas": "nama-berkas.v1.webp", "status": "ada | belum" } ],
      "baru": true
    }
  ]
}
```

`scroll` dalam vh dari atas halaman. `baru: true` untuk adegan yang belum ada di halaman sekarang.

## Aturan

- Koreografi hanya dari "Motion vocabulary" DESIGN.md. Pin paling lama ±220vh, hanya layar lebar.
  Tanpa scroll horizontal di dalam pin, tanpa parallax dekoratif. Topik sensitif pakai quiet reveal.
- Teks dari `src/lib/portfolio/projects.ts`. Tidak ada angka atau klaim baru tanpa sumber.
- Teks Indonesia ditulis dengan bahasa lisan yang rapi (skill `farrez:bahasa-lisan`).
- Setiap halaman terbaca tanpa JS, LCP ≤2,5 s, CLS <0,1.
