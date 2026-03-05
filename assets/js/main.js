/**
 * main.js — UI interactions
 * Features:
 *  - Mobile menu toggle
 *  - FAQ accordion
 *  - Smooth scroll
 *  - Language switching
 *  - Active nav link
 */
(function () {
  'use strict';

  /* ============================================================
     Mobile Menu Toggle
     ============================================================ */
  function initMobileMenu() {
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMobileMenu();
        hamburger.focus();
      }
    });

    // Close when a mobile menu link is clicked
    var mobileLinks = mobileMenu.querySelectorAll('a');
    for (var i = 0; i < mobileLinks.length; i++) {
      mobileLinks[i].addEventListener('click', function () {
        closeMobileMenu();
      });
    }

    function openMobileMenu() {
      mobileMenu.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      // Move focus to first link
      var firstLink = mobileMenu.querySelector('a');
      if (firstLink) firstLink.focus();
    }

    function closeMobileMenu() {
      mobileMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  /* ============================================================
     FAQ Accordion
     ============================================================ */
  function initFAQAccordion() {
    var faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');
      if (!question || !answer) return;

      question.addEventListener('click', function () {
        var isExpanded = question.getAttribute('aria-expanded') === 'true';
        // Close all other items
        faqItems.forEach(function (other) {
          if (other !== item) {
            var otherQ = other.querySelector('.faq-question');
            var otherA = other.querySelector('.faq-answer');
            if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
            if (otherA) otherA.setAttribute('aria-hidden', 'true');
          }
        });
        // Toggle current item
        var next = !isExpanded;
        question.setAttribute('aria-expanded', String(next));
        answer.setAttribute('aria-hidden', String(!next));
      });

      // Keyboard: Enter / Space
      question.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  }

  /* ============================================================
     Smooth Scroll
     ============================================================ */
  function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var headerHeight = 64; // matches --header-height
        var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
        // Move focus to target for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  }

  /* ============================================================
     Language Switching
     ============================================================ */
  function initLangSwitcher() {
    // Desktop + mobile buttons
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-lang-btn]');
      if (!btn) return;
      var lang = btn.getAttribute('data-lang-btn');
      if (window.I18n) {
        window.I18n.switchLang(lang);
      }
    });
  }

  /* ============================================================
     Active Navigation Link
     ============================================================ */
  function initActiveNav() {
    var currentPath = window.location.pathname;
    var allNavLinks = document.querySelectorAll('.site-nav__link, .mobile-menu__link');
    allNavLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      // Normalise paths for comparison
      var linkPath = new URL(link.href, window.location.href).pathname;
      // Root index
      var isHome = (currentPath === '/' || currentPath.endsWith('/index.html')) &&
                   (linkPath === '/' || linkPath.endsWith('/index.html'));
      var isMatch = linkPath === currentPath || (isHome);
      if (isMatch) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ============================================================
     Header scroll shadow
     ============================================================ */
  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var scrolled = false;
    window.addEventListener('scroll', function () {
      var shouldScroll = window.pageYOffset > 10;
      if (shouldScroll !== scrolled) {
        scrolled = shouldScroll;
        header.style.boxShadow = scrolled
          ? '0 4px 16px rgba(0,0,0,0.15)'
          : '0 2px 8px rgba(0,0,0,0.1)';
      }
    }, { passive: true });
  }

  /* ============================================================
     Initialise
     ============================================================ */
  function init() {
    initMobileMenu();
    initFAQAccordion();
    initSmoothScroll();
    initLangSwitcher();
    initActiveNav();
    initHeaderScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
