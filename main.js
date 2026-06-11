/**
 * main.js — [Group Name] Group Project Website
 * -----------------------------------------------
 * Features:
 *  1. Mobile hamburger menu toggle
 *  2. Auto copyright year
 *  3. Scroll-based navbar shadow
 *  4. Contact form validation (contact.html)
 */

'use strict';

/* ============================================================
   1. MOBILE MENU TOGGLE
   ============================================================ */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!hamburger || !mobileMenu) return; // only runs if elements exist

  hamburger.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close mobile menu when clicking outside of it
  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* ============================================================
   2. AUTO COPYRIGHT YEAR
   ============================================================ */
(function setCopyrightYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();


/* ============================================================
   3. SCROLL-BASED NAVBAR SHADOW ENHANCEMENT
   ============================================================ */
(function initNavScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 10) {
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.28)';
    } else {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.18)';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ============================================================
   4. CONTACT FORM VALIDATION
   ============================================================ */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return; // only runs on contact.html

  const successMsg  = document.getElementById('formSuccess');
  const submitBtn   = document.getElementById('submitBtn');

  // Helper: get the parent form-group element for a field
  function getGroup(field) {
    return field.closest('.form-group');
  }

  // Helper: mark a field as valid
  function setValid(field) {
    getGroup(field).classList.remove('has-error');
  }

  // Helper: mark a field as invalid
  function setError(field) {
    getGroup(field).classList.add('has-error');
  }

  // Validate a single field — returns true if valid
  function validateField(field) {
    const value = field.value.trim();

    if (field.type === 'email') {
      // Simple email regex
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(value);
    }

    if (field.id === 'message') {
      return value.length >= 10;
    }

    // Default: must not be empty
    return value.length > 0;
  }

  // Live validation on blur (after user leaves a field)
  form.querySelectorAll('input, textarea').forEach(function (field) {
    field.addEventListener('blur', function () {
      if (validateField(field)) {
        setValid(field);
      } else {
        setError(field);
      }
    });

    // Clear error as user types
    field.addEventListener('input', function () {
      if (validateField(field)) {
        setValid(field);
      }
    });
  });

  // Form submission handler
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent actual page submission

    let isFormValid = true;

    // Validate all fields
    form.querySelectorAll('input, textarea').forEach(function (field) {
      if (validateField(field)) {
        setValid(field);
      } else {
        setError(field);
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      // Focus the first error field for accessibility
      const firstError = form.querySelector('.has-error input, .has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    // --- Simulate a successful form submission ---
    // In a real project, replace this block with a fetch() to your
    // backend, Formspree, EmailJS, etc.
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(function () {
      // Show success message
      if (successMsg) {
        successMsg.classList.add('show');
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Reset and hide the form
      form.reset();
      form.style.display = 'none';

    }, 900); // simulated 0.9s network delay
  });
})();
