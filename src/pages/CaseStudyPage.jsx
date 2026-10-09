import { useParams } from 'react-router-dom'
import CaseStudyMetaCard from '../components/CaseStudyMetaCard.jsx'
import CaseStudyTeaserCard from '../components/CaseStudyTeaserCard.jsx'
import ProseBody from '../components/ProseBody.jsx'
import LeafDivider from '../components/LeafDivider.jsx'
import CtaSection from '../components/CtaSection.jsx'
import { SECTION_WRAPPER } from '../layout/Layout.jsx'
import { BLOCK } from '../lib/classes.js'
import { CASE_STUDIES } from '../data/caseStudies.js'

// T-STORY — /customer-success-stories/:slug (wunderdog, nitro-games,
// kent-white, worklete).
// Spec: CLONE_SPEC_CONTENT_B §6.1 (section map), §6.2 (hero + quote), §6.3
// (prose column), §5.3 (meta card), §5.4 (teaser cards), §12.6, §14.6.
//
// ⚠️ FOUR separate `<section class="relative bg-cream">` elements, each with its
// own `-mt-[3em]` wrapper and NO `pb-[5em]` — unlike every other template in
// set B, which is one section with bottom padding. Do not merge them.
//
// Measured @1280 (wunderdog): docH 5855 · §1 hero y 44.61 h 282.66 · §2 quote +
// hero image y 340.08 h 438.64 · §3 meta card + prose y 906.72 h 2619 · §4
// teaser row y 3570.52 h 637.22 · divider y 4175.75 · CTA y 4305.75 h 1038.81.
// docH: wunderdog 5855 · nitro-games 6318 · kent-white 5784 · worklete 5343.
export default function CaseStudyPage() {
  const { slug } = useParams()
  const story = CASE_STUDIES[slug]
  if (!story) return null

  const related = story.related.map((relatedSlug) => CASE_STUDIES[relatedSlug])

  return (
    <>
      {/* ── SECTION 1 — h1 (company name) + subtitle ───────────────────── */}
      <section className="relative bg-cream">
        <div className={SECTION_WRAPPER}>
          <div className="pt-[10.2em] max-wf-mini:pt-[11.8em]">
            <div className="relative mx-auto w-[108em] max-wf-tablet:w-[80em] max-wf-phone:w-full max-wf-mini:flex max-wf-mini:w-auto max-wf-mini:flex-col max-wf-mini:items-center">
              <h1 className="mx-auto max-w-[49ch] text-center max-wf-mini:text-[3.9em]">
                {story.company}
              </h1>
              <div
                className={`${BLOCK} flex items-center justify-center max-wf-mini:flex-col`}
              >
                <p className="mx-[3em] text-center max-wf-mini:mx-0 max-wf-mini:mt-[1em] max-wf-mini:mb-[2em]">
                  {story.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — pull quote (left, w-[44em]) + hero image (right, 60%) */}
      <section className="relative bg-cream">
        <div className={SECTION_WRAPPER}>
          <div
            className={`${BLOCK} flex justify-between gap-[4em] max-wf-tablet:flex-col max-wf-tablet:items-center max-wf-tablet:gap-0`}
          >
            <div className="mx-auto flex w-[44em] flex-col items-center max-wf-mini:w-auto">
              {/* Portrait — 125.77px circle, bg #beedc0, 2px #000. The inner
                  img is the ONLY `object-fit: cover` in set B (§1 negatives). */}
              <span className="mb-[2.5em] size-[11.7918em] overflow-hidden rounded-full border-2 border-black bg-leaf">
                <img
                  src={story.quoteAuthor.image}
                  alt="Image of person quoted"
                  className="size-full object-cover"
                />
              </span>
              <p className="mx-[3em] mb-[1em] max-w-[49ch] text-center max-wf-mini:mx-0 max-wf-mini:mt-[1em]">
                {story.quote}
              </p>
              {/* Two separate bold <p>, NOT a <br> (§6.2). */}
              <p className="mx-auto max-w-[49ch] text-center font-bold">
                {story.quoteAuthor.name}
              </p>
              <p className="mx-auto max-w-[49ch] text-center font-bold">
                {story.quoteAuthor.role}
              </p>
            </div>
            <div className="w-[60%] max-wf-tablet:mt-[4em] max-wf-tablet:w-full">
              <img
                src={story.heroImage}
                alt="Image of customer story"
                className="size-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — meta card (26%) + prose body (60%) ─────────────── */}
      <section className="relative bg-cream">
        <div className={SECTION_WRAPPER}>
          {/* Note: `mt-[15em] mb-[4.2em]` — NOT the standard `my-[4.2em]`. */}
          <div className="mt-[15em] mb-[4.2em] flex text-center max-wf-tablet:flex-col max-wf-mini:mt-[13.5em] max-wf-mini:mb-[3.5em]">
            <CaseStudyMetaCard meta={story.meta} />
            {/* The 60% column (691.22px) is narrower than the prose container's
                829.65px max-width, so the column wins (§6.3). This is the only
                place in set B that renders blockquote / figure / figcaption. */}
            <div className="w-[60%] text-left max-wf-tablet:mt-[4em] max-wf-tablet:w-full">
              <ProseBody nodes={story.body} />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — "other stories": exactly 2 teaser cards ────────── */}
      <section className="relative bg-cream pt-[3em]">
        <div className={SECTION_WRAPPER}>
          <div
            className={`${BLOCK} mb-0 flex justify-center max-wf-mini:mb-0 max-wf-phone:flex-col`}
          >
            {/* `mb-[-10em]` pulls the divider band up under the cards. */}
            <div className="mt-[7em] mb-[-10em] w-[87em] max-wf-phone:w-auto">
              <div className="flex flex-wrap justify-center max-wf-tablet:flex-col max-wf-tablet:items-center">
                {related.map((item) => (
                  <CaseStudyTeaserCard key={item.slug} story={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider band colour follows the section above → bg-cream (§1). */}
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
