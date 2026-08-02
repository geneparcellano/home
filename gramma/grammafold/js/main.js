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

  var screenshots = document.querySelectorAll('.screenshot');
  if (screenshots.length > 0) {
    var modal = document.createElement('div');
    modal.className = 'screenshot-modal';
    modal.setAttribute('hidden', '');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML =
      '<div class="screenshot-modal__backdrop"></div>' +
      '<button type="button" class="screenshot-modal__close" aria-label="Close">' +
        '<svg class="screenshot-modal__close-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">' +
          '<path d="M5 5l10 10M15 5L5 15"/>' +
        '</svg>' +
      '</button>' +
      '<div class="screenshot-modal__content">' +
        '<img class="screenshot-modal__image" src="" alt="">' +
      '</div>';
    document.body.appendChild(modal);

    var closeBtn = modal.querySelector('.screenshot-modal__close');
    var modalImage = modal.querySelector('.screenshot-modal__image');
    var lastTrigger = null;

    function closeScreenshotModal() {
      modal.setAttribute('hidden', '');
      document.body.classList.remove('screenshot-modal-open');
      modalImage.removeAttribute('src');
      if (lastTrigger) {
        lastTrigger.focus();
        lastTrigger = null;
      }
    }

    function openScreenshotModal(image) {
      lastTrigger = image;
      modalImage.src = image.currentSrc || image.src;
      modalImage.alt = image.alt;
      modal.setAttribute('aria-label', image.alt || 'Screenshot preview');
      modal.removeAttribute('hidden');
      document.body.classList.add('screenshot-modal-open');
      closeBtn.focus();
    }

    screenshots.forEach(function (image) {
      image.tabIndex = 0;
      image.setAttribute('role', 'button');
      image.setAttribute(
        'aria-label',
        image.alt ? 'View larger: ' + image.alt : 'View larger screenshot'
      );

      image.addEventListener('click', function () {
        openScreenshotModal(image);
      });

      image.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openScreenshotModal(image);
        }
      });
    });

    closeBtn.addEventListener('click', closeScreenshotModal);
    modal.addEventListener('click', closeScreenshotModal);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !modal.hasAttribute('hidden')) {
        closeScreenshotModal();
      }
    });
  }
})();
