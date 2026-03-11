/* ═══════════════════════════════════════════════════════════
   TAKHAT VILLA — Page JavaScript
   Features:
     • Navbar scroll effect
     • Smooth scroll for anchor links
     • Mobile hamburger menu
     • Parallax hero background
     • Scroll-reveal animations
     • Gallery lightbox
     • Active nav link highlighting
   ═══════════════════════════════════════════════════════════ */

;(function () {
  'use strict';

  // ── DOM References ──
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  const heroBg    = document.querySelector('.hero-bg');
  const lightbox  = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');

  // ═══════════════════════════════════════════
  // 1. NAVBAR SCROLL EFFECT
  // ═══════════════════════════════════════════
  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ═══════════════════════════════════════════
  // 2. ACTIVE NAV LINK HIGHLIGHTING
  // ═══════════════════════════════════════════
  const sections = document.querySelectorAll('.section, .hero');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach((a) => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
  );
  sections.forEach((sec) => sectionObserver.observe(sec));

  // ═══════════════════════════════════════════
  // 3. SMOOTH SCROLL (anchor links)
  // ═══════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // ═══════════════════════════════════════════
  // 4. MOBILE HAMBURGER MENU
  // ═══════════════════════════════════════════
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // ═══════════════════════════════════════════
  // 5. PARALLAX HERO BACKGROUND
  // ═══════════════════════════════════════════
  let ticking = false;

  function updateParallax() {
    if (!heroBg) return;
    const scrolled = window.scrollY;
    const heroHeight = window.innerHeight;

    if (scrolled < heroHeight * 1.2) {
      heroBg.style.transform = `translateY(${scrolled * 0.35}px) scale(1.1)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (heroBg) heroBg.style.transform = 'none';
  }

  // ═══════════════════════════════════════════
  // 6. SCROLL REVEAL ANIMATIONS
  // ═══════════════════════════════════════════
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  // ═══════════════════════════════════════════
  // 7. GALLERY LIGHTBOX
  // ═══════════════════════════════════════════
  if (lightbox && lightboxImg) {
    // Open lightbox on gallery image click
    document.querySelectorAll('.gallery-item img').forEach((img) => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    // Also open on room/dining thumbnail clicks
    document.querySelectorAll('.room-img-grid img, .dining-img-row img').forEach((img) => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Close on button click
    const closeBtn = lightbox.querySelector('.lightbox-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
      });
    }

    // Close on overlay click (not on image)
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // ═══════════════════════════════════════════
  // 8. YEAR IN FOOTER
  // ═══════════════════════════════════════════
  const copyrightEl = document.querySelector('.footer-bottom p');
  if (copyrightEl) {
    const year = new Date().getFullYear();
    copyrightEl.innerHTML = copyrightEl.innerHTML.replace(/\d{4}/, year);
  }

})();
