import CtaSection from '../components/CtaSection.jsx'
import LeafDivider from '../components/LeafDivider.jsx'
import { SECTION_WRAPPER } from '../layout/Layout.jsx'
import { INDEX_BADGE, INDEX_PAGES } from '../data/collections.js'
import { CardGrid, Hero, SectionHeading } from './blocks.jsx'

// T-INDEX — ONE component serving all four index routes
// (/employee-recognition/glossary, /employee-recognition/for,
// /employee-recognition-messages, /company-values).
// CLONE_SPEC_CONTENT_B §0 collapse note: the four pages are the same component
// tree; only badge (always the hub badge), h1, lede, the card array and the
// trailing cross-sell group differ. §4.1 page map, §4.2 grid geometry.
//
// Page shape: one bg-cream section (pb-[5em]) -> leaf divider (161.98px,
// DIVIDER_LEAVES, band colour = the section above = cream) -> bg-cream-dark final
// CTA (1038.81px, homepage section H verbatim).
//
// Cards are `as="h2"` here: this is the top-level listing (§5.1).
export default function TIndex({ collection }) {
  const page = INDEX_PAGES[collection]

  return (
    <>
      <section className="relative bg-cream">
        <div className={`${SECTION_WRAPPER} pb-[5em]`}>
          <Hero badge={INDEX_BADGE} title={page.h1} lede={page.lede} />
          {/* The whole collection, one flat grid. No A-Z nav, no search, no
              filter, no pagination — §0 / §4.2 verified none exist. */}
          <CardGrid items={page.items} as="h2" />
          <SectionHeading>{page.crossSellHeading}</SectionHeading>
          <CardGrid items={page.crossSell} as="h2" />
        </div>
      </section>

      <LeafDivider band="bg-cream" />

      <section className="relative bg-cream-dark">
        <div className={`${SECTION_WRAPPER} pt-[18em] pb-[5em]`}>
          <CtaSection />
        </div>
      </section>
    </>
  )
}
