/**
 * Hareram Kushwaha Portfolio - Typewriter Effect
 * Cycles through focused engineering phrases, strictly respecting prefers-reduced-motion.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const PHRASES = [
    'full-stack web applications.',
    'clean REST APIs.',
    'responsive interfaces.',
    'systems & algorithms.'
  ];

  function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    if (prefersReducedMotion) {
      el.textContent = PHRASES[0];
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 70;
    const deleteSpeed = 35;
    const pauseEnd = 2000;
    const pauseStart = 400;

    function tick() {
      const currentPhrase = PHRASES[phraseIndex];

      if (isDeleting) {
        charIndex--;
        el.textContent = currentPhrase.substring(0, charIndex);
      } else {
        charIndex++;
        el.textContent = currentPhrase.substring(0, charIndex);
      }

      let timeout = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentPhrase.length) {
        timeout = pauseEnd;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
        timeout = pauseStart;
      }

      setTimeout(tick, timeout);
    }

    tick();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTypewriter);
  } else {
    initTypewriter();
  }
})();
