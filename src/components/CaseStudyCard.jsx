import LeafLayer from './LeafLayer.jsx'
import { CARD_LEAVES } from '../lib/leaves.js'

// CLONE_SPEC_CORE_B §C-2.1 — the /case-studies card.
//
// ⚠️ THE CARD IS WIDER THAN ITS OWN FLEX ITEM, intentionally. The outer item is
// `w-[34.4013em]` = 366.94px, the white card inside is `w-[42em]` = 447.98px,
// and because the item is `flex flex-col items-center` the card overhangs
// 40.52px on EACH side. That overhang is what pulls the two columns closer than
// `space-between` on 927.98px would otherwise produce. Do not "fix" it.
//
// Measured card: 447.98 × 475.09 (row 1) / 447.98 × 446.77 (row 2) — `h-full`
// equalises within a row. White (#ffffff) surface, 2px black border, radius
// 10px, padding 45.0072 / 32 / 39.3333. No shadow, no gradient, no hover.
// The logos are EAGER (no loading attribute in the server HTML, §9).
// The 3 CARD_LEAVES are positioned relative to the OUTER item, not the card.
export default function CaseStudyCard({ logo, logoAlt, name, stat, blurb, href }) {
  return (
    <div className="relative flex w-[34.4013em] flex-col items-center max-wf-mini:w-auto">
      <LeafLayer leaves={CARD_LEAVES} />
      <div className="relative z-[100] flex h-full w-[42em] flex-col items-center rounded-[10px] border-2 border-black bg-white px-[3em] pt-[4.21943em] pb-[3.6875em] max-wf-mini:w-auto">
        <span className="flex justify-center">
          <img src={logo} alt={logoAlt} className="h-[4.3em]" />
        </span>
        <div className="my-[1.3em]">
          <h2 className="font-headline text-[4.5em] leading-[1.48] font-semibold text-black max-wf-mini:text-[3.9em]">
            {name}
          </h2>
        </div>
        {/* §C-3 "card stat figure + unit": 18.667 / 700 / 31.733 / #000 */}
        <div className="mb-[1.3em] flex font-semibold">
          <p className="text-center font-bold">{stat}</p>
          <p className="ml-[0.3em] text-center font-bold">Employees</p>
        </div>
        {/* §C-3 card blurb: 1.5625em = 16.667px; `max-w-[49ch]` of a 16.667px
            font is 518.47px, so the 380.02px content box binds. Keep the ch. */}
        <p className="mx-auto max-w-[49ch] text-center text-[1.5625em]">{blurb}</p>
        <div className="mt-[1.3em] max-wf-mini:min-h-[4.69em]">
          {/* no-underline, and NO hover state (§0.3) */}
          <a className="flex w-full justify-center no-underline" href={href}>
            <p className="mt-[0.5em] text-[1.75em] font-semibold">Read full case study</p>
          </a>
        </div>
      </div>
    </div>
  )
}
