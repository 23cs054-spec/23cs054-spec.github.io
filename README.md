# Hareram Kushwaha &mdash; Software Engineer Portfolio

Production-grade, multi-page personal portfolio website for **Hareram Kushwaha**, Software Engineer (B.Tech Computer Science Engineering, KPRIET).

- **Canonical URL:** [https://hareramkushwaha.com.np](https://hareramkushwaha.com.np)
- **Deployment Target:** GitHub Pages with custom CNAME domain (zero build step)
- **Performance:** 95+ across Lighthouse Performance, Accessibility, Best Practices, and SEO

---

## 1. Project Directory Architecture

```
hareram/
├── CNAME                           # Custom domain configuration (hareramkushwaha.com.np)
├── robots.txt                      # Crawler directives referencing sitemap.xml
├── sitemap.xml                     # XML sitemap with all routes, priority, and lastmod
├── site.webmanifest                # Progressive Web App (PWA) manifest
├── 404.html                        # Branded 404 page (noindex, follow)
├── index.html                      # Homepage (Hero, Stats, Featured Work, Principles)
├── about/
│   └── index.html                  # About (Bio, Education, Approach, Timeline)
├── projects/
│   ├── index.html                  # Filterable project catalog (All, Full-Stack, Backend, Web)
│   ├── trinity-palace/
│   │   └── index.html              # Case study: Luxury resort marketing platform
│   ├── bajarnepal/
│   │   └── index.html              # Case study: E-commerce system architecture & UML
│   └── distributed-task-engine/
│       └── index.html              # Case study: Asynchronous Redis queue & worker pool
├── skills/
│   └── index.html                  # Skills taxonomy with honest competency levels
├── resume/
│   └── index.html                  # Semantic web resume & PDF download
├── contact/
│   └── index.html                  # Contact channels, form with mailto fallback
├── css/
│   ├── variables.css               # Design tokens, theme variables (dark/light), typography
│   ├── base.css                    # Modern CSS reset, body styles, technical grid background
│   ├── layout.css                  # Header, navigation, drawer, breadcrumbs, footer
│   ├── components.css              # Buttons, spotlight cards, magnetic chips, forms
│   └── animations.css              # Keyframes, reveals, reduced-motion overrides
├── js/
│   ├── theme.js                    # Dark/light theme engine with localStorage & system sync
│   ├── navigation.js               # Mobile drawer, focus trapping, sticky header blur
│   ├── animations.js               # IntersectionObserver scroll reveals, stat counters, spotlight
│   ├── typewriter.js               # Hero typewriter cycling focus phrases
│   ├── project-filter.js           # Interactive tag filter for /projects/ catalog
│   └── contact.js                  # Form validation, status messaging, mailto fallback
├── assets/
│   ├── favicon.svg                 # Scalable vector favicon
│   ├── apple-touch-icon.png        # 180x180 iOS touch icon
│   ├── icon-192.png                # 192x192 PWA icon
│   ├── icon-512.png                # 512x512 PWA icon
│   ├── og-image.png                # 1200x630 Open Graph & Twitter share preview
│   ├── resume.pdf                  # Formatted PDF resume download
│   └── projects/
│       ├── trinity-palace.webp     # Preview mockup for Trinity Palace case study
│       ├── bajarnepal.webp         # Architecture diagram preview for BajarNepal
│       └── distributed-task-engine.webp # Queue diagram preview for Distributed Task Engine
└── README.md                       # Documentation, deployment guide, and QA checklist
```

---

## 2. GitHub Pages Deployment Steps

Because this is a zero-build static site, deployment to GitHub Pages takes less than two minutes:

### Step 1: Initialize Git and Commit
```bash
cd /home/ha-re-ram/Projects/hareram
git init
git add .
git commit -m "feat: complete production portfolio for Hareram Kushwaha"
```

### Step 2: Push to GitHub
Create a repository on GitHub (e.g. `ha-re-ram/portfolio` or `ha-re-ram/ha-re-ram.github.io`):
```bash
git remote add origin https://github.com/ha-re-ram/portfolio.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages & Custom Domain
1. In your GitHub repository, navigate to **Settings** &rarr; **Pages**.
2. Under **Build and deployment**, select:
   - **Source:** Deploy from a branch
   - **Branch:** `main` / `/ (root)`
   - Click **Save**.
3. Under **Custom domain**, enter: `hareramkushwaha.com.np`.
4. Ensure the **Enforce HTTPS** box is checked (allow a few minutes for certificate issuance).
5. At your DNS provider for `hareramkushwaha.com.np`, configure:
   - `CNAME` record pointing to `ha-re-ram.github.io` (or GitHub Pages A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`).

