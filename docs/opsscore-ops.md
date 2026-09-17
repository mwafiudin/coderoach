# OpsScore — panduan operasional

Brief dan aturan skor: [`opsscore-brief.md`](./opsscore-brief.md). Dokumen ini menjelaskan cara menjalankan fitur setelah rilis.

## Peta file

| Yang diubah | File |
| --- | --- |
| Pertanyaan, opsi, area, opsi gate | `src/lib/opsscore/questions.ts` |
| Bobot, ambang fase, aturan prioritas dan kelas layanan | `src/lib/opsscore/scoring.ts` |
| Semua teks: fase, feedback, tindakan, landing, quiz, gate, report, admin | `src/lib/opsscore/copy.ts` |
| Nama produk, slug, `INSTRUMENT_VERSION` | `src/lib/opsscore/config.ts` |
| Route publik | `src/app/(frontend)/opsscore/` |
| API sesi, gate, CSV | `src/app/(frontend)/api/opsscore/` |
| Admin | `src/components/admin/OpsScoreView.tsx` |
| Koleksi Payload | `src/collections/AssessmentSessions.ts`, `AssessmentLeads.ts` |

Baris copy bertanda `// REVIEW` masih draf dan perlu dibaca manusia. Keputusan yang belum final ditandai `TODO(decision)` di kode.

## Membaca admin

Buka `/admin/opsscore` (login Payload biasa). Link-nya ada di navigasi admin, grup **OpsScore**.

**Kotak funnel (7 dan 30 hari terakhir)**

| Angka | Arti | Kill criteria di brief |
| --- | --- | --- |
| Mulai | Sesi yang dibuat (klik Mulai di quiz) dalam jendela waktu | — |
| Selesai | Dari sesi tersebut, yang sampai hasil ringkas | — |
| Isi gate | Dari sesi tersebut, yang mengisi nomor WA | — |
| Completion rate | Selesai ÷ Mulai | < 25% → potong pertanyaan |
| Gate conversion | Isi gate ÷ Selesai | < 30% → geser gate atau ubah copy |

Angka dihitung per kohort: semua sesi yang **mulai** dalam 7 atau 30 hari terakhir, lalu berapa di antaranya yang selesai dan mengisi gate. Karena itu rate tidak pernah lebih dari 100%, dan sesi yang baru mulai hari ini bisa saja belum selesai.

**Tabel lead**

- Filter: omset ≥ 50 jt, fase, dan status follow-up. Urutan terbaru dulu.
- Kolom WA langsung membuka `wa.me`. Status follow-up tersimpan begitu dropdown diganti.
- **Buka** menampilkan detail sesi: kontak, UTM, waktu mulai/selesai/gate, skor per area, prioritas beserta tindakannya, dan semua jawaban mentah. Baca ini sebelum menghubungi.
- **Ekspor CSV** mengunduh lead sesuai filter yang aktif. File memakai UTF-8 dengan BOM, jadi bisa langsung dibuka di Google Sheets atau diimpor ke Notion.

Brief yang dikirim dari tombol CTA report masuk ke **Inbox → Submissions** seperti biasa. Field `assessmentSession` di sidebar menunjuk ke sesinya.

## Mengubah bobot atau ambang

1. Ubah konstanta di `src/lib/opsscore/scoring.ts`.
2. Naikkan `INSTRUMENT_VERSION` di `src/lib/opsscore/config.ts` (1 → 2).
3. Jalankan `npm test`. Test lima profil sintetis akan gagal kalau hasilnya berubah; perbarui angka di test dengan sadar, jangan sekadar disamakan.
4. Catat perubahan dan alasannya di `docs/opsscore-brief.md`.

Apa yang terjadi setelah versi naik:

- Sesi lama tetap menyimpan `scores` dan `instrumentVersion` saat itu. Report lama tidak berubah.
- Progres quiz yang tersimpan di browser memakai kunci per versi, jadi pengunjung dengan progres versi lama mulai dari awal.
- Jawaban mentah (`answers`) selalu tersimpan. Kalau perlu menghitung ulang sesi lama dengan aturan baru, pakai `scoreAnswers()` di skrip terpisah dan simpan hasilnya di tempat lain, jangan menimpa `scores` historis.

