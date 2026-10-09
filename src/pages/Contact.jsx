import CtaSection from '../components/CtaSection.jsx'
import FormCard from '../components/FormCard.jsx'
import HeroHeading from '../components/HeroHeading.jsx'
import LeafDivider from '../components/LeafDivider.jsx'
import ContactForm from '../components/form/ContactForm.jsx'
import { G2RatingBlock } from '../components/socialProofB.jsx'
import { SECTION_WRAPPER } from '../layout/Layout.jsx'

// Route "/contact" — CLONE_SPEC_CORE_B PART T.
// No announcement banner (§0.1). Doc height target 3063 @1280.
// Sections: A hero + form + G2 (45 / 1370.83, cream) · B divider (1383 /
// 161.98) · C final CTA (1513 / 1038.81, cream-dark).

const BLOCK = 'my-[4.2em] text-center max-wf-mini:my-[3.5em]'

// ⚠️ §0.4 — section 1 drops the 6em gutter: `px-0 max-wf-tablet:px-0`. The
// content still looks gutter-ed because every child is `mx-auto` with its own
// width. Leaving `px-[6em]` on would make the h1 and intro paragraph 128px
// narrower and re-wrap them.
const NO_GUTTER_WRAPPER = 'mx-auto -mt-[3em] w-full max-w-[1920px] px-0 max-wf-tablet:px-0'

export default function Contact() {
  return (
    <>
      {/* A — hero + contact form + G2. y 45, h 1370.83, bg cream. */}
      <section className="relative bg-cream">
        <div className={NO_GUTTER_WRAPPER}>
          <HeroHeading>Contact us</HeroHeading>

          {/* block 1 — intro paragraph, `max-w-[60ch]` = 711.08px, 2 lines.
              The three inline links take the bare `.marketing-root a` rule
              (600 weight, underlined, line-height 1) — §T-5. External hrefs
              (mailto: and the Notion help centre) are stripped per the
              clone's external-domain rule: anchors render with NO href,
              markup and styling otherwise unchanged. The trailing <br/> is
              real and contributes to the 63.47px block height. */}
          <div className={BLOCK}>
            <p className="mx-auto max-w-[60ch] text-center">
              Or send us a message via the form directly to <a>teemu@evergreen.so</a>
              <br />
              You might also like to <a href="/schedule-a-demo">schedule a demo</a> or visit our{' '}
              <a target="_blank" rel="noreferrer">
                help center
              </a>
              <br />
            </p>
          </div>

          {/* block 2 — white form card (§T-2 contact variant) + 3 CARD_LEAVES */}
          <div className={`${BLOCK} flex justify-center max-wf-phone:flex-col`}>
            <FormCard variant="contact">
              <ContactForm />
            </FormCard>
          </div>

          {/* block 3 — G2 rating block (§0.2), mb-0 */}
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
