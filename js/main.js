/* ═══════════════════════════════════════════════════════════
   RAJPUT RESORT — Main JavaScript
   Features:
     • Navbar scroll effect (transparent → solid)
     • Smooth scroll for anchor links
     • Mobile hamburger menu
     • Parallax hero background
     • Scroll-reveal animations (IntersectionObserver)
     • Reservation form validation + Netlify fallback
     • Modal open/close (T&C, Privacy Policy)
     • Active nav link highlighting
   ═══════════════════════════════════════════════════════════ */

;(function () {
  'use strict';

  // ── DOM References ──
  const navbar       = document.getElementById('navbar');
  const navToggle    = document.getElementById('navToggle');
  const navLinks     = document.getElementById('navLinks');
  const heroBg       = document.querySelector('.hero-bg');
  const form         = document.getElementById('reservationForm');
  const formSuccess  = document.getElementById('formSuccess');
  const termsModal   = document.getElementById('termsModal');
  const privacyModal = document.getElementById('privacyModal');
  const openTerms    = document.getElementById('openTerms');
  const openPrivacy  = document.getElementById('openPrivacy');

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
  handleNavScroll(); // run once on load

  // ═══════════════════════════════════════════
  // 2. ACTIVE NAV LINK HIGHLIGHTING
  // ═══════════════════════════════════════════
  const sections = document.querySelectorAll('.section, .hero');
  const navAnchors = document.querySelectorAll('.nav-links a');

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
      if (targetId === '#') return; // skip "#" only links

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Close mobile menu if open
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

  // Close menu when clicking outside
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

    // Only apply parallax if we're near the hero
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

  // Disable parallax on reduced motion preference
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
            revealObserver.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  // ═══════════════════════════════════════════
  // 7. RESERVATION FORM VALIDATION
  // ═══════════════════════════════════════════
  const validators = {
    name: {
      el: () => document.getElementById('name'),
      errEl: () => document.getElementById('nameError'),
      validate(val) {
        if (!val.trim()) return 'Please enter your full name.';
        if (val.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      },
    },
    email: {
      el: () => document.getElementById('email'),
      errEl: () => document.getElementById('emailError'),
      validate(val) {
        if (!val.trim()) return 'Please enter your email address.';
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(val)) return 'Please enter a valid email address.';
        return '';
      },
    },
    phone: {
      el: () => document.getElementById('phone'),
      errEl: () => document.getElementById('phoneError'),
      validate(val) {
        if (!val.trim()) return 'Please enter your phone number.';
        const cleaned = val.replace(/[\s\-()]/g, '');
        if (!/^\+?\d{7,15}$/.test(cleaned)) return 'Please enter a valid phone number.';
        return '';
      },
    },
    guests: {
      el: () => document.getElementById('guests'),
      errEl: () => document.getElementById('guestsError'),
      validate(val) {
        if (!val) return 'Please select number of guests.';
        return '';
      },
    },
    checkin: {
      el: () => document.getElementById('checkin'),
      errEl: () => document.getElementById('checkinError'),
      validate(val) {
        if (!val) return 'Please select a check-in date.';
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(val) < today) return 'Check-in date cannot be in the past.';
        return '';
      },
    },
    checkout: {
      el: () => document.getElementById('checkout'),
      errEl: () => document.getElementById('checkoutError'),
      validate(val) {
        if (!val) return 'Please select a check-out date.';
        const checkinVal = document.getElementById('checkin').value;
        if (checkinVal && new Date(val) <= new Date(checkinVal)) {
          return 'Check-out must be after check-in date.';
        }
        return '';
      },
    },
  };

  // Set minimum date for date inputs
  function setMinDates() {
    const today = new Date().toISOString().split('T')[0];
    const checkinEl = document.getElementById('checkin');
    const checkoutEl = document.getElementById('checkout');

    checkinEl.setAttribute('min', today);
    checkoutEl.setAttribute('min', today);

    checkinEl.addEventListener('change', () => {
      if (checkinEl.value) {
        const nextDay = new Date(checkinEl.value);
        nextDay.setDate(nextDay.getDate() + 1);
        checkoutEl.setAttribute('min', nextDay.toISOString().split('T')[0]);
      }
    });
  }
  setMinDates();

  // Real-time validation on blur
  Object.keys(validators).forEach((key) => {
    const v = validators[key];
    const el = v.el();
    if (el) {
      el.addEventListener('blur', () => {
        const msg = v.validate(el.value);
        v.errEl().textContent = msg;
        el.classList.toggle('invalid', !!msg);
      });
      el.addEventListener('input', () => {
        if (el.classList.contains('invalid')) {
          const msg = v.validate(el.value);
          v.errEl().textContent = msg;
          if (!msg) el.classList.remove('invalid');
        }
      });
    }
  });

  // Form submit
  if (form) {
    form.addEventListener('submit', function (e) {
      let hasErrors = false;

      // Validate all fields
      Object.keys(validators).forEach((key) => {
        const v = validators[key];
        const el = v.el();
        const msg = v.validate(el.value);
        v.errEl().textContent = msg;
        el.classList.toggle('invalid', !!msg);
        if (msg) hasErrors = true;
      });

      if (hasErrors) {
        e.preventDefault();
        // Focus first invalid field
        const firstInvalid = form.querySelector('.invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // If on Netlify, the form will naturally submit via POST.
      // For local development, intercept and show success message.
      const isNetlify = window.location.hostname.includes('netlify');
      if (!isNetlify) {
        e.preventDefault();
        showFormSuccess();
      }
    });
  }

  function showFormSuccess() {
    if (form) form.style.display = 'none';
    if (formSuccess) formSuccess.classList.add('show');
  }

  // ═══════════════════════════════════════════
  // 8. MODALS (T&C + Privacy Policy)
  // ═══════════════════════════════════════════
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Focus la close button
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) setTimeout(() => closeBtn.focus(), 100);
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Open triggers
  if (openTerms) {
    openTerms.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(termsModal);
    });
  }
  if (openPrivacy) {
    openPrivacy.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(privacyModal);
    });
  }

  // Close buttons
  document.querySelectorAll('.modal-close').forEach((btn) => {
    btn.addEventListener('click', () => {
      closeModal(btn.closest('.modal-overlay'));
    });
  });

  // Close on backdrop click
  [termsModal, privacyModal].forEach((modal) => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
      });
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [termsModal, privacyModal].forEach((modal) => {
        if (modal && modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    }
  });

  // ═══════════════════════════════════════════
  // 9. YEAR IN FOOTER (keep copyright fresh)
  // ═══════════════════════════════════════════
  const copyrightEl = document.querySelector('.footer-bottom p');
  if (copyrightEl) {
    const year = new Date().getFullYear();
    copyrightEl.innerHTML = copyrightEl.innerHTML.replace(/\d{4}/, year);
  }

})();
