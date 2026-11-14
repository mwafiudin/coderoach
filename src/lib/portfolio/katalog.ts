/**
 * The feature catalogue at the bottom of each project page: three to five groups by role or job,
 * each with one real screen and the rest of that group's features behind a disclosure, then where
 * the same pattern fits another business, and the page's own call to action.
 *
 * Kept out of Payload on purpose, like the RideDeck files (ridedeck.ts): the screens live in
 * public/assets/katalog and belong to these pages only, so changing the catalogue needs no schema
 * push. Copy still lives in a data file, never inside a page component (ADR 0013).
 *
 * Every claim here has a source in the app's own repo or a measured metric on the page. Screens come
 * from demo databases or fixtures only; tools and specs in _referensi/portofolio/_alat/katalog.
 */
export const KATALOG_DIR = '/assets/katalog';

export interface CatalogShot {
  file: string;
  alt: string;
  width: number;
  height: number;
  /** Phone screens get the phone frame; everything else the browser frame (16:10). */
  frame: 'phone' | 'browser';
}

export interface CatalogItem {
  name: string;
  body: string;
}

export interface CatalogGroup {
  /** Who or where, e.g. "Di outlet". Short, shown as a mono label. */
  role: string;
  /** The outcome, as a sentence. */
  title: string;
  body: string;
  shot: CatalogShot;
  /** The rest of this group's features, behind "fitur lain". */
  more: CatalogItem[];
}

export interface Catalog {
  heading: string;
  groups: CatalogGroup[];
  /** Where the same pattern fits another kind of business. */
  fitsFor: Array<{ field: string; example: string }>;
  cta: { eyebrow: string; heading: string };
}

