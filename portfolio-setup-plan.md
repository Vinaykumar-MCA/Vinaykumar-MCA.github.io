# Portfolio Setup Plan — Vinay Kumar

## Top-Level Overview

**Goal:** Bootstrap a production-ready, premium portfolio website for Vinay Kumar using React 19 + Vite + JavaScript + Tailwind CSS + Framer Motion + shadcn/ui. The output is a clean scaffold: folder structure, all dependencies installed and configured, routing, dark/light theme system, a reusable layout shell, and placeholder stubs for all 7 sections.

**Scope (this plan):**
- Project initialisation (Vite + React 19)
- Dependency installation & configuration
- Professional folder structure
- Tailwind CSS + shadcn/ui wiring
- Dark/Light Theme (CSS variables + React context + localStorage persistence)
- React Router setup (single-page, hash or history routing)
- Layout shell (Navbar + Footer + main content area)
- Seven placeholder section stubs: Hero, About, Skills, Projects, Experience, Open Source, Contact
- Environment variable support (`.env.example`)
- Lazy loading + Error Boundary wiring at the route level
- SEO baseline (`react-helmet-async`)
- Reusable hooks scaffold

**Out of scope:** actual section content, animations inside sections, real data.

**Single-page approach:** React Router renders one route (`/`) which renders all 7 section components stacked vertically. Navbar links smooth-scroll to section `id`s.

---

## Sub-Tasks

---

### Sub-Task 1 — Project Initialisation & Dependency Installation

**Intent:** Create the Vite + React 19 project and install every required package so the rest of the plan has a working base.

**Expected Outcomes:**
- `package.json` exists with all dependencies listed below
- `vite.config.js` is configured (path aliases, base URL)
- `.env.example` exists with placeholder variables
- Project runs with `npm run dev` without errors

**Todo List:**
1. Run `npm create vite@latest . -- --template react` inside the workspace root (overwrite existing files if prompted)
2. Install production dependencies:
   ```
   react-router-dom framer-motion react-helmet-async
   react-icons lucide-react clsx tailwind-merge
   class-variance-authority @radix-ui/react-slot
   @radix-ui/react-dialog @radix-ui/react-tooltip
   @radix-ui/react-dropdown-menu
   ```
3. Install dev dependencies:
   ```
   tailwindcss postcss autoprefixer @tailwindcss/typography
   ```
4. Run `npx tailwindcss init -p` to generate `tailwind.config.js` and `postcss.config.js`
5. Configure `vite.config.js`:
   - Add path alias `@` → `src/`
   - Set `base: '/'`
6. Create `.env.example` with:
   ```
   VITE_SITE_URL=https://vinaykumar.dev
   VITE_SITE_NAME=Vinay Kumar
   VITE_GA_ID=
   ```
7. Verify `npm run dev` starts without errors

**Relevant Context:** Empty workspace. All files are net-new.

**Status:** [ ] pending

---

### Sub-Task 2 — Professional Folder Structure

**Intent:** Create the full directory and file skeleton so every subsequent sub-task has a known target path.

**Expected Outcomes:**
- All directories and empty index files exist at the paths defined below
- No logic written yet — only the scaffold

**Folder Structure:**
```
src/
├── assets/
│   ├── fonts/
│   └── images/
├── components/
│   ├── ui/              ← shadcn/ui primitives (Button, Card, Badge, etc.)
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   └── shared/
│       ├── SectionWrapper.jsx
│       ├── ThemeToggle.jsx
│       └── ErrorBoundary.jsx
├── hooks/
│   ├── useTheme.js
│   ├── useScrollSpy.js
│   └── useInView.js
├── context/
│   └── ThemeContext.jsx
├── pages/
│   └── Home.jsx
├── sections/
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Experience.jsx
│   ├── OpenSource.jsx
│   └── Contact.jsx
├── lib/
│   └── utils.js          ← cn() helper (clsx + tailwind-merge)
├── styles/
│   └── globals.css       ← Tailwind directives + CSS variables
├── router/
│   └── index.jsx         ← React Router config
├── App.jsx
└── main.jsx
```

**Todo List:**
1. Create all directories listed above under `src/`
2. Create empty placeholder `.jsx` / `.js` files at every path shown
3. Do not write logic — just empty exports (`export default function X() {}`)

**Relevant Context:** Sub-Task 1 must be complete (Vite scaffold exists).

**Status:** [ ] pending

---

### Sub-Task 3 — Tailwind CSS + shadcn/ui Configuration

**Intent:** Wire Tailwind with CSS custom properties so the dark/light theme can be driven entirely by a class on `<html>`. Add the `cn()` utility. Bootstrap the shadcn/ui colour token system.

**Expected Outcomes:**
- `tailwind.config.js` uses `darkMode: 'class'`, includes all `src/` paths in `content`, and maps CSS variable tokens
- `src/styles/globals.css` contains `@tailwind` directives, `:root` light tokens, `.dark` dark tokens
- `src/lib/utils.js` exports `cn()` using `clsx` + `tailwind-merge`
- A shadcn/ui `Button` primitive exists in `src/components/ui/Button.jsx`

**CSS Variable Token Set (light / dark):**
```
--background / --foreground
--primary / --primary-foreground
--secondary / --secondary-foreground
--muted / --muted-foreground
--accent / --accent-foreground
--card / --card-foreground
--border / --input / --ring
--radius
```

**Todo List:**
1. Update `tailwind.config.js`:
   - `darkMode: 'class'`
   - `content: ['./index.html', './src/**/*.{js,jsx}']`
   - Extend `colors` and `borderRadius` with CSS variable references
   - Add `@tailwindcss/typography` to plugins
2. Write `src/styles/globals.css` with `@tailwind base/components/utilities`, `:root {}` (light palette), `.dark {}` (dark palette), smooth scroll on `html`, and base body styles
3. Write `src/lib/utils.js` exporting `cn(...inputs)`
4. Write `src/components/ui/Button.jsx` as a CVA-driven shadcn/ui Button (variants: default, outline, ghost, link; sizes: sm, md, lg)
5. Import `globals.css` in `src/main.jsx`

**Relevant Context:** `src/lib/utils.js`, `src/styles/globals.css`, `tailwind.config.js`, `src/components/ui/Button.jsx`.

**Status:** [ ] pending

---

### Sub-Task 4 — Dark / Light Theme System

**Intent:** Implement a theme context that reads `localStorage`, applies the `dark` class to `<html>`, and exposes a toggle. Implement the `ThemeToggle` component and the `useTheme` hook.

**Expected Outcomes:**
- `src/context/ThemeContext.jsx` exports `ThemeProvider` and `useThemeContext`
- `src/hooks/useTheme.js` wraps the context for easy consumption
- `src/components/shared/ThemeToggle.jsx` renders a Sun/Moon icon button
- Theme persists across page reloads via `localStorage`
- No flash of wrong theme on load (inline script in `index.html`)

**Todo List:**
1. Write `ThemeContext.jsx`: initial value from `localStorage` → system preference → 'light'; on toggle flip class on `document.documentElement` and save to `localStorage`
2. Write `src/hooks/useTheme.js` as a thin wrapper over `useThemeContext`
3. Write `ThemeToggle.jsx` using Lucide `Sun` / `Moon` icons and `useTheme`
4. Add an inline `<script>` in `index.html` `<head>` that reads `localStorage` and applies `.dark` class before React mounts (prevents FOUC)
5. Wrap `<App />` in `<ThemeProvider>` inside `main.jsx`

**Relevant Context:** `src/context/ThemeContext.jsx`, `src/hooks/useTheme.js`, `src/components/shared/ThemeToggle.jsx`, `index.html`.

**Status:** [ ] pending

---

### Sub-Task 5 — React Router Setup

**Intent:** Configure React Router v6 for a single-page portfolio. The router renders one route (`/`) → `<Home />`. Lazy loading and an Error Boundary wrap each route.

**Expected Outcomes:**
- `src/router/index.jsx` exports a configured router using `createBrowserRouter`
- `<Home />` is lazy-loaded with `React.lazy` + `<Suspense>`
- `<ErrorBoundary>` wraps the lazy component
- `src/App.jsx` renders `<RouterProvider router={router} />`

**Todo List:**
1. Write `src/components/shared/ErrorBoundary.jsx` as a class component with `componentDidCatch`, renders a fallback UI on error
2. Write `src/router/index.jsx` using `createBrowserRouter`:
   - Route `path: '/'` → lazy `<Home />`
   - Wrap element with `<Suspense fallback={<PageLoader />}>` and `<ErrorBoundary>`
3. Write a minimal `PageLoader` inline (full-screen centered spinner using Tailwind)
4. Update `src/App.jsx` to render `<RouterProvider router={router} />`

**Relevant Context:** `src/router/index.jsx`, `src/App.jsx`, `src/components/shared/ErrorBoundary.jsx`.

**Status:** [ ] pending

---

### Sub-Task 6 — Layout Shell (Navbar + Footer + Layout)

**Intent:** Build the persistent `<Layout>` wrapper with a sticky `<Navbar>` and `<Footer>`. Navbar contains the logo, smooth-scroll nav links, and the `<ThemeToggle>`.

**Expected Outcomes:**
- `src/components/layout/Layout.jsx` wraps `{children}` between `<Navbar>` and `<Footer>`
- `<Navbar>` is sticky top-0, has a backdrop blur, collapses to a hamburger on mobile
- Nav links are anchor hrefs (`#hero`, `#about`, `#skills`, `#projects`, `#experience`, `#opensource`, `#contact`) for smooth scrolling
- `<Footer>` shows copyright and social links (GitHub, LinkedIn, Twitter)
- `<Layout>` is used in `<Home>`

**Todo List:**
1. Write `src/components/layout/Navbar.jsx`:
   - Desktop: horizontal link list + `ThemeToggle`
   - Mobile: hamburger icon (`lucide-react Menu/X`) → slide-down menu with Framer Motion
   - Active link highlight via `useScrollSpy` hook
2. Write `src/components/layout/Footer.jsx`: centered copyright + icon links (React Icons for GitHub/LinkedIn/Twitter)
3. Write `src/components/layout/Layout.jsx`: `<Navbar /> <main>{children}</main> <Footer />`
4. Write `src/hooks/useScrollSpy.js`: accepts an array of section IDs, uses `IntersectionObserver` to return the currently visible section ID
5. Write `src/components/shared/SectionWrapper.jsx`: a div with standard vertical padding, `id` prop forwarded, and a Framer Motion `whileInView` fade-up animation

**Relevant Context:** `src/components/layout/`, `src/hooks/useScrollSpy.js`, `src/components/shared/SectionWrapper.jsx`.

**Status:** [ ] pending

---

### Sub-Task 7 — Home Page + Section Stubs + SEO Baseline

**Intent:** Assemble `<Home>` by rendering all 7 section stubs inside `<Layout>`. Each stub shows its name as a heading inside `<SectionWrapper>`. Wire `react-helmet-async` for SEO.

**Expected Outcomes:**
- `src/pages/Home.jsx` renders `<Layout>` with all 7 sections in order
- Each section file has correct `id` attribute matching Navbar anchor hrefs
- `<Helmet>` in `<Home>` sets `title`, `description`, `og:*` meta tags using env vars
- `<HelmetProvider>` wraps the app in `main.jsx`
- `src/hooks/useInView.js` exports an `IntersectionObserver`-based hook for future section animations

**Section IDs:**
| Section | ID |
|---|---|
| Hero | `hero` |
| About | `about` |
| Skills | `skills` |
| Projects | `projects` |
| Experience | `experience` |
| Open Source | `opensource` |
| Contact | `contact` |

**Todo List:**
1. Write each of the 7 section stubs in `src/sections/` — each renders a `<SectionWrapper id="...">` containing an `<h2>` placeholder
2. Write `src/pages/Home.jsx`: import all 7 sections + `<Layout>`, add `<Helmet>` with title/description/og tags
3. Wrap `<App />` (or `<RouterProvider>`) with `<HelmetProvider>` in `main.jsx`
4. Write `src/hooks/useInView.js` using `IntersectionObserver` with `threshold` option, returns `[ref, isInView]`
5. Verify the full app renders in the browser with all stubs visible and smooth scroll working

**Relevant Context:** `src/pages/Home.jsx`, `src/sections/`, `src/hooks/useInView.js`, `main.jsx`.

**Status:** [ ] pending

---

### Sub-Task 8 — Hero Section (Apple-Inspired Premium)

**Intent:** Replace the `Hero.jsx` stub with a fully production-ready, premium Hero section. Apple-grade aesthetic: animated mesh/orb background, glassmorphism card, floating coding icons, Framer Motion staggered entrance, typing animation, profile image placeholder, CTA buttons, and social links.

**Expected Outcomes:**
- `src/sections/Hero.jsx` is a complete, standalone component — no changes to any other file
- Animated background: multiple blurred gradient orbs that drift with subtle CSS `@keyframes` animation
- Floating coding icons (React, JS, Node, Python, Java, SQL, etc.) rendered as small glassmorphic badge bubbles orbiting the background
- Typing animation cycles through role strings: `"Software Developer"`, `"Java Developer"`, `"React Engineer"`, `"Node.js Developer"`, `"Python Developer"`, `"Data Analyst"`
- Profile image: circular glassmorphic frame with a placeholder avatar SVG, ready to swap for a real photo
- Name: `Vinay Kumar` — large, bold, gradient text
- Subtitle: `Software Developer | Java | React | Node.js | Python | SQL | Power BI`
- Three CTA buttons:
  - **Download Resume** — primary filled (links to `#` / env var `VITE_RESUME_URL`)
  - **View Projects** — outline (scrolls to `#projects`)
  - **Hire Me** — ghost/accent (links to `#contact`)
- Three social icon links: GitHub (`FaGithub`), LinkedIn (`FaLinkedin`), Email (`MdEmail`) from `react-icons`
- All entrance animations staggered with Framer Motion (`variants` + `staggerChildren`)
- Fully responsive: stacked on mobile, side-by-side on `lg`
- Works in both light and dark theme via CSS variable tokens

