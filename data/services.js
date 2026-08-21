/**
 * SERVICES MENU — V&Mi Nail Spa
 *
 * PRICING: every cost is the PRICE sentinel below. To go live, either
 *   (a) replace the sentinel per-item with a string like '$28', or
 *   (b) swap PRICE's value once for a global change.
 * Nothing renders a price literal anywhere else in the codebase.
 *
 * SHAPE:
 *   category = { id, title, kicker, note?, items: Item[] }
 *   Item     = { name, description, price }              // single price
 *            | { name, description, tiers: Tier[] }      // multiple prices
 *            | { name, description, price, options: [] } // one price, listed variants
 */

export const PRICE = '$[PRICE]';

export const services = [
  {
    id: 'manicure',
    title: 'Manicure',
    kicker: 'Hands',
    items: [
      {
        name: 'Basic Manicure',
        description:
          'Trim, shape, cuticle grooming, buffing, a lotion massage, hot towel, and the polish of your choice.',
        price: PRICE,
      },
      {
        name: 'V&Mi Deluxe Manicure',
        description:
          'Everything in the Basic, plus a sugar scrub — lavender, green tea, or citrus — paraffin wax, and an extended hand and arm massage.',
        price: PRICE,
        signature: true,
      },
      {
        name: 'Gel Manicure',
        description:
          'Applies like polish, wears like gel. No dry time, no chipping, and the natural nail stays protected underneath.',
        price: PRICE,
      },
    ],
  },

  {
    id: 'pedicure',
    title: 'Pedicure',
    kicker: 'Feet',
    items: [
      {
        name: 'Basic Pedicure',
        description:
          'Trim, shape, cuticle grooming, buffing, a soothing lotion massage, hot towel wrap, and polish.',
        price: PRICE,
      },
      {
        name: 'V&Mi Deluxe Pedicure',
        description:
          'Everything in the Basic, plus callus removal, a sugar scrub — lavender or green tea — and an extended foot and leg massage.',
        price: PRICE,
        signature: true,
      },
      {
        name: 'Organic Pedicure',
        description:
          'Callus treatment with an organic sugar scrub — lavender, lemon, or mandarin — to lift dead skin and restore moisture.',
        price: PRICE,
      },
      {
        name: 'Jelly Spa Pedicure',
        description:
          'A 10-minute jelly soak that holds heat four times longer than water, a warmed neck wrap, and the full Deluxe Pedicure.',
        price: PRICE,
        signature: true,
      },
    ],
  },

  {
    id: 'dipping-powder',
    title: 'Dipping Powder',
    kicker: 'Healthy Nails',
    note: 'Lightweight, vitamin-rich, and cured without UV light.',
    items: [
      {
        name: 'Dipping Powder Full Set',
        description:
          'A lightweight, durable, and vitamin-rich alternative for vibrant, strong nails.',
        price: PRICE,
      },
      {
        name: 'Dipping Powder Pink & White Full Set',
        description: 'A timeless, classic French look achieved with long-lasting dipping powder.',
        price: PRICE,
      },
      {
        name: 'Ombre Full Set',
        description: 'A seamless, modern gradient colour blend using durable dip powder.',
        price: PRICE,
      },
      {
        name: 'Shape & Tip Additions',
        description: 'Refine the silhouette or add length to any dipping powder set.',
        tiers: [
          { label: 'Almond / Coffin / Stiletto shape', price: PRICE },
          { label: 'Add with tip', price: PRICE },
        ],
      },
    ],
  },

  {
    id: 'enhancements',
    title: 'Nail Enhancements',
    kicker: 'Extensions',
    items: [
      {
        name: 'Solar',
        description: 'Premium acrylic enhancements for a durable, natural look.',
        tiers: [
          { label: 'Full set', price: PRICE },
          { label: 'Fill-in', price: PRICE },
        ],
      },
      {
        name: 'Liquid Gel',
        description: 'A glossy, lightweight enhancement that is flexible and natural-looking.',
        tiers: [
          { label: 'Full set', price: PRICE },
          { label: 'Fill-in', price: PRICE },
        ],
      },
    ],
  },

  {
    id: 'waxing',
    title: 'Waxing',
    kicker: 'Skin',
    items: [
      {
        name: 'Facial Waxing',
        description: 'Gentle hair removal, shaped to the face.',
        price: PRICE,
        options: ['Eyebrows', 'Upper lip', 'Chin', 'Nose', 'Ears', 'Sideburns', 'Full face'],
      },
      {
        name: 'Body Waxing',
        description: 'Smooth, flawless skin.',
        price: PRICE,
        options: [
          'Arms (half / full)',
          'Legs (half / full)',
          'Underarms',
          'Back',
          'Bikini',
          'Brazilian',
        ],
      },
    ],
  },

  {
    id: 'add-ons',
    title: 'Additional & Add-On',
    kicker: 'Finishing',
    items: [
      {
        name: 'Custom Design',
        description: 'French design, intricate nail art, or nail repairs.',
        price: PRICE,
      },
      {
        name: 'Paraffin Treatment',
        description:
          'Warm paraffin wax to soothe and soften — hands or feet.',
        price: PRICE,
      },
      {
        name: 'Polish & Removals',
        description: 'Gel and regular polish changes, plus gentle acrylic and gel removals.',
        price: PRICE,
      },
    ],
  },

  {
    id: 'kids',
    title: 'Kid Services',
    kicker: 'Under 10',
    items: [
      {
        name: 'Princess Manicure & Pedicure',
        description:
          'Gentle, fun, and safe — sized for guests under 10.',
        price: PRICE,
      },
    ],
  },
];

/** Nav pills for the services filter. */
export const serviceCategories = services.map(({ id, title }) => ({ id, title }));
