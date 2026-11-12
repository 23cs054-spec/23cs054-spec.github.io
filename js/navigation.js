/**
 * Hareram Kushwaha Portfolio - Navigation & Header
 * Manages sticky header blur, mobile drawer, focus trapping, and active link states.
 */

(function () {
  'use strict';

  function initNavigation() {
    const header = document.querySelector('.site-header');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileDrawer = document.querySelector('.mobile-nav-drawer');

    // Sticky header blur effect on scroll
    function updateHeader() {
      if (window.scrollY > 20) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    // Mobile nav toggle
    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
        mobileToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close mobile menu when clicking outside or pressing Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
          mobileDrawer.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
          mobileToggle.focus();
        }
      });

      // Close when clicking any nav link
      const links = mobileDrawer.querySelectorAll('a');
      links.forEach((link) => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }

    // Set active link highlight based on pathname
    const currentPath = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
    const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    allNavLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      const normalizedHref = href.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
      
      if (normalizedHref === currentPath || (normalizedHref !== '/' && currentPath.startsWith(normalizedHref))) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();

