/**
 * Hareram Kushwaha Portfolio - HK-OS Terminal State Machine
 * Inspired by and extracted from Hareram's Next.js HK-OS Terminal implementation.
 * Accessible via Ctrl+` or Ctrl+K or header button.
 */

(function () {
  'use strict';

  const TERMINAL_STATES = Object.freeze({
    CLOSED: 'closed',
    OPEN: 'open'
  });

  const ASCII_ART = `
     /\\     OS: HK-OS v2.0 (antigravity/static)
    /  \\    Kernel: 6.8.0-x86_64
   /____\\   Uptime: Active & Ready to Build
  /      \\  Shell: zsh / hareram-cli
 /________\\ User: Hareram Kushwaha (KPRIET CSE)
`;

  const TerminalMachine = {
    _state: TERMINAL_STATES.CLOSED,
    _history: [],
    _historyIndex: -1,
    _modalEl: null,
    _outputEl: null,
    _inputEl: null,
    _toggleBtns: [],

    init() {
      this._buildDOM();
      this._bindEvents();
    },

    _buildDOM() {
      if (document.getElementById('hk-terminal-modal')) return;

      const modal = document.createElement('div');
      modal.id = 'hk-terminal-modal';
      modal.className = 'terminal-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', 'HK-OS Developer Terminal');
      modal.dataset.state = TERMINAL_STATES.CLOSED;

      modal.innerHTML = `
        <div class="terminal-modal-backdrop" aria-hidden="true"></div>
        <div class="terminal-modal-window">
          <div class="terminal-header">
            <div class="terminal-dots">
              <button type="button" class="dot dot-red" aria-label="Close terminal" title="Close (Esc)"></button>
              <span class="dot dot-yellow"></span>
              <span class="dot dot-green"></span>
            </div>
            <div class="terminal-title">hk-os — zsh (Ctrl+\` or Esc)</div>
            <span class="terminal-tag">v2.0</span>
          </div>
          <div class="terminal-body terminal-modal-body" id="terminal-screen" tabindex="0">
            <div class="terminal-line text-muted">Welcome to HK-OS v2.0.0 [Hareram Kushwaha Portfolio Shell]</div>
            <div class="terminal-line text-muted">Type <span class="tok-key">"help"</span> to view available commands. Press <span class="tok-key">Esc</span> to close.</div>
            <div id="terminal-history-output"></div>
            <form id="terminal-form" class="terminal-prompt-form">
              <span class="terminal-prompt-user">~/hk</span>
              <span class="terminal-prompt-symbol">&gt;</span>
              <input type="text" id="terminal-input" class="terminal-input" autocomplete="off" spellcheck="false" aria-label="Terminal command input" placeholder="type a command...">
            </form>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      this._modalEl = modal;
      this._outputEl = modal.querySelector('#terminal-history-output');
      this._inputEl = modal.querySelector('#terminal-input');

      // Bind close button
      modal.querySelector('.dot-red')?.addEventListener('click', () => this.close());
      modal.querySelector('.terminal-modal-backdrop')?.addEventListener('click', () => this.close());
    },

    _bindEvents() {
      // Global Keyboard Shortcut: Ctrl + ` or Ctrl + K toggles terminal, Esc closes
      window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey && e.key === '`') || (e.ctrlKey && e.key === 'k')) {
          e.preventDefault();
          this.toggle();
        } else if (e.key === 'Escape' && this._state === TERMINAL_STATES.OPEN) {
          e.preventDefault();
          this.close();
        }
      });

      // Bind input history navigation (Up / Down arrows)
      if (this._inputEl) {
        this._inputEl.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            this._navigateHistory(-1);
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this._navigateHistory(1);
          }
        });
      }

      // Handle form command submission
      const form = this._modalEl?.querySelector('#terminal-form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const cmd = this._inputEl?.value.trim() || '';
          if (cmd) {
            this.execute(cmd);
            if (this._inputEl) this._inputEl.value = '';
          }
        });
      }

      // Bind all launcher buttons
      document.querySelectorAll('.terminal-launcher-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggle();
        });
      });
    },

    _navigateHistory(direction) {
      if (!this._history.length) return;
      if (direction === -1) {
        // Up
        if (this._historyIndex === -1) {
          this._historyIndex = this._history.length - 1;
        } else {
          this._historyIndex = Math.max(0, this._historyIndex - 1);
        }
      } else {
        // Down
        if (this._historyIndex === -1) return;
        this._historyIndex = this._historyIndex + 1;
        if (this._historyIndex >= this._history.length) {
          this._historyIndex = -1;
          if (this._inputEl) this._inputEl.value = '';
          return;
        }
      }
      if (this._inputEl && this._history[this._historyIndex]) {
        this._inputEl.value = this._history[this._historyIndex];
      }
    },

    get state() {
      return this._state;
    },

    get isOpen() {
      return this._state === TERMINAL_STATES.OPEN;
    },

    open() {
      if (this._state === TERMINAL_STATES.OPEN) return;
      this._state = TERMINAL_STATES.OPEN;

      if (this._modalEl) {
        this._modalEl.dataset.state = TERMINAL_STATES.OPEN;
        this._modalEl.classList.add('is-active');
      }

      window.requestAnimationFrame(() => {
        this._inputEl?.focus();
      });

      window.dispatchEvent(
        new CustomEvent('portfolio:terminalchange', {
          detail: { state: TERMINAL_STATES.OPEN, isOpen: true },
          bubbles: true
        })
      );
    },

    close() {
      if (this._state === TERMINAL_STATES.CLOSED) return;
      this._state = TERMINAL_STATES.CLOSED;

      if (this._modalEl) {
        this._modalEl.dataset.state = TERMINAL_STATES.CLOSED;
        this._modalEl.classList.remove('is-active');
      }

      window.dispatchEvent(
        new CustomEvent('portfolio:terminalchange', {
          detail: { state: TERMINAL_STATES.CLOSED, isOpen: false },
          bubbles: true
        })
      );
    },

    toggle() {
      if (this._state === TERMINAL_STATES.OPEN) {
        this.close();
      } else {
        this.open();
      }
    },

    execute(cmdString) {
      const raw = cmdString.trim();
      if (!raw) return;

      this._history.push(raw);
      this._historyIndex = -1;

      // Echo command
      this._appendLine(`$ ${raw}`, 'terminal-echo');

      const cmd = raw.toLowerCase();

      switch (cmd) {
        case 'help':
          this._appendLine('Available commands:', 'tok-key');
          this._appendLine('  whoami     - Overview of Hareram Kushwaha');
          this._appendLine('  education  - B.E. Computer Science Engineering @ KPRIET');
          this._appendLine('  projects   - Featured public GitHub repositories');
          this._appendLine('  skills     - Technical stack & core competencies');
          this._appendLine('  stats      - Verified problem-solving statistics');
          this._appendLine('  contact    - Email, phone, Formspree & socials');
          this._appendLine('  resume     - Opens official CDC resume');
          this._appendLine('  neofetch   - Display system hardware & kernel banner');
          this._appendLine('  theme      - Toggle between dark and light mode');
          this._appendLine('  sudo       - Elevate privileges');
          this._appendLine('  clear      - Clear the terminal screen');
          this._appendLine('  exit       - Close this terminal modal');
          break;

        case 'whoami':
          this._appendLine(
            'Hareram Kushwaha — Software Engineer & final-year Computer Science Engineering student at KPRIET, Coimbatore (started Sep 2023, expected Sep 2027, CGPA 7.9). Originally from Nepal. Focused on clean backend systems, REST APIs, and full-stack web applications.'
          );
          break;

        case 'education':
        case 'edu':
          this._appendLine(
            '• B.E. Computer Science and Engineering @ KPR Institute of Engineering and Technology (KPRIET), Coimbatore (2023–2027) | CGPA: 7.9 / 10'
          );
          this._appendLine(
            '• Higher Secondary Education (+2 Science) @ Trinity International Secondary School, Kathmandu (2021–2023) | 76%'
          );
          break;

        case 'projects':
          this._appendLine('Featured Repositories:');
          this._appendLine('1. Serenity-Breathing: Mindfulness PWA with breathing intervals & BMI tracker (React, TS, Firebase)');
          this._appendLine('2. NexisERP (erp_saas): Multi-tenant ERP platform with Chart.js analytics (PHP, MySQL, Bootstrap)');
          this._appendLine('3. Online-Voting-System: Election platform with double-vote prevention (React, Node, SQLite)');
          this._appendLine('4. OS-Project: Virtual memory simulator (FIFO/LRU/Optimal) & block file system (Python)');
          this._appendLine('5. SkyCast: Weather app with 5-day forecast & glassmorphism (Vanilla JS, CSS)');
          this._appendLine('6. Cara: Responsive e-commerce storefront emphasizing accessibility (HTML, CSS, JS)');
          break;

        case 'skills':
          this._appendLine('Languages: Java, Python, JavaScript (ES6+), C, SQL');
          this._appendLine('Frontend: React.js, Vite, TypeScript, Tailwind CSS, HTML5/CSS3');
          this._appendLine('Backend & DB: Node.js, Express.js, PHP, MySQL, SQLite, MongoDB');
          this._appendLine('Tools & Core CS: Git, GitHub, Postman, CI/CD, OOP, DBMS, OS Internals, DSA');
          break;

        case 'stats':
          this._appendLine('• LeetCode: 250+ Algorithmic Problems Solved (leetcode.com/u/23cs054)');
          this._appendLine('• GitHub: 40+ Public Repositories (github.com/ha-re-ram)');
          this._appendLine('• Experience: Web Development Intern @ Oasis Infobyte (Jan 2025 – Feb 2025)');
          this._appendLine('• Certifications: HackerRank Java & Problem Solving, EF SET English C1 Advanced');
          break;

        case 'contact':
          this._appendLine('Email: hareramkushwaha054@gmail.com');
          this._appendLine('College: 23cs054@kpriet.ac.in');
          this._appendLine('Direct Line: +91 8340318593');
          this._appendLine('GitHub: https://github.com/ha-re-ram');
          this._appendLine('LinkedIn: https://in.linkedin.com/in/ha-re-ram');
          this._appendLine('Formspree Endpoint: https://formspree.io/f/xzdojzva');
          break;

        case 'resume':
          this._appendLine('Opening resume in a new tab...');
          window.open('/Resume/', '_blank');
          break;

        case 'theme':
          if (window.Portfolio && window.Portfolio.theme) {
            const next = window.Portfolio.theme.toggle();
            this._appendLine(`Theme toggled to: ${next}`);
          }
          break;

        case 'neofetch':
          this._appendLine(ASCII_ART, 'tok-punct font-pre');
          break;

        case 'sudo':
          this._appendLine('Nice try! This incident will be reported to /var/log/hareram.log 🛡️', 'tok-bool');
          break;

        case 'clear':
        case 'cls':
          if (this._outputEl) this._outputEl.innerHTML = '';
          return;

        case 'exit':
        case 'quit':
          this.close();
          return;

        default:
          this._appendLine(`Command not found: "${cmd}". Type "help" for a list of valid commands.`, 'text-error');
      }

      // Auto scroll to bottom
      const screen = this._modalEl?.querySelector('#terminal-screen');
      if (screen) {
        screen.scrollTop = screen.scrollHeight;
      }
    },

    _appendLine(text, className = '') {
      if (!this._outputEl) return;
      const line = document.createElement('div');
      line.className = `terminal-line ${className}`;
      line.textContent = text;
      this._outputEl.appendChild(line);
    }
  };

  // Expose on global Portfolio namespace for DX and AX automation
  window.Portfolio = window.Portfolio || {};
  window.Portfolio.terminal = {
    STATES: TERMINAL_STATES,
    getState: () => TerminalMachine.state,
    isOpen: () => TerminalMachine.isOpen,
    open: () => TerminalMachine.open(),
    close: () => TerminalMachine.close(),
    toggle: () => TerminalMachine.toggle(),
    execute: (cmd) => TerminalMachine.execute(cmd)
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => TerminalMachine.init());
  } else {
    TerminalMachine.init();
  }
})();