**New file:**
```
src/sections/Hero.jsx          ← full implementation (replaces stub)
```

**No other files modified.**

**Component Structure inside Hero.jsx:**
```
<Hero>
  ├── <AnimatedBackground>      ← gradient orbs + CSS keyframes (inline style)
  ├── <FloatingIcons>           ← absolute-positioned tech icon badges
  ├── <motion.div container>
  │   ├── <TextColumn>
  │   │   ├── Greeting tag ("👋 Hello, I'm")
  │   │   ├── <h1> Vinay Kumar — gradient
  │   │   ├── <TypingText>      ← cycles role strings
  │   │   ├── Subtitle line
  │   │   ├── <CTAButtons>      ← Download Resume | View Projects | Hire Me
  │   │   └── <SocialLinks>     ← GitHub | LinkedIn | Email
  │   └── <ImageColumn>
  │       └── Circular profile image placeholder with glow ring
```

**Animation Plan:**
| Element | Animation |
|---|---|
| Entire section | fade-in on mount |
| Greeting + name + subtitle | stagger up from `y: 40` |
| Typing text | character-by-character write/erase loop using `useEffect` + `useState` |
| CTA buttons | stagger up, slight scale on hover |
| Social icons | stagger in from `x: -20`, scale + colour on hover |
| Profile image | scale from 0.8 → 1.0, glow ring pulse via CSS |
| Floating icons | each has unique `y` drift via `motion.div` `animate` + `transition.repeat: Infinity` with different `duration` |
| Background orbs | CSS `@keyframes` slow drift, no JS overhead |

**Typing animation implementation:**
- `useEffect` + `useState` — no external library
- Array of role strings, types character-by-character at ~80ms/char, pauses 1.5s, erases at ~40ms/char, advances to next string

**Floating icon set (tech badges):**
`React`, `JavaScript`, `Node.js`, `Python`, `Java`, `SQL`, `Power BI`, `Git`
Each rendered as a small pill with the `react-icons` brand icon + label, positioned absolutely at predefined `top/left/right/bottom` coordinates, animated with Framer Motion infinite Y-drift.

**Profile image placeholder:**
- Circular div `w-64 h-64` (desktop) / `w-48 h-48` (mobile)
- Glassmorphism border ring with primary colour glow
- Inner SVG silhouette placeholder (generic person icon)
- `src` prop ready: if `VITE_PROFILE_IMAGE` env var is set, use it; otherwise show placeholder SVG

**Button specs:**
| Button | Variant | Icon | Action |
|---|---|---|---|
| Download Resume | primary filled | `HiDownload` (lucide) | `href={import.meta.env.VITE_RESUME_URL \|\| '#'}` |
| View Projects | outline | `FiArrowRight` | `href="#projects"` scroll |
| Hire Me | accent ghost | `HiMail` | `href="#contact"` scroll |

**Todo List:**
1. Add `VITE_RESUME_URL=` and `VITE_PROFILE_IMAGE=` to `.env.example`
2. Write `src/sections/Hero.jsx` with all sub-components inlined (no external imports except React, framer-motion, react-icons, lucide-react, and the `cn` util from `@/lib/utils`)
3. Define `floatingIcons` array with `{ icon, label, style, duration, yRange }` for each tech badge
4. Implement `useTypingAnimation` as an internal hook inside the file
5. Implement `AnimatedBackground` as a pure CSS orbs component (no JS animation — CSS `@keyframes` only)
6. Implement `FloatingIcons` rendering Framer Motion infinite-Y-drift badges
7. Implement `ProfileImage` with env-var-driven src or SVG fallback
8. Implement `CTAButtons` with three buttons using the `Button` primitive from `@/components/ui/Button`
9. Implement `SocialLinks` with GitHub, LinkedIn, Email icon links
10. Assemble all sub-components into the default export `Hero`
11. Ensure `id="hero"` is on the outermost element for scroll-spy

**Relevant Context:**
- `src/components/ui/Button.jsx` — Button primitive (CVA variants)
- `src/lib/utils.js` — `cn()` helper
- `src/components/shared/SectionWrapper.jsx` — NOT used here; Hero is full-viewport, manages its own layout
- `src/styles/globals.css` — CSS variable tokens (`--primary`, `--background`, etc.)
- `.env.example` — add `VITE_RESUME_URL` and `VITE_PROFILE_IMAGE`

**Status:** [ ] pending

---

### Sub-Task 9 — About Me Section

**Intent:** Replace the `About.jsx` stub with a full "About Me" section. Premium layout: animated section heading, a two-column grid (bio text + stat highlights), a short personal tagline, and a "What I Do" card row. No bio data is hardcoded into shared files — everything lives inside `About.jsx`.

**Expected Outcomes:**
- `src/sections/About.jsx` is a complete, standalone component
- Section heading with decorative gradient underline, animated on scroll
- Two-column layout on `lg`; stacked on mobile
- Left column: professional bio paragraph for Vinay Kumar (Software Developer with MCA background, dual-domain expertise in pharmacy + tech, passionate about full-stack development)
- Right column: 4 animated stat cards (Years of Learning, Projects Built, Technologies, Open Source) with count-up animation on scroll into view
- "What I Do" row: 3–4 service cards (Full-Stack Dev, Data Analysis, API Development, UI/UX) with glassmorphism styling, icon, title, short description
- Framer Motion stagger entrance for all elements via `whileInView`
- Fully responsive, dark/light theme via CSS variable tokens
- `id="about"` on outermost element

**New file:**
```
src/sections/About.jsx     ← full implementation (replaces stub)
```

**No other files modified.**

**Component structure inside About.jsx:**
```
<About id="about">
  ├── SectionWrapper
  ├── SectionHeading            ← "About Me" + gradient underline bar
  ├── Two-column grid
  │   ├── BioColumn
  │   │   ├── Avatar/icon accent
  │   │   ├── Bio paragraphs
  │   │   └── Highlight tags (MCA, Full-Stack, Open Source)
  │   └── StatsColumn
  │       └── 4× StatCard (icon + count-up number + label)
  └── WhatIDoRow
      └── 4× ServiceCard (glassmorphism, icon, title, description)
```

**Count-up animation:**
- Internal `useCountUp(target, duration)` hook using `useEffect` + `requestAnimationFrame`
- Triggers only when the stat card enters the viewport (uses `useInView` from `@/hooks/useInView`)

**Animation plan:**
| Element | Animation |
|---|---|
| Section heading | `y: 30 → 0`, fade, `whileInView` |
| Bio paragraphs | stagger `y: 20 → 0`, `whileInView` |
| Stat cards | stagger scale from `0.9 → 1`, `whileInView`, count-up on enter |
| Service cards | stagger `y: 40 → 0`, `whileInView`, lift + glow on hover |

**Todo List:**
1. Write `src/sections/About.jsx` with all sub-components inlined
2. Define `stats` array: `[{ icon, value: 2, suffix: '+', label: 'Years of Learning' }, { icon, value: 10, suffix: '+', label: 'Projects Built' }, { icon, value: 12, suffix: '+', label: 'Technologies' }, { icon, value: 3, suffix: '+', label: 'Open Source Contributions' }]`
3. Implement `useCountUp` as an internal hook (no external deps)
4. Define `services` array: Full-Stack Development, Data & Analytics, RESTful APIs, Responsive UI
5. Implement `SectionHeading` sub-component (reusable locally — NOT exported to shared yet)
6. Implement `StatCard` with Lucide icon, count-up number, label
7. Implement `ServiceCard` with glassmorphism, hover lift, icon, title, description
8. Ensure `id="about"` on root element

**Relevant Context:**
- `src/hooks/useInView.js` — intersection observer hook
- `src/components/shared/SectionWrapper.jsx` — wrap the section
- `src/lib/utils.js` — `cn()`
- CSS variable tokens in `src/styles/globals.css`

**Status:** [ ] pending

---

### Sub-Task 10 — Experience Section (Education Timeline + Work Experience Timeline)

**Intent:** Replace the `Experience.jsx` stub with a full two-sub-section experience page. **Part A** is the education journey (5 nodes, alternating desktop layout). **Part B** is a dedicated work experience subsection below it (4 roles, left-aligned vertical timeline). Both share the same scroll anchor, connector line style, and glassmorphism card language.

**Expected Outcomes:**
- `src/sections/Experience.jsx` is a complete, standalone component with two clearly labelled sub-sections
- **Part A — Education Timeline** (top):
  - 5-node alternating vertical timeline (same as previously planned)
  - Section label: "Education Journey"
  - Nodes, connector line, dot markers, type badges — all as previously specified
- **Part B — Work Experience Timeline** (below, after a divider):
  - Section label: "Work Experience"
  - 4 role cards in a left-aligned vertical timeline
  - Each card: company icon / role icon, job title, company/context, period, responsibilities bullet list (3 items), status badge (Current / Past)

**Work Experience nodes (Part B):**

| # | Role | Context | Period | Status |
|---|---|---|---|---|
| 1 | Pharmacist | Medical Store / Hospital | 2018–2022 | Past |
| 2 | Billing Executive | Hospital / Clinic | 2019–2022 | Past |
| 3 | MCA Student (Internship) | University Project Work | 2022–2024 | Past |
| 4 | Software Developer | Tech Industry | 2024–Present | Current ★ |

- Current role (Software Developer) highlighted with accent glow ring + "Current" green badge
- Past roles use muted styling
- Connector line for Part B is a separate left-edge vertical bar (not centre-aligned)
- `id="experience"` on outermost element
- Fully responsive, dark/light theme

**New file:**
```
src/sections/Experience.jsx    ← full implementation (replaces stub)
```

**No other files modified.**

**Component structure inside Experience.jsx:**
```
<Experience id="experience">
  ├── SectionWrapper
  ├── SectionHeading   "Experience & Journey"

  ├── ── Part A ─────────────────────────────
  ├── SubHeading       "Education Timeline"
  ├── TimelineContainer (centre-line, alternating)
  │   ├── ConnectorLine   ← scaleY scroll-driven
  │   └── 5× TimelineNode (education nodes as before)

  ├── SectionDivider   (decorative gradient hr)

  ├── ── Part B ─────────────────────────────
  ├── SubHeading       "Work Experience"
  └── WorkTimeline (left-edge connector line)
      └── 4× WorkCard
          ├── LeftBar dot marker
          ├── RoleIcon   (Stethoscope / Receipt / BookOpen / Code2 — lucide)
          ├── StatusBadge ("Current" green | "Past" muted)
          ├── JobTitle
          ├── Company/Context
          ├── Period badge
          └── ResponsibilitiesList (3 bullet points)
```

**Animation plan:**
| Element | Animation |
|---|---|
| Part A connector line | `scaleY: 0 → 1` via `useScroll` + `useTransform` |
| Part A nodes | `x: ±60 → 0`, fade, `whileInView` alternating |
| Part A dot markers | scale pulse on enter |
| Part B work cards | `x: -40 → 0`, fade stagger, `whileInView` |
| Part B left-bar line | `scaleY: 0 → 1` via `useScroll` + `useTransform` |
| Current role card | CSS `box-shadow` pulse glow |

**Todo List:**
1. Write `src/sections/Experience.jsx` with all sub-components inlined
2. Define `educationData` array (5 nodes — same as original ST-10 spec)
3. Define `workData` array (4 roles above)
4. Implement Part A: `EducationTimeline` with `ConnectorLine`, `TimelineNode` alternating layout, `DotMarker`, `TypeBadge`
5. Implement Part B: `WorkTimeline` with left-edge bar, `WorkCard` per role, `StatusBadge`
6. Add `SectionDivider` between the two sub-sections
7. Highlight current role card (index 3) with `ring-2 ring-primary` + CSS pulse
8. Ensure `id="experience"` on root element

**Relevant Context:**
- `src/components/shared/SectionWrapper.jsx`
- `src/lib/utils.js` — `cn()`
- Framer Motion `useScroll`, `useTransform`, `whileInView`
- Lucide: `GraduationCap`, `Briefcase`, `Stethoscope`, `Receipt`, `BookOpen`, `Code2`

**Status:** [ ] pending

---

### Sub-Task 11 — Skills Section (Two-Tier: Category Cards + Expandable Progress Bars)

**Intent:** Replace the `Skills.jsx` stub with a premium two-tier skills section. Top tier: category cards (Languages, Frontend, Backend, Database, Tools) rendered as glassmorphic pills grid. Each card expands on click/hover to reveal horizontal progress bars per skill. All bars animate their fill on scroll into view.

**Expected Outcomes:**
- `src/sections/Skills.jsx` is a complete, standalone component
- Skill categories with icons, titles, and skill pills on the card face
- On hover (desktop) or tap (mobile), the card flips/expands to show individual `SkillBar` rows
- Each `SkillBar` animates `width: 0 → X%` on entry using Framer Motion `whileInView`
- 12 skills distributed across 5 categories:

| Category | Icon | Skills |
|---|---|---|
| Languages | `Code2` | Java (85%), Python (78%), JavaScript (88%), SQL (80%) |
| Frontend | `Layout` | React (87%), Tailwind CSS (82%) |
| Backend | `Server` | Node.js (80%), Express.js (75%) |
| Database | `Database` | MongoDB (72%), SQL (80%) |
| Tools & BI | `BarChart2` | Git (85%), GitHub (85%), Power BI (70%) |

- Section heading with gradient underline
- "Technologies I Work With" subtitle
- Responsive: 2-col on `md`, 3-col on `lg`
- Two-tier interaction: collapsed = pill grid; expanded = progress bar list
- `id="skills"` on outermost element

**New file:**
```
src/sections/Skills.jsx     ← full implementation (replaces stub)
```

**No other files modified.**

**Component structure inside Skills.jsx:**
```
<Skills id="skills">
  ├── SectionWrapper
  ├── SectionHeading  "Skills & Technologies"
  ├── Subtitle line
  └── SkillCategoryGrid
      └── 5× CategoryCard
          ├── CardFace (default)     ← category icon + name + skill pills
          └── CardExpanded (hover)   ← skill name + animated SkillBar per skill
```