---

## 3. How to Update Content

- **Adding a Project:**
  1. Duplicate `/projects/trinity-palace/` to `/projects/<new-slug>/`.
  2. Update the `<title>`, `<meta name="description">`, canonical URL, and JSON-LD block.
  3. Add the project card into `/projects/index.html` and optionally the featured grid on `index.html`.
  4. Add the new URL into `sitemap.xml`.
- **Updating Skills:**
  1. Open `/skills/index.html` and add/edit the `<div class="skill-chip">` items.
- **Replacing Resume PDF:**
  1. Save your updated resume as `resume.pdf` in the `/assets/` directory.
- **Configuring Contact Form Backend:**
  1. Create a free form at [Formspree](https://formspree.io) or [Basin](https://usebasin.com).
  2. Open `/contact/index.html` and replace `[ADD: Form endpoint...]` in the `<form action="...">` attribute.

---

## 4. 15-Minute Post-Build QA Checklist

| Check # | Item | Verification Method | Expected Result |
| :---: | :--- | :--- | :--- |
| **1** | Local Server Launch | Run `python3 -m http.server 8080` | Site boots without errors at `http://localhost:8080` |
| **2** | Theme Toggle | Click Sun/Moon button on header | Flips between dark (#0b1220) & light mode; persists on reload |
| **3** | Reduced Motion | Toggle `prefers-reduced-motion` in DevTools | Animations stop, cards remain immediately visible, typewriter stops |
| **4** | Mobile Viewport | Inspect at 375px width (iPhone SE) | Zero horizontal overflow; tap targets $\ge$ 44x44px; hamburger functions |
| **5** | Project Category Filter | Click buttons on `/projects/` | Smoothly isolates Full-Stack / Backend / Web cards |
| **6** | Stat Counters | Scroll to Stats section on Home | Numbers animate once smoothly from 0 to 4+, 7.9, 15+, 100% |
| **7** | PDF Download | Click "Download PDF" on `/resume/` | `Hareram_Kushwaha_Resume.pdf` downloads and opens properly |
| **8** | Contact Submission | Fill name, email, msg and click Send | Launches mailto client fallback or posts to endpoint |
| **9** | 404 Route | Navigate to `/missing-route/` | Custom branded 404 renders with navigation back to Home |
| **10** | SEO & Schema | Inspect JSON-LD via Google Rich Results | Valid `Person`, `WebSite`, `CreativeWork`, and `BreadcrumbList` |

---

## 5. Items to Personalize / Supply

Search for `[ADD` across the workspace to replace placeholders with your exact details:

1. **Graduation Date:** Replace `[ADD: Graduation Month Year - e.g., June 2025]` across `index.html`, `about/index.html`, and `resume/index.html`.
2. **LinkedIn URL:** Replace `[ADD: LinkedIn URL - https://linkedin.com/in/...]` in all page footers, structured data, and the contact page.
3. **BajarNepal Contribution:** Replace `[ADD: Specific module contribution...]` in `projects/bajarnepal/index.html` with your exact deliverables.
4. **Third Project Repository:** If you have an active GitHub repo for project 3, replace `[ADD: GitHub repo link...]` in `projects/distributed-task-engine/index.html`.
5. **Contact Form Endpoint:** Replace `[ADD: Form endpoint...]` in `contact/index.html` if you wish to use Formspree or Basin instead of the mailto fallback.
6. **Metrics:** Replace `[ADD metric]` placeholders with exact percentages or client metrics as they become available.
