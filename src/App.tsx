import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Education } from "./sections/Education";
import { Articles } from "./sections/Articles";
import { Contact } from "./sections/Contact";

function App() {
  const [minimized, setMinimized] = useState(false);

  if (minimized) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <button
          onClick={() => setMinimized(false)}
          className="text-white font-mono"
        >
          3D scene placeholder — click to maximize
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light text-gray-900 dark:bg-bg-dark dark:text-gray-100 transition-colors">
      <Navbar onMinimize={() => setMinimized(true)} />
      <main className="pt-14">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Articles />
        <Contact />
      </main>
    </div>
  );
}

export default App;
