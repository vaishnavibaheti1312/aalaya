/* ============================================================================
   AALAYA — PROJECT DATA
   ----------------------------------------------------------------------------
   This is the ONLY file you edit to point the site at a different project.
   Everything the page shows (copy, prices, images, amenities, location,
   contact, SEO) is read from the PROJECT object below by js/render.js.

   To onboard a new developer project:
     1. Drop room/config images into assets/img/rooms and assets/img/config
     2. Replace the fields below with the new project's data
     3. (Optional) drop a Higgsfield walkthrough clip at the path in
        walkthrough.video to upgrade the landing to a real video flythrough
   No HTML/CSS changes required.
   ========================================================================== */

window.PROJECT = {

  /* ---- Brand (the AGENT selling the project — this is us) ---------------- */
  brand: {
    name: "AALAYA",
    tagline: "Curated Luxury Residences",
    /* Set to an <img> path to use a logo image instead of the wordmark */
    logo: null,
    /* Working contact defaults — CONFIRM/replace with Aalaya's own line */
    phone: "+91 80103 56912",
    phoneHref: "+918010356912",
    whatsapp: "918010356912",
    email: "hello@aalaya.homes",
    instagram: "https://www.instagram.com/",
    location: "Pune · Mumbai",
    rera_agent: "MahaRERA Agent Reg. — <add number>"
  },

  /* ---- The project we are selling --------------------------------------- */
  name: "The Balmoral Towers",
  developer: "Kasturi Housing",
  status: "Now Selling",                       // ribbon label
  possession: "<add possession date>",           // TODO: real handover date from developer
  rera: "MahaRERA — P5210000XXXXX",             // TODO: fill real RERA no.
  microLocation: "Balewadi",
  city: "Pune",
  configShort: "3 & 4 BHK",
  priceTeaser: "₹2.13 Cr",                       // headline "onwards" figure
  priceNote: "*Floor rise, taxes & duties extra",

  /* ---- Landing: a single, static hero image ----------------------------- */
  hero: {
    image: "assets/img/landing/building.jpg",
    kicker: "Balewadi · Pune",
    title: "Live the High Life",
    subtitle: "Limited-edition 3 & 4 BHK residences at the pinnacle of effortless living.",
    priceLabel: "Starting",
    price: "₹2.13 Cr*",
    primaryCta: "Enquire Now"
  },

  /* ---- The scroll reel: every landing photo, revealed one full screen at a
     time as the visitor scrolls down. Add/reorder/replace entries here.    */
  reel: {
    photos: [
      {
        img: "assets/img/rooms/living-room.jpg",
        index: "01",
        room: "The Living Room",
        caption: "A beautiful blend of elegant settings and handpicked details — spacious decks opening through fully retractable glass doors."
      },
      {
        img: "assets/img/landing/kitchen.jpg",
        index: "02",
        room: "The Kitchen",
        caption: "A modular masterpiece in walnut and marble, fitted with top-end appliances and framed by the city."
      },
      {
        img: "assets/img/landing/bathroom.jpg",
        index: "03",
        room: "The Bathroom",
        caption: "Marble, backlit mirrors and a freestanding tub — a private spa suspended above the skyline."
      },
      {
        img: "assets/img/landing/bedroom.jpg",
        index: "04",
        room: "The Bedroom",
        caption: "A sanctuary of quiet — warm wood, soft light and a wall of glass over the city at night."
      }
    ]
  },

  /* ---- Overview / description ------------------------------------------- */
  overview: {
    heading: "At the pinnacle of effortless living",
    body: [
      "Every lavish detail of your home at The Balmoral Towers has a functional side to it. Here, opulence speaks in softer tones — majestic luxuries woven together with the simple comforts of everyday life.",
      "Two landmark towers rise over Balewadi, offering a limited collection of 3 & 4 BHK homes designed for those who have arrived, and intend to stay."
    ],
    stats: [
      { value: "2", label: "Iconic Towers" },
      { value: "3 & 4", label: "BHK Residences" },
      { value: "12+", label: "World-class Amenities" },
      { value: "Balewadi", label: "Pune's Prime West" }
    ]
  },

  /* ---- Amenities -------------------------------------------------------- */
  amenitiesHeading: "Beyond what's inside",
  amenitiesIntro: "An entire world of leisure, wellness and community — a few steps from your door.",
  amenities: [
    { name: "Swimming Pool + Kids' Pool", icon: "fa-tint" },
    { name: "Fully-equipped Gymnasium", icon: "fa-heartbeat" },
    { name: "Indoor Badminton Court", icon: "fa-trophy" },
    { name: "Squash Court", icon: "fa-square-o" },
    { name: "Table Tennis", icon: "fa-table" },
    { name: "Billiards Room", icon: "fa-circle" },
    { name: "Card Room", icon: "fa-diamond" },
    { name: "Multisport Floodlit Court", icon: "fa-futbol-o" },
    { name: "Community Centre + Banquet", icon: "fa-users" },
    { name: "Executive Café & Workspace", icon: "fa-coffee" },
    { name: "Kids' Play Area", icon: "fa-child" },
    { name: "Smart Home Automation", icon: "fa-mobile" }
  ],

  /* ---- Configurations --------------------------------------------------- */
  configHeading: "Choose your address in the sky",
  configurations: [
    {
      type: "3 BHK",
      tower: "Queen Tower",
      area: "1245",
      areaUnit: "sq.ft.",
      price: "₹2.28 Cr",
      priceNote: "onwards*",
      img: "assets/img/config/queen-tower-3bhk.jpg",
      highlights: ["Spacious sun-deck", "Retractable glass doors", "Modular kitchen"]
    },
    {
      type: "4 BHK",
      tower: "King Tower",
      area: "1581",
      areaUnit: "sq.ft.",
      price: "₹2.93 Cr",
      priceNote: "onwards*",
      img: "assets/img/config/king-tower-4bhk.jpg",
      highlights: ["Private family lounge", "Dual master suites", "Panoramic city views"],
      featured: true
    }
  ],

  /* ---- Location --------------------------------------------------------- */
  location: {
    heading: "Balewadi — one of Pune's most celebrated addresses",
    body: "Positioned in the heart of west Pune, with unmatched connectivity to the city's business, sport and lifestyle hubs. Distances are approximate.",
    /* Interactive dark map centres here. Balewadi neighbourhood — set to the
       project's exact coordinates once confirmed. */
    coords: { lat: 18.5764, lng: 73.7713, zoom: 14 },
    /* Fallback embed used only if the Leaflet library fails to load. */
    mapEmbed: "https://www.google.com/maps?q=Balewadi,+Pune&output=embed",
    highlights: [
      { name: "Shiv Chhatrapati Sports Complex", time: "2 min", icon: "fa-trophy" },
      { name: "Balewadi High Street (dining & retail)", time: "5 min", icon: "fa-shopping-bag" },
      { name: "Mumbai–Pune Expressway access", time: "8 min", icon: "fa-road" },
      { name: "Hinjewadi IT Park (Phase 1)", time: "20 min", icon: "fa-building" },
      { name: "Symbiosis & reputed schools", time: "10 min", icon: "fa-graduation-cap" },
      { name: "Aditya Birla / Jupiter Hospital", time: "15 min", icon: "fa-plus-square" },
      { name: "Upcoming Metro (Hinjewadi–Shivajinagar)", time: "5 min", icon: "fa-subway" },
      { name: "Pune International Airport", time: "45 min", icon: "fa-plane" }
    ]
  },

  /* ---- Why buy through us (the agent's edge) ---------------------------- */
  whyUs: {
    heading: "Why buy The Balmoral Towers through Aalaya",
    body: "We represent the buyer, not just the building. One relationship, from first walkthrough to handover of keys.",
    points: [
      { title: "Best-price assurance", body: "We negotiate developer pricing, floor-rise and offers on your behalf — you never overpay.", icon: "fa-tag" },
      { title: "Curated site visits", body: "Private, unhurried tours at your convenience, including sunset and weekend slots.", icon: "fa-key" },
      { title: "Home-loan concierge", body: "Pre-approved rates from leading banks, paperwork handled end-to-end.", icon: "fa-bank" },
      { title: "Interiors ready", body: "Optional turnkey luxury interiors so you move into a finished home, not a shell.", icon: "fa-paint-brush" }
    ]
  },

  /* ---- Enquiry form ----------------------------------------------------- */
  enquiry: {
    heading: "Register your interest",
    subheading: "Get the full cost sheet, floor plans and current availability — sent to you within the hour.",
    configOptions: ["3 BHK — Queen Tower", "4 BHK — King Tower", "Not sure yet"],
    reassurance: "No spam. Your details are shared only with our RERA-registered advisor.",
    successMsg: "Thank you — your personal advisor will reach out shortly with the cost sheet and floor plans."
  },

  /* ---- EmailJS (form delivery) — swap for Aalaya's own account ----------- */
  emailjs: {
    publicKey: "SFWDLz1SIcJ4jUd7u",
    serviceId: "service_dj4zfh6",
    templateId: "template_rg6trrm"
  },

  /* ---- SEO -------------------------------------------------------------- */
  seo: {
    title: "The Balmoral Towers, Balewadi | Luxury 3 & 4 BHK in Pune — Aalaya",
    description: "Limited-edition 3 & 4 BHK luxury residences at The Balmoral Towers, Balewadi, Pune by Kasturi Housing. Priced ₹2.13 Cr onwards. Book a private walkthrough with Aalaya.",
    keywords: "Balmoral Towers Balewadi, luxury flats Balewadi Pune, 3 BHK Balewadi, 4 BHK Balewadi, Kasturi Housing, luxury apartments Pune, Aalaya real estate"
  },

  /* ---- Footer ----------------------------------------------------------- */
  footer: {
    disclaimer: "Aalaya is an authorised channel partner marketing this project. All images, plans, specifications and prices are indicative, sourced from the developer, and subject to change. This is not an offer or contract. Please verify all details and MahaRERA registration before purchase.",
    relatedProjects: ["The Balmoral Hillside", "The Balmoral Riverside"]
  }
};
