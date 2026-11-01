// ==========================================================================
// W. Ezekiel NACOULMA — Portfolio Script Principal (Vanilla JS moderne)
// ==========================================================================

// 1. Gestion du thème Sombre / Clair (synchronisé avec <meta name="color-scheme">)
const themeToggleBtn = document.getElementById("theme-toggle");
const colorSchemeMeta = document.querySelector('meta[name="color-scheme"]');

function applyTheme(theme) {
  const validTheme = theme === "light" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", validTheme);
  if (colorSchemeMeta) {
    colorSchemeMeta.content = validTheme;
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch (e) {}
  });
}

// Synchronisation multi-onglets
window.addEventListener("storage", (event) => {
  if (event.key === "theme" && event.newValue) {
    applyTheme(event.newValue);
  }
});

// 2. Menu Burger Mobile (accessible avec aria-expanded)
const burgerBtn = document.getElementById("burger-btn");
const navLinks = document.getElementById("nav-links");

function closeMobileMenu() {
  if (!burgerBtn || !navLinks) return;
  navLinks.classList.remove("open");
  burgerBtn.setAttribute("aria-expanded", "false");
}

if (burgerBtn && navLinks) {
  burgerBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    burgerBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("open")) {
      closeMobileMenu();
    }
  });
}

// 3. Mise en surbrillance de la section active dans la barre de navigation
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function highlightNav() {
  const scrollPos = window.scrollY + 140;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    if (scrollPos >= top && scrollPos < top + height) {
      navAnchors.forEach((anchor) => {
        anchor.classList.toggle(
          "active",
          anchor.getAttribute("href") === `#${id}`
        );
      });
    }
  });
}

window.addEventListener("scroll", highlightNav, { passive: true });
highlightNav();

// 4. Animations d'apparition fluides au défilement (IntersectionObserver)
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("is-visible"));
}

// 5. Modale Lightbox Native (<dialog closedby="any">) + Fallback Light-Dismiss
const lightboxDialog = document.getElementById("project-lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");

if (lightboxDialog && lightboxImg && lightboxTitle && lightboxCaption) {
  lightboxTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const imgSrc = trigger.getAttribute("data-img");
      const title = trigger.getAttribute("data-title") || "Aperçu du projet";
      const caption = trigger.getAttribute("data-caption") || "";

      if (imgSrc) {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = title;
      }
      lightboxTitle.textContent = title;
      lightboxCaption.textContent = caption;

      lightboxDialog.showModal();
    });
  });

  // Fallback pour les navigateurs ne supportant pas encore l'attribut closedby sur <dialog>
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    lightboxDialog.addEventListener("click", (event) => {
      if (event.target !== lightboxDialog) return;

      const rect = lightboxDialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (isDialogContent) return;

      lightboxDialog.close();
    });
  }
}

// 6. Copie de l'adresse email en un clic avec retour visuel
const copyEmailBtn = document.getElementById("copy-email-btn");
const copyEmailText = document.getElementById("copy-email-text");

if (copyEmailBtn && copyEmailText) {
  const defaultLabel = copyEmailText.textContent;
  copyEmailBtn.addEventListener("click", async () => {
    const email =
      copyEmailBtn.getAttribute("data-email") || "mnacoulmaezekiel@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      copyEmailText.textContent = "Adresse copiée !";
      setTimeout(() => {
        copyEmailText.textContent = defaultLabel;
      }, 2400);
    } catch (e) {
      window.location.href = `mailto:${email}`;
    }
  });
}

// 7. Mise à jour automatique de l'année dans le footer
const footerYear = document.getElementById("footer-year");
if (footerYear) {
  footerYear.textContent = String(new Date().getFullYear());
}
