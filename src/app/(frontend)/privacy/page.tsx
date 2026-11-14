/**
 * Privacy policy, Indonesian first and English below on the same URL. Google Auth Platform links here
 * for Cutroach Studio, so section 2 describes how Studio uses Google Drive; update it (and EFFECTIVE)
 * when that changes. Third-party tools are listed from the same env vars that switch them on, so the
 * page never claims a tool that is off or misses one that is on.
 */
import type { Metadata } from 'next';
import { SectionShell } from '../_components/detail/SectionShell';
import { Breadcrumbs } from '../_components/detail/Breadcrumbs';
import { Meta } from '../_components/ui/Meta';
import { CONTACT_EMAIL } from '@/lib/contact-email';
import { TURNSTILE_SITE_KEY } from '@/lib/turnstile';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi | Coderoach',
  description:
    'Data apa yang dikumpulkan situs coderoach.id dan aplikasi Cutroach Studio, untuk apa, dan cara meminta penghapusannya.',
};

const EFFECTIVE = '14 November 2026';

const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';
const USER_DATA_POLICY = 'https://developers.google.com/terms/api-services-user-data-policy';
const GOOGLE_CONNECTIONS = 'https://myaccount.google.com/connections';

type Tools = { ga4: boolean; pixel: boolean; turnstile: boolean; briefEmail: boolean };

function activeTools(): Tools {
  return {
    ga4: Boolean(process.env.NEXT_PUBLIC_GA4_ID),
    pixel: Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID),
    turnstile: Boolean(TURNSTILE_SITE_KEY),
    // Same condition as the Submissions afterChange hook plus the adapter in payload.config.ts.
    briefEmail: Boolean(process.env.RESEND_API_KEY && process.env.RESEND_TO_EMAIL),
  };
}

const analyticsNames = (t: Tools, and: string) =>
  [t.ga4 && 'Google Analytics 4', t.pixel && 'Meta Pixel'].filter(Boolean).join(` ${and} `);

const Mail = () => <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function PrivacyPage() {
  const tools = activeTools();
  return (
    <SectionShell>
      <section className="pt-12 pb-12 border-b border-paper-200">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Kebijakan Privasi' }]} />
          </div>
          <Meta
            parts={['[ PRIVASI ]', `Berlaku sejak ${EFFECTIVE}`]}
            className="font-mono text-xs font-medium tracking-wider text-mist-600 uppercase tabular"
            dotClassName="text-mist-400"
          />
          <h1 className="text-[clamp(40px,6vw,72px)] font-bold tracking-[-0.025em] leading-[1] mt-6 max-w-[16ch] text-balance">
            Kebijakan Privasi
          </h1>
          <p className="text-[18px] leading-[1.6] text-mist-600 mt-6 max-w-[620px] text-pretty">
            Data apa yang kami kumpulkan dan bagaimana kami memakainya, di situs coderoach.id dan di Cutroach Studio,
            aplikasi produksi video internal kami yang tersambung ke Google Drive.
          </p>
          <p className="mt-6 text-[15px]">
            <a href="#en" lang="en" className="text-electric underline underline-offset-2 hover:no-underline">
              Read in English ↓
            </a>
          </p>
        </div>
      </section>

      <article className="py-16">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="prose-coderoach">
            <PolicyId tools={tools} />
          </div>
        </div>
      </article>

      <article id="en" lang="en" className="py-16 border-t border-paper-200 bg-paper-50 scroll-mt-24">
        <div className="max-w-[1180px] mx-auto px-8">
          <Meta
            parts={['[ ENGLISH ]', `Effective ${EFFECTIVE}`]}
            className="font-mono text-xs font-medium tracking-wider text-mist-600 uppercase tabular"
            dotClassName="text-mist-400"
          />
          <h2 className="text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.02em] leading-[1.05] mt-4">
            Privacy Policy
          </h2>
          <div className="prose-coderoach mt-8">
            <PolicyEn tools={tools} />
          </div>
        </div>
      </article>
    </SectionShell>
  );
}

