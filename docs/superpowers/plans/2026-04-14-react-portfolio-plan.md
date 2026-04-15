# React Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild gabrielnaoto.github.io as a React SPA with Vite, Tailwind, bilingual support, dark/light theming, a Three.js "minimize" mode (retro 90s CRT computer), and client-side PDF resume generation.

**Architecture:** Single-page app with content separated from components. All CV data lives in typed data files; i18n provides bilingual UI text. Sections render as scroll-anchored blocks. A lazy-loaded Three.js scene provides the "minimize" mode. PDF generation uses `@react-pdf/renderer` styled after Jake's Resume template.

**Tech Stack:** Vite, React 19, TypeScript, Tailwind CSS v4, FiraCode font, react-i18next, Framer Motion, @react-three/fiber + @react-three/drei, @react-pdf/renderer, GitHub Actions

---

## File Structure

```
src/
  main.tsx                          # React entry point, renders App
  App.tsx                           # Root component: manages minimize mode, renders Navbar + sections or 3D scene
  index.css                         # Tailwind directives, FiraCode import, global styles

  components/
    Navbar.tsx                      # Fixed navbar: logo, section links, toggles, minimize button
    Section.tsx                     # Reusable section wrapper with id anchor and Framer Motion fade-in
    ThemeToggle.tsx                 # Dark/light mode toggle button
    LanguageToggle.tsx              # EN/PT language switch
    MinimizeButton.tsx              # "_" button that triggers 3D mode
    MobileMenu.tsx                  # Hamburger menu drawer for mobile nav

  sections/
    Hero.tsx                        # Full-viewport hero with typing animation
    About.tsx                       # Bio paragraph, profile photo, download CV button
    Experience.tsx                  # Timeline layout with skillicons per entry
    Projects.tsx                    # Card grid of projects
    Skills.tsx                      # Skills grid grouped by category with skillicons
    Education.tsx                   # Compact education list
    Articles.tsx                    # Published articles/talks list
    Contact.tsx                     # Footer with email and social links

  data/
    experience.ts                   # Work history entries with bilingual text + skillicon ids
    projects.ts                     # Project entries with bilingual text
    skills.ts                       # Skills grouped by category with icon ids
    education.ts                    # Education entries with bilingual text
    articles.ts                     # Articles/talks with bilingual text
    personal.ts                     # Name, title, email, social links, tagline

  i18n/
    index.ts                        # i18next initialization and config
    en.json                         # English UI strings (section headings, labels, etc.)
    pt.json                         # Portuguese UI strings

  hooks/
    useTheme.ts                     # Dark/light mode hook (system preference + localStorage override)
    useScrollSpy.ts                 # IntersectionObserver hook for active section tracking

  pdf/
    ResumePdf.tsx                   # @react-pdf/renderer document styled after Jake's Resume
    DownloadButton.tsx              # Button that triggers PDF generation and download

  three/
    MinimizedView.tsx               # Lazy-loaded wrapper: Canvas + scene + Html embed
    RetroComputer.tsx               # CRT monitor + keyboard + mouse 3D models
    MaximizeButton.tsx              # Floating UI button inside 3D scene to return to normal view

  assets/                            # Images and other static assets (reuses existing /images/ for now)

.github/
  workflows/
    deploy.yml                      # GitHub Actions: build + deploy to GitHub Pages

index.html                          # Vite HTML entry point
vite.config.ts                      # Vite config
tsconfig.json                       # TypeScript config
package.json                        # Dependencies and scripts
```

---

## Task 1: Project Scaffolding & Branch Setup

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `.github/workflows/deploy.yml`

- [ ] **Step 1: Create the `react-rewrite` branch**

```bash
git checkout -b react-rewrite
```

- [ ] **Step 2: Scaffold Vite + React + TypeScript project**

```bash
npm create vite@latest . -- --template react-ts
```

When prompted about existing files, choose to ignore/skip existing files. Vite will create `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/App.css`, `src/index.css`, and other boilerplate.

- [ ] **Step 3: Install core dependencies**

```bash
npm install react-i18next i18next framer-motion @fontsource/fira-code
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 4: Configure Tailwind CSS v4**

Replace `src/index.css` with:

```css
@import "tailwindcss";
@import "@fontsource/fira-code/400.css";
@import "@fontsource/fira-code/700.css";

@theme {
  --font-mono: "Fira Code", ui-monospace, monospace;
  --color-accent: #0891b2;
  --color-accent-light: #06b6d4;
  --color-bg-dark: #0a0a0a;
  --color-bg-light: #fafafa;
}

html {
  scroll-behavior: smooth;
  font-family: var(--font-mono);
}
```

- [ ] **Step 5: Configure Vite with Tailwind plugin**

Replace `vite.config.ts` with:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

- [ ] **Step 6: Set up minimal App with dark mode support**

Replace `src/App.tsx` with:

```tsx
function App() {
  return (
    <div className="min-h-screen bg-bg-light text-gray-900 dark:bg-bg-dark dark:text-gray-100">
      <h1 className="text-4xl font-bold text-center pt-20 font-mono">
        Gabriel Naoto
      </h1>
      <p className="text-center text-accent mt-2">Portfolio coming soon</p>
    </div>
  );
}

