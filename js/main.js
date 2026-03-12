/* ══════════════════════════════════════════════════
   main.js — Portfolio Ángel Mota
   Requires: GSAP + ScrollTrigger (loaded via CDN)
══════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────
   SET INITIAL STATES via JS
   (content is visible if this script never runs)
───────────────────────────────────────────────── */
gsap.set('.hero .section-label', { opacity: 0, y: 18 });
gsap.set('.hero-line',           { clipPath: 'inset(0 100% 0 0)' });
gsap.set('.hero-sub',            { opacity: 0, y: 28 });
gsap.set('.hero-actions',        { opacity: 0, y: 18 });
gsap.set('.hero-scroll',         { opacity: 0 });

/* ─────────────────────────────────────────────────
   NAV — scroll behavior
───────────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─────────────────────────────────────────────────
   HERO — entrance animation (on page load)
───────────────────────────────────────────────── */
const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.15 });

heroTl
  .to('.hero .section-label', { opacity: 1, y: 0, duration: 0.65 })
  .to('.hero-line', {
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.05,
    stagger: 0.13
  }, '-=0.3')
  .to('.hero-sub',     { opacity: 1, y: 0, duration: 0.8 }, '-=0.55')
  .to('.hero-actions', { opacity: 1, y: 0, duration: 0.6 }, '-=0.45')
  .to('.hero-scroll',  { opacity: 1, duration: 0.5 },       '-=0.2');

/* ─────────────────────────────────────────────────
   SCROLL REVEALS — .reveal-fade
───────────────────────────────────────────────── */
gsap.utils.toArray('.reveal-fade').forEach(el => {
  if (el.closest('.hero')) return; // already handled above
  gsap.from(el, {
    opacity: 0,
    y: 16,
    duration: 0.65,
    ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 90%' }
  });
});

/* ─────────────────────────────────────────────────
   SCROLL REVEALS — .reveal-up
───────────────────────────────────────────────── */
gsap.utils.toArray('.reveal-up').forEach(el => {
  if (el.closest('.hero')) return;
  gsap.from(el, {
    opacity: 0,
    y: 55,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 86%' }
  });
});

/* ─────────────────────────────────────────────────
   STATS — counter animation
───────────────────────────────────────────────── */
gsap.utils.toArray('.counter').forEach(counter => {
  const target = parseInt(counter.dataset.target, 10);
  ScrollTrigger.create({
    trigger: counter,
    start: 'top 82%',
    once: true,
    onEnter: () => {
      const state = { val: 0 };
      gsap.to(state, {
        val: target,
        duration: 2.2,
        ease: 'power2.out',
        onUpdate() { counter.textContent = Math.round(state.val); }
      });
    }
  });
});

/* ─────────────────────────────────────────────────
   PROCESS steps — staggered
───────────────────────────────────────────────── */
const stepsSection = document.querySelector('.steps');
if (stepsSection) {
  const steps = stepsSection.querySelectorAll('.step');
  steps.forEach(s => s.classList.remove('reveal-up')); // avoid double
  gsap.from(steps, {
    opacity: 0, y: 40, duration: 0.8, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: stepsSection, start: 'top 80%' }
  });
}

/* ─────────────────────────────────────────────────
   NAV — active link on scroll
───────────────────────────────────────────────── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  navAnchors.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

/* ─────────────────────────────────────────────────
   MOBILE NAV — toggle
───────────────────────────────────────────────── */
const navToggle  = document.getElementById('navToggle');
const navLinks   = document.getElementById('navLinks');
const toggleSpans = navToggle.querySelectorAll('span');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
  if (isOpen) {
    gsap.to(toggleSpans[0], { rotate: 45,  y: 6.5,  duration: 0.3 });
    gsap.to(toggleSpans[1], { opacity: 0,           duration: 0.2 });
    gsap.to(toggleSpans[2], { rotate: -45, y: -6.5, duration: 0.3 });
  } else {
    gsap.to(toggleSpans[0], { rotate: 0, y: 0, duration: 0.3 });
    gsap.to(toggleSpans[1], { opacity: 1,       duration: 0.2 });
    gsap.to(toggleSpans[2], { rotate: 0, y: 0, duration: 0.3 });
  }
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
    gsap.to(toggleSpans[0], { rotate: 0, y: 0, duration: 0.3 });
    gsap.to(toggleSpans[1], { opacity: 1,       duration: 0.2 });
    gsap.to(toggleSpans[2], { rotate: 0, y: 0, duration: 0.3 });
  });
});

/* ─────────────────────────────────────────────────
   SMOOTH SCROLL
───────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─────────────────────────────────────────────────
   FORM — submit feedback
───────────────────────────────────────────────── */
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', () => {
    const btn = form.querySelector('.btn-submit span');
    if (btn) btn.textContent = 'Enviando...';
  });
}