**Two-tier interaction mechanics:**
- `CategoryCard` uses local `useState(isExpanded)`
- Desktop: `onMouseEnter` sets `isExpanded = true`, `onMouseLeave` sets `false`
- Mobile: `onClick` toggles `isExpanded`
- Framer Motion `AnimatePresence` + `layout` prop drives smooth expand/collapse
- Progress bars inside expanded view: Framer Motion `motion.div` with `initial={{ width: 0 }}` and `whileInView={{ width: 'X%' }}` with `spring` transition

**SkillBar design:**
- Track: `bg-muted` rounded full-width bar
- Fill: gradient from `--primary` to `--accent`, height `h-2`, rounded, animated width
- Label row: skill name left, percentage right (also animates via `useCountUp`)

**Animation plan:**
| Element | Animation |
|---|---|
| Section heading | `y: 30 → 0`, `whileInView` |
| Category cards | stagger `y: 40 → 0`, `whileInView` |
| Card expand/collapse | Framer Motion `layout` + `AnimatePresence` height transition |
| Skill bars | `width: 0 → X%` spring, triggered by `whileInView` |
| Percentage label | count-up via internal hook, triggers on bar visible |

**Todo List:**
1. Write `src/sections/Skills.jsx` with all sub-components inlined
2. Define `skillCategories` array with the 5 categories and nested skills with percentages
3. Implement `CategoryCard` with `isExpanded` local state, `onMouseEnter/Leave` + `onClick` toggle
4. Implement `CardFace`: category icon (Lucide), category name, skill name pills (`FaReact`, `FaPython`, `FaJava`, `SiMongodb`, etc. from react-icons)
5. Implement `CardExpanded`: `AnimatePresence` wrapping `SkillBar` list
6. Implement `SkillBar`: Framer Motion `motion.div` fill + percentage label with count-up
7. Implement `useCountUp` (copy pattern from About.jsx internal hook — keep it local)
8. Add react-icons brand icons per skill: `FaReact`, `FaNodeJs`, `FaPython`, `FaJava`, `FaGitAlt`, `FaGithub`, `SiMongodb`, `SiExpress`, `SiTailwindcss`, `SiPowerbi`, `DiJavascript1`, `FaDatabase`
9. Ensure `id="skills"` on root element

**Relevant Context:**
- `src/components/shared/SectionWrapper.jsx`
- `src/lib/utils.js` — `cn()`
- Framer Motion `AnimatePresence`, `motion`, `layout`
- react-icons brand icons for skill pills

**Status:** [ ] pending

---

### Sub-Task 12 — Projects Section (Filtered Grid + Modal Detail)

**Intent:** Replace the `Projects.jsx` stub with a premium, fully production-ready projects section. Includes a category filter bar, an animated project grid, reusable `ProjectCard` and `ProjectModal` components (all inlined in the file), 6 populated placeholder cards, and 2 "Coming Soon" ghost cards. No external files are created or modified.

**Expected Outcomes:**
- `src/sections/Projects.jsx` is a complete, standalone component
- Filter bar with 6 tabs: `All` · `Frontend` · `Backend` · `Full Stack` · `Power BI` · `Java`
- Active filter animates via Framer Motion `layoutId` shared underline indicator
- Filtered project grid re-renders with `AnimatePresence` exit/enter per card
- 6 real placeholder project cards + 2 "Coming Soon" ghost cards (8 total)
- Each `ProjectCard` contains:
  - Large cover image (placeholder gradient image via `https://placehold.co` with tech-specific colours)
  - Animated hover overlay with "View Details" button that appears on hover
  - Technology badge pills (react-icons brand icons + label)
  - Project title + short description
  - Feature bullet list (3–4 items)
  - GitHub icon button (`FaGithub`) → `href` (placeholder `#`)
  - Live Demo icon button (`ExternalLink` lucide) → `href` (placeholder `#`)
- `ProjectModal` is a centered dialog with backdrop blur:
  - Triggered by "View Details" button on the card
  - Full project info: large image, title, full description, all features, complete tech stack, GitHub + Live Demo buttons
  - Close on backdrop click or `Escape` key
  - Entrance: scale from `0.9` + fade, exit: reverse — Framer Motion `AnimatePresence`
  - Traps focus, accessible `role="dialog"` + `aria-modal="true"`
- "Coming Soon" cards: ghosted opacity, dashed border, lock icon, no interactive buttons
- `id="projects"` on outermost element
- Fully responsive: 1-col mobile, 2-col `md`, 3-col `lg`

**New file:**
```
src/sections/Projects.jsx    ← full implementation (replaces stub)
```

**No other files modified.**

---

**Project Data (6 cards + 2 placeholders):**

| # | Title | Category | Tech Stack | GitHub | Demo |
|---|---|---|---|---|---|
| 1 | Portfolio Website | Frontend | React, Tailwind, Framer Motion | `#` | `#` |
| 2 | UI Component Library | Frontend | React, Storybook, Tailwind | `#` | `#` |
| 3 | REST API Server | Backend | Node.js, Express, MongoDB | `#` | `#` |
| 4 | E-Commerce Platform | Full Stack | React, Node, MongoDB, JWT | `#` | `#` |
| 5 | Sales Dashboard | Power BI | Power BI, SQL, DAX, Excel | `#` | `#` |
| 6 | Inventory System | Java | Java, Spring Boot, MySQL | `#` | `#` |
| 7 | Coming Soon | — | — | — | — |
| 8 | Coming Soon | — | — | — | — |

---

**Component structure inside Projects.jsx:**
```
<Projects id="projects">
  ├── SectionWrapper
  ├── SectionHeading       "My Projects"
  ├── Subtitle             "Things I've built"
  ├── FilterBar
  │   └── 6× FilterTab    (All / Frontend / Backend / Full Stack / Power BI / Java)
  │       └── shared Framer Motion layoutId underline indicator
  ├── AnimatePresence
  │   └── ProjectGrid
  │       ├── 6× ProjectCard   (real data)
  │       └── 2× ComingSoonCard
  └── ProjectModal         (portal-rendered, conditionally shown)
```

---

**ProjectCard sub-structure:**
```
ProjectCard
├── ImageContainer
│   ├── <img> (placehold.co gradient)
│   └── HoverOverlay (opacity-0 → opacity-100 on hover)
│       └── "View Details" button → opens ProjectModal
├── CardBody
│   ├── CategoryBadge      (coloured pill matching filter)
│   ├── TechBadges         (icon + label pills, max 4 shown + "+N more")
│   ├── Title (h3)
│   ├── Description (2-line clamp)
│   ├── FeatureList        (3 bullet points)
│   └── ActionRow
│       ├── GitHubButton   (FaGithub icon + "Code")
│       └── DemoButton     (ExternalLink icon + "Live Demo")
```

---

**ProjectModal sub-structure:**
```
ProjectModal (portal via createPortal)
├── Backdrop             (fixed inset-0, blur, click-to-close)
└── ModalPanel           (centered, max-w-2xl, glassmorphism)
    ├── CloseButton      (X icon, top-right)
    ├── ModalImage       (full-width, rounded-t)
    ├── ModalBody
    │   ├── CategoryBadge
    │   ├── Title (h2)
    │   ├── FullDescription
    │   ├── FeaturesSection  (all features as checkmark list)
    │   ├── TechStackSection (all tech badges, no truncation)
    │   └── ActionRow        (GitHub + Live Demo buttons, full-width)
    └── Keyboard: Escape closes, focus trapped inside
```

---

**Filter mechanics:**
- `activeFilter` state (`useState('All')`)
- `filteredProjects` = `useMemo` derived from `activeFilter`
- Framer Motion `AnimatePresence mode="popLayout"` wraps the grid so cards animate out/in on filter change
- Each card gets a stable `key={project.id}` so Framer Motion tracks enter/exit correctly
- Active filter tab: Framer Motion `layoutId="activeFilter"` shared underline spans across tabs

---

**Hover animation on ProjectCard:**
- Card: `whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}`
- Image: CSS `scale(1.05)` on hover via `group-hover:`
- Overlay: `opacity-0 group-hover:opacity-100` transition
- Tech badges: subtle scale on hover
- GitHub/Demo buttons: `whileHover scale(1.1)` + colour shift

---

**Animation plan:**
| Element | Animation |
|---|---|
| Section heading | `y: 30 → 0`, fade, `whileInView` |
| Filter bar | `y: 20 → 0`, fade, `whileInView` |
| Project cards | stagger `y: 40 → 0`, `whileInView` on initial load |
| Filter change | `AnimatePresence mode="popLayout"` — cards exit left/fade, enter right/fade |
| Filter tab indicator | `layoutId="activeFilter"` smooth slide underline |
| Card hover | `y: -8` lift + shadow deepens |
| Modal open | `scale: 0.9 → 1` + fade in, backdrop blur appears |
| Modal close | reverse, `AnimatePresence` |
| Coming Soon card | static, dashed border, `opacity-60`, no hover effects |

---

**Todo List:**
1. Write `src/sections/Projects.jsx` with all sub-components inlined
2. Define `projectsData` array (6 real + 2 coming-soon objects) with fields: `id`, `title`, `category`, `description`, `fullDescription`, `features`, `tech[]` (name + icon component), `image`, `github`, `demo`, `isComingSoon`
3. Implement `FilterBar` with `layoutId` shared indicator and 6 filter tabs
4. Implement `filteredProjects` with `useMemo`
5. Implement `ProjectCard` with `group` hover, overlay, tech badges, feature list, action buttons
6. Implement `ComingSoonCard` with ghosted styling, lock icon, dashed border
7. Implement `ProjectModal` using `createPortal(document.body)`, `AnimatePresence`, backdrop click + Escape key close, focus trap via `useEffect` + `tabIndex`
8. Wire "View Details" button on each card to `setSelectedProject(project)` state
9. Render `<ProjectModal>` conditionally at the bottom of `<Projects>` wrapped in `<AnimatePresence>`
10. Add `AnimatePresence mode="popLayout"` around the project grid for filter transitions
11. Ensure `id="projects"` on root element
12. Test filter All → Frontend → Backend → Full Stack transitions visually

**Relevant Context:**
- `src/components/shared/SectionWrapper.jsx` — wrap section
- `src/components/ui/Button.jsx` — Button primitive for modal and card action buttons
- `src/lib/utils.js` — `cn()`
- Framer Motion: `AnimatePresence`, `motion`, `layoutId`, `useAnimation`
- `createPortal` from `react-dom` for modal mounting

**Status:** [ ] pending

---

### Sub-Task 13 — Certifications & Achievements Section

**Intent:** Create a brand-new `CertificationsAchievements.jsx` section file (replacing the `OpenSource.jsx` stub for now, or appended after Projects in the Home render order). It has two stacked sub-sections: **Part A** — animated certification cards with glassmorphism; **Part B** — achievement counter row with count-up animation on scroll. Everything is self-contained in one file.

> **Note on file placement:** The original plan had `OpenSource.jsx` as a stub. This new section is a net-new file `CertificationsAchievements.jsx`. In `Home.jsx` (ST-7), the import for `<OpenSource />` will be swapped to `<CertificationsAchievements />` — but since `Home.jsx` has not been implemented yet (all STs are still pending), this is a zero-cost change: the agent simply uses the new name when it builds ST-7.

**Expected Outcomes:**
- `src/sections/CertificationsAchievements.jsx` is a complete, standalone component
- **Part A — Certifications** (top):
  - Section label: "Certifications"
  - 6 certification cards in a responsive grid (1-col mobile, 2-col `md`, 3-col `lg`)
  - Each card: glassmorphism panel, issuer logo icon, cert title, issuer name, issue date, credential badge/ID, "Verify" external link button
  - Hover: card lifts `y: -6`, border glow intensifies, shimmer overlay
  - Entrance: stagger `y: 40 → 0`, fade, `whileInView`
- **Part B — Achievements** (below, after gradient divider):
  - Section label: "Key Achievements"
  - 5 achievement counter tiles in a horizontal row (wrap on mobile)
  - Each tile: large animated number (count-up), suffix (`+` or `%`), icon, label
  - Count-up triggers on scroll into view via `useInView` + `requestAnimationFrame`
  - Tiles have glassmorphism background, primary colour icon, subtle gradient border
- `id="certifications"` on outermost element
- Fully responsive, dark/light theme

**New file:**
```
src/sections/CertificationsAchievements.jsx   ← net-new file
```

**No other files modified.**
> In ST-7 (Home.jsx), import this file instead of `OpenSource.jsx`.

---

**Certification Data (6 cards):**

| # | Title | Issuer | Icon | Date | Credential |
|---|---|---|---|---|---|
| 1 | Java Programming | Oracle / Udemy | `FaJava` | 2023 | `CERT-001` |
| 2 | React — The Complete Guide | Udemy | `FaReact` | 2023 | `CERT-002` |
| 3 | Node.js Developer Course | Udemy | `FaNodeJs` | 2023 | `CERT-003` |
| 4 | Python for Data Science | Coursera | `FaPython` | 2024 | `CERT-004` |
| 5 | Power BI Desktop | Microsoft Learn | `SiPowerbi` | 2024 | `CERT-005` |
| 6 | SQL for Beginners | Coursera | `FaDatabase` | 2023 | `CERT-006` |

---

**Achievement Counter Data (5 tiles):**

| # | Value | Suffix | Icon | Label |
|---|---|---|---|---|
| 1 | 10 | `+` | `FolderOpen` | Projects Completed |
| 2 | 6 | `+` | `Award` | Certifications Earned |
| 3 | 12 | `+` | `Code2` | Technologies Mastered |
| 4 | 500 | `+` | `GitCommit` | GitHub Commits |
| 5 | 3 | `+` | `Star` | Open Source Contributions |

---

