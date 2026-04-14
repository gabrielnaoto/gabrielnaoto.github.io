# React Portfolio Redesign — Design Spec

## Overview

Rebuild gabrielnaoto.github.io as a modern React single-page application, replacing the current static HTML Bootstrap site. The new site features a clean/minimal developer aesthetic, bilingual support (EN/PT), dark/light theming, and a unique "minimize" mode that renders the entire portfolio inside a 3D retro 90s computer scene using Three.js.

## Tech Stack

- **Build tool:** Vite
- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Font:** FiraCode via `@fontsource/fira-code`
- **i18n:** `react-i18next` (EN/PT)
- **Animations:** Framer Motion (scroll-triggered)
- **3D:** `@react-three/fiber` + `@react-three/drei`
- **Deployment:** GitHub Actions -> GitHub Pages

## Branch Strategy

- All work happens on a `react-rewrite` branch.
- GitHub Actions deploys only on merge to `master`.
- The current static site stays live until the merge.

## Project Structure

```
src/
  components/       # Reusable UI (Navbar, Section, ThemeToggle, LanguageToggle, MinimizeButton)
  sections/         # Page sections (Hero, About, Experience, Projects, Skills, Education, Articles, Contact)
  three/            # 3D scene (RetroComputer, CRTMonitor, Keyboard, Mouse, MinimizedView)
  i18n/             # Translation files (en.json, pt.json)
  data/             # Content data (experience.ts, projects.ts, education.ts, skills.ts, articles.ts)
  hooks/            # Custom hooks (useTheme, useScrollSpy)
  assets/           # Images, PDF resume
  App.tsx
  main.tsx
```

Content is separated from components. All text and data lives in `src/data/` and `src/i18n/`, so the CV can be updated without touching component code.

## Three.js "Minimize" Mode

### Behavior

- A minimize icon (`_`, styled like a classic window title bar button) lives in the navbar.
- Clicking it triggers an animated transition from the normal 2D portfolio view into a 3D scene.
- The 3D scene renders: a CRT monitor on a simple surface, a chunky keyboard, and a ball mouse.
- The portfolio content is embedded on the CRT screen via `drei`'s `Html` component — fully scrollable and interactive.
- A maximize icon (or double-click on the monitor) transitions back to the full-screen 2D view.
- In minimized mode, the navbar is hidden — the 3D scene is full-screen. The maximize control is rendered inside the 3D scene (e.g., a floating UI element or a button on the monitor frame).
- Transition: a brief zoom/scale animation (portfolio shrinks into the monitor, or camera pulls back to reveal the scene).

### 3D Models

- Simple low-poly models for the computer setup — either constructed with basic Three.js geometries in code or sourced from a free CC0 asset (e.g., Sketchfab).
- CRT monitor with a slight screen curvature or scanline shader for the retro feel.

### Performance

- The Three.js canvas only mounts when "minimized" mode is active — no 3D overhead in the default view.
- The 3D scene is lazy-loaded via `React.lazy` so it does not bloat the initial bundle.

## Navigation & Theming

### Navbar (fixed at top)

- Left: site name/logo (name in FiraCode).
- Center: section links (smooth scroll to anchors).
- Right: language toggle (EN/PT), dark/light mode toggle, minimize button.
- Mobile: hamburger menu for section links; toggle icons remain visible.

### Dark/Light Mode

- Default follows system preference via `prefers-color-scheme`.
- Toggle overrides and persists the choice in `localStorage`.
- Tailwind's `dark:` variant handles all styling.
- Dark theme: near-black background (~`#0a0a0a`), light text, subtle teal/cyan accent.
- Light theme: white/off-white background, dark text, same accent color.

### Language Toggle

- Simple EN | PT button/switch in the navbar.
- Persists choice in `localStorage`.
- All UI text served from `react-i18next` translation files.
- Content data files include both language versions.

### Scroll Behavior

- Smooth scroll when clicking nav links.
- Active section highlighted in navbar via a `useScrollSpy` hook (IntersectionObserver-based).

## Page Sections

### Hero

- Full viewport height.
- Name in large FiraCode, title ("Software Engineer") below.
- Short one-liner or tagline.
- Subtle animated element: a blinking cursor after the title or a terminal-style typing effect.
- Social links (GitHub, LinkedIn) as icons.
- "Scroll down" indicator.

### About Me

- Brief paragraph about who you are.
- Optional profile photo.
- "Download CV" button that generates a PDF client-side using `@react-pdf/renderer`, pulling from the same `src/data/` content files that power the site — no static PDF file needed.

#### PDF Resume Style (matching Jake's Resume Overleaf template)

- Single-column layout, compact margins (~0.5in).
- Name centered at top in large small-caps.
- Contact info (email, GitHub, LinkedIn) centered below the name.
- Section headings in small-caps with a horizontal rule divider below.
- Experience entries: bold company name + italic role on the left, dates right-aligned. Small bullet points for achievement descriptions.
- Education: same two-column format as experience (institution + degree left, dates right).
- Skills: inline format — `Category: item, item, item` — bold category labels.
- Tight vertical spacing throughout to fit on one page.
- The PDF language matches the currently selected site language (EN or PT).

### Work Experience

- Vertical timeline layout.
- Each entry: company name, role, date range, brief description, and tech icons via skillicons.dev (e.g., `https://skillicons.dev/icons?i=react,ts,rails`).
- Alternating left/right on desktop, stacked on mobile.
- Framer Motion fade-in on scroll.

### Projects Showcase

- Card grid (2-3 columns on desktop, 1 on mobile).
- Each card: project name, screenshot/thumbnail, short description, tech tags, links (live site, GitHub).
- Hover effect: subtle lift/glow.

### Skills / Tech Stack

- Grouped by category (Frontend, Backend, Tools, etc.).
- Each skill rendered using skillicons.dev icons (e.g., `https://skillicons.dev/icons?i=react,ts,python&theme=dark`).
- The `theme` parameter switches between `dark` and `light` to match the current site theme.
- Simple grid layout, no progress bars or proficiency ratings.

### Education

- Compact list: degree, institution, year.
- Simpler than work experience, no timeline needed.

### Published Articles / Talks

- List with title, venue/publication, year, and link.

### Contact Info

- Email, social links, GitHub.
- No contact form — just direct links.
- Located at the bottom as a footer section.

## Responsive Design

- Mobile-first approach via Tailwind breakpoints.
- Navbar collapses to hamburger on mobile.
- Experience timeline stacks vertically on mobile.
- Project cards go single-column on mobile.
- The 3D "minimize" mode is available on all screen sizes, but the CRT screen content scales to remain usable on smaller viewports.

## Deployment

- GitHub Actions workflow triggers on push to `master`.
- Runs `npm run build`, outputs to `dist/`.
- Deploys `dist/` to GitHub Pages using `peaceiris/actions-gh-pages` (or equivalent).
- The workflow sets the base path correctly for the user site (root `/`).
