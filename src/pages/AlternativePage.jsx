import { useParams } from 'react-router-dom'
import { SECTION_WRAPPER } from '../layout/Layout.jsx'
import { BLOCK } from '../lib/classes.js'
import BadgeLink from '../components/BadgeLink.jsx'
import ContentHeading from '../components/ContentHeading.jsx'
import RichText from '../components/RichText.jsx'
import RichTextBlocks from '../components/RichTextBlocks.jsx'
import LinkCard from '../components/LinkCard.jsx'
import SourcesList from '../components/SourcesList.jsx'
import LeafDivider from '../components/LeafDivider.jsx'
import CtaSection from '../components/CtaSection.jsx'
import LeafDl from '../components/blocks/LeafDl.jsx'
import LeafBulletList from '../components/blocks/LeafBulletList.jsx'
import FaqDl from '../components/blocks/FaqDl.jsx'
import {
  getAlternative,
  titleForSlug,
  WHERE_RECOGNITION_HAPPENS,
} from '../data/alternatives.js'

// Route "/alternatives/:slug" (15 routes) — CLONE_SPEC_CONTENT_A §4 (TEMPLATE D).
//
// Section map @1280 (from /alternatives/bonusly, doc 9086; heytaco 9103):
//   A nav              y    0      h   76.59  (Layout)
//   B cream section    y   44.61   h 7393.27  wrapper pb-[5em]
//   B0 head            y   44.61   h  435.98  badge + h1 + subtitle
//   B1 "{C} at a glance"   y  525.39  h   71.03
//   B2 SpecList (3 rows)   y  641.22  h  378.84
//   B3 prose body      y 1064.86   h 1767.13  4 h2 + 8 p
//   B4 "Where {C} is strong" y 2876.78 h  71.03
//   B5 LeafBulletList (5)  y 2992.61  h  402.66
//   B6 "Where it falls short" y 3440.06 h 71.03
//   B7 LeafBulletList (4)  y 3555.89  h  317.86
//   B8 "How Evergreen differs" y 3918.55 h 71.03
//   B9 SpecList (4 rows)   y 4034.38  h  534.81
//   B10 "Verdict"      y 4613.98   h   71.03
//   B11 verdict p      y 4729.81   h  158.67
//   B12 "Questions people ask" y 4933.28 h 71.03
//   B13 FAQ dl (3)     y 5049.11   h  843.91
//   B14 "Sources"      y 5937.81   h   71.03
//   B15 sources + note y 6053.64   h  221.66
//   B16 "Where recognition happens" y 6320.09 h 71.03
//   B17 2 LinkCards    y 6435.92   h  309.72
//   B18 "Other comparisons" y 6790.44 h  71.03
//   B19 3 LinkCards    y 6906.27   h  433.48
//   C divider band     y 7405.89   h  161.98  band colour = cream
//   D final CTA        y 7535.89   h 1038.81  bg-cream-dark, homepage §1 H
//   E footer           y 8574.70   h ~511     (Layout)
//
// ⚠ NO announcement banner (§0.1).
// ⚠ There is NO comparison <table> anywhere on this template (§4.0): no
// <table>/<th>/<td>, no tick/cross icons, no zebra striping, no row borders.
// The role is played by two SpecLists (LeafDl) and two LeafBulletLists.
// ⚠ There are NO competitor logos (§4.0 / §8) — do not invent any.
// ⚠ There is no date element; the "as read on {date}" lives inline inside the
// Pricing spec row (§4.1).
// ⚠ All `sources[]` hrefs are off-domain, so SourcesList renders them inert.
//
// SpecList (§5.4) and LeafDl (CONTENT_B §3.7) are the same geometry — dl
// w-[70.3em], row mb-[2.4em], dt 2em/1.5/700 with a w-[0.8em] leaf at
// mr-[0.45em], dd mt-[0.3em] with a 1.75em/1.7 p — so the shared LeafDl is
// reused unchanged; no variant prop was needed.
//
// MOTION: only the 12 DIVIDER_LEAVES in band C, in their initial pre-drift
// transform. No card leaves, no stagger, no scroll-linked motion (§4.6).
export default function AlternativePage() {
  const { slug } = useParams()
  const item = getAlternative(slug)

  if (!item) {
    return (
      <section className="relative bg-cream">
        <div className={`${SECTION_WRAPPER} pb-[12em] pt-[12em] text-center`}>
          <h1 className="mx-auto max-w-[49ch] text-center">Comparison not found</h1>
        </div>
      </section>
    )
  }

  const competitor = item.competitor

  return (
    <>
      {/* ================= B — the whole cream section ================= */}
      <section className="relative bg-cream">
        <div className={`${SECTION_WRAPPER} pb-[5em]`}>
          {/* B0 — page head (§4.1). Subtitle block sits inside the head div. */}
          <div className="pt-[10.2em] max-wf-mini:pt-[11.8em]">
            <div className="relative mx-auto w-[108em] max-wf-tablet:w-[80em] max-wf-phone:w-full max-wf-mini:flex max-wf-mini:w-auto max-wf-mini:flex-col max-wf-mini:items-center">
              <BadgeLink label="Alternatives" href="/alternatives" />
              <h1 className="mx-auto max-w-[49ch] text-center max-wf-mini:text-[3.9em]">
                {item.title}
              </h1>
              <div className={BLOCK}>
                <p className="mx-auto max-w-[49ch] text-center">{item.subtitle}</p>
              </div>
            </div>
          </div>

          {/* B1 + B2 — at a glance (Pricing / Best for / Website) */}
          <ContentHeading>{`${competitor} at a glance`}</ContentHeading>
          <LeafDl rows={item.glance} />

          {/* B3 — prose body: 4 fixed h2 + 8 p */}
          <RichText>
            <RichTextBlocks blocks={item.body} />
          </RichText>

          {/* B4 + B5 — strengths */}
          <ContentHeading>{`Where ${competitor} is strong`}</ContentHeading>
          <LeafBulletList items={item.strengths} />

          {/* B6 + B7 — shortfalls */}
          <ContentHeading>Where it falls short</ContentHeading>
          <LeafBulletList items={item.shortfalls} />

          {/* B8 + B9 — how Evergreen differs */}
          <ContentHeading>How Evergreen differs</ContentHeading>
          <LeafDl rows={item.differs} />

          {/* B10 + B11 — verdict (§4.3: one left-aligned p in a w-[70.3em] frame) */}
          <ContentHeading>Verdict</ContentHeading>
          <div className={BLOCK}>
            <div className="mx-auto w-[70.3em] text-left max-wf-mini:max-w-full">
              <p>{item.verdict}</p>
            </div>
          </div>

          {/* B12 + B13 — FAQ. Plain <dl>, fully expanded, NOT an accordion. */}
          <ContentHeading>Questions people ask</ContentHeading>
          <FaqDl
            rows={item.faq.map((row) => ({ question: row.q, answer: row.a }))}
          />

          {/* B14 + B15 — sources (all inert) + the centred contact note */}
          <ContentHeading>Sources</ContentHeading>
          <div className={BLOCK}>
            <SourcesList sources={item.sources} />
          </div>

          {/* B16 + B17 — the two fixed internal cards, h3 headings here */}
          <ContentHeading>{WHERE_RECOGNITION_HAPPENS.heading}</ContentHeading>
          <div className={`${BLOCK} flex justify-center max-wf-phone:flex-col`}>
            <ul className="flex w-full flex-wrap justify-center gap-[3em]">
              {WHERE_RECOGNITION_HAPPENS.cards.map((card) => (
                <LinkCard
                  key={card.href}
                  as="h3"
                  href={card.href}
                  title={card.title}
                  description={card.description}
                  ctaLabel={card.ctaLabel}
                />
              ))}
            </ul>
          </div>

          {/* B18 + B19 — 3 sibling comparisons, NO excerpt (cards 200.75 tall) */}
          <ContentHeading>Other comparisons</ContentHeading>
          <div className={`${BLOCK} flex justify-center max-wf-phone:flex-col`}>
            <ul className="flex w-full flex-wrap justify-center gap-[3em]">
              {item.relatedComparisons.map((sibling) => (
                <LinkCard
                  key={sibling}
                  as="h3"
                  href={`/alternatives/${sibling}`}
                  title={titleForSlug(sibling)}
                  ctaLabel="Read the comparison"
                />
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= C — divider band (cream, matching B above) ======= */}
      <LeafDivider band="bg-cream" />

      {/* ================= D — final CTA, homepage §1 H verbatim ============ */}
      <section className="relative bg-cream-dark">
        <div className={`${SECTION_WRAPPER} pb-[5em] pt-[18em]`}>
          <CtaSection />
        </div>
      </section>
    </>
  )
}
