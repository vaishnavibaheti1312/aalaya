/* ============================================================================
   AALAYA — render.js
   Reads window.PROJECT and injects all content into the page.
   This is the layer that makes the site "swap projects by editing one file".
   ========================================================================== */
(function () {
  'use strict';
  var P = window.PROJECT || {};

  function $(id) { return document.getElementById(id); }
  function set(id, txt) { var el = $(id); if (el) el.textContent = txt; }
  function html(id, markup) { var el = $(id); if (el) el.innerHTML = markup; }

  document.addEventListener('DOMContentLoaded', function () {

    /* ---- SEO / meta ---- */
    if (P.seo) {
      document.title = P.seo.title || document.title;
      var md = $('meta-desc'); if (md) md.content = P.seo.description || '';
      var mk = $('meta-keywords'); if (mk) mk.content = P.seo.keywords || '';
      var ot = $('og-title'); if (ot) ot.content = P.seo.title || '';
      var od = $('og-desc'); if (od) od.content = P.seo.description || '';
    }

    /* ---- Brand / header / contact ---- */
    var b = P.brand || {};
    set('brand-mark', b.name || 'AALAYA');
    var bt = $('brand-mark'); // re-add the <small> tagline after textContent wipe
    if (bt && b.tagline) {
      bt.innerHTML = (b.name || 'AALAYA') + '<small>' + b.tagline + '</small>';
    }
    var hp = $('header-phone');
    if (hp) { hp.href = 'tel:' + (b.phoneHref || ''); hp.querySelector('span').textContent = b.phone || ''; }

    /* ---- HERO (static landing image) ---- */
    var hero = P.hero || {};
    var himg = $('hero-img');
    if (himg) {
      himg.src = hero.image || 'assets/img/landing/building.jpg';
      himg.alt = (P.name || '') + (P.microLocation ? ' — ' + P.microLocation : '');
    }
    set('hero-kicker', hero.kicker || '');
    set('hero-title', hero.title || P.name || '');
    set('hero-subtitle', hero.subtitle || '');
    set('hero-cta1', hero.primaryCta || 'Enquire Now');
    set('hero-price-label', hero.priceLabel || 'Starting');
    set('hero-price', hero.price || P.priceTeaser || '');

    /* ---- REEL (full-screen photo panels, revealed one-by-one on scroll) ---- */
    var reelPhotos = (P.reel && P.reel.photos) || [];
    var reelEl = $('reel');
    if (reelEl) {
      reelEl.innerHTML = reelPhotos.map(function (p) {
        return '' +
          '<figure class="reel__panel">' +
            '<div class="reel__media"><img src="' + p.img + '" alt="' + (p.room || '') + '" loading="lazy" decoding="async"/></div>' +
            '<div class="reel__grade"></div>' +
            '<figcaption class="reel__caption">' +
              (p.index ? '<span class="reel__index">' + p.index + '</span>' : '') +
              '<span class="reel__rule"></span>' +
              '<h3 class="reel__room">' + (p.room || '') + '</h3>' +
              '<p class="reel__text">' + (p.caption || '') + '</p>' +
            '</figcaption>' +
          '</figure>';
      }).join('');
    }

    /* ---- OVERVIEW ---- */
    var ov = P.overview || {};
    set('ov-eyebrow', (P.status || 'Now Selling') + ' · ' + (P.developer || ''));
    set('ov-heading', ov.heading || '');
    if (ov.body) html('ov-body', ov.body.map(function (p) { return '<p>' + p + '</p>'; }).join(''));
    if (ov.stats) {
      html('ov-stats', ov.stats.map(function (s) {
        return '<div class="stat"><div class="stat__value">' + s.value +
               '</div><div class="stat__label">' + s.label + '</div></div>';
      }).join(''));
    }

    /* ---- AMENITIES ---- */
    set('am-heading', P.amenitiesHeading || 'Amenities');
    set('am-intro', P.amenitiesIntro || '');
    var ag = $('amenities-grid');
    if (ag && P.amenities) {
      ag.innerHTML = P.amenities.map(function (a) {
        return '<div class="amenity"><i class="fa ' + (a.icon || 'fa-star') + '"></i><span>' +
               a.name + '</span></div>';
      }).join('');
    }

    /* ---- CONFIGURATIONS ---- */
    set('cfg-heading', P.configHeading || 'Configurations');
    var cg = $('config-grid');
    if (cg && P.configurations) {
      cg.innerHTML = P.configurations.map(function (c) {
        var hl = (c.highlights || []).map(function (h) { return '<li>' + h + '</li>'; }).join('');
        return '<article class="config-card" data-reveal>' +
          '<div class="config-card__media">' +
            '<span class="config-card__tag">' + c.type + '</span>' +
            (c.featured ? '<span class="config-card__flag">Most Wanted</span>' : '') +
            '<img src="' + c.img + '" alt="' + c.tower + ' floor plan" loading="lazy"/>' +
          '</div>' +
          '<div class="config-card__body">' +
            '<h3 class="config-card__tower">' + c.tower + '</h3>' +
            '<div class="config-card__meta">' +
              '<span class="config-card__area"><b>' + c.area + '</b> ' + (c.areaUnit || 'sq.ft.') + '</span>' +
              '<span class="config-card__price"><b>' + c.price + '</b><span>' + (c.priceNote || '') + '</span></span>' +
            '</div>' +
            '<ul class="config-card__hl">' + hl + '</ul>' +
            '<a href="#enquiry" class="btn btn--outline" style="width:100%;justify-content:center;" ' +
              'data-config="' + c.type + '">Request this floor plan</a>' +
          '</div>' +
        '</article>';
      }).join('');
    }

    /* ---- LOCATION ---- */
    var loc = P.location || {};
    set('loc-heading', loc.heading || 'Location');
    set('loc-body', loc.body || '');
    var ll = $('loc-list');
    if (ll && loc.highlights) {
      ll.innerHTML = loc.highlights.map(function (h) {
        return '<li><i class="fa ' + (h.icon || 'fa-map-marker') + '"></i>' +
               '<span class="name">' + h.name + '</span>' +
               '<span class="time">' + h.time + '<br><small>away</small></span></li>';
      }).join('');
    }
    var lm = $('loc-map');
    if (lm) {
      if (loc.coords && typeof loc.coords.lat === 'number') {
        /* js/map.js turns this into an interactive dark map (Leaflet). */
        lm.innerHTML = '<div id="loc-map-canvas" class="loc-map-canvas" role="img" aria-label="Map of ' + (P.microLocation || 'the location') + '"></div>';
      } else if (loc.mapEmbed) {
        lm.innerHTML = '<iframe src="' + loc.mapEmbed + '" loading="lazy" ' +
          'referrerpolicy="no-referrer-when-downgrade" title="Location map"></iframe>';
      }
    }

    /* ---- WHY US ---- */
    var wu = P.whyUs || {};
    set('why-heading', wu.heading || '');
    set('why-body', wu.body || '');
    var wg = $('whyus-grid');
    if (wg && wu.points) {
      wg.innerHTML = wu.points.map(function (p) {
        return '<div class="why-card"><i class="fa ' + (p.icon || 'fa-check') + '"></i>' +
               '<h4>' + p.title + '</h4><p>' + p.body + '</p></div>';
      }).join('');
    }

    /* ---- ENQUIRY ---- */
    var enq = P.enquiry || {};
    set('enq-heading', enq.heading || 'Register your interest');
    set('enq-sub', enq.subheading || '');
    set('enq-price', P.hero && P.hero.price ? P.hero.price : (P.priceTeaser || ''));
    set('enq-price-note', P.priceNote || '');
    set('f-reassure', enq.reassurance || '');
    set('success-text', enq.successMsg || 'Thank you — we will be in touch shortly.');
    var sel = $('f-config');
    if (sel) {
      sel.innerHTML = '<option value="" disabled selected>Select an option</option>' +
        (enq.configOptions || []).map(function (o) { return '<option>' + o + '</option>'; }).join('');
    }

    /* ---- FOOTER ---- */
    set('footer-brand', b.name || 'AALAYA');
    set('footer-tagline', b.tagline || '');
    var fp = $('footer-phone'); if (fp) { fp.href = 'tel:' + (b.phoneHref || ''); fp.textContent = b.phone || ''; }
    var fe = $('footer-email'); if (fe) { fe.href = 'mailto:' + (b.email || ''); fe.textContent = b.email || ''; }
    var floc = $('footer-location'); if (floc) floc.textContent = b.location || '';
    set('footer-disclaimer', (P.footer && P.footer.disclaimer) || '');
    set('footer-copy', '© ' + new Date().getFullYear() + ' ' + (b.name || 'Aalaya') + '. ' + (b.rera_agent || ''));
    set('footer-rera', P.rera || '');
    var fs = $('footer-social');
    if (fs) {
      var links = [];
      if (b.instagram) links.push('<a href="' + b.instagram + '" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa fa-instagram"></i></a>');
      if (b.whatsapp) links.push('<a href="https://wa.me/' + b.whatsapp + '" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa fa-whatsapp"></i></a>');
      if (b.email) links.push('<a href="mailto:' + b.email + '" aria-label="Email"><i class="fa fa-envelope-o"></i></a>');
      if (b.phoneHref) links.push('<a href="tel:' + b.phoneHref + '" aria-label="Call"><i class="fa fa-phone"></i></a>');
      fs.innerHTML = links.join('');
    }

    /* ---- STICKY CTA + WhatsApp float ---- */
    set('sticky-p', P.name || '');
    set('sticky-s', (P.configShort || '') + ' · ' + (P.microLocation || '') + ' · from ' + (P.priceTeaser || ''));
    var scall = $('sticky-call'); if (scall) scall.href = 'tel:' + (b.phoneHref || '');
    var wa = $('wa-float');
    if (wa && b.whatsapp) {
      wa.href = 'https://wa.me/' + b.whatsapp + '?text=' +
        encodeURIComponent("Hi Aalaya, I'm interested in " + (P.name || 'the project') + ". Please share details.");
    }

    /* Signal that rendering is done (reel.js waits for this) */
    document.dispatchEvent(new CustomEvent('aalaya:rendered'));
  });
})();
