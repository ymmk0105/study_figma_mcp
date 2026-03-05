/**
 * i18n.js — Internationalization module
 * Supports: en, ko, zh-Hant, zh-Hans
 * Persistence: localStorage
 * URL override: ?lang=en | ?lang=ko | ?lang=zh-Hant | ?lang=zh-Hans
 */
(function () {
  'use strict';

  var SUPPORTED_LANGS = ['en', 'ko', 'zh-Hant', 'zh-Hans'];
  var DEFAULT_LANG = 'en';
  var STORAGE_KEY = 'manekineko_lang';
  var cachedTranslations = null;

  /**
   * Determine the asset base path relative to current page location.
   */
  function getBasePath() {
    var path = window.location.pathname;
    // If we are inside /pages/ directory, go up one level
    if (path.indexOf('/pages/') !== -1) {
      return '../';
    }
    return './';
  }

  /**
   * Get the current language from URL param > localStorage > browser preference > default.
   */
  function getLang() {
    var params = new URLSearchParams(window.location.search);
    var urlLang = params.get('lang');
    if (urlLang && SUPPORTED_LANGS.indexOf(urlLang) !== -1) {
      return urlLang;
    }
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.indexOf(stored) !== -1) {
      return stored;
    }
    // Browser language detection
    var browserLang = (navigator.language || '').toLowerCase();
    if (browserLang === 'ko' || browserLang.startsWith('ko-')) return 'ko';
    if (browserLang === 'zh-tw' || browserLang === 'zh-hk' || browserLang === 'zh-hant') return 'zh-Hant';
    if (browserLang === 'zh-cn' || browserLang === 'zh-hans' || browserLang === 'zh') return 'zh-Hans';
    return DEFAULT_LANG;
  }

  /**
   * Resolve a dot-notation key (e.g. "hero.title") into a value from the translation object.
   */
  function resolveKey(obj, key) {
    var parts = key.split('.');
    var value = obj;
    for (var i = 0; i < parts.length; i++) {
      if (value == null) return null;
      value = value[parts[i]];
    }
    return typeof value === 'string' ? value : null;
  }

  /**
   * Apply translations to all [data-i18n] elements.
   * Also updates [data-i18n-placeholder] and [data-i18n-aria-label].
   */
  function applyTranslations(translations, lang) {
    var t = translations[lang] || translations[DEFAULT_LANG];
    if (!t) return;

    // Text content
    var elements = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var key = el.getAttribute('data-i18n');
      var value = resolveKey(t, key);
      if (value !== null) el.textContent = value;
    }

    // Placeholder attribute
    var placeholderEls = document.querySelectorAll('[data-i18n-placeholder]');
    for (var j = 0; j < placeholderEls.length; j++) {
      var pEl = placeholderEls[j];
      var pKey = pEl.getAttribute('data-i18n-placeholder');
      var pValue = resolveKey(t, pKey);
      if (pValue !== null) pEl.setAttribute('placeholder', pValue);
    }

    // aria-label attribute
    var ariaEls = document.querySelectorAll('[data-i18n-aria]');
    for (var k = 0; k < ariaEls.length; k++) {
      var aEl = ariaEls[k];
      var aKey = aEl.getAttribute('data-i18n-aria');
      var aValue = resolveKey(t, aKey);
      if (aValue !== null) aEl.setAttribute('aria-label', aValue);
    }

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Persist to localStorage
    localStorage.setItem(STORAGE_KEY, lang);

    // Update active state on language switcher buttons
    updateLangSwitcherUI(lang);

    // Dispatch event so other modules can react
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  /**
   * Update visual state of language switcher buttons.
   */
  function updateLangSwitcherUI(lang) {
    var buttons = document.querySelectorAll('[data-lang-btn]');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      if (btn.getAttribute('data-lang-btn') === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    }
  }

  /**
   * Switch to a new language.
   */
  function switchLang(lang) {
    if (SUPPORTED_LANGS.indexOf(lang) === -1) return;
    if (!cachedTranslations) return;
    applyTranslations(cachedTranslations, lang);
  }

  /**
   * Load translations.json and initialise i18n.
   */
  function init() {
    var basePath = getBasePath();
    var url = basePath + 'assets/i18n/translations.json';

    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load translations: ' + res.status);
        return res.json();
      })
      .then(function (data) {
        cachedTranslations = data;
        var lang = getLang();
        applyTranslations(cachedTranslations, lang);
      })
      .catch(function (err) {
        console.error('[i18n]', err);
      });
  }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose public API
  window.I18n = {
    init: init,
    switchLang: switchLang,
    getLang: getLang,
    supported: SUPPORTED_LANGS
  };
})();
