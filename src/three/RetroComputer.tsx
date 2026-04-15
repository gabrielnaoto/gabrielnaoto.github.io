import { useRef, useState, useCallback } from "react";
import { RoundedBox } from "@react-three/drei";
import { type Group, type Mesh } from "three";

interface RetroComputerProps {
  onScrollDown?: () => void;
  onScrollUp?: () => void;
}

export function RetroComputer({ onScrollDown, onScrollUp }: RetroComputerProps) {
  return (
    <group>
      {/* === CRT Monitor === */}
      <MonitorUnit />

      {/* === System Unit (horizontal box under monitor) === */}
      <SystemUnit />

      {/* === Keyboard === */}
      <Keyboard />

      {/* === Mouse === */}
      <Mouse onScrollDown={onScrollDown} onScrollUp={onScrollUp} />
    </group>
  );
}

function MonitorUnit() {
  return (
    <group position={[0, 1.55, 0]}>
      {/* Monitor outer casing — boxy CRT with slight taper at back */}
      <RoundedBox args={[3.2, 2.6, 2.0]} radius={0.12} smoothness={4} position={[0, 0, -0.3]}>
        <meshStandardMaterial color="#d9d0c1" roughness={0.8} />
      </RoundedBox>

      {/* Dark bezel frame — thick border around screen */}
      <RoundedBox args={[2.7, 2.1, 0.08]} radius={0.15} smoothness={4} position={[0, 0.05, 0.72]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </RoundedBox>

      {/* Screen area (where Html content goes) */}
      <mesh position={[0, 0.05, 0.77]} name="screen">
        <planeGeometry args={[2.2, 1.6]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>

      {/* Small power LED */}
      <mesh position={[1.2, -1.1, 0.72]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
      </mesh>

      {/* Bottom chin of monitor */}
      <mesh position={[0, -1.15, 0.5]}>
        <boxGeometry args={[3.0, 0.3, 0.5]} />
        <meshStandardMaterial color="#d9d0c1" roughness={0.8} />
      </mesh>
    </group>
  );
}

function SystemUnit() {
  return (
    <group position={[0, 0, 0]}>
      {/* Main system unit box — sits under the monitor */}
      <RoundedBox args={[3.4, 0.5, 2.2]} radius={0.04} smoothness={2}>
        <meshStandardMaterial color="#d4cbb8" roughness={0.85} />
      </RoundedBox>

      {/* Floppy drive slot */}
      <mesh position={[0, 0.05, 1.11]}>
        <boxGeometry args={[0.9, 0.08, 0.01]} />
        <meshStandardMaterial color="#b0a898" roughness={0.9} />
      </mesh>

      {/* Floppy drive slot border */}
      <mesh position={[0, 0.05, 1.105]}>
        <boxGeometry args={[1.0, 0.12, 0.005]} />
        <meshStandardMaterial color="#c4b9a8" roughness={0.9} />
      </mesh>

      {/* Small button on system unit */}
      <mesh position={[0.7, 0.05, 1.11]}>
        <boxGeometry args={[0.1, 0.08, 0.02]} />
        <meshStandardMaterial color="#bbb3a3" roughness={0.7} />
      </mesh>

      {/* Ventilation lines on right side */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[1.65, 0.05, 0.3 + i * 0.2]}>
          <boxGeometry args={[0.01, 0.25, 0.08]} />
          <meshStandardMaterial color="#c4b9a8" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Keyboard() {
  const KEY_COLOR = "#c8c0b0";
  const KEY_HOVER_COLOR = "#e8e0d0";
  const BOARD_COLOR = "#d4cbb8";

  // Key layout: rows of keys with varying widths
  const rows = [
    // Top row: function keys
    { y: 0.45, keys: 13, keyWidth: 0.2, gap: 0.22, startX: -1.4 },
    // Number row
    { y: 0.25, keys: 14, keyWidth: 0.18, gap: 0.21, startX: -1.4 },
    // QWERTY row
    { y: 0.07, keys: 13, keyWidth: 0.18, gap: 0.21, startX: -1.3 },
    // Home row
    { y: -0.11, keys: 12, keyWidth: 0.18, gap: 0.21, startX: -1.2 },
    // Bottom row
    { y: -0.29, keys: 11, keyWidth: 0.18, gap: 0.21, startX: -1.1 },
  ];

  return (
    <group position={[0, -0.55, 1.8]}>
      {/* Keyboard base — slightly angled */}
      <group rotation={[-0.15, 0, 0]}>
        {/* Base plate */}
        <RoundedBox args={[3.2, 0.1, 1.2]} radius={0.03} smoothness={2}>
          <meshStandardMaterial color={BOARD_COLOR} roughness={0.85} />
        </RoundedBox>

        {/* Key rows */}
        {rows.map((row, ri) => (
          <group key={ri}>
            {Array.from({ length: row.keys }).map((_, ki) => (
              <KeyCap
                key={`${ri}-${ki}`}
                position={[row.startX + ki * row.gap, 0.07, row.y]}
                width={row.keyWidth}
                color={KEY_COLOR}
                hoverColor={KEY_HOVER_COLOR}
              />
            ))}
          </group>
        ))}

        {/* Space bar */}
        <KeyCap
          position={[0, 0.07, -0.45]}
          width={1.2}
          depth={0.15}
          color={KEY_COLOR}
          hoverColor={KEY_HOVER_COLOR}
        />

        {/* Special yellow/orange accent key (like in the reference) */}
        <KeyCap
          position={[-1.1, 0.07, -0.29]}
          width={0.18}
          color="#c4a035"
          hoverColor="#e0b840"
        />
      </group>
    </group>
  );
}

interface KeyCapProps {
  position: [number, number, number];
  width?: number;
  depth?: number;
  color: string;
  hoverColor: string;
}

function KeyCap({ position, width = 0.18, depth = 0.15, color, hoverColor }: KeyCapProps) {
  const ref = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const handlePointerDown = useCallback(() => {
    setPressed(true);
    setTimeout(() => setPressed(false), 150);
  }, []);

  return (
    <mesh
      ref={ref}
      position={[position[0], position[1] + (pressed ? -0.01 : 0), position[2]]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => {
        setHovered(false);
        setPressed(false);
      }}
      onPointerDown={handlePointerDown}
    >
      <boxGeometry args={[width, 0.05, depth]} />
      <meshStandardMaterial
        color={hovered ? hoverColor : color}
        roughness={0.7}
      />
    </mesh>
  );
}

interface MouseProps {
  onScrollDown?: () => void;
  onScrollUp?: () => void;
}

function Mouse({ onScrollDown, onScrollUp }: MouseProps) {
  const groupRef = useRef<Group>(null);
  const [leftPressed, setLeftPressed] = useState(false);
  const [rightPressed, setRightPressed] = useState(false);

  const BODY_COLOR = "#d4cbb8";
  const BUTTON_COLOR = "#c8c0b0";
  const BUTTON_HOVER = "#e0d8c8";

  return (
    <group ref={groupRef} position={[2.2, -0.5, 1.6]}>
      {/* Mouse body — rounded shape */}
      <RoundedBox args={[0.45, 0.15, 0.7]} radius={0.06} smoothness={4}>
        <meshStandardMaterial color={BODY_COLOR} roughness={0.75} />
      </RoundedBox>

      {/* Left button */}
      <mesh
        position={[-0.1, 0.08, -0.12]}
        onPointerDown={() => {
          setLeftPressed(true);
          onScrollUp?.();
          setTimeout(() => setLeftPressed(false), 150);
        }}
        onPointerOver={() => setLeftPressed(true)}
        onPointerOut={() => setLeftPressed(false)}
      >
        <boxGeometry args={[0.18, 0.02, 0.25]} />
        <meshStandardMaterial
          color={leftPressed ? BUTTON_HOVER : BUTTON_COLOR}
          roughness={0.6}
        />
      </mesh>

      {/* Right button */}
      <mesh
        position={[0.1, 0.08, -0.12]}
        onPointerDown={() => {
          setRightPressed(true);
          onScrollDown?.();
          setTimeout(() => setRightPressed(false), 150);
        }}
        onPointerOver={() => setRightPressed(true)}
        onPointerOut={() => setRightPressed(false)}
      >
        <boxGeometry args={[0.18, 0.02, 0.25]} />
        <meshStandardMaterial
          color={rightPressed ? BUTTON_HOVER : BUTTON_COLOR}
          roughness={0.6}
        />
      </mesh>

      {/* Button divider line */}
      <mesh position={[0, 0.085, -0.12]}>
        <boxGeometry args={[0.01, 0.02, 0.25]} />
        <meshStandardMaterial color="#b8b0a0" />
      </mesh>

      {/* Mouse cable */}
      <mesh position={[0, 0.02, -0.4]}>
        <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
        <meshStandardMaterial color="#888" roughness={0.9} />
      </mesh>
    </group>
  );
}
