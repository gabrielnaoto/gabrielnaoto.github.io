import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  type BufferAttribute,
  type Points,
  Color,
  Vector3,
  MathUtils,
} from "three";
import { useTheme } from "../hooks/useTheme";

const PARTICLE_COUNT = 30000;

// Attractor positions that orbit slowly
const attractors = [
  { center: new Vector3(2, 1, 0), mass: 1.2, speed: 0.3 },
  { center: new Vector3(-2, -1, 1), mass: 0.8, speed: -0.2 },
  { center: new Vector3(0, 2, -1), mass: 1.0, speed: 0.15 },
];

function Particles() {
  const pointsRef = useRef<Points>(null);
  const { theme } = useTheme();

  const { positions, velocities, colors, masses } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const masses = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Random positions in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.random() * 4;
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      // Small random initial velocities
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      // Particle mass
      masses[i] = 0.25 + Math.random() * 0.75;

      // Initial colors (will be updated per frame based on velocity)
      colors[i3] = 0;
      colors[i3 + 1] = 0;
      colors[i3 + 2] = 0;
    }

    return { positions, velocities, colors, masses };
  }, []);

  const attractorPositions = useRef(
    attractors.map((a) => a.center.clone())
  );

  // Colors based on theme
  const colorA = useMemo(
    () => (theme === "dark" ? new Color("#0891b2") : new Color("#0e7490")),
    [theme]
  );
  const colorB = useMemo(
    () => (theme === "dark" ? new Color("#a855f7") : new Color("#7c3aed")),
    [theme]
  );
  const colorC = useMemo(
    () => (theme === "dark" ? new Color("#06b6d4") : new Color("#0891b2")),
    [theme]
  );

  const tempColor = useMemo(() => new Color(), []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const dt = Math.min(delta, 0.03); // Cap delta for stability
    const time = performance.now() * 0.001;

    // Update attractor positions (slow orbit)
    attractorPositions.current.forEach((pos, i) => {
      const a = attractors[i];
      pos.x = a.center.x + Math.sin(time * a.speed) * 1.5;
      pos.y = a.center.y + Math.cos(time * a.speed * 1.3) * 1.0;
      pos.z = a.center.z + Math.sin(time * a.speed * 0.7) * 1.0;
    });

    const posAttr = pointsRef.current.geometry.attributes
      .position as BufferAttribute;
    const colorAttr = pointsRef.current.geometry.attributes
      .color as BufferAttribute;
    const posArray = posAttr.array as Float32Array;
    const colorArray = colorAttr.array as Float32Array;

    const gravityConstant = 0.15;
    const spinStrength = 0.4;
    const damping = 0.998;
    const maxSpeed = 2.0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      let vx = velocities[i3];
      let vy = velocities[i3 + 1];
      let vz = velocities[i3 + 2];

      const px = posArray[i3];
      const py = posArray[i3 + 1];
      const pz = posArray[i3 + 2];

      // Apply forces from each attractor
      for (let j = 0; j < attractorPositions.current.length; j++) {
        const ap = attractorPositions.current[j];
        const am = attractors[j].mass;

        const dx = ap.x - px;
        const dy = ap.y - py;
        const dz = ap.z - pz;
        const distSq = dx * dx + dy * dy + dz * dz + 0.5; // softening
        const dist = Math.sqrt(distSq);

        // Gravity
        const force = (gravityConstant * am * masses[i]) / distSq;
        const nx = dx / dist;
        const ny = dy / dist;
        const nz = dz / dist;

        vx += nx * force * dt;
        vy += ny * force * dt;
        vz += nz * force * dt;

        // Spinning force (perpendicular to gravity direction)
        vx += (-nz * spinStrength * force * dt);
        vy += (0.3 * spinStrength * force * dt);
        vz += (nx * spinStrength * force * dt);
      }

      // Damping
      vx *= damping;
      vy *= damping;
      vz *= damping;

      // Clamp speed
      const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);
      if (speed > maxSpeed) {
        const s = maxSpeed / speed;
        vx *= s;
        vy *= s;
        vz *= s;
      }

      // Update velocity
      velocities[i3] = vx;
      velocities[i3 + 1] = vy;
      velocities[i3 + 2] = vz;

      // Update position
      posArray[i3] += vx * dt;
      posArray[i3 + 1] += vy * dt;
      posArray[i3 + 2] += vz * dt;

      // Color based on speed (interpolate between colorA, colorB, colorC)
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

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function ParticleBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
