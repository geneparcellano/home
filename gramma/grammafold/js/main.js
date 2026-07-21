(function () {
  'use strict';

  // Smooth scroll for in-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  // FAQ accordion via native <details> enhancement
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
