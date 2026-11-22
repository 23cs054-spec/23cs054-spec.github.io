/**
 * Hareram Kushwaha Portfolio - Animation & Interaction State Machine
 * Elevates UX (60fps rAF throttled mouse interactions, hardware-accelerated transforms),
 * DX (lifecycle states, no frame drops),
 * AX (revealAll test hook for instant agent inspection, data attributes).
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Scroll Reveals using IntersectionObserver
  function initScrollReveals() {
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
        el.classList.add('is-visible');
        el.dataset.revealed = 'true';
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
            entry.target.dataset.revealed = 'true';
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

  // 2. Cursor-Following Spotlight on Cards (rAF Throttled)
  function initSpotlightCards() {
    if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;

    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach((card) => {
      let rafId = null;
      let lastX = 0;
      let lastY = 0;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        lastX = e.clientX - rect.left;
        lastY = e.clientY - rect.top;

        if (!rafId) {
          rafId = window.requestAnimationFrame(() => {
            card.style.setProperty('--spotlight-x', `${lastX}px`);
            card.style.setProperty('--spotlight-y', `${lastY}px`);
            card.style.setProperty('--spotlight-opacity', '1');
            card.dataset.spotlight = 'active';
            rafId = null;
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = null;
        }
        card.style.setProperty('--spotlight-opacity', '0');
        card.dataset.spotlight = 'idle';
      });
    });
  }

  // 3. Magnetic Hover on Skill Chips (rAF Throttled)
  function initMagneticChips() {
    if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;

    const chips = document.querySelectorAll('.skill-chip');
    chips.forEach((chip) => {
      let rafId = null;

      chip.addEventListener('mousemove', (e) => {
        const rect = chip.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const moveX = (x / (rect.width / 2)) * 4;
        const moveY = (y / (rect.height / 2)) * 4;

        if (!rafId) {
          rafId = window.requestAnimationFrame(() => {
            chip.style.transform = `translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 0)`;
            rafId = null;
          });
        }
      });

      chip.addEventListener('mouseleave', () => {
        if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = null;
        }
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
        el.dataset.counterState = 'done';
      });
      return;
    }

    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.dataset.counterState = 'animating';
            const targetVal = parseFloat(el.getAttribute('data-target') || '0');
            const suffix = el.getAttribute('data-suffix') || '';
            const isDecimal = targetVal % 1 !== 0;
            const duration = 1200;
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              const currentVal = easeProgress * targetVal;

              if (isDecimal) {
                el.textContent = `${currentVal.toFixed(1)}${suffix}`;
              } else {
                el.textContent = `${Math.round(currentVal)}${suffix}`;
              }

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                el.textContent = `${targetVal}${suffix}`;
                el.dataset.counterState = 'done';
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

  // 5. Interactive 3D Card Tilt on Hero Stage (Mouse only & rAF Throttled)
  function initHeroTilt() {
    if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const stage = document.querySelector('.hero-stage');
    if (!stage) return;

    let rafId = null;
    let targetRotateX = 0;
    let targetRotateY = 0;

    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      targetRotateX = -(y / (rect.height / 2)) * 5;
      targetRotateY = (x / (rect.width / 2)) * 5;

      if (!rafId) {
        rafId = window.requestAnimationFrame(() => {
          stage.style.transform = `perspective(1000px) rotateX(${targetRotateX.toFixed(
            2
          )}deg) rotateY(${targetRotateY.toFixed(2)}deg)`;
          stage.dataset.tiltState = 'active';
          rafId = null;
        });
      }
    });

    stage.addEventListener('mouseleave', () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      stage.style.transition = 'transform 0.5s ease-out';
      stage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      stage.dataset.tiltState = 'idle';
    });

    stage.addEventListener('mouseenter', () => {
      stage.style.transition = 'transform 0.1s ease-out';
    });
  }

  function init() {
    initScrollReveals();
    initSpotlightCards();
    initMagneticChips();
    initStatCounters();
    initHeroTilt();
  }

  // Expose on global Portfolio namespace for DX and AX automation
  window.Portfolio = window.Portfolio || {};
  window.Portfolio.animations = {
    revealAll: () => {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
        el.classList.add('is-visible');
        el.dataset.revealed = 'true';
      });
      document.querySelectorAll('.stat-number[data-target]').forEach((el) => {
        const target = el.getAttribute('data-target');
        const suffix = el.getAttribute('data-suffix') || '';
        el.textContent = `${target}${suffix}`;
        el.dataset.counterState = 'done';
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
