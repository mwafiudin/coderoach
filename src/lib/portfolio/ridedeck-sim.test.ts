import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { clock, compassPoint, Drive, FuelRate, FuelTank, Gearing, initialRide, kmLeft, step, wrap360, type RideInput } from './ridedeck-sim';

const near = (a: number, b: number, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} vs ${b}`);
const idle: RideInput = { gas: 0, brake: 0, rain: false, gradePercent: 0, headingDeg: 0, leanDeg: 0 };

describe('Gearing (port of Gearing.kt)', () => {
  test('rpm in 5th at 60 km/h, worked by hand from the manual ratios', () => {
    // 60/3.6 = 16,667 m/s; / 1,928 m = 8,644 rev/s; x60 = 518,67 rpm wheel; x3,2308 x0,88 x2,818 = 4155,6
    near(Gearing.rpm(60, 5), 4155.6, 1);
  });
  test('neutral below 3 km/h, 5th at a 60 km/h cruise, lower gear when pulling', () => {
    assert.equal(Gearing.gear(0), 0);
    assert.equal(Gearing.gear(2.9), 0);
    assert.equal(Gearing.gear(60), 5);
    // Pulling needs 5000 rpm: 4th at 60 gives 4155,6 x 1,05/0,88 = 4958 (too low), 3rd gives 6296 (ok).
    assert.equal(Gearing.gear(60, 0.3), 3);
  });
  test('at walking pace every gear is below the floor, so 1st', () => {
    assert.equal(Gearing.gear(5), 1);
  });
});

describe('FuelRate (port of FuelRate.kt)', () => {
  test('standing still burns only idle friction, 0,20 L/h', () => {
    near(FuelRate.lph(0), 0.2);
  });
  test('60 km/h steady on the flat, worked by hand', () => {
    // v = 16,667. drag = 0,5*1,16*0,55*v^3 = 0,319*4629,6 = 1476,9 W; rolling = 0,018*231*9,80665*v = 679,6 W.
    // wheel 2156,5 W / 0,9 = 2396,1 W = 2,3961 kW x 330 g/kWh = 790,7 g/h = 1,0613 L/h.
    // friction at 4155,6 rpm = 0,2 * 4155,6/1300 = 0,6393. Total 1,7006.
    near(FuelRate.lph(60), 1.7006, 0.002);
  });
  test('engine braking above the cutoff cuts fuel to zero; below it idle friction remains', () => {
    assert.equal(FuelRate.lph(60, -10), 0);
    assert.ok(FuelRate.lph(10, -10) > 0);
  });
  test('uphill costs more than flat, downhill coasting costs nothing', () => {
    assert.ok(FuelRate.lph(40, 0, 8) > FuelRate.lph(40));
    assert.equal(FuelRate.lph(40, 0, -12), 0);
  });
  test('acceleration and grade are clamped like the app does', () => {
    near(FuelRate.lph(40, 100), FuelRate.lph(40, FuelRate.MAX_ACCEL_MS2 * 3.6));
    near(FuelRate.lph(40, 0, 99), FuelRate.lph(40, 0, FuelRate.MAX_GRADE_PERCENT));
  });
});

describe('FuelTank', () => {
  test('bars count thresholds the way the app lights them', () => {
    assert.equal(FuelTank.bars(0), 0);
    assert.equal(FuelTank.bars(2.7), 1);
    assert.equal(FuelTank.bars(11.5), 9);
  });
  test('km left uses the road-test figure', () => {
    assert.equal(kmLeft(2), 70);
  });
});

describe('step (the drive, this page\'s own)', () => {
  const run = (inp: Partial<RideInput>, seconds: number, from = initialRide()) => {
    let s = from;
    const dt = 1 / 30;
    for (let t = 0; t < seconds; t += dt) s = step(s, { ...idle, ...inp }, dt);
    return s;
  };
  test('full throttle from rest for 10 s gets moving, burns fuel, covers distance', () => {
    const s = run({ gas: 1 }, 10);
    assert.ok(s.kmh > 50 && s.kmh < 110, String(s.kmh));
    assert.ok(s.litersUsed > 0.003 && s.litersUsed < 0.02, String(s.litersUsed));
    assert.ok(s.meters > 100, String(s.meters));
    near(s.tankL, 11.5 - s.litersUsed);
    near(s.seconds, 10, 0.05);
  });
  test('never exceeds the manual top speed', () => {
    assert.ok(run({ gas: 1 }, 120).kmh <= Drive.TOP_KMH + 1e-9);
  });
  test('braking stops at zero, never negative, and lights the brake lamp', () => {
    const moving = run({ gas: 1 }, 6);
    const s = run({ brake: 1 }, 10, moving);
    assert.equal(s.kmh, 0);
    assert.equal(s.brakeLight, true);
    assert.equal(run({}, 1).brakeLight, false);
  });
  test('rain lengthens the stop', () => {
    const moving = run({ gas: 1 }, 6);
    const dry = step(moving, { ...idle, brake: 1 }, 1);
    const wet = step(moving, { ...idle, brake: 1, rain: true }, 1);
    assert.ok(wet.kmh > dry.kmh);
  });
  test('lean follows the request only while rolling, and implies lateral g', () => {
    const still = run({ leanDeg: 30 }, 2);
    assert.equal(still.leanDeg, 0);
    assert.equal(still.lateralG, 0);
    const moving = run({ gas: 1, leanDeg: 30 }, 6);
    assert.ok(moving.leanDeg > 25 && moving.leanDeg <= 30, String(moving.leanDeg));
    near(moving.lateralG, Math.tan((moving.leanDeg * Math.PI) / 180));
    assert.ok(run({ gas: 1, leanDeg: 80 }, 6).leanDeg <= Drive.LEAN_MAX_DEG);
  });
  test('heading wraps and bad inputs do nothing', () => {
    assert.equal(run({ headingDeg: 370 }, 0.1).headingDeg, 10);
    assert.equal(run({ headingDeg: -90 }, 0.1).headingDeg, 270);
    const s = initialRide();
    assert.deepEqual(step(s, idle, 0), s);
    assert.deepEqual(step(s, idle, Number.NaN), s);
    assert.equal(step(s, { ...idle, gas: Number.NaN, brake: Number.POSITIVE_INFINITY }, 1).kmh, 0);
  });
});

describe('readouts', () => {
  test('compass points in Indonesian, 45 degrees apart, rounding to the nearest', () => {
    assert.equal(compassPoint(0), 'U');
    assert.equal(compassPoint(44), 'TL');
    assert.equal(compassPoint(90), 'T');
    assert.equal(compassPoint(180), 'S');
    assert.equal(compassPoint(270), 'B');
    assert.equal(compassPoint(359), 'U');
    assert.equal(compassPoint(-45), 'BL');
  });
  test('clock and wrap', () => {
    assert.equal(clock(0), '00:00');
    assert.equal(clock(125.9), '02:05');
    assert.equal(wrap360(720.5), 0.5);
    assert.equal(wrap360(Number.NaN), 0);
  });
});
