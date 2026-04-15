import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  return (
    <div className="min-h-screen bg-bg-light text-gray-900 dark:bg-bg-dark dark:text-gray-100 transition-colors">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <h1 className="text-4xl font-bold text-center pt-20 font-mono">
        Gabriel Naoto
      </h1>
      <p className="text-center text-accent mt-2">Portfolio coming soon</p>
    </div>
  );
}

export default App;
