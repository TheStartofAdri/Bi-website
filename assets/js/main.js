/* ============================================================
   Спутник веры — sputnikvery.com
   Лёгкий Vanilla JS. Без cookies, без аналитики, без зависимостей.
   ============================================================ */

/* ------------------------------------------------------------
   КОНФИГУРАЦИЯ САЙТА
   Когда появится реальная ссылка App Store, замените значение
   appStoreUrl ЗДЕСЬ — больше нигде менять не нужно.
   Пример: appStoreUrl: "https://apps.apple.com/app/id1234567890"
   ------------------------------------------------------------ */
const SITE_CONFIG = {
  appStoreUrl: "APP_STORE_URL",
  supportEmail: "support@sputnikvery.com",
  domain: "https://sputnikvery.com",
  appName: "Спутник веры"
};

(function () {
  "use strict";

  /* --- Кнопки App Store ---------------------------------------
     В разметке кнопки по умолчанию отключены («Скоро в App Store»).
     Если в SITE_CONFIG указана реальная ссылка, кнопки становятся
     активными. Пока стоит заглушка APP_STORE_URL — ничего не ломается. */
  function initAppStoreButtons() {
    var configured =
      SITE_CONFIG.appStoreUrl &&
      SITE_CONFIG.appStoreUrl !== "APP_STORE_URL" &&
      SITE_CONFIG.appStoreUrl.indexOf("http") === 0;

    document.querySelectorAll("[data-appstore]").forEach(function (btn) {
      if (configured) {
        btn.setAttribute("href", SITE_CONFIG.appStoreUrl);
        btn.setAttribute("rel", "noopener");
        btn.removeAttribute("aria-disabled");
        btn.removeAttribute("role");
        btn.textContent = "Скачать в App Store";
      } else {
        btn.textContent = "Скоро в App Store";
        btn.setAttribute("aria-disabled", "true");
        btn.removeAttribute("href");
      }
    });
  }

  /* --- Мобильное меню ---------------------------------------- */
  function initMobileMenu() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Открыть меню");
    }

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        close();
        toggle.focus();
      }
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) close();
    });

    document.addEventListener("click", function (e) {
      if (
        nav.classList.contains("is-open") &&
        !nav.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        close();
      }
    });
  }

  /* --- Аккордеоны (FAQ и центр помощи) ------------------------ */
  function initAccordions() {
    document.querySelectorAll(".accordion-trigger").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var expanded = trigger.getAttribute("aria-expanded") === "true";
        var panel = document.getElementById(
          trigger.getAttribute("aria-controls")
        );
        if (!panel) return;
        trigger.setAttribute("aria-expanded", expanded ? "false" : "true");
        panel.hidden = expanded;
      });
    });
  }

  /* --- Поиск по центру помощи --------------------------------- */
  function initHelpSearch() {
    var input = document.getElementById("help-search");
    if (!input) return;

    var articles = Array.prototype.slice.call(
      document.querySelectorAll(".help-category .accordion-item")
    );
    var categories = Array.prototype.slice.call(
      document.querySelectorAll(".help-category")
    );
    var empty = document.getElementById("help-empty");

    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      var visibleTotal = 0;

      articles.forEach(function (item) {
        var match = !q || item.textContent.toLowerCase().indexOf(q) !== -1;
        item.hidden = !match;
        if (match) visibleTotal++;
      });

      categories.forEach(function (cat) {
        var any = cat.querySelector(".accordion-item:not([hidden])");
        cat.hidden = !any;
      });

      if (empty) empty.hidden = visibleTotal !== 0;
    });
  }

  /* --- Заглушки для отсутствующих скриншотов ------------------ */
  function initScreenshotFallbacks() {
    document.querySelectorAll(".shot-frame img").forEach(function (img) {
      function markMissing() {
        var frame = img.closest(".shot-frame");
        if (frame) frame.classList.add("is-missing");
      }
      if (img.complete && img.naturalWidth === 0) {
        markMissing();
      } else {
        img.addEventListener("error", markMissing);
      }
    });
  }

  /* --- Email из конфигурации ---------------------------------- */
  function initEmailLinks() {
    document.querySelectorAll("[data-support-email]").forEach(function (el) {
      el.textContent = SITE_CONFIG.supportEmail;
      if (el.tagName === "A") {
        var href = el.getAttribute("href") || "";
        var suffix = href.indexOf("?") !== -1 ? href.slice(href.indexOf("?")) : "";
        el.setAttribute("href", "mailto:" + SITE_CONFIG.supportEmail + suffix);
      }
    });
  }

  /* --- Текущий год в подвале ---------------------------------- */
  function initYear() {
    var year = new Date().getFullYear();
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = String(year);
    });
  }

  function init() {
    initAppStoreButtons();
    initMobileMenu();
    initAccordions();
    initHelpSearch();
    initScreenshotFallbacks();
    initEmailLinks();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
