import { SECTION_WRAPPER } from '../layout/Layout.jsx'
import { BLOCK } from '../lib/classes.js'
import BadgeLink from '../components/BadgeLink.jsx'
import ContentHeading from '../components/ContentHeading.jsx'
import LinkCard from '../components/LinkCard.jsx'
import LeafDivider from '../components/LeafDivider.jsx'
import CtaSection from '../components/CtaSection.jsx'
import { alternativesIndex } from '../data/alternatives.js'

// Route "/alternatives" — CLONE_SPEC_CONTENT_A §3 (TEMPLATE C).
//
// Section map @1280 — total document height target 5774px:
//   A nav             y    0      h   76.59  (Layout)
//   B hero section    y   44.61   h 4082.02  bg-cream, wrapper pb-[5em]
//   B0 badge+h1+intro y   44.61   h  435.98  inner pt-[10.2em]
//   B1 15-card grid   y  525.39   h 3032.77  flex-wrap, gap 32px, 2 cols
//   B2 "What Evergreen is" y 3602.95 h 71.03
//   B3 2-card grid    y 3718.78   h  309.72
//   C divider band    y 4094.64   h  161.98  band colour = cream
//   D final CTA       y 4224.64   h 1038.81  bg-cream-dark, pt-[18em] pb-[5em]
//   E footer          y 5263.45   h ~511     (Layout)
//
// ⚠ NO announcement banner on this route (§0.1) — Layout's BANNER_ROUTES
// already excludes it.
// ⚠ Section D is byte-for-byte the homepage final CTA, so it reuses the shared
// CtaSection component rather than reimplementing it (§3.1).
// ⚠ The grid cards have NO leaf span — unlike the blog rows and the article's
// RelatedCards (§3.3). They also have no hover, no entrance animation and no
// stagger (§3.6).
// ⚠ No pagination, load-more, filters or tag chips. 15 cards in one list,
// alphabetical by slug. Card heights are content-driven, so the 3032.77px grid
// height only reproduces with matching copy lengths — the per-card geometry
// (447.98 wide, 25.6px padding, 32px gaps, 2 cols) is the thing to hold exact.
//
// MOTION: only the 12 DIVIDER_LEAVES in band C, rendered in their initial
// pre-drift transform. Nothing else on this route animates.
export default function AlternativesIndex() {
  const { badge, h1, intro, items, trailing } = alternativesIndex

  return (
    <>
      {/* ================= B — hero + listing ================= */}
      <section className="relative bg-cream">
        <div className={`${SECTION_WRAPPER} pb-[5em]`}>
          {/* B0 — shared page head (§0.3). The intro block lives INSIDE the
              pt-[10.2em] div; its bottom margin collapses with the grid's top
              margin, which is what puts the grid at y 525.39. */}
          <div className="pt-[10.2em] max-wf-mini:pt-[11.8em]">
            <div className="relative mx-auto w-[108em] max-wf-tablet:w-[80em] max-wf-phone:w-full max-wf-mini:flex max-wf-mini:w-auto max-wf-mini:flex-col max-wf-mini:items-center">
              <BadgeLink label={badge.label} href={badge.href} />
              <h1 className="mx-auto max-w-[49ch] text-center max-wf-mini:text-[3.9em]">
                {h1}
              </h1>
              <div className={BLOCK}>
                <p className="mx-auto max-w-[49ch] text-center">{intro}</p>
              </div>
            </div>
          </div>

          {/* B1 — the 15 comparison cards */}
          <div className={`${BLOCK} flex justify-center max-wf-phone:flex-col`}>
            <ul className="flex w-full flex-wrap justify-center gap-[3em]">
              {items.map((item) => (
                <LinkCard
                  key={item.slug}
                  as="h2"
                  href={`/alternatives/${item.slug}`}
                  title={item.title}
                  description={item.cardExcerpt}
                  ctaLabel="Read the comparison"
                />
              ))}
            </ul>
          </div>

          {/* B2 + B3 — "What Evergreen is" */}
          <ContentHeading>{trailing.heading}</ContentHeading>
          <div className={`${BLOCK} flex justify-center max-wf-phone:flex-col`}>
            <ul className="flex w-full flex-wrap justify-center gap-[3em]">
              {trailing.cards.map((card) => (
                <LinkCard
                  key={card.href}
                  as="h2"
                  href={card.href}
                  title={card.title}
                  description={card.description}
                  ctaLabel={card.ctaLabel}
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
