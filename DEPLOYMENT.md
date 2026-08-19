# Deployment Guide

Complete guide for deploying the Vinay Kumar portfolio to production.

---

## Option 1 — Vercel (Recommended)

Vercel is the recommended platform — it auto-detects Vite, handles SPA routing, and deploys on every Git push.

### A. Deploy via GitHub (Zero-config CI/CD)

**Step 1 — Push to GitHub**
```bash
# Initialise git (if not already done)
git init
git add .
git commit -m "feat: initial portfolio build"

# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

**Step 2 — Connect to Vercel**
1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Click **Import Git Repository** → select your `portfolio` repo
3. Vercel auto-detects **Vite** framework
4. Build settings are read from `vercel.json` automatically

**Step 3 — Add Environment Variables**

In the Vercel project dashboard → **Settings → Environment Variables**, add:

| Variable | Value | Environment |
|---|---|---|
| `VITE_SITE_URL` | `https://your-domain.vercel.app` | Production |
| `VITE_SITE_NAME` | `Vinay Kumar` | All |
| `VITE_EMAILJS_SERVICE_ID` | `service_xxxxxxx` | All |
| `VITE_EMAILJS_TEMPLATE_ID` | `template_xxxxxxx` | All |
| `VITE_EMAILJS_PUBLIC_KEY` | `xxxxxxxxxxxxxxxx` | All |
| `VITE_RESUME_URL` | `https://drive.google.com/uc?...` | All |
| `VITE_PROFILE_IMAGE` | `https://your-image-url.com/photo.jpg` | All |
| `VITE_TWITTER_HANDLE` | `@vinaykumar` | All |

> ⚠️ All `VITE_*` variables are baked into the client bundle at build time. Do NOT store secrets here — only public, non-sensitive values.

**Step 4 — Deploy**
Click **Deploy**. Vercel runs `npm run build` and deploys `dist/`.

**Step 5 — Custom Domain (optional)**
1. Vercel Dashboard → **Domains** → Add your domain
2. Update your DNS registrar with the CNAME/A records Vercel provides
3. Update `VITE_SITE_URL` in Vercel env vars to your custom domain

---

### B. Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login
vercel login

# Deploy (first time — follow prompts)
vercel

# Deploy to production
vercel --prod
```

---

## Option 2 — GitHub Pages

GitHub Pages requires a `base` URL and hash routing, or a custom 404 redirect trick.

**Step 1 — Update vite.config.js**
```js
// Change base to your repo name
base: '/portfolio/',   // or '/' if using a custom domain
```

**Step 2 — Add SPA redirect in public/404.html**
```html
<!-- public/404.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script>
    sessionStorage.redirect = location.href;
  </script>
  <meta http-equiv="refresh" content="0;URL='/'">
</head>
</html>
```

**Step 3 — Install gh-pages**
```bash
npm install --save-dev gh-pages
```

**Step 4 — Add deploy script to package.json**
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

**Step 5 — Deploy**
```bash
npm run deploy
```

---

## Option 3 — Netlify

**Step 1 — Create `netlify.toml`** in the root:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to   = "/index.html"
  status = 200
```

**Step 2 — Deploy**
1. [netlify.com](https://netlify.com) → New Site from Git
2. Connect GitHub repo
3. Build command: `npm run build` | Publish: `dist`
4. Add environment variables in Site Settings → Environment

---

## Post-Deployment Checklist

- [ ] Visit deployed URL and verify all sections render
- [ ] Test dark/light theme toggle
- [ ] Test contact form end-to-end (EmailJS)
- [ ] Test all navigation links and smooth scroll
- [ ] Test AI chatbot responses
- [ ] Test on mobile (iOS Safari + Android Chrome)
- [ ] Run Lighthouse audit → target 95+ all categories
- [ ] Verify OG image renders in [OpenGraph.xyz](https://www.opengraph.xyz)
- [ ] Verify Twitter Card in [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Verify sitemap at `/sitemap.xml`
- [ ] Verify robots.txt at `/robots.txt`
- [ ] Test keyboard navigation (Tab through all interactive elements)
- [ ] Verify 404 page at `/anything-invalid`

---

## Update Deployment (after changes)

```bash
# Make changes → commit → push
git add .
git commit -m "feat: update projects section"
git push

# Vercel auto-deploys on push to main branch
# For manual re-deploy:
vercel --prod
```

---

## Rollback

In the Vercel Dashboard → **Deployments** → find a previous successful deployment → **Promote to Production**.
