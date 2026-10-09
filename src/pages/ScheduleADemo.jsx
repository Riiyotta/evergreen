import CtaSection from '../components/CtaSection.jsx'
import FormCard from '../components/FormCard.jsx'
import HeroHeading from '../components/HeroHeading.jsx'
import LeafDivider from '../components/LeafDivider.jsx'
import SchedulerPlaceholder from '../components/SchedulerPlaceholder.jsx'
import { G2RatingBlock } from '../components/socialProofB.jsx'
import { SECTION_WRAPPER } from '../layout/Layout.jsx'

// Route "/schedule-a-demo" — CLONE_SPEC_CORE_B PART D.
// No announcement banner (§0.1). Doc height target 3130 @1280.
// Sections: A hero + scheduler + G2 (45 / 1438.19, cream, NORMAL px-[6em]
// gutter) · B divider (1451 / 161.98) · C final CTA (1581 / 1038.81).

const BLOCK = 'my-[4.2em] text-center max-wf-mini:my-[3.5em]'

export default function ScheduleADemo() {
  return (
    <>
      {/* A — hero + scheduler card + G2. y 45, h 1438.19, bg cream. */}
      <section className="relative bg-cream">
        <div className={SECTION_WRAPPER}>
          <HeroHeading>Pick a time for a free demo</HeroHeading>

          {/* block 1 — intro paragraph, `max-w-[60ch]`, 4 line-boxes (the
              double <br/> is what makes the 126.94px height). Straight
              apostrophes in the source. The mailto: is external, so the anchor
              renders with no href. */}
          <div className={BLOCK}>
            <p className="mx-auto max-w-[60ch] text-center">
              A short walk-through of Evergreen, and time to ask any questions you have.
              <br />
              <br />
              If you can&#39;t find a suitable time please email <a>teemu@evergreen.so</a> with your
              preferred time, and we&#39;ll make it happen.
            </p>
          </div>

          {/* block 2 — white card (§T-2 demo variant, p-[2em]) holding the
              static scheduler placeholder (§D-3). */}
          <div className={`${BLOCK} flex justify-center max-wf-phone:flex-col`}>
            <FormCard variant="demo">
              <SchedulerPlaceholder />
            </FormCard>
          </div>

          {/* block 3 — G2 rating block, mb-0 */}
          <G2RatingBlock />
        </div>
      </section>

      {/* B — leaf divider, band colour = the cream section above. */}
      <LeafDivider />

      {/* C — final CTA, identical to homepage section H. */}
      <section className="relative bg-cream-dark">
        <div className={`${SECTION_WRAPPER} pt-[18em] pb-[5em]`}>
          <CtaSection />
        </div>
      </section>
    </>
  )
}
