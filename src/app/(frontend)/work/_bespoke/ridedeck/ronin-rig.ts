import {
  ACESFilmicToneMapping,
  AmbientLight,
  CircleGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PointLight,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { RIDEDECK_DIR, RIDEDECK_FILES as F } from '@/lib/portfolio/ridedeck';
import { Drive, initialRide, step, wrap360, type RideInput, type RideState } from '@/lib/portfolio/ridedeck-sim';

// Joints from the app's RideSim.kt (bike space: front +X, up +Y, rider's right +Z, metres):
// wheelbase 1357 mm, caster 27°, tyre radii from the manual.
const AXLE_REAR = new Vector3(-0.6, 0.307, 0);
const AXLE_FRONT = new Vector3(0.757, 0.293, 0);
const RAKE = (27 * Math.PI) / 180;
const WHEEL_R_REAR = 0.307;
const WHEEL_R_FRONT = 0.293;
/** The app draws the steering angle three times its real value, because real road angles are invisible. */
const STEER_VIEW_GAIN = 3;
const STEER_MAX = (35 * Math.PI) / 180;
const GRAPHITE = 0x6b7177;

const DEG = Math.PI / 180;

export type RigHandle = {
  /** The page writes the rider's inputs here; the loop reads them every frame. */
  input: RideInput;
  /** Latest state, for the cards. */
  state: RideState;
  reset: () => void;
  dispose: () => void;
};

type Options = { onState: (s: RideState) => void; onReady: () => void };

const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
const clay = new MeshStandardMaterial({ color: GRAPHITE, metalness: 0.45, roughness: 0.42 });

async function part(name: string, material: MeshStandardMaterial = clay): Promise<Object3D> {
  const gltf = await loader.loadAsync(`${RIDEDECK_DIR}/${name}`);
  gltf.scene.traverse((o) => {
    if (o instanceof Mesh) {
      for (const m of [o.material].flat()) m.dispose();
      o.material = material;
    }
  });
  return gltf.scene;
}

/**
 * The Ronin assembled the way the app assembles it, driven by the page's ride model. Heading turns
 * the whole bike (the camera stays), lean rolls it about its forward axis through the tyre contact
 * line, the front end steers on the raked axis, wheels spin with the road speed, and the brake lamp
 * lights when the brake is held. Drawing stops when the scene is off screen.
 */
export async function mountRig(host: HTMLElement, { onState, onReady }: Options): Promise<RigHandle> {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  const canvas = renderer.domElement;
  canvas.className = 'rd-sim__canvas';
  canvas.setAttribute('aria-hidden', 'true');

  const scene = new Scene();
  scene.add(new HemisphereLight(0xe9ebec, 0x16181a, 1.3));
  scene.add(new AmbientLight(0x3a3f44, 0.6));
  const key = new DirectionalLight(0xffffff, 2.4);
  key.position.set(3, 4, 2.5);
  scene.add(key);
  const rim = new DirectionalLight(0xffb000, 1.1);
  rim.position.set(-3, 1.5, -2.5);
  scene.add(rim);

  // Floor: a dark disc that turns glossy in the rain.
  const floorMat = new MeshStandardMaterial({ color: 0x101214, metalness: 0.1, roughness: 0.9 });
  const floor = new Mesh(new CircleGeometry(3.2, 48), floorMat);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const camera = new PerspectiveCamera(30, 1, 0.1, 50);
  const target = new Vector3(0.1, 0.55, 0);
  camera.position.set(2.9, 1.45, 3.1);
  camera.lookAt(target);

  const headingNode = new Group();
  const rollNode = new Group();
  const pitchNode = new Group();
  headingNode.add(rollNode);
  rollNode.add(pitchNode);
  scene.add(headingNode);

  const brakeMat = new MeshStandardMaterial({ color: 0xff2a1a, emissive: 0xff2a1a, emissiveIntensity: 1.6, roughness: 0.4 });
  const tailMat = new MeshStandardMaterial({ color: 0x7a1a14, emissive: 0x7a1a14, emissiveIntensity: 0.6, roughness: 0.4 });
  const headMat = new MeshStandardMaterial({ color: 0xfff4c8, emissive: 0xfff4c8, emissiveIntensity: 1.2, roughness: 0.3 });

  const [body, tail, brake, wheelRearMesh, steer, head, wheelFrontMesh] = await Promise.all([
    part(F.rigBody),
    part(F.rigLightTail, tailMat),
    part(F.rigLightBrake, brakeMat),
    part(F.rigWheelRear),
    part(F.rigSteer),
    part(F.rigLightHead, headMat),
    part(F.rigWheelFront),
  ]);
  brake.visible = false;
  pitchNode.add(body, tail, brake);
  const wheelRear = new Group();
  wheelRear.position.copy(AXLE_REAR);
  wheelRear.add(wheelRearMesh);
  pitchNode.add(wheelRear);

  const fork = new Group();
  fork.position.copy(AXLE_FRONT);
  fork.rotation.z = RAKE;
  const steerNode = new Group();
  const unrake = new Group();
  unrake.rotation.z = -RAKE;
  const wheelFront = new Group();
  unrake.add(steer, head, wheelFront);
  wheelFront.add(wheelFrontMesh);
  steerNode.add(unrake);
  fork.add(steerNode);
  pitchNode.add(fork);

  // The wheels sit on y = 0 in bike space; the lean pivot is the contact line, i.e. the X axis itself.
  const brakeGlow = new PointLight(0xff2a1a, 0, 1.2);
  brakeGlow.position.set(-1.05, 0.72, 0);
  pitchNode.add(brakeGlow);

  host.appendChild(canvas);
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  resize();
  const sizes = new ResizeObserver(resize);
  sizes.observe(host);

  const handle: RigHandle = {
    input: { gas: 0, brake: 0, rain: false, gradePercent: 0, headingDeg: 0, leanDeg: 0 },
    state: initialRide(),
    reset: () => {
      handle.state = initialRide();
      handle.input.gas = 0;
      handle.input.brake = 0;
      handle.input.gradePercent = 0;
      handle.input.leanDeg = 0;
      onState(handle.state);
    },
    dispose: () => {},
  };

  let frame = 0;
  let last = 0;
  let spinRear = 0;
  let spinFront = 0;
  const draw = (now: number) => {
    const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
    last = now;
    const inp = handle.input;
    const s = (handle.state = dt > 0 ? step(handle.state, inp, dt) : handle.state);

    headingNode.rotation.y = -wrap360(s.headingDeg) * DEG;
    rollNode.rotation.x = s.leanDeg * DEG;
    pitchNode.rotation.z = -Math.atan(inp.gradePercent / 100) * 0.6 - s.accelMs2 * 0.004;
    const v = s.kmh / 3.6;
    spinRear = (spinRear - (v * dt) / WHEEL_R_REAR) % (Math.PI * 2);
    spinFront = (spinFront - (v * dt) / WHEEL_R_FRONT) % (Math.PI * 2);
    wheelRear.rotation.z = spinRear;
    wheelFront.rotation.z = spinFront;
    // Counter-steer look: the bars turn into the lean, exaggerated like the app does.
    const steerDeg = Math.max(-STEER_MAX, Math.min(STEER_MAX, s.leanDeg * 0.12 * STEER_VIEW_GAIN * DEG));
    steerNode.rotation.y = steerDeg;
    brake.visible = s.brakeLight;
    brakeGlow.intensity = s.brakeLight ? 2.5 : 0;
    floorMat.roughness = inp.rain ? 0.25 : 0.9;
    floorMat.metalness = inp.rain ? 0.5 : 0.1;

    renderer.render(scene, camera);
    onState(s);
    frame = requestAnimationFrame(draw);
  };
  const seen = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !frame) {
      last = 0;
      frame = requestAnimationFrame(draw);
    }
    if (!entry.isIntersecting && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  });
  seen.observe(host);
  renderer.render(scene, camera);
  onReady();

  handle.dispose = () => {
    cancelAnimationFrame(frame);
    seen.disconnect();
    sizes.disconnect();
    scene.traverse((o) => {
      if (o instanceof Mesh) o.geometry.dispose();
    });
    for (const m of [clay, brakeMat, tailMat, headMat, floorMat]) m.dispose();
    renderer.dispose();
    canvas.remove();
  };
  return handle;
}
