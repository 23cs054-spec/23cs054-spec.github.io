/**
 * Hareram Kushwaha Portfolio - Interactive Motion & Spotlight
 * Scroll reveals via IntersectionObserver, spotlight card cursor tracking,
 * magnetic skill chips, and verified stat counters.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Scroll Reveals using IntersectionObserver
  function initScrollReveals() {
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  // 2. Cursor-Following Spotlight on Cards
  function initSpotlightCards() {
    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--spotlight-x', `${x}px`);
        card.style.setProperty('--spotlight-y', `${y}px`);
        card.style.setProperty('--spotlight-opacity', '1');
      });

      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--spotlight-opacity', '0');
      });
    });
  }

  // 3. Magnetic Hover on Skill Chips
  function initMagneticChips() {
    if (prefersReducedMotion) return;

    const chips = document.querySelectorAll('.skill-chip');
    chips.forEach((chip) => {
      chip.addEventListener('mousemove', (e) => {
        const rect = chip.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        // Subtle magnetic pull (max ~4px)
        const moveX = (x / (rect.width / 2)) * 4;
        const moveY = (y / (rect.height / 2)) * 4;
        chip.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });

      chip.addEventListener('mouseleave', () => {
        chip.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  // 4. Real Stats Counter Animation
  function initStatCounters() {
    const counterElements = document.querySelectorAll('.stat-number[data-target]');
    if (!counterElements.length) return;

    if (prefersReducedMotion) {
      counterElements.forEach((el) => {
        const target = el.getAttribute('data-target');
        const suffix = el.getAttribute('data-suffix') || '';
        el.textContent = `${target}${suffix}`;
      });
      return;
    }

    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const targetVal = parseFloat(el.getAttribute('data-target') || '0');
            const suffix = el.getAttribute('data-suffix') || '';
            const isDecimal = targetVal % 1 !== 0;
            const duration = 1500;
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutCubic
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              const currentVal = easeProgress * targetVal;

              if (isDecimal) {
                el.textContent = `${currentVal.toFixed(1)}${suffix}`;
              } else {
                el.textContent = `${Math.floor(currentVal)}${suffix}`;
              }

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                el.textContent = `${targetVal}${suffix}`;
              }
            }

            requestAnimationFrame(updateCounter);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.25 }
    );

    counterElements.forEach((el) => counterObserver.observe(el));
  }

  function init() {
    initScrollReveals();
    initSpotlightCards();
    initMagneticChips();
    initStatCounters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

