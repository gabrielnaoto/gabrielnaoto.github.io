import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  BufferAttribute,
  BufferGeometry,
  type Points,
  PointsMaterial,
  Color,
  Vector3,
  MathUtils,
  CanvasTexture,
} from "three";


function createCircleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const half = size / 2;
  const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.6, "rgba(255,255,255,0.4)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new CanvasTexture(canvas);
}

const PARTICLE_COUNT = 40000;
const SPAWN_DURATION = 30; // seconds to reach full count

// Attractors pushed to the edges
const attractors = [
  { center: new Vector3(5, 2.5, -1), mass: 1.0, speed: 0.2 },
  { center: new Vector3(-5, -2, 0), mass: 0.9, speed: -0.15 },
  { center: new Vector3(-4, 3, -1), mass: 0.7, speed: 0.25 },
  { center: new Vector3(4, -3, 0.5), mass: 0.8, speed: -0.18 },
];

function Particles() {
  const pointsRef = useRef<Points>(null);
  const mouse3D = useRef(new Vector3(999, 999, 0));
  const spawnedSoFar = useRef(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse3D.current.set(nx * 6, ny * 5, 0);
    };
    const handleLeave = () => {
      mouse3D.current.set(999, 999, 0);
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const { positions, velocities, colors, masses } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const masses = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Start all particles off-screen; they'll be repositioned on spawn
      positions[i3] = 999;
      positions[i3 + 1] = 999;
      positions[i3 + 2] = 0;

      velocities[i3] = 0;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0;

      masses[i] = 0.25 + Math.random() * 0.75;

      colors[i3] = 0.03;
      colors[i3 + 1] = 0.57;
      colors[i3 + 2] = 0.7;
    }

    return { positions, velocities, colors, masses };
  }, []);

  useEffect(() => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry as BufferGeometry;
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    geo.setAttribute("color", new BufferAttribute(colors, 3));
  }, [positions, colors]);

  const attractorPositions = useRef(
    attractors.map((a) => a.center.clone())
  );

  const colorA = useMemo(() => new Color("#0891b2"), []);
  const colorB = useMemo(() => new Color("#a855f7"), []);
  const colorC = useMemo(() => new Color("#06b6d4"), []);

  const tempColor = useMemo(() => new Color(), []);
  const startTime = useRef(performance.now());

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const geo = pointsRef.current.geometry as BufferGeometry;
    const posAttr = geo.getAttribute("position") as BufferAttribute;
    const colorAttr = geo.getAttribute("color") as BufferAttribute;
    if (!posAttr || !colorAttr) return;

    const elapsed = (performance.now() - startTime.current) / 1000;
    const posArray = posAttr.array as Float32Array;

    // Gradually increase visible particles
    const spawnProgress = MathUtils.clamp(elapsed / SPAWN_DURATION, 0, 1);
    const activeCount = Math.floor(spawnProgress * PARTICLE_COUNT);
    geo.setDrawRange(0, activeCount);

    // Spawn new particles near cursor (or in a ring if cursor is off-screen)
    const prevSpawned = spawnedSoFar.current;
    if (activeCount > prevSpawned) {
      const mp = mouse3D.current;
      const mouseActive = mp.x < 100;

      for (let i = prevSpawned; i < activeCount; i++) {
        const i3 = i * 3;
        if (mouseActive) {
          // Spawn near cursor with small random offset
          const spread = 1.5;
          posArray[i3] = mp.x + (Math.random() - 0.5) * spread;
          posArray[i3 + 1] = mp.y + (Math.random() - 0.5) * spread;
          posArray[i3 + 2] = (Math.random() - 0.5) * spread;
        } else {
          // Spawn in outer ring
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const r = 3 + Math.random() * 5;
          posArray[i3] = r * Math.sin(phi) * Math.cos(theta);
          posArray[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          posArray[i3 + 2] = r * Math.cos(phi);
        }
        // Small random initial velocity
        velocities[i3] = (Math.random() - 0.5) * 0.01;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
      }
      spawnedSoFar.current = activeCount;
    }

    // Fade in opacity
    const fadeIn = MathUtils.clamp(elapsed / 2, 0, 1);
    const mat = pointsRef.current.material as PointsMaterial;
    mat.opacity = 0.45 * fadeIn;

    // 2x simulation speed
    const dt = Math.min(delta, 0.03) * 2;
    const time = performance.now() * 0.001;

    // Update attractor positions
    attractorPositions.current.forEach((pos, i) => {
      const a = attractors[i];
      pos.x = a.center.x + Math.sin(time * a.speed) * 2.5;
      pos.y = a.center.y + Math.cos(time * a.speed * 1.3) * 2.0;
      pos.z = a.center.z + Math.sin(time * a.speed * 0.7) * 1.5;
    });

    const colorArray = colorAttr.array as Float32Array;

    const gravityConstant = 0.1;
    const spinStrength = 0.8;
    const damping = 0.997;
    const maxSpeed = 1.5;
    const centerRepulsion = 0.3;
    const centerDeadzone = 2.5;

    for (let i = 0; i < activeCount; i++) {
      const i3 = i * 3;
      let vx = velocities[i3];
      let vy = velocities[i3 + 1];
      let vz = velocities[i3 + 2];

      const px = posArray[i3];
      const py = posArray[i3 + 1];
      const pz = posArray[i3 + 2];

      // Repulsion from center
      const centerDistSq = px * px + py * py + pz * pz;
      const centerDist = Math.sqrt(centerDistSq + 0.01);
      if (centerDist < centerDeadzone) {
        const repulse = centerRepulsion * (1 - centerDist / centerDeadzone);
        vx += (px / centerDist) * repulse * dt;
        vy += (py / centerDist) * repulse * dt;
        vz += (pz / centerDist) * repulse * dt;
      }

      for (let j = 0; j < attractorPositions.current.length; j++) {
        const ap = attractorPositions.current[j];
        const am = attractors[j].mass;

        const dx = ap.x - px;
        const dy = ap.y - py;
        const dz = ap.z - pz;
        const distSq = dx * dx + dy * dy + dz * dz + 0.5;
        const dist = Math.sqrt(distSq);

        const force = (gravityConstant * am * masses[i]) / distSq;
        const nx = dx / dist;
        const ny = dy / dist;
        const nz = dz / dist;

        vx += nx * force * dt;
        vy += ny * force * dt;
        vz += nz * force * dt;

        vx += -nz * spinStrength * force * dt;
        vy += ny * 0.2 * spinStrength * force * dt;
        vz += nx * spinStrength * force * dt;
      }

      // Mouse attractor — very strong pull
      const mp = mouse3D.current;
      const mdx = mp.x - px;
      const mdy = mp.y - py;
      const mdz = mp.z - pz;
      const mDistSq = mdx * mdx + mdy * mdy + mdz * mdz + 0.2;
      const mDist = Math.sqrt(mDistSq);
      if (mDist < 10) {
        const mForce = (0.4 * masses[i]) / mDistSq;
        vx += (mdx / mDist) * mForce * dt;
        vy += (mdy / mDist) * mForce * dt;
        vz += (mdz / mDist) * mForce * dt;
      }

      vx *= damping;
      vy *= damping;
      vz *= damping;

      const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);
      if (speed > maxSpeed) {
        const s = maxSpeed / speed;
        vx *= s;
        vy *= s;
        vz *= s;
      }

      velocities[i3] = vx;
      velocities[i3 + 1] = vy;
      velocities[i3 + 2] = vz;

      posArray[i3] += vx * dt;
      posArray[i3 + 1] += vy * dt;
      posArray[i3 + 2] += vz * dt;

      const speedNorm = MathUtils.clamp(speed / maxSpeed, 0, 1);
      if (speedNorm < 0.5) {
        tempColor.copy(colorA).lerp(colorB, speedNorm * 2);
      } else {
        tempColor.copy(colorB).lerp(colorC, (speedNorm - 0.5) * 2);
      }
      colorArray[i3] = tempColor.r;
      colorArray[i3 + 1] = tempColor.g;
      colorArray[i3 + 2] = tempColor.b;
    }

    posAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;
  });

  const circleTexture = useMemo(() => createCircleTexture(), []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.035}
        map={circleTexture}
        vertexColors
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function ParticleBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
