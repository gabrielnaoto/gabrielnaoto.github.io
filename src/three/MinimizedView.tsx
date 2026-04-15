import { useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollDown = useCallback(() => {
    scrollContainerRef.current?.scrollBy({ top: 200, behavior: "smooth" });
  }, []);

  const scrollUp = useCallback(() => {
    scrollContainerRef.current?.scrollBy({ top: -200, behavior: "smooth" });
  }, []);

  return (
    <div className="w-screen h-screen bg-[#1a1a2e]">
      <MaximizeButton onClick={onMaximize} />
      <Canvas
        camera={{ position: [0, 1.2, 5.5], fov: 40 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={0.7} />
        <pointLight position={[-2, 3, 2]} intensity={0.3} color="#0891b2" />

        {/* Subtle fill light from below */}
        <pointLight position={[0, -1, 3]} intensity={0.15} color="#ffffff" />

        <RetroComputer onScrollDown={scrollDown} onScrollUp={scrollUp} />

        {/* Portfolio content embedded on the CRT screen */}
        <Html
          position={[0, 1.6, 0.78]}
          transform
          distanceFactor={1.55}
          style={{
            width: "800px",
            height: "575px",
            overflow: "auto",
            background: "#0a0a0a",
            borderRadius: "4px",
          }}
          className="pointer-events-auto"
        >
          <div
            ref={scrollContainerRef}
            className="min-h-full bg-bg-dark text-gray-100"
            style={{ width: "800px", height: "575px", overflow: "auto" }}
          >
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
      </Canvas>
    </div>
  );
}
