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

  // --- Copy email instead of opening a mail app --------------------------
  function fallbackCopy(text) {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "absolute";
    field.style.left = "-9999px";
    document.body.appendChild(field);
    field.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
    document.body.removeChild(field);
    return ok;
  }

  function confirmCopy(link) {
    const status = link.nextElementSibling;
    if (!status || !status.classList.contains("copy-status")) return;
    status.textContent = "Copied";
    window.clearTimeout(link._copyTimer);
    link._copyTimer = window.setTimeout(function () {
      status.textContent = "";
    }, 2000);
  }

  document.querySelectorAll("a.js-copy-email").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const email = (link.getAttribute("href") || "").replace(/^mailto:/i, "");
      if (!email) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          confirmCopy(link);
        }).catch(function () {
          if (fallbackCopy(email)) confirmCopy(link);
        });
      } else if (fallbackCopy(email)) {
        confirmCopy(link);
      }
    });
  });
})();
