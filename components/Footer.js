import { business } from '@/data/business';

/**
 * Footer — copyright only.
 *
 * Deliberately stripped: no nav, no repeated NAP, no socials. Everything that
 * used to live here is already on the page (Visit carries the address, both
 * hour blocks, and the map; the phone number is in the nav and the CTA).
 *
 * Espresso to match the CTA directly above it, so the two read as one closing
 * block rather than two stacked dark bands. The hairline top border is the only
 * thing separating them.
 *
 * NOTE ON THE YEAR: this page is statically prerendered, so `getFullYear()`
 * evaluates at BUILD time, not on the visitor's clock. It will read 2026 until
 * the site is rebuilt. That's fine for a site that redeploys a few times a year;
 * if it ever goes stale, either rebuild or drop the year entirely — "© V&Mi Nail
 * Spa" is perfectly legitimate and never expires.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-bg/10 bg-espresso">
      <div className="shell py-8">
        <p className="text-center text-[0.75rem] tracking-wide text-bg/45">
          &copy; {year} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