export default App;
```

- [ ] **Step 7: Clean up Vite boilerplate**

Delete the following files that Vite created but we don't need:

```bash
rm -f src/App.css src/assets/react.svg public/vite.svg
```

- [ ] **Step 8: Create GitHub Actions deploy workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 9: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite dev server starts, page shows "Gabriel Naoto" heading with teal accent text on a white (or dark) background.

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json index.html src/ .github/
git commit -m "feat: scaffold Vite + React + TypeScript + Tailwind project"
```

---

## Task 2: Theme System (Dark/Light Mode)

**Files:**
- Create: `src/hooks/useTheme.ts`, `src/components/ThemeToggle.tsx`
- Modify: `src/App.tsx`, `src/index.css`

- [ ] **Step 1: Create the useTheme hook**

Create `src/hooks/useTheme.ts`:

```ts
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(): Theme | null {
  const stored = localStorage.getItem("theme");
  return stored === "light" || stored === "dark" ? stored : null;
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => getStoredTheme() ?? getSystemTheme()
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (!getStoredTheme()) {
        setTheme(mq.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  return { theme, toggleTheme };
}
```

- [ ] **Step 2: Create the ThemeToggle component**

Create `src/components/ThemeToggle.tsx`:

```tsx
import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
```

- [ ] **Step 3: Wire ThemeToggle into App**

Replace `src/App.tsx` with:

```tsx
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
```

- [ ] **Step 4: Verify dark/light toggle works**

```bash
npm run dev
```

Expected: Click the toggle — page switches between dark and light themes. Refreshing the page preserves the choice. Changing system preference updates the theme if no manual override is stored.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useTheme.ts src/components/ThemeToggle.tsx src/App.tsx
git commit -m "feat: add dark/light theme toggle with system preference detection"
```

---

## Task 3: i18n Setup (EN/PT Bilingual)

**Files:**
- Create: `src/i18n/index.ts`, `src/i18n/en.json`, `src/i18n/pt.json`, `src/components/LanguageToggle.tsx`
- Modify: `src/main.tsx`, `src/App.tsx`

- [ ] **Step 1: Create translation files**

Create `src/i18n/en.json`:

```json
{
  "nav": {
    "about": "About",
    "experience": "Experience",
    "projects": "Projects",
    "skills": "Skills",
    "education": "Education",
    "articles": "Articles",
    "contact": "Contact"
  },
  "hero": {
    "title": "Software Engineer",
    "scrollDown": "Scroll down"
  },
  "about": {
    "heading": "About Me",
    "downloadCv": "Download CV"
  },
  "experience": {
    "heading": "Work Experience",
    "present": "Present"
  },
  "projects": {
    "heading": "Projects",
    "viewLive": "Live",
    "viewCode": "Code"
  },
  "skills": {
    "heading": "Skills & Tech Stack"
  },
  "education": {
    "heading": "Education"
  },
  "articles": {
    "heading": "Published Articles"
  },
  "contact": {
    "heading": "Contact"
  }
}
```

Create `src/i18n/pt.json`:

```json
{
  "nav": {
    "about": "Sobre",
    "experience": "Experiencia",
    "projects": "Projetos",
    "skills": "Habilidades",
    "education": "Formacao",
    "articles": "Artigos",
    "contact": "Contato"
  },
  "hero": {
    "title": "Engenheiro de Software",
    "scrollDown": "Role para baixo"
  },
  "about": {
    "heading": "Sobre Mim",
    "downloadCv": "Baixar CV"
  },
  "experience": {
    "heading": "Experiencia Profissional",
    "present": "Atual"
  },
  "projects": {
    "heading": "Projetos",
    "viewLive": "Demo",
    "viewCode": "Codigo"
  },
  "skills": {
    "heading": "Conhecimentos e Habilidades"
  },
  "education": {
    "heading": "Formacao Academica"
  },
  "articles": {
    "heading": "Artigos Publicados"
  },
  "contact": {
    "heading": "Contato"
  }
}
```

- [ ] **Step 2: Create i18n initialization**

Create `src/i18n/index.ts`:

```ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import pt from "./pt.json";

const storedLang = localStorage.getItem("language");

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
  },
  lng: storedLang ?? "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
```

- [ ] **Step 3: Import i18n in main.tsx**

Modify `src/main.tsx` — add the i18n import before the React render:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n/index.ts";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 4: Create the LanguageToggle component**

Create `src/components/LanguageToggle.tsx`:

```tsx
import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggle = () => {
    const next = currentLang === "en" ? "pt" : "en";
    i18n.changeLanguage(next);
    localStorage.setItem("language", next);
  };

  return (
    <button
      onClick={toggle}
      className="px-2 py-1 rounded-md text-sm font-mono font-bold hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
      aria-label={`Switch language to ${currentLang === "en" ? "Portuguese" : "English"}`}
    >
      {currentLang === "en" ? "PT" : "EN"}
    </button>
  );
}
```

- [ ] **Step 5: Wire LanguageToggle into App**

Replace `src/App.tsx` with:

```tsx
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "./components/ThemeToggle";
import { LanguageToggle } from "./components/LanguageToggle";

