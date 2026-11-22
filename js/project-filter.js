/**
 * Hareram Kushwaha Portfolio - Project Catalog & Filter State Machine
 * Elevates UX (smooth cancelable transitions, deep linking, live screen reader announcements),
 * DX (predictable card lifecycle states, zero timeout races),
 * AX (declarative data attributes & programmatic filter controller).
 */

(function () {
  'use strict';

  const ProjectFilterMachine = {
    _activeFilter: 'all',
    _buttons: [],
    _cards: [],
    _liveRegion: null,
    _pendingTimeouts: new Map(),

    init() {
      this._buttons = Array.from(document.querySelectorAll('.filter-btn, .project-tab'));
      this._cards = Array.from(document.querySelectorAll('.project-card[data-category], .eng-project-card[data-category]'));

      if (!this._buttons.length || !this._cards.length) return;

      this._initLiveRegion();
      this._bindEvents();

      // Deep linking: read initial filter from URL parameter or hash
      const urlParams = new URLSearchParams(window.location.search);
      const queryFilter = urlParams.get('filter') || window.location.hash.replace('#', '');
      const validFilter = this._isValidFilter(queryFilter) ? queryFilter : 'all';

      this.filter(validFilter, { updateUrl: false });
    },

    _isValidFilter(filter) {
      return this._buttons.some((btn) => (btn.getAttribute('data-filter') || btn.getAttribute('data-tab')) === filter);
    },

    _initLiveRegion() {
      let live = document.getElementById('filter-live-region');
      if (!live) {
        live = document.createElement('div');
        live.id = 'filter-live-region';
        live.className = 'sr-only';
        live.setAttribute('aria-live', 'polite');
        live.setAttribute('aria-atomic', 'true');
        document.body.appendChild(live);
      }
      this._liveRegion = live;
    },

    _bindEvents() {
      this._buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-filter') || btn.getAttribute('data-tab') || 'all';
          this.filter(target, { updateUrl: true });
        });
      });

      // Handle browser back/forward navigation
      window.addEventListener('popstate', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const queryFilter = urlParams.get('filter') || 'all';
        if (this._isValidFilter(queryFilter) && queryFilter !== this._activeFilter) {
          this.filter(queryFilter, { updateUrl: false });
        }
      });
    },

    get activeFilter() {
      return this._activeFilter;
    },

    getCounts() {
      const counts = { all: this._cards.length };
      this._cards.forEach((card) => {
        const cats = (card.getAttribute('data-category') || '').split(' ');
        cats.forEach((c) => {
          if (c) counts[c] = (counts[c] || 0) + 1;
        });
      });
      return counts;
    },

    filter(nextFilter, { updateUrl = true } = {}) {
      if (this._activeFilter === nextFilter && this._hasInitialized) return;
      this._hasInitialized = true;
      this._activeFilter = nextFilter;

      // 1. Sync Filter Buttons & Tabs
      this._buttons.forEach((btn) => {
        const filterVal = btn.getAttribute('data-filter') || btn.getAttribute('data-tab');
        const isActive = filterVal === nextFilter;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
        btn.setAttribute('aria-selected', String(isActive));
        btn.dataset.active = String(isActive);
      });

      // 2. Filter Project Cards deterministically without race conditions
      let visibleCount = 0;

      this._cards.forEach((card) => {
        // Cancel any pending exit animation for this card
        if (this._pendingTimeouts.has(card)) {
          clearTimeout(this._pendingTimeouts.get(card));
          this._pendingTimeouts.delete(card);
        }

        const categories = (card.getAttribute('data-category') || '').split(' ');
        const shouldShow = nextFilter === 'all' || categories.includes(nextFilter);

        if (shouldShow) {
          visibleCount++;
          card.dataset.filterState = 'visible';
          card.style.display = 'flex';
          window.requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          });
        } else {
          card.dataset.filterState = 'hidden';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';

          const timerId = setTimeout(() => {
            if (card.dataset.filterState === 'hidden') {
              card.style.display = 'none';
            }
            this._pendingTimeouts.delete(card);
          }, 240);

          this._pendingTimeouts.set(card, timerId);
        }
      });

      // 3. Announce to Screen Readers via Live Region (UX)
      if (this._liveRegion) {
        const readableFilter = nextFilter === 'all' ? 'All' : nextFilter;
        this._liveRegion.textContent = `Showing ${visibleCount} project${
          visibleCount === 1 ? '' : 's'
        } for ${readableFilter}.`;
      }

      // 4. Deep link URL sync (DX/UX)
      if (updateUrl && window.history && window.history.replaceState) {
        const newUrl = nextFilter === 'all' ? window.location.pathname : `?filter=${nextFilter}`;
        window.history.replaceState({ filter: nextFilter }, '', newUrl);
      }

      // 5. Dispatch global CustomEvent for agent & integration automation (AX/DX)
      window.dispatchEvent(
        new CustomEvent('portfolio:filterchange', {
          detail: { filter: nextFilter, visibleCount },
          bubbles: true
        })
      );
    }
  };

  // Expose on global Portfolio namespace for DX and AX automation
  window.Portfolio = window.Portfolio || {};
  window.Portfolio.projects = {
    getActive: () => ProjectFilterMachine.activeFilter,
    getCounts: () => ProjectFilterMachine.getCounts(),
    filter: (category) => ProjectFilterMachine.filter(category, { updateUrl: true })
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ProjectFilterMachine.init());
  } else {
    ProjectFilterMachine.init();
  }
})();
