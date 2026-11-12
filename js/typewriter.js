/**
 * Hareram Kushwaha Portfolio - Typewriter State Machine
 * Elevates UX (pauses on user hover/focus so text is readable, respects reduced motion & tab visibility),
 * DX (lifecycle states, no runaway timers, cancellable ticks),
 * AX (declarative data-state & programmatic control surface).
 */

(function () {
  'use strict';

  const STATES = Object.freeze({
    TYPING: 'typing',
    PAUSED_FULL: 'paused_full',
    DELETING: 'deleting',
    PAUSED_EMPTY: 'paused_empty',
    USER_PAUSED: 'user_paused',
    HALTED: 'halted'
  });

  const PHRASES = [
    'full-stack web applications.',
    'clean RESTful APIs.',
    'practical software systems.',
    'modern web experiences.'
  ];

  const TypewriterMachine = {
    _state: STATES.HALTED,
    _phraseIndex: 0,
    _charIndex: 0,
    _timerId: null,
    _el: null,
    _wrapperEl: null,
    _prefersReducedMotion: false,
    _isUserPaused: false,

    _typeSpeed: 65,
    _deleteSpeed: 30,
    _pauseFull: 2200,
    _pauseEmpty: 400,

    init() {
      this._el = document.getElementById('typewriter');
      if (!this._el) return;

      this._wrapperEl = this._el.closest('.typewriter-wrapper') || this._el;

      this._prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (this._prefersReducedMotion) {
        this._el.textContent = PHRASES[0];
        this._state = STATES.HALTED;
        this._el.dataset.state = STATES.HALTED;
        return;
      }

      // UX: Pause when user hovers or focuses on the typewriter text
      this._wrapperEl.addEventListener('mouseenter', () => this._handleUserPause(true));
      this._wrapperEl.addEventListener('mouseleave', () => this._handleUserPause(false));
      this._wrapperEl.addEventListener('focusin', () => this._handleUserPause(true));
      this._wrapperEl.addEventListener('focusout', () => this._handleUserPause(false));

      // UX & Performance: Pause when tab is backgrounded to save CPU & battery
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this._clearTimer();
          this._state = STATES.HALTED;
          this._el.dataset.state = STATES.HALTED;
        } else if (!this._isUserPaused && !this._prefersReducedMotion) {
          this._scheduleTick(100);
        }
      });

      // Listen for reduced motion changes dynamically
      window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
        this._prefersReducedMotion = e.matches;
        if (e.matches) {
          this._clearTimer();
          this._el.textContent = PHRASES[0];
          this._state = STATES.HALTED;
        } else {
          this._scheduleTick(100);
        }
      });

      this._state = STATES.TYPING;
      this._tick();
    },

    get state() {
      return this._state;
    },

    _clearTimer() {
      if (this._timerId) {
        clearTimeout(this._timerId);
        this._timerId = null;
      }
    },

    _scheduleTick(delay) {
      this._clearTimer();
      if (this._state === STATES.HALTED || this._isUserPaused || document.hidden) return;
      this._timerId = setTimeout(() => this._tick(), delay);
    },

    _handleUserPause(isPaused) {
      this._isUserPaused = isPaused;
      if (isPaused) {
        this._clearTimer();
        this._state = STATES.USER_PAUSED;
        if (this._el) this._el.dataset.state = STATES.USER_PAUSED;
      } else {
        if (this._state === STATES.USER_PAUSED) {
          this._state = this._charIndex === PHRASES[this._phraseIndex].length ? STATES.PAUSED_FULL : STATES.TYPING;
          this._scheduleTick(600); // Grace period before resuming typing
        }
      }
    },

    _tick() {
      if (!this._el || this._isUserPaused || document.hidden || this._prefersReducedMotion) return;

      const currentPhrase = PHRASES[this._phraseIndex];

      if (this._state === STATES.TYPING) {
        this._charIndex++;
        this._el.textContent = currentPhrase.substring(0, this._charIndex);
        this._el.dataset.state = STATES.TYPING;

        if (this._charIndex >= currentPhrase.length) {
          this._state = STATES.PAUSED_FULL;
          this._el.dataset.state = STATES.PAUSED_FULL;
          this._scheduleTick(this._pauseFull);
        } else {
          this._scheduleTick(this._typeSpeed);
        }
      } else if (this._state === STATES.PAUSED_FULL) {
        this._state = STATES.DELETING;
        this._el.dataset.state = STATES.DELETING;
        this._scheduleTick(this._deleteSpeed);
      } else if (this._state === STATES.DELETING) {
        this._charIndex--;
        this._el.textContent = currentPhrase.substring(0, this._charIndex);
        this._el.dataset.state = STATES.DELETING;

        if (this._charIndex <= 0) {
          this._state = STATES.PAUSED_EMPTY;
          this._el.dataset.state = STATES.PAUSED_EMPTY;
          this._phraseIndex = (this._phraseIndex + 1) % PHRASES.length;
          this._scheduleTick(this._pauseEmpty);
        } else {
          this._scheduleTick(this._deleteSpeed);
        }
      } else if (this._state === STATES.PAUSED_EMPTY) {
        this._state = STATES.TYPING;
        this._el.dataset.state = STATES.TYPING;
        this._scheduleTick(this._typeSpeed);
      }
    },

    pause() {
      this._handleUserPause(true);
    },

    resume() {
      this._handleUserPause(false);
    },

    next() {
      this._clearTimer();
      this._phraseIndex = (this._phraseIndex + 1) % PHRASES.length;
      this._charIndex = 0;
      this._state = STATES.TYPING;
      this._tick();
    }
  };

  // Expose on global Portfolio namespace for DX and AX automation
  window.Portfolio = window.Portfolio || {};
  window.Portfolio.typewriter = {
    STATES,
    getState: () => TypewriterMachine.state,
    pause: () => TypewriterMachine.pause(),
    resume: () => TypewriterMachine.resume(),
    next: () => TypewriterMachine.next()
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => TypewriterMachine.init());
  } else {
    TypewriterMachine.init();
  }
})();
