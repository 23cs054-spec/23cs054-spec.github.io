/**
 * Hareram Kushwaha Portfolio - Navigation & Drawer State Machine
 * Elevates UX (focus trapping, escape handling, resize recovery, backdrop dismiss),
 * DX (clean state management & zero memory leaks),
 * AX (declarative data-state & programmatic open/close/toggle API).
 */

(function () {
  'use strict';

  const DRAWER_STATES = Object.freeze({
    CLOSED: 'closed',
    OPEN: 'open'
  });

  const HEADER_STATES = Object.freeze({
    UNSCROLLED: 'unscrolled',
    SCROLLED: 'scrolled'
  });

  const NavigationMachine = {
    _drawerState: DRAWER_STATES.CLOSED,
    _headerState: HEADER_STATES.UNSCROLLED,
    _headerEl: null,
    _toggleEl: null,
    _drawerEl: null,
    _focusableElements: [],
    _previousActiveElement: null,

    init() {
      this._headerEl = document.querySelector('.site-header');
      this._toggleEl = document.querySelector('.mobile-nav-toggle');
      this._drawerEl = document.querySelector('.mobile-nav-drawer');

      this._initHeaderScroll();
      this._initDrawer();
      this._initActiveLinks();
    },

    // 1. Header Scroll State Machine (60fps rAF throttled)
    _initHeaderScroll() {
      if (!this._headerEl) return;

      let ticking = false;
      const checkScroll = () => {
        const isScrolled = window.scrollY > 20;
        const nextState = isScrolled ? HEADER_STATES.SCROLLED : HEADER_STATES.UNSCROLLED;

        if (this._headerState !== nextState) {
          this._headerState = nextState;
          this._headerEl.classList.toggle('scrolled', isScrolled);
          this._headerEl.dataset.scrolled = String(isScrolled);
        }
        ticking = false;
      };

      window.addEventListener(
        'scroll',
        () => {
          if (!ticking) {
            window.requestAnimationFrame(checkScroll);
            ticking = true;
          }
        },
        { passive: true }
      );

      checkScroll();
    },

    // 2. Mobile Drawer State Machine
    _initDrawer() {
      if (!this._toggleEl || !this._drawerEl) return;

      // Set initial declarative states for accessibility & agent automation
      this._drawerEl.dataset.state = DRAWER_STATES.CLOSED;
      this._toggleEl.setAttribute('aria-expanded', 'false');

      // Toggle button click
      this._toggleEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });

      // Close when pressing Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this._drawerState === DRAWER_STATES.OPEN) {
          e.preventDefault();
          this.close({ restoreFocus: true });
        } else if (e.key === 'Tab' && this._drawerState === DRAWER_STATES.OPEN) {
          this._handleFocusTrap(e);
        }
      });

      // Close when clicking outside drawer (backdrop dismiss)
      document.addEventListener('click', (e) => {
        if (
          this._drawerState === DRAWER_STATES.OPEN &&
          !this._drawerEl.contains(e.target) &&
          !this._toggleEl.contains(e.target)
        ) {
          this.close({ restoreFocus: false });
        }
      });

      // Close when clicking any link within drawer
      this._drawerEl.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          this.close({ restoreFocus: false });
        });
      });

      // Auto-close on viewport resize to desktop (>= 1024px) to prevent trapped scroll
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && this._drawerState === DRAWER_STATES.OPEN) {
          this.close({ restoreFocus: false });
        }
      });
    },

    _handleFocusTrap(e) {
      if (!this._drawerEl) return;
      const focusables = [
        this._toggleEl,
        ...Array.from(this._drawerEl.querySelectorAll('a[href], button:not([disabled])'))
      ].filter(Boolean);

      if (!focusables.length) return;

      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    },

    get state() {
      return this._drawerState;
    },

    get isOpen() {
      return this._drawerState === DRAWER_STATES.OPEN;
    },

    open() {
      if (this._drawerState === DRAWER_STATES.OPEN) return;
      this._previousActiveElement = document.activeElement;
      this._drawerState = DRAWER_STATES.OPEN;

      // Sync DOM & Accessibility
      this._drawerEl.classList.add('open');
      this._drawerEl.dataset.state = DRAWER_STATES.OPEN;
      this._toggleEl.setAttribute('aria-expanded', 'true');
      this._toggleEl.setAttribute('aria-label', 'Close navigation menu');
      document.body.style.overflow = 'hidden';

      // Focus first interactive link inside drawer
      const firstLink = this._drawerEl.querySelector('a');
      if (firstLink) {
        window.requestAnimationFrame(() => firstLink.focus());
      }

      window.dispatchEvent(
        new CustomEvent('portfolio:navchange', {
          detail: { state: DRAWER_STATES.OPEN, isOpen: true },
          bubbles: true
        })
      );
    },

    close({ restoreFocus = true } = {}) {
      if (this._drawerState === DRAWER_STATES.CLOSED) return;
      this._drawerState = DRAWER_STATES.CLOSED;

      // Sync DOM & Accessibility
      this._drawerEl.classList.remove('open');
      this._drawerEl.dataset.state = DRAWER_STATES.CLOSED;
      this._toggleEl.setAttribute('aria-expanded', 'false');
      this._toggleEl.setAttribute('aria-label', 'Open navigation menu');
      document.body.style.overflow = '';

      if (restoreFocus && this._toggleEl) {
        this._toggleEl.focus();
      }

      window.dispatchEvent(
        new CustomEvent('portfolio:navchange', {
          detail: { state: DRAWER_STATES.CLOSED, isOpen: false },
          bubbles: true
        })
      );
    },

    toggle() {
      if (this._drawerState === DRAWER_STATES.OPEN) {
        this.close();
      } else {
        this.open();
      }
    },

    // 3. Active Route Highlight State
    _initActiveLinks() {
      const currentPath = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
      const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

      allNavLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) return;
        const normalizedHref = href.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';

        const isMatch =
          normalizedHref === currentPath ||
          (normalizedHref !== '/' && currentPath.startsWith(normalizedHref));

        if (isMatch) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
          link.dataset.active = 'true';
        } else {
          link.removeAttribute('aria-current');
          link.dataset.active = 'false';
        }
      });
    }
  };

  // Expose on global Portfolio namespace for DX and AX automation
  window.Portfolio = window.Portfolio || {};
  window.Portfolio.nav = {
    DRAWER_STATES,
    HEADER_STATES,
    getState: () => NavigationMachine.state,
    isOpen: () => NavigationMachine.isOpen,
    open: () => NavigationMachine.open(),
    close: (opts) => NavigationMachine.close(opts),
    toggle: () => NavigationMachine.toggle()
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => NavigationMachine.init());
  } else {
    NavigationMachine.init();
  }
})();