## Menambah atau mengubah pertanyaan

1. Tambahkan pertanyaan di `QUESTIONS` (`questions.ts`), di dalam blok area yang benar. Urutan di array = urutan di quiz.
2. Untuk `single`, tulis opsi dari skor 0 ke skor tertinggi. Jumlah opsi menentukan skor maksimum.
3. `id` pertanyaan dan `id` opsi yang sudah dipakai jangan diganti. Itu yang tersimpan di `answers`, dan admin memakainya untuk menampilkan label.
4. Pertanyaan berskor wajib punya kalimat tindakan di `ACTIONS` (`copy.ts`); test akan gagal kalau belum.
5. Naikkan `INSTRUMENT_VERSION`, perbarui test jumlah pertanyaan di `scoring.test.ts`, lalu jalankan `npm test`.
6. Cek layar pertanyaan baru di ukuran 360×640 tanpa scroll.

Mengganti teks pertanyaan atau label opsi tanpa mengubah urutan dan jumlahnya tidak mengubah skor, jadi tidak perlu naik versi.

## Gambar share (OG)

Empat gambar statis ada di `public/assets/opsscore/og-fase-{1..4}.png`. Setelah mengubah `PHASE_COPY`, render ulang:

```bash
npm run opsscore:og
```

Butuh Google Chrome. Kalau Chrome tidak di lokasi default macOS, set `CHROME_PATH`.

## Tracking

Isi di environment (Vercel dan `.env.local`):

```
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
```

Tanpa ID, script tidak dimuat dan semua event diam-diam dilewati. Di mode dev setiap event juga tercetak di console (`[opsscore] track …`).

| Event | Kapan | Parameter |
| --- | --- | --- |
| `assessment_view` | Landing dimuat | utm_source, utm_medium, utm_campaign |
| `assessment_start` | Klik Mulai di quiz | session_id |
| `assessment_area_done` | Setiap area selesai | area, index |
| `assessment_complete` | Hasil ringkas tampil (sekali per sesi) | fase, total |
| `assessment_gate_submit` | Gate terkirim — di Meta dikirim sebagai `Lead` | fase, revenue_band |
| `assessment_pdf` | Klik Simpan PDF | fase |
| `assessment_cta_brief` | Klik CTA brief | fase, kelas |

Cara memeriksa setelah deploy:

- **GA4**: Admin → DebugView, dengan ekstensi Google Analytics Debugger aktif atau parameter `debug_mode`.
- **Meta**: Events Manager → Test Events, masukkan URL situs.

UTM (`utm_*`, `fbclid`, `gclid`) dan referrer eksternal disimpan di cookie `opsscore_attr` selama 30 hari saat landing atau quiz dibuka, lalu disalin ke `assessment_sessions.utm` ketika sesi dibuat. Tombol CTA di halaman share menambahkan `utm_source=opsscore_share`.

## Database

- Skema DB production saat ini diperbarui lewat dev push Payload (menjalankan `npm run dev` dengan `DATABASE_URI` production). Migrasi di `src/migrations/` untuk fork template yang memakai `npm run migrate`.
- Menghapus sesi di admin (**OpsScore → Assessment sessions**) ikut menghapus lead-nya.

## Sebelum rilis

- [ ] Hapus sesi dan lead uji dari DB.
- [ ] Baca semua baris `// REVIEW` di `copy.ts`, termasuk 22 kalimat tindakan.
- [ ] Putuskan setiap `TODO(decision)` (lihat `rg "TODO\(decision\)" src`).
- [ ] Isi `NEXT_PUBLIC_GA4_ID` dan `NEXT_PUBLIC_META_PIXEL_ID` di Vercel, lalu cek event di DebugView dan Test Events.
- [ ] Uji di Safari iOS dan Chrome Android, termasuk "Simpan sebagai PDF" dan "Bagikan → Cetak".
- [ ] Putuskan tautan ke `/opsscore` di navigasi atau footer.
