import { CARD_LEAVES, leafClassName, leafStyle } from '../lib/leaves.js'

// Section E — "Publicly recognise your peers with seeds they can plant into trees".
// Spec: CLONE_SPEC §1 row E (geometry), §5.8 (value badge + seed line),
// §3.3 (text roles), §7.2 CARD_LEAVES, §8 E (verbatim copy).
// Markup/class strings transcribed from the saved original
// (_reference/Evergreen _ Give recognition and plant trees.html), which is the
// authority for structure. Nothing here is rounded or re-derived.
//
// The section element + wrapper (`relative bg-cream-dark`, `-mt-[3em]`,
// `px-[6em] pt-[18em] pb-[5em]`) live in App.jsx per §1; this component is the
// single content block inside it.
//
// NO motion here (by design): the three CARD_LEAVES render in their INITIAL
// pre-drift transform via leafStyle() and carry `marketing-drift-leaf` so the
// Animation agent can drive the whileInView x/y → 0 drift (§7.2).
//
// Zero gradients, zero shadows, no hover/active states (§2, §7.4).

// §8 E — bullet copy, verbatim, in order.
const BULLETS = [
  'Timely peer-to-peer recognition with real trees your team can plant, posted to a public team channel.',
  'Every month, members of your team can each distribute 12 seeds to whomever they wish.',
  'Tag company values to understand who is championing and living them.',
]

export default function SeedsSection() {
  return (
    // Universal content-block (§1) + 2-col feature row.
    <div className="my-[4.2em] flex justify-center text-center max-wf-phone:flex-col max-wf-phone:items-center max-wf-mini:my-[3.5em]">
      {/* LEFT visual column — 34.4013em = 367px @1280 (§4.4 named column widths).
          The original gives this column NO responsive width override (unlike
          section F's visual column) — kept as-is. */}
      <div className="relative flex w-[34.4013em] flex-col items-center">
        {/* CARD_LEAVES (3), absolutely positioned relative to this column.
            Coordinates come from src/lib/leaves.js — never hardcoded here. */}
        <span aria-hidden="true" className="pointer-events-none">
          {CARD_LEAVES.map((leaf, i) => {
            const { src, style } = leafStyle(leaf)
            return (
              <img
                key={i}
                src={src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className={leafClassName(leaf)}
                style={style}
              />
            )
          })}
        </span>

        {/* ASSET_MANIFEST #24 — sn-2png, rendered 367 x 394 @1280 */}
        <img
          src="/assets/sn-2png-f6c14a.webp"
          alt="A screen of an employee being recognised"
          loading="lazy"
          decoding="async"
          className="relative z-20 w-full"
        />

        {/* §5.8 value badge — 189 x 48px, radius 10px, 2px #000, bg #beedc0 */}
        <div className="my-[2.02566em] rounded-[10px] border-2 border-black bg-leaf px-[1.5em] py-[0.8em]">
          <p className="text-[1.625em] font-semibold leading-[1.54]">Tagged Value: Grit</p>
        </div>

        {/* §5.8 seed line — small leaf (eager, per §6 loading-attribute list) + label */}
        <div className="flex items-center">
          <img
            src="/assets/ever-small-leafsvg-e988d6.svg"
            alt=""
            aria-hidden="true"
            className="mr-[0.7em] w-[1.26708em]"
          />
          <p className="text-[1.625em] font-semibold leading-[1.54]">Sue earned 3 seeds</p>
        </div>
      </div>

      {/* RIGHT copy column — ml-[9.91014em] (105.71px gap) + w-[50em] (533px) */}
      <div className="ml-[9.91014em] w-[50em] text-left max-wf-tablet:ml-[5.5em] max-wf-phone:mx-auto max-wf-phone:mt-[5em] max-wf-mini:ml-0 max-wf-mini:w-auto">
        {/* §3.3 "Section display heading" — 4.5em / 1.48 / 600 */}
        <h2 className="font-headline text-[4.5em] font-semibold leading-[1.48] text-black max-wf-mini:text-center max-wf-mini:text-[3.9em]">
          Publicly recognise your peers with seeds they can plant into trees
        </h2>

        {/* heading → bullet list gap 6.60743em = 70.48px (§4.4) */}
        <div className="mt-[6.60743em] max-wf-mini:mt-[5em]">
          {BULLETS.map((text) => (
            <div
              key={text}
              className="mb-[4em] flex items-start max-wf-mini:mb-[3.6em] max-wf-mini:flex-col max-wf-mini:items-center"
            >
              <img
                src="/assets/ever-small-leafsvg-e988d6.svg"
                alt=""
                aria-hidden="true"
                className="mt-[0.4em] w-[1.26708em] shrink-0 max-wf-mini:mb-[0.9em] max-wf-mini:w-[2em]"
              />
              <p className="ml-[0.7em] max-wf-mini:ml-0 max-wf-mini:text-center">{text}</p>
            </div>
          ))}
        </div>

        <div className="mb-[5em] flex flex-col items-start">
          {/* Display-size <p>, not a heading, in the original. */}
          <p className="font-headline text-[4.5em] font-semibold leading-[1.48] text-black max-wf-mini:text-center max-wf-mini:text-[3.9em]">
            x3.5
          </p>
          {/* §8 E: "Evergeen" is the ORIGINAL'S TYPO and is reproduced verbatim.
              Do not correct it. */}
          <p>
            The average times Evergeen users (active at least once a month) recognise their peers
            each month.
          </p>
        </div>
      </div>
    </div>
  )
}
