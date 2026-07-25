/* ============================================================================
   AALAYA — reel.js
   The scroll reel: each landing photo occupies a full screen and reveals with
   a cinematic bottom-up wipe + slow zoom, while its caption rises into place.
   A gentle parallax drifts the image as the panel travels through the viewport.

   Graceful fallback: no GSAP or prefers-reduced-motion → the CSS defaults show
   every photo as a clean full-screen still (no wipe, no motion).
   ========================================================================== */
(function () {
  'use strict';

  function init() {
    var reel = document.getElementById('reel');
    if (!reel) return;
    var panels = reel.querySelectorAll('.reel__panel');
    if (!panels.length) return;

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var noGSAP = (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined');
    if (reduce || noGSAP) return;   // CSS shows fully-visible stills

    gsap.registerPlugin(ScrollTrigger);
    reel.classList.add('is-armed');  // hide panels until revealed (no flash)

    panels.forEach(function (panel) {
      var frame = panel.querySelector('.reel__media');
      var img   = panel.querySelector('.reel__media img');
      var els   = panel.querySelectorAll('.reel__index, .reel__rule, .reel__room, .reel__text');

      // Reveal as the panel scrolls in: image wipes up from the bottom while a
      // slow push-in settles, then the caption lines rise in sequence.
      var tl = gsap.timeline({
        scrollTrigger: { trigger: panel, start: 'top 68%', toggleActions: 'play none none none' }
      });
      tl.fromTo(frame,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power3.inOut' })
        .fromTo(img,
            { scale: 1.28 },
            { scale: 1.06, duration: 1.9, ease: 'power2.out' }, 0)
        .fromTo(els,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.0, stagger: 0.1, ease: 'power3.out' }, 0.55);

      // Continuous parallax drift while the panel is within the viewport.
      gsap.fromTo(img,
        { yPercent: -5 },
        { yPercent: 5, ease: 'none',
          scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    ScrollTrigger.refresh();
  }

  // Run once render.js has injected the panels.
  if (document.querySelector('#reel .reel__panel')) init();
  else document.addEventListener('aalaya:rendered', init, { once: true });
})();