function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-bg-light text-gray-900 dark:bg-bg-dark dark:text-gray-100 transition-colors">
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <h1 className="text-4xl font-bold text-center pt-20 font-mono">
        Gabriel Naoto
      </h1>
      <p className="text-center text-accent mt-2">{t("hero.title")}</p>
    </div>
  );
}

export default App;
```

- [ ] **Step 6: Verify i18n works**

```bash
npm run dev
```

Expected: Page shows "Software Engineer" by default. Clicking the language toggle shows "PT" button and switches text to "Engenheiro de Software". Refreshing preserves the language choice.

- [ ] **Step 7: Commit**

```bash
git add src/i18n/ src/components/LanguageToggle.tsx src/main.tsx src/App.tsx
git commit -m "feat: add bilingual EN/PT support with react-i18next"
```

---

## Task 4: Data Layer (Content Files)

**Files:**
- Create: `src/data/personal.ts`, `src/data/experience.ts`, `src/data/projects.ts`, `src/data/skills.ts`, `src/data/education.ts`, `src/data/articles.ts`

- [ ] **Step 1: Create personal data**

Create `src/data/personal.ts`:

```ts
export const personal = {
  name: "Gabriel Naoto",
  fullName: "Gabriel Naoto Ymai Pereira",
  email: "naoto.ymai@gmail.com",
  location: {
    en: "Florianopolis/SC, Brazil",
    pt: "Florianopolis/SC, Brasil",
  },
  title: {
    en: "Software Engineer",
    pt: "Engenheiro de Software",
  },
  tagline: {
    en: "Building things for the web",
    pt: "Construindo coisas para a web",
  },
  bio: {
    en: "Software Engineer graduated from UDESC. Started in tech in 2013 during high school with HTML, CSS, and JavaScript. Passionate about web systems and building great user experiences.",
    pt: "Engenheiro de Software formado pela UDESC. Comecou na area de tecnologia em 2013 durante o ensino medio com HTML, CSS e JavaScript. Apaixonado por sistemas web e por construir otimas experiencias para o usuario.",
  },
  social: {
    github: "https://github.com/gabrielnaoto",
    linkedin: "https://linkedin.com/in/gabrielnaoto",
  },
} as const;
```

- [ ] **Step 2: Create experience data**

Create `src/data/experience.ts`:

```ts
export interface ExperienceEntry {
  company: string;
  url?: string;
  role: { en: string; pt: string };
  startDate: string;
  endDate: { en: string; pt: string } | null; // null = present
  description: { en: string; pt: string };
  skillIcons: string; // comma-separated skillicons.dev icon ids
}

export const experience: ExperienceEntry[] = [
  {
    company: "Constructor",
    url: "https://constructor.io",
    role: {
      en: "Software Engineer",
      pt: "Engenheiro de Software",
    },
    startDate: "Jun 2021",
    endDate: null,
    description: {
      en: "Working on e-commerce search and discovery products.",
      pt: "Trabalhando em produtos de busca e descoberta para e-commerce.",
    },
    skillIcons: "react,ts,ruby",
  },
  {
    company: "Jungsoft",
    url: "https://jungsoft.io",
    role: {
      en: "Full-stack Developer",
      pt: "Desenvolvedor Full-stack",
    },
    startDate: "2018",
    endDate: { en: "May 2021", pt: "Mai 2021" },
    description: {
      en: "Built web and mobile applications including a cryptocurrency platform.",
      pt: "Construiu aplicacoes web e mobile incluindo uma plataforma de criptomoedas.",
    },
    skillIcons: "react,rails,react",
  },
  {
    company: "Kartrak",
    url: "https://kartrak.app",
    role: {
      en: "Full-stack Developer",
      pt: "Desenvolvedor Full-stack",
    },
    startDate: "2018",
    endDate: { en: "May 2021", pt: "Mai 2021" },
    description: {
      en: "Automation platform for the concrete industry.",
      pt: "Plataforma de automacao para a industria de concreto.",
    },
    skillIcons: "rails,react,androidstudio",
  },
  {
    company: "Singular Sistemas",
    role: {
      en: "Full-stack Developer",
      pt: "Desenvolvedor Full-stack",
    },
    startDate: "2017",
    endDate: { en: "2018", pt: "2018" },
    description: {
      en: "Built REST APIs and Android applications.",
      pt: "Construiu APIs REST e aplicacoes Android.",
    },
    skillIcons: "python,django,androidstudio",
  },
  {
    company: "UDESC",
    role: {
      en: "Scholarship Developer",
      pt: "Desenvolvedor Bolsista",
    },
    startDate: "2014",
    endDate: { en: "2015", pt: "2015" },
    description: {
      en: "Developed academic tools using JSF and PrimeFaces.",
      pt: "Desenvolveu ferramentas academicas usando JSF e PrimeFaces.",
    },
    skillIcons: "java",
  },
];
```

- [ ] **Step 3: Create projects data**

Create `src/data/projects.ts`:

```ts
export interface ProjectEntry {
  name: string;
  description: { en: string; pt: string };
  skillIcons: string;
  liveUrl?: string;
  codeUrl?: string;
  image?: string;
}

