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
  return (
    <div className="min-h-screen bg-bg-dark text-gray-100">
      <Navbar />
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
