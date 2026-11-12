/**
 * Hareram Kushwaha Portfolio - Contact Form Handler
 * Validates user input, offers direct mailto fallback, and integrates with form service endpoint placeholder.
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
        statusMsg.textContent = 'Please fill out all required fields.';
        return;
      }

      // Basic email regex
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        statusMsg.className = 'form-status error';
        statusMsg.textContent = 'Please enter a valid email address.';
        return;
      }

      // Check if endpoint is still placeholder or active
      const endpoint = form.getAttribute('action') || '';
      const isPlaceholder = !endpoint || endpoint.includes('YOUR_FORM_ENDPOINT');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending message...';
      }

      if (isPlaceholder) {
        // Fallback to mailto link
        setTimeout(() => {
          const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
          const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
          window.location.href = `mailto:hareramkushwaha054@gmail.com?subject=${subject}&body=${body}`;

          statusMsg.className = 'form-status success';
          statusMsg.textContent = 'Opening your email client with your prefilled message. You can also email hareramkushwaha054@gmail.com directly!';
          
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
          }
        }, 500);
      } else {
        // Submit via AJAX to real endpoint
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
            statusMsg.textContent = 'Thank you! Your message has been sent successfully. I will get back to you shortly.';
            form.reset();
          } else {
            throw new Error('Network response was not ok');
          }
        } catch (err) {
          statusMsg.className = 'form-status error';
          statusMsg.textContent = 'Could not send message automatically. Please reach out directly to hareramkushwaha054@gmail.com.';
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
