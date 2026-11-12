/**
 * Hareram Kushwaha Portfolio - Hero Terminal Tabs Finite State Machine
 * Elevates UX, DX, and AX.
 * Manages dual-mode terminal showcase: JSON specs vs Live Coding Stream.
 */

(function () {
  'use strict';

  const TAB_STATES = Object.freeze({
    CONFIG: 'config',
    STREAM: 'stream'
  });

  const HeroTabsMachine = {
    _state: TAB_STATES.CONFIG,
    _cardEl: null,
    _configBtn: null,
    _streamBtn: null,
    _configPane: null,
    _streamPane: null,
    _tagEl: null,
    _videoEl: null,

    init() {
      this._cardEl = document.querySelector('.hero-terminal-card');
      if (!this._cardEl) return;

      this._configBtn = document.getElementById('tab-btn-config');
      this._streamBtn = document.getElementById('tab-btn-stream');
      this._configPane = document.getElementById('pane-config');
      this._streamPane = document.getElementById('pane-stream');
      this._tagEl = document.getElementById('terminal-live-tag');
      this._videoEl = this._streamPane?.querySelector('video') || null;

      this._bindEvents();
      this._render();
    },

    _bindEvents() {
      this._configBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        this.send('SELECT_CONFIG');
      });

      this._streamBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        this.send('SELECT_STREAM');
      });
    },

    get state() {
      return this._state;
    },

    getState() {
      return this._state;
    },

    send(event) {
      const prev = this._state;
      switch (event) {
        case 'SELECT_CONFIG':
          if (this._state !== TAB_STATES.CONFIG) {
            this._state = TAB_STATES.CONFIG;
            this._render();
            this._dispatch(prev, this._state);
          }
          break;

        case 'SELECT_STREAM':
          if (this._state !== TAB_STATES.STREAM) {
            this._state = TAB_STATES.STREAM;
            this._render();
            this._dispatch(prev, this._state);
          }
          break;

        case 'TOGGLE':
          this._state = this._state === TAB_STATES.CONFIG ? TAB_STATES.STREAM : TAB_STATES.CONFIG;
          this._render();
          this._dispatch(prev, this._state);
          break;

        default:
          console.warn(`[HeroTabsMachine] Unhandled event: ${event}`);
      }
      return this._state;
    },

    selectConfig() {
      return this.send('SELECT_CONFIG');
    },

    selectStream() {
      return this.send('SELECT_STREAM');
    },

    toggle() {
      return this.send('TOGGLE');
    },

    _render() {
      const isConfig = this._state === TAB_STATES.CONFIG;

      if (this._cardEl) {
        this._cardEl.dataset.activeTab = this._state;
      }

      if (this._configBtn) {
        this._configBtn.classList.toggle('active', isConfig);
        this._configBtn.setAttribute('aria-selected', isConfig ? 'true' : 'false');
      }

      if (this._streamBtn) {
        this._streamBtn.classList.toggle('active', !isConfig);
        this._streamBtn.setAttribute('aria-selected', !isConfig ? 'true' : 'false');
      }

      if (this._configPane) {
        this._configPane.hidden = !isConfig;
      }

      if (this._streamPane) {
        this._streamPane.hidden = isConfig;
      }

      if (this._tagEl) {
        this._tagEl.textContent = isConfig ? 'CONFIG' : 'STREAM';
        this._tagEl.style.color = isConfig ? '#10b981' : '#38bdf8';
        this._tagEl.style.borderColor = isConfig ? 'rgba(16, 185, 129, 0.3)' : 'rgba(56, 189, 248, 0.3)';
        this._tagEl.style.backgroundColor = isConfig ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.15)';
      }

      // Battery / GPU optimization: play video only when active
      if (this._videoEl) {
        if (!isConfig) {
          this._videoEl.play().catch(() => {});
        } else {
          this._videoEl.pause();
        }
      }
    },

    _dispatch(prevState, nextState) {
      window.dispatchEvent(
        new CustomEvent('herotabs:change', {
          detail: { prevState, nextState }
        })
      );
    }
  };

  // Expose on Portfolio global namespace
  window.Portfolio = window.Portfolio || {};
  window.Portfolio.heroTabs = {
    STATES: TAB_STATES,
    getState: () => HeroTabsMachine.getState(),
    send: (event) => HeroTabsMachine.send(event),
    selectConfig: () => HeroTabsMachine.selectConfig(),
    selectStream: () => HeroTabsMachine.selectStream(),
    toggle: () => HeroTabsMachine.toggle()
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => HeroTabsMachine.init());
  } else {
    HeroTabsMachine.init();
  }
})();
