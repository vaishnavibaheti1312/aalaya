/* ============================================================================
   AALAYA — map.js
   Interactive dark location map using Leaflet + CARTO "Dark Matter" basemap
   (free, no API key). Drops a custom gold, pulsing pin labelled with the
   project name at PROJECT.location.coords.

   Graceful fallback: if Leaflet fails to load or no coords are set, the map
   canvas is replaced with the Google Maps embed (PROJECT.location.mapEmbed).

   Want the premium tier (3D building extrusions, luxury vector styling,
   fly-to on scroll)? Swap Leaflet for MapLibre GL JS or Mapbox GL JS — both
   need a (free) style/tile token; see README.
   ========================================================================== */
(function () {
  'use strict';

  function fallbackToEmbed(el, loc) {
    if (loc && loc.mapEmbed) {
      el.outerHTML = '<iframe src="' + loc.mapEmbed + '" loading="lazy" ' +
        'referrerpolicy="no-referrer-when-downgrade" title="Location map" ' +
        'style="width:100%;height:100%;min-height:460px;border:0;"></iframe>';
    }
  }

  function init() {
    var P = window.PROJECT || {};
    var loc = P.location || {};
    var el = document.getElementById('loc-map-canvas');
    if (!el) return;

    var c = loc.coords;
    if (typeof L === 'undefined' || !c || typeof c.lat !== 'number') {
      fallbackToEmbed(el, loc);
      return;
    }

    var map = L.map(el, {
      center: [c.lat, c.lng],
      zoom: c.zoom || 14,
      zoomControl: true,
      scrollWheelZoom: false,        // don't hijack page scroll…
      attributionControl: false      // on-map credit hidden; shown in the footer
    });
    map.on('click', function () { map.scrollWheelZoom.enable(); }); // …until clicked

    // NOTE: OSM (ODbL) and CARTO require attribution. It is moved off the map
    // into the site footer (.footer-credits) to satisfy their licences.
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    var pin = L.divIcon({
      className: 'aalaya-pin',
      html: '<span class="pin__dot"></span><span class="pin__label">' + (P.name || 'Here') + '</span>',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
    L.marker([c.lat, c.lng], { icon: pin, keyboard: false }).addTo(map);

    // The container starts hidden (data-reveal) and stretches with the grid to
    // match the tall left column, so its size settles after init. Keep the pin
    // centred through every size change — until the visitor pans it themselves.
    var userMoved = false;
    map.on('dragstart', function () { userMoved = true; });
    function fix() {
      map.invalidateSize(false);
      if (!userMoved) map.setView([c.lat, c.lng], c.zoom || 14);
    }
    setTimeout(fix, 250);
    window.addEventListener('resize', fix, { passive: true });
    if ('ResizeObserver' in window) {
      var ro = new ResizeObserver(function () { fix(); });
      ro.observe(el);
    }
    var section = document.getElementById('location');
    if (section && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) { if (e.isIntersecting) { fix(); io.disconnect(); } });
      }, { threshold: 0.1 });
      io.observe(section);
    }
  }

  if (document.getElementById('loc-map-canvas')) init();
  else document.addEventListener('aalaya:rendered', init, { once: true });
})();
