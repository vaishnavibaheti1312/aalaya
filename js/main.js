/* ============================================================================
   AALAYA — main.js
   Header behaviour, mobile menu, scroll-reveal,
   sticky CTA, config→form prefill, and the enquiry form (EmailJS).
   ========================================================================== */
(function () {
  'use strict';
  var P = window.PROJECT || {};

  document.addEventListener('DOMContentLoaded', function () {

    /* ---- Header: transparent → solid on scroll ---- */
    var header = document.getElementById('site-header');
    var sticky = document.getElementById('sticky-cta');
    var footer = document.querySelector('.site-footer');
    function onScroll() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (header) header.classList.toggle('site-header--scrolled', y > window.innerHeight * 0.7);

      /* Sticky CTA appears once past the hero, but retracts the moment the
         footer enters view so the bar never overlaps the footer. */
      if (sticky) {
        var pastHero = y > window.innerHeight * 1.1;
        var footerReached = footer ? footer.getBoundingClientRect().top <= window.innerHeight : false;
        sticky.classList.toggle('show', pastHero && !footerReached);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---- Mobile menu ---- */
    var burger = document.getElementById('burger');
    var menu = document.getElementById('mobile-menu');
    if (burger && menu) {
      burger.addEventListener('click', function () {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
      });
      menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          burger.classList.remove('active');
          menu.classList.remove('active');
          document.body.classList.remove('no-scroll');
        });
      });
    }

    /* ---- Smooth in-page scrolling (offset for fixed header) ---- */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id === '#' || id === '#top') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset - 76;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });

    /* ---- Scroll reveal (IntersectionObserver) ---- */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('revealed'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });

    /* ---- Config card CTA → prefill the enquiry dropdown ---- */
    document.addEventListener('click', function (e) {
      var link = e.target.closest('[data-config]');
      if (!link) return;
      var wanted = link.getAttribute('data-config');
      var sel = document.getElementById('f-config');
      if (sel) {
        Array.prototype.forEach.call(sel.options, function (o) {
          if (o.text.indexOf(wanted) === 0) sel.value = o.value;
        });
      }
    });

    /* ---- Enquiry form ---- */
    initForm();
  });

  /* ------------------------------------------------------------------ form */
  function initForm() {
    var form = document.getElementById('enquiry-form');
    if (!form) return;

    var ej = P.emailjs || {};
    if (window.emailjs && ej.publicKey) { try { emailjs.init(ej.publicKey); } catch (e) {} }

    function showErr(id, msg) {
      var input = document.getElementById(id);
      var m = document.getElementById(id + '-msg');
      if (input) input.classList.add('err');
      if (m) m.textContent = msg;
    }
    function clearErr(id) {
      var input = document.getElementById(id);
      var m = document.getElementById(id + '-msg');
      if (input) input.classList.remove('err');
      if (m) m.textContent = '';
    }
    ['f-name', 'f-phone', 'f-email', 'f-config'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', function () { clearErr(id); });
      if (el && el.tagName === 'SELECT') el.addEventListener('change', function () { clearErr(id); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      ['f-name', 'f-phone', 'f-email', 'f-config'].forEach(clearErr);

      var name = val('f-name'), phone = val('f-phone'), email = val('f-email'),
          config = val('f-config'), message = val('f-msg');
      var ok = true;

      if (!name) { showErr('f-name', 'Please enter your name.'); ok = false; }
      if (!phone) { showErr('f-phone', 'Please enter your phone number.'); ok = false; }
      else if (phone.replace(/\D/g, '').length < 10) { showErr('f-phone', 'Enter a valid number (10+ digits).'); ok = false; }
      if (!email) { showErr('f-email', 'Please enter your email.'); ok = false; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { showErr('f-email', 'Enter a valid email.'); ok = false; }
      if (!config) { showErr('f-config', 'Please choose a configuration.'); ok = false; }
      if (!ok) return;

      var btn = document.getElementById('f-submit');
      var original = btn.textContent;
      btn.disabled = true; btn.textContent = 'Sending…';

      var payload = {
        name: name, mobile: phone, email: email,
        message: (config ? '[' + config + '] ' : '') + (message || '—'),
        page: (P.name || 'Project') + ' — Aalaya'
      };

      function done() {
        form.style.display = 'none';
        var s = document.getElementById('form-success');
        if (s) s.classList.add('show');
      }
      function fail() {
        btn.disabled = false; btn.textContent = original;
        showErr('f-email', 'Something went wrong — please WhatsApp us instead.');
      }

      if (window.emailjs && ej.serviceId && ej.templateId) {
        emailjs.send(ej.serviceId, ej.templateId, payload).then(done, fail);
      } else {
        // No email backend configured yet — succeed gracefully so the demo works.
        setTimeout(done, 500);
      }
    });

    function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
  }
})();
