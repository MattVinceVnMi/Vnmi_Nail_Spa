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
  { label: 'Visit', href: '#visit' },
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
