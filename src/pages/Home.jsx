import Hero from '../components/Hero.jsx'
import LeafDivider from '../components/LeafDivider.jsx'
import SeedsSection from '../components/SeedsSection.jsx'
import ReportCsrSection from '../components/ReportCsrSection.jsx'
import CtaSection from '../components/CtaSection.jsx'
import { SECTION_WRAPPER } from '../layout/Layout.jsx'

// Route "/" — CLONE_SPEC §1 sections C through H.
// Chrome (A banner, B nav, I footer) lives in Layout and is NOT repeated here.
export default function Home() {
  return (
    <>
      {/* C — hero + social proof. inner pt-[10.2em] lives in Hero. */}
      <section className="relative bg-cream">
        <div className={SECTION_WRAPPER}>
          <Hero />
        </div>
      </section>

      {/* D — leaf divider band 1 */}
      <LeafDivider />

      {/* E — "Publicly recognise your peers…" padding 18em 6em 5em, bg #edede2 */}
      <section className="relative bg-cream-dark">
        <div className={`${SECTION_WRAPPER} pb-[5em] pt-[18em]`}>
          <SeedsSection />
        </div>
      </section>

      {/* F — "Report on employee engagement…" + "Fulfill your CSR…" padding 8em 6em 0 */}
      <section className="relative bg-cream">
        <div className={`${SECTION_WRAPPER} pb-0 pt-[8em]`}>
          <ReportCsrSection />
        </div>
      </section>

      {/* G — leaf divider band 2 (identical to D) */}
      <LeafDivider />

      {/* H — pricing reassurance + final CTA, padding 18em 6em 5em, bg #edede2 */}
      <section className="relative bg-cream-dark">
        <div className={`${SECTION_WRAPPER} pb-[5em] pt-[18em]`}>
          <CtaSection />
        </div>
      </section>
    </>
  )
}
