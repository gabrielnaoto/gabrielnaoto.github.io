import { useRef } from "react";
import { type Mesh } from "three";

export function RetroComputer() {
  return (
    <group>
      {/* Desk surface */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial color="#5c4033" />
      </mesh>

      {/* Monitor body */}
      <group position={[0, 0.2, 0]}>
        {/* Monitor casing */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.8, 2.2, 0.5]} />
          <meshStandardMaterial color="#c8c0b0" />
        </mesh>
        {/* Monitor bezel (front face) */}
        <mesh position={[0, 0, 0.26]}>
          <boxGeometry args={[2.6, 2.0, 0.01]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        {/* Screen area — this is where the Html component will be placed */}
        <mesh position={[0, 0.05, 0.27]} name="screen">
          <planeGeometry args={[2.2, 1.6]} />
          <meshBasicMaterial color="#111111" />
        </mesh>
        {/* Monitor stand */}
        <mesh position={[0, -1.3, 0]}>
          <boxGeometry args={[0.6, 0.5, 0.4]} />
          <meshStandardMaterial color="#c8c0b0" />
        </mesh>
        {/* Monitor base */}
        <mesh position={[0, -1.5, 0]}>
          <boxGeometry args={[1.8, 0.1, 0.8]} />
          <meshStandardMaterial color="#c8c0b0" />
        </mesh>
      </group>

      {/* Keyboard */}
      <mesh position={[0, -1.4, 1.5]}>
        <boxGeometry args={[2.0, 0.08, 0.7]} />
        <meshStandardMaterial color="#d4cfc4" />
      </mesh>
      {/* Keyboard keys (simplified) */}
      <mesh position={[0, -1.35, 1.5]}>
        <boxGeometry args={[1.8, 0.02, 0.55]} />
        <meshStandardMaterial color="#9a9488" />
      </mesh>

      {/* Mouse */}
      <MouseModel />
    </group>
  );
}

function MouseModel() {
  const ref = useRef<Mesh>(null);

  return (
    <group position={[1.5, -1.4, 1.5]}>
      {/* Mouse body */}
      <mesh ref={ref}>
        <boxGeometry args={[0.3, 0.1, 0.45]} />
        <meshStandardMaterial color="#d4cfc4" />
      </mesh>
      {/* Mouse button */}
      <mesh position={[0, 0.06, -0.08]}>
        <boxGeometry args={[0.25, 0.02, 0.15]} />
        <meshStandardMaterial color="#c8c0b0" />
      </mesh>
    </group>
  );
}
