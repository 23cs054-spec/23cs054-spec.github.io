# Hareram Kushwaha &mdash; Software Engineer Portfolio

A production-grade, zero-build, multi-page personal portfolio website for **Hareram Kushwaha**, B.E. Computer Science and Engineering student at KPR Institute of Engineering and Technology (KPRIET), Coimbatore.

- **Canonical Domain:** [https://hareramkushwaha.com.np](https://hareramkushwaha.com.np)
- **Deployment Platform:** GitHub Pages with a custom domain (zero build step)
- **Design System:** Deep navy palette (#0b1220), subtle teal-to-indigo gradient accents, modular CSS custom properties, and dark/light mode toggle with zero flash on load.
- **Accessibility & Performance:** WCAG 2.2 AA compliant, `@media (prefers-reduced-motion: reduce)` support, and optimized for sub-second Core Web Vitals.

---

## 1. Project Directory Architecture

```
hareram/
├── CNAME                                  # Custom apex domain (hareramkushwaha.com.np)
├── robots.txt                             # Web crawler instructions linking to sitemap.xml
├── sitemap.xml                            # Complete XML sitemap with all routes and priorities
├── site.webmanifest                       # Progressive Web App manifest
├── 404.html                               # Custom branded 404 page (noindex, follow)
├── index.html                             # Homepage: Hero, values, 3 featured projects, skills preview
├── about/
│   └── index.html                         # About: Background, education at KPRIET, timeline of learning
├── projects/
│   ├── index.html                         # Filterable project catalog (All, Full-Stack, Frontend, Systems)
│   ├── serenity-breathing/
│   │   └── index.html                     # Case study: React/TypeScript mindfulness PWA
│   ├── nexiserp/
│   │   └── index.html                     # Case study: PHP/MySQL multi-tenant SaaS ERP
│   ├── online-voting-system/
│   │   └── index.html                     # Case study: React, Vite, Node, Express, SQLite voting app
│   ├── os-project/
│   │   └── index.html                     # Case study: Python Tkinter OS virtual memory simulator
│   ├── skycast/
│   │   └── index.html                     # Case study: Vanilla JS weather forecast app (OpenWeatherMap)
│   └── cara/
│       └── index.html                     # Case study: Responsive multi-page e-commerce storefront
├── skills/
│   └── index.html                         # Categorized skills taxonomy (no percentage bars)
├── resume/
│   └── index.html                         # Semantic web resume with PDF download button
├── contact/
│   └── index.html                         # Contact channels, form with mailto fallback
├── css/
│   ├── variables.css                      # Design tokens, theme variables (dark/light), typography
│   ├── base.css                           # Modern CSS reset, body styles, technical grid background
│   ├── layout.css                         # Header, navigation, drawer, breadcrumbs, footer
│   ├── components.css                     # Buttons, spotlight cards, magnetic chips, forms
│   └── animations.css                     # Keyframes, reveals, reduced-motion overrides
├── js/
│   ├── theme.js                           # Dark/light theme engine with localStorage & system sync
│   ├── navigation.js                      # Mobile drawer, focus trapping, sticky header blur
│   ├── animations.js                      # IntersectionObserver scroll reveals, stat counters, spotlight
│   ├── typewriter.js                      # Hero typewriter cycling focus phrases
│   ├── project-filter.js                  # Interactive tag filter for /projects/ catalog
│   └── contact.js                         # Form validation, status messaging, mailto fallback
├── assets/
│   ├── favicon.svg                        # Scalable vector favicon
│   ├── apple-touch-icon.png               # 180x180 iOS touch icon
│   ├── icon-192.png                       # 192x192 PWA icon
│   ├── icon-512.png                       # 512x512 PWA icon
│   ├── og-image.png                       # 1200x630 Open Graph & Twitter share preview
│   ├── resume.pdf                         # Formatted PDF resume download
│   └── projects/
│       ├── serenity-breathing.webp        # Preview mockup for Serenity Breathing
│       ├── nexiserp.webp                  # Preview mockup for NexisERP
│       ├── online-voting-system.webp      # Preview mockup for Online Voting System
│       ├── os-project.webp                # Preview mockup for OS-Project
│       ├── skycast.webp                   # Preview mockup for SkyCast
│       └── cara.webp                      # Preview mockup for Cara
└── README.md                              # Documentation, deployment guide, and QA checklist
```

---

## 2. Local Preview

Because this is a pure static website with no build dependencies, you can preview it immediately using any local HTTP server:

```bash
# Using Python 3 (recommended)
python3 -m http.server 8080

# Or using Node.js npx serve
npx serve .
```

Open `http://localhost:8080` in your web browser.

---

## 3. GitHub Pages Deployment with Custom Domain

### Step 1: Commit and Push
```bash
git add .
git commit -m "feat: complete production portfolio for Hareram Kushwaha"
git branch -M main
git remote add origin https://github.com/ha-re-ram/ha-re-ram.github.io.git  # or your repo
git push -u origin main
```

### Step 2: Configure GitHub Pages
1. Go to your repository on GitHub: **Settings** &rarr; **Pages**.
2. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `main` / `/ (root)`
   - Click **Save**.
3. Under **Custom domain**, enter `hareramkushwaha.com.np`.
4. Ensure **Enforce HTTPS** is checked.

### Step 3: DNS Records (Domain Registrar)
Ensure the following DNS records are set at your registrar for `hareramkushwaha.com.np`:
- **CNAME:** `@` or `www` pointing to `ha-re-ram.github.io`
- Or **A Records** pointing to GitHub Pages IP addresses:
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```

---

## 4. How to Update Content

- **Adding / Updating Projects:**
  1. Add or duplicate a case study directory under `/projects/<slug>/index.html`.
  2. Add the corresponding card into `/projects/index.html`.
  3. Update `sitemap.xml` with the new route.
- **Updating Skills:**
  1. Edit `<div class="skill-chip">` entries in `/skills/index.html`.
- **Replacing Resume PDF:**
  1. Replace `assets/resume.pdf` with your updated resume export.
- **Connecting Contact Form Endpoint (Optional):**
  1. If you wish to use an automated form backend service (such as [Formspree](https://formspree.io), Basin, or Web3Forms), replace `[OPTIONAL_FORM_ENDPOINT_PLACEHOLDER]` in the `action` attribute of `<form>` in `contact/index.html`. Otherwise, the built-in mailto fallback opens your email client directly.

---

## 5. How to Run Lighthouse

1. Open Google Chrome in an **Incognito Window** (to prevent extensions from interfering with metrics).
2. Open Chrome DevTools (`F12` or `Ctrl+Shift+I`) and navigate to the **Lighthouse** tab.
3. Select **Mode:** Navigation, **Device:** Mobile, and check all categories (Performance, Accessibility, Best Practices, SEO).
4. Click **Analyze page load**.
5. Repeat for desktop to verify both viewports achieve 95+ scores.

---

## 6. 15-Minute QA Checklist for the Owner

| Step | Verification Task | How to Test | Expected Result |
| :---: | :--- | :--- | :--- |
| **1** | Local Boot | Run `python3 -m http.server 8080` | Site loads smoothly at `http://localhost:8080` without console errors |
| **2** | Theme Switcher | Click the Sun/Moon icon in header | Page toggles between dark (#0b1220) and light (#f8fafc) mode; persists across page reloads |
| **3** | Reduced Motion | Enable `prefers-reduced-motion: reduce` in DevTools | Animations stop, cards remain immediately visible, typewriter remains stationary |
| **4** | Mobile Viewport | Inspect at 375px width (iPhone SE) | Zero horizontal overflow; touch targets $\ge$ 44px; hamburger navigation opens and traps focus |
| **5** | Project Filtering | Click categories on `/projects/` | Filter buttons smoothly isolate Full-Stack, Frontend, and Systems cards |
| **6** | Case Study Navigation | Click through each of the 6 projects | Problem, stack, features, decisions, and GitHub links display accurately |
| **7** | Resume Download | Click "Download Resume PDF" on `/resume/` | `Hareram_Kushwaha_Resume.pdf` downloads and opens properly |
| **8** | Contact Action | Submit form on `/contact/` | Triggers pre-filled email client fallback with recipient set to `hareramkushwaha054@gmail.com` |
| **9** | 404 Route | Navigate to `/non-existent-page/` | Branded 404 page renders with working recovery buttons to Home and Projects |
| **10** | SEO & Structured Data | Paste URL/HTML into [Google Rich Results Test](https://search.google.com/test/rich-results) | Valid `Person`, `WebSite`, `SoftwareSourceCode`, and `BreadcrumbList` schemas |

---

## 7. Items the Owner Must Verify / Supply Before Final Publishing

1. **[CONFIRM] Online Voting System Stack:** Verify that your repository `github.com/ha-re-ram/online-voting-system` is using the React + Vite frontend and Node.js + Express + SQLite backend. (The case study accurately reflects this architecture).
2. **Project Screenshots:** Replace placeholder WebP files in `assets/projects/` (`serenity-breathing.webp`, `nexiserp.webp`, `online-voting-system.webp`, `os-project.webp`, `skycast.webp`, `cara.webp`) with actual UI screenshots of your applications.
3. **Resume PDF:** Place your formal, customized resume PDF at `assets/resume.pdf`.
4. **Social Sharing Preview:** Update `assets/og-image.png` (1200×630px) with your preferred personal or banner photo for social media links.
5. **Favicon Assets:** Update `assets/favicon.svg` and `assets/apple-touch-icon.png` if you have a custom personal logo.
