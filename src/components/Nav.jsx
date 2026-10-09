import { useState } from 'react'
import SlideOverlay from './SlideOverlay.jsx'

// Section B — CLONE_SPEC §5.2 (desktop), §5.3 (mobile menu), §8 "B — Nav".
//
// IMPORTANT: this nav is STATIC. `position: relative`, z-index 999999998.
// NOT sticky, NOT fixed, no backdrop blur, no scroll-state change, no shadow,
// no border. It simply scrolls away. Height 77px @1280.
// No hover state on the CTA; nav text links get instant `hover:underline` only
// (gated to @media (hover:hover) by future.hoverOnlyWhenSupported).

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'ESG', href: '/esg', leaf: true },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Customers', href: '/case-studies' },
  { label: 'Resources', href: '/employee-recognition' },
  { label: 'Purpose', href: '/our-purpose' },
  // label span gets `inline-block min-w-[5.2em]` so "Login"/"Open app" doesn't shift layout
  { label: 'Login', href: null, minWidth: true },
]

// §5.3 MOBILE_NAV_LINKS — note this set adds Blog and renames the demo link to
// "Book Demo". It is a different list from the desktop one.
const MOBILE_NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'ESG', href: '/esg', leaf: true },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Customers', href: '/case-studies' },
  { label: 'Resources', href: '/employee-recognition' },
  { label: 'Blog', href: '/blog' },
  { label: 'Purpose', href: '/our-purpose' },
  { label: 'Book Demo', href: '/schedule-a-demo' },
  { label: 'Login', href: null },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className="relative z-[999999998] flex w-full justify-between px-[2.9em] py-[1.7em] max-wf-phone:px-[1.5em]">
        <a href="/" className="flex w-[13.471em] items-center max-wf-tablet:w-[17em]">
          <img
            src="/assets/evergreen-logosvg-216cd4.svg"
            alt="Evergreen"
            className="h-auto w-full"
          />
        </a>

        <div className="flex items-center max-wf-tablet:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="mr-[2.5em] flex items-center font-normal text-black no-underline"
            >
              {link.leaf && (
                <img
                  src="/assets/ever-small-leafsvg-e988d6.svg"
                  alt=""
                  aria-hidden="true"
                  className="mr-[0.7em] w-[1.26708em]"
                />
              )}
              <span
                className={`text-[1.5625em] leading-[1.9] hover:underline${
                  link.minWidth ? ' inline-block min-w-[5.2em]' : ''
                }`}
              >
                {link.label}
              </span>
            </a>
          ))}

          {/* Secondary pill outline CTA — radius 30px, 2px black border, transparent
              bg, 175.72 x 39.92px @1280. No hover state, no transition. */}
          <a
            href="/schedule-a-demo"
            className="rounded-[30px] border-2 border-black px-[1.8em] py-[0.2em] font-normal text-black no-underline"
          >
            <span className="block text-[1.5625em] leading-[1.9]">Schedule a demo</span>
          </a>
        </div>

        {/* Hamburger trigger — 49.55px square at <=991px (§5.3) */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
          className="relative z-[2147483647] hidden size-[6em] items-center justify-center max-wf-tablet:flex"
        >
          <span className="relative block h-[1.55em] w-[4.15em]">
            <span
              className={`absolute left-0 block h-[0.35em] w-full bg-black transition-transform duration-200 ${
                menuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 block h-[0.35em] w-full bg-black transition-transform duration-200 ${
                menuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
              }`}
            />
          </span>
        </button>

        {/* Mobile menu overlay (§5.3). bg-white (#ffffff), centred column.
            Rendered INSIDE the nav bar div on purpose: the nav is z-[999999998]
            and the overlay z-[999999], so as a sibling the nav (and its logo)
            would paint on top. In the original (see
            _reference/screenshots/390-mobile-menu-open.png) the logo is covered
            and only the hamburger — z-[2147483647] — stays above the panel.
            Slide motion / body lock / focus trap / Escape live in SlideOverlay. */}
      <SlideOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        label="Main navigation"
        className="z-[999999] flex flex-col items-center justify-center"
      >
        {MOBILE_NAV_LINKS.map((link) =>
          link.leaf ? (
            <a
              key={link.label}
              href={link.href}
              className="mb-[4em] flex items-center font-normal text-black no-underline"
            >
              <img
                src="/assets/ever-small-leafsvg-e988d6.svg"
                alt=""
                aria-hidden="true"
                className="mr-[1em] h-[4em] w-[2em] max-wf-mini:mr-[0.9em] max-wf-mini:h-auto max-wf-mini:w-[1.8em]"
              />
              <span className="font-headline text-[4em] font-semibold leading-none max-wf-mini:text-[3em]">
                {link.label}
              </span>
            </a>
          ) : (
            <a
              key={link.label}
              href={link.href}
              className="mb-[1em] font-headline text-[4em] font-semibold leading-none text-black no-underline max-wf-mini:text-[3em]"
            >
              {link.label}
            </a>
          )
        )}
        </SlideOverlay>
      </div>
    </>
  )
}
