/* Carlos Riviera — portfolio interactions (no dependencies) */
(function () {
  "use strict";


  const gallery = document.getElementById("gallery");
  const shots = Array.from(gallery.querySelectorAll(".shot"));

  /* ---------- Retry an image once if the host hiccups ---------- */
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function retry() {
      img.removeEventListener("error", retry);
      const src = img.getAttribute("src");
      if (!src) return;
      img.removeAttribute("srcset");
      img.src = src + (src.includes("?") ? "&" : "?") + "retry=1";
    });
  });

  /* ---------- Mobile menu ---------- */
  const header = document.querySelector(".site-header");
  const menuToggle = header.querySelector(".menu-toggle");
  const menuLabel = menuToggle.querySelector(".menu-toggle__label");

  function setMenu(open) {
    header.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuLabel.textContent = open ? "Close" : "Menu";
  }

  menuToggle.addEventListener("click", () => {
    setMenu(!header.classList.contains("is-open"));
  });

  // Close after choosing a link, on Escape, or on a tap outside the header
  header.querySelectorAll(".site-nav a").forEach((a) =>
    a.addEventListener("click", () => setMenu(false))
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header.classList.contains("is-open")) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (header.classList.contains("is-open") && !header.contains(e.target)) setMenu(false);
  });

  window.matchMedia("(min-width: 640px)").addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });

  /* ---------- Current section in nav ---------- */
  const navLinks = Array.from(document.querySelectorAll(".nav a:not(.nav__book)"));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((a) =>
            a.classList.toggle("is-current", a.getAttribute("href") === "#" + entry.target.id)
          );
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => navObserver.observe(s));
  }

  /* ---------- Filters ---------- */
  const filters = Array.from(document.querySelectorAll(".filter"));

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.filter;
      filters.forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      gallery.classList.toggle("is-filtered", cat !== "all");
      shots.forEach((shot) => {
        shot.hidden = cat !== "all" && shot.dataset.cat !== cat;
      });
    });
  });

  /* ---------- Lightbox ---------- */
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  const lbTitle = document.getElementById("lb-title");
  const lbMeta = document.getElementById("lb-meta");
  const lbIndex = document.getElementById("lb-index");
  const lbTotal = document.getElementById("lb-total");
  let current = 0;
  let lastTrigger = null;

  const visibleShots = () => shots.filter((s) => !s.hidden);

  function show(i) {
    const list = visibleShots();
    current = (i + list.length) % list.length;
    const shot = list[current];
    const thumb = shot.querySelector("img");
    const full = shot.querySelector(".shot__open").dataset.full;

    // Show the already-loaded grid image instantly, then swap in the large file
    lbImg.classList.add("is-loading");
    lbImg.src = thumb.currentSrc || thumb.src;
    lbImg.alt = thumb.alt;
    const hi = new Image();
    hi.onload = () => {
      if (list[current] === shot) {
        lbImg.src = full;
        lbImg.classList.remove("is-loading");
      }
    };
    hi.src = full;

    lbTitle.textContent = shot.querySelector(".shot__title").textContent;
    lbMeta.textContent = shot.querySelector(".shot__meta").textContent;
    lbIndex.textContent = current + 1;
    lbTotal.textContent = list.length;

    // Warm the neighbours
    [current + 1, current - 1].forEach((n) => {
      const s = list[(n + list.length) % list.length];
      new Image().src = s.querySelector(".shot__open").dataset.full;
    });
  }

  function open(shot) {
    lastTrigger = shot.querySelector(".shot__open");
    show(visibleShots().indexOf(shot));
    if (typeof lb.showModal === "function") {
      lb.showModal();
    } else {
      lb.setAttribute("open", "");
    }
    lb.querySelector("[data-close]").focus();
  }

  function close() {
    if (typeof lb.close === "function") lb.close();
    else lb.removeAttribute("open");
  }

  shots.forEach((shot) => {
    const trigger = shot.querySelector(".shot__open");
    const title = shot.querySelector(".shot__title").textContent;
    trigger.setAttribute("aria-label", "View full image: " + title);
    trigger.addEventListener("click", () => open(shot));
  });

  lb.addEventListener("close", () => {
    lbImg.removeAttribute("src");
    if (lastTrigger) lastTrigger.focus();
  });

  lb.querySelector("[data-close]").addEventListener("click", close);
  lb.querySelector("[data-prev]").addEventListener("click", () => show(current - 1));
  lb.querySelector("[data-next]").addEventListener("click", () => show(current + 1));

  // Click on the dark surround (not the image or controls) closes
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target.classList.contains("lightbox__figure")) close();
  });

  lb.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") show(current + 1);
    if (e.key === "ArrowLeft") show(current - 1);
  });

  // Swipe on touch screens
  let touchX = null;
  lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ---------- Book a shoot links ---------- */
  const form = document.getElementById("contact-form");
  const typeSelect = document.getElementById("f-type");

  document.querySelectorAll("[data-book]").forEach((link) => {
    link.addEventListener("click", () => {
      typeSelect.value = "Shoot booking";
      // Focus after the smooth scroll has had time to land
      window.setTimeout(() => document.getElementById("f-name").focus({ preventScroll: true }), 650);
    });
  });

  /* ---------- Contact form ---------- */
  // No backend: validate, then open the visitor's mail app with everything filled in.
  const status = document.getElementById("form-status");
  const to = form.getAttribute("action").replace("mailto:", "");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let firstBad = null;

    form.querySelectorAll("[required]").forEach((field) => {
      const ok = field.value.trim() !== "" && field.checkValidity();
      field.closest(".field").classList.toggle("is-invalid", !ok);
      field.setAttribute("aria-invalid", String(!ok));
      if (!ok && !firstBad) firstBad = field;
    });

    if (firstBad) {
      status.textContent = "Please add your name, a valid email and a short message.";
      status.classList.add("is-error");
      firstBad.focus();
      return;
    }

    const data = new FormData(form);
    const subject = `${data.get("enquiry")} — ${data.get("name")}`;
    const lines = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Enquiry: ${data.get("enquiry")}`,
      data.get("date") ? `Preferred date: ${data.get("date")}` : null,
      "",
      data.get("message"),
    ].filter((l) => l !== null);

    window.location.href =
      `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;

    status.classList.remove("is-error");
    status.textContent = "Thanks. Your email app should open with the message ready to send.";
  });

  form.addEventListener("input", (e) => {
    const field = e.target.closest(".field");
    if (field && field.classList.contains("is-invalid") && e.target.checkValidity() && e.target.value.trim()) {
      field.classList.remove("is-invalid");
      e.target.setAttribute("aria-invalid", "false");
    }
  });
})();
