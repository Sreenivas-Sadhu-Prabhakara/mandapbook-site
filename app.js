/* MandapBook — tiny site interactions
   1) smooth-scroll for in-page anchors (with reduced-motion respect)
   2) sticky-nav shadow on scroll
   3) animated counters for the dashboard stats (on first view)
   4) signature widget: add a 3rd booking on 12 Dec -> fires over-capacity warning
*/
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- 1. smooth scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });

  /* ---- 2. sticky nav elevation ---- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.style.boxShadow = window.scrollY > 8
        ? "0 8px 24px -18px rgba(28,26,23,.5)"
        : "none";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- 3. animated counters ---- */
  function animateCount(el) {
    var raw = el.getAttribute("data-target");
    var target = parseFloat(raw);
    if (isNaN(target)) return;
    var prefix = el.getAttribute("data-prefix") || "";
    var isRupee = el.getAttribute("data-rupee") === "1";
    if (reduceMotion) { el.textContent = prefix + format(target, isRupee); return; }
    var dur = 1100, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      el.textContent = prefix + format(val, isRupee);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Indian digit grouping (lakh/crore style)
  function format(n, isRupee) {
    if (!isRupee) return String(n);
    var s = String(n);
    var last3 = s.slice(-3);
    var rest = s.slice(0, -3);
    if (rest) last3 = "," + last3;
    rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    return rest + last3;
  }

  var counters = document.querySelectorAll("[data-target]");
  if (counters.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { animateCount(en.target); io.unobserve(en.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (c) { io.observe(c); });
    } else {
      counters.forEach(animateCount);
    }
  }

  /* ---- 4. signature: collision widget ---- */
  var collide = document.getElementById("collide");
  var toggle = document.getElementById("collideToggle");
  var warn = document.getElementById("collideWarn");
  if (collide && toggle && warn) {
    var over = false;
    toggle.addEventListener("click", function () {
      over = !over;
      collide.classList.toggle("is-over", over);
      warn.hidden = !over;
      toggle.classList.toggle("is-active", over);
      toggle.textContent = over
        ? "Remove the 3rd booking"
        : "Add a 3rd booking on this date";
    });
  }
})();
