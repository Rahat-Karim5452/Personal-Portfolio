/* ================================================================
   Rahat — Full Stack Developer Portfolio
   Main JavaScript
   ================================================================ */

// ============================================
// SET CURRENT YEAR IN FOOTER
// ============================================
document.getElementById("year").textContent = new Date().getFullYear();

// ============================================
// NIGHT MODE TOGGLE
// Switches the site to a darker theme and
// remembers the choice in localStorage
// ============================================
// night mode toggle
(function () {
  const root = document.documentElement;
  const toggles = [document.getElementById("themeToggle")].filter(Boolean);
  const stored = localStorage.getItem("theme");
  const setNight = (on) => {
    root.classList.toggle("night", on);
    toggles.forEach((btn) => btn.setAttribute("aria-pressed", String(on)));
    localStorage.setItem("theme", on ? "night" : "default");
  };
  setNight(stored === "night");
  toggles.forEach((btn) => {
    btn.addEventListener("click", () =>
      setNight(!root.classList.contains("night")),
    );
  });
})();

// ============================================
// STORY FLYER POSITIONING
// Positions the parachute illustration so it travels
// between the Services and About sections
// ============================================
// position the mid-page parachute so it travels from "Services I offer"
// up to "A short version of my story" (right side of each section) so it travels from "Services I offer"
// up to "A short version of my story" (right side of each section)
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

// ============================================
// CURSOR SPOTLIGHT
// Moves a radial glow to follow the mouse cursor
// ============================================
// cursor-reactive spotlight
const spot = document.getElementById("spotlight");
window.addEventListener("mousemove", (e) => {
  spot.style.setProperty("--x", e.clientX + "px");
  spot.style.setProperty("--y", e.clientY + "px");
});

// ============================================
// BACKGROUND PARTICLE FIELD
// Creates floating decorative particles with random
// size, position, speed and opacity
// ============================================
// generate a drifting particle field
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

// ============================================
// ROLE CYCLING TEXT
// Fades between different job-title phrases in the hero
// ============================================
// role cycling text
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

// ============================================
// HERO PHOTO 3D TILT
// Tilts the profile photo based on cursor position
// ============================================
// subtle tilt on hero photo
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

// ============================================
// BACK TO TOP BUTTON
// ============================================
// back to top
document.getElementById("backToTop")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ============================================
// MOBILE NAVIGATION TOGGLE
// Opens/closes the mobile menu panel
// ============================================
// mobile nav toggle
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
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMobileNav();
  });
}

// ============================================
// CONTACT FORM SUBMISSION
// Builds a mailto link from the form fields since
// this is a static page with no backend
// ============================================
// contact form -> opens a pre-filled email (no backend on a static page)
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

// ============================================
// SCROLL-TRIGGERED REVEAL ANIMATIONS
// Fades/slides elements into view as the user scrolls
// using IntersectionObserver
// ============================================
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
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);
revealTargets.forEach((el) => io.observe(el));