export const projects: ProjectEntry[] = [
  // TODO: Gabriel will fill in project details later
];
```

- [ ] **Step 4: Create skills data**

Create `src/data/skills.ts`:

```ts
export interface SkillCategory {
  category: { en: string; pt: string };
  icons: string; // comma-separated skillicons.dev ids
}

export const skills: SkillCategory[] = [
  {
    category: { en: "Frontend", pt: "Frontend" },
    icons: "react,ts,js,html,css",
  },
  {
    category: { en: "Backend", pt: "Backend" },
    icons: "ruby,rails,python,django,elixir,java",
  },
  {
    category: { en: "Mobile", pt: "Mobile" },
    icons: "androidstudio",
  },
  {
    category: { en: "Databases", pt: "Bancos de Dados" },
    icons: "postgres,mysql",
  },
  {
    category: { en: "Tools", pt: "Ferramentas" },
    icons: "git,github,graphql,docker",
  },
];
```

- [ ] **Step 5: Create education data**

Create `src/data/education.ts`:

```ts
export interface EducationEntry {
  institution: string;
  degree: { en: string; pt: string };
  startYear: string;
  endYear: string;
}

export const education: EducationEntry[] = [
  {
    institution: "UDESC",
    degree: {
      en: "Bachelor's in Software Engineering",
      pt: "Bacharelado em Engenharia de Software",
    },
    startYear: "2014",
    endYear: "2018",
  },
];
```

- [ ] **Step 6: Create articles data**

Create `src/data/articles.ts`:

```ts
export interface ArticleEntry {
  title: { en: string; pt: string };
  venue: string;
  year: string;
  url?: string;
}

export const articles: ArticleEntry[] = [
  {
    title: {
      en: "Guiding students to solve programming exercises by verifying their objectives during program execution",
      pt: "Conduzindo os alunos a resolverem exercicios de programacao atraves da verificacao de seus objetivos durante a execucao do programa",
    },
    venue: "SBIE - Simposio Brasileiro de Informatica na Educacao",
    year: "2017",
  },
];
```

- [ ] **Step 7: Commit**

```bash
git add src/data/
git commit -m "feat: add typed content data files for all portfolio sections"
```

---

## Task 5: Reusable Section Component

**Files:**
- Create: `src/components/Section.tsx`

- [ ] **Step 1: Create the Section wrapper component**

Create `src/components/Section.tsx`:

```tsx
import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SectionProps {
  id: string;
  heading: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, heading, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`py-20 px-6 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold font-mono mb-10 text-accent">
          {heading}
        </h2>
        {children}
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Section.tsx
git commit -m "feat: add reusable Section component with scroll animation"
```

---

## Task 6: Navbar with Scroll Spy

**Files:**
- Create: `src/hooks/useScrollSpy.ts`, `src/components/Navbar.tsx`, `src/components/MobileMenu.tsx`, `src/components/MinimizeButton.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the useScrollSpy hook**

Create `src/hooks/useScrollSpy.ts`:

```ts
import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { rootMargin: "-50% 0px -50% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return activeId;
}
```

- [ ] **Step 2: Create the MinimizeButton component**

Create `src/components/MinimizeButton.tsx`:

```tsx
interface MinimizeButtonProps {
  onClick: () => void;
}

export function MinimizeButton({ onClick }: MinimizeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors font-mono text-sm font-bold"
      aria-label="Minimize to retro computer view"
      title="Minimize"
    >
      _
    </button>
  );
}
```

- [ ] **Step 3: Create the MobileMenu component**

Create `src/components/MobileMenu.tsx`:

```tsx
import { useTranslation } from "react-i18next";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  sectionIds: string[];
  activeId: string;
}

