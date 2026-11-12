/**
 * Hareram Kushwaha Portfolio - Theme State Machine
 * Elevates UX (deterministic transitions & cross-tab sync),
 * DX (inspectable API & typed states),
 * AX (declarative data attributes & programmatic control).
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'hk-portfolio-theme';

  const STATES = Object.freeze({
    DARK: 'dark',
    LIGHT: 'light'
  });

  // State Machine Controller
  const ThemeMachine = {
    _state: STATES.DARK,
    _listeners: new Set(),

    init() {
      const preferred = this._resolveInitialTheme();
      this.transition(preferred, { silent: false, persist: false });

      // Cross-tab synchronization via StorageEvent
      window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY && (e.newValue === STATES.DARK || e.newValue === STATES.LIGHT)) {
          this.transition(e.newValue, { silent: false, persist: false });
        }
      });

      // System OS theme change listener (only active if no user override stored)
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
          if (!localStorage.getItem(STORAGE_KEY)) {
            this.transition(e.matches ? STATES.LIGHT : STATES.DARK, { silent: false, persist: false });
          }
        });
      }

      // Bind all theme toggle buttons across pages
      document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
        btn.addEventListener('click', () => this.toggle());
      });
    },

    _resolveInitialTheme() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === STATES.DARK || saved === STATES.LIGHT) {
          return saved;
        }
      } catch (e) {
        // Fallback gracefully if localStorage is restricted
      }
      return STATES.DARK;
    },

    get state() {
      return this._state;
    },

    get isDark() {
      return this._state === STATES.DARK;
    },

    transition(nextTheme, { silent = false, persist = true } = {}) {
      if (nextTheme !== STATES.DARK && nextTheme !== STATES.LIGHT) {
        console.warn(`[ThemeMachine] Invalid theme state: "${nextTheme}". Falling back to "${STATES.DARK}".`);
        nextTheme = STATES.DARK;
      }

      this._state = nextTheme;

      // 1. Sync DOM attributes (AX & CSS selectors)
      document.documentElement.setAttribute('data-theme', nextTheme);
      document.documentElement.dataset.theme = nextTheme;

      // 2. Sync Meta Theme Color for mobile browsers (UX)
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) {
        metaTheme.setAttribute('content', nextTheme === STATES.LIGHT ? '#f8fafc' : '#0b1220');
      }

      // 3. Update all toggle button accessibility attributes (UX)
      const targetLabel = `Switch to ${nextTheme === STATES.LIGHT ? 'dark' : 'light'} theme`;
      document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
        btn.setAttribute('aria-label', targetLabel);
        btn.dataset.theme = nextTheme;
      });

      // 4. Persist if requested (DX)
      if (persist) {
        try {
          localStorage.setItem(STORAGE_KEY, nextTheme);
        } catch (e) {
          // LocalStorage unavailable/disabled
        }
      }

      // 5. Notify listeners & dispatch global event (DX/AX)
      if (!silent) {
        const eventDetail = { theme: nextTheme, isDark: nextTheme === STATES.DARK };
        this._listeners.forEach((fn) => {
          try {
            fn(eventDetail);
          } catch (err) {
            console.error('[ThemeMachine] Listener error:', err);
          }
        });

        window.dispatchEvent(
          new CustomEvent('portfolio:themechange', {
            detail: eventDetail,
            bubbles: true
          })
        );
      }

      return this._state;
    },

    toggle() {
      const next = this._state === STATES.DARK ? STATES.LIGHT : STATES.DARK;
      return this.transition(next, { persist: true });
    },

    set(theme) {
      return this.transition(theme, { persist: true });
    },

    subscribe(fn) {
      if (typeof fn === 'function') {
        this._listeners.add(fn);
        return () => this._listeners.delete(fn);
      }
      return () => {};
    }
  };

  // Expose on global Portfolio namespace for DX and AX automation
  window.Portfolio = window.Portfolio || {};
  window.Portfolio.theme = {
    STATES,
    get: () => ThemeMachine.state,
    isDark: () => ThemeMachine.isDark,
    set: (t) => ThemeMachine.set(t),
    toggle: () => ThemeMachine.toggle(),
    subscribe: (fn) => ThemeMachine.subscribe(fn)
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ThemeMachine.init());
  } else {
    ThemeMachine.init();
  }
})();
