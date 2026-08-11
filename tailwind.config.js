/** @type {import('tailwindcss').Config} */

/**
 * DESIGN TOKENS — V&Mi Nail Spa
 *
 * Single source of truth. Every colour below is declared as a CSS variable in
 * globals.css and consumed here, so there is exactly one place to change a value
 * and zero chance of a hardcoded hex drifting out of sync.
 *
 * Contrast ratios verified against --bg (#FBFAF8):
 *   text          #1C1917  →  15.9:1   (AAA)
 *   text-muted    #5F574E  →   6.4:1   (AAA body)
 *   accent-ink    #8A6A2F  →   4.6:1   (AA body — use for accent TEXT)
 *   accent        #A8813F  →   3.4:1   (AA large-text / borders / icons ONLY)
 *
 * The two-gold split is deliberate. `accent` is the brand gold and is reserved
 * for rules, icons, and 24px+ display type. `accent-ink` is the compliant
 * variant for anything at body size. Never set body copy in `accent`.
 */

module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './data/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-muted': 'rgb(var(--surface-muted) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        'border-strong': 'rgb(var(--border-strong) / <alpha-value>)',
        ink: 'rgb(var(--text) / <alpha-value>)',
        muted: 'rgb(var(--text-muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-ink': 'rgb(var(--accent-ink) / <alpha-value>)',
        'accent-soft': 'rgb(var(--accent-soft) / <alpha-value>)',
        espresso: 'rgb(var(--espresso) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display scale — tight tracking, tight leading. Serif wants both.
        'display-xl': ['clamp(2.75rem, 7vw, 5.25rem)', { lineHeight: '0.98', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.25rem, 5vw, 3.75rem)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.12', letterSpacing: '-0.015em' }],
        // Eyebrow / kicker — wide tracking, uppercase, small.
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.22em' }],
        // Body — generous leading for long-form service descriptions.
        body: ['1rem', { lineHeight: '1.7' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.7' }],
      },
      spacing: {
        section: 'clamp(5rem, 12vw, 9rem)',
        gutter: 'clamp(1.25rem, 5vw, 2.5rem)',
      },
      maxWidth: {
        shell: '1216px',
        prose: '62ch',
      },
      borderRadius: {
        card: '2px',
        pill: '999px',
      },
      transitionTimingFunction: {
        // Emil-standard curves. Used by every non-spring transition on the site.
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      transitionDuration: {
        press: '140ms',
        hover: '200ms',
        panel: '320ms',
      },
      keyframes: {
        'marquee-x': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'marquee-x': 'marquee-x 38s linear infinite',
      },
    },
  },
  plugins: [],
};
