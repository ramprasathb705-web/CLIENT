/**
 * Accessible Portfolio Core Script
 * WCAG 2.1 / 2.2 Compliant Interactions
 */

(function () {
  'use strict';

  // 1. Skip link focus helper
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        if (!targetElement.hasAttribute('tabindex')) {
          targetElement.setAttribute('tabindex', '-1');
        }
        targetElement.focus();
      }
    });
  }

  // 2. Mobile Navigation with ARIA & Keyboard Handling
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const primaryNav = document.getElementById('primary-nav');

  if (menuToggle && primaryNav) {
    function toggleMenu(isOpen) {
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        primaryNav.classList.add('is-open');
        primaryNav.removeAttribute('aria-hidden');
        // Focus first link in menu
        const firstLink = primaryNav.querySelector('a');
        if (firstLink) firstLink.focus();
      } else {
        primaryNav.classList.remove('is-open');
        primaryNav.setAttribute('aria-hidden', 'true');
        menuToggle.focus();
      }
    }

    menuToggle.addEventListener('click', function () {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      toggleMenu(!isExpanded);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
          toggleMenu(false);
        }
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded && !primaryNav.contains(e.target) && !menuToggle.contains(e.target)) {
        toggleMenu(false);
      }
    });
  }

  // 3. Theme Toggle with ARIA State & Local Storage
  const themeToggle = document.getElementById('theme-toggle');
  const rootElement = document.documentElement;
  const STORAGE_KEY = 'alex_morgan_theme';

  function setTheme(theme) {
    if (theme === 'light') {
      rootElement.setAttribute('data-theme', 'light');
      if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', 'true');
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
        themeToggle.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
          <span class="sr-only">Switch to dark theme</span>
        `;
      }
    } else {
      rootElement.removeAttribute('data-theme');
      if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', 'false');
        themeToggle.setAttribute('aria-label', 'Switch to light theme');
        themeToggle.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <span class="sr-only">Switch to light theme</span>
        `;
      }
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // LocalStorage might be restricted
    }
  }

  // Initial theme detection
  const savedTheme = (function () {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  })();

  if (savedTheme) {
    setTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    setTheme('light');
  } else {
    setTheme('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const isCurrentLight = rootElement.getAttribute('data-theme') === 'light';
      setTheme(isCurrentLight ? 'dark' : 'light');
    });
  }

  // 4. Update current copyright year dynamically if placeholder exists
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
})();