**Component structure inside CertificationsAchievements.jsx:**
```
<CertificationsAchievements id="certifications">
  ├── SectionWrapper
  ├── SectionHeading   "Certifications & Achievements"

  ├── ── Part A ──────────────────────────────
  ├── SubHeading       "Certifications"
  └── CertGrid (1→2→3 col responsive)
      └── 6× CertCard
          ├── ShimmerOverlay   (on hover — CSS gradient sweep)
          ├── IssuerIcon       (react-icons brand icon, coloured)
          ├── CertTitle        (bold)
          ├── IssuerName       (muted)
          ├── IssuedDate       (badge)
          ├── CredentialID     (monospace small text)
          └── VerifyButton     (ExternalLink + "Verify", links to #)

  ├── GradientDivider

  ├── ── Part B ──────────────────────────────
  ├── SubHeading       "Key Achievements"
  └── AchievementRow  (flex wrap, centred)
      └── 5× AchievementTile
          ├── Icon             (Lucide, primary colour)
          ├── CountUpNumber    (animated, large, gradient text)
          ├── Suffix           (+)
          └── Label            (muted small text)
```

---

**CertCard glassmorphism spec:**
- Background: `bg-white/5 dark:bg-white/5` + `backdrop-blur-md`
- Border: `border border-white/10` — on hover brightens to `border-primary/50`
- Shadow: `shadow-lg` → `shadow-primary/20` on hover
- Shimmer overlay: CSS `@keyframes shimmer` — gradient sweep left-to-right on hover
- Rounded: `rounded-2xl`
- Padding: `p-6`

**AchievementTile spec:**
- Background: same glassmorphism as CertCard
- Number: `text-5xl font-black` gradient text (`from-primary to-accent`)
- Icon: `w-8 h-8` primary colour, above the number
- Label: `text-sm text-muted-foreground` below
- Minimum width: `min-w-[140px]`

---

**Animation plan:**
| Element | Animation |
|---|---|
| Section heading | `y: 30 → 0`, fade, `whileInView` |
| Cert cards | stagger `y: 40 → 0`, fade, `whileInView` (delay per index) |
| Cert card hover | `y: -6` lift, border glow, shimmer CSS sweep |
| Achievement tiles | stagger `scale: 0.8 → 1`, fade, `whileInView` |
| Count-up numbers | `useCountUp` internal hook, triggers on `useInView` enter |
| Verify button | `whileHover scale(1.05)` |

---

**Internal hooks:**
- `useCountUp(target, duration, isActive)` — same pattern as About.jsx and Skills.jsx but kept local
- Shimmer effect: pure CSS `@keyframes shimmer` injected via a `<style>` tag or Tailwind custom class in globals — **no new CSS file needed**: use inline `style` prop with `backgroundImage` gradient + `backgroundSize` + `@keyframes` via a `<style jsx>` workaround or a `motion.div` gradient overlay

**Todo List:**
1. Write `src/sections/CertificationsAchievements.jsx` with all sub-components inlined
2. Define `certificationsData` array (6 items) with fields: `id`, `title`, `issuer`, `icon`, `date`, `credentialId`, `verifyUrl`
3. Define `achievementsData` array (5 items) with fields: `id`, `value`, `suffix`, `icon`, `label`
4. Implement `CertCard` with glassmorphism, shimmer hover overlay, icon, title, issuer, date, credential ID, Verify button
5. Implement shimmer overlay as a `motion.div` with `opacity: 0 → 1` on hover using `whileHover` (gradient sweep via CSS background-image)
6. Implement `CertGrid` as responsive CSS grid
7. Implement `AchievementTile` with glassmorphism, Lucide icon, count-up number, suffix, label
8. Implement `useCountUp` as an internal hook (same `requestAnimationFrame` pattern)
9. Wire `useInView` from `@/hooks/useInView` to trigger count-up only when tile enters viewport
10. Add `GradientDivider` between Part A and Part B
11. Ensure `id="certifications"` on root element
12. Update plan note: In ST-7 Home.jsx, import `CertificationsAchievements` instead of `OpenSource`

**Relevant Context:**
- `src/components/shared/SectionWrapper.jsx`
- `src/hooks/useInView.js` — triggers count-up on viewport entry
- `src/lib/utils.js` — `cn()`
- `src/components/ui/Button.jsx` — Verify button
- Framer Motion: `motion`, `whileInView`, `whileHover`, `AnimatePresence`
- react-icons: `FaJava`, `FaReact`, `FaNodeJs`, `FaPython`, `SiPowerbi`, `FaDatabase`
- Lucide: `FolderOpen`, `Award`, `Code2`, `GitCommit`, `Star`, `ExternalLink`

**Status:** [ ] pending

---

### Sub-Task 14 — Contact Section (EmailJS + Validation + Map Placeholder + Social Links)

**Intent:** Replace the `Contact.jsx` stub with a fully production-ready, premium contact section. Two-column layout: left column has contact info cards, custom map placeholder, and social links; right column has the validated EmailJS-powered form with a success animation. All EmailJS keys come exclusively from environment variables. No new files are created outside `Contact.jsx` and `.env.example`.

**Expected Outcomes:**
- `src/sections/Contact.jsx` is a complete, standalone component
- **Left column:**
  - Section heading "Get In Touch" with gradient underline
  - 3 contact info cards (Phone, Email, LinkedIn) — glassmorphism, icon, label, value, hover lift
  - Custom map placeholder card — gradient background, animated `MapPin` icon, "Bengaluru, Karnataka, India", coordinates `12.9716° N, 77.5946° E`, subtle grid overlay
  - 4 social icon links: GitHub, LinkedIn, Email, Twitter — circular glassmorphism buttons, scale + glow on hover
- **Right column:**
  - Contact form with 4 fields: Name, Email, Subject, Message (textarea)
  - Field-level validation (required, email format, min-length)
  - Real-time inline error messages below each field (appear/disappear with Framer Motion height animation)
  - Submit button: shows spinner during send, disabled during in-flight request
  - **EmailJS send** via `emailjs.sendForm()` using env vars `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
  - **Success state:** form fades out, a full-height success panel animates in — animated checkmark SVG (Framer Motion `pathLength: 0 → 1`), "Message Sent!" heading, short thank-you text, "Send Another" button that resets the form
  - **Error state:** toast-style error banner slides in at top of form on EmailJS failure
- `id="contact"` on outermost element
- Fully responsive: stacked mobile, two-column `lg`
- Dark/light theme via CSS variable tokens
- `emailjs-com` package used (already in planned deps — confirm in ST-1)

**New / modified files:**
```
src/sections/Contact.jsx          ← full implementation (replaces stub)
.env.example                      ← add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
```

**No other section files touched.**

---

**Contact Info Data:**

| # | Icon | Label | Value |
|---|---|---|---|
| 1 | `Phone` (lucide) | Phone | `+91 XXXXX XXXXX` (placeholder) |
| 2 | `Mail` (lucide) | Email | `vinaykumar@email.com` (placeholder) |
| 3 | `Linkedin` (lucide) | LinkedIn | `linkedin.com/in/vinaykumar` (placeholder) |

**Social Links Data:**

| Icon | Library | Link |
|---|---|---|
| `FaGithub` | react-icons/fa | `#` |
| `FaLinkedin` | react-icons/fa | `#` |
| `MdEmail` | react-icons/md | `mailto:#` |
| `FaTwitter` | react-icons/fa | `#` |

---

**Component structure inside Contact.jsx:**
```
<Contact id="contact">
  ├── SectionWrapper
  ├── SectionHeading     "Get In Touch"
  ├── Subtitle           "Have a project in mind? Let's talk."
  └── TwoColumnGrid      (stacked mobile / side-by-side lg)
      ├── LeftColumn
      │   ├── ContactInfoCards
      │   │   └── 3× InfoCard  (icon, label, value, hover lift)
      │   ├── MapPlaceholder
      │   │   ├── GradientBackground  (blue-violet mesh)
      │   │   ├── GridOverlay         (subtle dot/line grid CSS)
      │   │   ├── AnimatedMapPin      (Framer Motion bounce loop)
      │   │   ├── CityName            "Bengaluru, Karnataka, India"
      │   │   └── Coordinates         "12.9716° N, 77.5946° E"
      │   └── SocialLinks
      │       └── 4× SocialButton     (circular, glassmorphism, scale on hover)
      └── RightColumn
          └── ContactForm  (or SuccessPanel if sent)
              ├── FormField: Name
              ├── FormField: Email
              ├── FormField: Subject
              ├── FormField: Message (textarea, min-h-32)
              ├── InlineError per field (AnimatePresence height)
              ├── SubmitButton  (spinner when loading)
              └── ErrorBanner   (slide-in on EmailJS failure)
```

**Success Panel (replaces form after send):**
```
SuccessPanel
├── AnimatedCheckCircle   (SVG circle + checkmark, pathLength 0→1, ~800ms)
├── "Message Sent!" h3    (scale in, Framer Motion)
├── ThankYouText          ("I'll get back to you within 24 hours.")
└── "Send Another" Button (onClick resets formState + switches back to form)
```

---

**Form validation rules:**

| Field | Rules |
|---|---|
| Name | Required, min 2 chars |
| Email | Required, valid email regex |
| Subject | Required, min 3 chars |
| Message | Required, min 20 chars |

- Validation runs `onBlur` per field (not on every keystroke) and on submit
- Errors cleared on field change
- Submit blocked if any validation errors exist

---

**EmailJS send flow:**
1. `handleSubmit` validates all fields synchronously
2. If valid: set `isSending = true`, disable submit button, show spinner
3. Call `emailjs.send(serviceId, templateId, templateParams, publicKey)` where all IDs come from `import.meta.env.VITE_EMAILJS_*`
4. On success: set `isSent = true` → renders `<SuccessPanel>`
5. On error: set `sendError = errorMessage` → renders `<ErrorBanner>` above form, `isSending = false`
6. `emailjs` is initialised once at module level: `emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)`

**EmailJS template params object:**
```js
{
  from_name: formData.name,
  from_email: formData.email,
  subject:    formData.subject,
  message:    formData.message,
  to_name:    'Vinay Kumar',
}
```

---

**Map placeholder design:**
- Container: `rounded-2xl overflow-hidden h-48 relative`
- Background: `bg-gradient-to-br from-blue-900/80 via-violet-900/60 to-indigo-900/80`
- Grid overlay: absolutely-positioned div with CSS `background-image: repeating-linear-gradient(...)` (dot grid pattern, low opacity)
- `MapPin` (lucide, `w-8 h-8`, primary colour): Framer Motion `animate={{ y: [0, -8, 0] }}` infinite bounce, 2s ease
- Drop shadow below pin: small ellipse div, scales with pin position
- City + coordinates: bottom-aligned overlay with backdrop-blur pill

---

**Animation plan:**
| Element | Animation |
|---|---|
| Section heading | `y: 30 → 0`, fade, `whileInView` |
| Left column | `x: -40 → 0`, fade, `whileInView` |
| Right column | `x: 40 → 0`, fade, `whileInView` |
| Info cards | stagger `y: 20 → 0`, `whileInView` |
| Map pin | infinite `y: [0, -8, 0]` bounce, Framer Motion |
| Social buttons | stagger scale from `0 → 1`, `whileInView` |
| Form fields | stagger `y: 10 → 0` on mount |
| Inline errors | `AnimatePresence` height `0 → auto` + fade |
| Error banner | `y: -20 → 0` slide-in |
| Submit spinner | Lucide `Loader2` with `animate-spin` Tailwind class |
| Form → Success | form `opacity: 1 → 0` exit, success panel `scale: 0.8 → 1` enter |
| Checkmark SVG | `pathLength: 0 → 1`, `duration: 0.8s` |
| "Send Another" | resets state, success panel exits, form re-enters |

---

**Dependency note:**
- `emailjs-com` must be added to `package.json` in ST-1. The plan already lists production deps; add `@emailjs/browser` (the current package name — `emailjs-com` is legacy). Agent must install `@emailjs/browser` when executing ST-1.
- Import: `import emailjs from '@emailjs/browser'`

---

**Todo List:**
1. Add `VITE_EMAILJS_SERVICE_ID=`, `VITE_EMAILJS_TEMPLATE_ID=`, `VITE_EMAILJS_PUBLIC_KEY=` to `.env.example`
2. Ensure `@emailjs/browser` is in `package.json` dependencies (add to ST-1 install step)
3. Write `src/sections/Contact.jsx` with all sub-components inlined
4. Define `contactInfo` array (Phone, Email, LinkedIn)
5. Define `socialLinks` array (GitHub, LinkedIn, Email, Twitter)
6. Implement `InfoCard` with glassmorphism, Lucide icon, label, value, hover lift
7. Implement `MapPlaceholder` with gradient bg, grid overlay, bouncing `MapPin`, city + coordinates pill
8. Implement `SocialLinks` row of circular glassmorphism icon buttons
9. Implement `ContactForm` with controlled inputs, `useState` for `formData`, `errors`, `isSending`, `isSent`, `sendError`
10. Implement per-field `validate()` helper returning an errors object
11. Implement `handleBlur` (validate single field on blur), `handleChange` (clear error on change), `handleSubmit` (validate all → EmailJS send)
12. Implement `InlineError` as Framer Motion `AnimatePresence` height-animated error message
13. Implement `ErrorBanner` as slide-in error notification
14. Implement `SuccessPanel` with animated SVG checkmark (`motion.circle` + `motion.path`, `pathLength: 0 → 1`), heading, text, "Send Another" reset button
15. Wire `AnimatePresence` to swap `ContactForm` ↔ `SuccessPanel` based on `isSent`
16. Initialise EmailJS with `emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)` inside a `useEffect([], [])` at component mount
17. Ensure `id="contact"` on root element

**Relevant Context:**
- `src/components/shared/SectionWrapper.jsx`
- `src/components/ui/Button.jsx` — submit, reset, social buttons
- `src/lib/utils.js` — `cn()`
- `@emailjs/browser` — `emailjs.init()`, `emailjs.send()`
- Framer Motion: `motion`, `AnimatePresence`, `whileInView`, `whileHover`
- Lucide: `Phone`, `Mail`, `Linkedin`, `MapPin`, `Send`, `Loader2`, `CheckCircle`, `X`
- react-icons: `FaGithub`, `FaLinkedin`, `MdEmail`, `FaTwitter`
- `.env.example` — add 3 EmailJS env vars

