import LeafLayer from './LeafLayer.jsx'
import { CARD_LEAVES } from '../lib/leaves.js'

// PriceCard — CLONE_SPEC_CORE_A §1.4. Markup transcribed verbatim from the spec.
//
// `bg-white` is deliberate and is the ONLY white *content* surface in the clone
// (CORE_A §0 / §8.2) — it breaks the homepage "white is overlay-only" rule.
// Do not substitute cream.
//
// NO states at all: no hover, no focus beyond the UA default on the link, no
// monthly/annual toggle, no tier variants (CORE_A §1.4 "States: none").
// NO gradients, NO box-shadows.
//
// The `<em>only` relies on a SYNTHESISED oblique of Rubik — the original ships
// no italic face (CORE_A §5 note 2). Do not load a real Rubik Italic.
//
// The 3 CARD_LEAVES are anchored to the OUTER frame, not the card, and sit at
// z 11/11/13 behind the z-100 card. They are drift leaves (1300/1500/1000ms,
// whileInView once/amount 0) — rendered here in their initial transforms with
// `marketing-drift-leaf`; the Animation agent animates x/y to 0.
export default function PriceCard() {
  return (
    <div className="relative mx-auto mt-[7.6em] flex w-[50.4013em] flex-col items-center max-wf-mini:w-[40em] max-wf-mini:max-w-full">
      <LeafLayer leaves={CARD_LEAVES} />
      <div className="relative z-[100] w-full rounded-[10px] border-2 border-black bg-white pt-[4.21943em] pb-[3.6875em]">
        <p className="mx-auto max-w-[49ch] text-center text-[1.5625em]">
          <em>only</em>
        </p>
        <h2 className="text-center font-headline text-[4.5em] leading-[1.48] font-semibold text-black max-wf-mini:text-[3.9em]">
          $3.99
        </h2>
        <p className="mx-auto max-w-[49ch] text-center text-[1.5625em]">
          per active user per month.
          <br />
          For Enterprise pricing: <a href="/contact">contact us</a>
        </p>
        <span className="absolute -top-[4.7em] left-[28%] z-[2] flex size-[8.36539em] items-end justify-center overflow-hidden rounded-full border-2 border-black bg-leaf">
          <img src="/assets/a-price-1png-5e6ffc.webp" alt="" aria-hidden="true" className="w-full" />
        </span>
        <span className="absolute -top-[4.7em] left-[49%] z-[1] flex size-[8.36539em] items-end justify-center overflow-hidden rounded-full border-2 border-black bg-leaf">
          <img src="/assets/a-price-2png-1bdf4a.webp" alt="" aria-hidden="true" className="w-full" />
        </span>
      </div>
    </div>
  )
}
