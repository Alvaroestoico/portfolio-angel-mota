/* ══════════════════════════════════════════════════
   caso.js — Case study pages
   Requires: GSAP + ScrollTrigger (loaded via CDN)
══════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────
   SET INITIAL STATES via JS
───────────────────────────────────────────────── */
gsap.set('.case-hero .section-label', { opacity: 0, y: 16 });
gsap.set('.case-hero-title',          { opacity: 0, y: 40 });
gsap.set('.case-tagline',             { opacity: 0, y: 24 });

/* ─────────────────────────────────────────────────
   NAV — scroll behavior
───────────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ─────────────────────────────────────────────────
   CASE HERO — entrance
───────────────────────────────────────────────── */
const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.1 });
heroTl
  .to('.case-hero .section-label', { opacity: 1, y: 0, duration: 0.6 })
  .to('.case-hero-title',          { opacity: 1, y: 0, duration: 1.0 }, '-=0.3')
  .to('.case-tagline',             { opacity: 1, y: 0, duration: 0.75 }, '-=0.5');

/* ─────────────────────────────────────────────────
   CASE STATS — staggered
───────────────────────────────────────────────── */
gsap.from('.case-stat', {
  opacity: 0, y: 30, duration: 0.75, stagger: 0.1, ease: 'power3.out',
  scrollTrigger: { trigger: '.case-stats', start: 'top 85%' }
});

/* ─────────────────────────────────────────────────
   CONTENT — scroll reveals
───────────────────────────────────────────────── */
gsap.utils.toArray('.case-text-block').forEach(block => {
  gsap.from(block, {
    opacity: 0, y: 45, duration: 0.85, ease: 'power3.out',
    scrollTrigger: { trigger: block, start: 'top 88%' }
  });
});

gsap.utils.toArray('.case-video-main').forEach(video => {
  gsap.from(video, {
    opacity: 0, y: 50, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: video, start: 'top 88%' }
  });
});

/* ─────────────────────────────────────────────────
   CTA
───────────────────────────────────────────────── */
gsap.from('.case-cta-title', {
  opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
  scrollTrigger: { trigger: '.case-cta', start: 'top 85%' }
});
gsap.from('.case-cta .btn-primary', {
  opacity: 0, y: 20, duration: 0.7, delay: 0.15, ease: 'power3.out',
  scrollTrigger: { trigger: '.case-cta', start: 'top 80%' }
});
