/**
 * Hareram Kushwaha Portfolio - Live GitHub Repositories Explorer
 * Automatically renders 40+ public repositories with search, category filtering,
 * live GitHub API sync, and zero-latency cached fallback.
 */

(function () {
  'use strict';

  const CACHED_REPOS = [
  {
    "name": "Saantvana",
    "description": "Saantvana (\u0938\u093e\u0902\u0924\u094d\u0935\u0928\u093e) \u2014 Feel Closer A calm, consent-led connection and wellbeing web application designed to foster emotional presence without pressure.",
    "language": "JavaScript",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/Saantvana",
    "homepage": "https://hareramkushwaha.com.np/Saantvana/",
    "updated_at": "2026-11-22"
  },
  {
    "name": "AARAMBH",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "JavaScript",
    "stars": 1,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/AARAMBH",
    "homepage": "http://hareramkushwaha.com.np/AARAMBH/",
    "updated_at": "2026-11-15"
  },
  {
    "name": "Serenity-Breathing",
    "description": "\"Serenity Breathing is a premium React-powered mindfulness app featuring scientifically-backed breathing exercises, a supportive BMI tracker, and advanced mood insights. Fully optimized for PWA and high-performance mobile UX.\"",
    "language": "TypeScript",
    "stars": 1,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/Serenity-Breathing",
    "homepage": "https://serenity.hareramkushwaha.com.np/",
    "updated_at": "2026-11-15"
  },
  {
    "name": "ha-re-ram.github.io",
    "description": "Hareram Kushwaha | Software Engineer Portfolio",
    "language": "TypeScript",
    "stars": 1,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/ha-re-ram.github.io",
    "homepage": "https://hareramkushwaha.com.np/",
    "updated_at": "2026-11-11"
  },
  {
    "name": "erp_saas",
    "description": "\ud83d\ude80 NexisERP: A premium, high-performance Multi-Tenant E-Commerce & ERP SaaS platform. Features a stunning dark glassmorphic UI, dynamic Chart.js business analytics, secure single-page transactions, and robust inventory/order fulfillment CRUD controllers. Powered by PHP 8+ and MySQL.",
    "language": "PHP",
    "stars": 3,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/erp_saas",
    "homepage": "http://hareramkushwah.infinityfree.io/",
    "updated_at": "2026-11-09"
  },
  {
    "name": "Aurelia-Palace-",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "HTML",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/Aurelia-Palace-",
    "homepage": "https://hareramkushwaha.com.np/Aurelia-Palace-/",
    "updated_at": "2026-10-15"
  },
  {
    "name": "OS-Project",
    "description": "\ud83d\udc27 OS-Pro: High-end Operating Systems simulator suite. Includes Virtual Memory visualization (FIFO, LRU, Optimal, MRU) and a custom Block-Based File System implementations with Tkinter GUI. \ud83d\ude80",
    "language": "Python",
    "stars": 17,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/OS-Project",
    "homepage": "",
    "updated_at": "2026-10-11"
  },
  {
    "name": "AI-chatbot-web",
    "description": "Interactive AI chatbot web app using HTML, CSS, JS, and PHP",
    "language": "PHP",
    "stars": 1,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/AI-chatbot-web",
    "homepage": "",
    "updated_at": "2026-09-06"
  },
  {
    "name": "Habit-Forge",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "JavaScript",
    "stars": 1,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/Habit-Forge",
    "homepage": "",
    "updated_at": "2026-09-06"
  },
  {
    "name": "Console-project-java",
    "description": "A robust collection of monolith Java console applications (Library, Supermarket, Vehicle Rental) demonstrating Object-Oriented Programming (OOP) and Clean Architecture.",
    "language": "Java",
    "stars": 1,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/Console-project-java",
    "homepage": "",
    "updated_at": "2026-09-06"
  },
  {
    "name": "AIML-Lab",
    "description": "\ud83e\udde0 A comprehensive collection of Artificial Intelligence and Machine Learning lab experiments implemented in Python. Covering Data Analysis, Search Algorithms, Regression, Classification, PCA, and Clustering. \ud83d\udcbb",
    "language": "Jupyter Notebook",
    "stars": 1,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/AIML-Lab",
    "homepage": "",
    "updated_at": "2026-09-06"
  },
  {
    "name": "OS-Lab",
    "description": "\ud83d\udc27 A complete Operating Systems Lab manual with C implementations for Scheduling, System Calls, IPC, Deadlock Avoidance, and Memory Management. POSIX compliant. \ud83d\udcbb",
    "language": "C",
    "stars": 1,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/OS-Lab",
    "homepage": "",
    "updated_at": "2026-09-06"
  },
  {
    "name": "SkyCast",
    "description": "\ud83c\udf24\ufe0f SkyCast: A professional, high-performance weather app with 5-day forecasts, dynamic glassmorphism UI, and real-time atmospheric data. Built with Vanilla JS & OpenWeatherMap API.",
    "language": "CSS",
    "stars": 1,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/SkyCast",
    "homepage": "https://hareramkushwaha.com.np/SkyCast/",
    "updated_at": "2026-09-06"
  },
  {
    "name": "Cara",
    "description": "\ud83d\udecd\ufe0f Cara | A premium, fully responsive modern E-commerce storefront built with HTML5, CSS3, and JavaScript. \ud83d\ude80 Optimized for SEO, Accessibility (a11y), and performance with a sleek \"Outfit\" typography and glassmorphism design.",
    "language": "HTML",
    "stars": 1,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/Cara",
    "homepage": "https://hareramkushwaha.com.np/Cara/",
    "updated_at": "2026-09-06"
  },
  {
    "name": "sws-ai-assessment",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "JavaScript",
    "stars": 1,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/sws-ai-assessment",
    "homepage": "",
    "updated_at": "2026-09-06"
  },
  {
    "name": "OOSE-Lab-UML-Diagram",
    "description": "Interactive UML Diagram Hub for 18 enterprise-grade systems designed via Mermaid.js",
    "language": "HTML",
    "stars": 1,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/OOSE-Lab-UML-Diagram",
    "homepage": "https://hareramkushwaha.com.np/OOSE-Lab-UML-Diagram/",
    "updated_at": "2026-09-06"
  },
  {
    "name": "online-voting-system",
    "description": "\ud83d\uddf3\ufe0f A secure, anonymous, and double-voting protected Online Voting System built with React, Vite, Node.js, Express, and SQLite. Features real-time aggregated results and a premium admin control panel.",
    "language": "JavaScript",
    "stars": 1,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/online-voting-system",
    "homepage": "https://vote.hareramkushwaha.com.np",
    "updated_at": "2026-09-06"
  },
  {
    "name": "kotodama-website",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "HTML",
    "stars": 1,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/kotodama-website",
    "homepage": "http://hareramkushwaha.com.np/kotodama-website/",
    "updated_at": "2026-09-06"
  },
  {
    "name": "fedora-wifi-hotspot",
    "description": "fedora-wifi-hotspot empowers your Fedora system to share its existing Wi-Fi or Ethernet internet connection through a software access point (hotspot) using your wireless adapter.  With the brand-new Native GNOME GUI, managing your hotspot has never been easier or more beautiful!",
    "language": "Shell",
    "stars": 2,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/fedora-wifi-hotspot",
    "homepage": "https://hareramkushwaha.com.np/fedora-wifi-hotspot/",
    "updated_at": "2026-09-06"
  },
  {
    "name": "work",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "HTML",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/work",
    "homepage": "",
    "updated_at": "2026-02-12"
  },
  {
    "name": "PersonalCloudStorage",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "JavaScript",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/PersonalCloudStorage",
    "homepage": "",
    "updated_at": "2026-02-12"
  },
  {
    "name": "Game",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "JavaScript",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/Game",
    "homepage": "",
    "updated_at": "2026-02-12"
  },
  {
    "name": "HTML-Babar",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "HTML",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/HTML-Babar",
    "homepage": "",
    "updated_at": "2026-02-12"
  },
  {
    "name": "Styling-CSS--ApnaSchool",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "HTML",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/Styling-CSS--ApnaSchool",
    "homepage": "",
    "updated_at": "2026-02-12"
  },
  {
    "name": "Web-Development-Lab",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "HTML",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/Web-Development-Lab",
    "homepage": "",
    "updated_at": "2026-02-12"
  },
  {
    "name": "DSA-Codetantra",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "Java",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/DSA-Codetantra",
    "homepage": "",
    "updated_at": "2026-02-12"
  },
  {
    "name": "DSA_learn_jetbrains",
    "description": "Jet Brains learn DSA ",
    "language": "Java",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/DSA_learn_jetbrains",
    "homepage": "",
    "updated_at": "2026-02-12"
  },
  {
    "name": "portfolio",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "HTML",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/portfolio",
    "homepage": "https://ha-re-ram.github.io/portfolio/",
    "updated_at": "2026-02-10"
  },
  {
    "name": "Welcome-to-Open-Source",
    "description": "Make your first PR request! And enter the world of Open Source Contributions \ud83c\udf49",
    "language": "Code",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/Welcome-to-Open-Source",
    "homepage": "https://youtube.com/AliSolanki",
    "updated_at": "2025-10-08"
  },
  {
    "name": "hacktoberfest",
    "description": "Making my Pull Request on Hacktoberfest 2025. Don't forget to spread love and if you like give us a \u2b50\ufe0f",
    "language": "Java",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/hacktoberfest",
    "homepage": "https://fineanmol.github.io/hacktoberfest/",
    "updated_at": "2025-10-08"
  },
  {
    "name": "swot",
    "description": "Identify email addresses or domains names that belong to colleges or universities. Help automate the process of approving or rejecting academic discounts.",
    "language": "Kotlin",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/swot",
    "homepage": "",
    "updated_at": "2025-09-21"
  },
  {
    "name": "BMI-Calculator",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "HTML",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/BMI-Calculator",
    "homepage": "https://ha-re-ram.github.io/BMI-Calculator/",
    "updated_at": "2025-08-05"
  },
  {
    "name": "Mother-s-Day-Project",
    "description": "This project is created in celebration of Mother's Day on 27th April 2025, a special occasion to honor and appreciate the unwavering love, care, and sacrifices made by mothers",
    "language": "HTML",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/Mother-s-Day-Project",
    "homepage": "https://motherday-project.netlify.app/",
    "updated_at": "2025-04-27"
  },
  {
    "name": "stylish-login-pages",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "JavaScript",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/stylish-login-pages",
    "homepage": "https://ha-re-ram.github.io/stylish-login-pages/",
    "updated_at": "2025-04-17"
  },
  {
    "name": "Insight-Vista-Dasboard",
    "description": "A sales dashboard with graphs, filters, and revenue insights.",
    "language": "CSS",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/Insight-Vista-Dasboard",
    "homepage": "https://ha-re-ram.github.io/Insight-Vista-Dasboard/",
    "updated_at": "2025-04-16"
  },
  {
    "name": "fly",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "JavaScript",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/fly",
    "homepage": "",
    "updated_at": "2025-02-21"
  },
  {
    "name": "render",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "JavaScript",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/render",
    "homepage": "",
    "updated_at": "2025-02-21"
  },
  {
    "name": "railway",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "JavaScript",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/railway",
    "homepage": "",
    "updated_at": "2025-02-20"
  },
  {
    "name": "basic-calculator",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "HTML",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/basic-calculator",
    "homepage": "https://ha-re-ram.github.io/basic-calculator/",
    "updated_at": "2024-11-12"
  },
  {
    "name": "python-project",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "Python",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/python-project",
    "homepage": "",
    "updated_at": "2024-11-12"
  },
  {
    "name": "Dipawali-celebration-2024",
    "description": "Open source software repository by Hareram Kushwaha.",
    "language": "CSS",
    "stars": 0,
    "forks": 0,
    "url": "https://github.com/ha-re-ram/Dipawali-celebration-2024",
    "homepage": "https://ha-re-ram.github.io/Dipawali-celebration-2024/",
    "updated_at": "2024-11-12"
  }
];

  const LANG_COLORS = {
    'JavaScript': '#f7df1e',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'PHP': '#4F5D95',
    'C': '#555555',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Jupyter Notebook': '#DA5B0B',
    'Kotlin': '#A97BFF',
    'Shell': '#89e051',
    'Code': '#14b8a6'
  };

  let allRepos = [...CACHED_REPOS].sort((a, b) => (b.stars || 0) - (a.stars || 0));
  let currentCategory = 'all';
  let searchQuery = '';
  let isExpanded = false;

  function getCategory(repo) {
    const lang = (repo.language || '').toLowerCase();
    const name = repo.name.toLowerCase();
    const desc = (repo.description || '').toLowerCase();

    if (lang === 'python' || desc.includes('machine learning') || desc.includes('aiml') || desc.includes('ai') || lang === 'jupyter notebook') {
      return 'ai-ml';
    }
    if (lang === 'java' || lang === 'c' || desc.includes('operating systems') || desc.includes('kernel') || name.includes('os-') || name.includes('oose')) {
      return 'systems';
    }
    if (lang === 'typescript' || lang === 'javascript' || lang === 'php' || lang === 'html' || desc.includes('react') || desc.includes('pwa') || desc.includes('saas') || desc.includes('web')) {
      return 'web';
    }
    return 'other';
  }

  function renderRepoCard(repo) {
    const langColor = LANG_COLORS[repo.language] || '#14b8a6';
    const hasHomepage = repo.homepage && repo.homepage.startsWith('http');

    return '<article class="repo-card" data-category="' + getCategory(repo) + '">' +
      '<div class="repo-card-header">' +
        '<div class="repo-card-title-wrap">' +
          '<svg class="repo-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
            '<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>' +
          '</svg>' +
          '<h3 class="repo-title">' +
            '<a href="' + repo.url + '" target="_blank" rel="noopener noreferrer" class="repo-title-link">' +
              repo.name +
            '</a>' +
          '</h3>' +
        '</div>' +
        (repo.stars > 0 ? '<span class="repo-stars-badge" title="' + repo.stars + ' GitHub Stars"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> ' + repo.stars + '</span>' : '') +
      '</div>' +

      '<p class="repo-desc">' + repo.description + '</p>' +

      '<div class="repo-meta">' +
        '<div class="repo-lang">' +
          '<span class="repo-lang-dot" style="background-color: ' + langColor + ';"></span>' +
          '<span>' + repo.language + '</span>' +
        '</div>' +

        '<div class="repo-links-row">' +
          (hasHomepage ? '<a href="' + repo.homepage + '" target="_blank" rel="noopener noreferrer" class="repo-pill-link live-link" title="Live Web Demo"><span class="live-indicator-dot"></span> Live Demo</a>' : '') +
          '<a href="' + repo.url + '" target="_blank" rel="noopener noreferrer" class="repo-pill-link code-link" title="View Source on GitHub">Source &rarr;</a>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  function filterAndRender() {
    const gridEl = document.getElementById('repo-cards-grid');
    const countEl = document.getElementById('repo-results-count');
    if (!gridEl) return;

    const q = searchQuery.toLowerCase().trim();

    const filtered = allRepos.filter(repo => {
      const cat = getCategory(repo);
      const matchesCat = currentCategory === 'all' || cat === currentCategory;
      if (!matchesCat) return false;

      if (!q) return true;
      const name = repo.name.toLowerCase();
      const desc = (repo.description || '').toLowerCase();
      const lang = (repo.language || '').toLowerCase();

      return name.includes(q) || desc.includes(q) || lang.includes(q);
    });

    if (!filtered.length) {
      if (countEl) {
        countEl.textContent = '0 matching repositories found';
      }
      gridEl.innerHTML = '<div class="repo-empty-state" style="grid-column: 1 / -1;">' +
        '<p>No repositories match "<strong>' + searchQuery + '</strong>".</p>' +
        '<button type="button" class="btn btn-sm btn-outline" id="reset-repo-filters-btn">Reset Filters</button>' +
      '</div>';
      const resetBtn = document.getElementById('reset-repo-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          searchQuery = '';
          currentCategory = 'all';
          isExpanded = false;
          const searchInput = document.getElementById('repo-search-input');
          if (searchInput) searchInput.value = '';
          document.querySelectorAll('.repo-filter-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.category === 'all');
          });
          filterAndRender();
        });
      }
      return;
    }

    const isDefaultView = !q && currentCategory === 'all';
    let displayList = filtered;
    let showToggle = false;

    if (isDefaultView && !isExpanded) {
      displayList = filtered.slice(0, 6);
      showToggle = true;
      if (countEl) {
        countEl.textContent = 'Showing 6 featured repositories of ' + allRepos.length + ' public repos';
      }
    } else if (isDefaultView && isExpanded) {
      showToggle = true;
      if (countEl) {
        countEl.textContent = 'Showing all ' + filtered.length + ' public repositories';
      }
    } else {
      if (countEl) {
        countEl.textContent = 'Showing ' + filtered.length + ' matching repositories of ' + allRepos.length + ' total';
      }
    }

    let cardsHtml = displayList.map(renderRepoCard).join('');

    if (showToggle) {
      cardsHtml += '<div class="repo-expand-bar">' +
        '<button type="button" class="btn btn-outline" id="repo-toggle-expand-btn">' +
          '<span>' + (isExpanded ? 'Show Fewer Repositories (Curated Top 6)' : 'Explore All 40+ Public Repositories') + '</span>' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
            (isExpanded ? '<path d="M18 15l-6-6-6 6" stroke-linecap="round" stroke-linejoin="round"/>' : '<path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>') +
          '</svg>' +
        '</button>' +
      '</div>';
    }

    gridEl.innerHTML = cardsHtml;

    const toggleBtn = document.getElementById('repo-toggle-expand-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        filterAndRender();
        if (isExpanded) {
          // Smoothly scroll down slightly to reveal expanded repos
          toggleBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }
  }

  async function fetchLiveRepos() {
    try {
      const resp = await fetch('https://api.github.com/users/ha-re-ram/repos?sort=updated&per_page=100');
      if (!resp.ok) return;
      const data = await resp.json();
      if (!Array.isArray(data) || !data.length) return;

      const live = data
        .filter(r => !['ha-re-ram', 'portfolio-shreeram', 'Resume', 'wishing'].includes(r.name))
        .map(r => ({
          name: r.name,
          description: r.description || 'Open source software repository by Hareram Kushwaha.',
          language: r.language || 'Code',
          stars: r.stargazers_count,
          forks: r.forks_count,
          url: r.html_url,
          homepage: r.homepage || '',
          updated_at: (r.updated_at || '').slice(0, 10)
        }));

      if (live.length >= 20) {
        allRepos = live.sort((a, b) => (b.stars || 0) - (a.stars || 0));
        filterAndRender();
      }
    } catch (err) {
      // Graceful fallback to CACHED_REPOS
    }
  }

  function init() {
    const gridEl = document.getElementById('repo-cards-grid');
    if (!gridEl) return;

    filterAndRender();

    const searchInput = document.getElementById('repo-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        filterAndRender();
      });
    }

    const filterBtns = document.querySelectorAll('.repo-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category || 'all';
        filterAndRender();
      });
    });

    fetchLiveRepos();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