export function MobileMenu({ isOpen, onClose, sectionIds, activeId }: MobileMenuProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <nav className="fixed top-0 right-0 h-full w-64 bg-bg-light dark:bg-bg-dark shadow-lg p-6 pt-20">
        <ul className="flex flex-col gap-4">
          {sectionIds.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={onClose}
                className={`font-mono text-sm transition-colors ${
                  activeId === id
                    ? "text-accent font-bold"
                    : "text-gray-600 dark:text-gray-400 hover:text-accent"
                }`}
              >
                {t(`nav.${id}`)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
```

- [ ] **Step 4: Create the Navbar component**

Create `src/components/Navbar.tsx`:

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { MinimizeButton } from "./MinimizeButton";
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

interface NavbarProps {
  onMinimize: () => void;
}

export function Navbar({ onMinimize }: NavbarProps) {
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
            <MinimizeButton onClick={onMinimize} />
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
```

- [ ] **Step 5: Wire Navbar into App**

Replace `src/App.tsx` with:

```tsx
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
```

- [ ] **Step 6: Verify navbar works**

```bash
npm run dev
```

Expected: Fixed navbar at top with "GN" logo, section links (highlighted as you scroll), language/theme toggles, and minimize button. On mobile width, section links collapse to hamburger menu. Clicking minimize shows placeholder; clicking maximize returns to normal view.

- [ ] **Step 7: Commit**

```bash
git add src/hooks/useScrollSpy.ts src/components/Navbar.tsx src/components/MobileMenu.tsx src/components/MinimizeButton.tsx src/App.tsx
git commit -m "feat: add navbar with scroll spy, mobile menu, and minimize button"
```

---

## Task 7: Hero Section

**Files:**
- Create: `src/sections/Hero.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the Hero section**

Create `src/sections/Hero.tsx`:

```tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { personal } from "../data/personal";

export function Hero() {
  const { i18n } = useTranslation();
  const lang = i18n.language as "en" | "pt";

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold font-mono mb-4">
          {personal.name}
        </h1>
        <p className="text-xl md:text-2xl text-accent font-mono">
          {personal.title[lang]}
          <span className="animate-pulse">_</span>
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          {personal.tagline[lang]}
        </p>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <a
            href={personal.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href={personal.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </motion.div>

      {/* Scroll down indicator */}
      <motion.div
        className="absolute bottom-8"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Add Hero to App**

In `src/App.tsx`, import and add the Hero above the placeholder sections:

```tsx
import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./sections/Hero";

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
```

- [ ] **Step 3: Verify Hero renders**

```bash
npm run dev
```

Expected: Full-viewport hero with "Gabriel Naoto", animated cursor, title, tagline, GitHub/LinkedIn icons, and a bouncing scroll-down indicator. Language toggle switches the title and tagline.

- [ ] **Step 4: Commit**

```bash
git add src/sections/Hero.tsx src/App.tsx
git commit -m "feat: add hero section with typing animation and social links"
```

---

## Task 8: About Section

**Files:**
- Create: `src/sections/About.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the About section**

Create `src/sections/About.tsx`:

```tsx
import { useTranslation } from "react-i18next";
import { Section } from "../components/Section";
import { personal } from "../data/personal";

export function About() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "pt";

  return (
    <Section id="about" heading={t("about.heading")}>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src="/images/profile.jpg"
          alt={personal.name}
          className="w-40 h-40 rounded-full object-cover border-2 border-accent"
        />
        <div className="flex-1">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {personal.bio[lang]}
          </p>
          <button
            id="download-cv-btn"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-mono text-sm hover:bg-accent-light transition-colors"
          >
            {t("about.downloadCv")}
          </button>
        </div>
      </div>
    </Section>
  );
}
```

Note: The download button is a placeholder that will be wired up to the PDF generator in Task 12.

- [ ] **Step 2: Replace About placeholder in App**

In `src/App.tsx`, import `About` and replace the about placeholder:

```tsx
import { About } from "./sections/About";
```

Replace `<div id="about" ...>About</div>` with `<About />`.

- [ ] **Step 3: Verify About renders**

```bash
npm run dev
```

Expected: About section with profile image (uses existing `/images/profile.jpg`), bio text, and download CV button. Language toggle switches the bio text.

- [ ] **Step 4: Commit**

```bash
git add src/sections/About.tsx src/App.tsx
git commit -m "feat: add about section with bio and CV download placeholder"
```

---

## Task 9: Experience Section

**Files:**
- Create: `src/sections/Experience.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the Experience section**

Create `src/sections/Experience.tsx`:

```tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Section } from "../components/Section";
import { experience } from "../data/experience";
import { useTheme } from "../hooks/useTheme";

export function Experience() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "pt";
  const { theme } = useTheme();

  return (
    <Section id="experience" heading={t("experience.heading")}>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700" />

        {experience.map((entry, i) => {
          const isLeft = i % 2 === 0;
          const endDate = entry.endDate?.[lang] ?? t("experience.present");

          return (
            <motion.div
              key={`${entry.company}-${entry.startDate}`}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative mb-12 md:w-1/2 pl-8 md:pl-0 ${
                isLeft
                  ? "md:pr-12 md:text-right"
                  : "md:ml-auto md:pl-12"
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute top-2 w-3 h-3 rounded-full bg-accent left-[-6px] ${
                  isLeft
                    ? "md:left-auto md:right-[-6px]"
                    : "md:left-[-6px]"
                }`}
              />

              <h3 className="font-mono font-bold text-lg">
                {entry.url ? (
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    {entry.company}
                  </a>
                ) : (
                  entry.company
                )}
              </h3>
              <p className="text-accent font-mono text-sm">
                {entry.role[lang]}
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm font-mono mb-2">
                {entry.startDate} — {endDate}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                {entry.description[lang]}
              </p>
              <img
                src={`https://skillicons.dev/icons?i=${entry.skillIcons}&theme=${theme}`}
                alt={`Tech: ${entry.skillIcons}`}
                className={`h-8 ${isLeft ? "md:ml-auto" : ""}`}
              />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Replace Experience placeholder in App**

In `src/App.tsx`, import `Experience` and replace the experience placeholder:

```tsx
import { Experience } from "./sections/Experience";
```

Replace `<div id="experience" ...>Experience</div>` with `<Experience />`.

- [ ] **Step 3: Verify Experience renders**

```bash
npm run dev
```

Expected: Alternating timeline with company names, roles, dates, descriptions, and skillicons.dev images. Icons swap between dark/light themes. Language toggle switches role and description text.

- [ ] **Step 4: Commit**

```bash
git add src/sections/Experience.tsx src/App.tsx
git commit -m "feat: add experience section with timeline and skillicons"
```

---

## Task 10: Projects, Skills, Education, Articles, and Contact Sections

**Files:**
- Create: `src/sections/Projects.tsx`, `src/sections/Skills.tsx`, `src/sections/Education.tsx`, `src/sections/Articles.tsx`, `src/sections/Contact.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the Projects section**

Create `src/sections/Projects.tsx`:

```tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Section } from "../components/Section";
import { projects } from "../data/projects";
import { useTheme } from "../hooks/useTheme";

export function Projects() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "pt";
  const { theme } = useTheme();

  if (projects.length === 0) return null;

  return (
    <Section id="projects" heading={t("projects.heading")}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1 transition-all"
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="font-mono font-bold text-lg mb-2">{project.name}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
              {project.description[lang]}
            </p>
            <img
              src={`https://skillicons.dev/icons?i=${project.skillIcons}&theme=${theme}`}
              alt={`Tech: ${project.skillIcons}`}
              className="h-8 mb-4"
            />
            <div className="flex gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-accent hover:underline"
                >
                  {t("projects.viewLive")}
                </a>
              )}
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono text-accent hover:underline"
                >
                  {t("projects.viewCode")}
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Create the Skills section**

Create `src/sections/Skills.tsx`:

```tsx
import { useTranslation } from "react-i18next";
import { Section } from "../components/Section";
import { skills } from "../data/skills";
import { useTheme } from "../hooks/useTheme";

export function Skills() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "pt";
  const { theme } = useTheme();

  return (
    <Section id="skills" heading={t("skills.heading")}>
      <div className="space-y-8">
        {skills.map((category) => (
          <div key={category.category.en}>
            <h3 className="font-mono font-bold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              {category.category[lang]}
            </h3>
            <img
              src={`https://skillicons.dev/icons?i=${category.icons}&theme=${theme}`}
              alt={`${category.category[lang]} skills`}
              className="h-12"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Create the Education section**

Create `src/sections/Education.tsx`:

```tsx
import { useTranslation } from "react-i18next";
import { Section } from "../components/Section";
import { education } from "../data/education";

export function Education() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "pt";

  return (
    <Section id="education" heading={t("education.heading")}>
      <div className="space-y-4">
        {education.map((entry) => (
          <div
            key={`${entry.institution}-${entry.endYear}`}
            className="flex flex-col md:flex-row md:items-baseline md:justify-between"
          >
            <div>
              <h3 className="font-mono font-bold">{entry.institution}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {entry.degree[lang]}
              </p>
            </div>
            <p className="text-gray-500 font-mono text-sm">
              {entry.startYear} — {entry.endYear}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Create the Articles section**

Create `src/sections/Articles.tsx`:

```tsx
import { useTranslation } from "react-i18next";
import { Section } from "../components/Section";
import { articles } from "../data/articles";

export function Articles() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "pt";

  return (
    <Section id="articles" heading={t("articles.heading")}>
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.title.en}>
            <h3 className="font-mono font-bold">
              {article.url ? (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  {article.title[lang]}
                </a>
              ) : (
                article.title[lang]
              )}
            </h3>
            <p className="text-gray-500 text-sm font-mono">
              {article.venue} — {article.year}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 5: Create the Contact section**

Create `src/sections/Contact.tsx`:

```tsx
import { useTranslation } from "react-i18next";
import { personal } from "../data/personal";

export function Contact() {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="py-20 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold font-mono mb-6 text-accent">
          {t("contact.heading")}
        </h2>
        <a
          href={`mailto:${personal.email}`}
          className="text-lg font-mono hover:text-accent transition-colors"
        >
          {personal.email}
        </a>
        <div className="flex items-center justify-center gap-6 mt-6">
          <a
            href={personal.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors font-mono text-sm"
          >
            GitHub
          </a>
          <a
            href={personal.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-accent transition-colors font-mono text-sm"
          >
            LinkedIn
          </a>
        </div>
        <p className="mt-10 text-gray-500 text-sm font-mono">
          &copy; {new Date().getFullYear()} {personal.name}
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Wire all sections into App**

Replace `src/App.tsx` with the final version (all placeholder divs replaced):

```tsx
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
```

- [ ] **Step 7: Verify all sections render**

```bash
npm run dev
```

Expected: Full single-page portfolio with all sections rendering. Scroll spy highlights active section. Language toggle switches all text. Theme toggle switches colors and skillicons themes. Projects section is hidden (empty array). Minimize button shows placeholder.

- [ ] **Step 8: Commit**

```bash
git add src/sections/ src/App.tsx
git commit -m "feat: add projects, skills, education, articles, and contact sections"
```

---

## Task 11: Responsive Design Polish

**Files:**
- Modify: `src/sections/Experience.tsx`, `src/components/Navbar.tsx`

- [ ] **Step 1: Fix experience timeline for mobile**

In `src/sections/Experience.tsx`, the timeline currently uses `md:left-1/2` for the center line. On mobile, everything should stack left-aligned. Verify that the existing responsive classes handle this correctly by testing at mobile viewport width.

If adjustments are needed, the timeline line should be `left-0` on mobile (already set), and all entries should be `pl-8` without the alternating positioning.

- [ ] **Step 2: Test mobile responsiveness**

```bash
npm run dev
```

Test at 375px viewport width:
- Navbar collapses to hamburger
- Hero text scales down
- Experience timeline stacks vertically
- Skills icons wrap properly
- Contact footer looks good

- [ ] **Step 3: Fix any responsive issues found**

Address any layout issues observed. Common fixes:
- Add `text-center md:text-left` for alignment
- Add `overflow-x-auto` on skillicons images if they exceed mobile width
- Ensure no horizontal scroll on any section

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "fix: responsive design polish for mobile viewports"
```

---

## Task 12: Client-Side PDF Resume Generation

**Files:**
- Create: `src/pdf/ResumePdf.tsx`, `src/pdf/DownloadButton.tsx`
- Modify: `src/sections/About.tsx`

- [ ] **Step 1: Install @react-pdf/renderer**

```bash
npm install @react-pdf/renderer
```

- [ ] **Step 2: Create the ResumePdf document**

Create `src/pdf/ResumePdf.tsx`:

```tsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { personal } from "../data/personal";
import { experience } from "../data/experience";
import { education } from "../data/education";
import { skills } from "../data/skills";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.3,
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 4,
  },
  contactRow: {
    textAlign: "center",
    fontSize: 9,
    color: "#333",
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 10,
    marginBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 2,
  },
  entryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  entryCompany: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  entryRole: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 10,
  },
  entryDate: {
    fontSize: 10,
    textAlign: "right",
  },
  bulletItem: {
    flexDirection: "row",
    marginLeft: 12,
    marginTop: 2,
  },
  bullet: {
    width: 8,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  skillCategory: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  skillItems: {
    fontSize: 10,
  },
});

interface ResumePdfProps {
  lang: "en" | "pt";
}

export function ResumePdf({ lang }: ResumePdfProps) {
  const presentLabel = lang === "en" ? "Present" : "Atual";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Name */}
        <Text style={styles.name}>{personal.fullName}</Text>

        {/* Contact */}
        <Text style={styles.contactRow}>
          {personal.email} | {personal.social.github} | {personal.social.linkedin}
        </Text>

        {/* Experience */}
        <Text style={styles.sectionHeading}>
          {lang === "en" ? "Experience" : "Experiencia"}
        </Text>
        {experience.map((entry) => {
          const endDate = entry.endDate?.[lang] ?? presentLabel;
          return (
            <View key={`${entry.company}-${entry.startDate}`}>
              <View style={styles.entryRow}>
                <View>
                  <Text style={styles.entryCompany}>{entry.company}</Text>
                  <Text style={styles.entryRole}>{entry.role[lang]}</Text>
                </View>
                <Text style={styles.entryDate}>
                  {entry.startDate} — {endDate}
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bullet}>&#8226;</Text>
                <Text style={styles.bulletText}>{entry.description[lang]}</Text>
              </View>
            </View>
          );
        })}

        {/* Education */}
        <Text style={styles.sectionHeading}>
          {lang === "en" ? "Education" : "Formacao"}
        </Text>
        {education.map((entry) => (
          <View key={`${entry.institution}-${entry.endYear}`} style={styles.entryRow}>
            <View>
              <Text style={styles.entryCompany}>{entry.institution}</Text>
              <Text style={styles.entryRole}>{entry.degree[lang]}</Text>
            </View>
            <Text style={styles.entryDate}>
              {entry.startYear} — {entry.endYear}
            </Text>
          </View>
        ))}

        {/* Skills */}
        <Text style={styles.sectionHeading}>
          {lang === "en" ? "Technical Skills" : "Habilidades Tecnicas"}
        </Text>
        {skills.map((category) => (
          <View key={category.category.en} style={styles.skillsRow}>
            <Text style={styles.skillCategory}>
              {category.category[lang]}:{" "}
            </Text>
            <Text style={styles.skillItems}>
              {category.icons.split(",").join(", ")}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
```

- [ ] **Step 3: Create the DownloadButton component**

Create `src/pdf/DownloadButton.tsx`:

```tsx
import { pdf } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import { ResumePdf } from "./ResumePdf";

export function DownloadButton() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "pt";

  const handleDownload = async () => {
    const blob = await pdf(<ResumePdf lang={lang} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gabriel-naoto-resume-${lang}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-mono text-sm hover:bg-accent-light transition-colors"
    >
      {t("about.downloadCv")}
    </button>
  );
}
```

- [ ] **Step 4: Wire DownloadButton into About section**

In `src/sections/About.tsx`, replace the placeholder button:

```tsx
import { useTranslation } from "react-i18next";
import { Section } from "../components/Section";
import { personal } from "../data/personal";
import { DownloadButton } from "../pdf/DownloadButton";

export function About() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "pt";

  return (
    <Section id="about" heading={t("about.heading")}>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src="/images/profile.jpg"
          alt={personal.name}
          className="w-40 h-40 rounded-full object-cover border-2 border-accent"
        />
        <div className="flex-1">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {personal.bio[lang]}
          </p>
          <DownloadButton />
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 5: Verify PDF download works**

```bash
npm run dev
```

Expected: Click "Download CV" in the About section. A PDF file downloads named `gabriel-naoto-resume-en.pdf` (or `pt`). Open it — should show name in large caps at top, contact info, experience with bullet points, education, and skills in Jake's Resume style. Switch language to PT and download again — PDF content is in Portuguese.

- [ ] **Step 6: Commit**

```bash
git add src/pdf/ src/sections/About.tsx package.json package-lock.json
git commit -m "feat: add client-side PDF resume generation in Jake's Resume style"
```

---

## Task 13: Three.js Retro Computer "Minimize" Mode

**Files:**
- Create: `src/three/MinimizedView.tsx`, `src/three/RetroComputer.tsx`, `src/three/MaximizeButton.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Install Three.js dependencies**

```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

- [ ] **Step 2: Create the RetroComputer 3D model**

Create `src/three/RetroComputer.tsx`:

```tsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
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
```

- [ ] **Step 3: Create the MaximizeButton 3D overlay**

Create `src/three/MaximizeButton.tsx`:

```tsx
interface MaximizeButtonProps {
  onClick: () => void;
}

export function MaximizeButton({ onClick }: MaximizeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 right-4 z-50 px-4 py-2 bg-white/10 backdrop-blur-md text-white font-mono text-sm rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
      aria-label="Maximize to full screen view"
    >
      [ ] Maximize
    </button>
  );
}
```

- [ ] **Step 4: Create the MinimizedView wrapper**

Create `src/three/MinimizedView.tsx`:

```tsx
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Environment } from "@react-three/drei";
import { RetroComputer } from "./RetroComputer";
import { MaximizeButton } from "./MaximizeButton";
import { Navbar } from "../components/Navbar";
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
```

- [ ] **Step 5: Wire MinimizedView into App with lazy loading**

Replace `src/App.tsx` with:

```tsx
import { lazy, Suspense, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Education } from "./sections/Education";
import { Articles } from "./sections/Articles";
import { Contact } from "./sections/Contact";

