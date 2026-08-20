import { Cormorant_Garamond, Inter } from 'next/font/google';
import { business, buildLocalBusinessSchema } from '@/data/business';
import { BookingModal } from '@/components/BookingModal';
import { FloatingBook } from '@/components/FloatingBook';
import './globals.css';

/**
 * Two typefaces, no more.
 *   Cormorant Garamond — display. High-contrast old-style serif; the whole
 *     luxury read comes from this face at large sizes. It is too delicate for
 *     body copy, which is exactly why it is confined to headings.
 *   Inter — everything else. Boring on purpose.
 *
 * next/font self-hosts both and inlines the @font-face at build time: no
 * network request to Google at runtime, no FOUT, no layout shift from a
 * late-swapping fallback.
 */
const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const SITE_URL = 'https://vmi-nail-spa.vercel.app'; // TODO(vince): real domain

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${business.name} — Nail Salon in Boca Raton, FL`,
    template: `%s — ${business.name}`,
  },
  description: business.description,
  keywords: [
    'nail salon Boca Raton',
    'manicure Boca Raton',
    'pedicure Boca Raton',
    'dipping powder Boca Raton',
    'gel manicure',
    'jelly spa pedicure',
    'waxing Boca Raton',
    'St Andrews Blvd nail salon',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: business.name,
    title: `${business.name} — Nail Salon in Boca Raton, FL`,
    description: business.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${business.name} — Nail Salon in Boca Raton, FL`,
    description: business.description,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#FBFAF8',
  width: 'device-width',
  initialScale: 1,
  // Never disable zoom. Pinch-to-zoom is an accessibility requirement.
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        {/* Skip link — first focusable element on the page. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-bg"
        >
          Skip to content
        </a>

        {children}

        {/* In-page booking dialog. Every BookButton on the page opens this one
            instance. Rewanow's widget.js is deliberately NOT loaded — it
            redirects to their domain instead of opening a modal. */}
        <BookingModal />

        {/* Persistent book/call dock. Appears only between the hero and the
            closing CTA, so it never doubles a CTA that's already on screen. */}
        <FloatingBook />

        {/* LocalBusiness JSON-LD, generated from the same constants the page
            renders — the hours in the markup and the hours Google reads can
            never disagree. Match this to the Google Business Profile. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildLocalBusinessSchema(SITE_URL)),
          }}
        />
      </body>
    </html>
  );
}