**Status:** [ ] pending

---

### Sub-Task 15 — AI Assistant (Floating Chatbot Widget)

**Intent:** Build a self-contained, reusable AI Assistant component that floats over every page. It uses a local JSON intent map for responses — no paid API, no network calls. The chatbot engine is extracted into a dedicated `useChatbot` hook using `useReducer` for clean state management. The widget is mounted once inside `Layout.jsx`. Three new files are produced; `Layout.jsx` gets a single import line added.

**Expected Outcomes:**
- `src/data/chatbot.json` — intent response map with 7 intents + follow-up chips
- `src/hooks/useChatbot.js` — `useReducer`-based chatbot engine (intent matching, message history, typing simulation)
- `src/components/shared/AiAssistant.jsx` — the full floating widget UI
- `Layout.jsx` updated: one new import + `<AiAssistant />` rendered after `<Footer />`
- **Floating trigger button** — fixed bottom-right, circular, gradient, with a pulsing ring animation and bot icon (`Bot` from lucide-react); shows unread dot badge when chat has a new message while closed
- **Chat window** — slides up from the trigger button with Framer Motion `AnimatePresence`; glassmorphism panel, `max-w-sm w-full`, `h-[480px]`; resize handle on mobile
- **Chat window header**: bot avatar + "Vinay's AI Assistant" name + "Online" green dot + close (X) button + clear-history (Trash2) button
- **Message list** — scrollable, auto-scrolls to latest message; bot messages left-aligned with avatar; user messages right-aligned with gradient bubble; timestamps on each message
- **Typing indicator** — animated 3-dot bounce (CSS) shown while bot is "thinking" (350ms simulated delay)
- **Quick Questions chips** — always visible above input; 6 preset chips: "Who is Vinay?", "Skills", "Projects", "Resume", "Contact", "Career Journey"; clicking a chip sends it as a user message
- **Text input + send button** — free-text input; Enter key or button sends; `Shift+Enter` for newline in textarea; input disabled while bot is typing
- **Welcome message** — on first open, bot sends: `"Hi! 👋 I'm Vinay's AI Assistant. Ask me anything about Vinay or click a quick question below."`
- **Intent matching engine** in `useChatbot.js`: normalises input to lowercase, checks against keyword arrays per intent, falls back to `default` intent if no match
- **No paid API, no external service** — all responses from `chatbot.json`
- Fully responsive; chat window repositions on mobile (bottom-left on small screens)
- Dark/light theme via CSS variable tokens; glassmorphism matches portfolio style

**New / modified files:**
```
src/data/chatbot.json                  ← net-new (intent response map)
src/hooks/useChatbot.js                ← net-new (useReducer chatbot engine)
src/components/shared/AiAssistant.jsx  ← net-new (full widget UI)
src/components/layout/Layout.jsx       ← ADD one import + <AiAssistant /> after <Footer />
```

---

**`chatbot.json` structure:**

```json
{
  "intents": {
    "who": {
      "keywords": ["who", "vinay", "about", "yourself", "introduction", "tell me"],
      "response": "I'm Vinay Kumar — a Software Developer with an MCA degree and a unique background spanning Pharmacy and Technology. I specialise in full-stack development with Java, React, Node.js, and Python. I'm passionate about building clean, impactful web applications. 🚀",
      "followUps": ["Skills", "Projects", "Career Journey"]
    },
    "skills": {
      "keywords": ["skill", "tech", "stack", "know", "language", "framework", "tool"],
      "response": "Vinay's tech stack includes:\n\n**Languages:** Java, Python, JavaScript, SQL\n**Frontend:** React, Tailwind CSS\n**Backend:** Node.js, Express.js\n**Database:** MongoDB, MySQL\n**Tools:** Git, GitHub, Power BI\n\nHe's always learning new technologies! 💡",
      "followUps": ["Projects", "Who is Vinay?", "Contact"]
    },
    "projects": {
      "keywords": ["project", "work", "built", "portfolio", "app", "application", "demo"],
      "response": "Vinay has built several notable projects:\n\n🖥️ **Portfolio Website** — React + Tailwind + Framer Motion\n🛒 **E-Commerce Platform** — Full Stack (React + Node + MongoDB)\n📊 **Sales Dashboard** — Power BI + SQL + DAX\n🔧 **REST API Server** — Node.js + Express + MongoDB\n☕ **Inventory System** — Java + Spring Boot + MySQL\n\nCheck the Projects section for full details!",
      "followUps": ["Skills", "Contact", "Resume"]
    },
    "resume": {
      "keywords": ["resume", "cv", "download", "hire", "pdf"],
      "response": "You can download Vinay's resume using the **Download Resume** button in the Hero section at the top of the page. It covers his full education, skills, and work experience. 📄",
      "followUps": ["Contact", "Who is Vinay?", "Projects"]
    },
    "contact": {
      "keywords": ["contact", "email", "reach", "hire", "message", "phone", "linkedin"],
      "response": "You can reach Vinay through:\n\n📧 **Email:** vinaykumar@email.com\n💼 **LinkedIn:** linkedin.com/in/vinaykumar\n🐙 **GitHub:** github.com/vinaykumar\n\nOr use the **Contact form** at the bottom of the page to send a direct message! 👇",
      "followUps": ["Resume", "Projects", "Who is Vinay?"]
    },
    "journey": {
      "keywords": ["journey", "career", "history", "experience", "background", "education", "pharmacy", "mca", "story"],
      "response": "Vinay's journey is unique! 🌟\n\n🎓 **Diploma in Pharmacy** → 2016–2018\n🎓 **B.Sc Computer Science** → 2018–2021\n💊 **Pharmacist & Billing Executive** → 2018–2022\n🎓 **MCA (Master of Computer Applications)** → 2022–2024\n💻 **Software Developer** → 2024–Present\n\nHe transitioned from healthcare to tech — bringing analytical thinking and problem-solving skills!",
      "followUps": ["Skills", "Projects", "Contact"]
    },
    "default": {
      "keywords": [],
      "response": "I'm not sure I understood that. Try asking me about Vinay's **skills**, **projects**, **resume**, **contact** details, or his **career journey**. Or click one of the quick questions below! 😊",
      "followUps": ["Who is Vinay?", "Skills", "Projects", "Contact"]
    }
  }
}
```

---

**`useChatbot.js` — hook API:**

```
useChatbot()
  returns:
    messages[]           ← array of { id, role: 'bot'|'user', text, timestamp }
    isTyping             ← boolean — bot "thinking" state
    isOpen               ← boolean — window open/closed
    hasUnread            ← boolean — new bot message while window closed
    quickChips           ← string[] — current follow-up chips (from last bot response)
    sendMessage(text)    ← dispatches USER_MESSAGE, triggers bot response after 350ms
    toggleOpen()         ← dispatches TOGGLE_OPEN, clears hasUnread
    clearHistory()       ← dispatches CLEAR_HISTORY, resets to welcome message
```

**Reducer actions:**
- `TOGGLE_OPEN` — flips `isOpen`, clears `hasUnread`
- `USER_MESSAGE` — appends user message, sets `isTyping: true`
- `BOT_RESPONSE` — appends bot message, sets `isTyping: false`, sets new `quickChips`, sets `hasUnread: !isOpen`
- `CLEAR_HISTORY` — resets messages to `[welcomeMessage]`, resets chips to default set

**Intent matching logic (pure function `matchIntent(input, intents)`):**
```
1. Normalise: input.toLowerCase().trim()
2. For each intent key (excluding 'default'):
   - Check if any keyword in intent.keywords appears in the normalised input
   - First match wins
3. If no match → return 'default' intent
```

---

**`AiAssistant.jsx` component structure:**
```
AiAssistant
├── FloatingButton          (fixed bottom-6 right-6, z-50)
│   ├── PulsingRing         (CSS @keyframes ring-pulse, opacity 0→0.6→0)
│   ├── Bot icon            (lucide Bot, w-6 h-6)
│   └── UnreadBadge         (red dot, absolute top-0 right-0, AnimatePresence)
└── AnimatePresence
    └── ChatWindow          (fixed bottom-24 right-6, z-50, when isOpen)
        ├── ChatHeader
        │   ├── BotAvatar   (gradient circle + Bot icon)
        │   ├── BotName     "Vinay's AI Assistant"
        │   ├── OnlineDot   (green pulse)
        │   ├── ClearBtn    (Trash2 icon)
        │   └── CloseBtn    (X icon)
        ├── MessageList     (flex-col, overflow-y-auto, ref for auto-scroll)
        │   ├── N× MessageBubble
        │   │   ├── BotMessage  (left-aligned, bot avatar, glassmorphism bubble)
        │   │   └── UserMessage (right-aligned, gradient bubble)
        │   ├── TypingIndicator  (3-dot bounce, shown when isTyping)
        │   └── auto-scroll useEffect on messages change
        ├── QuickChips      (flex wrap, above input)
        │   └── N× ChipButton   (onClick → sendMessage(chip))
        └── InputRow
            ├── TextInput   (onKeyDown: Enter sends, Shift+Enter newline)
            └── SendButton  (gradient, Bot/Send icon, disabled when isTyping)
```

---

**FloatingButton animation spec:**
- Base: `w-14 h-14` circular, `bg-gradient-to-br from-primary to-accent`
- Shadow: `shadow-lg shadow-primary/30`
- Hover: `whileHover scale(1.1)` + deeper shadow
- Tap: `whileTap scale(0.95)`
- PulsingRing: outer div, same size, `absolute inset-0 rounded-full`, CSS `@keyframes` scale `1 → 1.5` + `opacity 0.6 → 0`, `duration: 2s`, `repeat: Infinity`
- UnreadBadge: `w-3 h-3` red dot, `absolute -top-1 -right-1`, `AnimatePresence` scale in/out

**ChatWindow animation spec:**
- `initial={{ opacity: 0, scale: 0.8, y: 20, originX: 1, originY: 1 }}`
- `animate={{ opacity: 1, scale: 1, y: 0 }}`
- `exit={{ opacity: 0, scale: 0.8, y: 20 }}`
- `transition={{ type: 'spring', stiffness: 300, damping: 25 }}`
- Opens from bottom-right (transform-origin bottom-right)

**MessageBubble animation:**
- Each new message: `initial={{ opacity: 0, y: 10 }}` → `animate={{ opacity: 1, y: 0 }}`
- Bot messages: slight `x: -10 → 0`
- User messages: slight `x: 10 → 0`

**Typing indicator:**
- 3 dots, CSS `@keyframes bounce` staggered by `animation-delay: 0s / 0.15s / 0.3s`
- Appears as a bot "message bubble" with the 3 dots inside
- Removed from DOM (AnimatePresence) when `isTyping = false`

**Auto-scroll behaviour:**
- `messagesEndRef` div at bottom of MessageList
- `useEffect([messages, isTyping])` → `messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })`

---

**Animation plan:**
| Element | Animation |
|---|---|
| Floating button | Scale on hover/tap, pulsing ring CSS |
| Unread badge | `AnimatePresence` scale 0→1 in, 1→0 out |
| Chat window open | Spring scale from 0.8 + y from 20 |
| Chat window close | Reverse spring |
| Each new message | `y: 10→0` + fade in |
| Bot typing indicator | 3-dot staggered bounce CSS |
| Quick chips | `x: -10→0` stagger on chips change |
| Send button | `whileHover scale(1.05)`, `whileTap scale(0.95)` |

---

**Responsive behaviour:**
- Desktop (`lg+`): `bottom-6 right-6`, window `w-96`
- Mobile: `bottom-4 right-4`, window `w-[calc(100vw-2rem)]` with `max-w-sm`
- Chat window `max-h-[70vh]` on mobile to avoid keyboard overlap

---

**Todo List:**
1. Create `src/data/` directory
2. Write `src/data/chatbot.json` with the 7-intent structure above (full text responses included)
3. Write `src/hooks/useChatbot.js`:
   - Import `chatbot.json`
   - Implement `matchIntent(input, intents)` pure function
   - Define `initialState` with welcome message and default chips
   - Implement `chatReducer` handling 4 actions
   - Export `useChatbot()` hook using `useReducer` + `useCallback` for `sendMessage`
   - `sendMessage`: dispatch `USER_MESSAGE` immediately, then `setTimeout(350ms)` → match intent → dispatch `BOT_RESPONSE`
4. Write `src/components/shared/AiAssistant.jsx`:
   - Import `useChatbot` hook
   - Implement `FloatingButton` with pulsing ring, `Bot` icon, unread badge
   - Implement `ChatWindow` with Framer Motion spring animation
   - Implement `ChatHeader` with avatar, name, online dot, clear + close buttons
   - Implement `MessageList` with auto-scroll ref
   - Implement `MessageBubble` for bot (left) and user (right) with timestamps
   - Implement `TypingIndicator` with 3-dot CSS bounce
   - Implement `QuickChips` row with chip buttons
   - Implement `InputRow` with controlled text input + send button
   - Wire all to `useChatbot()` return values
5. Add CSS `@keyframes ring-pulse` for the floating button ring and `@keyframes dot-bounce` for typing indicator — inject via a `<style>` tag inside `AiAssistant.jsx` (no globals.css change)
6. Update `src/components/layout/Layout.jsx` — add `import AiAssistant from '@/components/shared/AiAssistant'` and render `<AiAssistant />` after `</footer>`

**Relevant Context:**
- `src/components/layout/Layout.jsx` — add import + render (single line change)
- `src/lib/utils.js` — `cn()`
- Framer Motion: `motion`, `AnimatePresence`
- Lucide: `Bot`, `X`, `Send`, `Trash2`, `MessageCircle`
- No external AI/API dependency whatsoever

**Status:** [ ] pending

---

### Sub-Task 16 — Premium Effects Layer

**Intent:** Add a suite of premium visual effects as **net-new** components and hooks that layer over the existing portfolio without touching any section file. Effects are grouped into three mounting points: (1) `App.jsx` for page-level effects (cursor, scroll progress, page loader, mouse glow, particles), (2) `globals.css` for smooth scroll + section reveal base styles, and (3) `Layout.jsx` for the animated gradient background wrapper. No section files (Hero, About, Skills, etc.) are modified.

