# Vinay Kumar — Portfolio

<div align="center">

![Vinay Kumar Portfolio](https://img.shields.io/badge/Portfolio-Vinay%20Kumar-6366f1?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-0055FF?style=flat-square&logo=framer)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**A premium, production-ready portfolio website for Vinay Kumar — Software Developer.**

[Live Demo](https://vinaykumar.dev) · [Report Bug](https://github.com/vinaykumar/portfolio/issues) · [Request Feature](https://github.com/vinaykumar/portfolio/issues)

</div>

---

## ✨ Features

| Category | Details |
|---|---|
| **Design** | Apple-inspired glassmorphism, dark/light theme, CSS variable token system |
| **Sections** | Hero, About, Skills, Projects, Experience, Certifications, Contact |
| **Animations** | Framer Motion staggered reveals, custom cursor, particle canvas, scroll progress |
| **Performance** | Lazy-loaded sections, vendor chunk splitting, content-hashed assets, 95+ Lighthouse |
| **SEO** | react-helmet-async, Open Graph, Twitter Cards, JSON-LD Person schema, sitemap |
| **Accessibility** | WCAG 2.1 AA, skip link, ARIA labels, keyboard nav, focus trap, reduced-motion |
| **AI Assistant** | Floating chatbot with local JSON intent matching — no paid API |
| **Contact Form** | EmailJS integration, field validation, animated success state |
| **PWA-ready** | Web manifest, theme-color, apple-touch-icon |

---

## 🗂 Project Structure

```
vinay-kumar-portfolio/
├── public/                    # Static assets (served as-is)
│   ├── favicon.svg            # Custom SVG favicon
│   ├── robots.txt             # SEO crawl rules
│   └── site.webmanifest       # PWA manifest
├── src/
│   ├── assets/                # Fonts, images
│   ├── components/
│   │   ├── ui/                # Button, CustomCursor, ScrollProgressBar,
│   │   │                      # PageLoader, MouseGlow, FloatingBlobs,
│   │   │                      # ParticleBackground, LazyImage
│   │   ├── layout/            # Navbar, Footer, Layout
│   │   └── shared/            # AiAssistant, ErrorBoundary, SEOHead,
│   │                          # SectionWrapper, ThemeToggle
│   ├── context/               # ThemeContext
│   ├── data/                  # chatbot.json
│   ├── hooks/                 # useTheme, useScrollSpy, useInView,
│   │                          # useFocusTrap, useImageLazy, usePageLoader,
│   │                          # useMousePosition, useParallax, useChatbot
│   ├── lib/                   # utils.js (cn), seo.js, a11y.js
│   ├── pages/                 # Home.jsx, NotFound.jsx
│   ├── router/                # createBrowserRouter config
│   ├── sections/              # Hero, About, Skills, Projects, Experience,
│   │                          # CertificationsAchievements, Contact
│   └── styles/                # globals.css (CSS variables + animations)
├── .env.example               # Environment variable template
├── vercel.json                # Vercel deployment config
├── vite.config.js             # Build config (terser, chunks, sitemap)
├── tailwind.config.js         # Tailwind + CSS variable tokens
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### 1. Clone the repository
```bash
git clone https://github.com/vinaykumar/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your real values (see Environment Variables section)
```

### 4. Start development server
```bash
npm run dev
# → http://localhost:5173
```

### 5. Build for production
```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 🔧 Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
# Site identity
VITE_SITE_URL=https://vinaykumar.dev          # Your deployed URL (no trailing slash)
VITE_SITE_NAME=Vinay Kumar                     # Your name

# EmailJS (required for contact form)
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx        # From EmailJS dashboard
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx      # From EmailJS dashboard
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx       # From EmailJS Account > API Keys

# Assets (optional)
VITE_RESUME_URL=https://drive.google.com/...   # Direct download link to your PDF resume
VITE_PROFILE_IMAGE=https://...                 # URL to your profile photo

# Social (optional)
VITE_TWITTER_HANDLE=@vinaykumar                # Twitter/X handle for meta tags
VITE_GA_ID=G-XXXXXXXXXX                        # Google Analytics 4 ID (optional)
```

> ⚠️ **Never commit `.env` to Git.** Only `.env.example` should be in the repository.

---

## 📧 EmailJS Setup

See [`EMAILJS_SETUP.md`](./EMAILJS_SETUP.md) for the complete step-by-step guide.

**Quick summary:**
1. Create a free account at [emailjs.com](https://www.emailjs.com)
2. Add an **Email Service** (Gmail recommended)
3. Create an **Email Template** with these variables: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`, `{{to_name}}`
4. Copy Service ID, Template ID, and Public Key into your `.env`

---

## 📄 Resume Download

To enable the **Download Resume** button in the Hero section:

**Option A — Google Drive (recommended):**
1. Upload your PDF to Google Drive
2. Share → "Anyone with the link" → Copy link
3. Convert to direct download: replace `https://drive.google.com/file/d/FILE_ID/view` → `https://drive.google.com/uc?export=download&id=FILE_ID`
4. Set `VITE_RESUME_URL=https://drive.google.com/uc?export=download&id=YOUR_FILE_ID`

**Option B — Public folder:**
1. Place `resume.pdf` in `/public/`
2. Set `VITE_RESUME_URL=/resume.pdf`

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Option 1: Vercel CLI
npm install -g vercel
vercel --prod

# Option 2: GitHub integration (see DEPLOYMENT.md)
```

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for the complete deployment guide.

---

## 📦 NPM Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Production build (terser + chunk splitting) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | ESLint with jsx-a11y rules |
| `npm run analyze` | Bundle size visualizer |

---

## 🎨 Customisation Guide

### Update personal information
All personal data is co-located in each section file:

| What | File |
|---|---|
| Name, role, subtitle, social links | `src/sections/Hero.jsx` |
| Bio, stats, services | `src/sections/About.jsx` |
| Skill categories and percentages | `src/sections/Skills.jsx` |
| Projects (title, description, links) | `src/sections/Projects.jsx` |
| Education + work history | `src/sections/Experience.jsx` |
| Certifications + achievements | `src/sections/CertificationsAchievements.jsx` |
| Contact info, social links | `src/sections/Contact.jsx` |
| AI chatbot responses | `src/data/chatbot.json` |
| SEO title, description, OG | `src/lib/seo.js` + `src/pages/Home.jsx` |

### Change colour scheme
Edit CSS variables in `src/styles/globals.css`:
```css
:root {
  --primary: 239 84% 67%;   /* Change primary hue here (HSL) */
  --accent:  262 83% 68%;   /* Change accent hue here */
}
```

### Add profile photo
Set `VITE_PROFILE_IMAGE=https://your-photo-url.com/photo.jpg` in `.env`.
The Hero section automatically uses it if the env var is set.

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 5 | Build tool & dev server |
| Tailwind CSS | 3 | Utility-first styling |
| Framer Motion | 11 | Animations |
| React Router | 6 | Client-side routing |
| react-helmet-async | 2 | SEO meta management |
| @emailjs/browser | 4 | Contact form email service |
| react-icons | 5 | Brand icon library |
| lucide-react | 0.378 | UI icon library |
| class-variance-authority | 0.7 | Component variant system |
| clsx + tailwind-merge | — | Conditional class merging |

---

## ♿ Accessibility

- **WCAG 2.1 AA** target
- Skip-to-main-content link
- All interactive elements keyboard-navigable
- `aria-label`, `aria-current`, `aria-expanded` on nav
- `role="region"` on all section wrappers
- Focus trap in modals and chatbot
- `prefers-reduced-motion` respected across all animations
- Colour contrast ratios meet AA standard

---

## 📈 Performance

- **Lazy loading** — every section is a separate JS chunk
- **Vendor chunks** — React, Motion, Icons, EmailJS isolated for long-term caching
- **Content-hashed filenames** — immutable caching headers on assets
- **Terser minification** — `console.log` stripped in production
- **Canvas particles** — zero React re-renders (requestAnimationFrame only)
- **Mouse tracking** — `useMotionValue` — zero re-renders per mouse event
- **Images** — `loading="lazy"`, `decoding="async"`, explicit `width`/`height` (no CLS)

---

## 📝 License

MIT © 2024 Vinay Kumar

---

<div align="center">
Built with ❤️ using React 19, Vite, and Tailwind CSS
</div>
