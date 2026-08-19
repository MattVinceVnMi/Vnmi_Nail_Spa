/**
 * UNUSED — DO NOT MOUNT THIS.
 *
 * This loaded Rewanow's official widget.js, per their integration docs:
 * https://documents.rewanow.com/developers/online-appointment.html
 *
 * It was removed because the widget does not do what the docs imply. Instead of
 * opening an in-page modal, its click handler navigates the browser to
 * `https://www.rewanow.com/scheduler/s;busid=<id>` — dropping the customer on a
 * third-party domain in the middle of booking, which is where bookings get
 * abandoned.
 *
 * Booking now runs through <BookingModal>, which frames the same scheduler in a
 * dialog on this site. See the comment block in data/business.js.
 *
 * Kept as a record of what was tried. If Rewanow ships a widget that genuinely
 * stays in-page, delete this file and reinstate the documented integration —
 * the busid already lives in data/business.js.
 */

export function BookingScript() {
  return null;
}
