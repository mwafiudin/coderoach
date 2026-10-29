import { clock, compassPoint, FuelTank, kmLeft, type RideState } from '@/lib/portfolio/ridedeck-sim';
import { Segments } from './Segments';

const fmt = (n: number, digits: number) => n.toFixed(digits);
const pad = (s: string, width: number) => s.padStart(width, ' ');

function Tape({ tone, children }: { tone: string; children: React.ReactNode }) {
  return <span className={`rd-tape ${tone}`}>{children}</span>;
}

/**
 * The dashboard cards the simulator drives, drawn with the page's own segment and tape parts so
 * they read like the app's cards: numbers from segments, labels on tape, one black window each.
 * Everything shown is the ride model's output for this moment.
 */
export function SimCards({ s, rain }: { s: RideState; rain: boolean }) {
  const pct = (s.tankL / FuelTank.CAPACITY_L) * 100;
  const bars = FuelTank.bars(s.tankL);
  const lean = Math.round(s.leanDeg);
  const g = Math.hypot(s.accelMs2 / 9.80665, s.lateralG);
  return (
    <div className="rd-sim__cards" aria-live="off">
      <div className="rd-window rd-sim__card">
        <div className="flex items-center justify-between gap-3">
          <Tape tone="rd-tape--green">Kecepatan</Tape>
          <span className="rd-sim__gear">
            Gigi <strong>{s.gear === 0 ? 'N' : s.gear}</strong> · {Math.round(s.rpm)} rpm
          </span>
        </div>
        <div className="rd-window__readout">
          <Segments text={pad(String(Math.round(s.kmh)), 3)} label={`Kecepatan ${Math.round(s.kmh)} km per jam`} />
          <span className="rd-unit">km/jam</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rd-window rd-sim__card">
          <Tape tone="rd-tape--amber">Lean</Tape>
          <svg className="rd-sim__dial" viewBox="0 0 100 60" role="img" aria-label={`Kemiringan ${lean} derajat`}>
            <path d="M8 56 A46 46 0 0 1 92 56" fill="none" stroke="#2a2d30" strokeWidth="6" strokeLinecap="round" />
            <path d="M8 56 A46 46 0 0 1 92 56" fill="none" stroke="#ffb000" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${Math.abs(lean) * 1.6} 300`} strokeDashoffset={lean < 0 ? 0 : -72 + Math.abs(lean) * 1.6} />
            <line x1="50" y1="56" x2={50 + 40 * Math.sin((lean * Math.PI) / 180)} y2={56 - 40 * Math.cos((lean * Math.PI) / 180)} stroke="#e9ebec" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <p className="rd-sim__value">
            {lean > 0 ? '+' : ''}
            {lean}°
          </p>
        </div>
        <div className="rd-window rd-sim__card">
          <Tape tone="rd-tape--black">Gaya g</Tape>
          <svg className="rd-sim__dial" viewBox="0 0 100 60" role="img" aria-label={`Gaya g ${fmt(g, 2)}`}>
            <circle cx="50" cy="32" r="26" fill="none" stroke="#2a2d30" strokeWidth="2" />
            <line x1="24" y1="32" x2="76" y2="32" stroke="#2a2d30" strokeWidth="1" />
            <line x1="50" y1="6" x2="50" y2="58" stroke="#2a2d30" strokeWidth="1" />
            <rect x={48 + Math.max(-1, Math.min(1, s.lateralG)) * 22} y={30 - Math.max(-1, Math.min(1, s.accelMs2 / 9.80665)) * 22} width="4" height="4" fill="#3ddc5a" />
          </svg>
          <p className="rd-sim__value">{fmt(g, 2)} g</p>
        </div>
      </div>

      <div className="rd-window rd-sim__card">
        <div className="flex items-center justify-between gap-3">
          <Tape tone="rd-tape--black">Kompas</Tape>
          <span className="rd-sim__gear">arah khayal</span>
        </div>
        <div className="rd-sim__compass" aria-label={`Arah ${Math.round(s.headingDeg)} derajat, ${compassPoint(s.headingDeg)}`}>
          <div className="rd-sim__compass-strip" style={{ transform: `translateX(${-(s.headingDeg / 360) * 50}%)` }}>
            {['U', 'TL', 'T', 'TG', 'S', 'BD', 'B', 'BL', 'U', 'TL', 'T', 'TG', 'S', 'BD', 'B', 'BL', 'U'].map((p, i) => (
              <span key={i}>{p}</span>
            ))}
          </div>
          <span className="rd-sim__compass-needle" />
        </div>
        <p className="rd-sim__value">
          {Math.round(s.headingDeg)}° {compassPoint(s.headingDeg)}
        </p>
      </div>

      <div className="rd-window rd-sim__card">
        <div className="flex items-center justify-between gap-3">
          <Tape tone="rd-tape--amber">Tangki bensin</Tape>
          <span className="rd-sim__gear">{fmt(s.lph, 2)} L/jam</span>
        </div>
        <div className="rd-sim__tank">
          {[...Array(9)].map((_, i) => (
            <span key={i} className={i < bars ? 'on' : ''} />
          ))}
        </div>
        <dl className="rd-sim__grid">
          <div>
            <dt>Liter</dt>
            <dd>{fmt(s.tankL, 2)}</dd>
          </div>
          <div>
            <dt>Persen</dt>
            <dd>{Math.round(pct)}</dd>
          </div>
          <div>
            <dt>Km lagi</dt>
            <dd>{Math.round(kmLeft(s.tankL))}</dd>
          </div>
          <div>
            <dt>Terpakai</dt>
            <dd>{Math.round(s.litersUsed * 1000)} mL</dd>
          </div>
          <div>
            <dt>Jarak</dt>
            <dd>{fmt(s.meters / 1000, 2)} km</dd>
          </div>
          <div>
            <dt>Waktu</dt>
            <dd>{clock(s.seconds)}</dd>
          </div>
        </dl>
      </div>

      <div className="rd-window rd-sim__card">
        <div className="flex items-center justify-between gap-3">
          <Tape tone={rain ? 'rd-tape--red' : 'rd-tape--green'}>{rain ? 'Mode Hujan' : 'Cuaca'}</Tape>
          <span className="rd-sim__gear">{s.brakeLight ? 'lampu rem menyala' : 'lampu rem padam'}</span>
        </div>
        <p className="m-0 mt-3 text-[14px] leading-[1.5] rd-dim">
          {rain ? 'Aspal basah, jarak rem lebih panjang. Di app, Mode Hujan mengunci layar dari sentuhan air.' : 'Cerah, aspal kering.'}
        </p>
      </div>
    </div>
  );
}
