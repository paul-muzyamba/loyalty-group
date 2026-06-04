/**
 * LOYALTY GROUP - CORE ENGINE CONTROLLER
 */
(function() {
  'use strict';
  /**
   * 1. Navigation Responsive Menu Interactivity Controls
   */
  function initNavigation() {
    const primaryNav = document.getElementById('primaryNav');
    if (!primaryNav) return;
    // Navigation adjustments can follow here if needed dynamically
  }

  /**
   * 2. Page Link Core Active Class Visual State Configuration
   */
  function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    
    navLinks.forEach(link => {
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
      toggleBtn.textContent = '☀️';
      toggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      toggleBtn.textContent = '🌙';
      toggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
    }

    // Interactive switch handler callback loop
    toggleBtn.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      
      if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('loyalty-theme', 'light');
        this.textContent = '🌙';
        this.setAttribute('aria-label', 'Switch to Dark Mode');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('loyalty-theme', 'dark');
        this.textContent = '☀️';
        this.setAttribute('aria-label', 'Switch to Light Mode');
      }
    });
  }

})();