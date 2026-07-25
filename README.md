# Aalaya — Luxury Real Estate Landing

A conversion-focused, single-project landing site for selling luxury residences.
Currently configured for **The Balmoral Towers, Balewadi (Pune)** by Kasturi Housing.

Built as a no-build static site (same stack as the VB Studio site): plain
HTML/CSS/JS, [GSAP + ScrollTrigger] for the cinematic scroll walkthrough, and
[EmailJS] for enquiry delivery. Deploys anywhere static (GitHub Pages, Netlify…).

---

## Run it locally

```bash
python3 -m http.server 8090
# then open http://localhost:8090
```

(Use a server, not `file://` — the map iframe and fonts behave better over HTTP.)

---

## The one thing that makes this reusable: `data/project.js`

**All content lives in [`data/project.js`](data/project.js).** The HTML is just a
skeleton; [`js/render.js`](js/render.js) reads `window.PROJECT` and fills every
section — hero, walkthrough, overview, amenities, configurations, location,
enquiry form, footer, SEO tags.

### To point the site at a new developer project (the "send me a link" flow)

1. Send the developer's project URL.
2. We pull the copy, prices, amenities, configs, and images from it.
3. New room/config images go into `assets/img/rooms/` and `assets/img/config/`.
4. `data/project.js` is rewritten with the new project's data.

**No HTML or CSS changes are needed** — the page re-renders itself from the data.

---

## The landing + scroll reel

**Landing:** a single, static hero image (`hero.image` in `data/project.js`) —
the building at dusk. It does not animate or scroll-scrub; it simply sets the
scene, with the project name, price and one **Enquire** call-to-action.

**Scroll reel:** as the visitor scrolls, every photo in `reel.photos` is revealed
**one full screen at a time** with a cinematic bottom-up wipe, a slow push-in,
and a caption (index + room name + line) that rises into place — driven by
[`js/reel.js`](js/reel.js) with GSAP ScrollTrigger. Falls back to clean
full-screen stills when GSAP is unavailable or the visitor has
`prefers-reduced-motion` set.

### To change the landing photos

Edit `data/project.js`:
- `hero.image` — the static landing image.
- `reel.photos[]` — add / reorder / replace entries `{ img, index, room, caption }`.
  Drop new images into `assets/img/landing/` (photographic PNGs are best
  converted to ~85%-quality JPGs to keep the page fast).

No HTML/CSS changes required.

---

## Behavioural / psychology built into the page

These are deliberate conversion levers, mapped to where they live:

| Technique | Where | Why it works |
|---|---|---|
| **Immersion / endowment effect** | Static hero + full-screen scroll reel | Living the space one screen at a time builds emotional ownership before price is discussed. |
| **Anchoring** | 4 BHK price shown beside 3 BHK; "from ₹X" | The higher number makes the entry price feel reasonable. |
| **Authority / trust** | Developer name, RERA, disclaimer | Reduces the perceived risk of a crore-plus decision. |
| **Reciprocity** | "Get the cost sheet & floor plans" CTA | Offering something of value in exchange for contact details. |
| **Commitment / micro-yes** | Per-config "Request this floor plan" → prefilled form | Small, specific actions convert better than a generic "contact us". |
| **Friction reduction / Zeigarnik** | Sticky enquiry bar + WhatsApp float + call button | Always one tap from acting; the unfinished enquiry nags gently. |
| **Agent value proposition** | "Why buy through Aalaya" | Answers *"why not go direct to the builder?"* — the key objection for an agent. |

---

## ⚠️ Before going live — replace these placeholders

In `data/project.js`:

- **`brand.phone` / `email` / `whatsapp` / `instagram`** — currently working
  defaults borrowed from VB Studio. Swap for Aalaya's own contact line.
- **`brand.rera_agent`** and **`rera`** — add the real MahaRERA numbers. Do not
  ship with the `XXXXX` placeholders.
- **`emailjs`** — currently uses VB Studio's EmailJS account so the form works out
  of the box. Create an Aalaya EmailJS account and template, then swap the IDs.
- **`location.highlights` distances** — approximate; verify before publishing.

Imagery is sourced from the developer's marketing site. Confirm usage rights /
use developer-supplied high-res creatives for production.

---

## Structure

```
index.html            Section skeletons + data hooks (no hard-coded content)
data/project.js       ← THE FILE YOU EDIT to change projects
css/base.css          Design tokens, header, footer, buttons, reveals
css/walkthrough.css   Static landing hero + scroll-reel styles
css/site.css          All content sections + sticky CTA
js/render.js          Injects PROJECT data into the page
js/reel.js            GSAP scroll reel (image-by-image reveal)
js/map.js             Interactive dark location map (Leaflet + CARTO)
js/main.js            Header, mobile menu, sticky CTA, enquiry form
assets/img/landing/   Landing hero + reel photos (building, kitchen, bath, bed)
assets/img/rooms/     Developer interior renders
assets/img/config/    Floor-plan / configuration images
assets/img/site/      Fallback banner
```

## Location map

The map is an interactive dark **Leaflet** map using CARTO "Dark Matter" tiles
(free, no API key), with a custom gold pin at `location.coords`. It falls back to
the Google embed (`location.mapEmbed`) if Leaflet can't load.

- **Change where it points:** set `location.coords` `{ lat, lng, zoom }` in
  `data/project.js` to the project's exact coordinates.
- **Premium upgrade (optional):** for luxury vector styling, 3D building
  extrusions and a fly-to-on-scroll effect, swap Leaflet for **MapLibre GL JS**
  (open-source, free) or **Mapbox GL JS**. Both need a free style/tile token —
  a step up in polish and setup versus the current keyless map.
