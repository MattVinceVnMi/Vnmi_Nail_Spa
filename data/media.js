/**
 * IMAGE MANIFEST
 *
 * Every image on the site is declared here once. The files in /public are
 * on-brand PLACEHOLDERS — real dimensions, real aspect ratios, obviously
 * temporary.
 *
 * TO REPLACE: drop your photo into /public using the same filename and the
 * same aspect ratio. Nothing else changes. Update `alt` while you're there —
 * descriptive alt text is worth real local-SEO points on a salon site.
 *
 * Aspect ratios are load-bearing. The wrappers reserve the box before the
 * image resolves, which is what keeps CLS at 0. If you swap in a photo with a
 * different ratio, change the wrapper class too — don't just let it letterbox.
 */

export const media = {
  // Full-bleed hero background. Landscape, 3:2. Shot wide — the composition
  // is centre-weighted and the edges get cropped hard on mobile.
  hero: {
    src: '/hero.jpg',
    width: 2400,
    height: 1600,
    alt: 'The V&Mi Nail Spa studio interior in Boca Raton',
  },

  // About / story portrait. 4:5.
  about: {
    src: '/about.jpg',
    width: 1200,
    height: 1500,
    alt: 'A manicure in progress at V&Mi Nail Spa',
  },

  /**
   * Gallery. The first item is the featured tile and spans 2x2 on desktop —
   * give it your strongest portrait shot (4:5). The rest are square (1:1).
   */
  gallery: [
    { src: '/gallery-01.jpg', width: 1200, height: 1500, alt: 'Almond-shape ombré dipping powder set', featured: true },
    { src: '/gallery-02.jpg', width: 1000, height: 1000, alt: 'Classic pink and white French manicure' },
    { src: '/gallery-03.jpg', width: 1000, height: 1000, alt: 'Gel manicure in a soft neutral shade' },
    { src: '/gallery-04.jpg', width: 1000, height: 1000, alt: 'Hand-painted nail art detail' },
    { src: '/gallery-05.jpg', width: 1000, height: 1000, alt: 'Jelly spa pedicure treatment' },
    { src: '/gallery-06.jpg', width: 1000, height: 1000, alt: 'Coffin-shape liquid gel full set' },
    { src: '/gallery-07.jpg', width: 1000, height: 1000, alt: 'Chrome finish on a short square set' },
    { src: '/gallery-08.jpg', width: 1000, height: 1000, alt: 'Paraffin treatment for hands' },
  ],
};

/**
 * TESTIMONIALS
 *
 * TODO(vince): replace with real reviews from the Google Business Profile.
 * These are placeholders and are marked as such — do not publish them as
 * real customer quotes. Attribute first name + last initial only, which is
 * how Google displays them and avoids any consent question.
 */
export const testimonials = [
  {
    quote:
      'I have been going for two years and have never once had a rushed appointment. They take the time, and it shows — my dip sets last a full four weeks without a single chip.',
    name: 'Danielle R.',
    source: 'Google Review',
    placeholder: true,
  },
  {
    quote:
      'The jelly pedicure is worth every minute. The water stays hot the whole way through, which sounds like a small thing until you have had the alternative everywhere else.',
    name: 'Marisol T.',
    source: 'Google Review',
    placeholder: true,
  },
  {
    quote:
      'They opened a brand new file and buffer in front of me without my asking. That told me everything I needed to know about how the rest of the place is run.',
    name: 'Karen L.',
    source: 'Google Review',
    placeholder: true,
  },
  {
    quote:
      'I came in with a badly damaged set from another salon. They soaked it off properly instead of drilling it down, and my natural nails actually recovered.',
    name: 'Ana P.',
    source: 'Google Review',
    placeholder: true,
  },
  {
    quote:
      'I brought my daughter in for the princess manicure before a school dance. They were patient with her, kept it short, and she has not stopped looking at her hands since.',
    name: 'Jessica W.',
    source: 'Google Review',
    placeholder: true,
  },
  {
    quote:
      'Booked an ombré set on a Saturday expecting a wait and got seated within ten minutes. The shaping is the cleanest I have had in Boca — the sidewalls are actually straight.',
    name: 'Priya N.',
    source: 'Google Review',
    placeholder: true,
  },
  {
    quote:
      'They told me my nails were too thin for a full set that day and did a strengthening manicure instead. Nobody has ever talked me out of the more expensive service before.',
    name: 'Robert C.',
    source: 'Google Review',
    placeholder: true,
  },
  {
    quote:
      'Been coming for eight months. Same technician every time, remembers the shape I like, no reminding needed. That consistency is the whole reason I stopped shopping around.',
    name: 'Lisa M.',
    source: 'Google Review',
    placeholder: true,
  },
  {
    quote:
      'The waxing is quick and genuinely painless compared to where I used to go, and they never try to upsell me into three more areas while I am lying there.',
    name: 'Sofia G.',
    source: 'Google Review',
    placeholder: true,
  },
];
