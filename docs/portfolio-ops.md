# Portofolio /work — operasi

Peta berkas, aturan izin, dan urutan kerja untuk mengubah portofolio di coderoach.id/work.
Keputusannya ada di `docs/decisions/0001`–`0014`.

## Peta berkas

| Berkas | Isi |
| --- | --- |
| `src/lib/portfolio/projects.ts` | Sumber isi portofolio. Disinkronkan ke Payload, tidak diisi di admin. |
| `src/lib/portfolio/gate.ts`, `grants.ts` | Gerbang izin sebelum sync menulis apa pun; izin dibaca dari Coderoach OS. |
| `src/lib/portfolio/sync.ts` | Sync ke Payload. Memiliki field cerita, menulisnya kosong bila hilang, dan melewati proyek yang tidak berubah. |
| `src/lib/portfolio/links.ts` | Kapan status link boleh ditampilkan (≤48 jam) dan href mana yang aman. |
| `src/app/(frontend)/work/_story/` | Halaman proyek gaya produk (ADR 0003). Dipakai begitu `summary.problem` terisi. |
| `src/app/(presentasi)/`, `src/sw/presentasi.ts`, `src/lib/presentasi/` | Mode presentasi offline (ADR 0008). |
| `src/lib/portfolio/consent.ts` | Jenis izin: `studio`, `legacy`, atau ref `IZN-YYYY-NNN` dari Coderoach OS. |
| `src/lib/portfolio/legacy-baseline.ts` | Yang sudah tayang per 14 Okt 2026. Hanya boleh menyusut. |
| `src/lib/portfolio/metrics.ts` | Bentuk angka bersumber: nilai, satuan, tanggal, metode, sumber, izin. |
| `src/lib/portfolio/taxonomy.ts` | Daftar bidang untuk Projects dan Clients (nilainya sama dengan `klien.bidang` di Coderoach OS). |
| `src/app/(frontend)/_components/ui/IndustryIcon.tsx` | Ikon Phosphor per bidang (ADR 0014). Bidang baru di `taxonomy.ts` gagal typecheck sampai diberi ikon. |
| `src/lib/linkcheck/` | Pemeriksa link live beserta pagar SSRF-nya. |
| `src/lib/schema/` | Tes bahwa skema Payload hanya bertambah (`baseline.json`). |
| `scripts/portfolio-assets/` | Gambar dan video sumber. Nama berkas berversi: `laporta-tur.v2.mp4`. Anggaran: loop 600 KB, tur 8 MB, poster 150 KB, still 300 KB (`npm test`). |
| `_referensi/portofolio/_alat/` (di luar repo) | Alat rekam, encode, data demo, uji offline, dan ukur LCP/CLS. |

## Aturan izin

Repo ini publik. Apa pun yang di-commit dianggap sudah terbit.

- **Angka, logo, nama, tangkapan, testimoni, video, dan link klien hanya masuk dengan izin
  tercatat.** Izin dicatat di Coderoach OS (menu klien → Izin portofolio): siapa yang memberi,
  tanggal, lewat apa, dan buktinya. Di sini hanya ref-nya (`IZN-2026-001`).
- **Data yang belum berizin tidak di-commit sama sekali**, termasuk di komentar atau branch.
  Simpan di luar repo sampai izinnya ada.
- **`legacy` hanya untuk yang sudah tayang sebelum aturan ini.** Studi kasus klien berstatus
  legacy boleh ditulis ulang, tapi tidak boleh mendapat angka atau gambar baru. `npm test`
  menagihnya.
- **Angka target tidak ditulis sebagai hasil.** `status: 'target'` selalu tampil sebagai "Target …".
- **Setiap angka membawa sumber:** `sourceRef` (`repo@commit` atau path dokumen) atau `verifyUrl`
  publik, plus tanggal ukur dan metode dalam satu kalimat.

Pasang hook supaya tes jalan sebelum commit (repo ini tanpa CI):

```bash
git config core.hooksPath .githooks
```

## Variabel lingkungan

