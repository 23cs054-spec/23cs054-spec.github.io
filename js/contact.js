/**
 * Hareram Kushwaha Portfolio - Contact Form Handler
 * Validates input, provides instant feedback, and falls back to a pre-filled mailto action.
 */

(function () {
  'use strict';

  function initContactForm() {
    const form = document.getElementById('contact-form');
    const statusMsg = document.getElementById('form-status');
    if (!form || !statusMsg) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('#name');
      const emailInput = form.querySelector('#email');
      const messageInput = form.querySelector('#message');
      const submitBtn = form.querySelector('button[type="submit"]');

      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const message = messageInput?.value.trim() || '';

      if (!name || !email || !message) {
        statusMsg.className = 'form-status error';
        statusMsg.textContent = 'Please fill out all fields.';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        statusMsg.className = 'form-status error';
        statusMsg.textContent = 'Please enter a valid email address.';
        return;
      }

      const endpoint = form.getAttribute('action') || '';
      const isPlaceholder = !endpoint || endpoint.includes('PLACEHOLDER') || endpoint.startsWith('[');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
      }

      if (isPlaceholder) {
        // Fallback to mailto link
        setTimeout(() => {
          const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
          const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
          window.location.href = `mailto:hareramkushwaha054@gmail.com?subject=${subject}&body=${body}`;

          statusMsg.className = 'form-status success';
          statusMsg.textContent = 'Opening your email client to send this message directly to hareramkushwaha054@gmail.com.';

          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
          }
        }, 400);
      } else {
        // Submit via AJAX to configured endpoint
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
          });

          if (response.ok) {
            statusMsg.className = 'form-status success';
            statusMsg.textContent = 'Thank you! Your message has been sent successfully.';
            form.reset();
          } else {
            throw new Error('Network response error');
          }
        } catch (err) {
          statusMsg.className = 'form-status error';
          statusMsg.textContent = 'Unable to send message automatically. Please email hareramkushwaha054@gmail.com directly.';
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
          }
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
})();
