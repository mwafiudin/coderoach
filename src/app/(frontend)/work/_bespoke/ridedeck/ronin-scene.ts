import {
  ACESFilmicToneMapping,
  Box3,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { leanAt } from '@/lib/portfolio/ridedeck';


type Options = { src: string; reduce: boolean; onReady: () => void };

/**
 * Mounts the Ronin into `host` and returns the cleanup. The model lies along +X with its wheels on
 * y = 0 (rideDeck-lab PROVENANCE.md), so a lean is a roll about X through the contact line, the way
 * the bike itself leans. Drawing stops whenever the viewer is off screen.
 */
export async function mountRonin(host: HTMLElement, { src, reduce, onReady }: Options): Promise<() => void> {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  const canvas = renderer.domElement;
  canvas.className = 'rd-viewer__canvas';
  canvas.setAttribute('aria-hidden', 'true');

  const scene = new Scene();
  scene.add(new HemisphereLight(0xe9ebec, 0x16181a, 0.9));
  const key = new DirectionalLight(0xffffff, 1.8);
  key.position.set(3, 4, 2.5);
  scene.add(key);
  const rim = new DirectionalLight(0xffb000, 1.1);
  rim.position.set(-3, 1.5, -2.5);
  scene.add(rim);

  const camera = new PerspectiveCamera(28, 1, 0.1, 50);

  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const gltf = await loader.loadAsync(src);
  const bike = gltf.scene;
  const lean = new Group();
  lean.add(bike);
  scene.add(lean);

  const box = new Box3().setFromObject(bike);
  const centre = box.getCenter(new Vector3());
  const target = new Vector3(centre.x, centre.y * 0.9, centre.z);
  // Far enough that the whole bike, leaning either way, stays inside the frame at the 3:2 aspect.
  const reach = box.getSize(new Vector3()).length() / 2;
  const distance = reach / Math.sin(((camera.fov / 2) * Math.PI) / 180) * 0.82;
  const view = new Vector3(0.62, 0.26, 0.74).normalize();
  camera.position.copy(target).addScaledVector(view, distance);

  const controls = new OrbitControls(camera, canvas);
  controls.target.copy(target);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  // Turn around the bike only: a tilting camera on a phone fights the thumb that is scrolling.
  controls.minPolarAngle = controls.maxPolarAngle = Math.acos(view.y);
  controls.autoRotate = !reduce;
  controls.autoRotateSpeed = 0.6;
  controls.update();
  // OrbitControls sets touch-action none; vertical swipes over the bike must still scroll the page.
  canvas.style.touchAction = 'pan-y';

  host.appendChild(canvas);
  const scrollScene = host.closest<HTMLElement>('[data-scene]');

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

  let frame = 0;
  const draw = () => {
    if (!reduce && scrollScene) {
      const p = Number.parseFloat(getComputedStyle(scrollScene).getPropertyValue('--p'));
      lean.rotation.x = leanAt(p);
    }
    controls.update();
    renderer.render(scene, camera);
    frame = requestAnimationFrame(draw);
  };
  const seen = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !frame) frame = requestAnimationFrame(draw);
    if (!entry.isIntersecting && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  });
  seen.observe(host);
  renderer.render(scene, camera);
  onReady();

  return () => {
    cancelAnimationFrame(frame);
    seen.disconnect();
    sizes.disconnect();
    controls.dispose();
    bike.traverse((o) => {
      if (o instanceof Mesh) {
        o.geometry.dispose();
        for (const m of [o.material].flat()) m.dispose();
      }
    });
    renderer.dispose();
    canvas.remove();
  };
}