| Variabel | Di mana | Gunanya |
| --- | --- | --- |
| `CODEROACH_OS_URL` | tempat sync dijalankan | Alamat Coderoach OS, mis. `https://coderoach-os.vercel.app`. |
| `CODEROACH_OS_TOKEN` | tempat sync dijalankan | Token Coderoach OS ber-scope `read:portofolio` (90 hari). Tanpa token yang sah sync berhenti sebelum menulis. Jangan pernah dicetak ke log. |
| `PORTFOLIO_LINKCHECK=on` | Railway, runtime | Menyalakan job `checkLinks` (tiap 6 jam, antrean `linkcheck`). Mati = status link tidak ditampilkan setelah 48 jam. |
| `NEXT_PUBLIC_PRESENTASI_OFFLINE=on` | Railway, **build** | Membangun service worker presentasi. Dicabut lalu deploy ulang = kill switch: halaman presentasi menghapus worker dan cache di setiap perangkat yang membukanya lagi. |

`--assume-consents` hanya jalan dengan `SEED_TARGET=local`; di produksi izin selalu dibaca dari
Coderoach OS.

## Menambah atau mengubah proyek

1. Ubah `projects.ts`. Aset baru masuk ke `scripts/portfolio-assets/` dengan nama baru (sync tidak
   pernah mengunggah ulang berkas dengan nama yang sama).
   Setiap proyek yang tampil wajib punya `cover`; `npm test` menolak kartu yang jatuh ke sampul
   gambar garis.
2. `npm test`.
3. Lokal: `npx tsx --env-file=.env.local scripts/portfolio-sync.ts`, lalu `--apply`.
4. Produksi, setelah deploy, dari checkout utama (folder yang ter-`railway link`) di `origin/main`
   persis: `npx tsx scripts/run-in-production.ts portfolio-sync`. Periksa hasilnya (baris
   `blocked` = item tanpa izin yang ditahan, `upload`/`update` = yang akan berubah), lalu ulangi
   dengan `--apply`. Image Railway tidak membawa `scripts/`, jadi skrip ini mengirim
   `portfolio-sync.ts` dan `scripts/portfolio-assets` lewat stdin `railway ssh`, mencocokkan
   sha256 di container, lalu menjalankannya di sana. Rahasia produksi tidak keluar dari Railway.
5. Sync tidak pernah menghapus Media. Berkas yang tidak dipakai lagi dihapus manual di admin
   (Media, menu titik tiga di halaman berkas, Delete), karena `/api/media/file/...` tetap publik
   selama berkasnya ada. Sebelum menghapus, cek lewat API admin bahwa tidak ada proyek, halaman,
   layanan, atau klien yang merujuk ID-nya. Nama yang sama bisa ada di `public/assets/katalog/`;
   itu berkas lain dan tidak ikut terhapus.
   Sesudah dihapus, asal membalas 500 (bukan 404), tetapi Cloudflare masih menyajikan salinan
   yang sempat diminta sampai `max-age=14400` habis (4 jam). Jangan membuka atau `curl` berkas
   yang akan dihapus tanpa parameter acak: permintaan itu mengisi cache edge. Untuk hilang
   seketika, purge URL-nya di dashboard Cloudflare (Caching, Custom Purge).
   Sudah dihapus per 15 Nov 2026: `fifofun-impor.v1.webp` dan `fifofun-rekonsiliasi.v1.webp`
   (memuat nama bank sungguhan), dan `rencana-ro-rencana-ro.v2.webp` (memuat istilah skema
   prinsipal; salinannya di arsip, lihat `docs/portfolio-arsip/rencana-ro.md`), lalu
   `rencana-ro-tur.v2.mp4` dan posternya setelah tur v3 tayang. Berkas yang dulu
   terdaftar di sini, yaitu `portfolio-laporta.webp`, `nds-etl-*`, dan `rencana-ro-*.v1.*`, sudah
   tidak ada di Media saat dicek tanggal yang sama.
