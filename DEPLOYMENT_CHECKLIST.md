# Production Deployment Checklist

Use this checklist before every production deployment.

---

## 🔑 Environment Variables

- [ ] `.env` file exists locally (copied from `.env.example`)
- [ ] `VITE_SITE_URL` set to the final deployed domain (no trailing slash)
- [ ] `VITE_SITE_NAME` set to `Vinay Kumar`
- [ ] `VITE_EMAILJS_SERVICE_ID` filled in (from EmailJS dashboard)
- [ ] `VITE_EMAILJS_TEMPLATE_ID` filled in (from EmailJS dashboard)
- [ ] `VITE_EMAILJS_PUBLIC_KEY` filled in (from EmailJS Account > API Keys)
- [ ] `VITE_RESUME_URL` set to a working direct-download PDF link
- [ ] `VITE_PROFILE_IMAGE` set to a publicly accessible photo URL
- [ ] All variables added to Vercel project → Settings → Environment Variables

---

## 📁 Content & Assets

- [ ] Profile photo URL is working and loads fast
- [ ] Resume PDF is accessible and downloads correctly
- [ ] All project GitHub links replaced with real repo URLs (or remain `#`)
- [ ] All project Live Demo links replaced with real URLs (or remain `#`)
- [ ] Contact info (phone, email, LinkedIn) updated in `src/sections/Contact.jsx`
- [ ] Social links (GitHub, LinkedIn, Twitter) updated with real URLs
- [ ] Footer social links updated in `src/components/layout/Footer.jsx`
- [ ] Hero social links updated in `src/sections/Hero.jsx`
- [ ] Bio text reviewed and finalised in `src/sections/About.jsx`
- [ ] Certifications credential IDs and verify URLs updated
- [ ] SEO title/description reviewed in `src/pages/Home.jsx` and `src/lib/seo.js`
- [ ] `og-image.png` and `twitter-card.png` replaced with real screenshots in `public/`
- [ ] `VITE_SITE_URL` in `public/robots.txt` is correct

---

## 🤖 AI Chatbot

- [ ] Contact email in `src/data/chatbot.json` (contact intent) updated
- [ ] GitHub and LinkedIn URLs in chatbot responses updated
- [ ] Chatbot responses reviewed for accuracy

---

## 🔨 Build Verification

```bash
npm run build
```

- [ ] Build completes without errors (`✓ N modules transformed`)
- [ ] No TypeScript or import errors in console
- [ ] Bundle sizes are reasonable (main chunks < 250 kB gzipped each)
- [ ] `dist/` folder exists with correct structure

```bash
npm run preview
```

- [ ] Preview server starts on `http://localhost:4173`
- [ ] All sections visible and animated
- [ ] Dark/light theme toggle works
- [ ] No console errors in browser DevTools

---

## 🌐 Deployment

- [ ] Git repository is initialised and all files committed
- [ ] `.env` is listed in `.gitignore` (not committed!)
- [ ] `node_modules/` is listed in `.gitignore`
- [ ] Latest commit pushed to `main` branch
- [ ] Vercel project connected to GitHub repository
- [ ] Vercel deployment succeeded (green checkmark)
- [ ] Production URL loads correctly

---

## 🧪 Post-Deployment Testing

### Functionality
- [ ] Home page loads without white flash (page loader shows "VK")
- [ ] All 7 sections are visible and scroll correctly
- [ ] Smooth scroll via Navbar links works on all sections
- [ ] Dark/light theme toggle persists on refresh
- [ ] Contact form submits and shows success animation
- [ ] Contact form validation shows inline errors correctly
- [ ] Download Resume button triggers PDF download
- [ ] GitHub / LinkedIn / social links open in new tab
- [ ] Project cards open the detail modal
- [ ] Project filter tabs animate correctly
- [ ] AI chatbot opens, accepts text input, and responds correctly
- [ ] All quick question chips produce correct chatbot responses
- [ ] Scroll progress bar tracks page position
- [ ] Custom cursor visible on desktop mouse (not touch)
- [ ] 404 page renders at any invalid URL

### Responsive Layout
- [ ] Mobile (375px width) — all sections stacked correctly
- [ ] Tablet (768px) — two-column layouts engage
- [ ] Desktop (1280px+) — full layout with floating icons visible
- [ ] Navbar hamburger menu opens/closes on mobile
- [ ] Chatbot window fits mobile screen without overflow

### Performance (Lighthouse)
- [ ] Run Lighthouse in Chrome DevTools → Incognito window → Production URL
- [ ] Performance score ≥ 90
- [ ] Accessibility score ≥ 95
- [ ] Best Practices score ≥ 95
- [ ] SEO score = 100

### SEO & Meta
- [ ] `<title>` tag visible in browser tab
- [ ] Open Graph preview at [opengraph.xyz](https://www.opengraph.xyz)
- [ ] Twitter Card at [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)
- [ ] Sitemap accessible at `https://your-domain.com/sitemap.xml`
- [ ] robots.txt accessible at `https://your-domain.com/robots.txt`
- [ ] JSON-LD schema visible in page source

### Accessibility
- [ ] Tab key navigates all interactive elements in logical order
- [ ] Skip to main content link appears on first Tab press
- [ ] All modals trap focus correctly (Escape closes them)
- [ ] Screen reader announces dynamic changes (chatbot messages, form errors)
- [ ] No ARIA errors in browser accessibility tree

---

## 🚀 Go-Live Confirmation

- [ ] All checklist items above are checked
- [ ] Final URL shared and verified on multiple devices
- [ ] DNS propagation complete (for custom domains)

---

*Last updated: {{ deployment date }}*
