import LeafDivider from '../components/LeafDivider.jsx'
import SdgSection from '../components/SdgSection.jsx'
import ReassuranceCta from '../components/ReassuranceCta.jsx'
import { SECTION_WRAPPER } from '../layout/Layout.jsx'
import IconFeatureColumn from '../components/IconFeatureColumn.jsx'

// Route "/our-purpose" — CLONE_SPEC_CORE_A PART 3. Chrome lives in Layout; this
// route has NO announcement banner (§0), already handled by BANNER_ROUTES.
//
// Section map (@1280, CORE_A §3.1) — total document height 3838px:
//   A hero              y   44.61  h  507.72  bg-cream       pb-[5em]; inner pt-[10.2em]
//   B "Goals By 2027"   y  520.34  h  484.81  bg-leaf        no py
//   C divider, band bg-leaf        h  161.98
//   D UN SDG            y 1103.17  h 1087.30  bg-cream-dark  (shared with /esg)
//   E divider, band bg-cream-dark  h  161.98
//   F reassurance + CTA y 2288.48  h 1038.81  bg-cream-dark  (shared with /esg)
//
// §3.1 / §8.5: section B is `bg-leaf` on BOTH the <section> and the inner
// heading <div> — keep both; the inner fill is what paints the heading band
// where the wrapper's -mt-[3em] overlaps the hero above.
//
// MOTION: 24 DIVIDER_LEAVES (2 x 12) only, rendered in their initial pre-drift
// transform by LeafDivider. The 4 hero wreath leaves (2 desktop + 2 phone) are
// STATIC and must never get a drift class (§3.4) — they are plain <img> with
// real alt text and no inline transform.
//
// Zero gradients, zero box-shadows, zero hover states (§0).

// §1 universal content-block rule.
const BLOCK = 'my-[4.2em] text-center max-wf-mini:my-[3.5em]'

// §3.3 — the three "Goals By 2027" stat columns (serif IconFeatureColumn
// variant, identical class strings to §1.5). Copy verbatim from §3.6.
const GOALS_2027 = [
  {
    src: '/assets/icon-treesvg-fb7494.svg',
    alt: 'Planting tree logo',
    figure: '1 million',
    caption: 'Trees planted by our users through Evergreen.',
  },
  {
    src: '/assets/company-1ddd00.svg',
    alt: 'Organisation logo',
    figure: '+1,000',
    caption: 'Organizations use Evergreen to enhance their company culture.',
  },
  {
    src: '/assets/checked-a91d37.svg',
    alt: 'User recognition logo',
    figure: '+100,000',
    caption: 'Users give constant recognition to their colleagues.',
  },
]

export default function OurPurpose() {
  return (
    <>
      {/* ================= A — hero ================= */}
      <section className="relative bg-cream">
        <div className={`${SECTION_WRAPPER} pb-[5em]`}>
          <div className="pt-[10.2em] max-wf-mini:pt-[11.8em]">
            <div className="relative mx-auto w-[108em] max-wf-tablet:w-[80em] max-wf-phone:w-full max-wf-mini:flex max-wf-mini:w-auto max-wf-mini:flex-col max-wf-mini:items-center">
              {/* Phone-only leaf pair — display:none above 767px. STATIC. */}
              <div className="mb-[2em] hidden justify-center max-wf-phone:flex">
                <img
                  src="/assets/leaf-smaller-reflectsvg-c42957.svg"
                  alt=""
                  aria-hidden="true"
                  className="w-[5em]"
                />
                <img
                  src="/assets/leaf-smallersvg-6114e8.svg"
                  alt=""
                  aria-hidden="true"
                  className="ml-[4em] w-[5em]"
                />
              </div>

              <h1 className="mx-auto max-w-[49ch] text-center max-wf-mini:text-[3.9em]">
                Our Purpose
              </h1>

              {/* Leaf | paragraph | leaf. The flanking wreaths are STATIC
                  decorative images with REAL alt text (§3.2) — unlike every
                  other leaf on the site. No drift class, no inline transform. */}
              <div className="mb-[4.2em] mt-[4.2em] flex justify-center text-center max-wf-phone:flex-col max-wf-mini:mb-[3.5em] max-wf-mini:mt-[2em]">
                <span className="flex items-center max-wf-phone:hidden">
                  <img
                    src="/assets/leaf-smaller-reflectsvg-c42957.svg"
                    alt="leaf wreath on left"
                    className="h-[14.7087em] w-[8.34021em]"
                  />
                </span>
                <p className="mx-[3em] max-w-[49ch] text-center max-wf-mini:mb-[2em] max-wf-mini:mt-[1em] max-wf-mini:mx-0">
                  For us, our purpose defines everything we do.
                  <br />
                  <br />
                  We help organizations live happier and have healthier company culture, and help
                  our planet be happier and healthier at the same time.
                </p>
                <span className="flex items-center max-wf-phone:hidden">
                  <img
                    src="/assets/leaf-smallersvg-6114e8.svg"
                    alt="leaf wreath on right"
                    className="h-[14.7087em] w-[8.34021em]"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= B — "Goals By 2027" band =================
          First full-bleed `bg-leaf` (#beedc0) section anywhere in the clone —
          this is correct, not a bug (§3.3). No section padding; the heading
          div owns `pt-[11.5322em]` = 123.01px. */}
      <section className="relative bg-leaf">
        <div className={SECTION_WRAPPER}>
          <div className="bg-leaf pt-[11.5322em] text-center">
            <h2 className="font-headline text-[6.125em] font-semibold leading-[1.4] text-black max-wf-mini:text-[5.1em]">
              Goals By 2027
            </h2>
          </div>

          {/* 3-up serif column row — `justify-around`, `w-[30%]` (345.61px
              @1280), `mt-[8em]` = 85.333px. The column itself is the shared
              `IconFeatureColumn` (CORE_A §1.5, also used by /pricing) — the
              class strings were verified identical before folding, so this is
              one component, not two copies. */}
          <div
            className={`${BLOCK} mb-0 mt-[8em] flex justify-around max-wf-phone:flex-col max-wf-phone:items-center max-wf-mini:mb-0`}
          >
            {GOALS_2027.map((col) => (
              <IconFeatureColumn
                key={col.figure}
                icon={col.src}
                iconAlt={col.alt}
                heading={col.figure}
                body={col.caption}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= C — divider, band = section above (bg-leaf) ======= */}
      <LeafDivider band="bg-leaf" />

      {/* ================= D — UN SDG (shared with /esg) ===================== */}
      <SdgSection />

      {/* ================= E — divider, band = section above (cream-dark) ==== */}
      <LeafDivider band="bg-cream-dark" />

      {/* ================= F — reassurance + CTA (shared with /esg) ========== */}
      <ReassuranceCta />
    </>
  )
}
