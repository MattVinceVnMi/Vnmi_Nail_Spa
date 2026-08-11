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
          'A classic touch of elegance. Includes nail trimming and shaping, precise cuticle grooming, gentle buffing, a relaxing lotion massage, hot towel service, and finished with your choice of polish.',
        price: PRICE,
      },
      {
        name: 'V&Mi Deluxe Manicure',
        description:
          'An extension of our Basic Manicure for ultimate hand rejuvenation. Features an exfoliating sugar scrub (lavender, green tea, or citrus) and paraffin wax to deeply soften your arms. Finished with a hot towel service and an extended hand and arm massage.',
        price: PRICE,
        signature: true,
      },
      {
        name: 'Gel Manicure',
        description:
          'Long-lasting, flawless shine. A hybrid formula that applies like polish but wears like gel — providing strong natural nail protection with zero drying time and zero chipping.',
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
          'Essential foot care. Includes nail trimming, shaping, cuticle grooming, buffing, a soothing lotion massage, hot towel wrap, and a polish of your choice.',
        price: PRICE,
      },
      {
        name: 'V&Mi Deluxe Pedicure',
        description:
          'Revitalizing luxury for your legs and feet. Includes our Basic Pedicure plus a callus remover and your choice of exfoliating sugar scrub (lavender or green tea). Completed with a hot towel service and an extended foot and leg massage.',
        price: PRICE,
        signature: true,
      },
      {
        name: 'Organic Pedicure',
        description:
          "Nature's best for your feet. Features a callus treatment alongside a premium exfoliating organic sugar scrub (lavender, lemon, or mandarin) to gently remove dead skin and restore moisture.",
        price: PRICE,
      },
      {
        name: 'Jelly Spa Pedicure',
        description:
          'An unforgettable, ultra-luxurious experience. Submerge your feet in a unique jelly foot soak that retains heat four times longer than water. Includes a 10-minute jelly soak, special neck wrap relaxation, and the full Deluxe Pedicure treatment.',
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
          'Intense moisture therapy using warm paraffin wax to soothe and soften skin for hands or feet.',
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
          'Gentle, fun, and safe nail care tailored specifically for our younger guests.',
        price: PRICE,
      },
    ],
  },
];

/** Nav pills for the services filter. */
export const serviceCategories = services.map(({ id, title }) => ({ id, title }));
