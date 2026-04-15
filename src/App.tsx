import { useState } from "react";
import { Navbar } from "./components/Navbar";

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
        {/* Sections will be added in subsequent tasks */}
        <div id="about" className="h-screen flex items-center justify-center">About</div>
        <div id="experience" className="h-screen flex items-center justify-center">Experience</div>
        <div id="projects" className="h-screen flex items-center justify-center">Projects</div>
        <div id="skills" className="h-screen flex items-center justify-center">Skills</div>
        <div id="education" className="h-screen flex items-center justify-center">Education</div>
        <div id="articles" className="h-screen flex items-center justify-center">Articles</div>
        <div id="contact" className="h-screen flex items-center justify-center">Contact</div>
      </main>
    </div>
  );
}

export default App;
