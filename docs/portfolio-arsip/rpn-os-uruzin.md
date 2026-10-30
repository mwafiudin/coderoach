# Arsip: copy lama rpn-os dan uruzin

Ditulis ulang 30 Okt 2026 (T-0087, izin penuh Farrez). Kedua entri berizin legacy (ADR 0009):
copy boleh ditulis ulang, tidak boleh diberi angka, gambar, atau nama klien baru. Visual tidak
diubah.

Copy lama disimpan utuh, apa adanya, di `src/lib/portfolio/arsip-legacy.ts` (`ARSIP_LEGACY`),
karena teks itu memang sudah publik dan Wafi mungkin lebih suka versi lama.

## Cara memulihkan

1. Di `src/lib/portfolio/projects.ts`, ganti objek berslug `rpn-os` atau `uruzin` di `PORTFOLIO`
   dengan objek berslug sama dari `ARSIP_LEGACY`.
2. `npm test`. `arsip.test.ts` memastikan arsipnya utuh dan tetap lolos aturan legacy, jadi
   pemulihan selalu boleh.
3. Sync produksi (`docs/portfolio-ops.md` langkah 4), lewat sesi yang berwenang menjalankannya.

## Yang berubah

Hanya tagline, excerpt, summary, dan body. Slug, izin, urutan, sampul, meta, pill, dan bidang
tetap sama. Semua angka di copy baru termasuk daftar `LEGACY_ENTRIES` di `legacy-baseline.ts`.
