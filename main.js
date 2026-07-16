// Minimal progressive enhancement: theme toggle, header state, scroll reveal.

(function () {
  const root = document.documentElement;
  const STORAGE_KEY = "eh-theme";

  // --- Theme -------------------------------------------------------------
  const stored = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initial);

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  // --- Sticky header border ---------------------------------------------
  const header = document.querySelector(".site-header");
  const onScroll = function () {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // --- Scroll reveal -----------------------------------------------------
  const reveals = document.querySelectorAll(".hero, .section");
  if ("IntersectionObserver" in window) {
    reveals.forEach(function (el) {
      el.setAttribute("data-animate", "");
    });
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  }

  // --- Footer year -------------------------------------------------------
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
