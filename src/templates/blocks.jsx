import { Fragment } from 'react'
import BadgeLink from '../components/BadgeLink.jsx'
import LinkCard from '../components/LinkCard.jsx'
import RichText from '../components/RichText.jsx'
import { BLOCK } from '../lib/classes.js'

// The shared block vocabulary of T-INDEX and T-DETAIL — CLONE_SPEC_CONTENT_B §3.
// Every one of these is a direct sibling inside the single bg-cream section's
// container wrapper, and every one carries the universal `BLOCK` class string
// (margin-block 44.8px @1280) except HERO, which owns the page's top padding.
//
// No motion anywhere in here: §11 records ZERO animation on card grids and
// headings (no whileInView, no stagger, no per-card delay — static from first
// paint). The only animated things on these templates are the divider leaves.

// §3.1 HERO. Identical on T-DETAIL and T-INDEX; only the badge differs.
// `max-w-[49ch]` must stay in `ch` (§10): it is 580.714px on the 18.667px lede but
// 1981.52px on the 65.333px h1, so flattening either to px breaks the layout.
export function Hero({ badge, title, lede }) {
  return (
    <div className="pt-[10.2em] max-wf-mini:pt-[11.8em]">
      <div className="relative mx-auto w-[108em] max-wf-tablet:w-[80em] max-wf-phone:w-full max-wf-mini:flex max-wf-mini:w-auto max-wf-mini:flex-col max-wf-mini:items-center">
        <BadgeLink label={badge.label} href={badge.href} />
        <h1 className="mx-auto max-w-[49ch] text-center max-wf-mini:text-[3.9em]">{title}</h1>
        <div className={BLOCK}>
          <p className="mx-auto max-w-[49ch] text-center">{lede}</p>
        </div>
      </div>
    </div>
  )
}

// §3.3 SECTION_HEADING — centred display h2, inner column `w-[70.3em]` = 749.86px.
// line-height 1.48 here; that is a DIFFERENT role from `.marketing-rich-text h2`
// (lh 1.2), which must not be "fixed" to match (§16.1).
export function SectionHeading({ children }) {
  return (
    <div className={`${BLOCK} flex justify-center max-wf-phone:flex-col`}>
      <div className="mx-auto mt-0 w-[70.3em] max-wf-phone:w-auto max-wf-mini:mt-[3em] max-wf-mini:w-auto">
        <h2 className="font-headline text-center text-[4.5em] font-semibold leading-[1.48] text-black max-wf-mini:text-center max-wf-mini:text-[3.9em]">
          {children}
        </h2>
      </div>
    </div>
  )
}

// §3.4 PROSE_LEFT — bare paragraph column, deliberately NOT `.marketing-rich-text`,
// so its `p` has margin 0 (no 1.6em bottom margin).
export function ProseLeft({ paragraphs }) {
  return (
    <div className={BLOCK}>
      <div className="mx-auto w-[70.3em] text-left max-wf-mini:max-w-full">
        {paragraphs.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
    </div>
  )
}

// §3.5 RICHTEXT — the shared prose container. `sections` is the §12 `RichText`
// shape: an ordered list of { heading, paragraphs[] }. The element type scale is
// in src/index.css; nothing is restyled here.
export function ProseBody({ sections }) {
  return (
    <RichText>
      {sections.map((section, i) => (
        <Fragment key={i}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((text, j) => (
            <p key={j}>{text}</p>
          ))}
        </Fragment>
      ))}
    </RichText>
  )
}

// §3.9 / §4.2 CARD_GRID — one flat `flex-wrap` list, gap 3em (32px @1280),
// 447.98px cards, 2 columns at 1280 and 1 below 768. Rows equalise height
// (`align-items: stretch`), which is why the measured row pitch varies.
// NO ordering control, NO pagination, NO search, NO A-Z nav (§0 / §4.2).
export function CardGrid({ items, as = 'h3' }) {
  return (
    <div className={`${BLOCK} flex justify-center max-wf-phone:flex-col`}>
      <ul className="flex w-full flex-wrap justify-center gap-[3em]">
        {items.map((item) => (
          <LinkCard
            key={item.href}
            href={item.href}
            title={item.title}
            description={item.description}
            ctaLabel={item.ctaLabel}
            as={as}
          />
        ))}
      </ul>
    </div>
  )
}