**Expected Outcomes:**
- Custom cursor replaces the native cursor on pointer:fine devices (CSS media query)
- Scroll progress bar runs along the top of the viewport
- Page loader shows on initial mount, fades out after 1.2s
- Mouse glow follows cursor position as a soft radial gradient overlay
- Parallax depth effect on scroll for decorative elements (provided as a reusable hook)
- Animated gradient background runs as a slow colour-shifting base layer behind all content
- Smooth scrolling locked to CSS `scroll-behavior: smooth` on `html` (already planned in ST-3 globals.css — confirmed/reinforced here)
- Section reveal: `SectionWrapper.jsx` already handles `whileInView` — this ST adds a global CSS reveal class for non-Framer elements
- Floating elements: three ambient decorative blobs rendered in `App.jsx`, drifting slowly via Framer Motion
- Particle background: canvas-based, two-zone density — full in Hero viewport zone, 30% opacity/count elsewhere — rendered in `App.jsx` as a fixed layer
- Framer Motion lazy configuration: `LazyMotion` + `domAnimation` feature bundle wraps the app to tree-shake unused Framer Motion code
- All effects respect `prefers-reduced-motion` — disabled via `useReducedMotion()` Framer Motion hook
- Zero responsive breakage — cursor/glow hidden on touch via `@media (pointer: fine)`

**New / modified files:**
```
src/components/ui/CustomCursor.jsx       ← net-new
src/components/ui/ScrollProgressBar.jsx  ← net-new
src/components/ui/PageLoader.jsx         ← net-new
src/components/ui/MouseGlow.jsx          ← net-new
src/components/ui/ParticleBackground.jsx ← net-new
src/components/ui/FloatingBlobs.jsx      ← net-new
src/hooks/useMousePosition.js            ← net-new
src/hooks/useParallax.js                 ← net-new
src/hooks/usePageLoader.js               ← net-new
src/App.jsx                              ← wrap with LazyMotion, mount global effects
src/styles/globals.css                   ← add cursor:none, section-reveal class, reduced-motion overrides
```

**No section files modified. Layout.jsx not modified (gradient background goes in App.jsx).**

---

### Effect 1 — Custom Cursor (`CustomCursor.jsx`)

**Behaviour:**
- Replaces native cursor globally: `cursor: none` on `body` (CSS, `@media (pointer: fine)` only)
- Two DOM elements: `CursorDot` (8×8px solid circle, follows mouse exactly) + `CursorRing` (32×32px hollow ring, follows with spring lag)
- `CursorDot`: `motion.div`, tracks `mouseX`/`mouseY` via `useMotionValue` + `useSpring(stiffness: 800, damping: 35)`
- `CursorRing`: `motion.div`, same values but `stiffness: 120, damping: 18` for lag
- Both positioned `fixed`, `pointer-events: none`, `z-index: 9999`
- **Interactive states** (via `data-cursor` attribute on hovered elements):
  - Default: dot = primary colour, ring = border only
  - Hover link/button: ring scales to `2.5×`, dot disappears, ring fills with `primary/20`
  - Hover image: ring becomes a crosshair square
  - Text input focus: ring becomes an I-beam shape
- State detection: global `mouseover` listener checks `event.target.closest('[data-cursor]')` and sets a `cursorVariant` state
- Hidden while cursor is outside viewport

**Files:** `CustomCursor.jsx`, `useMousePosition.js`

**`useMousePosition.js`:**
```js
// Returns { x: MotionValue, y: MotionValue }
// Uses useMotionValue + useEffect mousemove listener on window
// Cleanup on unmount
```

---

### Effect 2 — Scroll Progress Bar (`ScrollProgressBar.jsx`)

**Behaviour:**
- Fixed `top-0 left-0` full-width bar, `h-[3px]`, `z-50`
- Width driven by `useScroll()` → `scrollYProgress` MotionValue → `scaleX` transform on the bar
- Gradient: `from-primary via-accent to-primary` (animating gradient)
- `transformOrigin: left`
- Glow: `box-shadow: 0 0 8px var(--primary)` via inline style
- Smooth: Framer Motion `useSpring(scrollYProgress, { stiffness: 100, damping: 30 })` — no jumpy progress

**Files:** `ScrollProgressBar.jsx`

---

### Effect 3 — Page Loader (`PageLoader.jsx` + `usePageLoader.js`)

**Behaviour:**
- Full-screen overlay rendered on first app mount
- Shows for 1.2s then fades out via `AnimatePresence`
- Design: dark background, centred animated logo/monogram "VK", gradient shimmer sweep across letters, tagline "Loading..." with animated dots
- After fade-out: removed from DOM entirely (AnimatePresence exit)
- `usePageLoader.js`: `useState(true)` + `useEffect(() => setTimeout(() => setLoading(false), 1200), [])` — returns `isLoading` boolean
- Respects `prefers-reduced-motion`: if reduced motion, show for only 100ms

**Animation:**
- Monogram "VK": Framer Motion `scale: 0.5 → 1` + fade in on mount
- Shimmer sweep: CSS `@keyframes shimmer` on gradient background-position
- Loading dots: 3 dots, CSS staggered opacity pulse
- Exit: `opacity: 1 → 0`, `scale: 1.05`, duration 400ms

**Files:** `PageLoader.jsx`, `usePageLoader.js`

---

### Effect 4 — Mouse Glow (`MouseGlow.jsx`)

**Behaviour:**
- Fixed full-screen div, `pointer-events: none`, `z-index: 1` (above background, below content)
- `background: radial-gradient(600px circle at {x}px {y}px, rgba(primary, 0.08), transparent 70%)`
- Position driven by `useMousePosition()` hook → `useSpring` for smooth follow (stiffness: 80, damping: 20)
- Hidden on `@media (pointer: coarse)` via CSS class
- Colour adapts to theme: reads `--primary` CSS variable (hsl values) for the radial gradient centre colour
- On dark theme: `rgba(primary, 0.10)` — slightly more visible
- On light theme: `rgba(primary, 0.06)` — subtler

**Files:** `MouseGlow.jsx` (reuses `useMousePosition.js`)

---

### Effect 5 — Parallax Hook (`useParallax.js`)

**Behaviour:**
- Reusable hook: `useParallax(speed = 0.3)`
- Returns a `y` MotionValue derived from `useScroll().scrollY` → `useTransform(scrollY, [0, 1000], [0, speed * 1000])`
- Usage: any component can do `const y = useParallax(0.2)` → `<motion.div style={{ y }}>`
- Negative speed = moves upward (away from scroll direction) — creates depth
- Used by `FloatingBlobs` and available for future use in any section

**Files:** `useParallax.js`

---

### Effect 6 — Floating Blobs (`FloatingBlobs.jsx`)

**Behaviour:**
- Fixed layer, `pointer-events: none`, `z-index: 0` (above background, well below content)
- 3 large blurred gradient orbs drifting across the full page
- Each blob: `motion.div`, `w-96 h-96`, `rounded-full`, `blur-3xl`, `opacity-[0.06]` on light / `opacity-[0.10]` on dark
- Each blob uses `useParallax(speed)` with different speeds for depth
- Each blob also has a slow Framer Motion `animate` position drift: `x/y [0, 30, -20, 0]` with `duration: 20–30s`, `repeat: Infinity`, `ease: easeInOut`
- Colours: blob 1 = `bg-primary`, blob 2 = `bg-accent`, blob 3 = `bg-violet-500`
- Positions: scattered across top-left, centre-right, bottom-centre of the page

**Files:** `FloatingBlobs.jsx` (imports `useParallax`)

---

### Effect 7 — Particle Background (`ParticleBackground.jsx`)

**Behaviour:**
- `<canvas>` element, `fixed inset-0`, `pointer-events: none`, `z-index: 0`
- Canvas sized to `window.innerWidth × window.innerHeight`, resizes on `ResizeObserver`
- **Two-zone density:**
  - Zone A (Hero zone): first `100vh` of page — full density (80 particles), full opacity (0.6)
  - Zone B (rest of page): below first `100vh` — 30% density (24 particles), 30% opacity (0.18)
- Particle properties: `x`, `y`, `vx`, `vy` (slow drift 0.1–0.3 px/frame), `radius` (1–2.5px), `opacity`
- Each particle: small circle, filled with `--primary` CSS variable colour
- Particles wrap around edges (toroidal)
- Connection lines: particles within 120px draw a faint line between them (`opacity: 0.08`)
- Animation loop: `requestAnimationFrame`, `useEffect` → returns cleanup `cancelAnimationFrame`
- Particle count adapts: `useEffect` on `resize` recalculates zones
- Respects `prefers-reduced-motion`: if reduced motion, render static dots only (no animation loop)
- On mobile (`window.innerWidth < 768`): total count halved to preserve performance

**Files:** `ParticleBackground.jsx`

---

### Effect 8 — Animated Gradient Background (`globals.css` addition)

**Behaviour:**
- CSS-only, no JS: `body::before` pseudo-element, `fixed inset-0`, `z-index: -1`
- `background: linear-gradient(135deg, ...)` with slow `@keyframes gradientShift` rotating hue
- On light theme: very subtle pastel gradient (`from-slate-50 via-blue-50/30 to-violet-50/20`)
- On dark theme: deep gradient (`from-gray-950 via-slate-900 to-gray-950`) with slow hue shift
- `animation: gradientShift 20s ease infinite`
- Does NOT override `--background` token — sits behind the body background as a texture layer
- Added to `src/styles/globals.css` only — no JS component needed

---

### Effect 9 — Smooth Scrolling (globals.css + Layout)

