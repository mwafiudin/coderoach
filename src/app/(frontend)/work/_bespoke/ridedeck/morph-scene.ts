import {
  ACESFilmicToneMapping,
  BufferAttribute,
  BufferGeometry,
  Group,
  HemisphereLight,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';
import { RIDEDECK_DIR, RIDEDECK_FILES as F } from '@/lib/portfolio/ridedeck';
import { morphPhases, phonePoint, PHONE, smoothstep } from '@/lib/portfolio/ridedeck-morph';

const AXLE_REAR = new Vector3(-0.6, 0.307, 0);
const AXLE_FRONT = new Vector3(0.757, 0.293, 0);
const RAKE = (27 * Math.PI) / 180;
const COUNT = 12000;

type Options = { onReady: () => void };

/**
 * The bike becomes the phone. Every surface point of the Ronin gets a place on a phone silhouette
 * (its edge, and three card outlines inside) and a delay by its distance from the front hub, so the
 * dissolve starts there and sweeps back. Scroll progress `--p` of the enclosing scene drives it; no
 * clock. Returns the cleanup.
 */
export async function mountMorph(host: HTMLElement, { onReady }: Options): Promise<() => void> {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  const canvas = renderer.domElement;
  canvas.className = 'rd-morph__canvas';
  canvas.setAttribute('aria-hidden', 'true');

  const scene = new Scene();
  scene.add(new HemisphereLight(0xe9ebec, 0x16181a, 1.4));
  const key = new DirectionalLight(0xffffff, 2.4);
  key.position.set(3, 4, 2.5);
  scene.add(key);
  const rim = new DirectionalLight(0xffb000, 1.1);
  rim.position.set(-3, 1.5, -2.5);
  scene.add(rim);

  const camera = new PerspectiveCamera(30, 1, 0.1, 50);
  const target = new Vector3(0.05, 0.75, 0);
  camera.position.set(2.6, 1.4, 3.3);
  camera.lookAt(target);

  const clay = new MeshStandardMaterial({ color: 0x6b7177, metalness: 0.45, roughness: 0.42, transparent: true });
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const load = async (name: string) => {
    const g = await loader.loadAsync(`${RIDEDECK_DIR}/${name}`);
    g.scene.traverse((o) => {
      if (o instanceof Mesh) {
        for (const m of [o.material].flat()) m.dispose();
        o.material = clay;
      }
    });
    return g.scene;
  };
  const [body, steer, wf, wr] = await Promise.all([load(F.rigBody), load(F.rigSteer), load(F.rigWheelFront), load(F.rigWheelRear)]);
  const bike = new Group();
  bike.add(body);
  wr.position.copy(AXLE_REAR);
  bike.add(wr);
  const fork = new Group();
  fork.position.copy(AXLE_FRONT);
  fork.rotation.z = RAKE;
  const unrake = new Group();
  unrake.rotation.z = -RAKE;
  unrake.add(steer, wf);
  fork.add(unrake);
  bike.add(fork);
  scene.add(bike);
  bike.updateMatrixWorld(true);

  // Sample the surfaces, weighted by area across all parts.
  const meshes: Mesh[] = [];
  bike.traverse((o) => {
    if (o instanceof Mesh) meshes.push(o);
  });
  const samplers = meshes.map((m) => ({ m, s: new MeshSurfaceSampler(m).build(), area: m.geometry.getAttribute('position').count }));
  const totalArea = samplers.reduce((n, x) => n + x.area, 0);
  const start = new Float32Array(COUNT * 3);
  const end = new Float32Array(COUNT * 3);
  const delay = new Float32Array(COUNT);
  const p = new Vector3();
  let i = 0;
  // Phone frame faces the camera: right vector across the view, up is world up.
  const toCam = camera.position.clone().sub(target).setY(0).normalize();
  const right = new Vector3().crossVectors(new Vector3(0, 1, 0), toCam).normalize();
  // Phone centred on the camera target, so the HTML screenshot over the canvas centre lands on it.
  const centre = new Vector3(target.x, target.y - PHONE.height / 2, target.z);
  for (const { m, s, area } of samplers) {
    const n = i === samplers.length - 1 ? COUNT - i : Math.round((area / totalArea) * COUNT);
    for (let k = 0; k < n && i < COUNT; k++, i++) {
      s.sample(p);
      p.applyMatrix4(m.matrixWorld);
      start.set([p.x, p.y, p.z], i * 3);
      delay[i] = Math.min(1, p.distanceTo(AXLE_FRONT) / 2.2) * 0.55;
      const q = phonePoint(i / COUNT, Math.random(), Math.random());
      const t = centre.clone().addScaledVector(right, q.x).add(new Vector3(0, q.y, 0)).addScaledVector(toCam, q.z);
      end.set([t.x, t.y, t.z], i * 3);
    }
  }
  const geo = new BufferGeometry();
  const pos = new Float32Array(start);
  geo.setAttribute('position', new BufferAttribute(pos, 3));
  const dots = new Points(geo, new PointsMaterial({ color: 0xffb000, size: 0.014, sizeAttenuation: true, transparent: true, opacity: 0, depthWrite: false }));
  dots.visible = false;
  scene.add(dots);

  host.appendChild(canvas);
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  };
  resize();
  const sizes = new ResizeObserver(resize);
  sizes.observe(host);

  const sceneEl = host.closest<HTMLElement>('[data-scene]');
  let last = -1;
  let frame = 0;
  const tmp = new Vector3();
  const paint = () => {
    frame = 0;
    const raw = sceneEl ? Number.parseFloat(getComputedStyle(sceneEl).getPropertyValue('--p')) : 0;
    const prog = Number.isFinite(raw) ? raw : 0;
    if (prog === last) return;
    last = prog;
    const ph = morphPhases(prog);
    host.style.setProperty('--shot', String(ph.shot));
    clay.opacity = ph.mesh;
    bike.visible = ph.mesh > 0.01;
    dots.visible = ph.dots > 0.01;
    (dots.material as PointsMaterial).opacity = ph.dots;
    if (dots.visible) {
      for (let k = 0; k < COUNT; k++) {
        const t = smoothstep((ph.travel - delay[k]) / 0.45);
        const o = k * 3;
        const lift = Math.sin(t * Math.PI) * 0.45;
        tmp.set(start[o] + (end[o] - start[o]) * t, start[o + 1] + (end[o + 1] - start[o + 1]) * t + lift, start[o + 2] + (end[o + 2] - start[o + 2]) * t);
        pos[o] = tmp.x;
        pos[o + 1] = tmp.y;
        pos[o + 2] = tmp.z;
      }
      geo.attributes.position.needsUpdate = true;
    }
    renderer.render(scene, camera);
  };
  const wake = () => {
    if (!frame) frame = requestAnimationFrame(paint);
  };
  // StoryEnhancer writes --p while scrolling; we repaint on scroll and resize, never on a timer.
  window.addEventListener('scroll', wake, { passive: true });
  paint();
  onReady();

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('scroll', wake);
    sizes.disconnect();
    geo.dispose();
    (dots.material as PointsMaterial).dispose();
    for (const m of meshes) m.geometry.dispose();
    clay.dispose();
    renderer.dispose();
    canvas.remove();
  };
}
