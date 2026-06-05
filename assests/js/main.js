/**
 * LOYALTY GROUP — CORE ENGINE CONTROLLER
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. NAVIGATION — responsive hamburger menu
  ------------------------------------------------------------------ */
  function initNavigation() {
    var navToggle = document.getElementById('navToggle');
    var header = document.querySelector('.site-header');
    if (!navToggle || !header) return;

    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = header.classList.contains('nav-open');
      header.classList.toggle('nav-open');
      this.setAttribute('aria-expanded', String(!isOpen));
    });

    document.querySelectorAll('.nav-menu .nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     2. ACTIVE NAV LINK — highlight current page
  ------------------------------------------------------------------ */
  function setActiveNavLink() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu .nav-link').forEach(function (link) {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /* ------------------------------------------------------------------
     3. DARK MODE — persistent theme toggle
  ------------------------------------------------------------------ */
  function applyThemeEarly() {
    var saved = localStorage.getItem('loyalty-theme');
    document.documentElement.setAttribute('data-theme', saved === 'dark' ? 'dark' : 'light');
  }

  function initDarkMode() {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    var current = document.documentElement.getAttribute('data-theme');
    btn.textContent = current === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
    btn.setAttribute('aria-label', current === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');

    btn.addEventListener('click', function () {
      var theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'dark') {
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

  /* ------------------------------------------------------------------
     4. IMAGE HOVER ZOOM — strip on touch devices (no sticky hover)
  ------------------------------------------------------------------ */
  function patchImageHover() {
    if (window.matchMedia('(hover: none)').matches) {
      document.querySelectorAll('img[onmouseover]').forEach(function (img) {
        img.removeAttribute('onmouseover');
        img.removeAttribute('onmouseout');
      });
    }
  }

  /* ------------------------------------------------------------------
     5. IMAGE PREFETCH — preload other pages' hero images in idle time
        so navigation feels instant. Skips slow / data-saver connections.
  ------------------------------------------------------------------ */
  function initImagePrefetch() {
    var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn && (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g')) return;

    var currentPage = (window.location.pathname.split('/').pop() || 'index.html');

    var heroImages = {
      'index.html':   ['assests/images/Pharmacy.jpg', 'assests/images/Finance2.jpg', 'assests/images/Health Front.jpg'],
      'finance.html': ['assests/images/Loan Cash.jpg', 'assests/images/Deal.jpg'],
      'health.html':  ['assests/images/Pharmacy3.jpg', 'assests/images/Medicine3.jpg', 'assests/images/Counselling.jpg'],
      'about.html':   ['assests/images/Journey.jpg', 'assests/images/CEO image.jpg'],
      'contact.html': ['assests/images/Call Center.jpg']
    };

    var queue = [];
    Object.keys(heroImages).forEach(function (page) {
      if (page !== currentPage) {
        queue = queue.concat(heroImages[page]);
      }
    });

    function loadNext(index) {
      if (index >= queue.length) return;
      var img = new Image();
      img.onload = img.onerror = function () { loadNext(index + 1); };
      img.src = queue[index];
    }

    // Begin after the current page has had time to fully render
    if ('requestIdleCallback' in window) {
      requestIdleCallback(function () { loadNext(0); }, { timeout: 4000 });
    } else {
      setTimeout(function () { loadNext(0); }, 2500);
    }
  }

  /* ------------------------------------------------------------------
     6. HTML PAGE PREFETCH — on link hover/touchstart, tell the browser
        to pre-fetch that page's HTML so resource discovery starts early.
  ------------------------------------------------------------------ */
  function initLinkPrefetch() {
    var prefetched = {};
    function prefetch(href) {
      if (!href || prefetched[href] || href.charAt(0) === '#' || href.indexOf('mailto') === 0) return;
      prefetched[href] = true;
      var link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    }
    document.querySelectorAll('a[href]').forEach(function (a) {
      a.addEventListener('mouseenter', function () { prefetch(this.getAttribute('href')); });
      a.addEventListener('touchstart', function () { prefetch(this.getAttribute('href')); }, { passive: true });
    });
  }

  // Apply theme synchronously before paint to prevent flash
  applyThemeEarly();

  document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    setActiveNavLink();
    initDarkMode();
    patchImageHover();
    initImagePrefetch();
    initLinkPrefetch();
  });

}());
