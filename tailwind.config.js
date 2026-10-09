/** @type {import('tailwindcss').Config} */

// Tokens transcribed from CLONE_SPEC.md §2 (colours/borders/radii), §3.1 (font stacks),
// §4.2 (breakpoints). Values come from the original site's own `@theme` block, so they
// are exact — do not round them. Sections should reference these token names and never
// hardcode a hex value.
//
// The original is Tailwind v4; this project is v3. Translations noted inline.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // v3 flag that wraps every `hover:` utility in `@media (hover: hover)`, which is
  // how the original (v4, where this is the default) emits its only hover effect.
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      // Webflow-flavoured max-width breakpoints, registered with the ORIGINAL names so the
      // class strings transcribed in CLONE_SPEC (e.g. `max-wf-tablet:px-[6vw]`) port 1:1.
      // v4 writes these as `@media not all and (min-width: 992px)`; the v3 equivalent is a
      // max-width query one sub-pixel below the breakpoint. Added via `extend` so Tailwind's
      // default min-width screens stay available.
      screens: {
        'max-wf-tablet': { max: '991.98px' },
        'max-wf-phone': { max: '767.98px' },
        'max-wf-mini': { max: '479.98px' },
      },
      colors: {
        // page / surfaces
        cream: '#fffff3', // page bg, light sections, testimonial card bg
        'cream-dark': '#edede2', // alternating section bg, footer social chips
        leaf: '#beedc0', // pill / badge / avatar-frame fill
        black: '#000000', // borders, rules, buttons, all headings
        white: '#ffffff', // on-black text, overlay (mobile menu / trial modal) bg

        // text levels
        'text-body': '#333333', // .marketing-root default inherited colour
        'text-strong': '#000000', // every h1-h4, every <p> in .marketing-root, nav links
        'text-default': '#474747', // --color-text, on <body> (visible outside .marketing-root)
        'text-muted': '#505363', // --color-text-muted (declared; unused on the homepage)

        // accents — declared in the original theme, not used by the homepage itself
        'primary-green': '#02a57e',
        'cool-1': '#f8f3f0',
        'cool-2': '#fde6da',
        'quote-leaf': '#c3f2c5', // rich-text blockquote bg — unused on homepage
      },

      fontFamily: {
        // Resolved through CSS variables declared in src/index.css so a font swap is
        // one line there. `sans` = Rubik stack, `headline` = display serif stack.
        sans: 'var(--font-sans)',
        headline: 'var(--font-headline)',
      },

      borderRadius: {
        // §2 "Radii actually used" — exact measured values.
        'pill-cta': '40.5px', // primary black button, trial-modal platform buttons
        'pill-nav': '30px', // nav outline CTA, SubmitButton
        'pill-stat': '46px', // 4 stat pills + 2 hero avatar pills
        card: '10px', // testimonial cards, value badge, FormDone/FormError, submit right side
        input: '7px', // newsletter email input left side, LabelledField
      },

      borderWidth: {
        // `border-2 border-black` → 2px solid #000 is the page's only stroke
        // (FormError is the single `border` = 1px exception).
        2: '2px',
      },

      maxWidth: {
        // `max-w-[49ch]` is kept in `ch` wherever the spec gives it; this alias exists
        // for convenience and resolves identically.
        '49ch': '49ch',
      },

      transitionTimingFunction: {
        // §7.2 / §7.6 — the only three curves on the page.
        drift: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)', // easeInOutQuad: drift leaves, overlay open
        'overlay-close': 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)', // Tailwind default; hamburger bars
      },

      transitionDuration: {
        // §7.6 overlay timings
        1000: '1000ms',
        500: '500ms',
      },

      zIndex: {
        // Arbitrary values in the spec markup are kept verbatim as `z-[...]`;
        // these named stops cover the recurring ones.
        nav: '999999998',
        overlay: '999999',
        'trial-modal': '999999999',
        'menu-button': '2147483647',
      },

      keyframes: {
        // §7.6 overlay slide, expressed as keyframes for the CSS-only fallback used
        // before framer-motion mounts. The real motion is driven by framer-motion.
        'overlay-in': {
          from: { transform: 'translateY(-110vh)' },
          to: { transform: 'translateY(0vh)' },
        },
        'overlay-out': {
          from: { transform: 'translateY(0vh)' },
          to: { transform: 'translateY(-110vh)' },
        },
      },

      animation: {
        'overlay-in': 'overlay-in 1000ms cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards',
        'overlay-out': 'overlay-out 500ms cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards',
      },
    },
  },
  plugins: [],
}
