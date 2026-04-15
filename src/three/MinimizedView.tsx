import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { RetroComputer } from "./RetroComputer";
import { MaximizeButton } from "./MaximizeButton";
import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { Experience } from "../sections/Experience";
import { Projects } from "../sections/Projects";
import { Skills } from "../sections/Skills";
import { Education } from "../sections/Education";
import { Articles } from "../sections/Articles";
import { Contact } from "../sections/Contact";

interface MinimizedViewProps {
  onMaximize: () => void;
}

export function MinimizedView({ onMaximize }: MinimizedViewProps) {
  return (
    <div className="w-screen h-screen bg-[#1a1a2e]">
      <MaximizeButton onClick={onMaximize} />
      <Canvas
        camera={{ position: [0, 0.5, 4.5], fov: 45 }}
        shadows
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 3, 2]} intensity={0.8} />
        <pointLight position={[-2, 2, 1]} intensity={0.3} color="#0891b2" />

        <RetroComputer />

        {/* Portfolio content on the CRT screen */}
        <Html
          position={[0, 0.25, 0.28]}
          transform
          distanceFactor={1.5}
          style={{
            width: "800px",
            height: "580px",
            overflow: "auto",
            background: "#0a0a0a",
            borderRadius: "2px",
          }}
          className="pointer-events-auto"
        >
          <div className="min-h-full bg-bg-dark text-gray-100" style={{ width: "800px" }}>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Education />
            <Articles />
            <Contact />
          </div>
        </Html>

        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
