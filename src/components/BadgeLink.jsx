import { Link } from 'react-router-dom'

// Eyebrow badge pill — CLONE_SPEC_CONTENT_B §3.2 (also CONTENT_A's `EyebrowBadge`).
//
// DELIBERATE EXCEPTION to the site-wide "no hover on buttons/cards/pills" rule:
// this is the ONLY component with a real hover state — `hover:bg-white`
// (#beedc0 -> #ffffff) with `transition-colors` 150ms cubic-bezier(.4,0,.2,1).
// Do NOT propagate this hover to the message-card badge, which is visually
// identical but has no hover and no transition.
//
// font-size COMPOUNDS: text-[1.4375em] inside the p's 1.75em -> 26.833px @1280.
// line-height is 1 (from `.marketing-root a`), so the pill is 63.73px tall.
// Width is content-driven. No active or focus state is declared.
export default function BadgeLink({ label, href }) {
  return (
    <p className="mb-[1.4em] text-center">
      <Link to={href} className="no-underline">
        <span className="inline-flex items-center gap-[0.5em] rounded-full border-2 border-black bg-leaf px-[1.1em] py-[0.35em] text-[1.4375em] font-semibold text-black transition-colors hover:bg-white">
          <img
            src="/assets/ever-small-leafsvg-e988d6.svg"
            alt=""
            aria-hidden="true"
            className="w-[0.9em] shrink-0"
          />
          {label}
        </span>
      </Link>
    </p>
  )
}
