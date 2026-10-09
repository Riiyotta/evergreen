import LinkCard from '../components/LinkCard.jsx'
import ProseBody from '../components/ProseBody.jsx'
import StatRow from '../components/StatRow.jsx'
import LeafDl from '../components/blocks/LeafDl.jsx'
import FaqDl from '../components/blocks/FaqDl.jsx'
import LeadMagnetForm from '../components/blocks/LeadMagnetForm.jsx'
import LeafDivider from '../components/LeafDivider.jsx'
import { SECTION_WRAPPER } from '../layout/Layout.jsx'
import { BLOCK } from '../lib/classes.js'
import { PILLAR } from '../data/pillar.js'

// T-PILLAR — /employee-recognition. The longest page on the site:
// docH **25065** @1280 (CLONE_SPEC_CONTENT_B §4.3; block y/h table in
// _reference/recon-b/er_hub.json).
//
// T-PILLAR = T-DETAIL plus three things and minus one:
//   + the 4-stat pill row (CLONE_SPEC §5.5 verbatim), in a `div.my-[4em]`
//   + inline card groups between prose blocks, also `div.my-[4em]`
//     (margin-block **42.667px**, NOT the standard 44.8px `my-[4.2em]`)
//   + a "Reading list" region: 8 consecutive `div.mt-[4em]` groups, each an
//     `h3` category label + a card grid
//   − the shared final CTA. This is the ONLY page in set B that replaces it:
//     no 3-icon row, no TrialButton, no Slack/Teams links, no small print —
//     just a display h2, a `max-w-[59ch]` paragraph and the lead-magnet form.
//
// The HERO has NO eyebrow badge (block y 44.61, h 377.86): h1 straight into the
// lede block.
//
// MOTION: nothing on this page animates except the 12 divider leaves (§11).
// The card grids have ZERO animation and no stagger — cards are static from
// first paint. Do not add any.
export default function EmployeeRecognitionHub() {
  return (
    <>
      <section className="relative bg-cream">
        <div className={`${SECTION_WRAPPER} pb-[5em]`}>
          {/* HERO — no badge. */}
          <div className="pt-[10.2em] max-wf-mini:pt-[11.8em]">
            <div className="relative mx-auto w-[108em] max-wf-tablet:w-[80em] max-wf-phone:w-full max-wf-mini:flex max-wf-mini:w-auto max-wf-mini:flex-col max-wf-mini:items-center">
              <h1 className="mx-auto max-w-[49ch] text-center max-wf-mini:text-[3.9em]">
                {PILLAR.h1}
              </h1>
              <div className={BLOCK}>
                <p className="mx-auto max-w-[49ch] text-center">{PILLAR.lede}</p>
              </div>
            </div>
          </div>

          {PILLAR.blocks.map((block, index) => {
            switch (block.kind) {
              case 'prose':
                return <ProseBody key={index} nodes={block.nodes} />

              // §4.3 item 3 — stat row inside a `my-[4em]` wrapper.
              case 'stats':
                return (
                  <div key={index} className="my-[4em]">
                    <StatRow />
                  </div>
                )

              // §4.2 grid geometry: `ul.flex w-full flex-wrap justify-center
              // gap-[3em]`, 2 columns of 447.98px at 1280, rows stretch.
              case 'cards':
                return (
                  <div key={index} className="my-[4em]">
                    <CardGrid cards={block.cards} />
                  </div>
                )

              // The LEAF_DL "vocabulary" block + one centred glossary card.
              // Measured: dl h 1534.1 then 44.8px then a 229.14px card, inside
              // one `my-[4em]` wrapper (total 1808.0).
              case 'vocabulary':
                return (
                  <div key={index} className="my-[4em]">
                    <LeafDl rows={block.rows} />
                    <div className={BLOCK}>
                      <ul className="flex w-full flex-wrap justify-center gap-[3em]">
                        <LinkCard as="h3" {...block.card} />
                      </ul>
                    </div>
                  </div>
                )

              // §3.3 SECTION_HEADING — centred display h2, inner `w-[70.3em]`.
              case 'heading':
                return (
                  <div
                    key={index}
                    className={`${BLOCK} flex justify-center max-wf-phone:flex-col`}
                  >
                    <div className="mx-auto mt-0 w-[70.3em] max-wf-phone:w-auto max-wf-mini:mt-[3em] max-wf-mini:w-auto">
                      <h2 className="font-headline text-center text-[4.5em] font-semibold leading-[1.48] text-black max-wf-mini:text-center max-wf-mini:text-[3.9em]">
                        {block.text}
                      </h2>
                    </div>
                  </div>
                )

              // Plain <dl>, not an accordion (§3.8).
              case 'faq':
                return <FaqDl key={index} rows={block.rows} />

              // §4.3 item 4 — 8 `div.mt-[4em]` groups, each h3 + card grid.
              case 'readingList':
                return (
                  <div key={index}>
                    {block.groups.map((group) => (
                      <div key={group.h3} className="mt-[4em]">
                        <h3 className="text-center text-[2.5em] font-bold leading-[1.54] text-black max-wf-phone:text-[2.4em]">
                          {group.h3}
                        </h3>
                        <div className={BLOCK}>
                          <CardGrid cards={group.cards} />
                        </div>
                      </div>
                    ))}
                  </div>
                )

              default:
                return null
            }
          })}
        </div>
      </section>

      {/* Divider band follows the section above → bg-cream (§1). */}
      <LeafDivider band="bg-cream" />

      {/* ── REPLACED final CTA (§4.3 item 5) — y 23543.48, h 1010.95. ───── */}
      <section className="relative bg-cream-dark">
        <div className={`${SECTION_WRAPPER} pb-[5em] pt-[18em]`}>
          {/* Display h2 — note the wrapper is `w-auto`, NOT the shared CTA's
              `w-[51em]`. Wraps to 3 lines at 1280 (measured h 182.91) and is a
              fragile wrap under the Gloock substitute (§16.1). */}
          <div
            className={`${BLOCK} mt-0 flex justify-center max-wf-mini:mt-0 max-wf-phone:flex-col`}
          >
            <div className="mt-0 w-auto max-wf-mini:mt-[3em] max-wf-mini:w-auto">
              <h2 className="font-headline text-center text-[6.125em] font-semibold leading-[1.4] text-black max-wf-mini:text-[5.1em]">
                {PILLAR.finalCta.heading}
              </h2>
            </div>
          </div>

          {/* The only `max-w-[59ch]` paragraph in set B (699.47px). */}
          <div className={BLOCK}>
            <p className="mx-auto max-w-[59ch] text-center">
              {PILLAR.finalCta.paragraphLead}
              <br />
              <br />
              {PILLAR.finalCta.paragraphTail}{' '}
              <strong>
                <strong>{PILLAR.finalCta.paragraphStrong}</strong>
              </strong>
            </p>
          </div>

          {/* The same LeadMagnetForm as T-EBOOK (§7). No TrialButton, no icon
              row, no platform links, no small print on this page. */}
          <LeadMagnetForm />
        </div>
      </section>
    </>
  )
}

// Shared card grid (§4.2). `as="h3"` because these are in-article card groups,
// not a top-level listing.
function CardGrid({ cards }) {
  return (
    <ul className="flex w-full flex-wrap justify-center gap-[3em]">
      {cards.map((item) => (
        <LinkCard key={item.href} as="h3" {...item} />
      ))}
    </ul>
  )
}