**Behaviour:**
- Already planned in ST-3 (`scroll-behavior: smooth` on `html`) — confirmed/enforced here
- Additionally: `scroll-padding-top: 80px` on `html` to offset fixed Navbar height when jumping to anchors
- Both rules added to `globals.css` under the `:root` or `html` block (single addition, no duplication check needed since ST-3 hasn't been implemented yet)

---

### Effect 10 — Section Reveal CSS Class (`globals.css` addition)

**Behaviour:**
- A CSS utility class `.section-reveal` for any non-Framer element that needs scroll-triggered fade-in
- Uses CSS `@keyframes revealUp`: `opacity: 0, translateY(30px) → opacity: 1, translateY(0)`
- Applied via `animation-play-state: paused` by default; toggled to `running` when `.is-visible` class is added by an `IntersectionObserver` in `SectionWrapper.jsx`
- **Minimal SectionWrapper.jsx change**: add one `IntersectionObserver` in `useEffect` that adds `.is-visible` to the root div — this is additive and does not break existing Framer Motion behaviour
- Added to `globals.css` only

---

### Effect 11 — Framer Motion Optimisation (`App.jsx`)

**Behaviour:**
- Wrap entire app in `<LazyMotion features={domAnimation} strict>` from `framer-motion`
- Replace all `motion.*` imports in **new files only** with `m.*` (the lazy variant) to use the tree-shaken bundle
- Existing section files are NOT touched — they already use `motion.*` and will continue to work
- `LazyMotion` wraps `<RouterProvider>` inside `App.jsx`
- Reduces Framer Motion bundle by ~30% (removes unused gesture and drag code)
- `strict` prop ensures a console warning if a non-lazy `motion.*` is used inside the boundary (dev-only)

---

**Component mount map (where each effect lives):**

| Effect | Mounted in | z-index |
|---|---|---|
| PageLoader | `App.jsx` | 9998 |
| CustomCursor | `App.jsx` | 9999 |
| ScrollProgressBar | `App.jsx` | 50 |
| MouseGlow | `App.jsx` | 1 |
| FloatingBlobs | `App.jsx` | 0 |
| ParticleBackground | `App.jsx` | 0 |
| Animated gradient bg | `globals.css` body::before | -1 |
| Smooth scroll | `globals.css` html | — |
| Section reveal class | `globals.css` | — |
| LazyMotion wrapper | `App.jsx` | — |
| useParallax hook | consumed by FloatingBlobs | — |
| useMousePosition hook | consumed by Cursor + Glow | — |

---

**Performance constraints — all effects must follow these rules:**
1. All canvas/animation loops clean up via `useEffect` return
2. `requestAnimationFrame` used for particle loop — no `setInterval`
3. Mouse tracking uses `useMotionValue` (no setState) — zero re-renders per mouse move
4. Particle count halved on mobile (`window.innerWidth < 768`)
5. All effects check `useReducedMotion()` — skip animations if true
6. `pointer-events: none` on every effect layer — zero interaction interference
7. Custom cursor hidden via CSS `@media (pointer: fine)` only — not JS feature detection
8. `LazyMotion` uses `domAnimation` feature set (not `domMax`) — excludes drag/layout animations from initial bundle

---

**Animation plan:**

| Effect | Technology | Notes |
|---|---|---|
| Custom cursor dot | Framer Motion `useSpring` | stiffness 800 — tight follow |
| Custom cursor ring | Framer Motion `useSpring` | stiffness 120 — lag/trail effect |
| Scroll progress | Framer Motion `useScroll` + `useSpring` | smooth, no jump |
| Page loader exit | `AnimatePresence` opacity + scale | removed from DOM after exit |
| Mouse glow | `useSpring` position | stiffness 80 — very smooth |
| Floating blobs | Framer Motion `animate` + `useParallax` | slow drift, no layout impact |
| Particles | `requestAnimationFrame` canvas | no React re-renders |
| Gradient background | CSS `@keyframes` | zero JS |
| Section reveal | CSS `@keyframes` + `IntersectionObserver` | zero Framer Motion overhead |
| Parallax | Framer Motion `useScroll` + `useTransform` | scroll-driven, no listener |

---

**Todo List:**
1. Write `src/hooks/useMousePosition.js` — `useMotionValue` x/y + `mousemove` listener, returns `{ x, y }` MotionValues
2. Write `src/hooks/useParallax.js` — `useScroll` + `useTransform` returning a `y` MotionValue, accepts `speed` param
3. Write `src/hooks/usePageLoader.js` — `useState(true)` + `setTimeout(1200ms)` → `setLoading(false)`, respects `useReducedMotion`
4. Write `src/components/ui/CustomCursor.jsx`:
   - Two `motion.div` elements (dot + ring)
   - `useMousePosition()` for raw position
   - `useSpring` for each with different stiffness
   - Global `mouseover` listener for `cursorVariant` state
   - CSS `@media (pointer: fine)` visibility via className
5. Write `src/components/ui/ScrollProgressBar.jsx`:
   - `useScroll()` → `scrollYProgress`
   - `useSpring` for smooth value
   - `motion.div` with `scaleX` + gradient + glow shadow
6. Write `src/components/ui/PageLoader.jsx`:
   - Imports `usePageLoader`
   - Full-screen overlay with "VK" monogram + shimmer + loading dots
   - `AnimatePresence` exit animation
   - Injected `<style>` for shimmer + dot-pulse `@keyframes`
7. Write `src/components/ui/MouseGlow.jsx`:
   - Reuses `useMousePosition()`
   - `useSpring` for smooth follow
   - Fixed div with `radial-gradient` background updated via `useMotionValue` style
   - `pointer-coarse` hidden via CSS
8. Write `src/components/ui/FloatingBlobs.jsx`:
   - 3 `motion.div` blobs with `useParallax` + slow `animate` position drift
   - Different colours, positions, speeds
   - `useReducedMotion` check — static if true
9. Write `src/components/ui/ParticleBackground.jsx`:
   - Canvas ref, `useEffect` for init + animation loop
   - Two-zone particle system (Hero zone full, rest 30%)
   - `ResizeObserver` for canvas resize
   - Connection lines within 120px
   - `useReducedMotion` check — static dots if true
   - Mobile halved count
10. Update `src/styles/globals.css`:
    - Add `cursor: none` on `body` inside `@media (pointer: fine)`
    - Add `scroll-padding-top: 80px` to `html`
    - Add `@keyframes gradientShift` + `body::before` animated gradient
    - Add `.section-reveal` + `@keyframes revealUp` + `.section-reveal.is-visible` class
11. Update `src/App.jsx`:
    - Import `LazyMotion`, `domAnimation` from `framer-motion`
    - Import all 6 effect components
    - Import `usePageLoader`
    - Wrap `<RouterProvider>` in `<LazyMotion features={domAnimation} strict>`
    - Render `<PageLoader />`, `<CustomCursor />`, `<ScrollProgressBar />`, `<MouseGlow />`, `<FloatingBlobs />`, `<ParticleBackground />` as siblings to `<RouterProvider>` (outside router, inside LazyMotion)
12. Update `src/components/shared/SectionWrapper.jsx`:
    - Add `useEffect` with `IntersectionObserver` that adds `.is-visible` class to root div when entering viewport (additive — does not remove existing Framer Motion `whileInView` behaviour)

**Relevant Context:**
- `src/App.jsx` — wrap with LazyMotion, mount all global effects
- `src/styles/globals.css` — CSS-only effects + cursor hide + section reveal
- `src/components/shared/SectionWrapper.jsx` — minimal IntersectionObserver addition only
- Framer Motion: `LazyMotion`, `domAnimation`, `m`, `useScroll`, `useSpring`, `useTransform`, `useMotionValue`, `useReducedMotion`, `AnimatePresence`
- No new npm packages required — all within existing planned deps

**Status:** [ ] pending

---

### Sub-Task 17 — Production Optimisation (SEO · Performance · Accessibility · Build)

**Intent:** Add every production-readiness concern as pure **infrastructure files and config changes** — no UI components, no section changes. This sub-task targets a Lighthouse score of 95+ across Performance, Accessibility, Best Practices, and SEO. It is divided into five pillars: SEO/Meta, Static Assets, Build Config, Code Splitting, and Accessibility.

**Zero UI changes. Zero section file modifications.**

**New / modified files:**
```
public/robots.txt                         ← net-new static file
public/og-image.png                       ← net-new placeholder (600×315 gradient PNG)
public/twitter-card.png                   ← net-new placeholder (1200×628 gradient PNG)
public/site.webmanifest                   ← net-new PWA manifest
src/lib/seo.js                            ← net-new SEO config constants + helper
src/components/shared/SEOHead.jsx         ← net-new reusable Helmet wrapper
index.html                                ← add preconnect, dns-prefetch, font-display, theme-color, manifest link
vite.config.js                            ← add build optimisations + vite-plugin-sitemap
.env.example                              ← add VITE_SITE_URL, VITE_SITE_NAME, VITE_TWITTER_HANDLE
src/App.jsx                               ← wrap with HelmetProvider (if not already from ST-7)
src/pages/Home.jsx                        ← replace inline Helmet with <SEOHead> component
src/components/shared/SectionWrapper.jsx  ← add aria-label prop forwarding (additive only)
src/components/layout/Layout.jsx          ← add skip-to-main-content link (prepend, 1 line)
src/components/layout/Navbar.jsx          ← add aria-current, aria-label, keyboard nav (additive)
```

---

## Pillar 1 — SEO Meta Tags (Open Graph + Twitter Cards)

### `src/lib/seo.js`

Central SEO config consumed by `SEOHead.jsx` and any future pages:

```js
export const siteConfig = {
  name:        import.meta.env.VITE_SITE_NAME  || 'Vinay Kumar',
  url:         import.meta.env.VITE_SITE_URL   || 'https://vinaykumar.dev',
  title:       'Vinay Kumar — Software Developer',
  description: 'Full-stack Software Developer specialising in Java, React, Node.js, Python and Power BI. MCA graduate with a unique background in healthcare technology.',
  keywords:    'Vinay Kumar, Software Developer, React Developer, Java Developer, Full Stack, Node.js, Python, Power BI, MCA, Portfolio',
  ogImage:     '/og-image.png',
  twitterCard: '/twitter-card.png',
  twitterHandle: import.meta.env.VITE_TWITTER_HANDLE || '@vinaykumar',
  author:      'Vinay Kumar',
  locale:      'en_IN',
  themeColor:  '#6366f1',
}

// Helper: builds absolute URL from a relative path
export const absoluteUrl = (path) => `${siteConfig.url}${path}`
```

### `src/components/shared/SEOHead.jsx`

Reusable `react-helmet-async` wrapper. Accepts override props, falls back to `siteConfig`:

```jsx
// Props: title, description, keywords, ogImage, ogType, canonicalPath, noIndex
// Renders:
//   <title>
//   <meta name="description">
//   <meta name="keywords">
//   <meta name="author">
//   <link rel="canonical">
//   Open Graph: og:title, og:description, og:image, og:url, og:type, og:locale, og:site_name
//   Twitter: twitter:card, twitter:title, twitter:description, twitter:image, twitter:creator
//   <meta name="robots"> (index,follow OR noindex,nofollow if noIndex prop)
//   <meta name="theme-color">
//   JSON-LD structured data (Person schema for portfolio)
```

**JSON-LD Person schema** (injected as `<script type="application/ld+json">`):
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Vinay Kumar",
  "url": "https://vinaykumar.dev",
  "jobTitle": "Software Developer",
  "description": "Full-stack Software Developer ...",
  "sameAs": [
    "https://github.com/vinaykumar",
    "https://linkedin.com/in/vinaykumar"
  ],
  "knowsAbout": ["Java", "React", "Node.js", "Python", "SQL", "Power BI"]
}
```

### `src/pages/Home.jsx` update

Replace any existing inline `<Helmet>` with `<SEOHead />` (additive replacement — no layout change):
```jsx
import SEOHead from '@/components/shared/SEOHead'
// ...
<SEOHead
  title="Vinay Kumar — Software Developer | Java · React · Node.js"
  description="Full-stack Software Developer..."
  canonicalPath="/"
  ogType="website"