function PolicyId({ tools }: { tools: Tools }) {
  const analytics = analyticsNames(tools, 'dan');
  return (
    <>
      <h2>1. Situs coderoach.id</h2>

      <h3>Formulir brief</h3>
      <p>
        Saat Anda mengirim brief, kami menyimpan email, jenis kebutuhan yang Anda pilih, dan isi brief. Ikut tersimpan
        otomatis: waktu pengiriman, jenis browser (user agent), dan halaman asal Anda. Kalau brief dikirim dari report
        OpsScore, brief itu ditautkan ke hasil OpsScore tersebut.
      </p>
      <p>
        Data ini hanya kami pakai untuk membalas Anda dan menyiapkan penawaran.
        {tools.briefEmail && ' Salinannya dikirim sebagai email notifikasi ke inbox tim kami.'}
      </p>

      <h3>OpsScore</h3>
      <p>OpsScore adalah asesmen gratis di coderoach.id/opsscore. Selama Anda mengisinya, kami menyimpan:</p>
      <ul>
        <li>nama Anda, nama bisnis, link website atau media sosial, industri, jumlah karyawan, dan kisaran omzet;</li>
        <li>jawaban kuis dan skor yang dihitung dari jawaban itu;</li>
        <li>
          sumber kunjungan (parameter UTM, ID klik iklan <code>fbclid</code> atau <code>gclid</code>, dan situs asal),
          jenis browser, serta waktu mulai dan selesai.
        </li>
      </ul>
      <p>
        Jawaban dan profil dikirim ke server kami sedikit demi sedikit selama kuis berjalan, jadi yang sudah Anda isi
        tetap tersimpan walaupun Anda berhenti di tengah.
      </p>
      <p>
        Untuk membuka hasil, Anda mengisi nomor WhatsApp, email bila mau, dan mencentang persetujuan dihubungi lewat
        WhatsApp. Kami memakai nomor itu untuk menghubungi Anda tentang hasil tersebut. Link hasil yang bisa dibagikan
        hanya menampilkan skor, tanpa nama, nomor, atau email.
      </p>

      <h3>Cookie dan penyimpanan di browser</h3>
      <ul>
        <li>
          Cookie <code>opsscore_attr</code>, berlaku 30 hari, dipasang saat halaman OpsScore dibuka. Isinya sumber
          kunjungan di atas, supaya kami tahu kampanye mana yang membawa Anda.
        </li>
        <li>
          Progres kuis OpsScore disimpan di localStorage browser Anda supaya bisa dilanjutkan nanti. Nomor WhatsApp tidak
          pernah disimpan di sana.
        </li>
        <li>sessionStorage menyimpan hal kecil, misalnya bahwa Anda sudah menutup bar pengumuman di atas halaman.</li>
        <li>Cookie login hanya dipakai di halaman admin, oleh tim kami.</li>
      </ul>

      <h3>Analitik</h3>
      {analytics ? (
        <p>
          Kami memakai {analytics} untuk mengukur kunjungan dan efektivitas iklan. Alat itu memasang cookie sendiri dan
          menerima halaman yang Anda buka serta tahapan OpsScore yang Anda lalui, termasuk ID sesi, fase hasil, dan
          kisaran omzet. Nama, nomor WhatsApp, dan email tidak dikirim ke alat itu.
        </p>
      ) : (
        <p>Situs ini tidak memakai Google Analytics, Meta Pixel, atau alat analitik pihak ketiga lainnya.</p>
      )}

      <h3>Pihak lain yang memproses data</h3>
      <ul>
        <li>
          <strong>Cloudflare</strong> mengantarkan situs ini dan menahan lalu lintas berbahaya, sehingga memproses alamat
          IP Anda.
          {tools.turnstile && ' Cloudflare Turnstile juga memeriksa bahwa pengirim formulir adalah manusia.'}
        </li>
        {tools.briefEmail && (
          <li>
            <strong>Resend</strong> mengirim email notifikasi brief ke tim kami.
          </li>
        )}
        {analytics && (
          <li>
            <strong>{[tools.ga4 && 'Google', tools.pixel && 'Meta'].filter(Boolean).join(' dan ')}</strong>, lewat alat
            analitik di atas.
          </li>
        )}
      </ul>
      <p>
        Server kami memakai alamat IP Anda sebentar untuk membatasi jumlah pengiriman formulir. Alamat IP tidak disimpan
        di database.
      </p>
      <p>
        Kami tidak menjual data Anda.
        {tools.pixel
          ? ' Selain lewat Meta Pixel di atas, data Anda tidak dibagikan ke pihak lain untuk iklan.'
          : ' Data Anda tidak dibagikan ke pihak lain untuk iklan.'}
      </p>

      <h3>Berapa lama data disimpan</h3>
      <ul>
        <li>Brief disimpan selama masih dibutuhkan untuk berkomunikasi dengan Anda dan menjalankan proyek.</li>
        <li>
          Sesi OpsScore yang tidak sampai ke pengisian nomor WhatsApp kami hapus setelah lebih dari 12 bulan. Sesi yang
          sudah sampai disimpan sampai Anda meminta dihapus.
        </li>
      </ul>

      <h3>Hak Anda</h3>
      <p>
        Anda bisa meminta salinan, perbaikan, atau penghapusan data Anda kapan saja lewat email ke <Mail />.
      </p>

      <h2>2. Cutroach Studio dan Google Drive</h2>
      <p>
        Cutroach Studio adalah aplikasi internal yang berjalan di komputer Mac milik Coderoach Studio. Tim kami memakainya
        untuk memproduksi video bagi klien. Aplikasi ini tidak ditawarkan ke publik.
      </p>

      <h3>Data Google yang diakses</h3>
      <p>
        Cutroach Studio meminta satu izin saja, yaitu <code className="break-all">{DRIVE_SCOPE}</code>. Dengan izin ini aplikasi hanya bisa
        melihat dan mengubah file serta folder yang dibuatnya sendiri. Aplikasi tidak bisa melihat, membaca, atau mengubah
        file lain di Google Drive Anda, dan tidak mengakses Gmail, kontak, kalender, atau data akun Google lainnya.
      </p>
      <p>Dengan izin itu Cutroach Studio:</p>
      <ul>
        <li>
          membuat folder <code>Cutroach/&lt;nama proyek&gt;/&lt;nama video&gt;</code> di Google Drive Anda;
        </li>
        <li>mengunggah paket posting ke folder itu: video final, gambar cover, dan teks caption;</li>
        <li>
          membaca nama dan ID folder di dalam folder <code>Cutroach</code>, supaya tombol &ldquo;Folder Drive&rdquo;
          membuka folder yang benar;
        </li>
        <li>
          membuat link berbagi untuk folder video (siapa pun yang punya link bisa melihat), supaya Anda bisa
          mengirimkannya ke klien.
        </li>
      </ul>

      <h3>Penyimpanan</h3>
      <ul>
        <li>
          <strong>Token akses Google</strong> hanya disimpan di Mac tempat Cutroach Studio berjalan, di file konfigurasi
          rclone (alat yang dipakai Cutroach Studio untuk mengunggah ke Drive). Token tidak dikirim ke server kami atau ke
          pihak lain, dan tidak ditulis ke log.
        </li>
        <li>
          <strong>Nama folder dan link folder Drive</strong> disimpan di database lokal di Mac yang sama, untuk
          ditampilkan ke tim.
        </li>
        <li>
          <strong>File yang diunggah</strong> tetap berada di Google Drive Anda sampai Anda menghapusnya.
        </li>
      </ul>

      <h3>Penggunaan dan pembagian</h3>
      <ul>
        <li>
          Data yang diterima dari Google API tidak dijual, tidak dipakai untuk iklan, tidak dikirim ke layanan AI, dan
          tidak dipakai untuk melatih model AI.
        </li>
        <li>
          Data itu hanya keluar dari Drive Anda lewat link folder yang Anda pilih sendiri untuk dikirim ke klien. Siapa pun
          yang memegang link itu bisa melihat isi foldernya. Anda bisa mematikan berbagi kapan saja dari Google Drive.
        </li>
        <li>
          Penggunaan dan pemindahan informasi yang diterima dari Google API oleh Cutroach Studio mematuhi{' '}
          <a href={USER_DATA_POLICY}>Kebijakan Data Pengguna Layanan Google API</a>, termasuk persyaratan Limited Use.
        </li>
      </ul>

      <h3>Mencabut akses</h3>
      <ul>
        <li>
          Buka <a href={GOOGLE_CONNECTIONS}>myaccount.google.com/connections</a>, pilih <strong>Cutroach Studio</strong>,
          lalu hapus aksesnya.
        </li>
        <li>
          Hapus folder <code>Cutroach</code> di Google Drive kalau Anda juga ingin menghapus filenya.
        </li>
        <li>
          Token yang tersimpan di Mac dihapus dengan perintah <code>rclone config delete cutroach-drive</code>.
        </li>
      </ul>

      <h2>3. Keamanan</h2>
      <p>
        Kami membatasi akses ke data seminimal yang dibutuhkan. Data formulir dan OpsScore hanya bisa dibuka tim kami lewat
        halaman admin yang memerlukan login. Cutroach Studio hanya berjalan di komputer kami sendiri dan hanya memakai izin{' '}
        <code>drive.file</code>. Meski begitu, tidak ada sistem yang sepenuhnya aman. Kalau ada kejadian yang memengaruhi
        data Anda, kami akan memberi tahu Anda.
      </p>

      <h2>4. Perubahan</h2>
      <p>Kalau kebijakan ini berubah, kami memperbarui halaman ini beserta tanggal berlakunya di atas.</p>

      <h2>5. Kontak</h2>
      <p>
        Pertanyaan tentang privasi: <Mail />.
      </p>
    </>
  );
}

