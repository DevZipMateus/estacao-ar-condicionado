/* ============================================================
   ESTAÇÃO DO AR CONDICIONADO — SCRIPT.JS
   ============================================================ */

/* ── BARRA DE PROGRESSO ─────────────────────────────────────── */
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop  = window.pageYOffset;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = ((scrollTop / docHeight) * 100) + '%';
}, { passive: true });

/* ── PARTÍCULAS HERO ────────────────────────────────────────── */
(function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const colors = [
    'rgba(14,165,233,.35)',
    'rgba(56,189,248,.25)',
    'rgba(245,158,11,.2)',
    'rgba(255,255,255,.15)',
    'rgba(2,132,199,.3)',
  ];
  for (let i = 0; i < 20; i++) {
    const p    = document.createElement('div');
    const size = Math.random() * 6 + 2;
    p.className = 'hero-particle';
    p.style.cssText = [
      `left:${Math.random() * 100}%`,
      `top:${Math.random() * 100}%`,
      `width:${size}px`,
      `height:${size}px`,
      `background:${colors[Math.floor(Math.random() * colors.length)]}`,
      `animation-delay:${(Math.random() * 10).toFixed(2)}s`,
      `animation-duration:${(Math.random() * 10 + 8).toFixed(2)}s`,
    ].join(';');
    container.appendChild(p);
  }
})();

/* ── HEADER SCROLL ──────────────────────────────────────────── */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── MENU MOBILE ────────────────────────────────────────────── */
const menuToggle = document.getElementById('menuToggle');
const navMenu    = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');
const navClose   = document.getElementById('navClose');

function openMenu() {
  navMenu.classList.add('open');
  navOverlay.classList.add('active');
  menuToggle.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navMenu.classList.remove('open');
  navOverlay.classList.remove('active');
  menuToggle.classList.remove('active');
  document.body.style.overflow = '';
}

menuToggle.addEventListener('click', () =>
  navMenu.classList.contains('open') ? closeMenu() : openMenu()
);
navClose.addEventListener('click', closeMenu);
navOverlay.addEventListener('click', closeMenu);
navMenu.querySelectorAll('.nav-link, .nav-wpp-mob').forEach(l =>
  l.addEventListener('click', closeMenu)
);

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ── SMOOTH SCROLL ──────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  });
});

/* ── NAV LINK ATIVO ─────────────────────────────────────────── */
const sections    = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const top    = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < bottom) {
      allNavLinks.forEach(l => l.classList.remove('active'));
      allNavLinks.forEach(l => {
        if (l.getAttribute('href') === `#${id}`) l.classList.add('active');
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
