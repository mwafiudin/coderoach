# Arsip: tangkapan Rencana RO yang ditarik

Ditarik 30 Okt 2026 dari `/work/rencana-ro` atas keputusan Komando (izin penuh Farrez,
30 Okt 2026). Berkasnya tidak dihapus, tetapi disimpan di luar repo karena repo ini publik:
`D:/Projects/ayam/_referensi/portfolio-arsip/rencana-ro/rencana-ro-rencana-ro.v2.webp`
(folder bersama studio, bukan git). `src/lib/portfolio/arsip.test.ts` menagih catatan ini tetap
ada dan tangkapannya tidak dirujuk lagi. Berkas itu masih ada di riwayat git repo ini (di
`public/` dan `scripts/portfolio-assets/` dulu); membersihkan riwayat butuh force-push dan menunggu
keputusan Farrez.

## Yang ditarik

`rencana-ro-rencana-ro.v2.webp` (kini di folder arsip di luar repo), dulu dipakai sebagai `screen` fitur
"Rencana repeat order dengan alasan" di `src/lib/portfolio/projects.ts`.

Alasannya: rekaman v2 mengganti istilah skema bonus prinsipal di browser saat merekam, tetapi
beberapa istilah lolos dari peta penggantinya dan terlihat di tangkapan ini (nama masa aktif
dari portal, label sponsor dan kaki dari skema, dan nama jenis reaktivasi). Repo ini publik, jadi
istilah itu dianggap sudah terbit selama tangkapan dipakai. Tangkapan lain dicek ulang pada
tanggal yang sama: beranda desktop dan ponsel, kalender, dan riwayat run hanya memakai istilah
netral, jadi tetap dipakai.

## Cara memulihkan

1. Salin berkasnya dari folder arsip di atas ke `scripts/portfolio-assets/`, atau rekam ulang dengan peta istilah yang diperluas (`_referensi/portofolio/_alat/rekam-nds.mjs`,
   peta `ISTILAH`, di luar repo) dan simpan sebagai `rencana-ro-rencana-ro.v3.webp`. Hapus
   entrinya dari `WITHDRAWN` di `arsip.test.ts`.
2. Kembalikan baris ini ke fitur tersebut di `projects.ts`:

   ```ts
   screen: { file: 'rencana-ro-rencana-ro.v2.webp', alt: 'Bilah poin kaki kiri dan kanan sebelum dan sesudah, dan daftar repeat order yang disarankan' },
   ```

3. `npm test`, lalu sync produksi (`docs/portfolio-ops.md` langkah 4).

## Yang tetap publik

Sync tidak pernah menghapus Media, jadi berkas lama tetap bisa dibuka lewat
`/api/media/file/rencana-ro-rencana-ro.v2.webp` sampai dihapus manual di admin (Media). Tur
`rencana-ro-tur.v2.mp4` direkam dengan peta yang sama; belum diperiksa per frame.
