import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { MobileMenu } from "./MobileMenu";
import { useScrollSpy } from "../hooks/useScrollSpy";

const SECTION_IDS = [
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "articles",
  "contact",
];

export function Navbar() {
  const { t } = useTranslation();
  const activeId = useScrollSpy(SECTION_IDS);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-mono font-bold text-lg text-accent">
            GN
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {SECTION_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={`font-mono text-sm transition-colors ${
                  activeId === id
                    ? "text-accent font-bold"
                    : "text-gray-600 dark:text-gray-400 hover:text-accent"
                }`}
              >
                {t(`nav.${id}`)}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            <LanguageToggle />
            <ThemeToggle />
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 md:hidden rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sectionIds={SECTION_IDS}
        activeId={activeId}
      />
    </>
  );
}
