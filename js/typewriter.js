/**
 * Hareram Kushwaha Portfolio - Typewriter Effect
 * Cycles through targeted engineering focus phrases, strictly respecting reduced motion.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const PHRASES = [
    'reliable backend systems & APIs.',
    'high-performance web applications.',
    'distributed architecture & clean code.',
    'scalable full-stack solutions.'
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
    const typeSpeed = 75;
    const deleteSpeed = 35;
    const pauseEnd = 2200;
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
