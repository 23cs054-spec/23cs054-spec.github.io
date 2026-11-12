/**
 * Hareram Kushwaha Portfolio - Contact Form State Machine
 * Elevates UX (inline error clearance, aria-busy, graceful fallback),
 * DX (explicit state transitions & validation rules),
 * AX (declarative data-state & programmatic submit/reset hooks).
 */

(function () {
  'use strict';

  const STATES = Object.freeze({
    IDLE: 'idle',
    VALIDATING: 'validating',
    INVALID: 'invalid',
    SUBMITTING: 'submitting',
    SUCCESS: 'success',
    ERROR: 'error'
  });

  const ContactFormMachine = {
    _state: STATES.IDLE,
    _formEl: null,
    _statusEl: null,
    _submitBtn: null,
    _nameInput: null,
    _emailInput: null,
    _messageInput: null,

    init() {
      this._formEl = document.getElementById('contact-form');
      this._statusEl = document.getElementById('form-status');
      if (!this._formEl || !this._statusEl) return;

      this._nameInput = this._formEl.querySelector('#name');
      this._emailInput = this._formEl.querySelector('#email');
      this._messageInput = this._formEl.querySelector('#message');
      this._submitBtn = this._formEl.querySelector('button[type="submit"]');

      this._formEl.dataset.state = STATES.IDLE;

      // Real-time error clearance on user keystrokes (UX)
      [this._nameInput, this._emailInput, this._messageInput].forEach((input) => {
        if (!input) return;
        input.addEventListener('input', () => {
          if (input.getAttribute('aria-invalid') === 'true') {
            input.removeAttribute('aria-invalid');
            if (this._state === STATES.INVALID) {
              this._setState(STATES.IDLE);
              this._statusEl.textContent = '';
              this._statusEl.className = 'form-status';
            }
          }
        });
      });

      this._formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submit();
      });
    },

    get state() {
      return this._state;
    },

    _setState(nextState, message = '', isError = false) {
      this._state = nextState;
      if (!this._formEl) return;

      this._formEl.dataset.state = nextState;
      this._formEl.setAttribute('aria-busy', String(nextState === STATES.SUBMITTING));

      if (this._submitBtn) {
        if (nextState === STATES.SUBMITTING) {
          this._submitBtn.disabled = true;
          this._submitBtn.dataset.originalText = this._submitBtn.dataset.originalText || this._submitBtn.innerHTML;
          this._submitBtn.innerHTML = '<span>Processing...</span>';
        } else {
          this._submitBtn.disabled = false;
          if (this._submitBtn.dataset.originalText) {
            this._submitBtn.innerHTML = this._submitBtn.dataset.originalText;
          }
        }
      }

      if (this._statusEl && message) {
        this._statusEl.className = `form-status ${isError ? 'error' : 'success'}`;
        this._statusEl.textContent = message;
        this._statusEl.setAttribute('role', isError ? 'alert' : 'status');
      }

      window.dispatchEvent(
        new CustomEvent('portfolio:formstate', {
          detail: { state: nextState, message },
          bubbles: true
        })
      );
    },

    validate() {
      this._setState(STATES.VALIDATING);

      const name = this._nameInput?.value.trim() || '';
      const email = this._emailInput?.value.trim() || '';
      const message = this._messageInput?.value.trim() || '';

      let isValid = true;
      let errorMsg = '';

      if (!name) {
        this._nameInput?.setAttribute('aria-invalid', 'true');
        isValid = false;
        errorMsg = 'Please enter your full name.';
      } else {
        this._nameInput?.removeAttribute('aria-invalid');
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailPattern.test(email)) {
        this._emailInput?.setAttribute('aria-invalid', 'true');
        isValid = false;
        errorMsg = errorMsg || 'Please provide a valid email address.';
      } else {
        this._emailInput?.removeAttribute('aria-invalid');
      }

      if (!message) {
        this._messageInput?.setAttribute('aria-invalid', 'true');
        isValid = false;
        errorMsg = errorMsg || 'Please enter your message details.';
      } else {
        this._messageInput?.removeAttribute('aria-invalid');
      }

      if (!isValid) {
        this._setState(STATES.INVALID, errorMsg, true);
        return false;
      }

      return { name, email, message };
    },

    async submit() {
      if (this._state === STATES.SUBMITTING) return; // Prevent double submission race condition

      const validData = this.validate();
      if (!validData) return;

      this._setState(STATES.SUBMITTING);

      const endpoint = this._formEl.getAttribute('action') || '';
      const isPlaceholder = !endpoint || endpoint.includes('PLACEHOLDER') || endpoint.startsWith('[');

      if (isPlaceholder) {
        // Mailto Fallback Action
        setTimeout(() => {
          const subject = encodeURIComponent(`Portfolio Inquiry from ${validData.name}`);
          const body = encodeURIComponent(
            `Name: ${validData.name}\nEmail: ${validData.email}\n\nMessage:\n${validData.message}`
          );
          window.location.href = `mailto:hareramkushwaha054@gmail.com?subject=${subject}&body=${body}`;

          this._setState(
            STATES.SUCCESS,
            'Opening your default email client to send this message directly to hareramkushwaha054@gmail.com.'
          );
        }, 400);
      } else {
        // Live API Submission
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify(validData)
          });

          if (response.ok) {
            this._setState(STATES.SUCCESS, 'Thank you! Your message has been sent successfully.');
            this._formEl.reset();
          } else {
            throw new Error(`Server returned HTTP ${response.status}`);
          }
        } catch (err) {
          this._setState(
            STATES.ERROR,
            'Unable to send automatically. Please email hareramkushwaha054@gmail.com directly.',
            true
          );
        }
      }
    },

    reset() {
      if (this._formEl) {
        this._formEl.reset();
        [this._nameInput, this._emailInput, this._messageInput].forEach((input) => {
          input?.removeAttribute('aria-invalid');
        });
      }
      this._setState(STATES.IDLE);
      if (this._statusEl) {
        this._statusEl.textContent = '';
        this._statusEl.className = 'form-status';
      }
    }
  };

  // Expose on global Portfolio namespace for DX and AX automation
  window.Portfolio = window.Portfolio || {};
  window.Portfolio.contact = {
    STATES,
    getState: () => ContactFormMachine.state,
    validate: () => ContactFormMachine.validate(),
    submit: () => ContactFormMachine.submit(),
    reset: () => ContactFormMachine.reset()
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ContactFormMachine.init());
  } else {
    ContactFormMachine.init();
  }
})();