6. Katalog fitur di akhir halaman bespoke tidak lewat sync: datanya di
   `src/lib/portfolio/katalog.ts`, layarnya di `public/assets/katalog/`, dan keduanya ikut deploy
   biasa. Layar dipotong dari rekaman demo dengan `_referensi/portofolio/_alat/katalog/potong.py`
   (spec per proyek di `_alat/katalog/spec/<slug>.json`), yang mencetak lebar dan tinggi untuk
   disalin ke data. `npm test` (`katalog.test.ts`) menolak berkas hilang, tanpa versi, lebih dari
   300 KB, ukuran yang tidak cocok, berkas menganggur, tanda penyambung terlarang, kata yang
   menerangkan halaman, superlatif, dan nama yang tidak boleh tampil.

Template halaman proyek berganti ke halaman cerita begitu `summary.problem` terisi. Rekaman demo
dibuat dari database demo berdata fiktif dan wajib membawa `demoNote` yang mengatakannya.

## Mode presentasi

`/work/presentasi` adalah rak proyek untuk rapat di kantor klien. Panah memilih, Enter membuka, F
layar penuh, Esc kembali. Halamannya tidak diindeks dan tanpa analytics.

1. Sehari sebelumnya, di laptop yang akan dipakai: buka `/work/presentasi`, tekan **Siapkan
   offline**, tunggu sampai statusnya "Siap offline · N berkas · X MB". Tombol yang sama
   (**Perbarui**) menyegarkan isi dan membuang proyek yang sudah ditarik.
2. Offline, buka `/work/presentasi` dari bookmark. Proyek dibuka dari rak, bukan dari `/work/<slug>`
   (yang itu di luar jangkauan worker).
3. Yang tidak pernah di-cache: `/admin`, semua `/api` selain `/api/media/file`, halaman situs lain,
   dan request selain GET (`src/lib/presentasi/rules.ts`, ada tesnya).

## Mengubah skema (urutan wajib)

Skema produksi diubah dengan dev push, bukan migrasi (`docs/opsscore-ops.md`, bagian Database), dan
Railway auto-deploy `main`. Kode yang membutuhkan kolom yang belum ada akan gagal di setiap
halaman, jadi **push dilakukan sebelum merge**. Healthcheck `/api/health` membaca setiap collection
dan global, sehingga deploy yang terlanjur naik tanpa push gagal dan versi lama tetap melayani.

1. Hanya perubahan additive. `npm test` menolak kolom yang dihapus, diganti nama, berganti tipe,
   menjadi wajib, atau opsi select yang berkurang.
2. Gladi di DB lokal yang skemanya disalin dari produksi (dump **skema saja**, tanpa data):
   `npm run dev` di `main` harus "No changes", dan di branch harus tanpa prompt.
3. Sebelum merge, oleh wafi atau farrez dengan izin wafi:
   - backup: `railway ssh --service Postgres -- 'pg_dump -U postgres -Fc railway' > backup-YYYYMMDD.dump`;
   - `railway connect Postgres --tunnel-only`, lalu arahkan `DATABASE_URI` di `.env.local` ke tunnel itu;
   - `npm run dev` di head PR, buka `/admin` untuk memicu push. **Kalau muncul prompt apa pun, jawab
     No dan berhenti.**
   - matikan dev server, lalu kembalikan `DATABASE_URI` ke lokal.
4. Merge. Railway membangun, `/api/health` lolos, dan versi baru dipromosikan.
5. Sync portofolio (dry run, lalu `--apply`), kemudian landing sync (mengisi `listed` dan `industry`
   Clients; tanpa itu marquee beranda kosong karena hanya klien `listed` yang dibaca).
6. Set `PORTFOLIO_LINKCHECK=on` dan, bila mode presentasi offline dipakai,
   `NEXT_PUBLIC_PRESENTASI_OFFLINE=on` (variabel build, perlu deploy ulang).
7. `npm run schema:baseline`, lalu commit `baseline.json` baru.

Rollback lewat kode (revert), tidak pernah dengan "un-push" skema.