/>
```

---

## Pillar 2 — Static Assets & Crawlability

### `public/robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://vinaykumar.dev/sitemap.xml
```

### `public/site.webmanifest`
```json
{
  "name": "Vinay Kumar — Portfolio",
  "short_name": "Vinay Kumar",
  "description": "Software Developer Portfolio",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#6366f1",
  "icons": [
    { "src": "/favicon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/favicon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### `public/og-image.png` + `public/twitter-card.png`

Both are **placeholder gradient images** (not real images — agent generates them as simple solid-colour PNG using a base64-encoded 1×1 pixel PNG or uses an SVG placeholder). Developer replaces with real screenshots. Dimensions noted in comments only — the files are placeholders.

### Sitemap — `vite-plugin-sitemap`

Add to `vite.config.js` plugins:
```js
import sitemap from 'vite-plugin-sitemap'
// ...
sitemap({
  hostname: process.env.VITE_SITE_URL || 'https://vinaykumar.dev',
  dynamicRoutes: ['/'],
  outDir: 'dist',
  changefreq: 'monthly',
  priority: 1.0,
  lastmod: new Date().toISOString().split('T')[0],
})
```
Install: add `vite-plugin-sitemap` to devDependencies in ST-1.

---

## Pillar 3 — Vite Build Optimisation

### `vite.config.js` — full updated config:

```js
// Additions only — path alias already exists from ST-1:
build: {
  target: 'es2015',
  sourcemap: false,           // remove sourcemaps in prod
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,     // strip all console.log in prod
      drop_debugger: true,
    },
  },
  rollupOptions: {
    output: {
      manualChunks: {
        // Vendor chunk isolation — parallel browser loading
        'vendor-react':   ['react', 'react-dom', 'react-router-dom'],
        'vendor-motion':  ['framer-motion'],
        'vendor-icons':   ['react-icons', 'lucide-react'],
        'vendor-emailjs': ['@emailjs/browser'],
        'vendor-helmet':  ['react-helmet-async'],
      },
      // Content-hashed filenames for long-term caching
      chunkFileNames:  'assets/js/[name]-[hash].js',
      entryFileNames:  'assets/js/[name]-[hash].js',
      assetFileNames:  'assets/[ext]/[name]-[hash].[ext]',
    },
  },
  // Chunk size warning threshold
  chunkSizeWarningLimit: 600,
},
// Preview server (for `npm run preview`)
preview: {
  port: 4173,
  strictPort: true,
},
```

### `package.json` scripts additions:
```json
"scripts": {
  "dev":     "vite",
  "build":   "vite build",
  "preview": "vite preview",
  "lint":    "eslint src --ext .js,.jsx --report-unused-disable-directives",
  "analyze": "vite-bundle-visualizer"
}
```

---

## Pillar 4 — Code Splitting & Lazy Loading

### Section-level lazy loading in `src/pages/Home.jsx`

All 7 section components converted to `React.lazy` with individual `<Suspense>` fallbacks:

```jsx
const Hero         = lazy(() => import('@/sections/Hero'))
const About        = lazy(() => import('@/sections/About'))
const Skills       = lazy(() => import('@/sections/Skills'))
const Projects     = lazy(() => import('@/sections/Projects'))
const Experience   = lazy(() => import('@/sections/Experience'))
const CertAchieve  = lazy(() => import('@/sections/CertificationsAchievements'))
const Contact      = lazy(() => import('@/sections/Contact'))

// Each wrapped with Suspense + SectionSkeleton fallback
```

**`SectionSkeleton` component** (inline in Home.jsx — tiny, no new file):
- Full-width, min-height `400px`, `animate-pulse` Tailwind skeleton
- Matches section background token — invisible transition

### Image lazy loading (`src/hooks/useImageLazy.js` — net-new)

Reusable hook for any `<img>` tag in the codebase:
```js
// useImageLazy(src, placeholder)
// Returns { imgSrc, imgRef, isLoaded }
// Uses IntersectionObserver — only loads image when near viewport
// Returns placeholder until loaded, then crossfades
// Sets loading="lazy" + decoding="async" + fetchPriority="low" automatically
```

### `src/components/ui/LazyImage.jsx` (net-new)

Reusable image component used by `ProjectCard` and any future image:
```jsx
// Props: src, alt, width, height, className, priority (bool)
// priority=true → fetchPriority="high", loading="eager" (for Hero image)
// priority=false → loading="lazy", decoding="async", fetchPriority="low"
// Shows skeleton shimmer until loaded
// Always renders explicit width + height → prevents CLS (Cumulative Layout Shift)
// objectFit="cover" default
```

---

## Pillar 5 — Accessibility (WCAG 2.1 AA)

### Skip to main content link — `src/components/layout/Layout.jsx`

Prepend before `<Navbar>`:
```jsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999]
             focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground
             focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
>
  Skip to main content
</a>
```

The `<main>` element must have `id="main-content"` — added to `Layout.jsx` main tag.

### Navbar keyboard navigation — `src/components/layout/Navbar.jsx`

Additive changes only:
- Add `aria-label="Main navigation"` to `<nav>`
- Add `aria-current="page"` to the active nav link (driven by `useScrollSpy`)
- Mobile menu button: `aria-expanded={isOpen}`, `aria-controls="mobile-menu"`, `aria-label="Toggle navigation"`
- Mobile menu div: `id="mobile-menu"`, `role="navigation"`, `aria-label="Mobile navigation"`
- All nav links: `tabIndex={0}`, `onKeyDown` Enter/Space activates

### `SectionWrapper.jsx` — additive ARIA additions

- Forward `aria-label` prop to the root `<section>` element
- Add `role="region"` when `aria-label` is present
- This is purely additive — existing `whileInView` behaviour unchanged

### `src/hooks/useFocusTrap.js` (net-new, replaces inline focus trap in Contact + ProjectModal)

Reusable hook extracted from the planned inline implementations in ST-12 and ST-14:
```js
// useFocusTrap(ref, isActive)
// Captures Tab/Shift+Tab within ref element when isActive=true
// Restores focus to trigger element on deactivate
// Used by: ProjectModal (ST-12), Contact success panel, AiAssistant chat window (ST-15)
```

### `src/lib/a11y.js` (net-new)

Accessibility utility constants and helpers:
```js
// ARIA live region helper: announce(message, politeness='polite')
//   → updates a visually-hidden live region div in DOM
//   → used for dynamic content changes (filter results count, form submission, chatbot messages)
// srOnly class string shorthand
// Key constants: ENTER=13, SPACE=32, ESCAPE=27, TAB=9, ARROW_UP=38, ARROW_DOWN=40
// focusableSelectors: 'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'
```

---

## Pillar 6 — `index.html` Resource Hints & Lighthouse

### `index.html` — additions to `<head>` (no existing content removed):

```html
<!-- Theme + manifest -->
<meta name="theme-color" content="#6366f1" />
<meta name="color-scheme" content="dark light" />
<link rel="manifest" href="/site.webmanifest" />

<!-- Favicon set -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

<!-- Preconnect for external resources (Google Fonts if used) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- DNS prefetch for EmailJS -->
<link rel="dns-prefetch" href="https://api.emailjs.com" />

<!-- Critical font with font-display:swap (if Google Fonts used) -->
<!-- font-display:swap prevents FOIT (Flash of Invisible Text) -->

<!-- Viewport + mobile -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

<!-- Additional SEO meta (base set — react-helmet-async overrides per page) -->
<meta name="author" content="Vinay Kumar" />
<meta name="robots" content="index, follow" />
<meta property="og:site_name" content="Vinay Kumar Portfolio" />
```

---

## Pillar 7 — React Best Practices Audit

The following patterns must be enforced in **all new files written by ST-16 and ST-17** (no existing section changes):

| Pattern | Rule |
|---|---|
| PropTypes | All new components must define `PropTypes` (or JSDoc param types) |
| memo | All new pure presentational components wrapped in `React.memo` |
| useCallback | All event handler functions in hooks wrapped in `useCallback` |
| useMemo | All derived data (filtered lists, computed styles) in `useMemo` |
| key props | All mapped elements have stable non-index keys |
| displayName | All `forwardRef` / `memo` components have `.displayName` set |
| Console | No `console.log` in any component (use conditional `import.meta.env.DEV` guard) |
| Dead code | No unused imports, no commented-out JSX blocks |

**ESLint config** — `eslint.config.js` (Vite default flat config):

```js
// enforce:
// react-hooks/rules-of-hooks
// react-hooks/exhaustive-deps
// jsx-a11y/alt-text
// jsx-a11y/aria-props
// jsx-a11y/label-has-associated-control
// jsx-a11y/no-noninteractive-element-interactions
// no-unused-vars
// no-console (warn)
```

Install: `eslint-plugin-jsx-a11y` added to devDeps in ST-1.

---

## Full File Change Map

| File | Action | Pillar |
|---|---|---|
| `public/robots.txt` | Net-new | Crawlability |
| `public/site.webmanifest` | Net-new | PWA / Lighthouse |
| `public/og-image.png` | Net-new placeholder | OG |
| `public/twitter-card.png` | Net-new placeholder | Twitter |
| `src/lib/seo.js` | Net-new | SEO config |
| `src/lib/a11y.js` | Net-new | Accessibility utils |
| `src/components/shared/SEOHead.jsx` | Net-new | SEO / OG / Twitter |
| `src/components/ui/LazyImage.jsx` | Net-new | Image optimisation |
| `src/hooks/useImageLazy.js` | Net-new | Image lazy loading |
| `src/hooks/useFocusTrap.js` | Net-new | Accessibility |
| `index.html` | Modified — add resource hints | Lighthouse |
| `vite.config.js` | Modified — build config + sitemap plugin | Build |
| `src/pages/Home.jsx` | Modified — lazy sections + SEOHead | Code splitting |
| `src/components/shared/SectionWrapper.jsx` | Modified — aria-label forwarding (additive) | Accessibility |
| `src/components/layout/Layout.jsx` | Modified — skip link + main id (additive) | Accessibility |
| `src/components/layout/Navbar.jsx` | Modified — ARIA attrs (additive) | Accessibility |
| `src/App.jsx` | Modified — HelmetProvider confirmed | SEO |
| `eslint.config.js` | Modified — add jsx-a11y rules | Best practices |
| `.env.example` | Modified — add VITE_TWITTER_HANDLE | SEO |

---

**Todo List:**

**Pillar 1 — SEO:**
1. Write `src/lib/seo.js` with `siteConfig` object + `absoluteUrl` helper
2. Write `src/components/shared/SEOHead.jsx` using `react-helmet-async`:
   - All meta tags: title, description, keywords, author, robots, theme-color
   - Open Graph: og:title, og:description, og:image (absolute URL), og:url, og:type, og:locale, og:site_name
   - Twitter Card: twitter:card="summary_large_image", twitter:title, twitter:description, twitter:image, twitter:creator
   - JSON-LD Person schema as `<script type="application/ld+json">`
   - `<link rel="canonical">` with absolute URL
3. Update `src/pages/Home.jsx` — replace any existing `<Helmet>` with `<SEOHead />` import
4. Confirm `<HelmetProvider>` wraps `<App>` in `main.jsx`
5. Add `VITE_TWITTER_HANDLE=` to `.env.example`

**Pillar 2 — Static Assets:**
6. Write `public/robots.txt`
7. Write `public/site.webmanifest`
8. Create `public/og-image.png` placeholder (simple base64 1×1 or SVG → PNG note)
9. Create `public/twitter-card.png` placeholder
10. Add `vite-plugin-sitemap` to `vite.config.js` plugins with hostname from env var

**Pillar 3 — Build Config:**
11. Update `vite.config.js`:
    - Add `build.minify: 'terser'`, `build.sourcemap: false`
    - Add `build.terserOptions.compress.drop_console: true`
    - Add `rollupOptions.output.manualChunks` with 5 vendor chunks
    - Add `chunkFileNames`, `entryFileNames`, `assetFileNames` patterns
    - Add `build.chunkSizeWarningLimit: 600`
12. Add `"analyze": "vite-bundle-visualizer"` script to `package.json`
13. Add `vite-plugin-sitemap`, `vite-bundle-visualizer`, `eslint-plugin-jsx-a11y` to devDeps

**Pillar 4 — Code Splitting:**
14. Update `src/pages/Home.jsx`:
    - Convert all 7 section imports to `React.lazy(() => import(...))`
    - Wrap each in `<Suspense fallback={<SectionSkeleton />}>`
    - Define inline `SectionSkeleton` component (animate-pulse div)
15. Write `src/hooks/useImageLazy.js` with IntersectionObserver-based image load
16. Write `src/components/ui/LazyImage.jsx` with `priority` prop, shimmer, CLS prevention

**Pillar 5 — Accessibility:**
17. Write `src/lib/a11y.js` with ARIA live region helper, key constants, focusable selectors
18. Write `src/hooks/useFocusTrap.js` — reusable focus trap hook
19. Update `src/components/layout/Layout.jsx`:
    - Prepend skip-to-content `<a>` link
    - Add `id="main-content"` to `<main>`
20. Update `src/components/layout/Navbar.jsx`:
    - `aria-label="Main navigation"` on `<nav>`
    - `aria-current` on active link
    - `aria-expanded`, `aria-controls`, `aria-label` on hamburger button
    - `id="mobile-menu"` on mobile menu div
21. Update `src/components/shared/SectionWrapper.jsx`:
    - Accept and forward `aria-label` prop
    - Add `role="region"` when aria-label present

**Pillar 6 — index.html + Lighthouse:**
22. Update `index.html`:
    - Add `<meta name="theme-color">`, `<meta name="color-scheme">`
    - Add `<link rel="manifest" href="/site.webmanifest">`
    - Add `<link rel="preconnect">` for Google Fonts + gstatic
    - Add `<link rel="dns-prefetch">` for EmailJS API
    - Add `viewport-fit=cover` to viewport meta
    - Add `<meta name="author">`, `<meta name="robots">`
    - Add `<link rel="apple-touch-icon">`

**Pillar 7 — Best Practices:**
23. Update `eslint.config.js` — add `jsx-a11y` plugin and rules
24. Audit all new ST-17 components for `React.memo`, `useCallback`, `useMemo`, `PropTypes`

**Relevant Context:**
- `react-helmet-async` already in planned deps (ST-1)
- `vite-plugin-sitemap` — new devDep, add to ST-1 install
- `vite-bundle-visualizer` — new devDep, add to ST-1 install
- `eslint-plugin-jsx-a11y` — new devDep, add to ST-1 install
- All `public/` files deployed as-is by Vite — no import needed
- `src/pages/Home.jsx` already exists from ST-7 — this is a targeted modification

**Status:** [ ] pending

---

## Implementation Order

```
ST-1 → ST-2 → ST-3 → ST-4 → ST-5 → ST-6 → ST-7
  → ST-8 (Hero) → ST-9 (About) → ST-10 (Experience) → ST-11 (Skills)
  → ST-12 (Projects) → ST-13 (Certifications & Achievements) → ST-14 (Contact)
  → ST-15 (AI Assistant) → ST-16 (Premium Effects) → ST-17 (Production Optimisation)
```

Each sub-task depends on the previous. They must be executed sequentially.

---

## Key Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| Theme strategy | CSS variables + `dark` class on `<html>` | shadcn/ui compatible, no re-render on toggle |
| Router mode | `createBrowserRouter` (history) | Clean URLs, SEO-friendly |
| Lazy loading scope | Page level (`<Home>`) | All sections are on one page; no need to lazy-load each section separately |
| Scroll spy | `IntersectionObserver` | No scroll event listeners, performant |
| Icon libraries | Both `react-icons` and `lucide-react` | lucide for UI controls, react-icons for brand logos |
| Section animation | Framer Motion `whileInView` in `SectionWrapper` | Centralises animation, each section gets it for free |
| Hero typing animation | Internal `useEffect` hook, no library | Zero extra dependency, full control over speed/erase/pause |
| Hero background orbs | CSS `@keyframes` only | No JS animation overhead on the most prominent element |
| Hero floating icons | Framer Motion infinite Y-drift | Smooth, GPU-accelerated, easy to customise per-icon |
| Hero layout | Two-column `lg`, stacked mobile | Standard Apple hero pattern |
| About count-up | Internal `useCountUp` hook + `requestAnimationFrame` | No library, triggers on scroll |
| Timeline connector | Framer Motion `useScroll` + `useTransform` scaleY | Scroll-driven line growth, zero event listeners |
| Experience layout | Two sub-sections: centre-alternating (education) + left-edge (work) | Each layout matches the data type visually |
| Skills interaction | Two-tier hover/tap expand + Framer Motion `layout` | Elegant progressive disclosure, mobile and desktop friendly |
| Skills progress bars | Framer Motion `whileInView` width spring | GPU-accelerated, triggers on visibility |
| Projects filter | `useMemo` derived list + `AnimatePresence mode="popLayout"` | Zero redundant renders, smooth card transitions |
| Projects modal | `createPortal` + `AnimatePresence` + focus trap | Proper layering above everything, accessible |
| Project card hover | `group` CSS + Framer Motion `whileHover` | GPU-accelerated lift, no JS event listeners for overlay |
| Coming Soon cards | Ghosted, non-interactive, dashed border | Clear future placeholder signal without dead buttons |
| Cert shimmer hover | Framer Motion gradient overlay `whileHover` | GPU-accelerated, no CSS-only hack needed |
| Achievement count-up | Internal `useCountUp` + `useInView` | Triggers precisely on viewport entry, zero deps |
| CertificationsAchievements | Combined file, two sub-sections | Keeps related content co-located, one scroll anchor |
| Contact EmailJS keys | Env vars only (VITE_EMAILJS_*), never hardcoded | Security — keys must not be committed to source control |
| Contact map | Custom-designed gradient card, no iframe/API | Zero dependency, works offline, swap-ready |
| Contact success animation | SVG pathLength 0→1 via Framer Motion | Smooth, branded, no GIF/Lottie dependency |
| Contact form validation | onBlur per field + full validate on submit | Best UX — no premature errors, no silent failures |
| AI chatbot data | Single chatbot.json intent map | Centralised, swappable, no API cost |
| AI chatbot placement | Rendered in Layout.jsx | Global visibility, single mount point |
| AI chatbot engine | Pure keyword-matching over intent map | Zero deps, instant, works offline |
| AI chatbot state | useReducer in custom useChatbot hook | Clean separation of logic from UI |
| Custom cursor | CSS pointer:fine media query | Browser decides touch vs mouse — not JS feature detect |
| Cursor tracking | useMotionValue + useSpring | Zero setState re-renders per mouse move |
| Particle background | Canvas requestAnimationFrame | No React state, no re-renders, GPU-composited |
| Particle two-zone | Hero full density, rest 30% | Visual impact where needed, subtle elsewhere |
| Floating blobs | Framer Motion animate + useParallax | GPU layer, parallax depth, no layout thrash |
| Page loader | AnimatePresence + setTimeout | Clean DOM removal after fade, no lingering overlay |
| LazyMotion | domAnimation feature set | ~30% Framer Motion bundle reduction |
| Section reveal CSS | IntersectionObserver + CSS class | Zero Framer Motion overhead for basic reveals |
| Reduced motion | useReducedMotion() on all effects | Accessibility — respects OS preference |
| Mouse glow | useSpring stiffness:80 | Very smooth follow, feels natural |
| Scroll progress | useScroll + useSpring | No jump on fast scroll, smooth spring |
| SEO meta | react-helmet-async per page | Dynamic, SSR-ready, no build-time dep |
| OG/Twitter images | Static /public assets + VITE_SITE_URL | Zero complexity, swap-ready |
| Sitemap | vite-plugin-sitemap auto-generated | Build-time, always in sync with routes |
| robots.txt | Static /public file | No plugin needed, deploy-ready |
| Image optimisation | Native loading=lazy + width/height attrs | Zero dep, prevents CLS |
| Code splitting | React.lazy per section + manualChunks | Vendor chunks isolated, parallel load |
| Accessibility | ARIA roles + focus management + skip link | WCAG 2.1 AA target |
| Lighthouse | Preconnect + font-display + resource hints | LCP + FID + CLS gains |
| Vite build | terser + rollup manualChunks + sourcemap:false | Smaller prod bundle |
