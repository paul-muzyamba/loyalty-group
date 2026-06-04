/**
 * LOYALTY GROUP - CORE ENGINE CONTROLLER
 */
(function() {
  'use strict';

  /**
   * 1. Navigation Responsive Menu Interactivity Controls
   */
  function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const header = document.querySelector('.site-header');
    if (!navToggle || !header) return;

    // Toggle the nav-open class on the header when the hamburger is clicked
    navToggle.addEventListener('click', function() {
      const isOpen = header.classList.contains('nav-open');
      header.classList.toggle('nav-open');
      this.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close the menu when any nav link is tapped (mobile UX — navigates away anyway)
    document.querySelectorAll('.nav-menu .nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close the menu when the user taps anywhere outside the header
    document.addEventListener('click', function(e) {
      if (!header.contains(e.target)) {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /**
   * 2. Page Link Core Active Class Visual State Configuration
   */
  function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    navLinks.forEach(function(link) {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * 3. Native Persistent Dark Mode UI Toggle Controller (Default: Light Mode)
   */
  function initDarkMode() {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;

    // Check only for an explicit, previously saved choice in storage
    const savedTheme = localStorage.getItem('loyalty-theme');

    // Explicitly default to light mode unless they already clicked dark mode in the past
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      toggleBtn.textContent = '\u2600\uFE0F';
      toggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      toggleBtn.textContent = '\uD83C\uDF19';
      toggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
    }

    // Interactive switch handler callback loop
    toggleBtn.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');

      if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('loyalty-theme', 'light');
        this.textContent = '\uD83C\uDF19';
        this.setAttribute('aria-label', 'Switch to Dark Mode');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('loyalty-theme', 'dark');
        this.textContent = '\u2600\uFE0F';
        this.setAttribute('aria-label', 'Switch to Light Mode');
      }
    });
  }

  /**
   * Boot all modules once the DOM is fully parsed
   */
  document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    setActiveNavLink();
    initDarkMode();
  });

})();
