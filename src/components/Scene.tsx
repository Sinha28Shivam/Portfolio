import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const COUNT = 4500;

// Three particle formations the field morphs between as the page scrolls:
// hero = fibonacci sphere, mid = double helix, end = torus ring.
function buildShapes(count: number) {
  const sphere = new Float32Array(count * 3);
  const helix = new Float32Array(count * 3);
  const torus = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const t = i / count;

    const golden = i * 2.399963229728653;
    const y = 1 - 2 * t;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const r = 3.1 * (0.72 + 0.28 * Math.random());
    sphere[i * 3] = Math.cos(golden) * rad * r;
    sphere[i * 3 + 1] = y * r;
    sphere[i * 3 + 2] = Math.sin(golden) * rad * r;

    const strand = i % 2;
    const angle = t * Math.PI * 10 + strand * Math.PI;
    helix[i * 3] = Math.cos(angle) * 1.7 + (Math.random() - 0.5) * 0.3;
    helix[i * 3 + 1] = (t - 0.5) * 7.5;
    helix[i * 3 + 2] = Math.sin(angle) * 1.7 + (Math.random() - 0.5) * 0.3;

    const u = Math.random() * Math.PI * 2;
    const w = Math.random() * Math.PI * 2;
    const ringR = 2.7;
    const tubeR = 0.85;
    torus[i * 3] = (ringR + tubeR * Math.cos(w)) * Math.cos(u);
    torus[i * 3 + 1] = tubeR * Math.sin(w);
    torus[i * 3 + 2] = (ringR + tubeR * Math.cos(w)) * Math.sin(u);
  }

  return [sphere, helix, torus];
}

function buildColors(count: number) {
  const colors = new Float32Array(count * 3);
  const from = new THREE.Color('#22d3ee');
  const to = new THREE.Color('#a78bfa');
  const c = new THREE.Color();

  for (let i = 0; i < count; i++) {
    c.copy(from).lerp(to, i / count);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  return colors;
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const telemetryRef = useRef({ frames: 0, lastEmit: 0 });

  const { shapes, positions, colors } = useMemo(() => {
    const built = buildShapes(COUNT);
    return {
      shapes: built,
      positions: built[0].slice(),
      colors: buildColors(COUNT),
    };
  }, []);

  useFrame((state) => {
    const points = pointsRef.current;
    const group = groupRef.current;
    if (!points || !group) return;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;

    const segment = progress * (shapes.length - 1);
    const index = Math.min(Math.floor(segment), shapes.length - 2);
    const mix = segment - index;
    const from = shapes[index];
    const to = shapes[index + 1];

    const attr = points.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < arr.length; i++) {
      const target = from[i] + (to[i] - from[i]) * mix;
      arr[i] += (target - arr[i]) * 0.05;
    }
    attr.needsUpdate = true;

    points.rotation.y += 0.0012;
    group.rotation.x += (state.pointer.y * 0.22 - group.rotation.x) * 0.04;
    group.rotation.z += (state.pointer.x * -0.12 - group.rotation.z) * 0.04;

    // Emit real render stats every 500ms for the EngineHud readout.
    const telemetry = telemetryRef.current;
    telemetry.frames += 1;
    const now = state.clock.elapsedTime;
    if (telemetry.lastEmit === 0) telemetry.lastEmit = now;
    const elapsed = now - telemetry.lastEmit;
    if (elapsed >= 0.5) {
      window.dispatchEvent(
        new CustomEvent('engine-telemetry', {
          detail: {
            fps: Math.round(telemetry.frames / elapsed),
            points: COUNT,
            drawCalls: state.gl.info.render.calls,
          },
        }),
      );
      telemetry.frames = 0;
      telemetry.lastEmit = now;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={COUNT} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.032}
          vertexColors
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default Scene;
