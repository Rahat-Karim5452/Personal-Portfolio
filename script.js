/* ==========================================================================
   RAHAT — FULL STACK DEVELOPER PORTFOLIO
   Main JavaScript
   ==========================================================================
   Table of contents:
   1. Footer year
   2. Night mode (theme) toggle
   3. Mid-page "story flyer" parachute positioning
   4. Cursor-reactive spotlight glow
   5. Drifting particle field generator
   6. Hero role-cycling text
   7. Hero photo tilt effect
   8. Back-to-top button
   9. Mobile navigation toggle
   10. Contact form (opens pre-filled email)
   11. Scroll-reveal animations (IntersectionObserver)
   ========================================================================== */

/* --------------------------------------------------------------------
   1. FOOTER YEAR — auto-fill the current year in the copyright line
   -------------------------------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* --------------------------------------------------------------------
   2. NIGHT MODE TOGGLE
   Switches the `night` class on <html> (which swaps CSS variables),
   remembers the choice in localStorage, and syncs the toggle button's
   aria-pressed state for accessibility.
   -------------------------------------------------------------------- */
(function () {
  const root = document.documentElement;
  const toggles = [document.getElementById("themeToggle")].filter(Boolean);
  const stored = localStorage.getItem("theme");

  const setNight = (on) => {
    root.classList.toggle("night", on);
    toggles.forEach((btn) => btn.setAttribute("aria-pressed", String(on)));
    localStorage.setItem("theme", on ? "night" : "default");
  };

  // Restore the saved theme on page load
  setNight(stored === "night");

  // Toggle theme whenever the sun/moon button is clicked
  toggles.forEach((btn) => {
    btn.addEventListener("click", () =>
      setNight(!root.classList.contains("night")),
    );
  });
})();

/* --------------------------------------------------------------------
   3. STORY FLYER POSITIONING
   Positions the mid-page decorative parachute graphic so it visually
   travels from the "Services I offer" heading up to "A short version
   of my story" (recalculated on load/resize since section positions
   depend on viewport width).
   -------------------------------------------------------------------- */
function positionStoryFlyer() {
  const flyer = document.querySelector(".story-flyer");
  const aboutWrap = document.querySelector("#about .wrap");
  const servicesWrap = document.querySelector("#services .wrap");
  if (!flyer || !aboutWrap || !servicesWrap) return;

  const scrollY = window.scrollY || window.pageYOffset;
  const startTop = servicesWrap.getBoundingClientRect().top + scrollY;
  const endTop = aboutWrap.getBoundingClientRect().top + scrollY;
  const distance = startTop - endTop;

  flyer.style.top = startTop + "px";
  flyer.style.setProperty("--story-distance", distance + "px");
}
positionStoryFlyer();
window.addEventListener("load", positionStoryFlyer);
window.addEventListener("resize", positionStoryFlyer);

/* --------------------------------------------------------------------
   4. CURSOR-REACTIVE SPOTLIGHT
   Tracks the mouse position and feeds it into CSS custom properties
   (--x / --y) so the .spotlight radial-gradient follows the cursor.
   -------------------------------------------------------------------- */
const spot = document.getElementById("spotlight");
window.addEventListener("mousemove", (e) => {
  spot.style.setProperty("--x", e.clientX + "px");
  spot.style.setProperty("--y", e.clientY + "px");
});

/* --------------------------------------------------------------------
   5. DRIFTING PARTICLE FIELD
   Dynamically generates a set of small "particle" spans with randomized
   size, position, drift distance, animation duration/delay and opacity,
   giving each page load a slightly different ambient background.
   -------------------------------------------------------------------- */
const field = document.getElementById("particles");
if (field) {
  const COUNT = 22;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement("span");
    p.className = "particle";

    const size = (Math.random() * 3 + 1.5).toFixed(1);
    const left = (Math.random() * 100).toFixed(1);
    const duration = (Math.random() * 14 + 14).toFixed(1);
    const delay = (Math.random() * -28).toFixed(1);
    const drift = (Math.random() * 70 - 35).toFixed(0);
    const opacity = (Math.random() * 0.4 + 0.3).toFixed(2);

    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.left = left + "%";
    p.style.setProperty("--drift", drift + "px");
    p.style.animationDuration = duration + "s";
    p.style.animationDelay = delay + "s";
    p.style.opacity = opacity;

    field.appendChild(p);
  }
}