export const KATALOG: Partial<Record<string, Catalog>> = {
  laporta: {
    heading: 'Setiap orang mengisi bagiannya, pemilik melihat semuanya.',
    groups: [
      {
        role: 'Di outlet',
        title: 'Tutup shift selesai dari HP crew.',
        body: 'Absen, penjualan per kanal, opname, kas kecil, dan waste ada dalam satu daftar. Shift yang belum lengkap langsung kelihatan, sebelum kasnya diserahkan.',
        shot: { file: 'laporta-crew.v1.webp', alt: 'Dashboard crew Laporta di ponsel berisi daftar tutup shift, dengan data contoh', width: 780, height: 1688, frame: 'phone' },
        more: [
          { name: 'Absen tetap jalan tanpa sinyal', body: 'Swafoto dan lokasi tersimpan di HP, lalu terkirim begitu sinyal kembali. Absen pulang yang terlupa tidak ikut dihitung jam kerja.' },
          { name: 'Gas dan produksi dapur', body: 'Pemakaian gas per tabung dibandingkan dengan normalnya, jadi tabung yang diganti tanpa dicatat ketahuan.' },
          { name: 'Opname yang menangkap salah ketik', body: 'Angka pemakaian yang janggal ditandai sebelum dikirim, tanpa menghalangi crew.' },
        ],
      },
      {
        role: 'Kas dan bank',
        title: 'Uang laci punya pemegang di setiap jam.',
        body: 'Kas pindah dari shift ke shift secara berurutan, selisihnya dihitung saat serah terima, lalu setoran dicocokkan dengan mutasi bank.',
        shot: { file: 'laporta-serah-terima.v1.webp', alt: 'Halaman serah terima shift Laporta: status per cabang, amplop menunggu, uang masuk bank, dan selisih bulan, dengan data contoh', width: 1187, height: 742, frame: 'browser' },
        more: [
          { name: 'Bukti transfer dibaca otomatis', body: 'Nominal dan tanggal diambil dari foto slip, lalu dicocokkan dengan amplop setoran. Foto yang bukan slip ditolak. Dalam uji, 14 dari 14 slip terbaca benar.' },
          { name: 'Koreksi yang tetap tercatat', body: 'Revisi setoran, kas kecil, atau waste ikut membetulkan jurnalnya, dan jejak perubahannya tertulis dalam kalimat biasa.' },
          { name: 'Persetujuan dalam satu antrean', body: 'Pengajuan yang butuh izin menunggu di satu daftar, lengkap dengan siapa yang mengajukannya.' },
        ],
      },
      {
        role: 'Akuntansi',
        title: 'Laporan keuangan terisi dari kerja harian.',
        body: 'Setiap transaksi outlet langsung tercatat di pembukuan, jadi laba rugi, arus kas, dan neraca keluar dari satu buku yang sama.',
        shot: { file: 'laporta-laba-rugi.v1.webp', alt: 'Laporan laba rugi Laporta per outlet, dengan data contoh', width: 1187, height: 742, frame: 'browser' },
        more: [
          { name: 'Tutup buku bersyarat', body: 'Setiap syarat menunjukkan angkanya dan tempat membetulkannya. Data yang belum masuk tidak pernah tampil beres.' },
          { name: 'Ekspor ke software akuntansi', body: 'Satu berkas per outlet sesuai templat impor, dan ekspor berikutnya hanya berisi baris baru.' },
          { name: 'Selisih stok terhadap resep', body: 'Kebutuhan bahan dihitung dari resep dikali penjualan, lalu dibandingkan dengan pemakaian nyata dan diurutkan menurut nilai rupiahnya.' },
        ],
      },
      {
        role: 'Pemilik dan investor',
        title: 'Pagi hari, outlet yang tertinggal sudah terlihat.',
        body: 'Kontrol harian menunjukkan outlet yang belum menuntaskan tugasnya, kas yang belum cocok, dan omset hari itu, sebelum masalahnya menumpuk sampai akhir bulan.',
        shot: { file: 'laporta-kontrol.v1.webp', alt: 'Kontrol harian Laporta: status absensi, produksi, kebersihan, penjualan, opname, serah terima, dan setoran per cabang, dengan data contoh', width: 1187, height: 742, frame: 'browser' },
        more: [
          { name: 'Bagi hasil investor berbukti', body: 'Hak investor baru final setelah periode ditutup, setiap transfer membawa bukti, dan investor membukanya sendiri dari HP.' },
          { name: 'Ringkasan harian siap dikirim', body: 'Ringkasan hari itu tersusun sebagai teks yang tinggal ditempel ke WhatsApp.' },
          { name: 'Order ke gudang pusat', body: 'Permintaan barang dari outlet berjalan lewat lima tahap sampai diterima, tanpa pesan yang tercecer.' },
        ],
      },
    ],
    fitsFor: [
      { field: 'Rantai kafe dan restoran', example: 'Tutup shift, kas, dan stok per cabang yang langsung masuk pembukuan.' },
      { field: 'Ritel dan minimarket', example: 'Setoran harian setiap toko dicocokkan dengan mutasi bank.' },
      { field: 'Apotek dan klinik', example: 'Kas per kasir dan stok obat yang dicek terhadap pemakaian.' },
      { field: 'Bengkel dan jasa servis', example: 'Kas per shift, stok suku cadang, dan laporan per cabang untuk pemilik.' },
    ],
    cta: { eyebrow: 'Punya beberapa cabang?', heading: 'Ceritakan cara tim Anda menutup hari.' },
  },
  'yiheecam': {
    heading: 'Kamera lama yang ditinggal vendornya kembali dikendalikan dari HP.', // bukti: README.md baris 3 (pengganti YI Action untuk YI 4K rilis 2016); projects.ts summary.problem (aplikasi resmi ditarik, ditolak Android 15)
    groups: [
      {
        role: 'Di stang motor',
        title: 'Rekam dan cek kamera tanpa menyentuhnya.', // bukti: PRODUCT.md "Sukses berarti pemilik tidak perlu menyentuh action cam selama perjalanan"
        body: 'Status rekam, sisa kartu, dan baterai tampil sebagai papan angka besar yang terbaca sekali lirik. Tombol utamanya besar, aman ditekan dengan sarung tangan.', // bukti: DESIGN.md "Creative North Star" dan komponen flap-button tinggi 72dp; PRODUCT.md prinsip 1 dan 3
        shot: { file: 'yiheecam-live.v1.webp', alt: 'Layar Live YiheeCam saat merekam, dengan gambar kamera ilustrasi dan data contoh: sisa waktu kartu 01:22:59, mode 1080 50P, baterai 81 persen, suhu HP, tombol STOP dan TANDAI', width: 780, height: 1688, frame: 'phone' },
        more: [
          { name: 'Jeda live sekitar 0,4 detik', body: 'Diukur 10 menit di kamera asli, gambar di HP tertinggal sekitar 0,4 detik dan jedanya tidak makin panjang.' }, // bukti: docs/decisions/0011-live-player-rtsp-client.md tabel (rtsp-client 10 menit median 386 ms p90 436, tren -0,4 ms/menit; 30 sampel median 387 ms)
          { name: 'Video atau foto sekali ketuk', body: 'Saklar mode selalu terlihat di layar Live, karena lupa pindah mode berarti momen hilang.' }, // bukti: DESIGN.md "Saklar mode (Live, baris teratas keping aksi)"
          { name: 'Berhenti rekam butuh dua ketukan', body: 'Ketukan pertama hanya memunculkan tulisan YAKIN? di tombol, jadi rekaman tidak terhenti karena tersenggol.' }, // bukti: src/lib/portfolio/projects.ts fitur "Aman dengan sarung tangan" (yiheecam-yakin.v1.webp)
          { name: 'Tampil di dasbor RideDeck', body: 'Status kamera dan tombol rekam muncul di dasbor stang, dan gambar live bisa diintip di jendela kecil.' }, // bukti: docs/decisions/0016-deck-api-for-ridedeck.md (DeckLink, DeckReceiver, PeekActivity PiP); status ADR: belum diverifikasi di HP pemilik bersama rideDeck (dari baca kode)
        ],
      },
      {
        role: 'HP di saku',
        title: 'Momen tertandai dan kamera tetap terjaga.', // bukti: docs/decisions/0009-highlight-markers-media-session.md; 0012-location-for-last-seen-point.md
        body: 'Tombol earphone atau knob helm menandai momen tanpa mengeluarkan HP. Kalau sambungan putus selagi motor melaju, alarm berbunyi dan titik terakhir kamera tersimpan dari GPS HP.', // bukti: ADR 0009 (tombol earphone lewat MediaSession), ADR 0015 (knob helm, diverifikasi dengan MAXTO M6s), ADR 0012 + pembaruan 2026-10-17 (bunyi hanya bila HP terus bergerak >=10 km/jam atau >150 m dari titik putus; titik terakhir disimpan di HP, diverifikasi 2026-10-16)
        shot: { file: 'yiheecam-saku.v1.webp', alt: 'Layar Live YiheeCam bertema gelap saat siaga, dengan gambar kamera ilustrasi dan data contoh: pilihan knob MOMEN atau MUSIK, suara intercom, tombol RECORD, TANDAI, dan SELESAI RIDING', width: 780, height: 1688, frame: 'phone' },
        more: [
          { name: 'Meter panas-dingin untuk mencari', body: 'Sinyal WiFi kamera diterjemahkan jadi DINGIN, HANGAT, atau PANAS, jadi kamera yang jatuh di pinggir jalan bisa didekati.' }, // bukti: app/src/main/kotlin/io/github/farrez30/yiheecam/session/CameraFinder.kt (enum Warmth, ProximityMeter); README.md fase 6
          { name: 'Alarm yang tahu kamera dimatikan', body: 'Kamera yang sengaja dimatikan saat berhenti tidak membuat alarm berbunyi. Alarm baru menyala bila HP terus bergerak menjauh.' }, // bukti: ADR 0012 "Update 2026-10-17" (tunggu 20 detik dengan pilihan "Saya matikan", bunyi hanya bila HP >=10 km/jam atau >150 m dari titik putus)
          { name: 'Peringatan baterai terdengar di helm', body: 'Peringatan bersuara di 20, 10, dan 6 persen, lalu rekaman dihentikan sendiri sebelum kamera mati.' }, // bukti: session/BatteryGuard.kt (WARN_AT 20, 10, 6; DEFAULT_STOP_AT 6; "notifikasi bersuara yang terdengar di helm")
          { name: 'Obrolan intercom ikut terekam', body: 'Suara dari intercom atau mic USB direkam di HP, lalu dicampur ke video tanpa perlu mengedit.' }, // bukti: docs/decisions/0014-intercom-and-usb-mic-audio.md; ADR 0013 pembaruan 2026-10-20 (berkas mic dan _MIX.mp4 terverifikasi)
        ],
      },
      {
        role: 'Sesudah riding',
        title: 'Isi kartu kamera pindah ke HP tanpa kabel.', // bukti: session/CameraLibrary.kt (galeri kartu kamera lewat WiFi kamera)
        body: 'Rekaman dipilih dari daftar, lalu disalin atau dipindah satu per satu lewat antrean. Berkas di kamera baru dihapus setelah ukurannya cocok di HP.', // bukti: CameraLibrary.kt (transferQueue diproses satu per satu; Transfer.move = berkas di kamera dihapus setelah ukurannya cocok); ADR 0013 pembaruan 2026-10-20 (byte terverifikasi, .part lalu rename)
        shot: { file: 'yiheecam-galeri.v1.webp', alt: 'Galeri YiheeCam berisi empat rekaman dari kartu kamera, dengan gambar kamera ilustrasi dan data contoh, pilihan folder di HP, saringan semua, video, atau foto, dan kotak pencarian', width: 780, height: 1688, frame: 'phone' },
        more: [
          { name: 'Langsung ke folder Google Drive', body: 'Tujuannya bisa folder di kartu HP atau folder Drive, lalu aplikasi Drive mengunggahnya sendiri.' }, // bukti: docs/decisions/0013-phone-storage-and-google-drive.md "Update 2026-10-20 (Drive without a Google Cloud project)", diuji di HP
          { name: 'Kotak pilih untuk sarung tangan', body: 'Rekaman dipilih lewat kotak besar, bukan tekan lama, jadi aman dipakai dengan sarung tangan.' }, // bukti: DESIGN.md "Baris rekaman" (kotak pilih 24dp dalam target 56dp, "Pilih lewat kotak, bukan tekan lama: aman dengan sarung tangan"). Satu-satunya kontras "X, bukan Y" di proyek ini.
          { name: 'Cadangan live view di HP', body: 'Gambar live bisa ikut disimpan di HP sebagai cadangan mutu rendah, kalau kartu kamera penuh atau rusak.' }, // bukti: session/LiveBackup.kt; docs/research/fase-4-feasibility.md baris 107 ("backup kualitas rendah, misalnya kalau SD penuh atau rusak"); README.md fase 6
        ],
      },
      {
        role: 'Setting kamera',
        title: 'Pilihan setting mengikuti laporan kamera sendiri.', // bukti: PRODUCT.md prinsip 2 "Jujur pada kamera"; projects.ts fitur "Terbaca dalam satu lirikan"
        body: 'Setiap pilihan diambil dari daftar yang dilaporkan kamera. Yang tidak didukung di resolusi itu ditulis tidak tersedia, jadi tidak ada setting yang diam-diam diabaikan.', // bukti: layar pengaturan.png "Stabilisasi (EIS) Tidak tersedia di resolusi ini"; ui/settings/SettingChoices.kt; PRODUCT.md "ubah setting kamera dari daftar nilai yang dilaporkan kamera sendiri"
        shot: { file: 'yiheecam-pengaturan.v1.webp', alt: 'Layar Setting YiheeCam bagian Video dengan data contoh: resolusi 1920x1080 50P, kualitas, sudut pandang, stabilisasi yang tidak tersedia di resolusi ini, eksposur, white balance, ISO, dan durasi rekam loop', width: 780, height: 1688, frame: 'phone' },
        more: [
          { name: 'Lokasi tetap di HP', body: 'Aplikasinya hanya bicara dengan kamera, dan titik lokasi terakhir cukup tersimpan di HP. Tidak ada akun, tidak ada data perjalanan yang dikirim keluar.' }, // bukti: docs/research/fase-3-analisis-apk.md (tanggal analisis 2026-10-07, §5 "10 tracker menurut signature MobSF"); app/build.gradle.kts tanpa SDK analitik, app/gradle.lockfile hanya analytics-library milik Lint (androidLintTool, tidak masuk APK); ADR 0012 (titik terakhir disimpan di HP, backup dimatikan). YiheeCam sendiri belum dipindai MobSF.
          { name: 'Hemat daya sekali ketuk', body: 'Satu ketukan menurunkan setting yang boros baterai kamera, dan nilai lamanya dikembalikan saat dimatikan.' }, // bukti: DESIGN.md "Lembar mode: Hemat daya kamera (satu ketuk, nilai lama diingat dan dikembalikan)"
          { name: 'Tema terang dan gelap', body: 'Tema terang tetap terbaca di bawah matahari langsung, tanpa mengubah setelan HP. Tema gelap untuk malam.' }, // bukti: ui/theme/ThemeChoice.kt; DESIGN.md tabel kontras (tinta di panel 14,3:1); projects.ts fitur "Tema terang tetap terbaca di bawah matahari langsung"
        ],
      },
    ],
    fitsFor: [
      { field: 'Pabrik dan workshop', example: 'Mesin yang aplikasi vendornya sudah mati dikendalikan lagi dari tablet operator.' }, // bukti: kemampuan yang sama (protokol dibangun ulang dari aplikasi resmi, projects.ts body "Membaca protokol yang tidak didokumentasikan")
      { field: 'Armada dan logistik', example: 'Kamera dasbor atau GPS kendaraan dibaca langsung, dengan alarm saat alatnya terputus.' }, // bukti: pola ADR 0012 (alarm saat sambungan putus)
      { field: 'Klinik dan laboratorium', example: 'Alat ukur lama yang masih bagus tersambung ke tablet, dan hasilnya tidak keluar dari klinik.' }, // bukti: pola PRODUCT.md prinsip 4 "Hanya bicara dengan kamera"
      { field: 'Toko dan gudang', example: 'CCTV atau timbangan lama tampil di satu aplikasi, dan rekamannya tidak keluar dari toko.' }, // bukti: pola fase-3 §7 (pelacak dan server pihak ketiga dibuang)
    ],
    cta: { eyebrow: 'Punya alat yang aplikasinya sudah mati?', heading: 'Ceritakan alatnya dan apa yang perlu dikendalikan dari HP.' },
  },
  'fifofun': {
    heading: 'Setiap angka bisa dicek ke mutasi bank.', // bukti: README.md "Here the check is your bank statement"; projects.ts summary.solution
    groups: [
      {
        role: 'Dari mutasi bank',
        title: 'Saldo cocok dengan bank sampai ke sen.', // bukti: layar impor "saldonya cocok sampai ke sen terakhir"; README.md "Money is stored as bigint in sen ... exact equality"
        body: 'Setiap e-Statement diperiksa empat lapis sebelum disimpan, dan kesalahan langsung menunjuk transaksinya. Diuji pada 23 e-Statement bulanan berisi 1.591 transaksi, dan semuanya cocok.', // bukti: README.md "four independent reconciliation checks ... points at the exact transaction"; README.md "23 real monthly statements covering 1,591 transactions. All 23 reconcile exactly"
        shot: { file: 'fifofun-impor.v1.webp', alt: 'Halaman Impor e-Statement FiFoFun dengan data contoh: 55 transaksi September masuk dan saldonya cocok sampai ke sen terakhir, di samping penjelasan lapis pemeriksaannya', width: 1200, height: 750, frame: 'browser' },
        more: [
          { name: 'Isi saldo dompet bukan belanja', body: 'Top up ke dompet digital sendiri dicatat sebagai uang pindah. Uang yang masuk lalu keluar lagi hari itu juga tidak dihitung pemasukan.' }, // bukti: README.md "Understands the transactions" (top up e-wallet sendiri, uang numpang lewat). Satu-satunya kontras "X bukan Y" di proyek ini.
          { name: 'Catatan tunai tidak dobel', body: 'Catatan manual yang ternyata muncul lagi di mutasi berikutnya ditawarkan untuk digabung.' }, // bukti: README.md "Records what the bank cannot see ... offered as a merge rather than counted twice"; src/app/catat/duplicates-panel.tsx
          { name: 'Catat tunai lewat Telegram', body: 'Cukup kirim "50rb makan siang" ke bot. Pesan yang tidak terbaca dibalas dengan format yang diharapkan.' }, // bukti: src/lib/telegram/parse.ts (contoh "50rb makan siang"; pesan gagal dijawab dengan format yang diharapkan); src/app/api/telegram/route.ts
          { name: 'Koreksi tanpa mengubah catatan bank', body: 'Satu struk bisa dipecah ke beberapa kategori, sementara nominal, tanggal, dan rekening dari bank tetap terkunci.' }, // bukti: README.md "Lets a decision be revisited" (split; amount, date, accounts of a statement line not editable)
        ],
      },
      {
        role: 'Setiap bulan',
        title: 'Pengeluaran di luar kebiasaan langsung kelihatan.', // bukti: src/lib/ledger/category-trend.ts (usual = bulan tengah jendela; movement melonjak/mereda/biasa)
        body: 'Setiap kategori dibandingkan dengan bulan-bulan biasanya. Tagihan rutin dicek dari mutasi, jadi yang belum dibayar menyebut sudah telat berapa hari.', // bukti: category-trend.ts; src/lib/ledger/bills.ts (overdueDays); README.md "Knows when a bill is late"
        shot: { file: 'fifofun-kategori.v1.webp', alt: 'Ringkasan FiFoFun dengan data contoh: delapan kategori pengeluaran enam bulan terakhir dengan garis kebiasaannya, satu kategori jauh di atas biasanya, lalu tagihan rutin yang semuanya sudah dibayar', width: 1200, height: 750, frame: 'browser' },
        more: [
          { name: 'Anggaran dengan bukti di sampingnya', body: 'Batas tiap kategori ditetapkan di samping nilai tengah bulan-bulan sebelumnya dan angka bulan lalu.' }, // bukti: README.md "Sets the budget it judges you against" (median of the months before, budgeted last month); projects.ts fitur "Anggaran dengan bukti di sampingnya"
          { name: 'Aliran uang dalam satu gambar', body: 'Diagram aliran menunjukkan pemasukan bulan itu terbagi ke pengeluaran, investasi, tagihan, dan sisa.' }, // bukti: layar fifofun-sankey.desktop.png "Aliran uang 2026-09" (Pemasukan ke Pengeluaran, Investasi, Sisa, Tagihan, Tujuan)
          { name: 'Celengan dari dua arah', body: 'Isi tenggatnya, setoran bulanan yang dibutuhkan keluar. Isi setorannya, bulan targetnya tercapai keluar.' }, // bukti: README.md "Savings pots work from either end"
          { name: 'Selisih dompet tetap kelihatan', body: 'Saldo dompet yang meleset dicatat sebagai penyesuaian, jadi uang yang hilang muncul sebagai pengeluaran.' }, // bukti: README.md "the difference is recorded as an adjustment transaction, so the money that went missing shows up as spending"
        ],
      },
      {
        role: 'Peta belanja',
        title: 'Uang belanja terlihat di peta, per toko.', // bukti: README.md "Shows where the money went"; layar fifofun-peta-kelompok.desktop.png
        body: 'Toko ditaruh sekali di peta, lalu setiap pembayaran di sana ikut, termasuk dari impor bulan depan. Warna titik menunjukkan kelompok kategorinya.', // bukti: README.md "a merchant is placed once ... every payment made at its counter follows, including next month's import"; "Each dot takes the colour of its category group"
        shot: { file: 'fifofun-peta.v1.webp', alt: 'Peta belanja FiFoFun di tengah Yogyakarta dengan data contoh: titik dan cahaya per kelompok kategori, dan saringan Makan dan Minum, Belanja, Transport, Hiburan, dan lainnya', width: 1200, height: 750, frame: 'browser' },
        more: [
          { name: 'Uang, kunjungan, atau sekali datang', body: 'Tempat bisa ditimbang menurut total uang, jumlah kunjungan, atau biaya sekali datang, per kategori dan bulan.' }, // bukti: README.md "The map weighs places by money, by visits, or by what one visit costs, filtered by category and month"
          { name: 'Belanja online punya daftar sendiri', body: 'Pesanan online dan transfer tidak dipaksa masuk peta. Daftarnya terpisah, lengkap dengan negara tempat perusahaannya menagih.' }, // bukti: README.md "Online orders, transfers ... counted honestly as having no place ... in which country that company bills from"
          { name: 'Pencarian yang hanya mengirim nama', body: 'Toko dicari lewat OpenStreetMap, dan yang dikirim keluar hanya nama tokonya, jadi riwayat belanja tidak ikut terkirim.' }, // bukti: README.md "The search runs on the server and sends only the merchant's name"
        ],
      },
      {
        role: 'Untuk keluarga',
        title: 'Tiga bulan terakhir siap dibaca dari HP.', // bukti: README.md "Shows three months on one screen ... meant to be read off a phone across a table"
        body: 'Pemasukan, pengeluaran, sisa, dan tabungan tiga bulan tampil berdampingan dengan rata-ratanya. Halaman yang sama bisa dibagikan sebagai PDF satu halaman A4.', // bukti: README.md /ringkasan ("Bagikan sebagai PDF renders the same figures ... one-page A4 file")
        shot: { file: 'fifofun-tiga-bulan.v1.webp', alt: 'Ringkasan 3 Bulan FiFoFun di ponsel dengan data contoh: Juli sampai September 2026, tombol Bagikan sebagai PDF, dan tabel pemasukan per bulan dengan rata-ratanya', width: 780, height: 1688, frame: 'phone' },
        more: [
          { name: 'Satu kode untuk anggota keluarga', body: 'Akun baru hanya bisa dibuat dengan kode undangan dari anggota, dan tiap rumah tangga hanya melihat datanya sendiri.' }, // bukti: src/lib/invites/index.ts ("Registration is closed except to somebody holding a code"); drizzle/0004_invites.sql (expires_at); drizzle/0001_rls_and_constraints.sql; projects.ts body (row level security per rumah tangga)
          { name: 'Rencana dengan jalur ke target', body: 'Grafik menunjukkan kapan target tercapai dengan dan tanpa imbal hasil, dan setoran ikut berubah saat tahunnya digeser.' }, // bukti: layar fifofun-rencana-glidepath.desktop.png ("Jalan ke targetnya, dengan dan tanpa imbal hasil"; "Seret penanda tahunnya ... Setoran bulanannya ikut berubah")
          { name: 'Biaya anak dan pendidikan', body: 'Proyeksi biaya anak memakai inflasi pendidikan Indonesia, dan setiap angka dasarnya menyebut sumber.' }, // bukti: README.md "Plans forward ... cost projections for children and education under Indonesian education inflation"; "every domain constant carries its source"
        ],
      },
    ],
    fitsFor: [
      { field: 'Toko dan UMKM', example: 'Mutasi rekening usaha dicocokkan dengan catatan kasir, dan selisihnya langsung menunjuk transaksinya.' }, // bukti: pola README.md rekonsiliasi berlapis
      { field: 'Koperasi dan arisan', example: 'Setoran anggota dicek ke mutasi bank, dan tiap kelompok hanya melihat datanya sendiri.' }, // bukti: pola invites + row level security
      { field: 'Kos, sekolah, dan jasa langganan', example: 'Tagihan bulanan dicek dari mutasi, dan yang belum bayar menyebut sudah telat berapa hari.' }, // bukti: pola src/lib/ledger/bills.ts
      { field: 'Distributor dan sales lapangan', example: 'Pengeluaran tim dicatat lewat chat dan dipetakan per toko yang dikunjungi.' }, // bukti: pola Telegram quick entry + peta per gerai
    ],
    cta: { eyebrow: 'Masih mencocokkan mutasi dengan tangan?', heading: 'Ceritakan bagaimana kas dan bank Anda dicek setiap bulan.' },
  },
  'ridedeck': {
    heading: 'Semua yang perlu dilirik pemotor ada di satu layar.', // bukti: README.md baris 3 (satu layar untuk navigasi, musik, telepon, app touring); projects.ts tagline
    groups: [
      {
        role: 'Di stang motor',
        title: 'Semua instrumen muat di satu kartu.', // bukti: docs/decisions/0044-cockpit-card-and-game-compass.md (satu instrumen yang muat satu layar HP)
        body: 'Kompas ala game dengan arah matahari dan tujuan, kemiringan motor, kecepatan, tangki, dan cuaca terbaca sekali lirik. Tombol Kembali, Beranda, dan Hujan selalu ada di bawah layar.', // bukti: ADR 0044 (penanda matahari, terbit, terbenam, tujuan; motor 3D ikut lean dan arah); ADR 0022 (tombol Hujan di bar global, selalu terlihat); projects.ts fitur "Selalu bisa kembali ke dasbor"
        shot: { file: 'ridedeck-kokpit.v1.webp', alt: 'Kartu Kokpit RideDeck: pita kompas dengan penanda terbit 05.28 dan terbenam 17.47, motor di dalam indikator kemiringan, pita kecepatan dan ketinggian, tangki, cuaca enam jam, pemutar musik, lalu tombol Kembali, Beranda, Ganti app, dan Hujan', width: 728, height: 1574, frame: 'phone' },
        more: [
          { name: 'Motor di layar ikut miring', body: 'Motor dan pengendara di layar miring mengikuti sensor HP, juga saat perjalanan diputar ulang.' }, // bukti: docs/decisions/0025-ride-simulation.md; README.md "simulasi 3D dan 2D ... terlihat di HP"; projects.ts fitur "Motor dan pengendara dalam simulasi"
          { name: 'Kunci layar saat hujan', body: 'Tetes air tidak bisa menekan apa pun. Layar dibuka dengan menahan tombol 3 detik, tombol volume, atau remote.' }, // bukti: docs/decisions/0022-rain-mode-touch-lock.md (amandemen 2026-10-23: diperiksa di HP, tahan 3 detik dan tombol volume membuka kunci)
          { name: 'Musik dan telepon dari dasbor', body: 'Lagu diganti dari kartu musik, dan panggilan WhatsApp bisa diangkat dengan knob helm.' }, // bukti: README.md langkah 8 (kartu musik); docs/decisions/0031-helmet-knob-for-voip-calls.md; README status "knob helm (WA) terlihat di HP"
          { name: 'Status kamera dan helm', body: 'Kartu kamera menampilkan status rekam, kartu helm menampilkan baterai. Satu ketukan membuka aplikasinya.' }, // bukti: docs/decisions/0019-deck-api-own-apps-and-widgets.md; yiheeCam ADR 0016 (STATUS berisi rekam, baterai, SD); projects.ts fitur "Tidak berebut tombol dengan app lain" dan alt ridedeck-musik.v1.webp "kartu kamera YiheeCam dan baterai helm"
        ],
      },
      {
        role: 'Sebelum berangkat',
        title: 'Peluang hujan terlihat di sepanjang rute.', // bukti: layar rute-cuaca-penuh.png "CUACA SEPANJANG RUTE"
        body: 'Rute dihitung khusus motor dan tanpa tol. Cuaca lalu diperkirakan setiap 15 km, pada jam Anda kira-kira lewat di sana.', // bukti: docs/decisions/0017-valhalla-motorcycle-routing.md (costing motor, rute bertol dibuang); app/.../data/RouteFeed.kt baris 121 samples(everyMeters = 15_000.0); deck/.../Route.kt RouteWeathers.pair (jam prakiraan saat kira-kira dilewati)
        shot: { file: 'ridedeck-rute-cuaca.v1.webp', alt: 'Layar Rute RideDeck dari Tanjung Priok ke Kebun Raya Bogor, 64 km: peta dengan peluang hujan 41 dan 61 persen, tombol Navigasi Maps dan Waze, dan tabel cuaca sepanjang rute dari 4 sampai 61 persen, dengan data contoh', width: 780, height: 1688, frame: 'phone' },
        more: [
          { name: 'Tujuan tanpa mengetik', body: 'Tempat dipilih di Google Maps atau Waze, lalu dibagikan ke RideDeck.' }, // bukti: README.md langkah 9; README status Garasi "Bagikan terbukti di HP"
          { name: 'Peta tetap tampil tanpa sinyal', body: 'Peta rute tersimpan begitu rute dipilih, jadi jalur tanpa sinyal tetap terbaca.' }, // bukti: README.md langkah 10 "Peta rute disimpan otomatis untuk tanpa sinyal"; layar "Menyimpan peta rute…"
          { name: 'Hujan dikonfirmasi di tempat', body: 'Hujan tropis sering lokal. Satu tombol di kartu cuaca mencatat hujan atau kering di posisi motor selama dua jam.' }, // bukti: docs/decisions/0042-rider-rain-check.md (RainCheck HOLD 2 jam)
          { name: 'Google Maps tetap berdampingan', body: 'Maps bernavigasi di jendela kecil, sementara instrumen dasbor tetap terlihat.' }, // bukti: docs/decisions/0011-hybrid-map-pip-and-maplibre.md; README status "PiP Maps terbukti lewat Home"
        ],
      },
      {
        role: 'Biaya perjalanan',
        title: 'Sisa bensin dihitung setiap detik.', // bukti: docs/decisions/0038-real-time-fuel-rate.md (laju per detik dari sampel 1 Hz)
        body: 'Hitungannya ikut tanjakan dan muatan, dan kartu tangki menyebut seberapa yakin perkiraannya. Setiap isi penuh, hitungannya dikoreksi dengan liter yang benar-benar masuk.', // bukti: ADR 0038 (tanjakan dari elevasi, muatan per perjalanan, faktor koreksi dari tangki penuh ke penuh); projects.ts fitur "tangki bensin menyebut seberapa yakin perkiraannya"; layar pb2.png "YAKIN SEDANG"
        shot: { file: 'ridedeck-bensin.v1.webp', alt: 'Dasbor RideDeck tegak dengan kartu tangki: 9,9 liter, 83 persen, 35 km per liter, label YAKIN SEDANG, campuran 77 persen Pertamax RON 92, lalu peta rute, kecepatan, dan suhu, dengan data contoh', width: 780, height: 1688, frame: 'phone' },
        more: [
          { name: 'Campuran bensin tercatat', body: 'Isian dengan jenis bensin berbeda tercatat, dan kartu tangki menunjukkan persentase tiap jenisnya.' }, // bukti: deck/.../FuelTank.kt (class Mix); app/.../ui/fuel/TankParts.kt; README status "Kartu Tangki bensin dengan campuran bensin"
          { name: 'Saldo kartu tol dan parkir', body: 'Kartu e-money cukup ditempel ke HP untuk melihat saldonya. Aplikasinya hanya membaca, dan nomor chip kartu tidak pernah disimpan.' }, // bukti: docs/decisions/0028-nfc-card-reader.md (read-only, CardId = SHA-256 bergaram, UID mentah tidak keluar dari :kue); docs/research/nfc-kartu.md M4 (saldo kartu asli terbaca 24 Okt)
          { name: 'Pembaca kartu yang sudah diaudit', body: 'Pembaca kartu buatan pihak luar diaudit dulu, dan 31 dari 35 temuannya ditambal. Dalam uji 3.000 jawaban kartu acak, aplikasinya tidak sekali pun tertutup.' }, // bukti: docs/research/nfc-kartu.md ringkasan ("35 temuan: 31 ditambal, 4 belum terverifikasi"; "respons acak 3.000 kali tidak pernah membuat crash"); kue/src/test/.../CardReadTest.kt repeat(3_000)
          { name: 'Jadwal servis dari buku manual', body: 'Perawatan berkala dihitung per kilometer dan per hari, mana yang lebih dulu tercapai.' }, // bukti: deck/.../Garage.kt ServiceItem (everyKm dan everyDays, mana yang tercapai lebih dulu); README status Garasi "jadwal perawatan dari manual TVS Ronin"
        ],
      },
      {
        role: 'Susunan dan kendali',
        title: 'Dasbor disusun ulang untuk tiap jenis perjalanan.', // bukti: docs/decisions/0026-layout-profiles.md (profil Utama, Touring, Kerja, Musik, Navigasi)
        body: 'Kartu bisa dipindah, diubah ukurannya, atau disembunyikan, lalu disimpan sebagai profil seperti Harian atau Touring. Susunan untuk HP tegak dan mendatar disimpan terpisah.', // bukti: ADR 0023 (susun kartu), ADR 0026 (kolom portrait dan landscape per profil), ADR 0015 (tata letak landscape); layar susun-kartu-ukuran.png (Mikro, Mini, Kecil, Sedang, Sembunyikan)
        shot: { file: 'ridedeck-profil.v1.webp', alt: 'Layar Profil susunan kartu RideDeck: profil Utama, Touring, Kerja, Musik, dan Harian yang aktif, dengan pratinjau letak cuaca, kartu e-money, peta, belokan, kecepatan, suhu, tangki, dan tujuan', width: 780, height: 1688, frame: 'phone' },
        more: [
          { name: 'Jadi layar utama HP', body: 'RideDeck menggantikan layar beranda HP, dan tombol remote Bluetooth di stang bisa dipasang ke Kembali, Beranda, atau Ganti app.' }, // bukti: README.md langkah 2 dan 5; projects.ts summary.solution. Uji dengan remote fisik belum dilakukan (docs/research/fase-0-hasil.md "[U] Uji 9 remote: pemilik belum punya remote")
          { name: 'Riwayat dan putar ulang', body: 'Perjalanan terekam sendiri setiap detik, lalu bisa diputar ulang dalam 2D atau 3D.' }, // bukti: docs/decisions/0020-per-second-ride-samples.md, 0034-ride-start-and-end-from-position.md, 0025-ride-simulation.md; README "Putar 16x ... terlihat di HP"
          { name: 'Aplikasi bank tetap bisa dipakai', body: 'Aplikasi bank sering menolak jalan saat ada aplikasi lain yang punya akses ke layar. Satu ketukan menepikan RideDeck, lalu membuka aplikasi banknya.' }, // bukti: docs/decisions/0027-bank-mode.md (diverifikasi di HP 2026-10-24); ADR 0030, 0045
          { name: 'Keputusan besar tercatat', body: 'Setiap pilihan penting ditulis bersama alasannya, sejauh ini 48 catatan, jadi tim mana pun bisa melanjutkannya tanpa menebak.' }, // bukti: docs/decisions/ berisi 48 berkas (0001 sampai 0048), dihitung 2026-11-15 di HEAD 75a1eaa
        ],
      },
    ],
    fitsFor: [
      { field: 'Kurir dan armada antar', example: 'Satu layar di stang untuk rute, perkiraan tiba, dan bensin, aman ditekan dengan sarung tangan.' }, // bukti: pola ADR 0017, 0038; projects.ts summary.problem (sarung tangan)
      { field: 'Kantin dan parkir', example: 'Saldo kartu e-money terbaca cukup dengan ditempel ke HP, tanpa mesin tambahan.' }, // bukti: pola ADR 0028
      { field: 'Rental motor dan bengkel', example: 'Jadwal servis per motor dari buku manual, lengkap dengan catatan bensin dan kilometer.' }, // bukti: pola Garage.kt, ADR 0013
      { field: 'Tim lapangan dan survei', example: 'Peluang hujan per bagian rute kunjungan, pada jam tim kira-kira lewat.' }, // bukti: pola RouteFeed.kt, Route.kt RouteWeathers
    ],
    cta: { eyebrow: 'Tim Anda bekerja di jalan?', heading: 'Ceritakan apa yang perlu mereka lihat sekilas.' },
  },
  'akarkita': {
    heading: 'Kerabat menemukan tempatnya, data keluarga tetap di dalam keluarga.', // bukti: PRODUCT.md "Product Purpose" (menemukan dirinya di pohon) dan "Privat lewat arsitektur, bukan janji"
    groups: [
      {
        role: 'Untuk kerabat',
        title: 'Pilih satu nama, semua sebutan ikut menyesuaikan.', // bukti: README.md Fitur "Kalkulator kekerabatan: pilih fokus, semua label dihitung relatif dia"
        body: 'Uwa, Mamak, Bako, atau Buyut muncul di atas setiap orang, dihitung dari orang yang sedang Anda buka. Sebutannya mengikuti adat Sunda, Minang, atau sebutan umum.', // bukti: seed-data/terms.sunda.ts, seed-data/terms.minang.ts:80 (Bako); app/(app)/pohon/PohonClient.tsx:140-156 (lensa "umum" atau budaya orang yang difokus)
        shot: { file: 'akarkita-sebutan.v1.webp', alt: 'Pohon AkarKita di ponsel dengan sebutan Sunda di atas setiap orang: Aki, Nini, Bapa, dan Anak, dengan data contoh', width: 780, height: 1688, frame: 'phone' }, // bukti: sampul-v5/akarkita/pohon-ponsel-gelap-istilah-sunda.png (renderer drawScene aplikasi, lensa Sunda, keluarga fiktif)
        more: [
          { name: 'Pohon nyaman di HP', body: 'Pohon bisa digeser dan diperbesar dengan jari. Saat diperkecil, orang per orang berubah jadi kelompok keluarga.' }, // bukti: README.md "Pohon interaktif di canvas: pan/zoom/pinch ... semantic zoom"; lib/lod.ts:3-9 (L0 cluster berlabel)
          { name: 'Tetap terbuka tanpa sinyal', body: 'Aplikasinya bisa dipasang di HP, dan pohon tetap terbuka saat offline.' }, // bukti: README.md "PWA: installable di HP, pohon tetap terbuka saat offline"; app/sw.ts
          { name: 'Pengingat ulang tahun pagi', body: 'Notifikasi datang sekitar pukul 06.00 WIB, hanya pada hari yang ada ulang tahunnya. Isinya mengikuti hak lihat penerimanya.' }, // bukti: README.md "Pengingat ulang tahun"; app/(app)/pengaturan/PushToggle.tsx:222; lib/pengingat.ts
          { name: 'Statistik dan peta rantau', body: 'Pendidikan, pekerjaan, dan usia keluarga terangkum per generasi. Peta 38 provinsi bisa ditukar antara tempat lahir dan domisili, jadi jalur rantau langsung terbaca.' }, // bukti: README.md "Statistik keluarga"; lib/geo/indonesiaPaths.ts:4 (38 provinsi). Layar /statistik tidak dipotret (README sampul-v5)
        ],
      },
      {
        role: 'Untuk pengurus',
        title: 'Kerabat mengusulkan, pengurus yang memutuskan.', // bukti: lib/usulan.ts:1-13; PRODUCT.md "Penjaga ... memutuskan usulan"
        body: 'Perubahan dari kerabat masuk sebagai usulan per kolom. Pengurus bisa menerima sebagian, menolak, atau menyimpannya sebagai versi lain.', // bukti: lib/usulan.ts:37 KeputusanKolom terima|tolak|versi-lain, :193 ringkasStatus "sebagian", :201 kolomVersiLain; app/(app)/usulan/KartuUsulan.tsx:45-49
        shot: { file: 'akarkita-silsilah.v1.webp', alt: 'Pohon AkarKita lima generasi di layar lebar, dari buyut sampai anak, dengan sebutan Sunda dan keluarga besan yang tersambung, dengan data contoh', width: 1440, height: 900, frame: 'browser' }, // bukti: sampul-v5/akarkita/pohon-meja-gelap-istilah-sunda.png, crop [0, 104, 2480]
        more: [
          { name: 'Usulan lama tidak menimpa', body: 'Kalau data sudah berubah sejak diusulkan, usulannya tidak diterapkan diam-diam. Pengurus diminta memutuskan lagi.' }, // bukti: lib/usulan.ts:15-22 "Kolom basi ... TIDAK PERNAH diterapkan diam-diam", :180 hasil.basi
          { name: 'Adat tersimpan sebagai aturan', body: 'Suku Minang otomatis turun dari ibu kandung. Pernikahan sesuku diberi peringatan, tapi tetap bisa dicatat.' }, // bukti: README.md "Aturan adat sebagai data"; db/migrations/0005_suku_ikut_ibu_kandung.sql:2; lib/kinship/exogamy.ts:1-5 "pencatatan tetap boleh jalan"
          { name: 'Poster silsilah siap cetak', body: 'Pohon bisa dicetak sampai 300 dpi untuk acara keluarga. Daftar nama per generasi ikut tercetak, jadi tetap terbaca walau pohonnya rapat.' }, // bukti: README.md "Poster silsilah (/poster): PNG resolusi cetak sampai 300 dpi plus daftar nama per generasi"; lib/poster.ts:105; PRODUCT.md "menyiapkan poster untuk acara keluarga"
          { name: 'Data keluarga tidak terkunci', body: 'Silsilah bisa diekspor dalam format GEDCOM untuk program silsilah lain. Cadangan lengkapnya bisa dipakai untuk memulihkan.' }, // bukti: README.md "Ekspor & backup (admin): GEDCOM 5.5.1 ... JSON untuk memulihkan"; lib/gedcom/write.ts:2; app/api/export/backup, app/api/export/gedcom
        ],
      },
      {
        role: 'Privasi keluarga',
        title: 'Hanya kerabat yang diundang bisa masuk.', // bukti: PRODUCT.md "Akses hanya lewat undangan, tanpa pendaftaran umum"; app/(app)/pengaturan/page.tsx:151 "Hanya email di daftar ini yang bisa masuk"
        body: 'Pengurus mengundang lewat email dan memberi peran: melihat, mengubah, atau mengelola. Tanggal lahir, domisili, sampai nomor HP masing-masing punya batas siapa yang boleh melihat.', // bukti: app/(app)/pengaturan/page.tsx:144-155 (viewer, editor, admin); lib/kolomOrang.ts:93-162 (KELOMPOK tanggal, domisili, kontak, ...); lib/privasi.ts:1-30
        shot: { file: 'akarkita-undangan.v1.webp', alt: 'Halaman depan AkarKita dengan ajakan minta undangan dan pohon keluarga di bingkai ponsel, dengan data contoh', width: 1440, height: 900, frame: 'browser' }, // bukti: sampul-v5/akarkita/landing-hero.png, crop [374, 418, 1872]; email kontak pemilik di seksi bawah landing tidak ikut terpotong
        more: [
          { name: 'Almarhum tetap terlindungi', body: 'Sebagian data almarhum terbuka jadi arsip keluarga. Domisili dan nomor HP-nya tetap tertutup, karena biasanya masih dipakai keluarga yang ditinggalkan.' }, // bukti: lib/kolomOrang.ts:69-77 bukaSaatWafat, :116-121 domisili false, :141-146 kontak false
          { name: 'Tiga cara masuk', body: 'Masuk lewat Google, tautan di email, atau sandi dengan username maupun nomor HP. Lima kali salah sandi, jalur sandi terkunci 15 menit.' }, // bukti: lib/auth.server.ts:39-90 (Google, Nodemailer, Credentials "Username atau nomor HP"); lib/auth/sandi.server.ts:24-27 BATAS_GAGAL 5, LAMA_KUNCI_MENIT 15
          { name: 'Catatan pengurus tetap internal', body: 'Catatan pengurus tentang seseorang hanya terlihat admin. Catatan ini tidak ikut terbuka, walau orangnya sudah wafat.' }, // bukti: lib/kolomOrang.ts:78-86 internal, :153-162 catatan bawaan admin, bukaSaatWafat false; lib/privasi.ts:20-21
        ],
      },
      {
        role: 'Musyawarah warisan',
        title: 'Bagian setiap ahli waris dihitung dalam pecahan, tanpa pembulatan.', // bukti: lib/faraid/fraction.ts:1-8 (pecahan eksak bigint, float hanya di tampilan); PRODUCT.md "Engine fikih Sunni Syafi'i dengan pecahan eksak"
        body: 'Simulator publiknya menghitung di perangkat Anda, tanpa mengirim angka ke mana pun. Hasilnya bahan musyawarah keluarga, bukan fatwa.', // bukti: README.md "publik di /warisan (hitung 100% di perangkat) ... Edukatif, bukan fatwa"; layar warisan-hasil-meja.png "tidak pernah meninggalkan perangkatmu". Satu-satunya kontras "X, bukan Y" di proyek ini
        shot: { file: 'akarkita-warisan.v1.webp', alt: 'Hasil simulator warisan AkarKita: istri 1/8, ibu 1/6, dan dua anak laki-laki 17/30, masing-masing dengan rupiah dan ayatnya, dengan data contoh', width: 1440, height: 900, frame: 'browser' }, // bukti: sampul-v5/akarkita/warisan-hasil-meja-bagian.png, crop [639, 65, 1601]; keluarga simulator fiktif (README sampul-v5)
        more: [
          { name: 'Langkah hitung bisa dibuka', body: 'Setiap bagian membawa alasan dan ayatnya, dan langkah perhitungannya bisa dibuka.' }, // bukti: layar warisan-hasil-meja-bagian.png (QS An-Nisa 11 dan 12, "Langkah perhitungan"); lib/faraid/explain.ts; app/(marketing)/warisan/Simulator.tsx:364
          { name: 'Pusaka tinggi dipisahkan', body: 'Harta pusaka tinggi Minang tidak ikut dibagi seperti harta pencaharian, dan alasannya tertulis di layar.' }, // bukti: app/(app)/pusaka/PusakaClient.tsx:804-815 "Pusaka tinggi ... dikeluarkan dari perhitungan"; README.md
          { name: 'Langsung dari data pohon', body: 'Di dalam aplikasi, ahli waris diambil dari pohon keluarga, jadi tidak perlu diketik ulang.' }, // bukti: README.md "dari data pohon nyata di /pusaka"; lib/heirs.ts:2
          { name: 'Ringkasan siap dibagikan', body: 'Hasilnya bisa disalin sebagai ringkasan untuk dibahas bersama keluarga.' }, // bukti: tombol "Salin ringkasan" di warisan-hasil-meja-bagian.png; app/(marketing)/warisan/Simulator.tsx
        ],
      },
    ],
    fitsFor: [
      { field: 'Organisasi dan paguyuban', example: 'Data anggota yang hanya dibuka lewat undangan, dengan usulan perubahan yang disetujui pengurus.' }, // bukti: pola undangan + lib/usulan.ts (kemampuan, bukan proyek)
      { field: 'HR dan data karyawan', example: 'Karyawan mengusulkan perubahan datanya, HR memutuskan per kolom, dan nomor pribadi hanya terlihat oleh yang berhak.' }, // bukti: pola lib/usulan.ts + lib/privasi.ts
      { field: 'Jaringan agen dan reseller', example: 'Struktur jaringan agen tampil sebagai pohon yang berubah jadi kelompok saat diperkecil.' }, // bukti: pola renderer pohon + lib/lod.ts
      { field: 'Perencana keuangan syariah', example: 'Simulasi pembagian waris untuk bahan diskusi klien, dihitung di perangkat tanpa data terkirim.' }, // bukti: pola lib/faraid (murni, jalan di browser)
    ],
    cta: { eyebrow: 'Data orang tersebar di banyak grup?', heading: 'Ceritakan siapa saja yang boleh melihat apa.' },
  },
  'jeda': {
    heading: 'Klien mencatat kapan saja, psikolog membaca yang sudah rapi.', // bukti: README.md "the client fills them in between sessions and shares a read-only link with their psychologist"; projects.ts summary jeda
    groups: [
      {
        role: 'Untuk klien',
        title: 'Catatan tersimpan dalam hitungan detik, ada sinyal atau tidak.', // bukti: README.md Tests "Quick capture: three taps, measured at about 3.5 s"; README.md "Both work with no network"
        body: 'Cukup isi situasi dan pikiran untuk menyimpan, sisanya bisa dilengkapi nanti. Catatan masuk ke HP dulu, lalu terkirim sendiri begitu online.', // bukti: README.md "Quick capture: only quickCapture columns are needed to save ... belum lengkap", "entries are written to IndexedDB first and synced when online"; src/lib/entry-status.ts; src/lib/sync.ts
        shot: { file: 'jeda-catat.v1.webp', alt: 'Lembar catatan baru Jeda di ponsel: situasi dan pikiran sudah terisi, tombol Simpan di bawah, dengan data contoh', width: 780, height: 1688, frame: 'phone' }, // bukti: sampul-v5/jeda/catat-cepat-ponsel.png (teks diketik skrip rekam-jeda-v5)
        more: [
          { name: 'Draf tidak hilang', body: 'Isian yang belum disimpan tetap ada walau aplikasi ditutup paksa.' }, // bukti: README.md Tests "Draft recovery: a draft survives the app being killed"; src/lib/db.ts:48 drafts
          { name: 'Pengingat di jam pilihan', body: 'Pengingat harian mati sampai klien menyalakannya, lalu datang di jam yang ia pilih.' }, // bukti: README.md "Daily reminder: optional and off by default"; prisma/schema.prisma:31-32 reminderTime null = OFF; src/lib/reminder.ts
          { name: 'Kunci PIN aplikasi', body: 'Aplikasi bisa dikunci PIN saat dibuka lagi setelah ditinggal. PIN-nya hanya tersimpan di HP.' }, // bukti: README.md "App lock: an optional PIN, off by default ... The PIN stays on the device"; src/lib/app-lock.ts
          { name: 'Beberapa tugas sekaligus', body: 'Dua tugas yang jalan bersamaan tampil sebagai tab, dan masing-masing menyimpan drafnya sendiri.' }, // bukti: README.md "Several homeworks at once"
        ],
      },
      {
        role: 'Melengkapi catatan',
        title: 'Perasaan punya nama, dan setiap nama punya arti.', // bukti: src/lib/emotions.ts:1-3 "Definitions are written for the client in plain words"
        body: 'Klien memilih dari 24 perasaan, menggeser intensitasnya, lalu menulis apa yang ia lakukan. Arti satu baris membantu membedakan cemas dari takut.', // bukti: README.md "Emotions: 24 feelings in two groups"; src/lib/emotions.ts:18-20 (takut, cemas beserta meaning); layar lengkap-emosi-ponsel.png "Lihat semua emosi (24)"
        shot: { file: 'jeda-emosi.v1.webp', alt: 'Lembar catatan Jeda di ponsel: pilihan emosi dengan cemas terpilih, skala intensitas 6, arti emosinya, dan respon, dengan data contoh', width: 780, height: 1688, frame: 'phone' }, // bukti: sampul-v5/jeda/lengkap-emosi-ponsel.png
        more: [
          { name: 'Pilihan cepat yang menyesuaikan', body: 'Delapan perasaan yang sering dipilih tampil di baris depan. Sisanya ada di daftar lengkap.' }, // bukti: README.md "The quick row shows the eight you pick most. 'Lihat semua' opens the full list."
          { name: 'Kamus perasaan', body: 'Tombol i membuka daftar semua perasaan, lengkap dengan cara ia biasanya terasa di badan.' }, // bukti: README.md "the 'i' opens a glossary of every feeling and how it tends to feel"; src/lib/emotions.ts:12 feels
          { name: 'Enam templat tugas', body: 'Tugas rumah bisa dibuat dari enam templat, disaring menurut jenis masalahnya.' }, // bukti: README.md "/templates (six templates, filter by problem area)"; src/lib/templates.ts:102-256 (6 slug)
        ],
      },
      {
        role: 'Untuk psikolog',
        title: 'Psikolog membuka satu tautan, catatannya sudah urut dan bergrafik.', // bukti: README.md "Psychologist view at /share/[token] ... shows the table oldest first ... Ringkasan tab"
        body: 'Tautannya hanya untuk dibaca, bisa dikunci PIN, berlaku 7, 30, atau 90 hari, dan bisa dicabut kapan saja. Ringkasannya menunjukkan catatan per hari dan naik turunnya keyakinan klien.', // bukti: src/lib/share.ts:7 SHARE_DURATIONS [7, 30, 90]; src/app/(owner)/assignments/actions.ts:56-77; README.md "optional PIN", e2e "revoke"; src/lib/summary.ts
        shot: { file: 'jeda-ringkasan.v1.webp', alt: 'Ringkasan catatan Jeda untuk psikolog: grafik catatan per hari dan grafik keyakinan dengan garis tren, dengan data contoh', width: 1440, height: 900, frame: 'browser' }, // bukti: sampul-v5/jeda/share-ringkasan-grafik.png, crop [480, 60, 1900]
        more: [
          { name: 'Tanda catatan baru', body: 'Catatan yang masuk sejak tautan dibuka sebelumnya diberi tanda Baru, jadi psikolog tahu harus mulai dari mana.' }, // bukti: README.md "marks 'Baru sejak terakhir dibuka'"; src/app/share/[token]/page.tsx:46-48
          { name: 'Unduh PDF', body: 'Tabel lengkap bisa diunduh sebagai PDF, dengan garis kecil di samping setiap angka skala.' }, // bukti: README.md "offers 'Unduh PDF'", "Mini bars in the psychologist table and the PDF"; src/lib/pdf.tsx
          { name: 'Emosi per tanggal dan jam', body: 'Ringkasan juga memuat tabel emosi, perasaan berat dan ringan per tujuh hari, serta hari dan jam kejadian.' }, // bukti: README.md Ringkasan bullets ("Emosi per tanggal", "heavy and light feelings per 7-day block", "Hari dan jam kejadian"); src/lib/summary.ts
        ],
      },
      {
        role: 'Izin klien',
        title: 'Psikolog hanya membaca klien yang memberi izin.', // bukti: README.md "Access needs the client's consent"; layar "Terhubung sejak ..., atas persetujuan klien."
        body: 'Klien menghubungkan psikolognya sendiri dan bisa memutusnya kapan saja. Setiap kali catatan dibuka dari ruang kerja psikolog atau akun admin, aksesnya tercatat.', // bukti: src/components/care-settings.tsx:12-14; src/app/api/care/end; src/app/psikolog/klien/[id]/tugas/[aid]/page.tsx:25 dan pdf/route.ts:16; src/app/admin/assignments/[id]/page.tsx:24; prisma/schema.prisma:171 AccessLog
        shot: { file: 'jeda-izin.v1.webp', alt: 'Halaman klien di ruang psikolog Jeda: terhubung atas persetujuan klien, tugas dua minggu dengan tombol unduh PDF, dan catatan terbaru, dengan data contoh', width: 1440, height: 900, frame: 'browser' }, // bukti: sampul-v5/jeda/psikolog-klien-meja.png, crop [878, 202, 1590] (baris judul "Klien contoh" dibuang)
        more: [
          { name: 'Ruang kerja psikolog', body: 'Beranda menunjukkan klien yang punya catatan baru, catatan yang baru masuk, dan tiga sesi sebelumnya.' }, // bukti: README.md "Beranda: ... the clients with something new, the newest entries across clients, and the last three sessions"
          { name: 'Catatan sesi privat', body: 'Tanggal, lama, tempat, dan kesimpulan sesi hanya terbaca psikolog yang menulisnya.' }, // bukti: README.md "session notes (date, length, place, conclusions). Session notes are visible only to the psychologist who wrote them"; prisma/schema.prisma:67 TherapySession
          { name: 'Rekap sesi per bulan', body: 'Semua sesi tersusun per bulan, lengkap dengan jumlah dan total jamnya.' }, // bukti: README.md "Sesi: every session ... by month, with the month's count and hours"; src/lib/sessions.ts groupByMonth
          { name: 'Hapus semua data', body: 'Klien bisa menghapus semua tugas dan catatannya sendiri, dan akses psikolog ikut berakhir.' }, // bukti: src/app/api/data/delete-all/route.ts:8-26
        ],
      },
    ],
    fitsFor: [
      { field: 'Pelatih kebugaran dan ahli gizi', example: 'Klien mencatat latihan atau makan di rumah, pelatih membaca ringkasannya sebelum bertemu.' }, // bukti: pola catat cepat + tautan baca-saja (kemampuan, bukan proyek)
      { field: 'Bimbel dan sekolah', example: 'Siswa mengisi jurnal belajar, guru membacanya lewat tautan yang bisa dicabut.' }, // bukti: pola src/lib/share.ts (kedaluwarsa, cabut)
      { field: 'Coaching dan pelatihan', example: 'Peserta mencatat praktik di antara sesi, coach melihat grafik kemajuannya.' }, // bukti: pola src/lib/summary.ts
      { field: 'Inspeksi lapangan', example: 'Petugas mencatat temuan tanpa sinyal, atasan membaca ringkasan dan mengunduh PDF.' }, // bukti: pola offline-first src/lib/sync.ts + src/lib/pdf.tsx
    ],
    cta: { eyebrow: 'Klien Anda mencatat di antara pertemuan?', heading: 'Ceritakan siapa yang mencatat dan siapa yang membaca.' },
  },
  'd-day': {
    heading: 'Strategi berjalan tanpa ditunggui, berhenti cukup satu ketukan.', // bukti: README.md "Runtime: satu tick per bar" (systemd timer); projects.ts timeline d-day@fe0cba2 "Kill switch satu ketukan"
    groups: [
      {
        role: 'Saat darurat',
        title: 'Semua order berhenti dengan satu ketukan.', // bukti: commit fe0cba2 (projects.ts timeline); layar tombol "Hentikan semua order"
        body: 'Berhenti tanpa konfirmasi, karena saat darurat detik berarti. Melanjutkan lagi baru bisa setelah pencocokan terbaru dengan bursa tidak menemukan masalah.', // bukti: dashboard/src/app/HaltPanel.tsx:40-44 "sinkronisasi yang paling lama 10 menit dan tidak menemukan masalah"; dashboard/src/app/halt/actions.ts:28; docs/decisions/0021-sinkron-atas-permintaan.md
        shot: { file: 'd-day-henti.v1.webp', alt: 'Halaman Keadaan d-day sesudah semua order dihentikan: strip merah, sebab berhenti, waktu, dan detak terakhir sistem, dengan data contoh', width: 1440, height: 900, frame: 'browser' }, // bukti: sampul-v5/d-day/d-day-kill-switch.desktop.png, crop [259, 0, 1566]; dipotong di atas tiga baris yang menyebut nama bursa
        more: [
          { name: 'Konfirmasi dengan mengetik', body: 'Melanjutkan butuh kata LANJUTKAN yang diketik, jadi tidak terjadi karena salah pencet.' }, // bukti: dashboard/src/app/halt/actions.ts:34; dashboard/src/app/HaltPanel.tsx:62
          { name: 'Stop nyata di bursa', body: 'Di pasar spot, setiap order masuk diikuti order stop sungguhan yang dipasang di bursa.' }, // bukti: CLAUDE.md Aturan #7 "Setiap order entry ... wajib diikuti pengiriman stop-loss sebagai order nyata ke exchange" (dua pengecualian di luar spot: ADR 0028, 0029)
          { name: 'Posisi tanpa stop menghentikan sistem', body: 'Kalau stop di bursa hilang, sistem berhenti dan melapor. Sistem tidak menebak dengan memasang order sendiri.' }, // bukti: docs/decisions/0018-rekonsiliasi-yang-benar-benar-berjalan.md Keputusan (iii) "Berhenti dan laporkan", "Jalur ini baca-saja"
          { name: 'Tidak ada order ganda', body: 'Sistem yang mati di tengah pengiriman bertanya ke bursa dulu sebelum mengirim lagi. Satu sinyal tetap jadi satu order.' }, // bukti: docs/decisions/0018-rekonsiliasi-yang-benar-benar-berjalan.md "Probe sebelum kirim" (dua placeOrder untuk satu bar dibuktikan tes)
        ],
      },
      {
        role: 'Pemantauan',
        title: 'Kesehatan sistem terbaca dari HP dalam satu kalimat.', // bukti: docs/decisions/0019-status-dashboard-dan-heartbeat-basi.md "strip selebar penuh di atas Keadaan, satu kalimat per sumber"; layar d-day-keadaan.ponsel.png
        body: 'Status menimbang detak sistem, perintah henti, hasil pemeriksaan, dan posisi tanpa stop. Satu saja bermasalah, warnanya ikut berubah, jadi sistem yang telat melapor tidak pernah hijau.', // bukti: docs/decisions/0019-status-dashboard-dan-heartbeat-basi.md tabel empat sumber, "Hijau hanya bila tidak satu pun sumber berkata lain"; dashboard/src/lib/status.ts
        shot: { file: 'd-day-status.v1.webp', alt: 'Halaman Keadaan d-day di ponsel: status hidup, tombol hentikan semua order, dan tabel tiga engine, dengan data contoh', width: 780, height: 1688, frame: 'phone' }, // bukti: sampul-v5/d-day/d-day-keadaan.ponsel.png (nol teks nama bursa menurut README sampul-v5)
        more: [
          { name: 'Pesan error yang bisa dimengerti', body: 'Pesan teknis diterjemahkan jadi kalimat yang bisa ditindaklanjuti. Teks aslinya tetap bisa dibuka.' }, // bukti: docs/decisions/0019-status-dashboard-dan-heartbeat-basi.md "Pesan galat tick diterjemahkan ke bahasa orang ... Teks aslinya tetap bisa dibuka"
          { name: 'Email tepat sekali', body: 'Order masuk yang terisi, posisi yang tutup, dan perintah henti dikirim lewat email sekali per kejadian. Yang gagal terkirim dicoba lagi.' }, // bukti: README.md "tick mengirim email ... Tabel notifications menjaga kiriman sekali per peristiwa walau tick diulang, dan yang gagal dicoba lagi"; runtime/src/notifikasi.ts:10
          { name: 'Status di setiap halaman', body: 'Titik berwarna di menu ikut berubah, jadi masalah terlihat dari halaman mana pun.' }, // bukti: docs/decisions/0019-status-dashboard-dan-heartbeat-basi.md "titik berlabel di nav, di setiap halaman"
          { name: 'Kunci bursa tanpa izin penarikan', body: 'Panel akun menunjukkan izin setiap kunci bursa. Kunci yang bisa menarik saldo ditolak sebelum sistem memakai uang sungguhan.' }, // bukti: README.md "Kunci ber-izin withdrawal ditolak di live sebelum tick menyentuh apa pun"; runtime/src/cli/run.ts:16; runtime/src/cli/akun.ts:46-64; dashboard/src/app/PanelAkun.tsx; ADR 0012
        ],
      },
      {
        role: 'Pemilik strategi',
        title: 'Garis yang digambar di chart bisa jadi aturan.', // bukti: docs/decisions/0016-gambar-jadi-kondisi-garis.md; README.md "Gambar terpilih bisa dikirim ke halaman Parameter sebagai kondisi masuk/keluar"
        body: 'Garis tren atau level dari chart bisa langsung dikirim ke wizard strategi lima langkah, tanpa menulis kode. Chart memakai hitungan indikator yang sama dengan sistem yang berjalan.', // bukti: README.md "Parameter adalah wizard lima langkah ... Aset, Perdagangan, Masuk, Keluar, Aktifkan", "indikator dihitung dengan @d-day/core/indicators (kode yang sama dengan engine)"; PRODUCT.md "tidak membaca kode"
        shot: { file: 'd-day-chart.v1.webp', alt: 'Chart d-day berisi candle BTC per jam dengan EMA 20, volume, RSI 14, alat gambar, serta tombol Pine dan Dari Pine', width: 1440, height: 900, frame: 'browser' }, // bukti: sampul-v5/d-day/d-day-chart-btc.desktop.png, crop [209, 187, 2465]; candle BTCUSDT publik, tanpa strategi terpasang
        more: [
          { name: 'Uji strategi ke data lama', body: 'Backtest memakai hitungan yang sama dengan sistem yang berjalan, jadi yang diuji sama dengan yang nanti dijalankan.' }, // bukti: README.md "Backtest memakai mesin yang sama dengan engine", "Tick memakai loop yang sama dengan backtest (ADR 0008)"
          { name: 'Biaya tidak disembunyikan', body: 'Setiap laporan memisahkan hasil kotor, selisih harga, biaya bursa, PPh 1%, dan hasil bersih.' }, // bukti: README.md "Laporannya selalu memisahkan gross, slippage, fee, PPh, dan net"; PRODUCT.md Positioning "PPh 1% per jual"; CLAUDE.md Aturan #8
          { name: 'Pine dua arah', body: 'Strategi bisa dibuat jadi skrip TradingView untuk dicek di sana, lalu skrip itu dibaca balik jadi pengaturan.' }, // bukti: README.md "Pine (ADR 0015) ... bisa dibaca balik jadi parameter"; docs/decisions/0015-pine-dua-arah.md, 0027-pine-dua-arah-lewat-pinets.md
          { name: 'Ruang riset terpisah', body: 'Pertanyaan riset dijawab di ruang terpisah yang tidak memegang kunci bursa. Hasilnya hanya draf, dan tidak ada yang aktif dari sana.' }, // bukti: docs/decisions/0025-lab-riset-vibe-trading.md "tanpa kunci exchange atau broker", "Tidak ada yang diaktifkan dari halaman ini"
        ],
      },
    ],
    fitsFor: [
      { field: 'Toko online multi-marketplace', example: 'Aturan harga dan stok yang berjalan sendiri, dicocokkan dengan pesanan di marketplace, dan bisa dihentikan satu tombol.' }, // bukti: pola rekonsiliasi + kill switch (kemampuan, bukan proyek)
      { field: 'Agensi dan tim iklan', example: 'Aturan menaikkan atau menahan anggaran iklan yang berjalan sendiri, dengan satu tombol untuk menghentikan semuanya.' }, // bukti: pola mesin aturan + kill switch
      { field: 'Distributor dan grosir', example: 'Aturan diskon dan batas kredit pelanggan disusun tanpa kode, lalu diuji ke data penjualan lama sebelum dipakai.' }, // bukti: pola wizard + backtest di mesin yang sama
      { field: 'Keuangan dan penagihan', example: 'Pengingat tagihan terkirim sekali per jatuh tempo, dan setiap pembayaran dicocokkan dengan mutasi bank.' }, // bukti: pola notifikasi kirim-sekali + rekonsiliasi
    ],
    cta: { eyebrow: 'Ada aturan yang Anda jalankan manual setiap hari?', heading: 'Ceritakan aturannya, dan kapan ia harus berhenti.' },
  },
  'coderoach-os': {
    heading: 'Penawaran, jam kerja, tagihan, dan kas studio ini tercatat di satu tempat.', // bukti: projects.ts coderoach-os summary.solution "Satu aplikasi dari penawaran sampai buku besar"; body "Coderoach OS menjalankan studio ini"
    groups: [
      {
        role: 'Kas dan laba',
        title: 'Pendapatan habis untuk apa, kelihatan dalam satu gambar.', // bukti: coderoach-app:src/lib/finance/aliran.ts; src/components/peta/SankeyUang.tsx; docs/decisions/0071-sankey-keuangan.md
        body: 'Diagram aliran membagi pendapatan ke setiap pos beban sampai sisa labanya. Bulan yang rugi tampil sebagai rugi yang ditutup kas, bukan laba nol.', // bukti: coderoach-app:src/lib/finance/aliran.ts:5-8,53 (simpul "Rugi, ditutup dari kas"); tests/aliran-uang.test.ts:32 "rugi: selisihnya sumber di kiri, bukan laba 0". Satu-satunya kontras "X, bukan Y" di proyek ini.
        shot: { file: 'coderoach-os-aliran-uang.v1.webp', alt: 'Diagram aliran uang Coderoach OS untuk tiga bulan: tiga lini pendapatan mengalir ke pos beban dan laba bersih, dengan data contoh', width: 1200, height: 750, frame: 'browser' },
        more: [
          { name: 'Kas cocok dengan saldo bank', body: 'Saldo bank dicatat per rekening dan selisihnya langsung dibukukan. Rekening yang sudah 35 hari tidak dicocokkan diberi tanda.' }, // bukti: coderoach-app:src/lib/finance/rekonsiliasi.ts:16 (BATAS_BASI_HARI = 35), :37-39, :86-95 (Belum/Basi/Selisih/Cocok); layar keuangan.png (banner "belum dicocokkan dengan saldo bank dalam 35 hari terakhir")
          { name: 'Runway kas', body: 'Beban bersih per bulan dihitung dari pembukuan, lalu runway menunjukkan berapa bulan kas masih cukup. Bulan yang belum genap tidak ikut dirata-rata, jadi angkanya tidak meleset.' }, // bukti: coderoach-app:src/lib/finance/burn.ts; src/app/(app)/keuangan/page.tsx:172-180 (Net burn, Runway "kas ÷ net burn"), :248 "Bulan berjalan tidak ikut rata-rata"; tests/keuangan.test.ts
          { name: 'Margin riil per proyek', body: 'Nilai kontrak dikurangi biaya dan jam kerja tim, dengan tarif yang berlaku saat jam itu dicatat. Angkanya diperbarui setiap ada biaya atau jam baru.' }, // bukti: coderoach-app:src/lib/margin.ts:5-13 (marginRiil = nilai − biaya − Σ jam × rate yang berlaku pada tanggal entry; dipanggil setiap biaya/time_entry berubah); tests/margin.test.ts
          { name: 'Semua tagihan layanan', body: 'Langganan dan biaya hosting dalam rupiah dan dolar terkumpul di satu halaman, lengkap dengan anggarannya.' }, // bukti: coderoach-app:src/app/(app)/billing/page.tsx:14-22,133-135 (IDR/USD, AnggaranForm); src/lib/billing/hitung.ts; docs/decisions/0077-area-billing.md:32 "Satu tempat semua tagihan."
        ],
      },
      {
        role: 'Penawaran dan tagihan',
        title: 'Penawaran yang disetujui langsung jadi proyek.', // bukti: coderoach-app:src/lib/konversi.ts:103-123 (konversi penawaran ACC ke proyek), :207 instansiasiFase
        body: 'Setiap revisi penawaran tersimpan sebagai versi baru. Begitu klien setuju, penawaran diubah jadi proyek lengkap dengan fase dan termin tagihannya.', // bukti: coderoach-app:src/db/migrations/0011_penawaran.sql (versi, parent_id); src/lib/actions/penawaran.ts buatRevisiPenawaran; src/lib/konversi.ts:94-95 (termin DP 50% dan Pelunasan 50%), :207; tests/konversi.test.ts
        shot: { file: 'coderoach-os-timeline.v1.webp', alt: 'Timeline tugas lintas proyek di Coderoach OS: setiap proyek hasil penawaran tampil dengan fase, tugas, tenggat, dan garis hari ini, dengan data contoh', width: 1200, height: 750, frame: 'browser' },
        more: [
          { name: 'Termin siap ditagih', body: 'Begitu satu fase selesai, terminnya berubah jadi siap ditagih. Invoice tinggal dibuat dari termin itu.' }, // bukti: coderoach-app:src/lib/actions/fase.ts:159-167 (Fase Selesai, termin jadi SiapTagih); src/app/(app)/invoice/TerminPanel.tsx (buatInvoiceDariTermin)
          { name: 'Retainer tertagih sendiri', body: 'Invoice retainer terbit otomatis setiap periode. Retainer yang dibayar di muka diakui sebagai pendapatan bulan demi bulan.' }, // bukti: coderoach-app:src/app/api/cron/route.ts:2-5 (terbitkan invoice retainer, akuiPendapatan kontrak DiMuka); src/lib/retainer.ts akuiPendapatan; src/lib/finance/invoice-engine.ts buatDraftRetainer
          { name: 'Potongan PPh 23 tercatat', body: 'Saat klien memotong PPh 23, piutang dicatat netto dan potongannya masuk sebagai pajak dibayar di muka.' }, // bukti: coderoach-app:src/lib/finance/invoice-engine.ts:12 (TARIF_PPH23 = 0.02), :54, :206 (akun PPH23_DIMUKA); src/app/(app)/invoice/InvoiceForm.tsx:94 "Klien memotong PPh 23 (2%), piutang dicatat netto"
          { name: 'Harga lantai dan target omzet', body: 'Harga minimum tiap layanan dihitung dari biaya jam penuh dan margin minimum, dan harga di bawahnya ditandai. Titik impas dan target omzet bulanan ikut terhitung.' }, // bukti: coderoach-app:src/lib/finance/harga.ts:1-13; src/app/(app)/master/page.tsx:543-565 ("di bawah lantai"); src/app/(app)/keuangan/page.tsx (Target dan harga); docs/decisions/0024-target-dan-harga-lantai.md; tests/harga-lantai.test.ts
        ],
      },
      {
        role: 'Proyek dan rilis',
        title: 'Progres proyek kelihatan tanpa perlu bertanya ke tim.', // bukti: coderoach-app:src/lib/story/status.ts:1-12 (status maju dari keadaan PR dan push, bukan diisi tangan)
        body: 'Status setiap fitur berubah sendiri dari dikerjakan, ditinjau, sampai dirilis. Setiap rilis punya enam gerbang mutu dan uji terima (UAT) yang diputuskan satu per satu.', // bukti: coderoach-app:src/lib/story/status.ts (Belum, Dikerjakan, Ditinjau, Tergabung, Dirilis; hanya maju); src/app/api/gh/webhook/route.ts; src/lib/story/rilis.ts; src/db/migrations/0043_mcp_rilis.sql:2,7 (G1, G2, G3a, G3b, G4, G5; UAT); src/lib/rilis/tulis.ts:93 "Enam gate selalu ada sejak rilis dibuat"
        shot: { file: 'coderoach-os-rilis.v1.webp', alt: 'Detail proyek di Coderoach OS: dua rilis dengan status gerbang G1 sampai G5 dan UAT, grafik burn-up tiap rilis, daftar modul, dan awal timeline fase, dengan data contoh', width: 1200, height: 750, frame: 'browser' },
        more: [
          { name: 'Hasil tes per syarat', body: 'Setiap syarat penerimaan sebuah fitur menunjukkan apakah tes otomatisnya lulus.' }, // bukti: coderoach-app:src/app/api/integrations/ci/test-results/route.ts; src/lib/ci/terima.ts; src/lib/ci/agregasi.ts; src/lib/story/ac.ts; src/db/migrations/0042_tes_ac.sql; projects.ts timeline 13 Okt 2026 "Hasil tes per kriteria penerimaan"
          { name: 'Peta sistem yang hidup', body: 'Aplikasi, hosting, dan layanan luar tergambar lengkap dengan biaya dan risikonya. Rencana pindah layanan dihitung dulu biayanya sebagai skenario.' }, // bukti: coderoach-app:src/app/(app)/arsitektur/page.tsx (tab Map, Risk, Cost, Scenario), :1006 "Kalau pindah, berapa"; src/lib/arsitektur/biaya.ts; src/lib/arsitektur/risiko.ts; src/lib/arsitektur/skenario.ts:23 (Skenario "kalau pindah ke X")
          { name: 'AI membaca status yang sama', body: 'Asisten AI yang ikut mengerjakan proyek membaca status fitur dan menambah catatannya di sini, dengan akses per orang.' }, // bukti: coderoach-app:src/lib/mcp/server.ts:111,136,161 (list_stories, get_story, add_story_note); src/lib/mcp/token.ts (token per user); tests/mcp.test.ts
        ],
      },
      {
        role: 'Tim dan jam',
        title: 'Tugas yang terlalu lama diam langsung kelihatan.', // bukti: coderoach-app:src/app/(app)/tugas/Insight.tsx:20 (HARI_DIAM = 14), :59, :75 (KPI "Diam > 14 hari")
        body: 'Halaman insight menghitung lama pengerjaan, umur setiap tugas terbuka, dan tugas yang diam lebih dari 14 hari. Papan berjalan per siklus mingguan, dan kartu yang belum selesai pindah sendiri ke siklus berikutnya.', // bukti: coderoach-app:src/app/(app)/tugas/Insight.tsx:20-75; src/lib/insight/alur.ts:222; src/lib/siklus/tulis.ts:3-4 ("kartu yang belum selesai pindah sendiri ke siklus berikutnya"), :34-39; docs/decisions/0080-siklus-studio-mingguan.md; tests/siklus-tulis.test.ts
        shot: { file: 'coderoach-os-insight.v1.webp', alt: 'Halaman Insight tugas di Coderoach OS: jumlah tugas terbuka, lewat tenggat, dan diam lebih dari 14 hari, grafik alur kumulatif, dan umur tiap tugas terbuka, dengan data contoh', width: 1200, height: 750, frame: 'browser' },
        more: [
          { name: 'Grid jam mingguan', body: 'Jam kerja diisi per proyek per hari, lalu dibandingkan dengan kapasitas mingguan tiap orang.' }, // bukti: coderoach-app:src/app/(app)/waktu/GridWaktu.tsx:25 (sel per proyek dan tanggal); src/app/(app)/waktu/page.tsx:80-89 ("Utilisasi tim minggu ini", jam/kapasitas); src/lib/queries/waktu.ts:65-73 (kapasitas_jam_minggu)
          { name: 'Hasil kerja dicocokkan dengan jam', body: 'Hasil kerja yang masuk tanpa catatan jam, dan jam yang tidak diikuti hasil kerja, masuk satu daftar untuk dicek.' }, // bukti: coderoach-app:src/lib/queries/repo.ts (silangKomitJam, komitTanpaJam); src/app/(app)/repo/page.tsx:34 "Komit vs jam", :440, :527; src/lib/queries/beranda.ts (peringatan komit-tanpa-jam)
          { name: 'Angka keuangan hanya untuk admin', body: 'Staf melihat proyek, tugas, dan jamnya sendiri. Rate, biaya, dan saldo disaring sebelum halaman sampai ke mereka.' }, // bukti: coderoach-app:src/lib/rbac.ts:16-48 (staff "none" untuk keuangan, kas, invoice, biaya, laporan, rate-internal, billing); src/lib/queries/proyek.ts bolehKeuangan/bolehRate; tests/keuangan-staff.test.ts; projects.ts features "Angka keuangan hanya untuk yang berhak"
        ],
      },
    ],
    fitsFor: [
      { field: 'Agensi kreatif dan digital', example: 'Penawaran per versi, termin per fase, dan margin tiap klien setelah jam tim dihitung.' },
      { field: 'Konsultan dan kantor jasa profesional', example: 'Jam kerja per klien jadi biaya, lalu dibandingkan dengan nilai kontraknya.' },
      { field: 'Kontraktor dan biro arsitek', example: 'Termin siap ditagih begitu tahap pekerjaannya selesai, dan kas proyek terbaca setiap minggu.' },
      { field: 'Event organizer dan production house', example: 'Biaya vendor tercatat per acara, jadi laba setiap acara terlihat sebelum acara berikutnya.' },
    ],
    cta: { eyebrow: 'Menjalankan studio atau agensi?', heading: 'Ceritakan bagaimana Anda tahu sebuah proyek untung.' },
  },
  'viralytics': {
    heading: 'Brand, agensi, dan KOL bekerja di satu alur campaign.', // bukti: projects.ts viralytics summary.solution "Satu alur bergerbang untuk agensi dan brand"; viralytics:components.jsx:58-150 (sidebar per peran brand, specialist, kol)
    groups: [
      {
        role: 'Alur campaign',
        title: 'Setiap campaign tahu siapa yang sedang ditunggu.', // bukti: viralytics:campaign-detail.jsx:921 ("KOL menunggu keputusan brand"); layar alur-konten.png ("Menunggu approval Anda", "2 KOL menunggu keputusan brand")
        body: 'Campaign berjalan per fase, dari pembuatan sampai tayang, dengan persetujuan brand di setiap fase. Satu tabel menunjukkan posisi tiap KOL: selesai, berjalan, menunggu, atau ditolak.', // bukti: viralytics:apps/api/src/db/campaign-phases.ts:18-28 (Create Campaign, Submission, Drafting, Posting / Live); campaign-detail.jsx:1175-1280 ("Fase campaign"), :910-914 (legenda selesai, berjalan, menunggu, ditolak); projects.ts features "Fase dan gerbang persetujuan"
        shot: { file: 'viralytics-fase.v1.webp', alt: 'Detail campaign Viralytics: empat kartu fase dengan status persetujuan, lalu tabel progres tiap KOL per fase, dengan data contoh', width: 1200, height: 750, frame: 'browser' },
        more: [
          { name: 'Draft bolak-balik di satu tempat', body: 'KOL mengunggah draft, brand menyetujui atau menulis instruksi revisi, lalu KOL mengunggah lagi di halaman campaign yang sama.' }, // bukti: viralytics:campaign-detail.jsx:469-560 (:524 "Instruksi revisi", :543 "Unggah lagi"); apps/api/src/server.ts:6077 (unggah), :6156 (review brand)
          { name: 'Keputusan brand sekaligus', body: 'Brand mencentang beberapa KOL yang menunggu, lalu menyetujui atau menolaknya dalam satu langkah.' }, // bukti: viralytics:campaign-detail.jsx:890-921 (waitingIds, canPick = isBrand, bulk(action); "Centang yang mau diputuskan")
          { name: 'Link tayang dicek dulu', body: 'Link unggahan KOL diverifikasi tim sebelum dihitung. Link yang ditolak kembali ke KOL untuk dikirim ulang.' }, // bukti: viralytics:apps/api/src/workflow-machine.ts:126-145 (gate4_reject ke content_rejected, submit_content kirim ulang)
        ],
      },
      {
        role: 'Direktori KOL',
        title: 'Calon KOL dicari, disaring, dan diajukan dari satu daftar.', // bukti: viralytics:extra-views.jsx:31 (DirectoryView); projects.ts features "Direktori dan shortlist KOL"
        body: 'Daftar KOL disaring menurut tier, platform, kategori, dan provinsi. Beberapa KOL dipilih sekaligus, lalu diajukan ke campaign dalam satu langkah.', // bukti: layar directory.png (tier Nano sampai Mega, filter platform, kategori, provinsi, bilah "Propose to Campaign", extra-views.jsx:858); projects.ts features "Beberapa KOL dipilih sekaligus lalu diajukan ke campaign dalam satu aksi"
        shot: { file: 'viralytics-direktori.v1.webp', alt: 'KOL Directory Viralytics: jumlah KOL per tier, filter, tombol Import CSV, Cari KOL, dan Duplikat, lalu tabel followers dan ER dengan dua KOL dicentang, dengan data contoh', width: 1200, height: 750, frame: 'browser' },
        more: [
          { name: 'Cari kreator di tiga platform', body: 'Kreator di TikTok, Instagram, dan YouTube dicari dari dalam aplikasi, lalu ditambahkan ke direktori.' }, // bukti: viralytics:extra-views.jsx:606-609 ("Cari KOL baru di TikTok / Instagram / YouTube"), :990-1016 (hasil ditambahkan, yang gagal disebut namanya); apps/api/src/server.ts:9633 (platform tiktok|instagram|youtube)
          { name: 'Impor dari spreadsheet', body: 'Daftar KOL lama masuk sekaligus lewat berkas CSV.' }, // bukti: viralytics:extra-views.jsx:598 "Import CSV"; modals.jsx:3857 KolImportCsvModal; apps/api/src/server.ts:8347 (/kols/bulk). RAGU: K11 dan P007 Medium terbuka.
          { name: 'Duplikat digabung', body: 'KOL yang tercatat dua kali ditemukan, lalu digabung jadi satu profil.' }, // bukti: viralytics:extra-views.jsx:621-624 "Duplikat"; modals.jsx:7211 KolDuplicatesModal; apps/api/src/server.ts:9011,9034,9077; db/kol-merge.ts. RAGU: audit §14, belum pernah dijalankan di produksi.
        ],
      },
      {
        role: 'Untuk brand',
        title: 'Angka laporan ditarik dari unggahan, bukan disalin tangan.', // bukti: viralytics:apps/api/src/server.ts:6774-6800 (runApifyMetrics saat gate4_approve); projects.ts body "angka di laporan tidak pernah disalin tangan". Satu-satunya kontras "X, bukan Y" di proyek ini.
        body: 'Setelah link tayang diverifikasi, views, engagement, dan ER ditarik otomatis. Brand membuka laporannya sendiri, lengkap dengan biaya per view, pencapaian target, dan kontribusi tiap KOL.', // bukti: viralytics:apps/api/src/server.ts:5821 (GET /campaigns/:id/report, requireRole termasuk brand_rep); components.jsx:100 (menu Reports untuk brand); aux-views.jsx:2036 ReportsView; layar reports-detail.png (Efisiensi biaya, Pencapaian target, Kontribusi per KOL). Bukan "View Summary" di detail campaign (P032).
        shot: { file: 'viralytics-laporan.v1.webp', alt: 'Laporan campaign Viralytics di ponsel: total views terhadap target, total engagement, rata-rata ER, konten yang sudah punya metrik, dan biaya terpakai, dengan data contoh', width: 780, height: 1688, frame: 'phone' },
        more: [
          { name: 'Metrik diperbarui berkala', body: 'Angka unggahan yang masih berjalan ditarik ulang secara terjadwal, tanpa ada yang mengetik ulang.' }, // bukti: viralytics:apps/api/src/services/apify-cron.ts:1-12 (refresh metrik berkala, disimpan di tabel workflows); apps/api/src/db/schema.ts:395-399 (lastMetric*)
          { name: 'Beranda brand', body: 'Brand langsung melihat apa saja yang menunggu keputusannya di semua campaign.' }, // bukti: viralytics:components.jsx:82-92 (Home brand "menjawab 'ada yang menunggu saya?' lintas campaign"); home-brand.jsx:4,84 (BrandHomeView)
          { name: 'Laporan juga untuk KOL', body: 'KOL membuka laporan campaign yang ia ikuti, hanya untuk angka unggahannya sendiri.' }, // bukti: viralytics:components.jsx:108-111 ("KOL melihat report campaign yang ia ikuti, dilingkupi ke slotnya sendiri di server"); apps/api/src/server.ts:5821-5840 (cabang role kol)
        ],
      },
      {
        role: 'Keuangan agensi',
        title: 'Serapan budget semua campaign terbaca di satu papan.', // bukti: layar campaigns.png (Budget terpakai, Slot terisi, Total views); projects.ts features "Papan campaign"
        body: 'Budget terpakai, slot KOL terisi, dan views terhadap target tampil untuk setiap campaign. Campaign yang budgetnya hampir habis atau slotnya belum penuh kelihatan tanpa dibuka satu per satu.', // bukti: layar campaigns.png (bilah budget dan slot per baris); projects.ts features "Semua campaign dalam satu daftar dengan status, slot KOL terisi, serapan budget, dan progres views terhadap target"
        shot: { file: 'viralytics-papan.v1.webp', alt: 'Papan campaign Viralytics: campaign aktif, budget terpakai, slot terisi, dan total views, lalu daftar campaign dengan status, slot, budget, dan progres views, dengan data contoh', width: 1200, height: 750, frame: 'browser' },
        more: [
          { name: 'Biaya tarik data ikut dihitung', body: 'Laba rugi per brand sudah dikurangi biaya menarik data akun dan unggahan. Pencarian dan pembaruan data berbayar berhenti sendiri saat anggaran bulan itu habis.' }, // bukti: viralytics:apps/api/src/db/finance.ts:121,675 (getBrandProfitLoss); admin-views.jsx:2611-2613,2981; services/apify-budget.ts:1-20 (anggaran bulanan, gagal tertutup); services/apify.ts:1144 checkApifyBudget. RAGU: X11 (tarikan saat konten disetujui melewati gerbang) dan X18 (PPN terhitung pendapatan), Medium terbuka.
          { name: 'Rekening KOL tersandi', body: 'Nomor rekening KOL disimpan tersandi, dan layar hanya menampilkan empat digit terakhir.' }, // bukti: viralytics:apps/api/src/db/kol-bank-accounts.ts:5-7,51,82 (account_number_enc, hanya account_last4 polos); services/crypto.ts (AES-256-GCM); aux-views.jsx:905-970 (KolBankCard)
          { name: 'Akun dan data terjaga', body: 'Login bisa diberi kode verifikasi lewat email. Data yang terhapus masuk tempat sampah dan bisa dipulihkan.' }, // bukti: viralytics:aux-views.jsx:847-893 ("Two-factor auth (email OTP)"); apps/api/src/db/twofa-otp.itest.ts; db/trash.ts:95 (restore); admin-views.jsx:1411 (TrashView "Restore"). RAGU: L003 Medium terbuka (kartu 2FA tampil Nonaktif setelah dimuat ulang).
        ],
      },
    ],
    fitsFor: [
      { field: 'Agensi periklanan dan media', example: 'Materi iklan direview klien per versi, lalu hasil tayangnya masuk laporan yang sama.' },
      { field: 'Program afiliasi dan reseller', example: 'Mitra disaring dari satu direktori, diajukan ke program, lalu hasil penjualannya dilaporkan per mitra.' },
      { field: 'Production house', example: 'Draft video bolak-balik dengan klien sampai disetujui, lalu tayang dan diukur.' },
      { field: 'Event dan aktivasi brand', example: 'Vendor dan talent berjalan per fase, dengan persetujuan klien di setiap tahap.' },
    ],
    cta: { eyebrow: 'Mengelola banyak kreator?', heading: 'Ceritakan bagian campaign yang sering membuat Anda menunggu.' },
  },
  'rencana-ro': {
    heading: 'Hitungan bonus yang rumit berubah jadi rencana minggu ini.', // bukti: projects.ts rencana-ro body "waktu untuk menghitung aturan bonus yang berlapis setiap minggu. Rencana RO mengerjakan hitungan itu"; rencana-ro:src/engine/roStrategy.ts:90 (generateActionPlan)
    groups: [
      {
        role: 'Setiap minggu',
        title: 'Empat pertanyaan mingguan terjawab di satu layar.', // bukti: rencana-ro:web/app/(app)/page.tsx:37-63,165 (AnswerCards); web/app/(app)/beranda/AnswerCards.tsx:50,64,68-86,88-113
        body: 'Kartunya menjawab bonus yang sudah cair, berapa unit sebaiknya dibeli, posisi untuk member baru, dan siapa yang harus repeat order. Tanggal datanya tertulis di atas kartu, dan angka perkiraan diberi label.', // bukti: rencana-ro:web/app/(app)/beranda/AnswerCards.tsx (empat kartu); web/app/(app)/DataAge.tsx:11 (tanggal data portal dan jam tarikan); PRODUCT.md:33 (angka asumsi selalu berlabel perkiraan); layar dashboard.png ("perkiraan bonus")
        shot: { file: 'rencana-ro-empat-jawaban.v1.webp', alt: 'Beranda Rencana RO dengan data contoh: empat kartu jawaban, yaitu bonus cair, beli berapa unit, posisi member baru, dan kapan harus repeat order, di bawah tanggal data portal', width: 1200, height: 750, frame: 'browser' },
        more: [
          { name: 'Rencana repeat order berurutan', body: 'Daftar minggu ini diurutkan dari yang mendesak, lengkap dengan siapa, berapa unit, dan alasannya.' }, // bukti: rencana-ro:src/engine/roStrategy.ts:90,100,160 (rencana dengan tenggat mingguan, diurutkan menurut tingkat prioritas); web/app/(app)/KesimpulanCard.tsx; web/lib/planView.ts; projects.ts features "siapa di kaki mana, berapa unit, berapa biayanya, dan kenapa"
          { name: 'Mode tanya jawab', body: 'Satu pertanyaan per layar, lalu berakhir di rencana yang siap dijalankan.' }, // bukti: rencana-ro:web/app/(app)/tanya/page.tsx:27 ("one question per screen, then the solver"); web/lib/tanya.ts:5,21
          { name: 'Data ditarik dengan login sendiri', body: 'Dengan login distributor sendiri, data jaringan ditarik terjadwal atau saat diminta. Data loginnya disimpan tersandi.' }, // bukti: rencana-ro:cron-worker/src/index.ts:2-4 (detak tiap jam); web/app/api/schedule-tick/route.ts; web/app/(app)/jalankan/page.tsx dan web/app/api/run/route.ts (tarikan manual); web/lib/serverCrypto.ts dan src/utils/crypto.ts (AES-256-GCM)
          { name: 'Huruf besar, tombol lebar', body: 'Ukuran huruf bisa dinaikkan sampai 150 persen, dan tombol di HP cukup besar untuk jempol.' }, // bukti: rencana-ro:web/lib/zoom.ts:41 (ZOOM_STEPS 0.8 sampai 1.5); web/app/(app)/TextZoom.tsx; web/app/globals.css (pointer: coarse, min-height 2.75rem = 44px); DESIGN.md §3
        ],
      },
      {
        role: 'Repeat order',
        title: 'Tenggat repeat order setiap member ada di kalender.', // bukti: rencana-ro:web/app/(app)/kalender/page.tsx; web/app/(app)/CalendarView.tsx; projects.ts features "Kalender repeat order bulanan"
        body: 'Kalender bulanan menandai siapa yang harus repeat order dan kapan. Sekali diunduh ke kalender HP, pengingatnya muncul tiga hari dan sehari sebelumnya.', // bukti: rencana-ro:web/app/api/export/calendar/route.ts (?fmt=ics); web/lib/ics.ts:15 ("Every non-terminated event carries two VALARMs, TRIGGER:-P3D and -P1D"), :179-184; web/app/(app)/CalendarView.tsx:225-228 (tautan unduh .ics)
        shot: { file: 'rencana-ro-kalender.v1.webp', alt: 'Kalender repeat order Rencana RO bulan November dengan data contoh: nama member di setiap tanggal, diberi warna menurut status', width: 1200, height: 750, frame: 'browser' },
        more: [
          { name: 'Pengingat pagi di HP', body: 'Setiap pukul enam pagi, daftar repeat order terdekat dikirim ke notifikasi HP, email, atau lonceng di aplikasi. Distributor memilih sendiri jalurnya.' }, // bukti: rencana-ro:.github/workflows/notify-ro.yml:26 (cron 23:00 UTC = 06:00 WIB); web/scripts/notifyDailyRo.ts (email, web push, lonceng); web/lib/roDigest.ts; web/app/(app)/pengaturan/PushToggle.tsx; projects.ts features "Distributor memilih hari pengingat, target yang dikejar, kanal"
          { name: 'Daftar siap kirim ke WhatsApp', body: 'Daftar repeat order dan rencana minggu ini tersusun jadi teks yang tinggal dikirim lewat WhatsApp.' }, // bukti: rencana-ro:web/app/(app)/WaRoButton.tsx:5,29 ("Kirim daftar RO ke WhatsApp", tidak pernah terkirim otomatis); web/app/(app)/CopyReport.tsx
          { name: 'Laporan lewat email', body: 'Ringkasan rencana masuk ke email. Kalau nomor WhatsApp diisi, ada tombol untuk meneruskannya.' }, // bukti: rencana-ro:src/notify/email.ts:2-17 (tombol "Kirim ringkasan ke WhatsApp" bila nomor WA diisi); src/notify/whatsapp.ts:19
        ],
      },
      {
        role: 'Hasil dan simulasi',
        title: 'Bonus yang sudah cair tidak dicampur dengan perkiraan.', // bukti: rencana-ro:web/lib/achievements.ts:1-10 ("Everything here is a FACT the portal settled. Nothing in it may ever be put on the same axis as projectDaily or simulate output"); PRODUCT.md:33 "Kejujuran adalah fitur."
        body: 'Grafik pencapaian hanya memuat bonus yang sudah dibayar, per closing dan per bulan. Hasil simulasi dan rencana selalu diberi label perkiraan.', // bukti: rencana-ro:web/app/(app)/pencapaian/page.tsx:28-44; web/lib/achievements.ts:1-10; layar pencapaian-grafik.png ("44 closing yang sudah dibayar", "Dijumlahkan dari closing di bulan yang sama"); PRODUCT.md:33; GAYA-BAHASA.md §5
        shot: { file: 'rencana-ro-pencapaian.v1.webp', alt: 'Halaman Pencapaian Rencana RO dengan data contoh: grafik rupiah tiap closing yang sudah dibayar dan rupiah tiap bulan', width: 1200, height: 750, frame: 'browser' },
        more: [
          { name: 'Simulator jaringan', body: 'Coba tempatkan pembelian di jaringan, lalu lihat ke mana poinnya mengalir. Simulasi tidak pernah mengubah data jaringan.' }, // bukti: rencana-ro:web/lib/treeSim.ts:2-7 ("Nothing is ever written back"); web/app/(app)/SimulatorTool.tsx:14-16 ("nothing is written anywhere"); web/app/api/simulator/route.ts:39 (hanya GET). Skenario yang disimpan hanya menyimpan susunannya (web/app/(app)/simScenarioActions.ts).
          { name: 'Jalan ke target', body: 'Peta bertahap menunjukkan siapa yang perlu bergerak, dari Anda sampai posisi baru, untuk mengejar target.' }, // bukti: rencana-ro:web/lib/laneGraph.ts:2,15-17 (lajur = siapa, pita = tahap); web/app/(app)/jalan/LaneMap.tsx:18; web/app/(app)/nav.ts:40
          { name: 'Konsultasi per member', body: 'Rencana untuk satu member disusun, lalu dibagikan sebagai teks WhatsApp atau PDF.' }, // bukti: rencana-ro:web/app/(app)/konsultasi/ConsultActions.tsx:11,43,59 (sendWa, sharePdf); web/lib/consultShare.ts:41,100; web/lib/slidePdf.ts
          { name: 'Data lama diberi tanda', body: 'Data yang lebih tua dari tujuh hari diberi warna peringatan dan tautan untuk menarik ulang.' }, // bukti: rencana-ro:web/app/(app)/DataAge.tsx:30 (STALE_DAYS = 7), :55-65 (warna amber); laporan subagen: tautan untuk menjalankan ulang ada di komponen yang sama
        ],
      },
    ],
    fitsFor: [
      { field: 'Agen asuransi', example: 'Polis yang jatuh tempo minggu ini tersusun per nasabah, dengan pengingat sebelum tenggatnya.' },
      { field: 'Jaringan reseller', example: 'Reseller yang perlu restok minggu ini terdaftar, lengkap dengan teks siap kirim ke WhatsApp.' },
      { field: 'Salon dan klinik kecantikan', example: 'Pelanggan yang paket perawatannya hampir habis diingatkan lewat kalender dan WhatsApp.' },
      { field: 'Koperasi simpan pinjam', example: 'Anggota yang jatuh tempo angsuran diingatkan tiga hari dan sehari sebelumnya.' },
    ],
    cta: { eyebrow: 'Punya jaringan mitra atau reseller?', heading: 'Ceritakan hitungan yang masih Anda kerjakan sendiri setiap minggu.' },
  },
  'locascore': {
    // alternatif heading: 'Calon lokasi dinilai dengan data, sebelum kontrak sewa diteken.' / 'Rapat buka cabang dimulai dari angka dan alasannya.'
    heading: 'Setiap calon lokasi datang ke rapat dengan angka dan alasannya.', // bukti: components/SiteDossier.tsx:53-61,254-303 (bagian 01 Kesimpulan Kelayakan + alasan satu baris :170-194)
    groups: [
      {
        role: 'Tim ekspansi',
        title: 'Satu link Google Maps jadi berkas penilaian lokasi.', // bukti: lib/parseMaps.ts:68-92,123-172 (link pendek diurai); app/api/collect/route.ts:33-206; components/NewSiteModal.tsx:237-240
        body: 'Kompetitor dan tempat yang mendatangkan pembeli, 14 kategori dalam radius 1,5 km, terkumpul sendiri. Surveyor tinggal membetulkan yang keliru, lalu skornya langsung dihitung ulang.', // bukti: lib/categories.ts:10-32 (14 kategori, SEARCH_RADIUS_METERS = 1500, bawaan, bisa diubah di settings); lib/categoryGroups.ts:12-31 ("Demand Generator"); components/InputsDrawer.tsx:100-104 ("Simpan → skor dihitung ulang"); components/SiteDetailContext.tsx:364-436
        shot: { file: 'locascore-kesimpulan-ponsel.v1.webp', alt: 'Kesimpulan kelayakan satu calon lokasi LocaScore di ponsel: skor 82 dari 100, status GO, potensi omset, pembeli terjangkau, dan jumlah kompetitor langsung, dengan data contoh', width: 780, height: 1688, frame: 'phone' }, // bukti: scratchpad/loca/layar/site-gulir-ponsel.png (MOCK_MODE)
        more: [
          { name: 'Daftar periksa di lokasi', body: 'Visibilitas, parkir, sisi jalan, laju kendaraan, dan tempat ramai di dekatnya dinilai lewat 20 pertanyaan Ya, Sebagian, atau Tidak.' }, // bukti: lib/siteQualitySurvey.ts:13-97 (5 faktor x 4 pertanyaan, Tidak/Sebagian/Ya)
          { name: 'Asumsi bisnis bertahap', body: 'Modal awal, sewa per tahun, biaya operasional, margin, dan penjualan lewat ojek online diisi langkah demi langkah. Setiap angka ditandai terukur, pendekatan, atau asumsi.' }, // bukti: components/AssumptionWizard.tsx:12-19,184,253-264 (langkah wizard; label Terukur/Proxy/Asumsi)
          { name: 'Kompetitor bisa dirapikan', body: 'Tempat yang salah golongan bisa dipindah atau disembunyikan. Kompetitor yang terlewat ditambah dengan menempel link Maps-nya.' }, // bukti: components/CompetitorEditorDrawer.tsx:182,237,249 ("Sembunyikan", "Tambah kompetitor"); lib/competitorCounts.ts:18
        ],
      },
      {
        role: 'Rapat keputusan',
        title: 'Kesimpulan tampil duluan, lengkap dengan alasannya.', // bukti: components/SiteDossier.tsx:254-303 (bagian 01 sebelum rincian)
        body: 'Halaman lokasi dibuka dengan GO, GO dengan catatan, atau NO GO, lalu faktor yang mengangkat dan menyeret skornya. Angka ini bahan diskusi rapat, bukan pengganti rapatnya.', // bukti: components/TierBadge.tsx:5-11; lib/pdf/site-report.tsx:56,64,71; layar "Pengangkat terbesar / Penyeret terbesar"; reports/temuan-model-skoring.html:152-153 (skor belum jadi dasar keputusan sendiri)
        shot: { file: 'locascore-kesimpulan.v1.webp', alt: 'Halaman kelayakan satu calon lokasi LocaScore: skor 82, status GO, potensi omset, lalu skor per faktor dalam radar dan batang, dengan data contoh', width: 1440, height: 900, frame: 'browser' }, // bukti: scratchpad/loca/layar/site-gulir-desktop.png (MOCK_MODE)
        more: [
          { name: 'Proyeksi tiga skenario', body: 'Penjualan kotor, laba bersih, balik modal, dan ROI tahun pertama dihitung untuk skenario optimis, realistis, dan pesimis.' }, // bukti: components/SiteDossier.tsx:487-563 ("04 Proyeksi Finansial — 3 Skenario"); lib/scoring.ts:387-457; lib/scoringDetail.ts:358
          { name: 'Syarat GO tertulis jelas', body: 'Status GO butuh skor dan masa balik modal yang sama-sama lolos ambang. Tingkat keyakinan datanya ikut tampil.' }, // bukti: lib/scoring.ts:70-73,459-473 (skor dan payback); components/SiteDossier.tsx:290 ("Keyakinan: Rendah/Sedang/Tinggi")
          { name: 'Laporan PDF empat halaman', body: 'Kesimpulan, rincian skor, proyeksi keuangan, serta peta dan kompetitor tersusun dalam PDF untuk investor.' }, // bukti: lib/pdf/site-report.tsx:461,530,570,701 (empat <Page>), :751 ("investor-facing"); belum dirender, lihat laporan
          { name: 'Tautan yang bisa dicabut', body: 'Investor membuka laporan lewat tautan tanpa login. Tautan itu bisa dinonaktifkan kapan saja.' }, // bukti: app/api/sites/[id]/share/route.ts:29-35 (DELETE, publicShareToken null); app/share/[token]/page.tsx; components/ShareModal.tsx:127,139
        ],
      },
      {
        role: 'Banyak kandidat',
        title: 'Satu survei menilai banyak calon lokasi sekaligus.', // bukti: app/(app)/surveys/new/page.tsx:94-168 ("Buat survey & proses N lokasi")
        body: 'Tempel daftar link Google Maps, satu per baris, sampai 100 lokasi. Semuanya diproses lalu tampil dalam satu daftar dengan skor dan statusnya.', // bukti: components/BulkLocationInput.tsx:28-43,123; app/api/collect/check-batch/route.ts:14,65 (batas 100 baris); lib/jobQueue.ts:22
        shot: { file: 'locascore-daftar-lokasi.v1.webp', alt: 'Daftar sembilan calon lokasi LocaScore dengan skor dan status GO, GO with caution, atau NO GO, dengan data contoh', width: 1440, height: 900, frame: 'browser' }, // bukti: scratchpad/loca/layar/sites-desktop.png (MOCK_MODE)
        more: [
          { name: 'Bandingkan berdampingan', body: 'Kandidat satu survei dijajarkan di tabel, radar, dan grafik batang, jadi beda kekuatannya kelihatan sekilas.' }, // bukti: components/CompareView.tsx:100-192 (Table, Radar, Bar, Scoring Detail); app/(app)/surveys/[id]/page.tsx:234,576
          { name: 'Biaya kelihatan sebelum diproses', body: 'Jumlah baris dan perkiraan biaya data muncul begitu daftar ditempel, sebelum satu lokasi pun diproses.' }, // bukti: components/BulkLocationInput.tsx:28,123 ("N baris terdeteksi · estimasi cost ~Rp …")
          { name: 'Folder per area', body: 'Survei mengelompokkan kandidat per area ekspansi, lengkap dengan target jumlah outlet dan progresnya.' }, // bukti: app/(app)/surveys/page.tsx:248 ("Target buka … outlet"); app/(app)/page.tsx ("Progres survei")
        ],
      },
      {
        role: 'Pemilik',
        title: 'Semua calon lokasi terangkum di satu layar.', // bukti: app/(app)/page.tsx (Dashboard, "Ringkasan portofolio")
        body: 'Jumlah lokasi yang lolos, rata-rata skor, dan progres tiap survei terlihat tanpa membuka satu per satu. Aturan penilaiannya tetap di tangan Anda.', // bukti: app/(app)/page.tsx:167-169 (GO/Hati-hati/Tidak layak); app/(app)/settings/page.tsx:153-279
        shot: { file: 'locascore-dashboard.v1.webp', alt: 'Dashboard LocaScore: ringkasan GO, hati-hati, dan tidak layak, skor rata-rata, dua survei aktif, dan lokasi terbaru, dengan data contoh', width: 1440, height: 900, frame: 'browser' }, // bukti: scratchpad/loca/layar/dashboard-desktop.png (MOCK_MODE)
        more: [
          { name: 'Bobot dan ambang sendiri', body: 'Bobot tiap faktor, radius pencarian, skor minimum, dan batas balik modal untuk GO bisa diatur. Begitu disimpan, semua lokasi dinilai ulang.' }, // bukti: app/(app)/settings/page.tsx:153-279 ("Search Radius", "Scoring Weights", "Decision Thresholds"); app/api/settings/route.ts:10-18,36-60
          { name: 'Tagihan Google Maps terpantau', body: 'Perkiraan biaya 30 hari terakhir dan harga per lokasi terlihat di satu halaman, jadi tagihan tidak datang sebagai kejutan.' }, // bukti: app/(app)/usage/page.tsx:62-203 ("This Month Cost", "Total per snapshot"); app/api/usage/route.ts:10-12,57 (perkiraan, jendela 30 hari)
        ],
      },
    ],
    fitsFor: [
      { field: 'Kafe dan kedai kopi', example: 'Kampus, kantor, dan kedai pesaing di sekitar calon lokasi dihitung sebelum sewa diteken.' },
      { field: 'Minimarket dan ritel', example: 'Calon toko dinilai dari kepadatan penduduk, arus jalan, dan jarak ke toko pesaing.' },
      { field: 'Klinik dan apotek', example: 'Banyak calon titik dibandingkan berdampingan menurut faskes lain dan permukiman di sekitarnya.' },
      { field: 'Bengkel dan cuci kendaraan', example: 'Arus kendaraan di depan ruko dan proyeksi balik modal jadi bahan sebelum memilih tempat.' },
    ],
    cta: { eyebrow: 'Sedang memilih lokasi baru?', heading: 'Ceritakan cara tim Anda memilih tempat buka cabang.' },
  },
  'the-global-review': {
    // alternatif heading: 'Redaksi menulis seperti biasa, pembaca mendapat situs baru.' / 'Situs berganti wajah, kebiasaan redaksi tetap.'
    heading: 'Redaksi menulis di tempat yang sama, situsnya berganti wajah.', // bukti: src/lib/wp/articles.ts (konten dibaca dari WordPress); docs/laporan-lengkap.md:68-85
    groups: [
      {
        role: 'Untuk redaksi',
        title: 'Tulisan yang terbit di WordPress langsung sampai ke pembaca.', // bukti: RV:132-149 (terbit, diperbarui, dijadwalkan, ditarik); src/app/api/revalidate/route.ts:98-135
        body: 'WordPress tetap jadi tempat menulis. Begitu tulisan terbit atau diperbarui, halaman yang memuatnya ikut diperbarui, tanpa menunggu developer.', // bukti: RV:41,132-278; docs/panduan-redaksi.md:13 ("biasanya kurang dari 30 detik", perkiraan dokumen, belum diukur)
        shot: { file: 'the-global-review-sorotan.v1.webp', alt: 'Beranda The Global Review: isu utama dengan frasa judul yang disorot kuning, dan kolom Sorotan di sisi kanan', width: 1264, height: 790, frame: 'browser' }, // bukti: _kerja/sampul-v5/papan/tgr-beranda-desktop.png (situs tayang)
        more: [
          { name: 'Sorotan judul sebelum terbit', body: 'Tulisan tanpa frasa sorotan dikembalikan ke draf, lengkap dengan cara membetulkannya. Frasa itu yang tampil berwarna di judul beranda.' }, // bukti: HL:962-985,1237-1315,1376-1377,1394-1456 ("Sorotan Judul wajib diisi sebelum terbit"); docs/panduan-redaksi.md:99-113
          { name: 'Statistik di dalam WordPress', body: 'Klik dari pencarian Google dan kecepatan halaman di HP masuk ke WordPress tiga kali seminggu. Angkanya langsung dari Google, tanpa alat statistik tambahan.' }, // bukti: ST:201,290,374-391,793-824,1242-1261,1284 ("tiap Senin, Kamis, dan Sabtu"); docs/rancangan-analytics.md:18-19,28-29 ("Skrip pelacak di situs: Tidak ada", "tidak perlu banner persetujuan cookie")
          { name: 'Pesan masuk dan pelanggan buletin', body: 'Isi formulir kontak tersimpan di WordPress dan terkirim ke email redaksi. Daftar pelanggan buletin bisa diunduh sebagai CSV.' }, // bukti: HL:2394-2693 ("Pesan Masuk", "Unduh CSV", email "[TGR] {subjek}"); HL:1747-1869 ("Pelanggan Buletin", "Unduh CSV")
        ],
      },
      {
        role: 'Diurus sendiri',
        title: 'Podcast, galeri, dan jajak pendapat diisi redaksi sendiri.', // bukti: HL:32-94,487-489 ("Podcast", "Album Galeri", "Jajak Pendapat")
        body: 'Setiap rubrik punya menunya di WordPress. Episode baru, album foto, atau ulasan buku tayang tanpa menunggu developer.', // bukti: HL:32-94,491 (kotak "Identitas Buku — rubrik Bedah Buku"); RV:41 (post type podcast, album, poll ikut memperbarui situs)
        shot: { file: 'the-global-review-bedah-buku.v1.webp', alt: 'Halaman Bedah Buku The Global Review: ulasan buku utama dengan sampul dan tautan baca ulasan, kolom Terpopuler, dan menu Redaksi, Galeri, serta Podcast di atas', width: 1440, height: 900, frame: 'browser' }, // bukti: _kerja/sampul-v5/papan/tgr-bedah-buku-desktop.png (situs tayang)
        more: [
          { name: 'Pengurus dan susunan redaksi', body: 'Foto, jabatan, dan bio diubah dari WordPress, lalu halaman Pengurus dan Redaksi ikut berubah.' }, // bukti: HL:1999-2158 ("Pengurus & Redaksi", "Jabatan", "Bio"); RV:41 (tgr_orang)
          { name: 'Halaman profil dan kontak', body: 'Isi halaman profil lembaga dan halaman kontak juga diatur dari WordPress, tanpa menyunting kode.' }, // bukti: HL:2710-2717,2827 (kotak "Isi Halaman — Situs Baru" untuk 4 halaman statis)
          { name: 'Jajak pendapat bertanggal tutup', body: 'Redaksi mengisi pertanyaan, pilihan jawaban, dan tanggal tutupnya. Pembaca bisa membagikan poll ke WhatsApp.' }, // bukti: HL:756-904 ("Pertanyaan", "Pilihan jawaban", "Tanggal tutup"), HL:1678-1681; src/components/PollCard.tsx:403 ("Bagikan poll ke WhatsApp")
        ],
      },
      {
        role: 'Untuk pembaca',
        title: 'Arsip rubrik bisa disaring, lalu disimpan sebagai bookmark.', // bukti: src/components/CategoryBrowser.tsx:54-93 ("URL sebagai sumber kebenaran")
        body: 'Pembaca menyaring per penulis dan waktu, lalu mengurutkan dari yang baru atau yang lama. Semua pilihan ikut tersimpan di alamat halaman.', // bukti: src/components/CategoryBrowser.tsx:55-74 (parameter sub, penulis, waktu, urut, page); src/app/api/rubrik/route.ts
        shot: { file: 'the-global-review-arsip.v1.webp', alt: 'Rubrik Geopolitik The Global Review: jumlah artikel, saringan penulis, waktu, dan urutan, lalu daftar artikel dan kolom Terpopuler', width: 1280, height: 800, frame: 'browser' }, // bukti: _kerja/sampul-v5/papan/tgr-geopolitik-desktop.png (situs tayang)
        more: [
          { name: 'Pencarian kenal nama penulis', body: 'Mengetik nama penulis memunculkan tulisannya di urutan atas. Hasilnya keluar di bawah 1 detik, dulu 5 sampai 9 detik.' }, // bukti: commit 1dd94b3 (5-9 detik ke bawah 1 detik, pencarian dibatasi ke judul); commit 55c04b8 (nama penulis, 0,58 dtk); src/lib/wp/articles.ts:194-201,383-419
          { name: 'Mode terang dan gelap', body: 'Tampilan mengikuti pengaturan HP pembaca, dan pilihannya diingat untuk kunjungan berikutnya.' }, // bukti: src/components/ThemeToggle.tsx:25 ("Ganti mode terang/gelap"); public/theme-init.js
          { name: 'Waktu baca dan bacaan lanjutan', body: 'Setiap artikel menampilkan perkiraan menit baca. Di bagian bawah ada tiga tulisan lain dari rubrik yang sama.' }, // bukti: src/lib/articles.ts:113-119 (±200 kata per menit); src/app/[lang]/[slug]/page.tsx:93-100,204-257 ("Lainnya di")
        ],
      },
      {
        role: 'Saat dibagikan',
        title: 'Tautan artikel tampil sebagai kartu besar di WhatsApp.', // bukti: src/app/[lang]/[slug]/opengraph-image.tsx:17-34 (kartu per artikel, JPEG supaya lolos batas pratinjau WhatsApp)
        body: 'Setiap artikel punya kartu 1200 x 630 piksel berisi foto dan logo medianya. Ukurannya dijaga di bawah batas pratinjau WhatsApp.', // bukti: opengraph-image.tsx:28-34,48-56,83-101,151; commit 4c30230 (56-79 KB; batas WhatsApp 600 KB menurut komentar :29-33)
        shot: { file: 'the-global-review-artikel.v1.webp', alt: 'Artikel The Global Review: judul dengan frasa sorotan, penulis, tanggal, menit baca, tombol bagikan, dan foto utama, dengan kolom Terpopuler dan Podcast Terbaru', width: 1264, height: 790, frame: 'browser' }, // bukti: _kerja/sampul-v5/papan/tgr-artikel-desktop.png (situs tayang)
        more: [
          { name: 'Foto tegak tetap utuh', body: 'Foto tegak tidak terpotong di kartu. Fotonya ditaruh utuh di atas latar dari foto yang sama, dibuat buram.' }, // bukti: opengraph-image.tsx:83-101 (foto lebih sempit dari 1,15:1 ditaruh utuh di atas salinan buram)
          { name: 'Alamat lama tetap jalan', body: 'Saat domain pindah ke situs baru, alamat artikel yang masih tayang tetap sama dan email redaksi tetap jalan.' }, // bukti: next.config.ts:60-105 (/{slug} sama dengan permalink lama, /slug/ 308, feed lama dialihkan); docs/peralihan-domain.md:10-18,37-40,141-156 (MX dipindah sebelum cutover 24 Agustus 2026). Catatan: artikel 2022 ke bawah ditarik atas permintaan pemilik.
        ],
      },
    ],
    fitsFor: [
      { field: 'Majalah dan media daring', example: 'Redaksi tetap di WordPress, pembaca mendapat situs baru dengan arsip yang bisa disaring.' },
      { field: 'Lembaga riset', example: 'Publikasi, ulasan buku, dan profil pengurus diisi sendiri dari WordPress.' },
      { field: 'Kampus dan sekolah', example: 'Berita kampus, galeri kegiatan, dan jajak pendapat diisi humas tanpa menunggu developer.' },
      { field: 'Asosiasi dan komunitas profesi', example: 'Kabar anggota, pesan masuk, dan daftar pelanggan buletin dikelola pengurus sendiri.' },
    ],
    cta: { eyebrow: 'Punya arsip tulisan bertahun-tahun?', heading: 'Ceritakan cara redaksi Anda menulis hari ini.' },
  },
  'chicken-wow': {
    // alternatif heading: 'Dari bio Instagram sampai ke gerai, tanpa nyasar.' / 'Pelanggan, calon mitra, dan pelamar tahu harus menghubungi siapa.'
    heading: 'Pembeli, calon mitra, dan pelamar langsung tahu harus ke mana.', // bukti: /info (gerai dan pesan), /kemitraan dan /karier (WhatsApp), page_root.html:519,583,615,721
    groups: [
      {
        role: 'Dari media sosial',
        title: 'Pengunjung dari bio Instagram langsung melihat gerai yang dekat.', // bukti: projects.ts:509 (/info pengganti Linktree di bio Instagram dan TikTok); https://chickenwow.id/info/
        body: 'Halaman /info mengurutkan gerai dari yang dekat ke yang jauh. Jaraknya dihitung di HP pengunjung, dan lokasinya tidak dikirim ke mana pun.', // bukti: info.js:25-30 (haversine, "Posisi pengunjung tidak dikirim ke mana pun"), :74-78 (urut menurut jarak), :180-209 (geolocation di browser)
        shot: { file: 'chicken-wow-gerai-terdekat.v1.webp', alt: 'Halaman info Chicken Wow di ponsel: status buka, daftar gerai yang diurutkan menurut jarak dengan label Terdekat 11 km, tombol Rute, WhatsApp, GoFood, dan ShopeeFood', width: 780, height: 1688, frame: 'phone' }, // bukti: tangkapan Playwright 390x844 @2x, 15 Nov 2026, lokasi diset ke titik publik pusat Surabaya, jam dikunci 12.30 WIB; scratchpad/kat/cw-info.mjs
        more: [
          { name: 'Status buka saat itu', body: 'Jam buka dibaca menurut waktu WIB, jadi pengunjung langsung tahu gerai sedang buka atau sudah tutup.' }, // bukti: info.js:36-58 ("Buka sekarang", "Sudah tutup, buka lagi")
          { name: 'Saring per kota', body: 'Tombol kota menampilkan jumlah gerai di tiap kota, dan daftarnya dibagi per halaman supaya ringan di HP.' }, // bukti: info.js:59-69 (chip kota dan jumlah), :21 (PER_HALAMAN = 4)
          { name: 'Halaman mudah dibagikan', body: 'Satu tombol membagikan halaman lewat menu berbagi HP, atau menyalin tautannya.' }, // bukti: info.js:218-232 (navigator.share, salin tautan)
        ],
      },
      {
        role: 'Pesan online',
        title: 'Tombol pesan ada di setiap halaman.', // bukti: page_root.html:181 (Pesan Sekarang di menu atas), :219-220 (beranda), :398-400 (Menu), :729-752 (footer "Pesan Online")
        body: 'GoFood dan ShopeeFood terpasang di halaman depan, halaman menu, dan kartu tiap gerai. Pelanggan yang lebih suka chat tinggal kirim pesan WhatsApp yang sudah berisi nama gerainya.', // bukti: page_root.html:220,400,752 (gofood.link, shopee.co.id); info.js:22,97-102 ("Halo Chicken Wow {gerai}, saya mau pesan.")
        shot: { file: 'chicken-wow-pesan.v1.webp', alt: 'Halaman depan Chicken Wow: judul Wow Sambelnya, Wow Rasanya, harga mulai 10 ribu, dan tombol GoFood serta ShopeeFood', width: 1080, height: 674, frame: 'browser' }, // bukti: _kerja/sampul-v5/papan/cw-beranda-desktop.png (situs tayang, dipotong sebelum tulisan nomor di kemasan)
        more: [
          { name: 'Rute langsung ke gerai', body: 'Tombol Rute membuka Google Maps ke gerai yang dipilih.' }, // bukti: info.js:24,96
          { name: 'Video Instagram dan TikTok', body: 'Reels dan video TikTok pilihan tampil di halaman depan, jadi konten yang sudah dibuat ikut dilihat pengunjung situs.' }, // bukti: page_root.html:763 (socialPosts, 2 Reels dan 2 TikTok), :993-1025 (embed)
          { name: 'Pesan Sekarang lewat WhatsApp', body: 'Tombol kuning di menu atas membuka obrolan WhatsApp Chicken Wow dari halaman mana pun.' }, // bukti: page_root.html:181,200 (wa.me, desktop dan menu HP)
        ],
      },
      {
        role: 'Di pencarian Google',
        title: 'Menu, Lokasi, Kemitraan, dan Karier kini halaman sungguhan.', // bukti: projects.ts:504 (sebelumnya berujung 404); GET /menu/, /lokasi/, /kemitraan/, /karier/ = 200, 15 Nov 2026
        body: 'Keempatnya dulu berujung 404. Sekarang masing-masing punya alamat, judul, dan deskripsi sendiri, jadi Google bisa mengenalinya satu per satu.', // bukti: <title>, canonical, meta description berbeda per halaman (salinan page_*.html); https://chickenwow.id/sitemap.xml (5 URL)
        shot: { file: 'chicken-wow-menu.v1.webp', alt: 'Halaman Menu Chicken Wow: judul Semua Yang Bikin Nagih, tombol GoFood dan ShopeeFood, dan kartu paket Makan Wow', width: 1120, height: 700, frame: 'browser' }, // bukti: _kerja/sampul-v5/papan/cw-menu-desktop.png (situs tayang, dipotong sebelum tulisan nomor di kemasan)
        more: [
          { name: 'Data gerai untuk Google', body: 'Alamat, jam buka, dan titik peta setiap gerai ditulis dalam format yang dibaca mesin pencari.' }, // bukti: page_root.html:864-891 (Restaurant per gerai: address, openingHoursSpecification, hasMap, geo), :966-972 (ditulis ke halaman)
          { name: 'Kartu pratinjau per halaman', body: 'Tautan yang dibagikan di WhatsApp tampil dengan gambar besar, plus judul dan deskripsi halaman itu sendiri.' }, // bukti: og:title dan og:description per halaman; og:image 1200x630; twitter:card summary_large_image (salinan page_*.html)
          { name: 'Gambar lebih ringan', body: '38 gambar diubah ke WebP, dan total aset turun dari 20,3 MB ke 9,4 MB. Halaman lebih hemat kuota saat dibuka dari HP.' }, // bukti: metrik di projects.ts:479,504 (hanya dari sana)
        ],
      },
      {
        role: 'Mitra dan pelamar',
        title: 'Calon mitra langsung tersambung ke tim lewat WhatsApp.', // bukti: page_root.html:519 ("Ajukan Kemitraan", wa.me), :583 ("Chat Tim Kemitraan"), :615 ("Kirim Pengajuan via WhatsApp")
        body: 'Tombol Ajukan Kemitraan dan Chat Tim Kemitraan membuka obrolan dengan tim. Pertanyaan pertama calon mitra langsung sampai ke orang yang menjawabnya.', // bukti: page_root.html:519,583 (wa.me)
        shot: { file: 'chicken-wow-kemitraan.v1.webp', alt: 'Halaman Kemitraan Chicken Wow: judul Bisnis Ayam Geprek Yang Larisnya Nggak Ada Obat, tombol Ajukan Kemitraan dan Unduh Proposal, dan foto booth gerai', width: 1160, height: 724, frame: 'browser' }, // bukti: _kerja/sampul-v5/papan/cw-kemitraan-desktop.png (situs tayang)
        more: [
          { name: 'Lowongan per kota', body: 'Halaman Karier memuat posisi, kota, dan jenis kerjanya. Lamaran dikirim lewat WhatsApp HRD.' }, // bukti: page_root.html:1153-1158 (daftar lowongan), :698-722 ("Lamar", "Kirim lamaran via WhatsApp", "Chat HRD")
          { name: 'Jawaban untuk pertanyaan umum', body: 'Harga, aplikasi pesan antar, lokasi gerai, dan bentuk kerja sama dijawab di halaman, dan ikut terbaca mesin pencari.' }, // bukti: page_root.html ld+json FAQPage (4 pertanyaan)
        ],
      },
    ],
    fitsFor: [
      { field: 'Jaringan kafe dan resto', example: 'Halaman bio yang mengurutkan cabang dari yang dekat, lengkap dengan tombol pesan antar.' },
      { field: 'Laundry dan jasa antar-jemput', example: 'Pelanggan memilih cabang yang dekat, lalu chat WhatsApp dengan pesan yang sudah terisi.' },
      { field: 'Klinik kecantikan dan barbershop', example: 'Jam buka tiap cabang terbaca Google, dan booking masuk lewat WhatsApp cabang itu.' },
      { field: 'Brand dengan program kemitraan', example: 'Halaman kemitraan dan lowongan yang menyambungkan calon mitra serta pelamar langsung ke tim.' },
    ],
    cta: { eyebrow: 'Pelanggan datang dari Instagram?', heading: 'Ceritakan jalan mereka dari bio sampai ke gerai Anda.' },
  },
};

/**
 * What happens after launch, shown above the call to action on every page that has a catalogue.
 * Both promises are the studio's own, already on the landing page (FAQ in lib/landing/copy.ts)
 * or chosen by Farrez on 15 Nov 2026 (maintenance after launch, data handled under UU PDP).
 */
export const SETELAH_TAYANG: CatalogItem[] = [
  { name: 'Tetap dirawat setelah tayang.', body: 'Sistemnya dipelihara supaya tetap aman dan terawat, dan tim Anda didampingi sampai sistemnya benar-benar dipakai.' },
  { name: 'Data Anda tetap terjaga.', body: 'Data pelanggan dan karyawan Anda diperlakukan sesuai UU PDP: akses dibatasi per peran, setiap perubahan tercatat, dan data yang sensitif disimpan terenkripsi.' },
];

/** Every file the catalogue names, for the tests and the cleanup check. */
export const katalogFiles = (): string[] =>
  Object.values(KATALOG).flatMap((c) => (c ? c.groups.map((g) => g.shot.file) : []));
