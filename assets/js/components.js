/**
 * components.js — Shared header & footer injection
 * Reads data-base-path attribute from <body> to resolve links correctly
 * relative to the current page location.
 */
(function () {
  'use strict';

  var base = document.body.getAttribute('data-base-path') || './';

  /* ============================================================
     Header Template
     ============================================================ */
  var headerHTML = [
    '<a class="skip-link" href="#main-content" data-i18n="nav.home">Skip to main content</a>',
    '<header class="site-header" role="banner">',
    '  <div class="header-inner">',
    '    <a href="' + base + 'index.html" class="site-logo" aria-label="Karaoke Manekineko - Home">',
    '      <span class="site-logo__icon" aria-hidden="true">&#127176;</span>',
    '      <span class="site-logo__text">Manekineko<span class="site-logo__sub">KARAOKE</span></span>',
    '    </a>',
    '    <nav class="site-nav" aria-label="Main navigation">',
    '      <ul class="site-nav__list" role="list">',
    '        <li><a class="site-nav__link" href="' + base + 'index.html" data-i18n="nav.home">Home</a></li>',
    '        <li><a class="site-nav__link" href="' + base + 'pages/menu.html" data-i18n="nav.menu">Menu</a></li>',
    '        <li><a class="site-nav__link" href="' + base + 'pages/stores.html" data-i18n="nav.stores">Stores</a></li>',
    '        <li><a class="site-nav__link" href="' + base + 'pages/service.html" data-i18n="nav.service">Services</a></li>',
    '        <li><a class="site-nav__link" href="' + base + 'pages/ebo.html" data-i18n="nav.ebo">E-bo</a></li>',
    '        <li><a class="site-nav__link" href="' + base + 'pages/raibo.html" data-i18n="nav.raibo">Raibo</a></li>',
    '        <li><a class="site-nav__link" href="' + base + 'pages/faq.html" data-i18n="nav.faq">FAQ</a></li>',
    '      </ul>',
    '    </nav>',
    '    <div class="lang-switcher" role="group" aria-label="Language selection">',
    '      <button class="lang-switcher__btn" data-lang-btn="en" aria-pressed="true">EN</button>',
    '      <button class="lang-switcher__btn" data-lang-btn="ko" aria-pressed="false">KO</button>',
    '      <button class="lang-switcher__btn" data-lang-btn="zh-Hant" aria-pressed="false">繁</button>',
    '      <button class="lang-switcher__btn" data-lang-btn="zh-Hans" aria-pressed="false">简</button>',
    '    </div>',
    '    <button class="hamburger" id="hamburger" aria-expanded="false" aria-controls="mobile-menu"',
    '            data-i18n-aria="nav.openMenu" aria-label="Open navigation menu">',
    '      <span class="hamburger__line" aria-hidden="true"></span>',
    '      <span class="hamburger__line" aria-hidden="true"></span>',
    '      <span class="hamburger__line" aria-hidden="true"></span>',
    '    </button>',
    '  </div>',
    '</header>',
    '<nav class="mobile-menu" id="mobile-menu" aria-label="Mobile navigation" aria-hidden="true">',
    '  <a class="mobile-menu__link" href="' + base + 'index.html" data-i18n="nav.home">Home</a>',
    '  <a class="mobile-menu__link" href="' + base + 'pages/menu.html" data-i18n="nav.menu">Menu</a>',
    '  <a class="mobile-menu__link" href="' + base + 'pages/stores.html" data-i18n="nav.stores">Stores</a>',
    '  <a class="mobile-menu__link" href="' + base + 'pages/service.html" data-i18n="nav.service">Services</a>',
    '  <a class="mobile-menu__link" href="' + base + 'pages/ebo.html" data-i18n="nav.ebo">E-bo</a>',
    '  <a class="mobile-menu__link" href="' + base + 'pages/raibo.html" data-i18n="nav.raibo">Raibo</a>',
    '  <a class="mobile-menu__link" href="' + base + 'pages/faq.html" data-i18n="nav.faq">FAQ</a>',
    '  <div class="mobile-menu__langs" role="group" aria-label="Language selection">',
    '    <button class="lang-switcher__btn" data-lang-btn="en" aria-pressed="true">English</button>',
    '    <button class="lang-switcher__btn" data-lang-btn="ko" aria-pressed="false">한국어</button>',
    '    <button class="lang-switcher__btn" data-lang-btn="zh-Hant" aria-pressed="false">繁體中文</button>',
    '    <button class="lang-switcher__btn" data-lang-btn="zh-Hans" aria-pressed="false">简体中文</button>',
    '  </div>',
    '</nav>'
  ].join('\n');

  /* ============================================================
     Footer Template
     ============================================================ */
  var footerHTML = [
    '<footer class="site-footer" role="contentinfo">',
    '  <div class="container">',
    '    <div class="footer-grid">',
    '      <div class="footer-brand">',
    '        <a href="' + base + 'index.html" class="footer-brand__logo" aria-label="Karaoke Manekineko - Home">',
    '          <span class="footer-brand__logo-icon" aria-hidden="true">&#127176;</span>',
    '          <span class="footer-brand__logo-text">Manekineko KARAOKE</span>',
    '        </a>',
    '        <p class="footer-brand__desc" data-i18n="footer.description">Japan\'s premier karaoke experience for international visitors.</p>',
    '      </div>',
    '      <div class="footer-col">',
    '        <h3 class="footer-col__title" data-i18n="footer.quickLinks">Quick Links</h3>',
    '        <ul class="footer-col__links" role="list">',
    '          <li><a class="footer-col__link" href="' + base + 'index.html" data-i18n="nav.home">Home</a></li>',
    '          <li><a class="footer-col__link" href="' + base + 'pages/menu.html" data-i18n="nav.menu">Menu</a></li>',
    '          <li><a class="footer-col__link" href="' + base + 'pages/stores.html" data-i18n="nav.stores">Stores</a></li>',
    '          <li><a class="footer-col__link" href="' + base + 'pages/faq.html" data-i18n="nav.faq">FAQ</a></li>',
    '        </ul>',
    '      </div>',
    '      <div class="footer-col">',
    '        <h3 class="footer-col__title" data-i18n="footer.services">Services</h3>',
    '        <ul class="footer-col__links" role="list">',
    '          <li><a class="footer-col__link" href="' + base + 'pages/service.html" data-i18n="nav.service">Services</a></li>',
    '          <li><a class="footer-col__link" href="' + base + 'pages/ebo.html" data-i18n="nav.ebo">E-bo</a></li>',
    '          <li><a class="footer-col__link" href="' + base + 'pages/raibo.html" data-i18n="nav.raibo">Raibo</a></li>',
    '        </ul>',
    '      </div>',
    '      <div class="footer-col">',
    '        <h3 class="footer-col__title" data-i18n="footer.contact">Contact</h3>',
    '        <ul class="footer-col__links" role="list">',
    '          <li><span class="footer-col__link" data-i18n="footer.address">Manekineko Co., Ltd.</span></li>',
    '        </ul>',
    '      </div>',
    '    </div>',
    '    <div class="footer-bottom">',
    '      <span data-i18n="footer.copyright">&copy; 2024 Karaoke Manekineko. All rights reserved.</span>',
    '      <nav class="footer-bottom__links" aria-label="Legal">',
    '        <a class="footer-bottom__link" href="#" data-i18n="footer.privacy">Privacy Policy</a>',
    '        <a class="footer-bottom__link" href="#" data-i18n="footer.terms">Terms of Service</a>',
    '      </nav>',
    '    </div>',
    '  </div>',
    '</footer>'
  ].join('\n');

  /* ============================================================
     Inject Components
     ============================================================ */
  var headerEl = document.getElementById('header-placeholder');
  var footerEl = document.getElementById('footer-placeholder');

  if (headerEl) headerEl.innerHTML = headerHTML;
  if (footerEl) footerEl.innerHTML = footerHTML;
})();
