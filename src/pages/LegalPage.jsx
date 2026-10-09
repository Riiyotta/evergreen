import { useLocation } from 'react-router-dom'
import ProseBody from '../components/ProseBody.jsx'
import { SECTION_WRAPPER } from '../layout/Layout.jsx'
import { LEGAL_PAGES } from '../data/legalPages.js'

// T-LEGAL — /privacy-policy and /terms-of-service.
// Spec: CLONE_SPEC_CONTENT_B §2 (prose container), §2.3 (page map), §12.8,
// §14.6. Measured @1280: docH 8200 (privacy) / 3687 (terms); section height
// 7644.19 / 3131.92; h1 y 153.41 h 97.33; "Last updated" y 282.72; prose block
// y 367.78, h 7237.83 / 2725.56.
//
// ⚠️ ONE <section> only. NO leaf divider, NO final CTA, NO leaves anywhere in
// <main> — this is the only template in set B with no decorative leaf layer and
// no shared CTA. Do not add them.
// NO table of contents, NO heading anchors, NO `id` attributes (§1 negatives:
// the measured `id` count inside <main> is 0).
//
// The hero is centred; the prose block below it is left-aligned. Keep that
// contrast — it is the measured behaviour, not an oversight.
//
// `max-w-[49ch]` must stay in `ch` (§10): on the 65.333px h1 it resolves to
// 1981.52px (i.e. no constraint at all), on the 18.667px meta `p` to 580.714px.
export default function LegalPage() {
  const { pathname } = useLocation()
  const page = LEGAL_PAGES[pathname.replace(/^\//, '')]
  if (!page) return null

  return (
    <section className="relative bg-cream">
      <div className={`${SECTION_WRAPPER} pb-[5em]`}>
        {/* HERO — h1 + the plain centred "Last updated" line. */}
        <div className="pt-[10.2em] max-wf-mini:pt-[11.8em]">
          <div className="relative mx-auto w-[108em] max-wf-tablet:w-[80em] max-wf-phone:w-full max-wf-mini:flex max-wf-mini:w-auto max-wf-mini:flex-col max-wf-mini:items-center">
            <h1 className="mx-auto max-w-[49ch] text-center max-wf-mini:text-[3.9em]">
              {page.h1}
            </h1>
            {/* Plain text, NOT a <time>, no date attribute (§2.3). */}
            <div className="my-[3em]">
              <p className="mx-[3em] max-w-[49ch] text-center">{page.lastUpdated}</p>
            </div>
          </div>
        </div>

        {/* BODY — the one shared prose container (§2). */}
        <div className="mt-[5em] max-wf-mini:mt-[7.25em]">
          <ProseBody nodes={page.body} />
        </div>
      </div>
    </section>
  )
}