const MinimizedView = lazy(() =>
  import("./three/MinimizedView").then((m) => ({ default: m.MinimizedView }))
);

function App() {
  const [minimized, setMinimized] = useState(false);

  if (minimized) {
    return (
      <Suspense
        fallback={
          <div className="w-screen h-screen bg-[#1a1a2e] flex items-center justify-center">
            <p className="text-white font-mono animate-pulse">Loading 3D scene...</p>
          </div>
        }
      >
        <MinimizedView onMaximize={() => setMinimized(false)} />
      </Suspense>
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
```

- [ ] **Step 6: Verify 3D scene works**

```bash
npm run dev
```

Expected: Click the `_` minimize button in the navbar. Page transitions to a dark scene with a 3D retro CRT monitor, keyboard, and mouse. The portfolio content is visible and scrollable on the CRT screen. OrbitControls let you rotate the camera. The "Maximize" button in the top-right returns to the normal view. The 3D assets only load when minimize is clicked (lazy loaded).

- [ ] **Step 7: Commit**

```bash
git add src/three/ src/App.tsx package.json package-lock.json
git commit -m "feat: add Three.js retro computer minimize mode with interactive CRT screen"
```

---

## Task 14: Build Verification & Final Cleanup

**Files:**
- Modify: `.gitignore`, `index.html`

- [ ] **Step 1: Update .gitignore for the new project**

Add these entries to `.gitignore`:

```
node_modules
dist
*.local
```

- [ ] **Step 2: Update the Vite index.html title and meta**

In `index.html` (the one Vite created at root), update the `<title>` and add a meta description:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/images/profiles.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Gabriel Naoto - Software Engineer portfolio" />
    <title>Gabriel Naoto — Software Engineer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Expected: Build completes without errors. Output in `dist/` folder.

- [ ] **Step 4: Preview the production build**

```bash
npm run preview
```

Expected: Production build serves correctly. All sections render, theme toggle works, language toggle works, PDF download works, 3D minimize mode works.

- [ ] **Step 5: Commit**

```bash
git add .gitignore index.html
git commit -m "chore: update gitignore, index.html meta for React app"
```

- [ ] **Step 6: Verify the branch is ready**

```bash
git log --oneline react-rewrite ^master
```

Expected: All commits from this implementation plan are listed. The branch is ready for review before merging to `master`.
