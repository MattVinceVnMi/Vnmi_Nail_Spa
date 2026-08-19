/**
 * BUSINESS CONSTANTS — single source of truth.
 * Nothing below this file should hardcode a phone number, address, or hour.
 */

export const business = {
  name: 'V&Mi Nail Spa',
  shortName: 'V&Mi',
  tagline: 'Boca Raton nail care, considered.',
  description:
    'A quiet, meticulous nail studio in Boca Raton. Classic manicures, restorative pedicures, and healthy-nail enhancements — performed slowly and finished properly.',

  phone: {
    display: '(561) 367-1590',
    // tel: links must be digits only, E.164 preferred.
    href: 'tel:+15613671590',
    raw: '+15613671590',
  },

  address: {
    street: '21214 St Andrews Blvd',
    city: 'Boca Raton',
    state: 'FL',
    zip: '33433',
    get full() {
      return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
    },
    // Directions link — works on iOS, Android, and desktop.
    mapsHref:
      'https://www.google.com/maps/search/?api=1&query=21214+St+Andrews+Blvd+Boca+Raton+FL+33433',
    embedQuery: '21214+St+Andrews+Blvd+Boca+Raton+FL+33433',
  },

  /**
   * `days` uses schema.org DayOfWeek tokens so the JSON-LD builder can consume
   * this array directly — the hours are declared exactly once.
   */
  hours: [
    {
      label: 'Monday — Saturday',
      opens: '09:30',
      closes: '19:00',
      display: '9:30 AM — 7:00 PM',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    },
    {
      label: 'Sunday',
      opens: '11:00',
      closes: '17:00',
      display: '11:00 AM — 5:00 PM',
      days: ['Sunday'],
    },
  ],

  /**
   * ONLINE BOOKING — Rewanow scheduler, embedded in our own modal.
   *
   * WHY NOT THE OFFICIAL WIDGET:
   * Rewanow's documented integration (widget.js + a `rewanow-scheduler-container`
   * class + a `busid` attribute) does NOT open an in-page modal in practice — it
   * navigates the browser to `www.rewanow.com/scheduler/s;busid=<id>`, dumping the
   * visitor on a third-party domain mid-intent. That is abandonment waiting to
   * happen, so the widget script is deliberately not loaded.
   *
   * Instead <BookButton> opens <BookingModal>, which frames `url` below. Same
   * scheduler, same business id, but the customer never leaves the page.
   *
   * If Rewanow ever ships a widget that genuinely stays in-page, reinstate the
   * documented approach — the busid is already here.
   */
  booking: {
    provider: 'Rewanow',
    busid: '6147101790568448',
    // The URL Rewanow's own widget navigates to. Loaded into an iframe only.
    url: 'https://www.rewanow.com/scheduler/s;busid=6147101790568448',
  },

  /**
   * 360° VIRTUAL TOUR — the whole of vnmispa.com is the tour, produced by
   * media360plus.com. Embedded in an iframe by <VirtualTour>.
   *
   * It is NOT auto-loaded. A 360 viewer pulls megabytes of panorama textures
   * and spins up WebGL; mounting it on page load would wreck LCP and burn
   * mobile data for the majority of visitors who never open it. The section
   * shows a poster and only mounts the iframe on click.
   */
  tour: {
    url: 'https://vnmispa.com/',
    poster: '/tour-poster.jpg',
    credit: 'media360plus.com',
  },

  // TODO(vince): replace with the real Google Business Profile URL + socials.
  social: {
    instagram: null,
    facebook: null,
    googleBusiness: null,
  },
};

export const nav = [
  { label: 'Story', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Questions', href: '#faq' },
];

/**
 * LocalBusiness / NailSalon JSON-LD.
 * Built from the constants above so it can never drift from what's rendered.
 * Google reads `NailSalon` as a HealthAndBeautyBusiness subtype.
 */
export function buildLocalBusinessSchema(siteUrl = 'https://vmi-nail-spa.vercel.app') {
  return {
    '@context': 'https://schema.org',
    '@type': 'NailSalon',
    name: business.name,
    description: business.description,
    url: siteUrl,
    telephone: business.phone.raw,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: 'US',
    },
    openingHoursSpecification: business.hours.map((block) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: block.days,
      opens: block.opens,
      closes: block.closes,
    })),
    areaServed: [
      { '@type': 'City', name: 'Boca Raton' },
      { '@type': 'City', name: 'Delray Beach' },
      { '@type': 'City', name: 'Highland Beach' },
    ],
  };
}