function PolicyEn({ tools }: { tools: Tools }) {
  const analytics = analyticsNames(tools, 'and');
  return (
    <>
      <h2>1. coderoach.id</h2>

      <h3>Brief form</h3>
      <p>
        When you send a brief, we store your email, the kind of work you picked, and the brief itself, together with the
        time it was sent, your browser type (user agent), and the page you came from. A brief sent from an OpsScore report
        is linked to that OpsScore result.
      </p>
      <p>
        We only use this to reply to you and prepare a proposal.
        {tools.briefEmail && ' A copy is sent as a notification email to our team inbox.'}
      </p>

      <h3>OpsScore</h3>
      <p>OpsScore is a free assessment at coderoach.id/opsscore. While you take it, we store:</p>
      <ul>
        <li>your name, business name, website or social link, industry, team size, and revenue band;</li>
        <li>your answers and the scores calculated from them;</li>
        <li>
          where the visit came from (UTM parameters, the ad click IDs <code>fbclid</code> or <code>gclid</code>, and the
          referring site), your browser type, and when you started and finished.
        </li>
      </ul>
      <p>
        Answers and profile details are sent to our server as you go, so what you have entered is kept even if you stop
        partway.
      </p>
      <p>
        To unlock the result you enter a WhatsApp number, an email if you like, and tick consent to be contacted on
        WhatsApp. We use that number to contact you about the result. The shareable result link shows scores only, with no
        name, number, or email.
      </p>

      <h3>Cookies and browser storage</h3>
      <ul>
        <li>
          The <code>opsscore_attr</code> cookie lasts 30 days and is set when an OpsScore page opens. It holds the visit
          source above so we know which campaign brought you.
        </li>
        <li>
          OpsScore progress is kept in your browser&apos;s localStorage so you can pick up where you left off. Your
          WhatsApp number is never stored there.
        </li>
        <li>sessionStorage keeps small things, such as having closed the announcement bar at the top of the page.</li>
        <li>Login cookies are used only on the admin pages, by our team.</li>
      </ul>

      <h3>Analytics</h3>
      {analytics ? (
        <p>
          We use {analytics} to measure visits and ad performance. These tools set their own cookies and receive the pages
          you open and the OpsScore steps you complete, including the session ID, result phase, and revenue band. Your
          name, WhatsApp number, and email are not sent to them.
        </p>
      ) : (
        <p>This site does not use Google Analytics, Meta Pixel, or any other third-party analytics.</p>
      )}

      <h3>Others who process data</h3>
      <ul>
        <li>
          <strong>Cloudflare</strong> delivers this site and blocks harmful traffic, so it processes your IP address.
          {tools.turnstile && ' Cloudflare Turnstile also checks that whoever sends a form is a person.'}
        </li>
        {tools.briefEmail && (
          <li>
            <strong>Resend</strong> sends brief notification emails to our team.
          </li>
        )}
        {analytics && (
          <li>
            <strong>{[tools.ga4 && 'Google', tools.pixel && 'Meta'].filter(Boolean).join(' and ')}</strong>, through the
            analytics tools above.
          </li>
        )}
      </ul>
      <p>
        Our server briefly uses your IP address to limit how many forms can be sent. IP addresses are not stored in the
        database.
      </p>
      <p>
        We do not sell your data.
        {tools.pixel
          ? ' Apart from Meta Pixel above, it is not shared with others for advertising.'
          : ' It is not shared with others for advertising.'}
      </p>

      <h3>How long data is kept</h3>
      <ul>
        <li>Briefs are kept for as long as we need them to talk with you and run the project.</li>
        <li>
          OpsScore sessions that never reach the WhatsApp step are deleted once they are more than 12 months old. Sessions
          that do are kept until you ask us to delete them.
        </li>
      </ul>

      <h3>Your rights</h3>
      <p>
        You can ask for a copy of your data, a correction, or its deletion at any time by emailing <Mail />.
      </p>

      <h2>2. Cutroach Studio and Google Drive</h2>
      <p>
        Cutroach Studio is an internal app that runs on a Mac owned by Coderoach Studio. Our team uses it to produce videos
        for clients. It is not offered to the public.
      </p>

      <h3>Google data accessed</h3>
      <p>
        Cutroach Studio requests a single scope, <code className="break-all">{DRIVE_SCOPE}</code>. With it, the app can only see and change files
        and folders it created itself. It cannot see, read, or change any other files in your Google Drive, and it does not
        access Gmail, contacts, calendar, or any other Google account data.
      </p>
      <p>With that scope Cutroach Studio:</p>
      <ul>
        <li>
          creates folders named <code>Cutroach/&lt;project&gt;/&lt;video&gt;</code> in your Google Drive;
        </li>
        <li>uploads the posting package to that folder: the final video, the cover image, and the caption text;</li>
        <li>
          reads folder names and IDs inside the <code>Cutroach</code> folder so that &ldquo;Folder Drive&rdquo; opens the
          right folder;
        </li>
        <li>creates an &ldquo;anyone with the link can view&rdquo; sharing link for a video folder so you can send it to a client.</li>
      </ul>

      <h3>Storage</h3>
      <ul>
        <li>
          <strong>The Google access token</strong> is stored only on the Mac running Cutroach Studio, in the configuration
          file of rclone (the tool Cutroach Studio uses to upload to Drive). It is never sent to our servers or to anyone
          else, and never written to logs.
        </li>
        <li>
          <strong>Drive folder names and folder links</strong> are stored in a local database on the same Mac so the team
          can see them.
        </li>
        <li>
          <strong>Uploaded files</strong> stay in your Google Drive until you delete them.
        </li>
      </ul>

      <h3>Use and sharing</h3>
      <ul>
        <li>
          Data received from Google APIs is not sold, not used for advertising, not sent to AI services, and not used to
          train AI models.
        </li>
        <li>
          The only way it leaves your Drive is through a folder link that you choose to send to a client. Anyone who has
          that link can view the folder. You can turn sharing off in Google Drive at any time.
        </li>
        <li>
          Cutroach Studio&apos;s use and transfer of information received from Google APIs adheres to the{' '}
          <a href={USER_DATA_POLICY}>Google API Services User Data Policy</a>, including the Limited Use requirements.
        </li>
      </ul>

      <h3>Revoking access</h3>
      <ul>
        <li>
          Go to <a href={GOOGLE_CONNECTIONS}>myaccount.google.com/connections</a>, select <strong>Cutroach Studio</strong>,
          and remove access.
        </li>
        <li>
          Delete the <code>Cutroach</code> folder in Google Drive if you also want the files gone.
        </li>
        <li>
          Remove the token stored on the Mac with <code>rclone config delete cutroach-drive</code>.
        </li>
      </ul>

      <h2>3. Security</h2>
      <p>
        We keep data access to the minimum needed. Form and OpsScore data can only be opened by our team through admin
        pages that require a login. Cutroach Studio runs only on our own computers and uses only the{' '}
        <code>drive.file</code> scope. No system is completely secure, though. If an incident affects your data, we will
        tell you.
      </p>

      <h2>4. Changes</h2>
      <p>If this policy changes, we will update this page and the effective date above.</p>

      <h2>5. Contact</h2>
      <p>
        Privacy questions: <Mail />.
      </p>
    </>
  );
}
