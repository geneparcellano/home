(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  var navToggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.getElementById('mobile-nav-menu');

  function closeMobileMenu() {
    if (!navToggle || !mobileMenu) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    mobileMenu.setAttribute('hidden', '');
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function (event) {
      event.stopPropagation();
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMobileMenu();
      } else {
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.setAttribute('aria-label', 'Close menu');
        mobileMenu.removeAttribute('hidden');
      }
    });

    document.addEventListener('click', function (event) {
      if (!navToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
        closeMobileMenu();
      }
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMobileMenu();
      }
    });
  }

  document.querySelectorAll('.faq-item').forEach(function (item) {
    var summary = item.querySelector('.faq-question');
    if (!summary) return;

    summary.addEventListener('click', function (event) {
      event.preventDefault();
      var isOpen = item.hasAttribute('open');

      document.querySelectorAll('.faq-item[open]').forEach(function (openItem) {
        if (openItem !== item) openItem.removeAttribute('open');
      });

      if (isOpen) {
        item.removeAttribute('open');
      } else {
        item.setAttribute('open', '');
      }
    });
  });
})();
