import EarningsTiers from '../components/EarningsTiers.jsx'
import FormCard from '../components/FormCard.jsx'
import HeroHeading from '../components/HeroHeading.jsx'
import LeafDivider from '../components/LeafDivider.jsx'
import ReferralForm from '../components/form/ReferralForm.jsx'
import {
  G2RatingBlock,
  ReferralLogoStrip,
  ReferralTestimonials,
} from '../components/socialProofB.jsx'
import { SECTION_WRAPPER } from '../layout/Layout.jsx'

// Route "/referral" — CLONE_SPEC_CORE_B PART R.
// No announcement banner (§0.1). Doc height target 4007 @1280.
//
// ⚠️ DIFFERENT SECTION RECIPE (§R-1):
//   A hero + form + footnote   45   / 1633.73  cream      px-0 (no gutter)
//   B earnings tiers           1691 /  526.03  cream      pb-[5em] ONLY, no pt
//   C leaf divider             2185 /  161.98
//   D testimonials+logos+G2    2315 / 1180.84  cream-dark pt-[15em] pb-[10em]
//   E footer                   3464
// There is NO "Start feeling good about work" final-CTA section and no
// 3-icon pricing-reassurance row on this route — the page ends on social
// proof. It is the only one of the four that breaks that pattern.
// ⚠️ Sections A and B are two consecutive bg-cream sections flush with no
// divider; the -mt-[3em] overlap still applies, so there is no seam.
// ⚠️ <main> on /referral contains ZERO <a> elements.

const BLOCK = 'my-[4.2em] text-center max-wf-mini:my-[3.5em]'

// §0.4 — section 1 drops the 6em gutter.
const NO_GUTTER_WRAPPER = 'mx-auto -mt-[3em] w-full max-w-[1920px] px-0 max-wf-tablet:px-0'

export default function Referral() {
  return (
    <>
      {/* A — hero + referral form + footnote. y 45, h 1633.73, bg cream. */}
      <section className="relative bg-cream">
        <div className={NO_GUTTER_WRAPPER}>
          <HeroHeading>Evergreen referral program</HeroHeading>

          {/* block 1 — intro paragraph, `max-w-[60ch]`, 3 lines, ends with a
              <br/>. Curly ’ in "you’ll"; the original's grammatical slip
              "become customer" is verbatim. <strong> → weight 700 (§3.2). */}
          <div className={BLOCK}>
            <p className="mx-auto max-w-[60ch] text-center">
              Know an organization looking to improve their company culture? Share their contact
              info and when they become customer, you’ll get some side cash. We pay you{' '}
              <strong>30% of the revenue</strong> your referral brings during the first 6 months.
              <br />
            </p>
          </div>

          {/* block 2 — white form card (§T-2 referral variant) + 3 CARD_LEAVES */}
          <div className={`${BLOCK} flex justify-center max-wf-phone:flex-col`}>
            <FormCard variant="referral">
              <ReferralForm />
            </FormCard>
          </div>

          {/* block 3 — footnote paragraph, `max-w-[60ch]`, 2 lines, trailing <br/> */}
          <div className={BLOCK}>
            <p className="mx-auto max-w-[60ch] text-center">
              Payments will be made quarterly. Only applies to new introductions made and the
              introduction is valid for 6 months.
              <br />
            </p>
          </div>
        </div>
      </section>

      {/* B — earnings tiers. y 1691, h 526.03, bg cream.
          ⚠️ padding is `0 64px 53.3333px` — pb-[5em] only, NO top padding. */}
      <section className="relative bg-cream">
        <div className={`${SECTION_WRAPPER} pb-[5em]`}>
          {/* 🚩 FRAGILE WRAP (§R-3): this h2 sits at exactly 2 line-boxes
              (142.06px) inside a 749.86px frame with no slack. The display
              serif is a substitute (Gloock, size-adjust 92.44%) because the
              original's ivypresto-headline is Typekit-bound. */}
          <div
            className={`${BLOCK} mt-0 flex justify-center max-wf-mini:mt-0 max-wf-phone:flex-col`}
          >
            <div className="mt-[7.4em] w-[70.3em] max-wf-phone:w-full max-wf-mini:mt-[3em] max-wf-mini:w-auto">
              <h2 className="font-headline text-center text-[4.5em] leading-[1.48] font-semibold text-black max-wf-mini:text-center max-wf-mini:text-[3.9em]">
                Your earnings will be based on the amount of users your referral has
              </h2>
            </div>
          </div>

          <EarningsTiers />
        </div>
      </section>

      {/* C — leaf divider. Band colour matches the section ABOVE (cream). */}
      <LeafDivider />

      {/* D — testimonials + logo strip + G2. y 2315, h 1180.84, bg cream-dark.
          ⚠️ `pt-[15em] pb-[10em]` is a NEW padding pair — every homepage dark
          section is 18em / 5em. */}
      <section className="relative bg-cream-dark">
        <div className={`${SECTION_WRAPPER} pt-[15em] pb-[10em]`}>
          <ReferralTestimonials />
          <ReferralLogoStrip />
          <G2RatingBlock />
        </div>
      </section>
    </>
  )
}
