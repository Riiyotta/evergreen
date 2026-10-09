import LeadMagnetForm from '../components/blocks/LeadMagnetForm.jsx'
import LeafLayer from '../components/LeafLayer.jsx'
import LeafDivider from '../components/LeafDivider.jsx'
import CtaSection from '../components/CtaSection.jsx'
import G2Block from '../components/G2Block.jsx'
import { CARD_LEAVES } from '../lib/leaves.js'
import { BLOCK } from '../lib/classes.js'
import { SECTION_WRAPPER } from '../layout/Layout.jsx'
import { EBOOK } from '../data/ebook.js'

// T-EBOOK — /ebook/practical-guide-to-employee-recognition.
// Spec: CLONE_SPEC_CONTENT_B §7 (the form), §7.1 (page map), §12.9, §14.6.
// Measured @1280: docH 3347; section 1 y 44.61 h 1655.13; hero y 44.61 h 303.45;
// lede y 392.86 h 571.22; form card y 1008.88 h 433.05; G2 y 1516.58 h 183.16;
// divider y 1667.75; final CTA y 1797.75 h 1038.81.
//
// ⚠️ ZERO-GUTTER CONTAINER. This is the only page in set B that breaks the
// `px-[6em]` container contract (§7.1, §16.7): its wrapper is
// `px-0 max-wf-tablet:px-0`, so blocks are full-bleed 1280px and rely on their
// own `mx-auto` + `max-w`. That is why SECTION_WRAPPER is NOT used here — the
// string below is the measured one, with the padding utilities swapped out.
const EBOOK_WRAPPER = 'mx-auto -mt-[3em] w-full max-w-[1920px] px-0 max-wf-tablet:px-0'

export default function EbookPage() {
  const { lede } = EBOOK

  return (
    <>
      <section className="relative bg-cream">
        <div className={EBOOK_WRAPPER}>
          {/* HERO — no eyebrow badge. h1 > strong = 65.333px / 97.347px / 700. */}
          <div className="pt-[10.2em] max-wf-mini:pt-[11.8em]">
            <div className="relative mx-auto w-[108em] max-wf-tablet:w-[80em] max-wf-phone:w-full max-wf-mini:flex max-wf-mini:w-auto max-wf-mini:flex-col max-wf-mini:items-center">
              <h1 className="mx-auto max-w-[49ch] text-center max-wf-mini:text-[3.9em]">
                <strong>{EBOOK.h1}</strong>
              </h1>
            </div>
          </div>

          {/* LEDE — one paragraph, `max-w-[60ch]` = 711.08px (the only 60ch
              paragraph in set B), carrying 9 <br>, a <strong>, and an
              <em><sub> 5-line list at 14px / line-height 0 (role N20). The
              line-height 0 on the <sub> is measured, not a mistake. */}
          <div className={BLOCK}>
            <p className="mx-auto max-w-[60ch] text-center">
              {lede.intro}
              <br />
              <br />
              <strong>{lede.callToAction}</strong>
              <br />
              <br />
              <em>
                <sub>
                  {lede.bullets.map((bullet, index) => (
                    <span key={bullet}>
                      {bullet}
                      {index < lede.bullets.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </sub>
              </em>
              <br />
              <br />
              {lede.closing}
              <br />
              {lede.closingEmoji}
            </p>
          </div>

          {/* FORM CARD — wrapper `w-[50em]` = 533.33px, `mt-[7.6em]`; card
              533.33 x 351.98, padding 45.007px 42.667px 32px, min-height
              266.67px, bg #ffffff. 3 CARD_LEAVES behind it, initial state only
              (drift 1300/1500/1000ms is the Animation agent's). */}
          <div className={`${BLOCK} flex justify-center max-wf-phone:flex-col`}>
            <div className="relative mx-auto mt-[7.6em] flex w-[50em] flex-col items-center max-wf-mini:w-[90%]">
              <LeafLayer leaves={CARD_LEAVES} />
              <div className="relative z-[100] min-h-[25em] w-full rounded-[10px] border-2 border-black bg-white px-[4em] pt-[4.21943em] pb-[3em] max-wf-mini:px-[2em]">
                <LeadMagnetForm />
              </div>
            </div>
          </div>

          {/* G2 block — identical to CLONE_SPEC §5.10; carries its own
              `my-[4.2em] mb-0` block wrapper and `mt-[7em]`. */}
          {EBOOK.showG2 && <G2Block />}
        </div>
      </section>

      {/* Divider band follows the section above it → bg-cream (§1). */}
      <LeafDivider band="bg-cream" />

      {/* Standard final CTA, unchanged (§1). */}
      <section className="relative bg-cream-dark">
        <div className={`${SECTION_WRAPPER} pb-[5em] pt-[18em]`}>
          <CtaSection />
        </div>
      </section>
    </>
  )
}
