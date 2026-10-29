/**
 * The ride model behind RideDeck's simulator scene, ported 1:1 from the app's pure `deck` module
 * (rideDeck-ayam: deck/.../FuelRate.kt, Gearing.kt, FuelTank.kt, ADR 0038) so the numbers on the
 * page come from the same formulas the app runs. The app's own comments mark which constants are
 * from the TVS Ronin 2026 manual and which are assumptions; those labels are kept here.
 *
 * What the app does not have is the drive itself: it reads speed from GPS. The simulator needs a
 * throttle and a brake, so `step` adds the simplest honest version (tractive power from the manual's
 * 15,01 kW, a grip limit, the same drag and rolling terms as the fuel model). That part is this
 * page's, not the app's, and the page says so.
 */

// Gearing.kt: manual PDF p. 127, gear ratios and final drive; top speed 120 km/h in 5th (p. 126).
export const Gearing = {
  RATIOS: [2.917, 1.857, 1.333, 1.05, 0.88],
  PRIMARY: 2.818,
  FINAL: 42 / 13,
  TYRE_CIRCUMFERENCE_M: 1.928,
  LIMITER_RPM: 9000,
  ROLLING_KMH: 3,
  CRUISE_RPM: 3500,
  PULL_RPM: 5000,
  rpm(kmh: number, gear: number): number {
    return (kmh / 3.6 / this.TYRE_CIRCUMFERENCE_M) * 60 * this.FINAL * this.RATIOS[gear - 1] * this.PRIMARY;
  },
  gear(kmh: number, accelG = 0): number {
    if (kmh < this.ROLLING_KMH) return 0;
    const floor = accelG > 0.1 ? this.PULL_RPM : this.CRUISE_RPM;
    for (let g = this.RATIOS.length; g >= 1; g--) {
      const r = this.rpm(kmh, g);
      if (r >= floor && r <= this.LIMITER_RPM) return g;
    }
    return 1;
  },
};

// FuelRate.kt. Manual: kerb 161 kg with 90% fuel, idle 1.300 rpm, 15,01 kW at 7.750 rpm.
export const FuelRate = {
  MASS_KG: 231, // 161 kg + 70 kg rider (assumption)
  CDA_M2: 0.55, // assumption
  CRR: 0.018, // assumption
  AIR_KG_M3: 1.16,
  DRIVE_EFF: 0.9, // assumption
  BSFC_G_PER_KWH: 330, // assumption
  FUEL_KG_PER_L: 0.745,
  IDLE_RPM: 1300,
  IDLE_LPH: 0.2, // assumption
  CUTOFF_KMH: 20,
  MAX_ACCEL_MS2: 4,
  MAX_GRADE_PERCENT: 15,
  G: 9.80665,
  /** Litres per hour at `kmh`, accelerating `accelKmhPerS` (brake negative), on `gradePercent` (downhill negative). */
  lph(kmh: number, accelKmhPerS = 0, gradePercent = 0, burdenKg = 0, burdenCda = 0): number {
    const v = Math.max(0, kmh) / 3.6;
    const a = clamp(accelKmhPerS / 3.6, -this.MAX_ACCEL_MS2, this.MAX_ACCEL_MS2);
    const grade = clamp(gradePercent, -this.MAX_GRADE_PERCENT, this.MAX_GRADE_PERCENT) / 100;
    const mass = this.MASS_KG + burdenKg;
    const gear = Gearing.gear(kmh, a / this.G);
    const rpm = gear === 0 ? this.IDLE_RPM : Math.max(this.IDLE_RPM, Gearing.rpm(kmh, gear));
    const wheelW =
      mass * a * v + 0.5 * this.AIR_KG_M3 * (this.CDA_M2 + burdenCda) * v * v * v + this.CRR * mass * this.G * v + mass * this.G * grade * v;
    if (wheelW < 0 && kmh >= this.CUTOFF_KMH) return 0;
    const friction = (this.IDLE_LPH * rpm) / this.IDLE_RPM;
    const power = wheelW > 0 ? (((wheelW / this.DRIVE_EFF / 1000) * this.BSFC_G_PER_KWH) / 1000) / this.FUEL_KG_PER_L : 0;
    return friction + power;
  },
};

// FuelTank.kt and Garage.kt: 12 L full fill, 35 km/L road-test figure until the owner's own fills say otherwise.
export const FuelTank = {
  CAPACITY_L: 12,
  ROAD_TEST_KM_PER_L: 35,
  BAR_LITERS: [2.7, 3.8, 4.9, 6.1, 6.9, 7.8, 8.6, 9.5, 10.3],
  LAMP_ON_L: 2,
  bars(liters: number): number {
    return this.BAR_LITERS.filter((b) => liters >= b).length;
  },
};

/** The drive: this page's addition. Peak wheel power from the manual's 15,01 kW through the app's drive efficiency. */
export const Drive = {
  PEAK_WHEEL_W: 15010 * FuelRate.DRIVE_EFF,
  /** Longitudinal grip on dry asphalt and in rain (assumptions, typical road tyres). */
  GRIP_DRY_MS2: 3.2,
  GRIP_WET_MS2: 2.0,
  BRAKE_DRY_MS2: 6.5,
  BRAKE_WET_MS2: 3.8,
  TOP_KMH: 120,
  /** How far the page lets the bike lean, either side; the app's dial reads past this. */
  LEAN_MAX_DEG: 45,
};

