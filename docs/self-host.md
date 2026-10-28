# Self-host (Docker)

Produksi masih di Railway (Railpack, `railway.json`). `Dockerfile` ini disiapkan untuk pindah ke
VPS: satu container di belakang Cloudflare Tunnel + Caddy, Postgres terpisah. Railway tidak
membaca `Dockerfile`, dan `output: "standalone"` hanya aktif bila `NEXT_OUTPUT=standalone`
(diset di dalam `Dockerfile`), jadi build Railway tidak berubah.

## Build

```sh
docker build -t coderoach-web \
  --build-arg NEXT_PUBLIC_SERVER_URL=https://coderoach.id \
  --build-arg NEXT_PUBLIC_SITE_NAME=Coderoach \
  --build-arg NEXT_PUBLIC_GA4_ID=... \
  --build-arg NEXT_PUBLIC_META_PIXEL_ID=... \
  --build-arg NEXT_PUBLIC_TURNSTILE_SITE_KEY=... \
  .
```

Semua `NEXT_PUBLIC_*` ditanam ke bundle saat build, jadi masuk sebagai `--build-arg`, bukan env
container. Mengubahnya = build ulang. Build tidak menyentuh database: `PAYLOAD_SECRET` dan
`DATABASE_URI` di baris `RUN` hanyalah pengisi palsu (port 1, tidak ada yang mendengar), dan tidak
ada halaman yang membaca Payload saat build (lihat `opsscore-ops.md`, Deploy).

## Menjalankan

```sh
docker run -d --name coderoach-web -p 127.0.0.1:3000:3000 \
  -e PAYLOAD_SECRET=... \
  -e DATABASE_URI=postgresql://... \
  -e RESEND_API_KEY=... -e RESEND_FROM_EMAIL=... -e RESEND_TO_EMAIL=... \
  -e TURNSTILE_SECRET_KEY=... \
  -v coderoach-media:/app/media \
  coderoach-web
```

| Env | Wajib | Catatan |
| --- | --- | --- |
| `PAYLOAD_SECRET` | ya | Server menolak jalan tanpa ini. Samakan dengan Railway supaya sesi admin dan token reset tetap sah. |
| `DATABASE_URI` | ya | `DATABASE_URL` juga diterima (dibaca bila `DATABASE_URI` kosong). |
| `RESEND_*` | untuk email | Tanpa `RESEND_API_KEY` formulir tetap tersimpan, tapi notifikasi tidak terkirim. |
| `TURNSTILE_SECRET_KEY` | bila site key diisi | Pasangan `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. |
| `PORTFOLIO_LINKCHECK` | tidak | `on` menyalakan cron cek tautan (ADR 0007). |

Daftar lengkap dan mana yang hanya untuk skrip: `.env.example`.

## Media

Koleksi Media tidak memakai plugin storage dan tidak menyetel `staticDir`, jadi Payload menulis ke
`media/` relatif terhadap direktori kerja, yaitu `/app/media` di container (sama dengan volume
Railway). `Dockerfile` menyiapkan direktori itu milik user `node` dan menandainya `VOLUME`.
**Wajib dipasang volume bernama atau bind mount**; tanpa itu upload hilang saat container diganti.
Bind mount dari host harus bisa ditulis uid 1000. Pindah dari Railway: salin isi `/app/media`
volume Railway ke volume ini sebelum DNS dialihkan.

## Health check

`GET /api/health` membaca satu baris dari setiap koleksi dan global; skema yang tertinggal dari
kode menghasilkan 503. `HEALTHCHECK` image memanggilnya lewat `fetch` Node (image slim tanpa curl).
Caddy/Tunnel cukup meneruskan ke `127.0.0.1:3000`.

## Bahaya: push skema otomatis

Skema produksi selama ini diperbarui lewat dev push Payload, bukan migrasi (`opsscore-ops.md`,
Database). Adapter Postgres mendorong skema saat terhubung **bila `NODE_ENV` bukan `production`**,
dan push bisa menghapus kolom atau tabel. Image ini memasang `NODE_ENV=production`; jangan
menimpanya di compose atau `docker run`, dan jangan menjalankan `npm run dev` ke database
produksi kecuali memang sedang mengubah skema dengan sadar.

## Skrip (sync portofolio, seed)

Image hanya berisi server standalone, tanpa `tsx` dan tanpa `scripts/`. Pola Railway
`railway ssh --service web -- "npx tsx scripts/portfolio-sync.ts"` tidak berlaku di container ini:
jalankan skripnya dari checkout repo (laptop atau VPS) dengan `DATABASE_URI` ke database produksi
dan `CODEROACH_OS_URL`/`CODEROACH_OS_TOKEN` (`portfolio-ops.md`). Aset portofolio yang ditulis
sync masuk ke `media/` di mesin tempat skrip jalan, jadi di VPS jalankan dari direktori yang
`media/`-nya adalah volume yang sama.
