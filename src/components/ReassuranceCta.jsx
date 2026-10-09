import CtaSection from './CtaSection.jsx'
import { SECTION_WRAPPER } from '../layout/Layout.jsx'

// Final reassurance trio + CTA — SHARED by /esg (§2.1 row I) and /our-purpose
// (§3.1 row F). CLONE_SPEC_CORE_A §2.7: "Byte-identical (classes, text,
// geometry) to CLONE_SPEC §1-H … verified by DOM diff over the last 103 nodes
// of both pages."
//
// So the body is the homepage's existing <CtaSection/>, reused UNCHANGED — this
// file only supplies the <section> + wrapper shell that Home.jsx supplies
// inline for route "/" (`relative bg-cream-dark`, `pt-[18em] pb-[5em]`,
// section height 1038.81 @1280). CtaSection.jsx is NOT modified, so the
// homepage cannot regress.
export default function ReassuranceCta() {
  return (
    <section className="relative bg-cream-dark">
      <div className={`${SECTION_WRAPPER} pb-[5em] pt-[18em]`}>
        <CtaSection />
      </div>
    </section>
  )
}