/* --------------------------------------------------------------------
   6. HERO ROLE-CYCLING TEXT
   Fades between different job-title strings in the hero heading on a
   timer, to show off multiple roles/skills in one spot.
   -------------------------------------------------------------------- */
const roles = [
  "full stack developer",
  "frontend engineer",
  "backend engineer",
  "problem solver",
];
const roleEl = document.querySelector(".role-cycle");
let ri = 0;
if (roleEl) {
  setInterval(() => {
    ri = (ri + 1) % roles.length;
    roleEl.style.opacity = 0;
    setTimeout(() => {
      roleEl.innerHTML = roles[ri] + ".";
      roleEl.style.opacity = 1;
    }, 250);
  }, 2800);
  roleEl.style.transition = "opacity .25s";
}

/* --------------------------------------------------------------------
   7. HERO PHOTO TILT EFFECT
   Applies a subtle 3D tilt to the profile photo frame based on cursor
   position within its wrapper, resetting when the mouse leaves.
   -------------------------------------------------------------------- */
const frame = document.querySelector(".photo-frame");
const wrap = document.querySelector(".hero-photo-wrap");
if (frame && wrap) {
  wrap.addEventListener("mousemove", (e) => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    frame.style.transform = `rotate(-2deg) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  wrap.addEventListener("mouseleave", () => {
    frame.style.transform = "rotate(-2deg)";
  });
}

/* --------------------------------------------------------------------
   8. BACK-TO-TOP BUTTON
   Smoothly scrolls the page back to the top when clicked.
   -------------------------------------------------------------------- */
document.getElementById("backToTop")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* --------------------------------------------------------------------
   9. MOBILE NAVIGATION TOGGLE
   Opens/closes the mobile nav panel, keeps aria-expanded in sync,
   locks body scroll while open, closes on link click, and auto-closes
   if the viewport is resized back to desktop width.
   -------------------------------------------------------------------- */
const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");
if (navToggle && mobileNav) {
  const closeMobileNav = () => {
    navToggle.classList.remove("open");
    mobileNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };
  const openMobileNav = () => {
    navToggle.classList.add("open");
    mobileNav.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.contains("open");
    isOpen ? closeMobileNav() : openMobileNav();
  });

  // Close the panel whenever a nav link is clicked
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  // Auto-close if the window is resized back to desktop width
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMobileNav();
  });
}

/* --------------------------------------------------------------------
   10. CONTACT FORM
   Since this is a static page with no backend, the form is intercepted
   on submit and instead opens the visitor's email client with a
   pre-filled subject/body containing their form data.
   -------------------------------------------------------------------- */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(contactForm);
    const first = (fd.get("firstName") || "").trim();
    const last = (fd.get("lastName") || "").trim();
    const email = (fd.get("email") || "").trim();
    const phone = (fd.get("phone") || "").trim();
    const country = (fd.get("country") || "").trim();
    const message = (fd.get("message") || "").trim();

    const subject = encodeURIComponent(
      `New project inquiry from ${first} ${last}`,
    );
    const body = encodeURIComponent(
      `Name: ${first} ${last}\nEmail: ${email}\nPhone: ${phone}\nCountry: ${country}\n\nMessage:\n${message || "(no message provided)"}`,
    );

    window.location.href = `mailto:rahatkarim5452@gmail.com?subject=${subject}&body=${body}`;

    if (formStatus) {
      formStatus.textContent = "Opening your email app to send this…";
      formStatus.classList.add("ok");
    }
  });
}

/* --------------------------------------------------------------------
   11. SCROLL-REVEAL ANIMATIONS
   Hides key content blocks by default (opacity 0, shifted down 24px),
   then uses an IntersectionObserver to fade + slide each one into view
   the first time it scrolls into the viewport.
   -------------------------------------------------------------------- */
const revealTargets = document.querySelectorAll(
  ".layer, .card, .service-card, .tool-card, .stat, .about-text, .sec-head, .contact-think, .contact-form, .tour-video, .tour-info, .footer-cta-inner",
);
revealTargets.forEach((el) => {
  el.style.opacity = 0;
  el.style.transform = "translateY(24px)";
  el.style.transition = "opacity .6s ease, transform .6s ease";
});

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        io.unobserve(entry.target); // only animate once
      }
    });
  },
  { threshold: 0.15 },
);

revealTargets.forEach((el) => io.observe(el));
