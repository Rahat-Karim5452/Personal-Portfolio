/* ======================= FOOTER YEAR ======================= */
document.getElementById("year").textContent = new Date().getFullYear();

/* ======================= CURSOR SPOTLIGHT ======================= */
// cursor-reactive spotlight
const spot = document.getElementById("spotlight");
window.addEventListener("mousemove", (e) => {
  spot.style.setProperty("--x", e.clientX + "px");
  spot.style.setProperty("--y", e.clientY + "px");
});

/* ======================= PARTICLE FIELD ======================= */
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

/* ======================= HERO: ROLE CYCLING TEXT ======================= */
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

/* ======================= HERO: PHOTO TILT EFFECT ======================= */
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

/* ======================= FOOTER: BACK TO TOP BUTTON ======================= */
// back to top
document.getElementById("backToTop")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ======================= CONTACT FORM SUBMISSION ======================= */
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

/* ======================= SCROLL REVEAL ANIMATION ======================= */
const revealTargets = document.querySelectorAll(
  ".layer, .card, .service-card, .tool-card, .stat, .about-text, .sec-head, .contact-think, .contact-form, .tour-video, .tour-info",
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
