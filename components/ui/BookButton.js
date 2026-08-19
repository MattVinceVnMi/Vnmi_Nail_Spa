'use client';

import { CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/**
 * The online-booking trigger. Use this anywhere a "book" CTA appears.
 *
 * It opens <BookingModal> — an in-page dialog framing the Rewanow scheduler.
 * It does NOT navigate. No href, no window.open, no new tab. The customer
 * stays on the page, which is the whole point: a booking flow that hands the
 * visitor to an unfamiliar third-party domain mid-intent leaks conversions.
 *
 * Note the absence of Rewanow's `rewanow-scheduler-container` class and `busid`
 * attribute. Those are what their widget.js binds to, and its handler performs
 * a full-page redirect rather than opening a modal — so we don't load the
 * widget at all. See the comment block in data/business.js.
 */
export function BookButton({
  children = 'Book appointment',
  variant = 'primary',
  className = '',
  showIcon = true,
  onClick,
  ...rest
}) {
  function open(event) {
    onClick?.(event);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('vmi:open-booking'));
    }
  }

  return (
    <Button
      as="button"
      type="button"
      variant={variant}
      className={className}
      onClick={open}
      {...rest}
    >
      {showIcon && <CalendarCheck className="mr-2 h-4 w-4" aria-hidden="true" />}
      {children}
    </Button>
  );
}
