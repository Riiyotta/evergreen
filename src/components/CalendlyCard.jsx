import LeafLayer from './LeafLayer.jsx'
import SchedulerPlaceholder from './SchedulerPlaceholder.jsx'
import { HERO_LEAVES } from '../lib/leaves.js'
import { BLOCK } from '../lib/classes.js'

// CalendlyCard — CLONE_SPEC_CONTENT_B §5.5 (T-PARTNER hero, in place of the
// homepage's hero product screenshot).
//
// Wrapper 537.61px (`50.4013em`), `margin-top 81.067px`. Card 537.61 x 676.66px,
// bg #ffffff, 2px #000, radius 10px, padding 21.333px (`2em`), min-height
// 266.67px. The widget box is 490.95 x **630px fixed** (a literal px height, it
// does not scale with the root em).
//
// The original embeds a LIVE third-party Calendly iframe + widget.js. This clone
// strips every external domain by design, so the interior is the STATIC
// placeholder in SchedulerPlaceholder.jsx — the same stand-in /schedule-a-demo
// already uses (it existed before this template was built; reused rather than
// duplicated). Nothing here loads assets.calendly.com and nothing is interactive.
//
// MOTION (§11, and see the note below): the leaf layer behind the card is the
// homepage hero's leaf set, rendered here in its initial state. CONTENT_B §5.5
// prose says only the 8 scroll-tracked HERO leaves are used; the raw measurement
// (_reference/recon-b/partner_50pros.json, `motion[2..13]`) shows all **12**
// hero leaves present — 4 `marketing-drift-leaf` + 8 `marketing-scroll-leaf
// marketing-responsive-leaf`. The measurement is followed here. The scroll track
// element is this wrapper (it replaces the homepage's screenshot wrapper, which
// is what `useScroll` measures), hence `data-scroll-track="hero"`.
export default function CalendlyCard() {
  return (
    <div className={`${BLOCK} flex justify-center max-wf-phone:flex-col`}>
      <div
        data-scroll-track="hero"
        className="relative mt-[7.6em] flex w-[50.4013em] flex-col items-center max-wf-mini:w-[40em]"
      >
        <LeafLayer leaves={HERO_LEAVES} />
        <div className="relative z-[100] min-h-[25em] w-full rounded-[10px] border-2 border-black bg-white p-[2em] max-wf-mini:px-[1em]">
          {/* SchedulerPlaceholder already carries the measured widget box:
              `calendly-inline-widget h-[630px] min-w-[320px] w-full` →
              490.95 x 630 inside this card. The live `data-url` embed and the
              `[&>iframe]:h-full` child rule are intentionally absent (no iframe). */}
          <SchedulerPlaceholder />
        </div>
      </div>
    </div>
  )
}