export type RideInput = {
  /** 0..1, held throttle and brake. */
  gas: number;
  brake: number;
  rain: boolean;
  /** Road grade in percent, uphill positive. */
  gradePercent: number;
  /** Where the rider points the bike, degrees from north, from drag or the phone's sensors. */
  headingDeg: number;
  /** Lean asked for by the rider, degrees, right positive. Only takes effect when rolling. */
  leanDeg: number;
};

export type RideState = {
  kmh: number;
  /** Signed longitudinal acceleration in m/s². */
  accelMs2: number;
  gear: number;
  rpm: number;
  headingDeg: number;
  leanDeg: number;
  /** Lateral acceleration implied by the lean, in g. */
  lateralG: number;
  seconds: number;
  meters: number;
  /** Fuel burnt since the simulator started, litres. */
  litersUsed: number;
  /** Fuel in the tank, litres. */
  tankL: number;
  /** Instantaneous consumption, litres per hour. */
  lph: number;
  brakeLight: boolean;
};

export const START_TANK_L = 11.5;

export function initialRide(): RideState {
  return {
    kmh: 0,
    accelMs2: 0,
    gear: 0,
    rpm: FuelRate.IDLE_RPM,
    headingDeg: 0,
    leanDeg: 0,
    lateralG: 0,
    seconds: 0,
    meters: 0,
    litersUsed: 0,
    tankL: START_TANK_L,
    lph: FuelRate.IDLE_LPH,
    brakeLight: false,
  };
}

/** One tick of `dt` seconds. Pure: returns the next state. */
export function step(s: RideState, inp: RideInput, dt: number): RideState {
  if (!(dt > 0) || !Number.isFinite(dt)) return s;
  const v = s.kmh / 3.6;
  const gas = clamp(inp.gas, 0, 1);
  const brake = clamp(inp.brake, 0, 1);
  const grade = clamp(inp.gradePercent, -FuelRate.MAX_GRADE_PERCENT, FuelRate.MAX_GRADE_PERCENT) / 100;
  const mass = FuelRate.MASS_KG;

  // Tractive accel: power-limited at speed, grip-limited from rest.
  const grip = inp.rain ? Drive.GRIP_WET_MS2 : Drive.GRIP_DRY_MS2;
  const powerA = v > 0.5 ? (gas * Drive.PEAK_WHEEL_W) / (mass * v) : gas * grip;
  const tractive = Math.min(gas * grip, powerA);
  const braking = brake * (inp.rain ? Drive.BRAKE_WET_MS2 : Drive.BRAKE_DRY_MS2);
  const drag = (0.5 * FuelRate.AIR_KG_M3 * FuelRate.CDA_M2 * v * v) / mass;
  const rolling = v > 0 ? FuelRate.CRR * FuelRate.G : 0;
  const slope = FuelRate.G * grade;
  let a = tractive - braking - drag - rolling - slope;
  let v2 = v + a * dt;
  if (v2 < 0) {
    v2 = 0;
    a = -v / dt;
  }
  const top = Drive.TOP_KMH / 3.6;
  if (v2 > top) {
    v2 = top;
    a = (top - v) / dt;
  }
  const kmh = v2 * 3.6;
  const accelKmhPerS = a * 3.6;

  // Lean only makes sense when rolling; it eases toward the request and back upright at rest.
  const wanted = kmh > Gearing.ROLLING_KMH ? clamp(inp.leanDeg, -Drive.LEAN_MAX_DEG, Drive.LEAN_MAX_DEG) : 0;
  const leanDeg = s.leanDeg + (wanted - s.leanDeg) * Math.min(1, dt * 4);
  const lateralG = kmh > Gearing.ROLLING_KMH ? Math.tan((leanDeg * Math.PI) / 180) : 0;

  const lph = FuelRate.lph(kmh, accelKmhPerS, grade * 100);
  const burnt = (lph * dt) / 3600;
  const gear = Gearing.gear(kmh, a / FuelRate.G);
  return {
    kmh,
    accelMs2: a,
    gear,
    rpm: gear === 0 ? FuelRate.IDLE_RPM : Math.max(FuelRate.IDLE_RPM, Gearing.rpm(kmh, gear)),
    headingDeg: wrap360(inp.headingDeg),
    leanDeg,
    lateralG,
    seconds: s.seconds + dt,
    meters: s.meters + ((v + v2) / 2) * dt,
    litersUsed: s.litersUsed + burnt,
    tankL: Math.max(0, s.tankL - burnt),
    lph,
    brakeLight: brake > 0.05,
  };
}

/** Compass points in Indonesian, 8 of them, for a heading in degrees. */
export const COMPASS = ['U', 'TL', 'T', 'TG', 'S', 'BD', 'B', 'BL'] as const;
export function compassPoint(headingDeg: number): (typeof COMPASS)[number] {
  const h = wrap360(headingDeg);
  return COMPASS[Math.round(h / 45) % 8];
}

/** Kilometres left at the app's road-test figure, the way the tank card estimates it before the owner's fills exist. */
export function kmLeft(tankL: number): number {
  return tankL * FuelTank.ROAD_TEST_KM_PER_L;
}

/** mm:ss for the simulator clock. */
export function clock(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

export function wrap360(deg: number): number {
  if (!Number.isFinite(deg)) return 0;
  return ((deg % 360) + 360) % 360;
}

function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, Number.isFinite(x) ? x : 0));
}
